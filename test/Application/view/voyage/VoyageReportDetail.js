Ext.define("Soims.view.voyage.VoyageReportDetail", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.voyagereportdetail',
    requires: ['Soims.store.project.User', 'Ext.ux.form.SearchComboBox', 'Soims.store.voyage.VoyageReportDetail'],
    viewConfig: { emptyText: '没有满足条件的航次任务' },
    title: '航次报告分工信息',
    plugins: [{ ptype: 'cellediting', clicksToEdit: 1}],
    selType: 'rowmodel',
    initComponent: function () {
        var store = Ext.create('Soims.store.project.User');
        this.deleteIds = '';

        this.vStore = Ext.create('Soims.store.voyage.VoyageReportDetail');
        if (this.voyageId !== undefined) {
            this.initStore();
        }
        this.store = this.vStore;
        this.columns = [
            {
                header: '<span>分工负责人<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
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
                header: '<span>负责学科和调查区域<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
                dataIndex: 'discipline',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    disabled: this.isShow,
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
            itemId: 'refreshTbardl',
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
            Ext.MessageBox.alert('警告', '不能建立不包含任何分工的航次报告', function () { }, this);
            return false;
        }
        store.each(function (model) {
            if (model.get('chargerId') === 0) {
                Ext.MessageBox.alert('警告', '航次报告分工负责人不能为空', function () { }, this);
                flg = false;
                return;
            }
            if (model.get('discipline') === '') {
                Ext.MessageBox.alert('警告', '负责学科和调查区域不能为空', function () { }, this);
                flg = false;
                return;
            }
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
    listeners: {
        validateedit: function (editor, e) {
            var cellEditor = editor.getEditor(e.record, e.column);
            cellEditor.revertInvalid = false;
        }
    }
});
