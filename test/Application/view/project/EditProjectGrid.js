Ext.define("Soims.view.project.EditProjectGrid", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.editprojectgrid',
    requires: ['Soims.store.project.User', 'Ext.ux.form.SearchComboBox', 'Soims.store.project.Subject'],
    title: '课题列表',
    viewConfig: { emptyText: '没有满足条件的课题' },
    height: 400,
    plugins: [{ ptype: 'cellediting', clicksToEdit: 1}],
    selType: 'rowmodel',
    initComponent: function () {
        var store = Ext.create('Soims.store.project.User');
        this.store = Ext.create('Soims.store.project.Subject');
        this.columns = [
            {
                header: '课题名称',
                dataIndex: 'name',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    itemId: 'name',
                    disabled: this.isShow,
                    allowBlank: false
                }

            }, {
                header: '课题编号',
                dataIndex: 'number',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    disabled: this.isShow,
                    allowBlank: false
                }
            }, {
                header: '课题负责人',
                dataIndex: 'chargerId',
                flex: 1,
                editor: {
                    xtype: 'searchcombo',
                    itemId: 'charger',
                    store: store,
                    disabled: this.isShow,
                    valueField: 'id',
                    allowBlank: false,
                    tpl: Ext.create('Ext.XTemplate',
                     '<tpl for=".">',
                          '<div class="x-boundlist-item">{name} - {departmentName}</div>',
                      '</tpl>'
                    ),
                    displayTpl: Ext.create('Ext.XTemplate',
                      '<tpl for=".">',
                          '{name}',
                      '</tpl>'
                    )
                },
                renderer: function (value, metaData, record) {
                    if (value) {
                        var model = store.findRecord('id', value);
                        if (model === null) {
                            return record.get('chargerName');
                        } else {
                            return model.get('name');
                        }
                    }
                }
            }, {
                header: '开始时间',
                dataIndex: 'startTime',
                xtype: 'datecolumn',
                format: 'Y-m-d',
                flex: 1,
                editor: {
                    xtype: 'datefield',
                    name: 'startTime',
                    disabled: this.isShow,
                    allowBlank: false
                }
            }, {
                header: '结束时间',
                dataIndex: 'endTime',
                xtype: 'datecolumn',
                format: 'Y-m-d',
                flex: 1,
                editor: {
                    xtype: 'datefield',
                    name: 'endTime',
                    disabled: this.isShow,
                    allowBlank: false
                }
            }, {
                header: '结束申请时间',
                dataIndex: 'endApplyTime',
                xtype: 'datecolumn',
                format: 'Y-m-d',
                flex: 1,
                editor: {
                    xtype: 'datefield',
                    disabled: this.isShow,
                    name: 'endApplyTime',
                    allowBlank: false
                }
            }];
        this.tbar = [{
            text: '添加',
            xtype: 'button',
            iconCls: 'Add',
            hidden: this.isShow,
            itemId: 'add'

        }, {
            text: '删除',
            itemId: 'delete',
            xtype: 'button',
            iconCls: 'Delete',
            hidden: this.isShow,
            disabled: true
        }, {
            xtype: 'tbfill'
        }, {
            text: '刷新',
            itemId: 'refreshTbarPro',
            iconCls: 'ArrowRefresh',
            xtype: 'button'
        }];
        this.on('selectionchange', this.buttonChange);
        this.callParent();
    },
    isValid: function () {
        var flg = true;
        var store = this.getStore();
        if (store.getCount() === 0) {
            Ext.MessageBox.alert('警告', '不能建立不包含任何课题的项目', function () { }, this);
            return false;
        }
        //this.isa();
        store.each(function (model) {
            console.log(model.get('chargerId'));
            if (model.get('name').trim() === '') {
                Ext.MessageBox.alert('警告', '课题名称不能为空', function () { }, this);
                flg = false;
                return;
            }
            if (model.get('number').trim() === '') {
                Ext.MessageBox.alert('警告', '课题编号不能为空', function () { }, this);
                flg = false;
                return;
            }
            if (model.get('chargerId') === '') {
                Ext.MessageBox.alert('警告', '课题负责人不能为空', function () { }, this);
                flg = false;
                return;
            }
            if (model.get('startTime') === null) {
                Ext.MessageBox.alert('警告', '课题开始时间不能为空', function () { }, this);
                flg = false;
                return;
            }
            if (model.get('endTime') === null) {
                Ext.MessageBox.alert('警告', '课题结束时间不能为空', function () { }, this);
                flg = false;
                return;
            }
            if (model.get('endApplyTime') === null) {
                Ext.MessageBox.alert('警告', '课题结束申请时间不能为空', function () { }, this);
                flg = false;
                return;
            }
            store.each(function (record) {
                if (record.get('name') == model.get('name') && record != model) {
                    Ext.MessageBox.alert('警告', '同项目下的课题名称不能重复', function () { }, this);
                    flg = false;
                    return;
                }
            }, this);
        }, this);
        return flg;
    },
    isa: function () {
        var store = this.getStore();
        var message = [];
        store.each(function (model) {
            var errors = model.validate();
            if (!errors.isValid()) {
                errors.each(function (v) {
                    console.log(v);
                    message.push(v.field + ' : ' + v.message);
                });
            }
        }, this);
        if (message.length != 0) {
            Ext.MessageBox.alert(message.join('\n'), function () { }, this);
        }
    },

    buttonChange: function (selModel, records) {
        if (records.length != 0) {
            this.down('#delete').setDisabled(false);
        } else {
            this.down('#delete').setDisabled(true);
        }
    }
});
