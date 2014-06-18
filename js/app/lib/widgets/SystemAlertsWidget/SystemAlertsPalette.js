var _ = require('underscore');
var kt = require('knights-templar');
var ListPalette = DT.lib.ListPalette;
var SystemAlertModel = DT.lib.SystemAlertModel;
var SystemAlertModalView = DT.lib.SystemAlertModalView;
var SystemAlertsPalette = ListPalette.extend({

    events: {
        'click .refreshAlerts': 'refreshAlerts',
        'click .addNewAlert': 'addAlert',
        'click .viewAlert': 'viewAlert'
    },

    refreshAlerts: function(e) {
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
        this.collection.fetch();
    },

    addAlert: function(e) {
        e.preventDefault();
        var model = new SystemAlertModel();
        this.openModal(model);
    },

    viewAlert: function(e) {
        e.preventDefault();
        var selected = this.getSelected()[0];
        if (selected) {
            this.openModal(selected);
        }
    },

    openModal: function(model) {
        var modalView = new SystemAlertModalView({
            model: model
        });
        modalView.addToDOM().launch();
        modalView.promise().then(
            this.refreshAlerts.bind(this),
            this.refreshAlerts.bind(this),
            this.collection.fetch.bind(this.collection)
        );
    },

    template: kt.make(__dirname+'/SystemAlertsPalette.html')

});
exports = module.exports = SystemAlertsPalette;