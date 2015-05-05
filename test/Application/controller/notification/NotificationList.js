Ext.define('Soims.controller.notification.NotificationList', {
    extend: 'Ext.app.Controller',
    stores: ['notification.NotificationList'],
    views: ['notification.NotificationList'],
    refs: [{
        ref: 'notificationlist',
        selector: 'notificationlist',
        autoCreate: true,
        xtype: 'notificationlist'
    }],
    init: function () {
        this.control({
            'notificationlist  button[itemId=sendNotification]': {
                click: function (button, e) {
                    var con = this.getCon('notification.SendNotification');
                    con.showWindow();

                }
            },

            'notificationlist  button[itemId=checkNotification]': {
                click: function (button, e) {

                    var con = this.getCon('notification.ShowNotification');
                    var panel = button.up('panel');
                    var selectionModel = panel.getSelectionModel();
                    var record = selectionModel.getSelection()[0];
                    con.getShownotification().down('#title').getToolbar().hide();
                    con.getShownotification().down('#content').getToolbar().hide();
                    var app = this.application;
                    app.getController('notification.ShowNotification').showWindow();
                    var window = app.getController('notification.ShowNotification').showWindow();
                    con.getShownotification().down('panel').loadRecord(record);
                }
            },

//            'notificationlist  button[itemId=editNotification]': {
//                click: function (button, e) {
//                    var con = this.getCon('notification.SendNotification');
//                    var panel = button.up('panel');
//                    var selectionModel = panel.getSelectionModel();
//                    var record = selectionModel.getSelection()[0];
//                    con.getSendnotification().down('panel').loadRecord(record);
//                }
//            },

            'notificationlist  button[itemId=deleteNotification]': {
                click: function (button, e) {
                    Ext.Tools.Confirm('确认', '您确定要删除该条目？',
                function (btn) {
                    if (btn == 'yes') {
                        this.deleteDataBase(button);
                    }
                }, this);
                }
            },
            'notificationlist  button[itemId=top]': {
                click: function (button, e) {
                    this.top(button);

                }
            },
            'notificationlist  button[itemId=cancelTop]': {
                click: function (button, e) {
                    this.cancelTop(button);

                }
            },
            'notificationlist  button[itemId=overdue]': {
                click: function (button, e) {
                    this.overdue(button);

                }
            },
            'notificationlist  button[itemId=cancelOverdue]': {
                click: function (button, e) {
                    this.cancelOverdue(button);

                }
            },
            'notificationlist  button[itemId=refreshTbar]': {
                click: function (button, e) {
                    button.up('panel').getStore().reload();
                    button.up('panel').getSelectionModel().deselectAll();
                }
            },
            'notificationlist': {
                //监听panel的双击事件
                itemdblclick: function (view, record) {
                },
                //监听panel的行变换事件
                selectionchange: function (selModel, records) {

                    if (records.length != 0) {
                        if (records[0].get('state') == '置顶') {
                            this.getNotificationlist().down('#checkNotification').setVisible(true);
//                            this.getNotificationlist().down('#editNotification').setVisible(true);
                            this.getNotificationlist().down('#deleteNotification').setVisible(true);
                            this.getNotificationlist().down('#cancelTop').setVisible(true);
                            this.getNotificationlist().down('#overdue').setVisible(true);
                            this.getNotificationlist().down('#top').setVisible(false);
                            this.getNotificationlist().down('#cancelOverdue').setVisible(false);
                            
                        }
                        else if (records[0].get('state') == '普通') {
                            this.getNotificationlist().down('#checkNotification').setVisible(true);
//                            this.getNotificationlist().down('#editNotification').setVisible(true);
                            this.getNotificationlist().down('#deleteNotification').setVisible(true);
                            this.getNotificationlist().down('#top').setVisible(true);
                            this.getNotificationlist().down('#overdue').setVisible(true);
                            this.getNotificationlist().down('#cancelTop').setVisible(false);
                            this.getNotificationlist().down('#cancelOverdue').setVisible(false);
                        }
                        else if (records[0].get('state') == '过期') {
                            this.getNotificationlist().down('#checkNotification').setVisible(true);
//                            this.getNotificationlist().down('#editNotification').setVisible(true);
                            this.getNotificationlist().down('#deleteNotification').setVisible(true);
                            this.getNotificationlist().down('#top').setVisible(true);
                            this.getNotificationlist().down('#cancelOverdue').setVisible(true);
                            this.getNotificationlist().down('#cancelTop').setVisible(false);
                            this.getNotificationlist().down('#overdue').setVisible(false);
                        }

                    } else {
                        this.getNotificationlist().down('#checkNotification').setVisible(false);
//                        this.getNotificationlist().down('#editNotification').setVisible(false);
                        this.getNotificationlist().down('#deleteNotification').setVisible(false);
                        this.getNotificationlist().down('#top').setVisible(false);
                        this.getNotificationlist().down('#cancelTop').setVisible(false);
                        this.getNotificationlist().down('#overdue').setVisible(false);
                        this.getNotificationlist().down('#cancelOverdue').setVisible(false);
                    }
                }
            }
        });
    },
    getCon: function (notificationPath) {
        var loginApp = this.application;
        return loginApp.getController(notificationPath);
    },
    showNotificationList: function () {

        var Panel = this.getNotificationlist();
        var con = this.getCon('mainFrame.Main');
        con.addTab(Panel);
    },
    top: function (button) {
        var panel = button.up('panel');
        var selectionModel = panel.getSelectionModel();
        var record = selectionModel.getSelection()[0];
        var id = record.get('id');
        Ext.Ajax.request({
            url: Soims.service.users.NotificationService + '/Top',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { id: id },
            success: function (response) {
                button.up('panel').getStore().reload();
            }
        });
    },

    cancelTop: function (button) {
        var panel = button.up('panel');
        var selectionModel = panel.getSelectionModel();
        var record = selectionModel.getSelection()[0];
        var id = record.get('id');
        Ext.Ajax.request({
            url: Soims.service.users.NotificationService + '/CancelTop',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { id: id },
            success: function (response) {
                button.up('panel').getStore().reload();
            }
        });
    },
    overdue: function (button) {
        var panel = button.up('panel');
        var selectionModel = panel.getSelectionModel();
        var record = selectionModel.getSelection()[0];
        var id = record.get('id');
        Ext.Ajax.request({
            url: Soims.service.users.NotificationService + '/Overdue',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { id: id },
            success: function (response) {
                button.up('panel').getStore().reload();
            }
        });
    },
    cancelOverdue: function (button) {
        var panel = button.up('panel');
        var selectionModel = panel.getSelectionModel();
        var record = selectionModel.getSelection()[0];
        var id = record.get('id');
        Ext.Ajax.request({
            url: Soims.service.users.NotificationService + '/CancelOverdue',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { id: id },
            success: function (response) {
                button.up('panel').getStore().reload();
            }
        });
    },
    deleteDataBase: function (button) {
        var panel = button.up('panel');
        var selectionModel = panel.getSelectionModel();
        var record = selectionModel.getSelection()[0];
        var id = record.get('id');
        Ext.Ajax.request({
            url: Soims.service.users.NotificationService + '/Delete',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { id: id },
            success: function (response) {
                //                this.getMessageMessageListStore().reload();
                button.up('panel').getStore().reload();
            }
        });
    }

});