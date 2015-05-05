Ext.define("Soims.view.application.common.V4BasicInfoPanel", {
    itemId: 'applicationCommonV4BasicInfoPanel',
    extend: 'Ext.form.Panel',
    alias: 'widget.v4basicinfopanel',
    title: '公益事业信息',
    padding: 2,
    defaults: {
        bodyStyle: 'background-color:#dfe8f5;'
    },
    autoShow: true,
    initComponent: function () {
        var me = this;
        var activityStore = Ext.create('Soims.store.application.new.Activity');
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
                    itemId: 'activity',
                    name: 'activity',
                    labelWidth: 150,
                    width: 400,
                    fieldLabel: '项目/活动名称',
                    store: activityStore,
                    displayField: 'activityName',
                    forbidBlankAndShowStar: true,
                    valueField: 'activityID',
                    readOnly: this.isShow == true ? true : false,
                    allowBlank: false
                }, {
                    fieldLabel: '活动举办地',
                    labelWidth: 150,
                    width: 400,
                    xtype: 'textfield',
                    name: 'activityPlace',
                    itemId: 'activityPlace',
                    forbidBlankAndShowStar: true,
                    readOnly: this.isShow,
                    allowBlank: false
                }, {
                    fieldLabel: '课题来源与下达部门',
                    xtype: 'textfield',
                    labelWidth: 150,
                    width: 500,
                    readOnly: this.isShow,
                    name: 'activityDepartment',
                    itemId: 'activityDepartment',
                    forbidBlankAndShowStar: true,
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
                        fieldLabel: '负责人',
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