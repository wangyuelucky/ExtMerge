Ext.define("Soims.view.applicationDiscussion.Discussion", {
    extend: 'Ext.form.Panel',
    alias: 'widget.discussion',
    closable: true,
    AutoScroll: true,
    iconCls: 'Project',
    overflowY: 'auto',
    requires: ['Soims.view.applicationDiscussion.SampleInfor', 'Soims.view.applicationDiscussion.AllocationInfor', 'Soims.view.applicationDiscussion.FinallyResult', 'Soims.view.applicationDiscussion.MyAndAllDiscussion', 'Soims.view.applicationDiscussion.FinallyApproval'],
    initComponent: function () {
        this.items = [{
            xtype: this.type == 'V4' ? 'v4sample' : 'sampleinfor',
            applicationID: this.applicationID,
            isShow: true,
            isDiscussion: true,
            type: this.type
        }, {
            xtype: 'allocationinfor',
            isShow: this.isShow,
            applicationID: this.applicationID,
            isDiscussion: this.isDiscussion,
            type: this.type
        }, {
            xtype: 'myandalldiscussion',
            isShow: this.isShow,
            applicationID: this.applicationID,
            isDiscussion: this.isDiscussion
        }, {
            xtype: 'finallyresult',
            isShow: this.isShow,
            applicationID: this.applicationID,
            isDiscussion: this.isDiscussion
        }, {
            xtype: 'finallyapproval',
            isShow: this.isShow,
            hidden: this.isDiscussion,
            applicationID: this.applicationID
        }];
        this.callParent();
    }
});