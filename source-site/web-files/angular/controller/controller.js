'use strict';

var ctrl = angular.module('Controller', ['Services']);

ctrl.controller('HomeCtrl',['getImagens', function(getImagens){

	var self = this;

	//GET IMAGENS
	getImagens.get().then(
		function(response){
			self.imagens = response.data;
		},
		function(response){
			alert(' Ops! :( ');
		}
	);
	
}]);