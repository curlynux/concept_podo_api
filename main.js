
global.ROOT             = __dirname;
const express           = require('express');
const app               = express();
const CONF              = require('./config/conf');
const {checkoutFactory} = require('./src/ConceptPodoComponent/ControllerFactory');
const bodyParser        = require('body-parser');

/**
 * Main class
 *
 * @author Thomas Dupont
 */
class Main {
    constructor ()
    {
        app.use(bodyParser.urlencoded({ extended: false }));
        // parse application/json
        app.use(bodyParser.json());
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', "*");
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);
            // Pass to next layer of middleware
            next();
        });

        this.initRouter();

        app.listen(3000, '0.0.0.0', () => {
            console.log('Concept Podo api launched');
        });
    }

    initRouter()
    {
        /*
        GET /api/v1/suggests
         */
        app.get(CONF.APIURL+'suggests', (req, res) => {
            this.render('podo', 'generateSuggest', req, res);
        });

        /*
        POST /api/v1/entry
         */
        app.post(CONF.APIURL+'entry', (req, res) => {
            this.render('podo', 'createEntry', req, res);
        });
    }

    /**
     *
     * @param c Controller
     * @param m Method
     * @param req The request
     * @param res The reponse event
     */
    async render (c, m, req, res)
    {
        const result = await checkoutFactory.init(c, m, req);
        res.status(result.statusCode);
        res.send(result);
    }
}

new Main();

module.exports = app;