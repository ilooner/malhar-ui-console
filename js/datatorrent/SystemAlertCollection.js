var BaseCollection = require('./BaseCollection');
var SystemAlertModel = require('./SystemAlertModel');

var SystemAlertCollection = BaseCollection.extend({

    debugName: 'system alerts',

    model: SystemAlertModel,

    url: function() {
        return this.resourceURL('SystemAlert');
    },

    responseTransform: 'alerts',

    subscribe: function() {
        var topic = this.resourceTopic('SystemAlerts');
        this.checkForDataSource();
        this.listenTo(this.dataSource, topic, function(data) {
            console.log('data from SystemAlerts topic: ', data);
        });
        this.dataSource.subscribe(topic);
    }

});

exports = module.exports = SystemAlertCollection;