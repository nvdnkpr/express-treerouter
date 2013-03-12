# express-treeRouter

Easy way for using tree routes in Express.js

## Installation

	$ npm install express-maprouter

## Sample

### Create this

	app.use(treeRouter({
		'products': {
			get: controller,
			post: controller
			content: {
				':product_id': {
					get: controller,
					put: controller,
					del: controller,
					content: {
						'tags': {
							get: controller,
							post: controller,
							content: {
								':tag_id': {
									get: controller,
									put: controller,
									del: controller
								}
							}
						},
						'comments': {
							get: controller,
							post: controller,
							content: {
								':comment_id': {
									get: controller,
									put: controller,
									del: controller
								}
							}
						}
					}
				}
			}
		}
	}));

### From this

	app.get('/products', controller);
	app.post('/products', controller);
	app.get('/products/:product_id', controller);
	app.put('/products/:product_id', controller);
	app.del('/products/:product_id', controller);
	
	app.get('/products/:product_id/tags', controller);
	app.post('/products/:product_id/tags', controller);
	app.get('/products/:product_id/tags/:tag_id', controller);
	app.put('/products/:product_id/tags/:tag_id', controller);
	app.del('/products/:product_id/tags/:tag_id', controller);
	
	app.get('/products/:product_id/tags', controller);
	app.post('/products/:product_id/comments', controller);
	app.get('/products/:product_id/comments/:comment_id', controller);
	app.put('/products/:product_id/comments/:comment_id', controller);
	app.del('/products/:product_id/comments/:comment_id', controller);

