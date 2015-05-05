Ext.define('Soims.controller.notification.ShowNotification', {
    extend: 'Ext.app.Controller',
    stores: ['notification.Notification'],
    views: ['notification.ShowNotification'],
    refs: [{
        ref: 'shownotification',
        selector: 'shownotification',
        autoCreate: true,
        xtype: 'shownotification'
    }],
    init: function () {
        this.control({
            'shownotification  button[itemId=Ok]': {
                click: function (button, e) {
                    button.up('window').close();
                }
            }

    });
},
getCon: function (notificationPath) {
    var loginApp = this.application;
    return loginApp.getController(notificationPath);
},
showWindow: function () {
    var panel = this.getShownotification();
    return panel;
}


});