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

	});
}