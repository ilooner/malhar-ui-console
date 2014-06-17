var _ = require('underscore');
var kt = require('knights-templar');
var ListPalette = DT.lib.ListPalette;
var SystemAlertsPalette = ListPalette.extend({

    events: {
        
    },

    template: kt.make(__dirname+'/SystemAlertsPalette.html')

});
exports = module.exports = SystemAlertsPalette;