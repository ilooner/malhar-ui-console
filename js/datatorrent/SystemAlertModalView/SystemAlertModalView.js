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

    closeBtn: false,

    body: function() {
        return this.template({});
    },

    template: kt.make(__dirname+'/SystemAlertModalView.html'),

    postRender: function() {
        // Set up epoxy binding
        this.epoxyBindings = new Epoxy.View({
            el: this.el,
            model: this.model
        });
        this.epoxyBindings.listenTo(this, 'clean_up', this.epoxyBindings.remove);
    },

    launchOptions: {
        backdrop: 'static'
    }

});
exports = module.exports = SystemAlertModalView;