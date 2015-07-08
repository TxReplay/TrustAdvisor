Router.map(function(){
	this.configure({
        layoutTemplate: 'layout'
	});
	
	this.route('home', { path: '/' });
	this.route('login', { path: '/login' });
	this.route('register', { path: '/register' });
	
	this.route('user',{
		path: 'user/:_id',
		data: function() {
			var user = Meteor.users.findOne( this.params._id );
			return user;
		}
	});

});
