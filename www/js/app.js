// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db;
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services','ngCordova'])

.run(function($ionicPlatform,$cordovaSQLite,$ionicPopup,$state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    try {
      if (window.cordova) {
        db = $cordovaSQLite.openDB({name:"easyjs.db",location:'default'});
      }else{
        db=window.openDatabase("easyjs","1.0","EasyJs",2000);
      }
    } catch (error) {
      alert(error);
    }

    $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS usuarios(id INTEGER PRIMARY KEY AUTOINCREMENT, Nombres text, usuario text, pass text, puntajes object, logeado integer,foto text)");
    $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS person(id INTEGER PRIMARY KEY AUTOINCREMENT, idPerson integer)");
    
    $cordovaSQLite.execute(db,"SELECT * FROM person").then(function(result){
    if(result.rows.length){
      $state.go('menu.easyJS');
    }else{
      $state.go('easyLogin');
    }
  },function(err){
    console.log(err);
    $state.go('easyLogin');
  });

    //$cordovaSQLite.execute(db,"INSERT INTO person(idPerson) VALUES (?)",[-1]);

    //db=window.openDatabase("sqlite","1.0","EasyJs",2000);
     //if (window.cordova) {
    /*
      db = $cordovaSQLite.openDB({ name: "easyjs.db", bgType: 1 });
      $cordovaSQLite.execute(db,"CREATE TABLE usuarios(id integer primary key, Nombres text, usuario text, pass text, puntajes object, logeado integer,foto text)");
      $cordovaSQLite.execute(db,"CREATE TABLE person(id integer primary key, idPerson integer)");
      console.log("Android");
    }else{
      db=window.openDatabase("easyjs","1.0","EasyJs",2000); // browser
      $cordovaSQLite.execute(db,"CREATE TABLE usuarios(id integer primary key, Nombres text, usuario text, pass text, puntajes object, logeado integer,foto text)");
      $cordovaSQLite.execute(db,"CREATE TABLE person(id integer primary key, idPerson integer)");
      console.log("browser");

    }
    */

  });
})