var fs = require('fs');

// post/put/get - /account
// get - /balance
// post - /trust
// post /transaction
// get /(id)
// post /submit 

// account (CRUD)
// API key (replace)
// web hooks (CRUD)

module.exports = function(app){

	app.get('/',
		function(req, res){
			res.render('./index.html');
		});
}

