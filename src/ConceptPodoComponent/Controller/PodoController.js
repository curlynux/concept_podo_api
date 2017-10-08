
const CONF              = require(ROOT+"/config/conf");
const {suggestManager}  = require(ROOT+"/src/ConceptPodoComponent/Model/SuggestManager");
const {tokenManager}    = require(ROOT+"/src/ConceptPodoComponent/Model/TokenManager");
const {Mongo}           = require(ROOT+"/src/ConceptPodoComponent/Service/Mongo");
const {log}             = require(ROOT+"/src/ConceptPodoComponent/Service/LogService");
const {cacheService}    = require(ROOT+"/src/ConceptPodoComponent/Service/CacheService");

/**
 * class PodoController
 *
 * @Author Thomas Dupont dupont.thomas70@gmail.com
 */
class PodoController
{

    /**
     * Create or update an entry
     *
     {
        "ref" : "ref",
        "mold" : {
            "shoeLong"            : 20.5,
            "shoeWidth"           : 10,
            "flankLineTurn"       : 5.3,
            "kickTurn"            : 1.7,
            "entry"               : 12,
            "height_10"           : 25,
            "cambrure"            : 5.9,
            "heelWidth"           : 2,
            "moldExist"           : true,
            "moldExistRetouch"    : false
        },
        "user" : "userTest",
        "file" : {
            "filename" : "testFile21",
            "pathfile" : "test/testFile21"
        }
     }
     *
     * @route("v1/upsert")
     *
     * @param req
     * @returns {Promise.<void>}
     */

    async upsertMoldAction(req)
    {
        const time = new Date().toISOString(),
            mold = req.query.mold || req.body.mold,
            file = req.query.file || req.body.file,
            user = req.query.user || req.body.user,
            ref  = req.query.ref  || req.body.ref;

        let find;

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
            find = await Mongo.findOne({
                pathfile : file.pathfile
            }, CONF.mongoTestCollection);
            if(find) {
                await Mongo.update(
                    {
                        pathfile : file.pathfile
                    },
                    {
                        $set : {
                            reference           : ref,
                            shoeLong            : mold.shoeLong * 10 || null,
                            shoeWidth           : mold.shoeWidth * 10 || null,
                            flankLineTurn       : mold.flankLineTurn * 10 || null,
                            kickTurn            : mold.kickTurn * 10 || null,
                            entry               : mold.entry * 10 || null,
                            height_10           : mold.height_10 * 10 || null,
                            Cambrure            : mold.cambrure * 10 || null,
                            heelWidth           : mold.heelWidth * 10 || null,
                            filename            : file.filename || null,
                            pathfile            : file.pathfile || null,
                            moldExist           : mold.moldExist || false,
                            moldExistRetouch    : mold.moldExistRetouch || false,
                            user                : user || null,
                            updateAt            : time
                        }
                    },
                    {},
                    CONF.mongoTestCollection
                );
            } else {
                await Mongo.insert({
                    reference           : ref,
                    shoeLong            : mold.shoeLong * 10 || null,
                    shoeWidth           : mold.shoeWidth * 10 || null,
                    flankLineTurn       : mold.flankLineTurn * 10 || null,
                    kickTurn            : mold.kickTurn * 10 || null,
                    entry               : mold.entry * 10 || null,
                    height_10           : mold.height_10 * 10 || null,
                    Cambrure            : mold.cambrure * 10 || null,
                    heelWidth           : mold.heelWidth * 10 || null,
                    filename            : file.filename || null,
                    pathfile            : file.pathfile || null,
                    moldExist           : mold.moldExist || false,
                    moldExistRetouch    : mold.moldExistRetouch || false,
                    user                : user || null,
                    createAt            : time,
                    updateAt            : time
                }, CONF.mongoTestCollection);
            }

        } catch (e) {
            log.simpleLog('Mongo error '+e);
            return {
                statusCode : 500,
                result : e
            };
        }

