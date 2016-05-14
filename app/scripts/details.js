'use strict';

angular.module('Details', ['ngRoute'])

.controller('DetailsCtrl', function($scope, $sce, shot) {
	$scope.shot = shot;
	
	if (typeof $scope.shot.description === 'string')
		$scope.shot.parsedDescription = $sce.trustAsHtml($scope.shot.description);
	else
		$scope.shot.parsedDescription = '';
});