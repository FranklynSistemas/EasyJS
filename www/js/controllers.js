angular.module('app.controllers', [])

.controller('StartCtrl', ['$scope','$state','$stateParams', '$http','$cordovaSQLite','$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$state, $stateParams,$http,$cordovaSQLite,$ionicPopup) {

/*function validaLogeo(){
  $cordovaSQLite.execute(db,"SELECT * FROM person").then(function(result){
    showAlert($ionicPopup,{title:"Uy!",template:"<p align='center'>Responde la DB</p>"});
    if(result.rows.length){
      $state.go('menu.easyJS');
    }else{
      $state.go('easyLogin');
    }
  },function(err){
    console.log(err);
    showAlert($ionicPopup,{title:"Uy!",template:"<p align='center'>err</p>"});
    $state.go('easyLogin');
  });
};validaLogeo();
*/

}])

.controller('easyJSCtrl', ['$scope', '$stateParams', '$http',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http) {

$http.get('js/preguntas.json').success(function(data) {
     $scope.dishes = data;
     console.log(data);
 })


}])
   
.controller('wikiCtrl', ['$scope', '$stateParams','$ionicSlideBoxDelegate','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$stateParams,$ionicSlideBoxDelegate,$http) {

$http.get('js/wiki.json').success(function(data) {
     $scope.wiki = data;
 });


$scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };



}])
   
.controller('preguntasPorModuloCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
      
.controller('easyLoginCtrl', ['$scope','$ionicHistory','$stateParams','$state','$cordovaSQLite','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,$ionicHistory,$cordovaSQLite,$ionicPopup,$ionicHistory) {

$ionicHistory.nextViewOptions({
    disableBack: true
});

$scope.vm = {};


$scope.Ingresar = function(){
	var query = "SELECT * FROM usuarios WHERE usuario = '"+$scope.vm.usuario+"' AND pass = '"+$scope.vm.pass+"'";
	$cordovaSQLite.execute(db,query).then(function(result){
    if(result.rows.length){
    	showAlert($ionicPopup,{title:"Bienvenid@",template:"<p align='center'>"+result.rows.item(0).Nombres+"</p>"});
    	actualiza(result.rows.item(0).id);
    }else{
      showAlert($ionicPopup,{title:"Ooops!",template:"<p align='center'>El usuario o contraseña son incorrectos, tenga en cuenta el uso de Mayúsculas y Minúsculas</p>"});
    }
  },function(err){
    showAlert($ionicPopup,{title:"Ooops!",template:"<p align='center'>"+JSON.stringify(err)+"</p>"});

    console.log(err);
  });
}

function actualiza(id){
	var query = "INSERT INTO person(idPerson) VALUES (?)";
	$cordovaSQLite.execute(db,query,[id]).then(function(res) {
      console.log("insertId: " + res.insertId);

      if(res.insertId){$state.go('menu.easyJS');};
    }, function (err) {
      console.error(err);
    });
	/*var sqlQuery = "UPDATE usuario SET logeado = 1 WHERE id = "+id;
	$cordovaSQLite.execute(db,sqlQuery,[]).then(function(res) {
	      console.log(res);
	      $state.go('menu.easyJS');
	    }, function (err) {
	      console.error(err);
	    });
	 */
}

}])
   
