var _ = require('underscore');
var kt = require('knights-templar');
var text = require('../text');
var BaseView = require('../ModalView');
var Epoxy = require('backbone.epoxy');
// var TopicDataCollection = require('../TopicDataCollection');
var SystemAlertModalView = BaseView.extend({

    // initialize: function(options) {
    //     BaseView.prototype.initialize.call(this, options);
    // },

    title: '<span data-bind="text:select(name, name, \'Untitled\')"></span> System Alert',

    confirmText: text('save alert'),

    cancelText: text('cancel'),

    events: {
        'click .cancelBtn': 'onCancel',
        'click .confirmBtn': 'onConfirm',
        'submit .system-alert-form': 'onConfirm'
    },

    closeBtn: false,

    body: function() {
        return this.template({
            errors: this.model.validationError || {}
        });
    },

    template: kt.make(__dirname+'/SystemAlertModalView.html'),

    postRender: function() {
        // Set up epoxy binding
        if (this.epoxyBindings) {
            this.epoxyBindings.remove();
        }
        this.epoxyBindings = new Epoxy.View({
            el: this.el,
            model: this.model
        });
        this.epoxyBindings.listenTo(this, 'clean_up', this.epoxyBindings.remove);
    },

    onConfirm: function(evt) {
        evt.preventDefault();
        if (this.model.isValid()) {
            this.model.save();
            this.deferred.resolve();
            this.destroy();
        } else {
            this.renderBody();
            this.epoxyBindings.applyBindings();
        }
    },

    launchOptions: {
        backdrop: 'static'
    }

});
exports = module.exports = SystemAlertModalView;