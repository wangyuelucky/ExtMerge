Ext.define("Soims.view.application.common.TestDataGrid", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.testdatagrid',
    header: false,
    viewConfig: { emptyText: '没有满足条件的测试数据' },
    height: 200,
    frame: false,
    closable: false,
    collapsible: false,
    titleCollapse: false,
    //features: [{ ftype: 'grouping'}],
    plugins: [{ ptype: 'cellediting', clicksToEdit: 1}],
    //    store: 'application.common.TestData',
    selType: 'rowmodel',
    initComponent: function () {
        if (this.type == 'V1' || this.type == 'B1' || this.type == 'B2') {
            this.features = [{ ftype: 'grouping'}];
        }
        this.store = Ext.create('Soims.store.application.common.TestData');
        this.applicationID = '';
        this.deleteid = '';
        this.columns = [
        {
            xtype: 'rownumberer'
        }, {
            text: '样品类型',
            sortable: false,
            dataIndex: 'sampleType'
        }, {
            text: '使用目的',
            lockable: false,
            sortable: true,
            dataIndex: 'usePurpose'
        }, {
            text: '航段',
            sortable: false,
            dataIndex: 'leg',
            hidden: this.type == 'V2' || this.type == 'V3' || this.type == 'V4' ? true : false
        }, {
            text: '分析测试项目、指标',
            sortable: true,
            dataIndex: 'anlyseTestProject'
        }, {
            text: '拟提交测试数据',
            sortable: true,
            dataIndex: 'intendCommitTestData',
            editor: {
                xtype: 'textfield',
                itemId: 'name',
                disabled: this.isShow,    
                allowBlank: true
            }
        }, {
            text: '拟提交时间',
            sortable: true,
            renderer: Ext.util.Format.dateRenderer('Y-m-d'),
            dataIndex: 'commitTestDataTime',
            editor: {
                allowBlank: false,
                xtype: 'datefield',
                disabled: this.isShow,    
                format: 'Y-m-d'
            }
        }];

        this.tbar = {
            hidden: this.isShow,
            items: [{
                text: '删除',
                name: 'testDelete',
                action: 'testDelete',
                itemId: 'testDelete',
                xtype: 'button',
                iconCls: 'Delete',
                disabled: true
           
            }]
        };

        this.callParent();
    }
});
