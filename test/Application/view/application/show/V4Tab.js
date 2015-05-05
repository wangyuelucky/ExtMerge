Ext.define("Soims.view.application.show.V4Tab", {
    extend: 'Ext.form.Panel',
    alias: 'widget.showv4tab',
    closable: true,
    iconCls: 'Application',
    buttonAlign: 'center',
    requires: ['Soims.view.application.new.V4BasicInfo', 'Soims.view.application.common.V4Sample', 'Soims.model.application.common.SampleApplicationType'],
    autoShow: true,
    autoScroll: true,
    bodyStyle: 'overflow-x:visible; overflow-y:scroll',
    initComponent: function () {
        var applicationType = Soims.model.application.common.SampleApplicationType;
        this.items = [{
            xtype: 'v4basicinfo',
            isShow: this.isShow,
            header: false,
            applicationID: this.applicationID
        }, {
            xtype: 'v4sample',
            type: applicationType.V4.value,
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

