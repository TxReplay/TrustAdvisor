// Global access
test = new Mongo.Collection( "test" );

if ( Meteor.isClient )
{
	Template.navigation.events
	({
		'click .logout' : function ( event, template )
		{
			

			new Confirmation({
			  message: "Are you sure ?",
			  title: "Confirmation",
			  cancelText: "Cancel",
			  okText: "Ok",
			  success: true // wether the button should be green or red
			}, function (ok) {

				

				if (ok) {
					Meteor.logout();
					Router.go('/');
				};
			  // ok is true if the user clicked on "ok", false otherwise
			});
		},

	});


	Meteor.startup(function(){
	  var shareDialogInfo = {
	    template: Template.appShareDialog,
	    title: "Share the app",
	    modalDialogClass: "share-modal-dialog", //optional
	    modalBodyClass: "share-modal-body", //optional
	    modalFooterClass: "share-modal-footer",//optional
	    removeOnHide: true, //optional. If this is true, modal will be removed from DOM upon hiding
	    buttons: {
	      "cancel": {
	        class: 'btn-danger',
	        label: 'Cancel'
	      },
	      "ok": {
	        closeModalOnClick: false, // if this is false, dialog doesnt close automatically on click
	        class: 'btn-info',
	        label: 'Ok'
	      }

	    },
	    doc: {  // Provide data context for Template.appShareDialog
	      app: "My Application"
	    }
	  }

	  var rd = ReactiveModal.initDialog(shareDialogInfo);

	  rd.show();

	});
}