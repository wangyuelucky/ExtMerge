Ext.define("Soims.view.voyage.BoardPeoplePanel", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.boardpeoplepanel',
    title: '上船人员列表',
    viewConfig: { emptyText: '没有满足条件的项目' },
    //iconCls: 'Project',
    closable: false,
    selType: 'rowmodel',
    initComponent: function () {
        this.store = Ext.create('Soims.store.voyage.BoardPeople');
        if (this.voyageId) {
            this.initStore();
        }
        this.columns = [
            {
                header: '姓名',
                dataIndex: 'name',
                flex: 1
            }, {
                header: '身份证号',
                dataIndex: 'identityNumber',
                flex: 1
            }, {
                header: '性别',
                dataIndex: 'sex',
                flex: 1
            }, {
                header: '单位',
                dataIndex: 'userCompany',
                flex: 1
            }, {
                header: '职务',
                dataIndex: 'position',
                flex: 1
            }, {
                header: '岗位职责',
                dataIndex: 'duty',
                flex: 1
            }, {
                header: '出生日期',
                dataIndex: 'birthday',
                flex: 1
            }, {
                header: '邮箱',
                dataIndex: 'email',
                flex: 1
            }, {
                header: '地址',
                dataIndex: 'address',
                flex: 1
            }, {
                header: '联系电话',
                dataIndex: 'tellPhone',
                flex: 1
            }, {
                header: '移动电话',
                dataIndex: 'cellPhone',
                flex: 1
            }];
        this.tbar = [{
            text: '添加',
            xtype: 'button',
            hidden: this.isShow,
            iconCls: 'Add',
            itemId: 'add',
            disabled: this.voyageId == undefined ? true : false
        }, {
            text: '修改',
            xtype: 'button',
            iconCls: 'Disk',
            hidden: this.isShow,
            itemId: 'modify',
            disabled: true
        }, {
            text: '删除',
            itemId: 'delete',
            iconCls: 'Delete',
            hidden: this.isShow,
            xtype: 'button',
            disabled: true
        }, {
            text: '导入单位信息Excel',
            hidden: this.isShow,
            itemId: 'boardingPeopleDepartment',
            iconCls: 'Disk',
            xtype: 'button'
            //disabled: this.voyageId == undefined ? true : false
        }, {
            text: '导入上船人员名单Excel',
            hidden: this.isShow,
            itemId: 'boardingPeople',
            iconCls: 'Disk',
            xtype: 'button'
            //disabled: this.voyageId == undefined ? true : false
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
        this.callParent();
    },
    buttonChange: function (selModel, records) {
        if (records.length != 0) {
            //this.down('#delete').setDisabled(false);
            this.down('#modify').setDisabled(false);
            //this.down('#show').setDisabled(false);
            //this.down('#introduction').setDisabled(false);
        } else {
            this.down('#delete').setDisabled(true);
            this.down('#modify').setDisabled(true);
            //this.down('#show').setDisabled(true);
            //this.down('#introduction').setDisabled(true);
        }
    },
    initStore: function () {
        this.store.getProxy().setExtraParam('voyageId', this.voyageId);
    },
    lock: function () {
        this.down('#add').setDisabled(true);
        //this.down('#introduction').setDisabled(true);
    },
    unlock: function () {
        this.down('#add').setDisabled(false);
        //this.down('#introduction').setDisabled(false);
    }
});

