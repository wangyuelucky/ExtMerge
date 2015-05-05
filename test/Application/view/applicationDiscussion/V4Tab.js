Ext.define("Soims.view.applicationDiscussion.V4Tab", {
    extend: 'Ext.form.Panel',
    alias: 'widget.discussv4tab',
    closable: true,
    iconCls: 'Application',
    buttonAlign: 'center',
    requires: ['Soims.view.application.new.V4BasicInfo',
                'Soims.view.application.common.SampleInfo',
                'Soims.model.application.common.SampleApplicationType',
                'Soims.view.applicationDiscussion.MyAndAllDiscussion',
                'Soims.view.applicationDiscussion.FinallyResult',
                'Soims.view.applicationDiscussion.FinallyApproval'],
    autoShow: true,
    autoScroll: true,
    bodyStyle: 'overflow-x:visible; overflow-y:scroll',
    initComponent: function () {
        var applicationType = Soims.model.application.common.SampleApplicationType;
        this.items = [{
            xtype: 'v4basicinfo',
            isShow: true,
            header: false,
            applicationID: this.applicationID
        }, {
            xtype: 'sampleinfo',
            isShow: true,
            header: false,
            isDiscussion: this.isDiscussion,
            applicationID: this.applicationID,
            panelType: this.panelType
        }, {
            xtype: 'myandalldiscussion',
            isShow: !this.isShow,
            applicationID: this.applicationID,
            isDiscussion: this.isDiscussion
        }, {
            xtype: 'finallyresult',
            isShow: !this.isShow,
            isFinally: this.isFinally,
            applicationID: this.applicationID,
            isDiscussion: this.isDiscussion
        }, {
            xtype: 'finallyapproval',
            isShow: !this.isShow,
            hidden: this.isDiscussion,
            applicationID: this.applicationID
        }];
        this.callParent();
    }
});

