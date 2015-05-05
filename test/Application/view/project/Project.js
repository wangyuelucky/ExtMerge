Ext.define("Soims.view.project.Project", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.project',
    title: '项目列表',
    viewConfig: { emptyText: '没有满足条件的项目' },
    iconCls: 'Project',
    //width: 400,
    closable: true,
    store: 'project.Project',
    selType: 'rowmodel',
    initComponent: function () {
        this.columns = [
            {
                header: '项目名称',
                dataIndex: 'name',
                flex: 1
            }, {
                header: '项目编号',
                dataIndex: 'number',
                flex: 1
            }, {
                header: '项目负责人',
                dataIndex: 'managerName',
                flex: 1
            }];
        this.tbar = [{
            text: '修改',
            xtype: 'button',
            iconCls: 'Disk',
            itemId: 'modify',
            disabled: true
        }, {
            text: '查看',
            xtype: 'button',
            iconCls: 'Information',
            itemId: 'show',
            disabled: true
        }, {
            text: '删除',
            itemId: 'delete',
            iconCls: 'Delete',
            xtype: 'button',
            disabled: true
        }, {
            xtype: 'tbfill'
        }, {
            text: '刷新',
            itemId: 'refreshTbarProList',
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

