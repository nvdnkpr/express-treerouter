var express = require('express'),
	treeRouter = require('../index.js')(express),
	app = express();

var controller = function(req, res){
	res.send(req.method+' '+req.url);
};
var error404Controller = function(req, res){
	res.status(404);
	res.send('404: '+req.method+' '+req.url);
};

var tree = {
	'' : { get: controller },
	'products': { get: controller, post: controller, content: {
		':product_id': { get: controller, put: controller, del: controller, content: {
			'tags': { get: controller, post: controller, content: {
				':tag_id': { get: controller, put: controller, del: controller }
			}},
			'comments': { get: controller, post: controller, content: {
				':comment_id': { get: controller, put: controller, del: controller }
			}},
			'owners': { get: controller, post: controller, content: {
				':owner_id': { get: controller, put: controller, del: controller }
			}}
		}}
	}},
	'*' : { all: error404Controller }
};

app.configure(function(){
	app.set('title', 'Simple');
	app.use(treeRouter(tree));
});

app.listen(8000);
