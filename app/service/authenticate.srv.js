(function() {
	var app = angular.module('authenticationApp', ['ngCookies']);
	app.service('AuthenticationService', function($http, $cookieStore,
			$rootScope) {
		this.login = function(username, password, callback) {
			if (username !== 'test' && password !== 'password') {
				response = {
					success : true
				};
			} else {
				response = {
					success : false,
					message : 'Username or password is incorrect'
				};
			}
			callback(response);
		}

		this.setCredentials = function(username, password) {
			//var authdata = username + ':' + password;
			$rootScope.globals = {
				currentUser : {
					username : username
					//,
					//authdata : authdata
				}
			};

			$http.defaults.headers.common['Authorization'] = 'Basic '
					//+ authdata; // jshint ignore:line
			$cookieStore.put('globals', $rootScope.globals);
		}

		this.clearCredentials = function() {
			$rootScope.globals = {};
			$cookieStore.remove('globals');
			$http.defaults.headers.common.Authorization = 'Basic';
		}
	});
})();