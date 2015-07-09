Meteor.methods({

	getBlablaInfoswithID: function(id) {
		this.unblock();
		return Meteor.http.call("GET", "http://www.kimonolabs.com/api/ondemand/6qwg23v4?apikey=YOkuRYZQhnkbwfVZCkl2auAoBOPVoQ7Y&kimpath1=membre&kimpath2=profil&kimpath3=" + id);
	},

	getEbayInfoswithUsername: function() {//username
		this.unblock();
		return Meteor.http.call("GET", "https://www.kimonolabs.com/api/9fonyppa?apikey=YOkuRYZQhnkbwfVZCkl2auAoBOPVoQ7Y");//"http://www.kimonolabs.com/api/ondemand/4ifc1p82?apikey=ulHmzZtiszzyC1zSCXLULuwmdUZBh3K4&kimpath1=usr&kimpath2=" + username);
	},

	getAirbnbInfoswithID: function(id) {
		this.unblock();
		return Meteor.http.call("GET", "http://www.kimonolabs.com/api/ondemand/3dvximvo?apikey=YOkuRYZQhnkbwfVZCkl2auAoBOPVoQ7Y&kimpath1=users&kimpath2=show&kimpath3=" + id);
	}
});