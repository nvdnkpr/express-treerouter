var _ = require('underscore');

var mapRouter = function(express, routes){
	this.app = express();
	this.methods = {
		all: 'all',
		get: 'get',
		post: 'post',
		put: 'put',
		del: 'del',
		delete: 'del'
	};
	this.parse(routes);
	return this.app;
};

mapRouter.prototype.parse = function(routes, originPath){
	var self = this;
	_.each(routes, function(route, path){
		var targetPath = (originPath || '')+'/'+path;
		_.each(self.methods, function(method, methodKey){
			if ( typeof(route[(methodKey)]) !== 'undefined' ) {
				self.app[(method)](targetPath, route[(methodKey)]);
			}
		});
		if ( typeof(route.content) === 'object' ) self.parse(route.content, targetPath);
	});
};

module.exports = function( express ){
	return function ( routes ) {
		return new mapRouter(express, routes);
	}
};