.controller('registrarCtrl', ['$scope','$ionicHistory','$stateParams','$state','$cordovaSQLite','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$stateParams,$ionicHistory,$state,$cordovaSQLite,$ionicPopup) {

$ionicHistory.nextViewOptions({
            disableBack: true
        });

$scope.vm = {};
$scope.confirmClave = null;
$scope.registrar = function(vm){

	validaNomUser(vm.usuario, function(existeUser){
		if (existeUser===0) {
			var query = "INSERT INTO usuarios(Nombres,usuario,pass,puntajes,logeado,foto) VALUES (?,?,?,?,?,?)";
			//var putajes ="[0,0,0,0]";
			var puntajes = JSON.stringify({"Basico":0,"Condicionales":0,"Bucles":0,"Funciones":0});
		  	$cordovaSQLite.execute(db,query,[vm.Nombres,vm.usuario,vm.pass,puntajes,1,'']).then(function(res) {
		      console.log("insertId: " + res.insertId);
		      showAlert($ionicPopup,{title:"Bienvenid@",template:"<p align='center'>"+vm.Nombres+"</p>"});
		      actualiza(res.insertId);
		      $scope.vm = {};
		    }, function (err) {
		      console.error(err);
		      showAlert($ionicPopup,{title:"Uy!",template:"<p align='center'>Ocurrio un error durante el proceso intente nuevamente</p>"});
		    });
		}else{
			showAlert($ionicPopup,{title:"Uy!",template:"<p align='center'>El usuario ya existe intente con otro</p>"});
		}
	})
	
};

function validaNomUser(usuario,collback){
	var existeUser = 0;
	var query = "SELECT * FROM usuarios WHERE usuario = '"+usuario+"'";
	$cordovaSQLite.execute(db,query,[]).then(function(res) {
		console.log(res.rows.length); 
      	collback(res.rows.length);
    }, function (err) {
      console.error(err);
    });
    
}

function actualiza(id){
	var query = "INSERT INTO person(idPerson) VALUES (?)";
	$cordovaSQLite.execute(db,query,[id]).then(function(res) {
      console.log("insertId: " + res.insertId);
      if(res.insertId){
      	$state.go('menu.easyJS');
      };
    }, function (err) {
      console.error(err);
      showAlert($ionicPopup,{title:"Uy!",template:"<p align='center'>Ocurrio un error durante el proceso intente nuevamente</p>"});
	 
    });
}

$scope.validar = function(correcto){
	if(!correcto){
		showAlert($ionicPopup,{title:"Uy!",template:"<p align='center'>Debe llenar todos los campos correctamente</p>"});
	}
}

$scope.confirm = function(){

	$scope.confirmClave = $scope.vm.pass === $scope.vm.confirmPass ? true: false;
	
}
}])
   
