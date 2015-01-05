var app = angular.module('threejs', 
	[	'ui.router', 
		'threejs_canvas',
		'sceneServices'	]);

app.config(function($stateProvider, $urlRouterProvider) {

  	$urlRouterProvider.otherwise('/');
    $stateProvider
      	.state('home', {
	        url: '/',
	        controller: 'canvasCtrl',
	        templateUrl: '/templates/main.html'
      	})
	});

app.run(['$rootScope', '$state', '$window',
  	function($rootScope, $state, $window) {
  		$state.go('home');
	}]);