Ext.define("Soims.view.applicationAccept.V4Tab", {
    extend: 'Ext.form.Panel',
    alias: 'widget.acceptv4tab',
    closable: true,
    iconCls: 'Application',
    buttonAlign: 'center',
    requires: ['Soims.view.application.new.V4BasicInfo',
                'Soims.view.application.common.SampleInfo',
                'Soims.model.application.common.SampleApplicationType'],
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

