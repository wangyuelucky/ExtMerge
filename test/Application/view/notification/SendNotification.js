Ext.define("Soims.view.notification.SendNotification", {
    extend: 'Ext.window.Window',
    alias: 'widget.sendnotification',
    closable: true,
    iconCls: '  ',
    requires: ['Soims.view.notification.SendNotificationBasic'],
    width: 650,
    //    margin:5 5 5 5,
//    items: [{ xtype: 'sendnotificationbasic'}],
    autoShow: true,
    initComponent: function () {
        this.items = [{
            xtype: 'sendnotificationbasic',
            isShow: this.isShow

        }];
        this.buttons = [{
            text: '发布',
            xtype: 'button',
            itemId: 'send',
            action: 'send',
            hidden: this.isShow

        }, {
            text: '取消',
            xtype: 'button',
            itemId: 'cancel',
            action: 'cancel',
            hidden: this.isShow

       
        }];


        this.callParent();
    }
});

