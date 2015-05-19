'use strict';

var service = angular.module('Services',[]);

service.factory('getImagens', ['$http', function ($http) {

	return {

		get: function(){

			return $http.get('mock/banner.json').
						success(function(data, status){}).
						error(function(data, status){});
		}

	};

}])