Meteor.methods({
	getBlablaInfos: function(){
		this.unblock();
		return Meteor.http.call("GET", "https://www.kimonolabs.com/api/7amcc6em?apikey=YOkuRYZQhnkbwfVZCkl2auAoBOPVoQ7Y");
	},
	getBlablaInfoswithID: function(id){
		this.unblock();
		return Meteor.http.call("GET", "http://www.kimonolabs.com/api/ondemand/6qwg23v4&kimpath3=" + id);
	},
	
	getBnbInfos: function() {
		this.unblock();
		return Meteor.http.call("GET", "https://www.kimonolabs.com/api/7915pfn0?apikey=YOkuRYZQhnkbwfVZCkl2auAoBOPVoQ7Y");
	}
});