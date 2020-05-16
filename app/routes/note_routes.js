
  module.exports = function(app, db) {
 
	  app.post('/login/', (req, res) => {
		
		response_json = { status: '', msg: '', token_key: '' }
		
		const to_query_user_data = { 'username': req.body.phone, 'password': req.body.password };
		
		db.collection('users').findOne( to_query_user_data, (err, result) => {
			
			if (err) {
				
				console.log('User Authentication Failed :: ');
				response_json.status = 0 ;
				response_json.msg = 'failed' ;		
				
			}else{
				
				if (result){
					
					console.log('User Authentication Successfull :: ', result);
					response_json.status = 1 ;
					response_json.msg = 'success' ;
					
					// generate token on success start here 
					
						var jwt = require('jsonwebtoken');
						var to_pass_into_token = result;
						
						response_json.expire_in = '3h';
						
						var token = jwt.sign({
						  data: to_pass_into_token
						}, 'secret', { expiresIn: response_json.expire_in });						
					
						response_json.token_key = token ;
						response_json.login_user_id = result._id ;
					
				}else{
					
					console.log('User Authentication Failed :: ', result);
					response_json.status = 0 ;
					response_json.msg = 'failed' ;					
				}
			}
			
			res.send( response_json ) ;
		})	
		
	 }); 
	
	
  app.post('/registration', (req, res) => {
	
	var response_json = { status: '', msg: '' }
	
    const user_post_data = { 'username': req.body.phone, 'password': req.body.password };
	
	db.collection('users').findOne(user_post_data, (err, result) => {
			if (result){
				
				console.log('Username already exist :: ');
				response_json.status = 0 ;
				response_json.msg = 'Username already exist' ;
				res.send(response_json);
				
			}else{
				
				db.collection('users').insert(user_post_data, (err, result) => {
				  if (err) { 
					res.send({ 'error': 'An error has occurred' }); 
				  } else {
					res.send({ 'error': 0, 'status' : 'registration successfull...'});
				  }
				});
			}
	});
		
  });

};