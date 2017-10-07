
const {podoController}  = require(ROOT+'/src/ConceptPodoComponent/Controller/PodoController');

/**
 * class ControllerFactory
 *
 * @Author Thomas Dupont dupont.thomas70@gmail.com
 */
class ControllerFactory {

    constructor ()
    {
        this.controllers = {
            podoController : podoController
        };
    }

    init (controller, method, req)
    {
        return this.controllers[controller+"Controller"][method+"Action"](req);
    }
}

module.exports.controllerFactory = new ControllerFactory();