Ext.define("Soims.view.applicationAccept.AcceptForm", {
    extend: 'Ext.form.Panel',
    alias: 'widget.acceptform',
    requires: ['Soims.model.applicationAuditing.AuditType'],
    bodyPadding: 2,
    title: '大洋馆受理意见',

    initComponent: function () {
        this.items = [{
            xtype: 'textareafield',
            anchor: '100%',
            grow: true,
            itemId: 'acceptContent',
            height: 150
        }];
        this.callParent();
    },
    listeners: {
        afterrender: function () {
            Ext.Ajax.request({
                url: Soims.service.ApplicationAccepts.AcceptService + '/GetAcceptContent',
                params: { ApplicationID: this.applicationID },
                scope: this,
                success: function (response) {
                    this.down('textareafield').setValue(response.responseText);
                }
            });
        }
    }
});