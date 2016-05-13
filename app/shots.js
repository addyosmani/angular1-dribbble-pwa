'use strict';

angular.module('Shots', ['ngRoute'])

.controller('ShotsCtrl', function(ShotsResource, $scope, $uibModal, $http) {
	$scope.page = 1;
	$scope.shots = [];	
	$scope.loading = true;
	
	ShotsResource.query({ page: $scope.page }).$promise.then(function(data) {
		$scope.shots = data;
		$scope.loading = false;
	});
	
	$scope.showDetails = function (index) {
		$uibModal.open({
			templateUrl: 'details',
			size: 'details',
			controller: 'DetailsCtrl',
			resolve: {
				shot: function() {
					return $scope.shots[index];
				}
			}
		});
	}
	
	$scope.loadMore = function () {
		$scope.page += 1;
		$scope.loading = true;
		
		ShotsResource.query({ page: $scope.page, per_page: 12 }).$promise.then(function (data) {
			for (var key in data)
			{
				if (!isNaN(key))
					$scope.shots.push(data[key]);
			}
			$scope.loading = false;
		});
	}
});
