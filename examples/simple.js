var express = require('express'),
	mapRouter = require('../index.js'),
	app = express();

var sampleController = function(req, res){
	res.send(req.method+' '+req.url);
};

var map = {
	'products': {
		get: sampleController,
		post: sampleController,
		content: {
			':product_id': {
				get: sampleController,
				put: sampleController,
				del: sampleController,
				content: {
					'tags': {
						get: sampleController,
					},
					'comments': {
						get: sampleController,
						post: sampleController,
						content: {
							':comment_id': {
								get: sampleController,
								put: sampleController,
								del: sampleController
							}
						}
					}
				}
			}
		}
	}
};

app.configure(function(){
	app.set('title', 'SimpleSample');
	app.use(mapRouter(map));
});

app.listen(8000);