        return {
            statusCode : 200,
            result : true
        }

    }

    /**
     * DELETE an entry
     *
     *
     {
	    "pathfile": "test/testFile21"
     }
     *
     * @route("v1/mold")
     *
     * @param req
     * @returns {Promise.<{statusCode: number, result: string}>}
     */
    async deleteMoldAction(req)
    {
        const file = req.query.pathfile || req.body.pathfile;

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
            await Mongo.remove(
                {
                    pathfile : file
                }, CONF.mongoTestCollection
            );
        } catch (e) {
            return {
                statusCode: 404,
                result: "not_found"
            };
        }

        return {
            statusCode: 200,
            result: true
        }
    }


    /**
     * Create a list of 10000 random entry (FOR TEST ONLY)
     *
     * @route("v1/entry")
     *
     * @param req
     * @returns {Promise.<void>}
     */
    async createEntryAction(req)
    {
        const time = new Date().toISOString(),
            pass = req.query.password || req.body.password;

        //Only dev who can understand this code could use this route
        if(pass === "dupontthomas") {
            try {
                await Mongo.connect();
            } catch (e) {
                log.simpleLog('Mongo error '+e);
                return {
                    statusCode: 500,
                    result: "error_database"
                };
            }
            /*
             -    Longueur de la chaussure (numérique, en cm)
             -    Largeur des flancs (au sol) (numérique, en cm)
             -    Tour de la ligne des flancs (numérique, en cm)
             -    Tour du coup de pied (numérique, en cm)
             -    Entrée (numérique, en cm)
             -    Hauteur 10 (numérique, en cm)
             -    Hauteur 15 (numérique, en cm)
             -    Largeur du talon (optionnel) (numérique, en cm)

             -    Nom du fichier de la « forme numérique »
             -    Chemin du fichier de la « forme numérique »
             -    Est-ce qu’il existe une « forme en bois » ?
             -    Est-ce qu’il y a une retouche sur la forme en bois ?

             -    User qui a créé la forme
             -    Date de création de la forme
             -    Date de dernière mise à jour de la forme
             */
            let randomName = tokenManager.generateAleaCode();
            try {
                await Mongo.insert({
                    shoeLong : parseInt(Math.random() * 400),
                    shoeWidth : parseInt(Math.random() * 200),
                    flankLineTurn : parseInt(Math.random() * 300),
                    kickTurn : parseInt(Math.random() * 200),
                    entry : parseInt(Math.random() * 200),
                    height_10 : parseInt(Math.random() * 200),
                    Cambrure : parseInt(Math.random() * 200),
                    heelWidth : parseInt(Math.random() * 200),
                    filename: 'test' + randomName,
                    pathfile : 'test/test' + randomName,
                    moldExist : parseInt(Math.random() * 10) / 10 > 0.5,
                    moldExistRetouch : parseInt(Math.random() * 10) / 10 > 0.5,
                    user : 'userTest',
                    createAt : time,
                    updateAt : time
                }, CONF.mongoTestCollection);
            } catch (e) {
                log.simpleLog('Mongo error '+e);
                return {
                    statusCode : 500,
                    result : "error_database"
                };
            }

            return {
                statusCode : 200,
                result : true
            }
        }

        return {
            statusCode : 403,
            result : "not_allowed"
        }
    }

    /**
     * Return suggestion of mold
     *
     * {
           "ref" : "ref",
           "search" : {
                "shoeLong": {
                    "value" : 93,
                    "pond" : 2
                },
                "shoeWidth": {
                    "value" : 186,
                    "pond" : 2
                },
                "flankLineTurn": {
                    "value" : 55,
                    "pond" : 1
                },
                "kickTurn": {
                    "value" : 6,
                    "pond" : 1
                },
                "entry": {
                    "value" : 95,
                    "pond" : 1
                },
                "height_10": {
                    "value" : 22,
                    "pond" : 1
                },
                "Cambrure": {
                    "value" : 179,
                    "pond" : 1
                },
                "heelWidth": {
                    "value" : 186,
                    "pond" : 1
                }
            }
        }
     *
     * @route("v1/suggest")
     *
     * @param req
     * @returns {Promise}
     */
    async generateSuggestAction(req)
    {
        const ref  = req.query.ref || req.body.ref,
            search = req.query.search || req.body.search;

        try {
            await Mongo.connect()
        } catch (e) {
            log.simpleLog('Mongo error '+e);
            return {
                statusCode: 500,
                result: "error_database"
            };
        }

        return await suggestManager.generateSuggestion(search);
    }

    /**
     * Get a single mold information. The response is cached for 10 hours
     *
     * @route("v1/file/:filename")
     *
     * @param req
     * @returns {Promise.<*>}
     */
    async getMoldAction(req)
    {
        const file = req.params.filename;
        let result, response;

        if (cacheService.has(file)) {
            return cacheService.get(file);
        }

        try {
            await Mongo.connect()
        } catch (e) {
            log.simpleLog('Mongo error '+e);
            return {
                statusCode: 500,
                result: "error_database"
            };
        }

        try {
            result = await Mongo.findOne({filename : file} , CONF.mongoTestCollection);
        } catch (e) {
            log.simpleLog('Mongo error '+e);
            return {
                statusCode: 500,
                result: "error_database"
            };
        }

        response = result ?  {
            statusCode : 200,
            result : result
        } : {
            statusCode : 404,
            result : "not_found"
        };

        cacheService.set(file, response, 3600 * 10);

        return response;
    }
}

module.exports.podoController = new PodoController();

