Meteor.methods({
	getBlablaInfos: function(){
		this.unblock();
		return Meteor.http.call("GET", "https://www.kimonolabs.com/api/7amcc6em?apikey=YOkuRYZQhnkbwfVZCkl2auAoBOPVoQ7Y");
	}
});