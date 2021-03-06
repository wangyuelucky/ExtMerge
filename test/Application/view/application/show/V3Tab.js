﻿Ext.define("Soims.view.application.show.V3Tab", {
    extend: 'Ext.form.Panel',
    alias: 'widget.showv3tab',
    closable: true,
    iconCls: 'Application',
    buttonAlign: 'center',
    requires: ['Soims.view.application.new.V3BasicInfo',
                'Soims.view.application.common.SampleInfo',
                'Soims.view.application.common.ElectronicDocument',
                'Soims.model.application.common.SampleApplicationType'],
    autoShow: true,
    autoScroll: true,
    bodyStyle: 'overflow-x:visible; overflow-y:scroll',
    initComponent: function () {
        var applicationType = Soims.model.application.common.SampleApplicationType;
        this.items = [{
            xtype: 'v3basicinfo',
            isShow: this.isShow,
            header: false,
            applicationID: this.applicationID
        }, {
            xtype: 'sampleinfo',
            isShow: this.isShow,
            header: false,
            type: applicationType.V3.value,
            applicationID: this.applicationID,
            panelType: Soims.model.application.SamplePanelType.AuditShow.value
        }, {
            xtype: 'electronicdocument',
            isShow: this.isShow,
            header: false,
            type: applicationType.V3.value,
            applicationID: this.applicationID
        }];
        this.buttons = [{
            text: '关闭',
            xtype: 'button',
            itemId: 'close'
        }];
        this.callParent();
    }
});

