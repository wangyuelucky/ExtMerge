Ext.define("Soims.view.applicationAuditing.V1Tab", {
    extend: 'Ext.form.Panel',
    alias: 'widget.auditv1tab',
    closable: true,
    iconCls: 'Application',
    buttonAlign: 'center',
    requires: ['Soims.view.application.new.V1BasicInfo',
                'Soims.view.application.common.SampleInfo',
                'Soims.view.applicationAuditing.common.ReportManagerAuditForm'],
    autoShow: true,
    autoScroll: true,
    bodyStyle: 'overflow-x:visible; overflow-y:scroll',
    initComponent: function () {
        this.items = [{
            xtype: 'v1basicinfo',
            isShow: this.isShow,
            isAudit: this.isAudit,
            header: false,
            applicationID: this.applicationID
        }, {
            xtype: 'sampleinfo',
            isShow: this.isShow,
            isAudit: this.isAudit,
            header: false,
            applicationID: this.applicationID,
            panelType: this.panelType
        }, {
            xtype: 'reportmanagerauditform',
            isShow: this.isShow,
            applicationID: this.applicationID,
            isAudit: this.isAudit
        }];
        this.buttons = [{
            text: '保存',
            xtype: 'button',
            itemId: 'save',
            hidden: !this.isAudit
        }, {
            text: '提交',
            xtype: 'button',
            itemId: 'submit',
            hidden: !this.isAudit
        }, {
            text: '关闭',
            xtype: 'button',
            itemId: 'close',
            hidden: this.isAudit
        }];
        this.callParent();
    }
});

