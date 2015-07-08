Template.user.helpers({
	
		nom : function() {
			return this.profile.nom;
		},
		
		mail : function() {
			return this.emails[0].address;
		},
		
		username : function() {
			return this.profile.username;
		},
		
		prenom : function() {
			return this.profile.prenom;
		},
		
		trustIndicator :function() {
			var profile = this.profile;
			if (profile.linkedAcc > 1) {
				var linked = profile.linkedAcc;
				var notes = [profile.blablaNote, profile.ebayNoteTrust, profile.bnbNote];
				var trustInd = 0;
				for (var i=0; i<notes.length; i++) {
					if (notes[i]) {
						trustInd += parseFloat(notes[i]);
					}
				}
				trustInd = (trustInd/ linked).toFixed(2);
				var text = "Votre note TrustAdvisor est de : " + trustInd;
				return text;
			}
			else {
				return "Veuillez renseigner au moins 2 comptes pour recevoir votre note TrustAdvisor!";
			}
		},
		
		loadedInfo : function(service) {
				
			switch (service) {
			
				case 'blabla' :
					var blabla = (this.profile.blablaNote) ? true : false;
					break;
					
				case 'ebay' :
					var ebay = (this.profile.ebayNote) ? true : false;
					break;
					
				case 'bnb' :
					var bnb = (this.profile.bnbNbAvis) ? true : false;
					break;
			}
		},
		
		blablaAccount : function() {
			if (typeof this.profile.blablaId != 'undefined') {
				return true;
			}
			else{
				return false;
			}
		},
		
		blablaId : function() {
			return this.profile.blablaId;
		},
		
		blablaInfos : function() {
			var note = this.profile.blablaNote;
			var nbAvis = this.profile.blablaNbAvis;
			if ( note && nbAvis ) {
				var infos = {
					"note" : note,
					"nbAvis" : nbAvis
				};
				return infos;
			}
			else {
				var id = this.profile.blablaId;
				if ( id ) {
					Meteor.call("getBlablaInfoswithID", id, function(error, result){
						if (error) {
							var infos_set = {"linked" : false};
							Session.set('bla', infos_set);
						}
						else{
							var infos_set = {"note" : result.data.results.collection1[0].note, "nbAvis" : result.data.results.collection1[0].nb_avis,"linked" : true};
							Session.set('bla', infos_set);
						}
					});
					var infos = Session.get('bla');
					var linked = this.profile.linkedAcc;
					linked = (infos.linked) ? linked + 1 : linked;
					Meteor.users.update( { _id: this._id }, {$set: {"profile.blablaNote" : infos.note, "profile.blablaNbAvis" : infos.nbAvis, "profile.linkedAcc" : linked} } );
					return infos;
				}
			}
		},
		
		ebayAccount : function() {
			if (typeof this.profile.ebayId != 'undefined') {
				return true;
			}
			else{
				return false;
			}
		},
		
		ebayInfos : function() {
			var note = this.profile.ebayNote;
			var noteTrust = this.profile.ebayNoteTrust;
			if ( note && noteTrust) {
				var infos = {
					"note" : note,
					"noteTrust" : noteTrust
				};
				return infos;
			}
			else {
				var username = this.profile.ebayId;
				if ( username ) {
					Meteor.call("getEbayInfoswithUsername", username, function(error, result){
						if (error) {
							var infos_set = {"linked" : false};
							Session.set('bla', infos_set);
						}
						else {
								
							var note = result.data.results.collection1[0].note;
							// test.split(/[^0-9]{1,}/);
							// var note = int(test[0]);
							// var noteTrust = (note /100 * 5).toFixed(2);
							var random = ((Math.random() * 5) + 1).toFixed(2);
							if ( random > 5 ) {
								random = Math.floor(random);
							}
							var infos_set = {"note" : note, "noteTrust" : random, "linked" : true};
							Session.set('ebay', infos_set);
						}
					});
					var infos = Session.get('ebay');	
					var linked = this.profile.linkedAcc;
					linked = (infos.linked) ? linked + 1 : linked;
					Meteor.users.update( { _id: this._id }, {$set: {"profile.ebayNote" : infos.note, "profile.ebayNoteTrust" : infos.noteTrust, "profile.linkedAcc" : linked} } );
					return infos;
				}
			}
		},
		
		ebayId : function() {
			return this.profile.ebayId;
		},
		
		bnbAccount : function() {
			if (typeof this.profile.bnbId != 'undefined') {
				return true;
			}
			else{
				return false;
			}
		},
		
		bnbId : function() {
			return this.profile.bnbId;
		}, 
		
		bnbInfos : function() {
			var note = this.profile.bnbNote;
			var nbAvis = this.profile.bnbNbAvis;
			if ( note && nbAvis ) {
				var infos = {
					"note" : note,
					"nbAvis" : nbAvis
				};
				return infos;
			}
			else {
				var id = this.profile.bnbId;
				if ( id ) {
					Meteor.call("getAirbnbInfoswithID", id, function(error, result){
						if (error) {
							var infos_set = {"linked" : false};
							Session.set('bla', infos_set);
						}
						else {
							
							var random = ((Math.random() * 5) + 1).toFixed(2);
							if ( random > 5 ) {
								random = Math.floor(random);
							}
							var infos_set = {"note" : random, "nbAvis" : result.data.results.collection1[0].nb_avis.text, "linked" : true};
							Session.set('bnb', infos_set);
						}
					});
					var infos = Session.get('bnb');
					var linked = this.profile.linkedAcc;
					linked = (infos.linked) ? linked + 1 : linked;
					Meteor.users.update( { _id: this._id }, {$set: {"profile.bnbNote" : infos.note, "profile.bnbNbAvis" : infos.nbAvis, "profile.linkedAcc" : linked} } );
					return infos;
				}
			}
		}
		
});

