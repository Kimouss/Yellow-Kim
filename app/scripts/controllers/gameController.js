'use strict';

angular.module('blackJackApp')
	.controller('GameCtrl', ['$scope', 'storage', '$location', '$window', function ($scope, storage, $location, $window) {
		$scope.user = storage.get('user');

		if (!$scope.user) {
			return $location.path('/main')
		}

		$scope.players = [
			$scope.user
		];

		function initCards() {
			$scope.robot = {pseudo: 'Mr. Robot'};
			$scope.cards = {
				spades: ['as', '2', '3', '4', '5', '6', '7', '8', '9', 'jack', 'queen', 'king'],
				hearts: ['as', '2', '3', '4', '5', '6', '7', '8', '9', 'jack', 'queen', 'king'],
				clovers: ['as', '2', '3', '4', '5', '6', '7', '8', '9', 'jack', 'queen', 'king'],
				tiles: ['as', '2', '3', '4', '5', '6', '7', '8', '9', 'jack', 'queen', 'king']
			};

			$scope.robot.cards = [robotHit()];
		}

		initCards();

		// FUNCTIONS
		function randomCard(obj) {
		    var result;
		    var count = 0;

		    for (var prop in obj) {
		        if (Math.random() < 1/++count) {
		           result = prop;
		        }
		    }

		    return result;
		}

		function singleCard() {
			var face = randomCard($scope.cards);
			var number = randomCard($scope.cards[face]);
			var cardValue = $scope.cards[face][number];

			var card = {
				face: face,
				number: cardValue,
				total: face + ' ' + cardValue
			}

			var del = $scope.cards[face].indexOf($scope.cards[face][number]);
			if(del != -1) {
				$scope.cards[face].splice(del, 1);
			}

			return card;
		}

		function robotHit() {
			_.each($scope.players, function (player) {
				player.hit = true;
			});

			if ($scope.robot.score >= 17) {
				return;
			}

			if ($scope.robot.cards) {
				return $scope.robot.cards.push(singleCard());
			}

			return singleCard();
		}

		function calculScore(playerScore) {
			var score = 0;
			_.each(playerScore.cards, function(card) {
				if ('jack' === card.number || 'queen' === card.number || 'king' === card.number) {
					card.number = 9;
				}

				if ('as' === card.number) {
					card.number = 1;
				}

				score = score + parseInt(card.number);
			});

			playerScore.score = score;
		}

		// SCOPE FUNCTIONS
		$scope.addPlayer = function(event) {
			event.preventDefault();

			$scope.players.push(angular.copy($scope.supPlayer));
			$scope.supPlayer.pseudo = null;
		}

		$scope.reset = function(event) {
			event.preventDefault();
			$window.location.reload();

			$scope.players = [
				$scope.user
			];
		}

		$scope.newGame = function(event) {
			event.preventDefault();

			initCards();

			_.each($scope.players, function(player) {
				player.cards.splice(0, player.cards.length);
				player.score = 0;
			})
		}

		// WATCHERS
		$scope.$watch('robot.cards', function (newValue, oldValue) {
			calculScore($scope.robot);
		}, true);

		// EVENTS
		$scope.$on('removePlayer', function(event, player) {
			$scope.players = _.without($scope.players, _.findWhere($scope.players, player));
		});

		$scope.$on('hitPlayer', function(event, player) {
			var player = _.findWhere($scope.players, player);
			if (!player.cards) {
				player.cards = [];
			}

			player.hit = false;

			player.cards.push(singleCard());

			$scope.increment = false;
			_.each($scope.players, function(otherPlayer) {
				$scope.increment = otherPlayer.hit === player.hit;
			})

			calculScore(player);

			if ($scope.increment) {
				robotHit();
			}
		})
	}]);
