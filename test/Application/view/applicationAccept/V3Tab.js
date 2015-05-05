Ext.define("Soims.view.applicationAccept.V3Tab", {
    extend: 'Ext.form.Panel',
    alias: 'widget.acceptv3tab',
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
        this.items = [{
            xtype: 'v3basicinfo',
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