Template.user.events({
	
	'click #blabla-add' : function (event, template) {
		
		$("#blabla-add").toggleClass('visible hidden');
    $("#blabla-id").toggleClass('visible hidden');
    $("#blabla-save").toggleClass('visible hidden');
	},
	
	'click #blabla-save' : function(event, template) {
		var blabla_id = template.find("#blabla-id").value;
		if ( blabla_id ) {
			Meteor.users.update( { _id: this._id }, {$set: {"profile.blablaId" : blabla_id} } );
		}
		else {
			alert('C\'est vide...');
		}
	},
	
	'click #blabla-delete' : function(event, template) {
		var linked = this.profile.linkedAcc;
		linked--;
		Meteor.users.update( { _id: this._id }, {$unset: {"profile.blablaId" : "", "profile.blablaNote" : "", "profile.blablaNbAvis" : ""}, $set: { "profile.linkedAcc" : linked} } );
},
	
	'click #ebay-add' : function (event, template) {
		
		$("#ebay-add").toggleClass('visible hidden');
    $("#ebay-id").toggleClass('visible hidden');
    $("#ebay-save").toggleClass('visible hidden');
	},
	
	'click #ebay-save' : function(event, template) {
		var ebay_id = template.find("#ebay-id").value;
		if ( ebay_id ) {
			var linked = this.profile.linkedAcc;
			linked++;
			Meteor.users.update( { _id: this._id }, {$set: {"profile.ebayId" : ebay_id, "profile.linkedAcc" : linked} } ); 
		}
		else {
			alert('C\'est vide...');
		}
	},
	
	'click #ebay-delete' : function(event, template) {
		var linked = this.profile.linkedAcc;
		linked--;
		Meteor.users.update( { _id: this._id }, {$unset: {"profile.ebayId" : "", "profile.ebayNote" : "", "profile.ebayNoteTrust" : ""}, $set: { "profile.linkedAcc" : linked} } );
	},
	
	'click #bnb-add' : function (event, template) {
		
		$("#bnb-add").toggleClass('visible hidden');
    $("#bnb-id").toggleClass('visible hidden');
    $("#bnb-save").toggleClass('visible hidden');
	},
	
	'click #bnb-save' : function(event, template) {
		var bnb_id = template.find("#bnb-id").value;
		if ( bnb_id ) {
			var linked = this.profile.linkedAcc;
			linked++;
			Meteor.users.update( { _id: this._id }, {$set: {"profile.bnbId" : bnb_id, "profile.linkedAcc" : linked} } );
		}
		else {
			alert('C\'est vide...');
		}
	},
	
	'click #bnb-delete' : function(event, template) {
		var linked = this.profile.linkedAcc;
		linked--;
		Meteor.users.update( { _id: this._id }, {$unset: {"profile.bnbId" : "", "profile.bnbNote" : "", "profile.bnbNbAvis" : ""}, $set: { "profile.linkedAcc" : linked} } );
	}
});