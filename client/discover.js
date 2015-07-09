	Template.discover.events
	({
		
		'click #submit' : function ( e, t )
		{

			$( "#questionnaire" ).slideUp( "slow", function() {
	        	$('#result').slideDown( "slow");
			});

		}
	});