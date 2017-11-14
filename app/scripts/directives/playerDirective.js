'use strict';

angular.module('blackJackApp')
	.directive('player', function() {
	  return {
	    restrict: 'E',
	    templateUrl: './views/directives/player.html',
	    scope: {
	    	player: '=',
	    	ia: '='
	    },
	    controller: function($scope) {
            $scope.remove = function(event) {
            	event.preventDefault();
            	$scope.$emit('removePlayer', $scope.player);
            }

            $scope.hit = function(event) {
            	event.preventDefault();
            	$scope.$emit('hitPlayer', $scope.player);
            }

            $scope.stand = function(event) {
            	event.preventDefault();
            	$scope.$emit('standPlayer', $scope.player);
            }
	    }
	  };
	});