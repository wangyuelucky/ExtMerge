Ext.define("Soims.view.application.common.SampleBackCountryGrid", {
    itemId: 'applicationCommonSampleBackCountryGrid',
    extend: 'Ext.grid.Panel',
    alias: 'widget.samplebackcountrygrid',
    autoHeight: true,
    title: '提前样品运送回国列表',
    //requires: 'Soims.store.application.common.SampleBackCountry',
    emptyText: '没有满足条件的样品',
    height: 200,
    selType: 'rowmodel',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    initComponent: function () {
        var me = this;
        console.log(this.applicationID);
        this.store = Ext.create('Soims.store.application.common.SampleBackCountry');
        if (this.applicationID != undefined) {
            this.store.getProxy().setExtraParam('applicationID', this.applicationID);
            this.store.load();
        }

        var sampleTypeStore = Ext.create('Soims.store.application.common.SampleType');
        this.columns = [
            { xtype: 'rownumberer' },
            {
                header: '<span>样品类型<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
                dataIndex: 'sampleType',
                flex: 1,
                allowBlank: false,
                editor: {
                    itemId: 'sampleType',
                    name: 'sampleType',
                    xtype: 'combobox',
                    //displayField: 'sampleType',
                    valueField: 'sampleType',
                    showStar: true,
                    queryMode: 'local',
                    store: sampleTypeStore,
                    editable: false,
                    disabled: this.isShow == true ? true : false,
                    tpl: Ext.create('Ext.XTemplate',
                     '<tpl for=".">',
                          '<div class="x-boundlist-item">{sampleType} - {legID}</div>',
                      '</tpl>'
                    ),
                    displayTpl: Ext.create('Ext.XTemplate',
                      '<tpl for=".">',
                          '{sampleType}',
                      '</tpl>'
                    ),
                    listeners: {
                        expand: function (text, the, eOpts) {
                            me.expendSampleType();
                        }
                    }
                }
            }, {
                header: '所在航段',
                dataIndex: 'sampleLeg',
                flex: 1
            }, {
                header: '<span>样品数<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
                dataIndex: 'sampleNumber',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    forbidBlankAndShowStar: true,
                    disabled: this.isShow == true ? true : false,
                    allowBlank: false
                }
            }, {
                header: '<span>样品量<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
                dataIndex: 'sampleAmount',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    forbidBlankAndShowStar: true,
                    disabled: this.isShow == true ? true : false,
                    allowBlank: false
                }
            }, {
                header: '<span>保存条件<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
                dataIndex: 'preservationCondition',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    forbidBlankAndShowStar: true,
                    disabled: this.isShow == true ? true : false,
                    allowBlank: false
                }
            }, {
                header: '<span>拟运出时间<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
                dataIndex: 'backTime',
                flex: 1,
                xtype: 'datecolumn',
                format: 'Y-m-d',
                editor: {
                    xtype: 'datefield',
                    disabled: this.isShow == true ? true : false,
                    value: new Date()
                }
            }, {
                header: '其他要求',
                dataIndex: 'otherNeed',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    disabled: this.isShow == true ? true : false,
                    allowBlank: true
                }
            }];

        this.tbar = {
            hidden: this.isShow,
            items: [{
                text: '添加',
                xtype: 'button',
                itemId: 'addSample',
                iconCls: 'Add'
            }, {
                text: '删除',
                xtype: 'button',
                itemId: 'deleteSample',
                disabled: true,
                iconCls: 'Delete'
            }]
        };
        this.on('selectionchange', this.selectChange);
        this.callParent();
    },
    expendSampleType: function () {
        var applicationID = this.up('samplebackcountry').applicationID;
        console.log(applicationID);
        var store = this.down('#sampleType').getStore();
        store.getProxy().setExtraParam('applicationID', applicationID);
        store.load();
    },
    selectChange: function (selModel, records) {
        if (records.length != 0) {
            this.down('#deleteSample').setDisabled(false);
        } else {
            this.down('#deleteSample').setDisabled(true);
        }
    },
    listeners: {
        validateedit: function (editor, e) {
            var cellEditor = editor.getEditor(e.record, e.column);
            cellEditor.revertInvalid = false;
        }
    }
});