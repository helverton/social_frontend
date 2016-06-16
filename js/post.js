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


app.factory('Post', function($resource) {
	return $resource('http://localhost:3000/api/v1/posts/:id',{},{
		curtir: {
			method: 'put',
			url: 'http://localhost:3000/api/v1/posts/:id/curtir',
			params: { id: "@id" }
		}
	});
});

app.controller('PostController', function($scope, Post) {
	$scope.posts = Post.query();
	$scope.post = {};
	
	$scope.save = function() {
    	Post.save(this.post, function(){
    		$scope.post = Post.query(); 
    	});
    	window.location = 'http://localhost/mobile/social/posts.html';
    }	

    $scope.curtir = function(post) {
    	Post.curtir(post, function(){
    		$scope.post = Post.query();
    		window.location.reload();
    	});
    }	
});