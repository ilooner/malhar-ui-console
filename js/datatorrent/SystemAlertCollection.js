var BaseCollection = require('./BaseCollection');
var SystemAlertModel = require('./SystemAlertModel');

var SystemAlertCollection = BaseCollection.extend({

    debugName: 'system alerts',

    model: SystemAlertModel,

    url: function() {
        return this.resourceURL('SystemAlert');
    }

});

exports = module.exports = SystemAlertCollection;