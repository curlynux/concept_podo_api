
const CONF           = require(ROOT+"/config/conf");
const {log}          = require(ROOT+"/src/ConceptPodoComponent/Service/LogService");
const {Mongo}        = require(ROOT+"/src/ConceptPodoComponent/Service/Mongo");
const {cacheService} = require(ROOT+"/src/ConceptPodoComponent/Service/CacheService");

/**
 * Email Manager
 *
 * @author Thomas Dupont
 */
class SuggestManager {

    constructor()
    {
        this.email      = false;
        this.error      = "";
        this.statusCode = 200;
    }

}

module.exports.suggestManager = new SuggestManager();