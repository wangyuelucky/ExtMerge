Ext.define("Soims.view.applicationApproval.ApprovalComplete", {
    extend: 'Ext.grid.Panel',
    requires: 'Soims.model.application.common.ApplicationState',
    alias: 'widget.approvalcomplete',
    closable: true,
    title: '已审批申请书列表',
    iconCls: 'ApplicationViewColumns',
    selType: 'rowmodel',
    initComponent: function () {
        this.store = Ext.create('Soims.store.applicationApproval.ApprovalComplete');
        this.store.load();
        this.columns = [
           {
               header: 'id',
               dataIndex: 'id',
               flex: 1,
               hidden: true
           }, {
               header: '申请名称',
               dataIndex: 'name',
               flex: 1
           }, {
               header: '申请书编号',
               dataIndex: 'applicationNumber',
               flex: 1
           }, {
               header: '填写人',
               dataIndex: 'applicantName',
               flex: 1
           }, {
               header: '申请书类型',
               dataIndex: 'type',
               flex: 1
           }, {
               header: '审批日期',
               dataIndex: 'approvalTime',
               flex: 1
           }];
        this.tbar = [{
            text: '查看',
            xtype: 'button',
            itemId: 'show',
            disabled: true,
            iconCls: 'Information'
        }, {
            xtype: 'tbfill'
        }, {
            text: '刷新',
            itemId: 'refreshTbarAppCom',
            iconCls: 'ArrowRefresh',
            xtype: 'button'
        }];

        this.bbar = [{
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            border: false,
            displayMsg: '显示第 {0} 条到 {1} 条记录 / 共 {2} 条',
            emptyMsg: "没有记录"
        }];

        this.callParent();
    }
});