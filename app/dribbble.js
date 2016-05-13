'use strict';

var client_id = '251eccbc923c4d792366411d7587058eb2a4527dc7fcf2380879172479106e6f';
var api_url = 'https://api.dribbble.com/v1{relative_url}?access_token=' + client_id; 

angular.module('Dribbble', [])

.factory('ShotsResource', function ($resource) {
	return $resource(BuildUrl('/shots/:id'), { per_page: 30 }, {
		query: { method:'GET', isArray: true, cache: true }
	});
});

function BuildUrl(relative_url) {
	return api_url.replace('{relative_url}', relative_url);
}
