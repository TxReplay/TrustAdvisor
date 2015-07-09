// Global access
test = new Mongo.Collection( "test" );

if ( Meteor.isClient )
{

	Template.navigation.events
	({
		'click .logout' : function ( event, template )
		{
			Meteor.logout();
			Router.go('/');
		},

		'click .login' : function ( event, template )
		{
			var shareDialogInfo = {
			    template: Template.loginSignup,
			    modalDialogClass: "custom-modal-dialog", //optional
			    modalBodyClass: "custom-modal-body", //optional
			    modalFooterClass: "custom-modal-footer",//optional
			    removeOnHide: true, //optional. If this is true, modal will be removed from DOM upon hiding
			    doc: {  // Provide data context for Template.appShareDialog
			      app: "My Application"
			    }
			  }

		  	window.popupLogin = ReactiveModal.initDialog(shareDialogInfo);
			window.popupLogin.show();
		}

	});

	Template.loginSignup.events
	({
		
		'click #login' : function ( e, t )
		{
			var email = t.find('#login-email').value;
	        var password = t.find('#login-password').value;

	        Meteor.loginWithPassword(email, password, function (err) {
	            if (err) {
	                // alert('Mail ou mot de passe incorect');
	            }
	            else {
	                Router.go('/');
	                window.popupLogin.hide();
	            }
	        });
	        return false;

		},

        'click #submit_user': function (event, template) {

        	if ( $('#login').is(':hidden') ) {

	    		event.preventDefault();
	            var $mail = template.find("#register-email");
	            var $pass = template.find("#register-password");
	            var $nom = template.find("#register-nom");
	            var $prenom = template.find("#register-prenom");

	            if ($mail.value != "" && $pass.value != "" && $nom.value != "" && $prenom.value != "") {
	                Accounts.createUser(
	                    {
	                        email: $mail.value,
	                        password: $pass.value,
	                        profile: {
	                            nom: $nom.value,
	                            prenom: $prenom.value,
	                            linkedAcc: 0
	                        }
	                    }, function (err) {
	                        if (err) {
	                            // Inform the user that account creation failed
	                            alert('register failed');
	                        } else {
	                            // Success. Account has been created and the user
	                            // has logged in successfully.
	                            Router.go('/');
	                            window.popupLogin.hide();
	                        }
	                    });
	            }

            }
            else
            {
            	$( "#login" ).slideUp( "slow", function() {
		        	$('#creatingAccount').slideDown( "slow");
							});
            }
        },
	});

	Template.addAccountDialog.events({
		
		'click #blabla-add' : function (event, template) {

        $("#blabla-add").toggleClass('visible hidden');
        $("#blabla-id").toggleClass('visible hidden');
        $("#blabla-save").toggleClass('visible hidden');
    },

    'click #blabla-save' : function(event, template) {
				var user = Meteor.users.findOne(this.userId);
        var blabla_id = template.find("#blabla-id-input").value;
        if ( blabla_id ) {
            Meteor.users.update( { _id: user._id }, {$set: {"profile.blablaId" : "0KjfoFenIKvojq2_1a4PYw", "profile.pseudoBlabla" : blabla_id} } );
        }
        else {
            alert('C\'est vide...');
        }
    },
		
		'click #ebay-add' : function (event, template) {

        $("#ebay-add").toggleClass('visible hidden');
        $("#ebay-id").toggleClass('visible hidden');
        $("#ebay-save").toggleClass('visible hidden');
    },

    'click #ebay-save' : function(event, template) {
				var user = Meteor.users.findOne(this.userId);
        var username = template.find("#ebay-id-input").value;
        if ( username ) {
            Meteor.users.update( { _id: user._id }, {$set: {"profile.ebayId" : username} } );
        }
        else {
            alert('C\'est vide...');
        }
    },
		
		'click #bnb-add' : function (event, template) {

        $("#bnb-add").toggleClass('visible hidden');
        $("#bnb-id").toggleClass('visible hidden');
        $("#bnb-save").toggleClass('visible hidden');
    },

    'click #bnb-save' : function(event, template) {
				var user = Meteor.users.findOne(this.userId);
        var bnb_id = template.find("#bnb-id-input").value;
        if ( bnb_id ) {
            Meteor.users.update( { _id: user._id }, {$set: {"profile.bnbId" : "2241893", "profile.pseudoBnb" : bnb_id} } );
        }
        else {
            alert('C\'est vide...');
        }
    }
	});
}