
const CONF           = require(ROOT+"/config/conf");
const {log}          = require(ROOT+"/src/ConceptPodoComponent/Service/LogService");
const {Mongo}        = require(ROOT+"/src/ConceptPodoComponent/Service/Mongo");

/**
 * Suggest Manager
 *
 * @author Thomas Dupont
 */
class SuggestManager {

    /**
     *
     * @param search
     * @returns {Promise.<*>}
     */
    async generateSuggestion(search)
    {
        let result;
        try {
            await Mongo.connect();
        } catch (e) {
            log.simpleLog('Mongo error '+e);
            return {
                statusCode: 500,
                result: "error_database"
            };
        }

        try {
            let sum = [], el;
            for(el in search) {
                sum.push(
                    {
                        $abs: {
                            $multiply : [
                                {
                                    $subtract: [
                                        parseInt((search[el].value || 0) * 10),
                                        '$' + el
                                    ]
                                },
                                parseInt(search[el].pond || 1)
                            ]
                        }
                    }
                );
            }
            result = await Mongo.aggregate(
                [
                    {
                        $project: {
                            diff: {
                                $sum : sum
                            },
                            doc: '$$ROOT'
                        }
                    },
                    // Order the docs by diff
                    {$sort: {diff: 1}},
                    // Take the first one
                    {$limit: 3}
                ],
                CONF.mongoTestCollection
            );
        } catch (e) {
            log.simpleLog('Mongo error ' + e);
            return {
                statusCode: 500,
                result: "error_database"
            };
        }


        return result ?  {
            search : search,
            statusCode : 200,
            result : result
        } : {
            statusCode : 404,
            result : "bad_request"
        };
    }

}

module.exports.suggestManager = new SuggestManager();