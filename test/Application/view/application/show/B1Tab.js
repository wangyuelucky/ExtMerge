Ext.define("Soims.view.application.show.B1Tab", {
    extend: 'Ext.form.Panel',
    alias: 'widget.showb1tab',
    closable: true,
    iconCls: 'Application',
    buttonAlign: 'center',
    requires: [ 'Soims.model.application.SamplePanelType',
                'Soims.view.application.new.B1BasicInfo',
                'Soims.view.application.common.SampleInfo',
                'Soims.view.application.common.SampleSiteUse',
                'Soims.view.application.common.SampleBackCountry',
                'Soims.view.application.common.ElectronicDocument'],
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
            xtype: 'sampleinfo',
            isShow: this.isShow,
            header: false,
            applicationID: this.applicationID,
            panelType: Soims.model.application.SamplePanelType.AuditShow.value
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
            panelType: Soims.model.application.SamplePanelType.AuditShow.value
        }, {
            xtype: 'electronicdocument',
            isShow: this.isShow,
            header: false,
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

