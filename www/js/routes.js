angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.easyJS', {
    url: '/inicio',
    views: {
      'side-menu21': {
        templateUrl: 'templates/easyJS.html',
        controller: 'easyJSCtrl'
      }
    }
  })

  .state('menu.wiki', {
    url: '/wiki',
    views: {
      'side-menu21': {
        templateUrl: 'templates/wiki.html',
        controller: 'wikiCtrl'
      }
    }
  })

  .state('menu.preguntasPorModulo', {
    url: '/Quiz',
    views: {
      'side-menu21': {
        templateUrl: 'templates/preguntasPorModulo.html',
        controller: 'preguntasPorModuloCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true,
    controller: 'menuCtrl'
  })

  .state('easyLogin', {
    url: '/login',
    templateUrl: 'templates/easyLogin.html',
    controller: 'easyLoginCtrl'
  })

  .state('registrar', {
    url: '/registro',
    templateUrl: 'templates/registrar.html',
    controller: 'registrarCtrl'
  })

  .state('menu.perfil', {
    url: '/perfil',
    views: {
      'side-menu21': {
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
      }
    }
  })

  .state('start',{
         url:'/',
         controller: 'StartCtrl'
      })

$urlRouterProvider.otherwise('/')

  

});