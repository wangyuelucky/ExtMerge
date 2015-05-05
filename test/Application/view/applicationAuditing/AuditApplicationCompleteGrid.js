Ext.define("Soims.view.applicationAuditing.AuditApplicationCompleteGrid", {
    extend: 'Ext.grid.Panel',
    requires: ['Soims.model.application.common.ApplicationState', 'Soims.model.applicationAuditing.ContentType'],
    alias: 'widget.auditapplicationcompletegrid',
    title: '已审核申请书列表',
    iconCls: 'ApplicationViewColumns',
    closable: true,
    selType: 'rowmodel',
    initComponent: function () {
        this.store = Ext.create('Soims.store.applicationAuditing.AuditApplicationComplete');
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
               header: '审核状态',
               dataIndex: 'contentType',
               renderer: function (value) {
                   return Soims.model.applicationAuditing.ContentType[value].name;
               },
               flex: 1
           },{
               header: '审核日期',
               dataIndex: 'auditTime',
               renderer: Ext.util.Format.dateRenderer('Y年m月d日'),
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

