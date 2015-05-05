Ext.define('Soims.controller.notification.Notification', {
    extend: 'Ext.app.Controller',
    stores: ['notification.Notification'],
    views: ['notification.Notification'],
    refs: [{
        ref: 'notification',
        selector: 'notification',
        autoCreate: true,
        xtype: 'notification'
    }],
    init: function () {
        this.control({
            'notification': {
                //监听panel的双击事件
                itemdblclick: function (view, record) {

                    var con = this.getCon('notification.ShowNotification');
                    con.getShownotification().down('#title').getToolbar().hide();
                    con.getShownotification().down('#content').getToolbar().hide();
                    var app = this.application;
                    app.getController('notification.ShowNotification').showWindow();
                    var window = app.getController('notification.ShowNotification').showWindow();
                    con.getShownotification().down('panel').loadRecord(record);


//                    window.down('#title').setValue(record.get('title'));
//                    window.down('#content').setValue(record.get('content'));                
                }
            }
        });
    },
    getCon: function (notificationPath) {
        var loginApp = this.application;
        return loginApp.getController(notificationPath);
    },
    showNotification: function () {

        var Panel = this.getNotification();


    }


});