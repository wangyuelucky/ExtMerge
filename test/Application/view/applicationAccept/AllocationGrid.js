Ext.define("Soims.view.applicationAccept.AllocationGrid", {
    extend: 'Ext.grid.Panel',
    requires: 'Soims.model.applicationAccept.AcceptAction',
    alias: 'widget.allocationgrid',
    title: '已分配申请书列表',
    iconCls: 'ApplicationViewColumns',
    closable: true,
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '<span style="font-size:12px">{[values.rows[0].data.name]}</span>'
        //groupHeaderTpl: '<span style="font-size:12px">{[values.rows[0].data.name]}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="grpBtn"><input type="button" class="x-btn-center" value="设置提交日期"/></span>'
    }],
    selModel: {
        mode: "MULTI"
    },
    selType: 'rowmodel',
    initComponent: function () {
        this.store = Ext.create('Soims.store.applicationAccept.AllocationComplete');
        this.store.load();
        this.columns = [
           {
               header: 'id',
               dataIndex: 'acceptID',
               flex: 1,
               hidden: true
           }, {
               header: '样品类型',
               dataIndex: 'sampleType',
               flex: 1
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
               hidden: true,
               flex: 1
           }, {
               header: '负责人',
               dataIndex: 'charger',
               hidden: true,
               flex: 1
           }, {
               header: '本任务既往使用样品情况',
               dataIndex: 'taskPreviousUsage',
               flex: 1
           }, {
               header: '申请人既往使用样品情况',
               dataIndex: 'supplierPreviousUsage',
               flex: 1
           }, {
               header: '样品现场使用意见',
               dataIndex: 'suggestion',
               flex: 1
           }, {
               header: '取用次序',
               dataIndex: 'order',
               flex: 1
           }];
        this.tbar = [{
            text: '收缩所有分组',
            xtype: 'button',
            iconCls: 'Refresh',
            tooltip: '<b>收缩分组</b><br/>收缩所有分组',
            handler: function () {
                var grid = this.up('grid'),
                    feature = grid.getView().getFeature(0);
                feature.collapseAll();
            }
        }, {
            text: '展开所有分组',
            xtype: 'button',
            iconCls: 'Refresh',
            tooltip: '<b>展开分组</b><br/>展开所有分组',
            handler: function () {
                var grid = this.up('grid'),
                    feature = grid.getView().getFeature(0);
                feature.expandAll();
            }
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
    },
    listeners: {
        groupclick: function (view, node, group, e) {
            var btn = e.getTarget('.grpBtn');
            if (btn) {
                alert('hello');
            }
        }
    }
});

