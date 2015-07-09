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

		linked : function() {
				return this.profile.linkedAcc;
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

    // loadedInfo : function(service) {

        // switch (service) {

            // case 'blabla' :
                // var blabla = (this.profile.blablaNote) ? true : false;
                // break;

            // case 'ebay' :
                // var ebay = (this.profile.ebayNote) ? true : false;
                // break;

            // case 'bnb' :
                // var bnb = (this.profile.bnbNbAvis) ? true : false;
                // break;
        // }
    // },

    blablaAccount : function() {
        if (typeof this.profile.blablaId != 'undefined') {
            return true;
        }
        else{
            return false;
        }
    },

    blablaId : function() {
        return this.profile.pseudoBlabla;
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
                    else {
                        var infos_set = {"note" : result.data.results.collection1[0].note, "nbAvis" : result.data.results.collection1[0].nb_avis,"linked" : true};
                        Session.set('bla', infos_set);
                    }
                });
                var infos = Session.get('bla');
								if ( !this.profile.linkedBlabla ) {
									var linked = this.profile.linkedAcc;
									linked = (infos.linked) ? linked + 1 : linked;
									Meteor.users.update( { _id: this._id }, {$set: {"profile.blablaNote" : infos.note, "profile.blablaNbAvis" : infos.nbAvis, "profile.linkedAcc" : linked, "profile.linkedBlabla" : true} } );
								}
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
							var test = result.data.results.collection1[0].note;
							test.split(/[^0-9]{1,}/);
							var notT = parseInt(test[0]);
							var noteTrust = (note /100 * 5).toFixed(2);
							// var random = ((Math.random() * 5) + 1).toFixed(2);
							// if ( random > 5 ) {
								// random = Math.floor(random);
							// }
							var infos_set = {"note" : note, "noteTrust" : noteTrust, "linked" : true};
							Session.set('ebay', infos_set);
						}
					});
					var infos = Session.get('ebay');
					if ( !this.profile.linkedEbay ) {
						var linked = this.profile.linkedAcc;
						linked = (infos.linked) ? linked + 1 : linked;
						Meteor.users.update( { _id: this._id }, {$set: {"profile.ebayNote" : infos.note, "profile.ebayNoteTrust" : infos.noteTrust, "profile.linkedAcc" : linked, "profile.linkedEbay" : true} } );
					}
					sleep(100);
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
        return this.profile.pseudoBnb;
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
								if ( !this.profile.linkedBnb ) {
									var linked = this.profile.linkedAcc;
									linked = (infos.linked) ? linked + 1 : linked;
									Meteor.users.update( { _id: this._id }, {$set: {"profile.bnbNote" : infos.note, "profile.bnbNbAvis" : infos.nbAvis, "profile.linkedAcc" : linked, "profile.linkedBnb" : true} } );
								}
                return infos;
            }
        }
    }

});

Template.user.events({

    'click #blabla-delete' : function(event, template) {
        var linked = this.profile.linkedAcc;
        linked--;
        Meteor.users.update( { _id: this._id }, {$unset: {"profile.blablaId" : "", "profile.blablaNote" : "", "profile.blablaNbAvis" : "", "profile.pseudoBlabla" : ""}, $set: { "profile.linkedAcc" : linked, "profile.linkedBlabla" : false} } );
    },

    'click #ebay-delete' : function(event, template) {
        var linked = this.profile.linkedAcc;
        linked--;
        Meteor.users.update( { _id: this._id }, {$unset: {"profile.ebayId" : "", "profile.ebayNote" : "", "profile.ebayNoteTrust" : ""}, $set: { "profile.linkedAcc" : linked, "profile.linkedEbay" : false} } );
    },

    'click #bnb-delete' : function(event, template) {
        var linked = this.profile.linkedAcc;
        linked--;
        Meteor.users.update( { _id: this._id }, {$unset: {"profile.bnbId" : "", "profile.bnbNote" : "", "profile.bnbNbAvis" : "", "profile.pseudoBnb" : ""}, $set: { "profile.linkedAcc" : linked, "profile.linkedBnb" : false} } );
    },
		
		'click .profil-link-add' : function() {
			var user = Meteor.users.findOne({ _id : this._id });
			var shareDialogInfo = {
				template: Template.addAccountDialog,
				title: "Link an account",
				removeOnHide: true, //optional. If this is true, modal will be removed from DOM upon hiding
				buttons: {
					"ok": {
						class: 'btn-info',
						label: 'Done'
					}
				},
				doc: {  // Provide data context for Template.appShareDialog
					blablaAccount : function() {
						if (typeof user.profile.blablaId != 'undefined') {
								return true;
						}
						else{
								return false;
						}
					},

					blablaId : function() {
						return user.profile.pseudoBlabla;
					},
					
					ebayAccount : function() {
						if (typeof user.profile.ebayId != 'undefined') {
							return true;
						}
						else{
							return false;
						}
					},
					ebayId : function() {
						return user.profile.ebayId;
					},

					bnbAccount : function() {
						if (typeof user.profile.bnbId != 'undefined') {
							return true;
						}
						else{
							return false;
						}
					},

					bnbId : function() {
						return user.profile.pseudoBnb;
					}
				}
			}

			var rd = ReactiveModal.initDialog(shareDialogInfo);

			rd.show();
		}
		
});