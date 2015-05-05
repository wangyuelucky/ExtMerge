Ext.define("Soims.view.applicationAuditing.B1Tab", {
    extend: 'Ext.form.Panel',
    alias: 'widget.auditb1tab',
    closable: true,
    iconCls: 'Application',
    buttonAlign: 'center',
    requires: ['Soims.view.application.new.B1BasicInfo',
                'Soims.view.application.common.SampleInfo',
                'Soims.view.application.common.SampleSiteUse',
                'Soims.view.application.common.SampleBackCountry',
                'Soims.view.application.common.ElectronicDocument',
                'Soims.view.applicationAuditing.common.OrganizeContractorAuditForm',
                'Soims.view.applicationAuditing.common.VoyageChargerAuditForm',
                'Soims.view.applicationAuditing.common.LegChargerAuditForm'],
    autoShow: true,
    autoScroll: true,
    bodyStyle: 'overflow-x:visible; overflow-y:scroll',
    initComponent: function () {
        
        this.items = [{
            xtype: 'b1basicinfo',
            isShow: this.isShow,
            isAudit: this.isAudit,
            header: false,
            applicationID: this.applicationID
        }, {
            xtype: 'electronicdocument',
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
            xtype: 'samplesiteuse',
            isShow: this.isShow,
            isAudit: this.isAudit,
            header: false,
            applicationID: this.applicationID
        }, {
            xtype: 'samplebackcountry',
            isShow: this.isShow,
            isAudit: this.isAudit,
            header: false,
            applicationID: this.applicationID,
            panelType: this.panelType
        }, {
            xtype: 'organizecontractorauditform',
            isShow: this.isShow,
            isAudit: this.isAudit,
            applicationID: this.applicationID,
            isAudit: this.isAudit
        }, {
            xtype: 'voyagechargerauditform',
            isShow: this.isShow,
            isAudit: this.isAudit,
            applicationID: this.applicationID,
            isAudit: this.isAudit
        }, {
            xtype: 'legchargerauditform',
            isShow: this.isShow,
            isAudit: this.isAudit,
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

