// App-wide epoxy filters, etc
var Epoxy = require('backbone.epoxy');
Epoxy.binding.addFilter('equal', function(attr, value) {
    return attr == value;
});