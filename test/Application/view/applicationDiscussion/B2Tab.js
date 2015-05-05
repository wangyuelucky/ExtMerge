Ext.define("Soims.view.applicationDiscussion.B2Tab", {
    extend: 'Ext.form.Panel',
    alias: 'widget.discussb2tab',
    closable: true,
    iconCls: 'Application',
    buttonAlign: 'center',
    requires: ['Soims.view.application.new.B2BasicInfo',
                'Soims.view.application.common.SampleInfo',
                'Soims.view.application.common.SampleSiteUse',
                'Soims.view.application.common.SampleBackCountry',
                'Soims.view.application.common.ElectronicDocument',
                'Soims.view.applicationDiscussion.MyAndAllDiscussion',
                'Soims.view.applicationDiscussion.FinallyResult',
                'Soims.view.applicationDiscussion.FinallyApproval'],
    autoShow: true,
    autoScroll: true,
    bodyStyle: 'overflow-x:visible; overflow-y:scroll',
    initComponent: function () {
        this.items = [{
            xtype: 'b2basicinfo',
            isShow: true,
            header: false,
            applicationID: this.applicationID
        }, {
            xtype: 'electronicdocument',
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
            xtype: 'samplesiteuse',
            isShow: true,
            header: false,
            applicationID: this.applicationID
        }, {
            xtype: 'samplebackcountry',
            isShow: true,
            header: false,
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

