Template.login.events({

    'click #login' : function(e, t){
      e.preventDefault();
      var email = t.find('#login-email').value;
			var	password = t.find('#login-password').value;

        Meteor.loginWithPassword(email, password, function(err){
        if (err){
					alert('Mail ou mot de passe incorect');
				}
        else{
					Router.go('/');
				}
      });
         return false; 
      }
  });