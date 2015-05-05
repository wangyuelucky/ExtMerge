Ext.define("Soims.view.notification.ShowNotificationBasic", {
    extend: 'Ext.form.Panel',
    alias: 'widget.shownotificationbasic',
    //width: 400,
    autoShow: true,
    initComponent: function () {
        this.items = [
//        {
//            xtype: 'textfield',
//            name: 'id',
//            hidden: true
//        }, 
       {
           xtype: 'htmleditor',
            width: 590,
            height:50,
            name: 'title',
            itemId: 'title',
            readOnly: true,
//            disabled: true,           
            hidden: false 
       }, {
            xtype: 'htmleditor',
            height: 525,
            width:590,
            name: 'content',
            itemId: 'content',
            readOnly: true,
//            disabled: true,
            hidden: false        

        }];
        this.callParent();
    }
});