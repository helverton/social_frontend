var app = angular.module('app', ['ngResource']);

//Interceptor de autenticação
app.factory('authInterceptorService', ['$q', function ($q){
    return {
        responseError: function (rejection) {
            if (rejection.status === 401) {
                location.href = "http://localhost/mobile/social/index.html";
            }
            return $q.reject(rejection);
        }
    };
}]);
app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
    $httpProvider.defaults.withCredentials = true;
}]);


//LoginController
app.controller('LoginController', function($scope, $http, $httpParamSerializer) {
	$scope.user = {};
	
	$scope.login = function() {
		$http({
		  url: 'http://localhost:3000/api/v1/login',
		  method: 'POST',
		  data: $httpParamSerializer({
				email: $scope.user.email,
				password: $scope.user.password
		  }),
		  headers: {
		    'Content-Type': 'application/x-www-form-urlencoded'
		  }
		}).success(function(response) {  
			//Login com sucesso
			location.href = "http://localhost/mobile/social/posts.html";
		}).error(function(response){
			//Login inválido
			$scope.message = "Login e/ou senha inválidos!";
		});		
	}


	$scope.save = function() {
		$http({
		  url: 'http://localhost:3000/api/v1/users?user[name]='+$scope.user.email
		  										+'&user[email]='+$scope.user.email
		  										+'&user[password]='+$scope.user.password
		  										+'&user[password_confirmation]='+$scope.user.password,
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/x-www-form-urlencoded'
		  }
		}).success(function(response) {  
			location.href = "http://localhost/mobile/social/posts.html";
		}).error(function(response){
			$scope.message = "Usuário inválidos!";
		});		
	}
});