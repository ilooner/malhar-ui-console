var BaseModel = require('./BaseModel');

var SystemAlertModel = BaseModel.extend({

    idAttribute: 'name',

    defaults: {
        name: '',
        condition: '',
        email: '',
        timeThresholdMillis: 0
    }

});

exports = module.exports = SystemAlertModel;