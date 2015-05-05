Ext.define("Soims.view.voyage.LegGrid", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.leggrid',
    requires: ['Soims.store.project.User', 'Ext.ux.form.SearchComboBox', 'Soims.store.voyage.Leg', 'Ext.ux.form.TreeField'],
    title: '航段列表',
    viewConfig: { emptyText: '没有满足条件的航段' },
    height: 400,
    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1,
        revertInvalid: false // 验证不通过，不回退
    })],
    selType: 'rowmodel',
    initComponent: function () {
        var store = Ext.create('Soims.store.project.User');
        this.deleteIds = '';
        this.vStore = Ext.create('Soims.store.voyage.Leg');

        if (this.voyageId !== undefined) {
            this.initStore();
        }

        var treeStore = Ext.create('Soims.store.tree.SampleAreaAll');
        this.tree = treeStore;
        //this.reloadTree();

        this.store = this.vStore;
        this.columns = [
            {
                header: '<span>航段编号<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
                dataIndex: 'name',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    itemId: 'name',
                    disabled: this.isShow,
                    allowBlank: false
                }

            }, {
                header: '<span>航段代码<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
                dataIndex: 'code',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    disabled: this.isShow,
                    allowBlank: false
                }
            }, {
                header: '<span>航段首席科学家<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
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
                header: '<span>采样区域<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
                dataIndex: 'sampleAreaIds',
                flex: 1,
                editor: {
                    xtype: 'treefield',
                    pickerTitle: '航段所在采样区域',
                    disabled: this.isShow,
                    onlyCheckChild: true,
                    store: treeStore
                },
                renderer: function (value, metaData, record) {
                    if (value) {
                        var arrValue = value.split(','),
                            flg = true,
                            display = '';

                        Ext.Array.each(arrValue, function (v) {
                            if (v !== '') {
                                //console.log(treeStore);
                                var arrOther = v.split('|');
                                var model = treeStore.getNodeById(arrOther[0]);
                                var t = document.getElementById('textBox' + arrOther[0]);

                                //console.log(model);
                                if (!model) {
                                    flg = false;
                                } else {
                                    if (t) {
                                        display = display + '[' + t.value + ']';
                                    } else {
                                        display = display + '[' + model.get('text') + ']';
                                    }
                                }
                            }
                        });
                        if (flg) {
                            return display;
                        } else {
                            return record.get('sampleAreas');
                        }
                    }
                }
            }, {
                header: '<span>开始时间<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
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
                header: '<span>结束时间<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
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
                header: '<span>开放申请时间<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
                hidden: Soims.component.voyageBasicStartTimeHidden,
                dataIndex: 'startApplyTime',
                xtype: 'datecolumn',
                format: 'Y-m-d',
                flex: 1,
                editor: {
                    xtype: 'datefield',
                    //name: 'endTime',
                    disabled: this.isShow,
                    allowBlank: Soims.component.voyageBasicStartTimeHidden
                }
            }, {
                header: '<span>结束申请时间<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
                hidden: Soims.component.voyageBasicStartTimeHidden,
                dataIndex: 'endApplyTime',
                xtype: 'datecolumn',
                format: 'Y-m-d',
                flex: 1,
                editor: {
                    xtype: 'datefield',
                    disabled: this.isShow,
                    name: 'endApplyTime',
                    allowBlank: Soims.component.voyageBasicStartTimeHidden
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
            iconCls: 'Delete',
            xtype: 'button',
            hidden: this.isShow,
            disabled: true
        }, {
            xtype: 'tbfill'
        }, {
            text: '刷新',
            itemId: 'refreshTbarlg',
            iconCls: 'ArrowRefresh',
            xtype: 'button'
        }];
        this.on('selectionchange', this.buttonChange);
        this.callParent();
    },
   /* isValid: function () {
        var flg = true;
        var store = this.getStore();
        if (store.getCount() === 0) {
            Ext.MessageBox.alert('警告', '不能建立不包含任何航段的航次', function () { }, this);
            return false;
        }
        //this.isa();
        store.each(function (model) {
            if (model.get('name').trim() === '') {
                Ext.MessageBox.alert('警告', '航段编号不能为空', function () { }, this);
                flg = false;
                return;
            }
            if (model.get('code').trim() === '') {
                Ext.MessageBox.alert('警告', '航段代码不能为空', function () { }, this);
                flg = false;
                return;
            }
            if (model.get('chargerId') === 0) {
                Ext.MessageBox.alert('警告', '航段首席科学家不能为空', function () { }, this);
                flg = false;
                return;
            }
            if (model.get('startTime') === null) {
                Ext.MessageBox.alert('警告', '航段开始时间不能为空', function () { }, this);
                flg = false;
                return;
            }
            if (model.get('endTime') === null) {
                Ext.MessageBox.alert('警告', '航段结束时间不能为空', function () { }, this);
                flg = false;
                return;
            }
//            if (model.get('startApplyTime') === null) {
//                Ext.MessageBox.alert('警告', '航段开始申请时间不能为空', function () { }, this);
//                flg = false;
//                return;
//            }
//            if (model.get('endApplyTime') === null) {
//                Ext.MessageBox.alert('警告', '航段结束申请时间不能为空', function () { }, this);
//                flg = false;
//                return;
//            }
            store.each(function (record) {
                if (record.get('code') == model.get('code') && record != model) {
                    Ext.MessageBox.alert('警告', '同航次下的航段代码不能重复', function () { }, this);
                    flg = false;
                    return;
                }
            }, this);
            store.each(function (record) {
                if (record.get('name') == model.get('name') && record != model) {
                    Ext.MessageBox.alert('警告', '同航次下的航段编号不能重复', function () { }, this);
                    flg = false;
                    return;
                }
            }, this);
        }, this);
        return flg;
    },*/

    buttonChange: function (selModel, records) {
        if (records.length != 0) {
            this.down('#delete').setDisabled(false);
        } else {
            this.down('#delete').setDisabled(true);
        }
    },

    initStore: function () {
        this.vStore.getProxy().setExtraParam('voyageId', this.voyageId);
    },

    reloadTree: function () {
        this.tree.reload();
        var root = this.tree.getRootNode();
        root.eachChild(function (child) {
            if (!child.data.leaf) {
                this.tree.load({ node: child });
            }
        }, this);
    },
    listeners: {
        validateedit: function (editor, e) {
            var cellEditor = editor.getEditor(e.record, e.column);
            cellEditor.revertInvalid = false;
        }
    }
});
