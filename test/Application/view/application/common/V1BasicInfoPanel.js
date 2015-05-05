Ext.define("Soims.view.application.common.V1BasicInfoPanel", {
    itemId: 'applicationCommonV1BasicInfoPanel',
    extend: 'Ext.form.Panel',
    alias: 'widget.v1basicinfopanel',
    title: '承担任务信息',
    padding: 2,
    defaults: {
        bodyStyle: 'background-color:#dfe8f5;'
    },
    autoShow: true,
    initComponent: function () {
        var me = this;
        var reportStore = Ext.create('Soims.store.application.new.Report');
        var divisionStore = Ext.create('Soims.store.application.new.Division');
        this.items = {
            xtype: 'panel',
            autoHeight: true,
            items: [
            {
                xtype: 'combobox',
                itemId: 'report',
                name: 'report',
                labelWidth: 100,
                width: 300,
                editable: false,
                fieldLabel: '航次报告名称',
                padding: '10 0 0 25',
                store: reportStore,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                editable:false,
                readOnly: this.isShow == true ? true : false,
                listeners: {
                    beforerender: me.searchReport,
                    select: function (combobox, records, eOpts) {

                        me.loadRecord(records[0]);
                        var panel = this.up('#applicationCommonV1BasicInfoPanel');
                        var store = panel.down('#division').getStore();
                        var reportid = this.getValue();
                        if (reportid) {
                            store.getProxy().setExtraParam('reportID', reportid);
                            store.load();
                            store.on({
                                load: function () {
                                    if (store.getCount() != 0) {
                                        panel.down('#division').select(store.getAt(0));
                                    }
                                }
                            });
                        }
                        else {
                            Ext.Tools.Msg('请先选择航次报告！', 9);
                        }
                    }
                }
            }, {
                xtype: 'fieldset',
                //                border: 0,
                itemId: 'reportInfoForm',
                name: 'reportInfoForm',
                collapsible: false,
                layout: 'column',
                frame: true,
                style: 'background-color: #dfe8f5;',
                margin: '10 10 10 10',
                items: [{

                    columnWidth: .5, //第一列  
                    padding: 5,
                    border: false,
                    bodyStyle: { background: 'transparent' },
                    defaults: {
                        labelWidth: 100,
                        width: 300,
                        readOnly: true
                    },
                    items: [{
                        fieldLabel: '航次报告编写牵头负责人',
                        xtype: 'textfield',
                        name: 'reportChargerName'
                    }, {
                        fieldLabel: '通讯地址',
                        xtype: 'textfield',
                        name: 'reportAddress'
                    }, {
                        fieldLabel: '联系电话',
                        xtype: 'textfield',
                        name: 'reportCellphone'
                    }, {
                        fieldLabel: '手机',
                        xtype: 'textfield',
                        name: 'reportTelphone'
                    }]
                }, {
                    columnWidth: .5, //第二列
                    padding: 5,
                    border: false,
                    bodyStyle: { background: 'transparent' },
                    defaults: {
                        labelWidth: 100,
                        width: 300,
                        readOnly: true
                    },
                    items: [{
                        fieldLabel: '所在单位',
                        xtype: 'textfield',
                        name: 'reportDepartment'
                    }, {
                        fieldLabel: '邮政编码',
                        xtype: 'textfield',
                        name: 'reportZipCode'
                    }, {
                        fieldLabel: '传真',
                        xtype: 'textfield',
                        name: 'reportFax'
                    }, {
                        fieldLabel: '邮箱',
                        xtype: 'textfield',
                        name: 'reportEmail'
                    }]
                }]
            }, {
                xtype: 'combobox',
                itemId: 'division',
                name: 'division',
                editable: false,
                fieldLabel: '分工负责学科、调查区域',
                store: divisionStore,
                labelWidth: 100,
                width: 300,
                padding: '10 0 0 25',
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                readOnly: this.isShow == true ? true : false,
                listeners: {
                    select: function (combobox, records, eOpts) {
                        me.loadRecord(records[0]);
                    }
                }
            }, {
                xtype: 'fieldset',
                itemId: 'divisionInfoForm',
                name: 'divisionInfoForm',
                //                border: 0,
                collapsible: false,
                frame: true,
                style: 'background-color: #dfe8f5;',
                layout: 'column',
                margin: '10 10 10 10',
                items: [{
                    columnWidth: .5, //第一列  
                    padding: 5,
                    border: false,
                    bodyStyle: { background: 'transparent' },
                    defaults: {
                        labelWidth: 100,
                        width: 300,
                        readOnly: true
                    },
                    items: [{
                        fieldLabel: '航次报告编写分工负责人',
                        xtype: 'textfield',
                        name: 'divisionChargerName'
                    }, {
                        fieldLabel: '通讯地址',
                        xtype: 'textfield',
                        name: 'divisionAddress'
                    }, {
                        fieldLabel: '联系电话',
                        xtype: 'textfield',
                        name: 'divisionCellphone'
                    }, {
                        fieldLabel: '手机',
                        xtype: 'textfield',
                        name: 'devisionTelphone'
                    }]
                }, {
                    columnWidth: .5, //第二列
                    padding: 5,
                    border: false,
                    bodyStyle: { background: 'transparent' },
                    defaults: {
                        labelWidth: 100,
                        width: 300,
                        readOnly: true
                    },
                    items: [{

                        fieldLabel: '所在单位',
                        xtype: 'textfield',
                        name: 'divisionDepartment'
                    }, {
                        fieldLabel: '邮政编码',
                        xtype: 'textfield',
                        name: 'divisionZipCode'
                    }, {
                        fieldLabel: '传真',
                        xtype: 'textfield',
                        name: 'divisionFax'
                    }, {
                        fieldLabel: '邮箱',
                        xtype: 'textfield',
                        name: 'divisionEmail'
                    }]
                }]
            }]
        };
        this.callParent();
    },
    searchReport: function (combobox, opts) {
        var store = combobox.getStore();
        var panel = this.up('#applicationCommonV1BasicInfoPanel');
        
        var basicpanel = this.up('#applicationNewV1BasicInfo');
        
        if (basicpanel.isEdit == true||basicpanel.isShow==true) { return; }
        store.load();
        store.on({
            load: function () {
                //console.log(panel);
                if (store.getCount() != 0) {
                    panel.down('#report').select(store.getAt(0));
                    panel.down('textfield[name=reportChargerName]').setValue(store.getAt(0).get('reportChargerName'));
                    panel.down('textfield[name=reportAddress]').setValue(store.getAt(0).get('reportAddress'));
                    panel.down('textfield[name=reportCellphone]').setValue(store.getAt(0).get('reportCellphone'));
                    panel.down('textfield[name=reportTelphone]').setValue(store.getAt(0).get('reportTelphone'));
                    panel.down('textfield[name=reportZipCode]').setValue(store.getAt(0).get('reportZipCode'));
                    panel.down('textfield[name=reportFax]').setValue(store.getAt(0).get('reportFax'));
                    panel.down('textfield[name=reportEmail]').setValue(store.getAt(0).get('reportEmail'));
                    panel.down('textfield[name=reportDepartment]').setValue(store.getAt(0).get('reportDepartment'));
                    panel.searchDivision(panel, store.getAt(0).get('id'));

                }
                else {
                    Ext.MessageBox.alert('提示', '不存在您负责的航次报告，如有疑问请联系系统工作人员，谢谢！', function () { }, this);
                }
            }
        });
    },
    searchDivision: function (panel, reportId) {
        var divisionStore = panel.down('#division').getStore();
        divisionStore.getProxy().setExtraParam('reportID', reportId);
        divisionStore.load(function () {
            panel.down('#division').select(divisionStore.getAt(0));
            console.log(panel.down('#division'));
            panel.down('textfield[name=divisionChargerName]').setValue(divisionStore.getAt(0).get('divisionChargerName'));
            panel.down('textfield[name=divisionAddress]').setValue(divisionStore.getAt(0).get('divisionAddress'));
            panel.down('textfield[name=divisionCellphone]').setValue(divisionStore.getAt(0).get('divisionCellphone'));
            panel.down('textfield[name=devisionTelphone]').setValue(divisionStore.getAt(0).get('divisionTelphone'));
            panel.down('textfield[name=divisionZipCode]').setValue(divisionStore.getAt(0).get('divisionZipCode'));
            panel.down('textfield[name=divisionDepartment]').setValue(divisionStore.getAt(0).get('divisionDepartment'));
            panel.down('textfield[name=divisionFax]').setValue(divisionStore.getAt(0).get('divisionFax'));
            panel.down('textfield[name=divisionEmail]').setValue(divisionStore.getAt(0).get('divisionEmail'));
        });

    }

});