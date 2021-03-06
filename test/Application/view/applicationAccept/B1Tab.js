﻿Ext.define("Soims.view.applicationAccept.B1Tab", {
    extend: 'Ext.form.Panel',
    alias: 'widget.acceptb1tab',
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
            xtype: 'samplesiteuse',
            isShow: this.isShow,
            header: false,
            applicationID: this.applicationID
        }, {
            xtype: 'samplebackcountry',
            isShow: this.isShow,
            header: false,
            applicationID: this.applicationID,
            panelType: this.panelType
        }, {
            xtype: 'organizecontractorauditform',
            isShow: this.isShow,
            applicationID: this.applicationID,
            isAudit: false
        }, {
            xtype: 'voyagechargerauditform',
            isShow: this.isShow,
            applicationID: this.applicationID,
            isAudit: false
        }, {
            xtype: 'legchargerauditform',
            isShow: this.isShow,
            applicationID: this.applicationID,
            isAudit: false
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

