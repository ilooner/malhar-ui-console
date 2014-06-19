var _ = require('underscore');
var text = require('./text');
var BaseModel = require('./BaseModel');
var Modal = require('./ModalView');

var DeleteAlertModal = Modal.extend({
    title: text('Permanently delete this alert?'),
    confirmText: text('confirm'),
    body: function() {
        return 'Are you sure you want to remove this alert? This cannot be undone.';
    }
});

var SystemAlertModel = BaseModel.extend({

    idAttribute: 'name',

    defaults: {
        name: '',
        condition: '',
        email: '',
        timeThresholdMillis: 0
    },

    urlRoot: function() {
        return this.resourceURL('SystemAlert');
    },

    validate: function(attrs) {
        var errors = {};

        if (!attrs.name) {
            errors.name = 'Please provide a name';
        }

        if (!attrs.condition) {
            errors.condition = 'Please provide a condition';
        }

        if (!/^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/.test(attrs.email)) {
            errors.email = 'Please provide a valid email';
        }

        if (typeof attrs.timeThresholdMillis !== 'number' || attrs.timeThresholdMillis < 0) {
            errors.timeThresholdMillis = 'Please provide a non-negative integer in milliseconds';
        }

        if (!_.isEmpty(errors)) {
            return errors;
        }
    },

    whitelist: ['name', 'condition', 'email', 'timeThresholdMillis'],

    save: function(attrs, options) {
        options || (options = {});
        var whitelisted = whitelisted =  _.pick(this.attributes, this.whitelist);
        options.data = JSON.stringify(whitelisted);
        options.type = 'PUT';
        options.contentType = 'application/json';
        return  BaseModel.prototype.save.call(this, attrs, options);
    },

    'delete': function(force) {
        if (force === true) {
            this.destroy();
            return;
        }
        
        var self = this;
        var modal = new DeleteAlertModal();
        modal.addToDOM().launch().promise().then(
            function() {
                self.destroy();
            }
        )
    },

    set: function(attrs, options) {
        if (typeof attrs === 'string') {
            var tmp = attrs;
            attrs = {};
            attrs[tmp] = options;
            options = {};
        }

        if (attrs.hasOwnProperty('timeThresholdMillis')) {
            attrs.timeThresholdMillis *= 1;
        }

        return BaseModel.prototype.set.call(this, attrs, options);
    }

});

exports = module.exports = SystemAlertModel;