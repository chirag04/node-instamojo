var instamojo = require('../');

instamojo = instamojo.createClient({
	appId: '8b56476219c163922b66565abe6c4112'
});

instamojo.getAuthToken('username', 'password', function(err, token) {
	console.log(err);
	console.log(token);
});

instamojo.delAuthToken('token', function(err, message) {
	console.log(err);
	console.log(message);
});

instamojo.listOffers(function(err, offers) {
	console.log(err);
	console.log(offers);
});

instamojo.getOffer('slug', function(err, offer) {
	console.log(err);
	console.log(offer);
});

instamojo.archiveOffer('slug', function(err, message) {
	console.log(err);
	console.log(message);
});