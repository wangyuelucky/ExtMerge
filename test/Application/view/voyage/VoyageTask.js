Ext.define("Soims.view.voyage.VoyageTask", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.voyagetask',
    requires: ['Soims.store.project.User', 'Ext.ux.form.SearchComboBox', 'Soims.store.voyage.Leg', 'Soims.store.voyage.VoyageTask'],
    viewConfig: { emptyText: '没有满足条件的航次任务' },
    //height: 400,
    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1,
        revertInvalid: false // 验证不通过，不回退
    })],
    selType: 'rowmodel',
    initComponent: function () {
        var store = Ext.create('Soims.store.project.User');

        this.deleteIds = '';

        this.legStore = Ext.create('Soims.store.voyage.Leg');
        this.vStore = Ext.create('Soims.store.voyage.VoyageTask');
        //console.log(this.voyageId);
        if (this.voyageId !== undefined) {
            this.initStore();
            this.vStore.load();
        }

        this.store = this.vStore;
        this.columns = [
            {
                header: '<span>任务名称<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
                dataIndex: 'name',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    itemId: 'name',
                    disabled: this.isShow,
                    allowBlank: false
                }

            }, {
                header: '<span>任务负责人<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
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
                header: '<span>所在航段<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
                dataIndex: 'voyageTaskLegNames',
                flex: 1,
                editor: {
                    xtype: 'combo',
                    store: this.legStore,
                    multiSelect: true,
                    //forceSelection: true,
                    editable: false,
                    //forceSelection: true,
                    disabled: this.isShow,
                    valueField: 'name',
                    allowBlank: false,
                    displayField: 'name'
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
            itemId: 'refreshTbarEq',
            iconCls: 'ArrowRefresh',
            xtype: 'button'
        }];
        this.on('selectionchange', this.buttonChange);
        this.callParent();
    },
    /*isValid: function () {
        var flg = true;
        var store = this.getStore();
        if (store.getCount() === 0) {
            Ext.MessageBox.alert('警告', '请添加航次任务', function () { }, this);
            return false;
        }
        store.each(function (model) {
            if (model.get('name').trim() === '') {
                Ext.MessageBox.alert('警告', '航次任务名称不能为空', function () { }, this);
                flg = false;
                return;
            }
            if (model.get('chargerId') === 0) {
                Ext.MessageBox.alert('警告', '航次任务负责人不能为空', function () { }, this);
                flg = false;
                return;
            }
            if (model.get('voyageTaskLegNames') === '') {
                Ext.MessageBox.alert('警告', '航次任务所在航段不能为空', function () { }, this);
                flg = false;
                return;
            }
            store.each(function (record) {
                if (record.get('name') == model.get('name') && record != model) {
                    Ext.MessageBox.alert('警告', '航次任务名称不能重复', function () { }, this);
                    flg = false;
                    return;
                }
            }, this);
        }, this);

        var names = '';
        store.each(function (model) {
            names = names + model.get('voyageTaskLegNames') + ',';
        }, this);
        Ext.Ajax.request({
            async: false,
            url: Soims.service.voyages.LegService + '/ExitLegNames',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { names: names, voyageId: this.voyageId },
            success: function (response) {
                if (response.responseText) {
                    Ext.MessageBox.alert('警告', '航段信息已经变更，请重新选择', function () { }, this);
                    flg = false;
                }
            }
        });
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
        this.legStore.getProxy().setExtraParam('voyageId', this.voyageId);
        this.vStore.getProxy().setExtraParam('voyageId', this.voyageId);
    },
    listeners: {
        validateedit: function (editor, e) {
            var cellEditor = editor.getEditor(e.record, e.column);
            cellEditor.revertInvalid = false;
        }
    }
});
