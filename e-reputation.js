// Global access
test = new Mongo.Collection( "test" );


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