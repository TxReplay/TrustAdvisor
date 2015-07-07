// Global access
test = new Mongo.Collection( "test" );

if ( Meteor.isServer )
{
// var blablaApi = Meteor.http.call("GET", "https://www.kimonolabs.com/api/7amcc6em?apikey=YOkuRYZQhnkbwfVZCkl2auAoBOPVoQ7Y");


// console.log(blablaApi);
    // Meteor.methods({
        // getBlablaCar: function () {
            // this.unblock();
            // return Meteor.http.call("GET", "https://www.kimonolabs.com/api/7amcc6em?apikey=YOkuRYZQhnkbwfVZCkl2auAoBOPVoQ7Y");
        // }
    // });
}

if ( Meteor.isClient )
{
	Template.layout.events
	({
		'click .logout' : function ( event, template )
		{
			Meteor.logout();
			Router.go('/');
		},
		
	});

	Meteor.call("getBlablaCar", function(error, results) {
        console.log(results.content); //results.data should be a JSON object
    });
}