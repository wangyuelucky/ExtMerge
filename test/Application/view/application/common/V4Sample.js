Ext.define("Soims.view.application.common.V4Sample", {
    itemId: 'applicationCommonV4Sample',
    extend: 'Ext.form.Panel',
    requires: ['Ext.ux.form.TreeField'],
    alias: 'widget.v4sample',
    title: '拟申请样品信息',
    padding: 2,
    AutoScroll: true,
    overflowY: 'auto',
    autoShow: true,
    autoHeight: true,
    style: 'background-color: #dfe8f5;',

    initComponent: function () {
        var me = this;
        this.deleteid = '';
        var treeStore = Ext.create('Soims.store.tree.Tree');
        this.store = Ext.create('Soims.store.application.common.Sample');
        if (this.isDiscussion) {
            this.store.getProxy().setExtraParam('applicationID', this.applicationID);
            this.store.load();
        }
        var usePurposeStore = Ext.create('Soims.store.tree.UsePurpose');
        this.borrowStore = Ext.create('Soims.store.application.common.BorrowOrUse');
        this.columns = [
                    { xtype: 'rownumberer' },
            {
                header: 'ID',
                dataIndex: 'id',
                hidden: true
            }, {
                header: '样品类型',
                dataIndex: 'sampleTypeID',
                flex: 1,
                editor: {
                    xtype: 'treefield',
                    disabled: this.isShow,
                    singleChecked: true,
                    pickerTitle: '选择样品类型',
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
                            return record.get('sampleType');
                        }
                    }
                }
            }, {
                header: '使用/借用',
                dataIndex: 'borrowOrUser',
                flex: 1,
                editor: {
                    xtype: 'combobox',
                    store: this.borrowStore,
                    disabled: this.isShow,
                    queryMode: 'local',
                    editable: false,
                    displayField: 'name',
                    valueField: 'name',
                    allowBlank: false
                }
            }, {
                header: '样品量',
                dataIndex: 'sampleTotalNumber',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    disabled: this.isShow,
                    allowBlank: false
                }
            }, {
                header: '申请样品用途及目的',
                dataIndex: 'usePurposeID',
                flex: 1,
                editor: {
                    xtype: 'treefield',
                    disabled: this.isShow,
                    pickerTitle: '选择使用目的',
                    store: usePurposeStore
                },
                renderer: function (value, metaData, record) {
                    if (value) {
                        console.log(value);
                        console.log(record);
                        var arrValue = value.split(','),
                            flg = true,
                            display = '';

                        Ext.Array.each(arrValue, function (v) {
                            if (v !== '') {
                                var arrOther = v.split('|');
                                //                                console.log(arrOther);
                                var model = usePurposeStore.getNodeById(arrOther[0]);
                                var t = document.getElementById('textBox' + arrOther[0]);

                                console.log(model);
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
                            return record.get('usePurpose');
                        }
                    }
                }
            }];
        //            collapsible: true,
        //    animCollapse: false,

        var tbar = {
            hidden: this.isShow,
            items: [{
                text: '添加',
                xtype: 'button',
                itemId: 'addSample',
                iconCls: 'Add'
            }, {
                text: '删除',
                itemId: 'deleteSample',
                xtype: 'button',
                disabled: true,
                iconCls: 'Delete'
            }]
        };
        this.items = [{
            xtype: 'gridpanel',
            title: '样品列表',
            alias: 'widget.v4samplegrid',
            itemId: 'applicationCommonV4SampleGrid',
            store: this.store,
            columns: this.columns,
            selType: 'rowmodel',
            emptyText: '没有满足条件的样品',
            height: 200,
            style: 'background-color: #dfe8f5;',
            plugins: [{ ptype: 'cellediting', clicksToEdit: 1}],
            tbar: tbar,
            listeners: {
                selectionchange: function (selModel, records) {
                    if (records.length != 0) {
                        this.down('#deleteSample').setDisabled(false);
                    } else {
                        this.down('#deleteSample').setDisabled(true);
                    }
                }
            }
        }, {
            xtype: 'fieldset',
            title: '基本信息',
            hidden: this.isDiscussion,
            collapsible: false,
            frame: true,
            style: 'background-color: #dfe8f5;',
            layout: 'column',
            padding: '10 10 10 10',
            height: 85,
            items: [{
                columnWidth: .4, //第一列  
                layout: 'column',
                bodyStyle: 'background-color: #dfe8f5;',
                border: 0,
                items: {
                    xtype: 'datefield',
                    name: 'activityStartTime', // 很重要，用来赋值
                    itemId: 'activityStartTime',
                    fieldLabel: '样品借用开始时间',
                    readOnly: this.isShow
                    //                    labelWidth: 130,
                    //                    width: 330
                }
            }, {
                columnWidth: .4, //第一列  
                layout: 'column',
                bodyStyle: 'background-color: #dfe8f5;',
                border: 0,
                items: {
                    xtype: 'datefield',
                    itemId: 'activityEndTime',
                    name: 'activityEndTime', // 很重要，用来赋值
                    fieldLabel: '结束时间',
                    readOnly: this.isShow
                    //                    labelWidth: 90,
                    //                    width: 290
                }
            }]
        }];
        this.callParent();
    }



});