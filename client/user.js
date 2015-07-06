Template.user.helpers
(
	{
		nom : function() 
		{
			return Meteor.users.findOne({ _id : this._id}).profile.nom;
		},
		
		mail : function() 
		{
			return Meteor.users.findOne({ _id : this._id}).emails[0].address;
		},
		
		username : function() 
		{
			return Meteor.users.findOne({ _id : this._id}).profile.username;
		},
		
		prenom : function()
		{
			return Meteor.users.findOne({ _id : this._id }).profile.prenom;
		}
	}
);

Template.user.events({
	
	'click #blabla-add' : function (event, template) {
		
		$("#blabla-add").toggleClass('visible hidden');
    $("#blabla-id").toggleClass('visible hidden');
    $("#blabla-save").toggleClass('visible hidden');
	},
	
	'click #blabla-save' : function(event, template) {
		var blabla_id = template.find("#blabla-id");
		Meteor.users.update( { _id: this._id }, {$set: {"profile.blablaId" : blabla_id} } ); 
	},
	
	'click #ebay-add' : function (event, template) {
		
		$("#ebay-add").toggleClass('visible hidden');
    $("#ebay-id").toggleClass('visible hidden');
    $("#ebay-save").toggleClass('visible hidden');
	},
	
	'click #ebay-save' : function(event, template) {
		var ebay_id = template.find("#ebay-id");
		Meteor.users.update( { _id: this._id }, {$set: {"profile.ebayId" : ebay_id} } ); 
	},
	
	'click #bnb-add' : function (event, template) {
		
		$("#bnb-add").toggleClass('visible hidden');
    $("#bnb-id").toggleClass('visible hidden');
    $("#bnb-save").toggleClass('visible hidden');
	},
	
	'click #bnb-save' : function(event, template) {
		var bnb_id = template.find("#bnb-id");
		Meteor.users.update( { _id: this._id }, {$set: {"profile.bnbId" : bnb_id} } ); 
	}
});