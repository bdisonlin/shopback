var conf = require("./parm.conf.js");

module.exports = {
    deletecheck: function (req, callback) {
        try {
                callback(null, conf.allow_agent.includes(req.get('X-SHOPBACK-AGENT')));

        } catch (e) {
            callback(e, conf.allow_agent.includes(req.get('X-SHOPBACK-AGENT')));
        }
    },

    postcheck: function (req, callback) {
        try {
            if (req.header('X-SHOPBACK-AGENT')
                && req.header('Content-Type')
                && req.header('Content-Type') === 'application/json') {
                callback(null, true);
            }
        } catch (e) {
            callback(e, false);
        }
    }

};