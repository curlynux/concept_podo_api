
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
     * Create an entry
     *
     * @route("v1/entry")
     *
     * @param req
     * @returns {Promise.<void>}
     */
    async createEntryAction(req)
    {
        const
            /*email = req.query.email || req.body.email,
            code    = tokenManager.generateAleaCode(),
            token   = tokenManager.generateToken(),
            */
            time    = new Date().toISOString();

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
     * Get a single modl information. The response is cached for 10 hours
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

