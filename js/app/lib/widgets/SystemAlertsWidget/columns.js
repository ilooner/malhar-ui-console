var formatters = DT.formatters;

function nameFormat(name, alert) {
    return '<a href="#" class="inspectAlert" data-name="' + name + '">' + name + '</a>';
}

function timeThresholdFormat(millis, row) {
    var time = formatters.timeSince({
        timeChunk: millis
    });

    if (!time) {
        time = '0 seconds';
    }

    return time;
}
function inAlertFormat(alertStatus, row) {
    return alertStatus.isInAlert ? '<span class="label label-important">yes</span>' : '<span class="label label-success">no</span>';
}
function inAlertFilter(term, value, formatted, row) {
    var bool;
    term = term.toLowerCase();
    if ('yes'.indexOf(term) >= 0) {
        bool = true;
    } else if ('no'.indexOf(term) >= 0) {
        bool = false;
    } else {
        return true;
    }
    return bool === value.isInAlert;
}

exports = module.exports = [
    { id: "selector", key: "selected", label: "", select: true, width: 40, lock_width: true },
    { id: 'name', key: 'name', label: DT.text('name_label'), filter: 'like', format: nameFormat },
    { id: 'email', key: 'email', label: DT.text('email_label'), filter: 'like' },
    { id: 'timeThreshold', key: 'timeThresholdMillis', label: DT.text('timeThresholdMillis_label'), format: timeThresholdFormat, filter: 'timeChunk' },
    { id: 'inAlert', key: 'alertStatus', label: DT.text('in_alert_label'), format: inAlertFormat, filter: inAlertFilter }
];