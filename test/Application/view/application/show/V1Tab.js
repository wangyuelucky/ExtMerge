Ext.define("Soims.view.application.show.V1Tab", {
    extend: 'Ext.form.Panel',
    alias: 'widget.showv1tab',
    closable: true,
    iconCls: 'Application',
    buttonAlign: 'center',
    requires: ['Soims.view.application.new.V1BasicInfo',
                'Soims.view.application.common.SampleInfo'],
    autoShow: true,
    autoScroll: true,
    bodyStyle: 'overflow-x:visible; overflow-y:scroll',
    initComponent: function () {
        this.items = [{
            xtype: 'v1basicinfo',
            isShow: this.isShow,
            header: false,
            applicationID: this.applicationID
        }, {
            xtype: 'sampleinfo',
            isShow: this.isShow,
            header: false,
            applicationID: this.applicationID,
            panelType: Soims.model.application.SamplePanelType.AuditShow.value
        }];
        this.buttons = [{
            text: '关闭',
            xtype: 'button',
            itemId: 'close'
        }];
        this.callParent();
    }
});

