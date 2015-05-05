Ext.define("Soims.view.notification.ShowNotification", {
    extend: 'Ext.window.Window',
    alias: 'widget.shownotification',
    closable: true,
    iconCls: '  ',
    requires: ['Soims.view.notification.ShowNotificationBasic'],
    width: 600,
    height:500,
    //    margin:5 5 5 5,
//    items: [{ xtype: 'shownotificationbasic'}],
    autoShow: true,
    initComponent: function () {
        this.items = [{
            xtype: 'shownotificationbasic',
            isShow: this.isShow

        }];
        this.buttons = [{
            text: '确定',
            xtype: 'button',
            itemId: 'Ok',
            action: 'Ok'
           
       
        }];
        
        this.callParent();
    }
});

