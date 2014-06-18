var _ = require('underscore');
var kt = require('knights-templar');
var ListPalette = DT.lib.ListPalette;
var SystemAlertModel = DT.lib.SystemAlertModel;
var SystemAlertModalView = DT.lib.SystemAlertModalView;
var SystemAlertsPalette = ListPalette.extend({

    events: {
        'click .refreshAlerts': 'refreshAlerts',
        'click .addNewAlert': 'addAlert'
    },

    refreshAlerts: function(e) {
        e.preventDefault();
        this.collection.fetch();
    },

    addAlert: function(e) {
        e.preventDefault();
        var model = new SystemAlertModel();
        var modalView = new SystemAlertModalView({
            model: model
        });
        modalView.addToDOM().launch();
        modalView.promise().then(
            model.save.bind(model),
            function() {
                console.log(model.toJSON())
            },
            this.collection.fetch.bind(this.collection)
        );
    },

    viewAlert: function(e) {

    },

    template: kt.make(__dirname+'/SystemAlertsPalette.html')

});
exports = module.exports = SystemAlertsPalette;