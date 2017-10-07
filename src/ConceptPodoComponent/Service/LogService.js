
const CONF              = require(ROOT+"/config/conf");
const winston           = require('winston');

class Log {
    constructor()
    {
        this.logger = new winston.Logger({
            level: 'error',
            transports: [
                new (winston.transports.Console)(),
                new (winston.transports.File)({ filename: ROOT+CONF.logFile })
            ]
        });
    }

    /**
     *
     * @param msg
     */
    simpleLog(msg)
    {
        this.logger.error(msg);
    }
}

module.exports.log = new Log();

