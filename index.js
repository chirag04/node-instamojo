var https = require('https');
var querystring = require('querystring');

module.exports = {
    createClient: function(options) {
        if(!options.appId) throw new Error('appId is required');
        if(!options.token) options.token = null;
        return new instamojo(options);
    }
};

function instamojo (options) {
    this.appId = options.appId,
    this.token = options.token;
}

instamojo.prototype.getAuthToken = function(username, password, callback) {
    var options = {
        url: 'auth/',
        method: 'POST',
        appId: this.appId,
        token: this.token,
        body: {
            username: username,
            password: password
        }
    };
    makeRequest(options, function(err, res) {
        if(err) {
            callback(err);
        } else if(!res.success) {
            callback(new Error(res.message));
        } else {
            callback(null, res.token);
        }
    });
};

instamojo.prototype.delAuthToken = function(token, callback) {
    var options = {
        url: 'auth/' + token + '/',
        method: 'DELETE',
        appId: this.appId
    };
    makeRequest(options, function(err, res) {
        if(err) {
            callback(err);
        } else if(!res.success) {
            callback(new Error(res.message));
        } else {
            callback(null, res.message);
        }
    });
};

instamojo.prototype.listOffers = function(callback) {
    var options = {
        url: 'offer/',
        method: 'GET',
        appId: this.appId,
        token: this.token
    };
    makeRequest(options, function(err, res) {
        if(err) {
            callback(err);
        } else if(!res.success) {
            callback(new Error(res.message));
        } else {
            callback(null, res.offers);
        }
    });
};

instamojo.prototype.getOffer = function(slug, callback) {
    var options = {
        url: 'offer/'+slug+'/',
        method: 'GET',
        appId: this.appId,
        token: this.token
    };
    makeRequest(options, function(err, res) {
        if(err) {
            callback(err);
        } else if(!res.success) {
            callback(new Error(res.message));
        } else {
            callback(null, res.offer);
        }
    });
};

instamojo.prototype.archiveOffer = function(slug, callback) {
    var options = {
        url: 'offer/'+slug+'/',
        method: 'DELETE',
        appId: this.appId,
        token: this.token
    };
    makeRequest(options, function(err, res) {
        if(err) {
            callback(err);
        } else if(!res.success) {
            callback(new Error(res.message));
        } else {
            callback(null, res.message);
        }
    });
};

function makeRequest(options, callback) {
    var options = {
        host: 'www.instamojo.com',
        path: '/api/1/' + options.url,
        method: options.method,
        headers: {
            'X-App-Id': options.appId,
            'X-Auth-Token': options.token
        }
    };

    var req = https.request(options, function(res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });

        res.on('end', function(){
            callback(null, JSON.parse(data));
        });

    });

    req.on('error', function(err) {
        callback(err);
    });
    
    req.write(querystring.stringify(options.body));
    req.end();

}