.controller('perfilCtrl', ['$scope', '$stateParams','$state','$cordovaSQLite','$ionicModal', '$ionicPopup','$ionicSlideBoxDelegate','$cordovaCamera',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,$cordovaSQLite,$ionicModal,$ionicPopup,$cordovaCamera,$ionicSlideBoxDelegate) {

$scope.perfil = {};
function consultaPersonId(){
	var queryPerson = "SELECT * FROM person";
	$cordovaSQLite.execute(db,queryPerson,[]).then(function(res) {
      if(res.rows.length){
    		TraeUser(res.rows.item(0).idPerson);
	    }else{
	      console.log("El usuario no esta logeado");
	    }
    }, function (err) {
      console.error(err);
    });
}; consultaPersonId();

function TraeUser(id){
	var queryUser = "SELECT * FROM usuarios WHERE id = "+id;
	$cordovaSQLite.execute(db,queryUser,[]).then(function(res) {
      if(res.rows.length){
    		$scope.perfil = res.rows.item(0);
    		$scope.perfil.puntajes = JSON.parse($scope.perfil.puntajes);
	    }else{
	      console.log("El usuario no esta logeado");
	    }
    }, function (err) {
      console.error(err);
    });
}

 
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };



//Foto
$scope.CambiarFoto = function(){
	     $ionicModal.fromTemplateUrl('templates/doAvatar.html',
	        { scope: $scope,
	          animation: 'slide-in-up'
	        })
	      .then(function(modal){
	        $scope.modal = modal;
	        $scope.modal.show();
	    });
  	}

	$scope.tomarAccion = function(type){
	    if(type===1){
	        $scope.takeFoto();
	    } else if(type===2) {
	       $scope.choosePhoto();
	    }
  	}

	$scope.takeFoto = function () {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };
    $cordovaCamera.getPicture(options).then(function (imageData) {
    //$scope.imgURI = "data:image/jpeg;base64," + imageData;
    $scope.imgURI = imageData;
    GuardaFoto();
    }, function (err) {
      console.log(err); // An error occured. Show a message to the user
    });
  }    
  $scope.choosePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 500,
                    targetHeight: 500,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
  };
          $cordovaCamera.getPicture(options).then(function (imageData) {
          //$scope.imgURI = "data:image/jpeg;base64," + imageData;
          $scope.imgURI = imageData;
          GuardaFoto();
        }, function (err) {
            // An error occured. Show a message to the user
      });
  }
   $scope.changePhoto = function(){
      $ionicModal.fromTemplateUrl('templates/doPhoto.html',
        { scope: $scope,
          animation: 'slide-in-up'
        })
      .then(function(modal){
        $scope.modal = modal;
        $scope.modal.show();
    });
  }

  $scope.closeRegister= function(){
  	$scope.modal.hide();
  };

  $scope.GuardaFoto= function(avatar){ 
  	
	  var sqlQuery = "UPDATE usuarios SET foto = '"+avatar+"' WHERE id = "+$scope.perfil.id;
		$cordovaSQLite.execute(db,sqlQuery,[]).then(function(res) {
		      if(res.rowsAffected !=0){
		      	showAlert($ionicPopup,{title:"Bien",template:"<p align='center'>Foto guardada con exito</p>"});
		      	consultaPersonId();
		  	  }else{
		  	  	showAlert($ionicPopup,{title:"Oops",template:"<p align='center'>Ocurrio un error #1 al guardar la foto intente nuevamente</p>"});
		  	  };
		    }, function (err) {
		      console.log(err);
		      showAlert($ionicPopup,{title:"Oops",template:"<p align='center'>Ocurrio un error  #2 al guardar la foto intente nuevamente</p>"});
		    });
	
  };

}])
.controller('menuCtrl', ['$scope', '$stateParams','$state','$cordovaSQLite', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,$cordovaSQLite) {

$scope.perfil = {};
function consultaPersonId(){
  var queryPerson = "SELECT * FROM person";
  $cordovaSQLite.execute(db,queryPerson,[]).then(function(res) {
      if(res.rows.length){
        TraeUser(res.rows.item(0).idPerson);
      }else{
        console.log("El usuario no esta logeado");
      }
    }, function (err) {
      console.error(err);
    });
}; consultaPersonId();

function TraeUser(id){
  var queryUser = "SELECT * FROM usuarios WHERE id = "+id;
  $cordovaSQLite.execute(db,queryUser,[]).then(function(res) {
      if(res.rows.length){
        $scope.perfil.Nombres = res.rows.item(0).Nombres;
        asignaClass(res.rows.item(0).foto);
      }else{
        console.log("El usuario no esta logeado");
      }
    }, function (err) {
      console.error(err);
    });
}

function asignaClass(avatar){
  switch(avatar){
    case "hombre01":$scope.perfil.foto= "avHombre01"; break;
    case "hombre02":$scope.perfil.foto= "avHombre02"; break;
    case "mujer01":$scope.perfil.foto= "avMujer01"; break;
    case "mujer02":$scope.perfil.foto= "avMujer02"; break;
    case "":$scope.perfil.foto= "avSinAvatar"; break;
  }
}

$scope.Salir = function(){

var sqlQuery = "DELETE FROM person";

//var sqlQuery = "UPDATE usuario SET logeado = 0 WHERE id = 1";
$cordovaSQLite.execute(db,sqlQuery,[]).then(function(res) {
      console.log(res);
      if(res.rowsAffected !=0){
        $state.go('easyLogin');
      };
    }, function (err) {
      console.error(err);
    });
}

}])


function showAlert($ionicPopup,msg){
	 var alertPopup = $ionicPopup.alert({
         title: msg.title,
         template: msg.template
    });
}