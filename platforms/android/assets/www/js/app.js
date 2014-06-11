angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('signin', {
      url: "/sign-in",
      templateUrl: "sign-in.html",
      controller: 'SignInCtrl'
    })
    .state('registrarse', {
      url: "/registrarse",
      templateUrl: "registrarse.html",
      controller: 'registrarseCtrl'
    })
    .state('forgot-password', {
      url: "/forgot-password",
      templateUrl: "forgot-password.html"
    })
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "tabs.html",
      controller:'tabsController'
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "home.html",
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.facts', {
      url: "/facts",
      views: {
        'home-tab': {
          templateUrl: "facts.html"
        }
      }
    })
    .state('tabs.facts2', {
      url: "/facts2",
      views: {
        'home-tab': {
          templateUrl: "facts2.html"
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "about.html"
        }
      }
    })
    .state('tabs.navstack', {
      url: "/navstack",
      views: {
        'about-tab': {
          templateUrl: "nav-stack.html"
        }
      }
    })
    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "contact.html"
        }
      }
    });


   $urlRouterProvider.otherwise("/sign-in");

})

.controller('SignInCtrl', function($scope, $state,$http) {
  
  // lineas para autologeo
  
  var nombre = window.localStorage.getItem('nombre');
  var pass = window.localStorage.getItem('pass');
  if(nombre != null && pass != null){
    $http.post('http://192.168.1.68:3000/login',{nombre:nombre,pass:pass})
    .success(function(data) {
      $scope.logeado = data;
        console.log("se logeo?: "+JSON.stringify($scope.logeado));
        if(data.login == 1){
          $state.go('tabs.home'); 
        }
        else{

        }
    })
    .error(function(data) {
      console.log('Error en autologeo: '+ data);
    });
  }else{
   
  }

 
 $scope.signIn = function(user) {
       $scope.authenticarUsuario(user);
  };
 

  
  $scope.authenticarUsuario = function(user){
    $scope.loggedIn = 'si';
    $http.post('http://192.168.1.68:3000/login',{nombre:user.username,pass:user.password})
    .success(function(data) {
      $scope.logeado = data;
        console.log("se logeo?: "+JSON.stringify($scope.logeado));
        if(data.login == 1){
          $state.go('tabs.home');
        }
        else{
         
        }
    })
    .error(function(data) {
      console.log('Error: '+ data);
    });
  }

  $scope.persist = function(user){
    window.localStorage.setItem('nombre', user.username);
    window.localStorage.setItem('pass',user.password);
  }

})

.controller('tabsController',function($scope,$state){
  $scope.salir = function(user){
    window.localStorage.removeItem("nombre");
    window.localStorage.removeItem("pass");
    $state.go('signin'); 
  }
})

.controller('registrarseCtrl',function($scope,$state){
  $scope.registrarse = function(user){
    alert('hola'+user.email);
    
  }
})

.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
  
});