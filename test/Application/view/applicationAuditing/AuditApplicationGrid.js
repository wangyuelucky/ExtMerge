Ext.define("Soims.view.applicationAuditing.AuditApplicationGrid", {
    extend: 'Ext.grid.Panel',
    requires: 'Soims.model.application.common.ApplicationState',
    alias: 'widget.auditapplicationgrid',
    title: '待审核申请书列表',
    iconCls: 'ApplicationViewColumns',
    closable: true,
    selType: 'rowmodel',
    initComponent: function () {
        this.store = Ext.create('Soims.store.applicationAuditing.AuditApplication');
        this.store.load();
        this.columns = [
           {
               header: '申请书编号',
               dataIndex: 'applicationNumber',
               flex: 1,
               hidden: true
           }, {
               header: '申请名称',
               dataIndex: 'name',
               flex: 1
           }, {
               header: '申请书类型',
               dataIndex: 'type',
               flex: 1
           }, {
               header: '填写人',
               dataIndex: 'applicantName',
               flex: 1
           }, {
               header: '负责人',
               dataIndex: 'charger',
               flex: 1
           }, {
               header: '提交日期',
               dataIndex: 'applyTime',
               flex: 1
           }];
        this.tbar = [{
            text: '审核',
            xtype: 'button',
            action: 'audit',
            name: 'audit',
            itemId: 'audit',
            disabled: true,
            tooltip: '审核申请书',
            iconCls: 'Information'
        }, {
            xtype: 'tbfill'
        }, {
            text: '刷新',
            itemId: 'refreshTbar',
            iconCls: 'ArrowRefresh',
            tooltip: '刷新列表',
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

