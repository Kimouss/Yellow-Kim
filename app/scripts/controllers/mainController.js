'use strict';

angular.module('blackJackApp')
  .controller('MainCtrl', ['$scope', 'storage', '$location', function ($scope, storage, $location) {
    $scope.submit = function(event) {
    	event.preventDefault();
    	storage.set('user', $scope.player);

    	return $location.path('/jeu');
    }
  }]);
