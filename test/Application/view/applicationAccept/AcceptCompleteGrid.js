Ext.define("Soims.view.applicationAccept.AcceptCompleteGrid", {
    extend: 'Ext.grid.Panel',
    requires: ['Soims.model.applicationAccept.AcceptAction','Soims.store.applicationAccept.AcceptComplete'],
    alias: 'widget.acceptcompletegrid',
    title: '待分配申请书列表',
    iconCls: 'ApplicationViewColumns',
    closable: true,
    selType: 'rowmodel',
    initComponent: function () {
        this.store = Ext.create('Soims.store.applicationAccept.AcceptComplete');
        this.store.load();
        this.columns = [
           {
               header: 'id',
               dataIndex: 'acceptID',
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
               header: '申请书编号',
               dataIndex: 'applicationNumber',
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
               header: '受理日期',
               dataIndex: 'acceptTime',
               flex: 1
           }];
        this.tbar = [{
            text: '查看',
            xtype: 'button',
            itemId: 'show',
            action: 'show',
            disabled: true,
            iconCls: 'Information'
        }, {
            text: '导出现场申请Excel',
            xtype: 'button',
            itemId: 'exportSiteApplication',
            iconCls: 'DiskDownload'
        }, {
            text: '导出室内申请Excel',
            xtype: 'button',
            itemId: 'exportIndoorApplication',
            iconCls: 'DiskDownload'
        }, {
            text: '导入现场分配建议Excel',
            xtype: 'button',
            itemId: 'importSiteExcel',
            iconCls: 'DiskUpload'
        }, {
            text: '导入室内分配建议Excel',
            xtype: 'button',
            itemId: 'importIndoorExcel',
            iconCls: 'DiskUpload'
        }, {
            xtype: 'tbfill'
        }, {
            text: '刷新',
            itemId: 'refreshTbar',
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

