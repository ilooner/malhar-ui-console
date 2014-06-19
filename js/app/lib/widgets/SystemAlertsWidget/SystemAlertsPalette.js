var _ = require('underscore');
var text = DT.text;
var kt = require('knights-templar');
var ListPalette = DT.lib.ListPalette;
var SystemAlertModel = DT.lib.SystemAlertModel;
var SystemAlertModalView = DT.lib.SystemAlertModalView;
var Modal = DT.lib.ModalView;
var DeleteAlertsModal = Modal.extend({
    title: text('Permanently delete multiple alerts?'),
    confirmText: text('yes, delete all selected alerts'),
    body: function() {
        return 'Are you sure you want to remove multiple alerts at once? This cannot be undone.';
    }
});

var SystemAlertsPalette = ListPalette.extend({

    events: {
        'click .refreshAlerts': 'refreshAlerts',
        'click .addNewAlert': 'addAlert',
        'click .viewAlert': 'viewAlert',
        'click .deleteAlert': 'deleteAlert',
        'click .deleteAlerts': 'deleteAlerts'
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

    deleteAlert: function(e) {
        e.preventDefault();
        var selected = this.getSelected()[0];
        if (selected) {
            selected['delete']();
        }
    },

    deleteAlerts: function(e) {
        e.preventDefault();
        var selected = this.getSelected();
        (new DeleteAlertsModal())
            .addToDOM()
            .launch()
            .promise()
            .then(function() {
                _.each(selected, function(alert) {
                    alert['delete'](true);
                });
            });
    },

    openModal: function(model) {
        var self = this;
        var modalView = new SystemAlertModalView({
            model: model
        });
        modalView.addToDOM().launch();
        modalView.promise().then(
            function() {},
            function() {},
            function() {
                setTimeout(function() {
                    self.collection.fetch();
                }, 1000);
            }
        );
    },

    template: kt.make(__dirname+'/SystemAlertsPalette.html')

});
exports = module.exports = SystemAlertsPalette;