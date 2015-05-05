Ext.define('Soims.controller.notification.SendNotification', {
    extend: 'Ext.app.Controller',
    stores: ['notification.NotificationList'],
    views: ['notification.SendNotification'],
    refs: [{
        ref: 'sendnotification',
        selector: 'sendnotification',
        autoCreate: true,
        xtype: 'sendnotification'
    }],
    init: function () {
        this.control({
            'sendnotification>sendnotificationbasic': {
                beforerender: function (view, e) {

                    view.down('#state').setValue('置顶');


                }
            },
            //            'sendnotification>sendnotificationbasic radiogroup[itemId=sendEmailRadioGroup]': {
            //                change: function (view, newValue, oldValue) {
            //                    console.log(newValue);
            //                }
            //            },

            'sendnotification  button[action=send]': {
                click: function (button, e) {
                    var o = Ext.getCmp('sendEmailRadioGroup').getValue();
                    console.log(o);
                    if (o.email == 'no') {
                        this.saveDataBase(button);
                    }
                    else {

                        var na = Ext.getCmp('name').getValue();
                        var rolena = Ext.getCmp('sendEmailCheckboxGroup').getValue();
                        console.log(rolena);
                        if (rolena == null) {
                            Ext.MessageBox.confirm('警告', '邮件发送角色不能为空');
                        }
                        else {
                            this.saveDataBaseAndEmail(button);
                        }

                    }
                    //                    


                }
            },

            'sendnotification  button[action=cancel]': {
                click: function (button, e) {
                    button.up('window').close();
                }
            }

        });
    },
    getCon: function (messagePath) {
        var loginApp = this.application;
        return loginApp.getController(messagePath);
    },
    showWindow: function () {
        this.getSendnotification();
    },
    saveDataBase: function (button) {
        var form = button.up('window').down('panel');
        var data = form.getValues();

        Ext.Ajax.request({
            url: Soims.service.users.NotificationService + '/SenderNo',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: data,

            success: function (response) {
                button.up('window').close();
                var con = this.getCon('notification.NotificationList');
                con.getNotificationlist().getStore().reload();
                con.getNotificationlist().getSelectionModel().deselectAll();


            }
        });
    },
    saveDataBaseAndEmail: function (button) {
        var form = button.up('window').down('panel');
        var data = form.getValues();

        Ext.Ajax.request({
            url: Soims.service.users.NotificationService + '/Sender',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: data,

            success: function (response) {
                button.up('window').close();
                var con = this.getCon('notification.NotificationList');
                con.getNotificationlist().getStore().reload();
                con.getNotificationlist().getSelectionModel().deselectAll();


            }
        });
    }

});