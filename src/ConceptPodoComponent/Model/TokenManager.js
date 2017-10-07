
const randtoken = require("rand-token").uid;
const CONF      = require(ROOT+"/config/conf");

/**
 * Manage Token
 *
 * @author Thomas Dupont
 */
class TokenManager {

    generateAleaCode()
    {
        var n = "";
        for( var i = 5; i >= 0; i--) {
            n += parseInt(Math.random() * 10);
        }
        return n;
    }

    generateToken(i = 48)
    {
        return randtoken(i);
    }

    checkValidity(updatedTime)
    {
        return (Math.floor(Date.now() / 1000) - updatedTime) < CONF.evtValidity;
    }
}

module.exports.tokenManager = new TokenManager();
