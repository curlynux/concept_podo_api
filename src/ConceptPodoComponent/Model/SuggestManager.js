
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
            result = await Mongo.aggregate(
                [
                    {
                        $project: {
                            diff: {
                                $sum : [
                                    {
                                        $abs: {
                                            $multiply : [
                                                {
                                                    $subtract: [
                                                        search,
                                                        '$shoeLong'
                                                    ]
                                                },
                                                2
                                            ]
                                        }
                                    },
                                    {
                                        $abs: {
                                            $multiply : [
                                                {
                                                    $subtract: [
                                                        search,
                                                        '$shoeWidth'
                                                    ]
                                                },
                                                2
                                            ]
                                        }
                                    },
                                    {
                                        $abs: {
                                            $subtract: [
                                                search,
                                                '$flankLineTurn'
                                            ]
                                        }
                                    },
                                    {
                                        $abs: {
                                            $subtract: [
                                                search,
                                                '$kickTurn'
                                            ]
                                        }
                                    },
                                    {
                                        $abs: {
                                            $subtract: [
                                                search,
                                                '$entry'
                                            ]
                                        }
                                    },
                                    {
                                        $abs: {
                                            $subtract: [
                                                search,
                                                '$height_10'
                                            ]
                                        }
                                    },
                                    {
                                        $abs: {
                                            $subtract: [
                                                search,
                                                '$Cambrure'
                                            ]
                                        }
                                    },
                                    {
                                        $abs: {
                                            $subtract: [
                                                search,
                                                '$heelWidth'
                                            ]
                                        }
                                    }
                                ]

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
            log.simpleLog('Mongo error '+e);
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
            result : "not_reconize"
        };
    }

}

module.exports.suggestManager = new SuggestManager();