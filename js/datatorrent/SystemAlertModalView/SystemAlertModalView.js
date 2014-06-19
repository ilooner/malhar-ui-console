var _ = require('underscore');
var kt = require('knights-templar');
var text = require('../text');
var BaseView = require('../ModalView');
var Epoxy = require('backbone.epoxy');
var CodeMirror = require('codemirror');
require('codemirror/mode/javascript/javascript');
// var TopicDataCollection = require('../TopicDataCollection');
var SystemAlertModalView = BaseView.extend({

    // initialize: function(options) {
    //     BaseView.prototype.initialize.call(this, options);
    // },

    title: '\'<span data-bind="text:select(name, name, \'Untitled\')"></span>\' <span class="muted">System Alert</span>',

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
            errors: this.model.validationError || {},
            model: this.model.toJSON()
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

        _.defer(this.setupCodeEditor);

        this.epoxyBindings.listenTo(this, 'clean_up', this.epoxyBindings.remove);
    },

    setupCodeEditor: function() {
        var conditionCodeEditor = CodeMirror.fromTextArea(this.$('textarea.system-alert-condition')[0], {
            theme: 'eclipse'
        });
        conditionCodeEditor.on('change', function(cm) {
            cm.save();
        });
    },

    updateConditionFromTextarea: function() {
        this.model.set('condition', this.$('textarea.system-alert-condition').val());
    },

    onConfirm: function(evt) {
        evt.preventDefault();
        this.updateConditionFromTextarea();
        if (this.model.isValid()) {
            this.model.save();
            this.deferred.resolve();
            this.destroy();
        } else {
            this.renderBody();
            this.epoxyBindings.applyBindings();
            this.setupCodeEditor();
        }
    },

    launchOptions: {
        backdrop: 'static'
    }

});
exports = module.exports = SystemAlertModalView;