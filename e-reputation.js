// Global access
test = new Mongo.Collection( "test" );

if ( Meteor.isServer )
{
console.log(Meteor.http.call("GET", "https://www.kimonolabs.com/api/7amcc6em?apikey=YOkuRYZQhnkbwfVZCkl2auAoBOPVoQ7Y"));

    // Meteor.methods({
    //     checkTwitter: function () {
    //         this.unblock();
    //         return Meteor.http.call("GET", "http://search.twitter.com/search.json?q=perkytweets");
    //     }
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
}