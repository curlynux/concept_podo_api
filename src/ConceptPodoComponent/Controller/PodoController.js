
const CONF              = require(ROOT+"/config/conf");
const {suggestManager}  = require(ROOT+"/src/ConceptPodoComponent/Model/SuggestManager");
const {tokenManager}    = require(ROOT+"/src/ConceptPodoComponent/Model/TokenManager");
const {Mongo}           = require(ROOT+"/src/ConceptPodoComponent/Service/Mongo");
const {log}             = require(ROOT+"/src/ConceptPodoComponent/Service/LogService");

class PodoController
{
    /**
     * Return suggestion of mold
     *
     * @route("v1/suggest/:ref")
     *
     * @param req
     * @returns {Promise}
     */
    async generateSuggestAction(req)
    {
        const ref  = req.query.ref;
        let result;
        let response;

        try {
            await Mongo.connect()
        } catch (e) {
            log.simpleLog('Mongo error '+e);
            return {
                statusCode: 500,
                result: "error_database"
            };
        }

        /*
        try {
            result = await Mongo.findOne({enabled : true, token : evt}, CONF.mongoTokenCollection);
        } catch (e) {
            response = {
                statusCode : 404,
                result : "not_reconize"
            }
        }

        if (result) {
            response = tokenManager.checkValidity(result.updated_date) ?
                {
                    statusCode : 200,
                    result : {
                        email : result.email
                    }
                } : {
                statusCode : 404,
                    result : "evt_expired"
                };
        } else {
            response = {
                statusCode : 404,
                result : "not_reconize"
            }
        }

        return response;
         */
        return {
            statusCode : 200,
            result : {
                test : "test"
            }
        };
    }
}

module.exports.podoController = new PodoController();

