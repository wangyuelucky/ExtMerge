Ext.define("Soims.view.application.ApplicationPanel", {
    extend: 'Ext.form.Panel',
    alias: 'widget.applicationpanel',
    //title: '申请详情',
    iconCls: 'ApplicationSideList',
    closable: true,

    initComponent: function () {
        this.items = [{
            xtype: 'applicationhistorypanel'
        }, {
            xtype: this.grid
        }];
        this.title = this.title;

        this.callParent();
    }
});

