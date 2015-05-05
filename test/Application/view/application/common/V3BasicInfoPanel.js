Ext.define("Soims.view.application.common.V3BasicInfoPanel", {
    itemId: 'applicationCommonV3BasicInfoPanel',
    extend: 'Ext.form.Panel',
    alias: 'widget.v3basicinfopanel',
    title: '承担任务信息',
    padding: 2,
    defaults: {
        bodyStyle: 'background-color:#dfe8f5;'
    },
    autoShow: true,
    initComponent: function () {
        var me = this;
        console.log(this.isShow);
        var topicStore = Ext.create('Soims.store.application.new.NoOceanTopic');
        this.items = {
            xtype: 'panel',
            autoHeight: true,
            items: [{
                xtype: 'fieldset',
                collapsible: false,
                frame: true,
                style: 'background-color: #dfe8f5;',
                margin: '10 10 10 10',
                items: [{
                    margin: '10 0',
                    xtype: 'combobox',
                    itemId: 'noOceanTopic',
                    name: 'noOceanTopic',
                    labelWidth: 150,
                    width: 400,
                    fieldLabel: '非大洋课题名称',
                    store: topicStore,
                    displayField: 'topicName',
                    valueField: 'topicID',
                    readOnly: this.isShow == true ? true : false,
                    allowBlank: false
                }, {
                        fieldLabel: '课题编号',
                        labelWidth: 150,
                        width: 400,
                        xtype: 'textfield',
                        name: 'topicNumber',
                        itemId: 'topicNumber',
                        allowBlank: false
                    }, {
                        fieldLabel: '课题来源与下达部门',
                        xtype: 'textfield',
                        labelWidth: 150,
                        width: 500,
                        name: 'topicSource',
                        itemId: 'topicSource',
                        allowBlank: false
                }]  
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
                        fieldLabel: '非大洋课题负责人',
                        xtype: 'textfield',
                        name: 'chargerName'
                    }, {
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
                    }, {
                        fieldLabel: '邮箱',
                        xtype: 'textfield',
                        name: 'email'
                    }]
                }]
            }]
        };
        this.callParent();
    }
});