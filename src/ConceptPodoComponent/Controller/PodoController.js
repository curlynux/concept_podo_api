
const CONF              = require(ROOT+"/config/conf");
const {suggestManager}  = require(ROOT+"/src/ConceptPodoComponent/Model/SuggestManager");
const {tokenManager}    = require(ROOT+"/src/ConceptPodoComponent/Model/TokenManager");
const {Mongo}           = require(ROOT+"/src/ConceptPodoComponent/Service/Mongo");
const {log}             = require(ROOT+"/src/ConceptPodoComponent/Service/LogService");

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

        return await suggestManager.generateSuggestion(100);
    }
}

module.exports.podoController = new PodoController();

