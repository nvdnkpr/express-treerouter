var express = require('express'),
	_ = require('underscore');

var mapRouter = function(routes){
	this.app = express();
	this.methods = {
		all: 'all',
		get: 'get',
		post: 'post',
		put: 'put',
		del: 'del',
		delete: 'del'
	};
	/*
	if (typeof(routes) !== 'object') {
		// Space for error
		return app;
	}
	*/
	this.parse(routes);
	return this.app;
};

mapRouter.prototype.parse = function(routes, originPath){
	var obj = this;
	_.each(routes, function(route, path){
		var targetPath = (originPath || '')+'/'+path;
		_.each(obj.methods, function(method, methodKey){
			if ( typeof(route[(methodKey)]) !== 'undefined' ) { // === function, object..?
				obj.app[(method)](targetPath, route[(methodKey)]);
			}
		});
		if ( typeof(route.content) === 'object' ) obj.parse(route.content, targetPath);
	});
};

module.exports = function(routes){
	return new mapRouter(routes);
};
