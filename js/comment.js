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




var id = getParameterByName("id");
app.factory('CommentList', function($resource) {
		return $resource('http://localhost:3000/api/v1/posts/'+id+'/comments',{},{});
});

app.controller('CommentListController', function($scope, CommentList) {
	$scope.comments = CommentList.query();
    $scope.post_id = getParameterByName("id");	
});

app.factory('Comment', function($resource) {
		return $resource('http://localhost:3000/api/v1/comments/:id',{},{});
});


app.controller('CommentNewController', function($scope, Comment) {
	$scope.comments = Comment.query();
	$scope.comment = {};
	$scope.comment.post_id = getParameterByName("id");
	
	$scope.save = function() {
    	Comment.save(this.comment, function(){
    		$scope.comment = Comment.query(); 
    	});
    	window.location = 'http://localhost/mobile/social/comments.html?id='+this.comment.post_id;
    }	
});