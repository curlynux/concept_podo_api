
const {podoController}  = require(ROOT+'/src/ConceptPodoComponent/Controller/PodoController');

class CheckoutFactory {

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

module.exports.checkoutFactory = new CheckoutFactory();