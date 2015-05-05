Ext.define("Soims.view.application.ApplicationGrid", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.applicationgrid',
    title: '申请书列表',
    iconCls: 'ApplicationSideList',
    closable: false,
    padding: 2,

    //    store: 'application.Application',
    selType: 'rowmodel',
    initComponent: function () {
        this.store = Ext.create('Soims.store.application.Application');
        this.height = Ext.ComponentQuery.query('center')[0].getHeight() - 120;
        this.columns = [
           {
               header: 'id',
               dataIndex: 'id',
               flex: 1,
               hidden: true
           }, {
               xtype: 'rownumberer'
           }, {

               header: '申请名称',
               dataIndex: 'name',
               width: 250,
               flex: 1
           }, {
               header: '承担任务名称',
               dataIndex: 'taskName',
               flex: 1
           }, {
               header: '负责人',
               dataIndex: 'charger',
               flex: 1
           }, {
               header: '创建日期',
               dataIndex: 'createTime',
               flex: 1
           }, {
               header: '提交日期',
               dataIndex: 'applyTime',
               flex: 1
           }, {
               header: '申请状态',
               dataIndex: 'state',
               flex: 1,
               renderer: function (value) {
                   return Soims.model.application.common.ApplicationState[value].name;
               }
           }, {
               header: '填写人',
               dataIndex: 'applicantName',
               flex: 1

           }];
        this.tbar = [{
            text: '查看',
            xtype: 'button',
            action: 'appShow',
            name: 'appShow',
            itemId: 'appShow',
            disabled: true,
            iconCls: 'Information'
        }, {
            text: '编辑',
            xtype: 'button',
            action: 'appEdit',
            name: 'appEdit',
            itemId: 'appEdit',
            disabled: true,
            iconCls: 'Disk'
        }, {
            text: '提交',
            xtype: 'button',
            action: 'appSubmit',
            name: 'appSubmit',
            itemId: 'appSubmit',
            disabled: true,
            iconCls: 'ArrowUp'
        }, {
            text: '导出',
            xtype: 'button',
            action: 'export',
            name: 'export',
            itemId: 'export',
            disabled: true,
            iconCls: 'DiskDownload'
        }, {
            text: '删除',
            xtype: 'button',
            action: 'appDelete',
            name: 'appDelete',
            itemId: 'appDelete',
            disabled: true,
            iconCls: 'Delete'
        }, {
            text: '撤回',
            name: 'appCancel',
            action: 'appCancel',
            itemId: 'appCancel',
            xtype: 'button',
            disabled: true,
            iconCls: 'ArrowUndo'
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
        this.on('selectionchange', this.buttonChange);
        this.on('itemdblclick', this.showFlawChart);
        this.callParent();
    },
    buttonChange: function (selModel, records) {
        if (records.length > 0) {

            if (records[0].get('state') == 'UnSubmit' || records[0].get('state') == 'AdminReject' || records[0].get('state') == 'Cancel') {

                this.down('#appShow').setDisabled(false);
                this.down('#appEdit').setDisabled(false);
                this.down('#appSubmit').setDisabled(false);
                this.down('#appDelete').setDisabled(false);
                this.down('#appCancel').setDisabled(true);
                this.down('#export').setDisabled(true);
            }
            else if (records[0].get('state') == 'Deleted') {

                this.down('#appCancel').setDisabled(true);
                this.down('#appShow').setDisabled(true);
                this.down('#appEdit').setDisabled(true);
                this.down('#appSubmit').setDisabled(true);
                this.down('#appDelete').setDisabled(true);
                this.down('#export').setDisabled(true);
            }
            else {
                this.down('#appShow').setDisabled(false);
                this.down('#appEdit').setDisabled(true);
                this.down('#appSubmit').setDisabled(true);
                this.down('#appDelete').setDisabled(true);
                this.down('#appCancel').setDisabled(false);
                this.down('#export').setDisabled(false);
            }
        }
        else {
            this.down('#appShow').setDisabled(true);
            this.down('#appEdit').setDisabled(true);
            this.down('#appSubmit').setDisabled(true);
            this.down('#appDelete').setDisabled(true);
            this.down('#appCancel').setDisabled(true);
            this.down('#export').setDisabled(true);
        }
    },
    showFlawChart: function () {

    }
});

