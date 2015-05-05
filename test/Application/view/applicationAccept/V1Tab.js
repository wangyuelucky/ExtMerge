Ext.define("Soims.view.applicationAccept.V1Tab", {
    extend: 'Ext.form.Panel',
    alias: 'widget.acceptv1tab',
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
            header: false,
            applicationID: this.applicationID
        }, {
            xtype: 'sampleinfo',
            isShow: this.isShow,
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
            text: '受理',
            xtype: 'button',
            itemId: 'agree',
            hidden: !this.isAccept
        }];
        this.callParent();
    }
});

