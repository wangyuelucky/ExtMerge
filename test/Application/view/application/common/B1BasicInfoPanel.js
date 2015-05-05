Ext.define("Soims.view.application.common.B1BasicInfoPanel", {
    itemId: 'applicationCommonB1BasicInfoPanel',
    extend: 'Ext.form.Panel',
    alias: 'widget.b1basicinfopanel',
    title: '航次任务基本信息',
    padding: 2,
    defaults: {
        bodyStyle: 'background-color:#dfe8f5;'
    },
    autoShow: true,
    initComponent: function () {
        var me = this;
        var voyageStore = Ext.create('Soims.store.voyage.VoyageByTime');
        var chargeNameStore = Ext.create('Soims.store.project.User');
        var voyageTaskStore = Ext.create('Soims.store.application.new.VoyageTask');
        var legStore = Ext.create('Soims.store.application.common.VoyageTaskLeg');

        this.items = [{
            xtype: 'fieldset',
            title: '航次任务信息',
            autoHeight: true,
            layout: 'column',
            items:
            [{
                columnWidth: .5, //第一列  
                padding: 5,
                border: false,
                bodyStyle: { background: 'transparent' },
                defaults: {
                    labelWidth: 100,
                    width: 300
                },
                items: [
                {
                    xtype: 'combobox',
                    itemId: 'voyage',
                    name: 'voyage',
                    fieldLabel: '航次',
                    store: voyageStore,
                    forbidBlankAndShowStar: true,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    editable: false,
                    readOnly: this.isShow == true ? true : false,
                    listeners: {
                        select: function (combobox, record) {
                            this.voyage = combobox.getValue();
                            voyageTaskStore.getProxy().setExtraParam('voyageID', this.voyage);
                            legStore.getProxy().setExtraParam('voyageID', this.voyage);
                            combobox.up('b1basicinfopanel').down('#legs').clearValue();
                            combobox.up('b1basicinfopanel').down('#voyageTask').clearValue();
                        }
                    }

                }, {
                    fieldLabel: '航次任务名称',
                    xtype: 'combobox',
                    itemId: 'voyageTask',
                    name: 'voyageTask',
                    forbidBlankAndShowStar: true,
                    store: voyageTaskStore,
                    displayField: 'name',
                    valueField: 'id',
                    readOnly: this.isShow == true ? true : false,
                    listeners: {
                        expand: function (field, eOpts) {
                            me.expendVoyageTask();
                        },
                        select: function (combobox, records) {

                            combobox.up('b1basicinfopanel').down('#legs').setValue(records[0].get('legs'));
                        }
                    }
                }]
            }, {
                columnWidth: .5, //第二列  
                padding: 5,
                border: false,
                bodyStyle: { background: 'transparent' },
                defaults: {
                    labelWidth: 100,
                    width: 300
                },
                items: [
                {
                    fieldLabel: '负责人姓名',
                    itemId: 'chargerName',
                    xtype: 'searchcombo',
                    name: 'chargerID',
                    store: chargeNameStore,
                    readOnly: this.isShow,
                    valueField: 'id',
                    forbidBlankAndShowStar: true,
                    tpl: Ext.create('Ext.XTemplate',
                     '<tpl for=".">',
                          '<div class="x-boundlist-item">{name} - {departmentName}</div>',
                      '</tpl>'
                    ),
                    displayTpl: Ext.create('Ext.XTemplate',
                      '<tpl for=".">',
                          '{name}',
                      '</tpl>'
                    ),
                    listeners: {
                        select: function (searchcombo, record) {
                            this.userID = searchcombo.getValue();
                            voyageTaskStore.getProxy().setExtraParam('userID', this.userID);
                            searchcombo.up('b1basicinfopanel').down('#legs').clearValue();
                            searchcombo.up('b1basicinfopanel').down('#voyageTask').clearValue();
                            searchcombo.up('b1basicinfopanel').loadRecord(record[0]);
                        }
                    }
                }, {
                    fieldLabel: '航次任务所在航段',
                    itemId: 'legs',
                    xtype: 'combobox',
                    name: 'legs',
                    forbidBlankAndShowStar: true,
                    multiSelect: true,
                    store: legStore,
                    displayField: 'name',
                    queryMode: 'local',
                    valueField: 'name',
                    readOnly: this.isShow == true ? true : false,
                    editable: false,
                    listeners: {
                        expand: function (field, eOpts) {
                            me.expendLegs();
                        }
                    }
                }]
            }]
        }, {
            xtype: 'fieldset',
            title: '负责人详细信息',
            autoHeight: true,
            layout: 'column',
            items:
            [{
                columnWidth: .5, //第一列  
                padding: 5,
                border: false,
                bodyStyle: { background: 'transparent' },
                defaults: {
                    labelWidth: 100,
                    width: 300,
                    readOnly: true
                },
                items: [
            {
                fieldLabel: '通讯地址',
                xtype: 'textfield',
                name: 'address'
            }, {
                fieldLabel: '联系电话',
                xtype: 'textfield',
                name: 'cellphone'
            }, {
                fieldLabel: '手机',
                xtype: 'textfield',
                name: 'telphone'
            }, {
                fieldLabel: '邮箱',
                xtype: 'textfield',
                name: 'email'
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
                    name: 'department'
                }, {
                    fieldLabel: '邮政编码',
                    xtype: 'textfield',
                    name: 'zipCode'
                }, {
                    fieldLabel: '传真',
                    xtype: 'textfield',
                    name: 'fax'
                }]
            }]
        }];
        this.callParent();
    },
    expendVoyageTask: function (field, opts) {

        var store = this.down('#voyageTask').getStore();
        store.load();
    },
    expendLegs: function (field, opts) {
        var store = this.down('#legs').getStore();
        store.load();
    }
});