Ext.define("Soims.view.applicationAccept.V2Tab", {
    extend: 'Ext.form.Panel',
    alias: 'widget.acceptv2tab',
    closable: true,
    iconCls: 'Application',
    buttonAlign: 'center',
    requires: ['Soims.view.application.new.V2BasicInfo',
                'Soims.view.application.common.SampleInfo',
                'Soims.view.application.common.ElectronicDocument',
                'Soims.model.application.common.SampleApplicationType',
                'Soims.view.applicationAuditing.common.ProjectChargerAuditForm'],
    autoShow: true,
    autoScroll: true,
    bodyStyle: 'overflow-x:visible; overflow-y:scroll',
    initComponent: function () {
        this.items = [{
            xtype: 'v2basicinfo',
            isShow: this.isShow,
            header: false,
            applicationID: this.applicationID
        }, {
            xtype: 'electronicdocument',
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
            xtype: 'projectchargerauditform',
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

