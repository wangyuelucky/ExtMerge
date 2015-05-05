Ext.define("Soims.view.application.common.TestDataInfo", {
    extend: 'Ext.form.Panel',
    alias: 'widget.testdatainfo',
    requires: ['Soims.view.application.common.TestDataGrid'],
    title: '拟提交测试数据信息',
    padding: '2 2 2 2',
    frame: true,
    closable: false,
    collapsible: false,
    titleCollapse: false,
    hasChanged: false,
    autoHeight: true,
    initComponent: function () {

        this.items = [{            
            xtype: 'testdatagrid',
            type: this.type,
            isShow: this.isShow
         }, {
            xtype: 'fieldset',
            title: '拟提交成果信息',
            itemId:'testDataInfoForm',
            name:'testDataInfoForm',
            collapsible: false,
            hidden:true,
            frame: true,
            style: 'background-color: #dfe8f5;',
            layout: 'column',
            padding: '10 10 10 10',
            items: [{
                columnWidth: .5, //第一列  
                layout: 'form',
                bodyStyle: 'background-color: #dfe8f5;',
                border: 0,
                items: [{
                    xtype: 'textfield',
                    itemId: 'commitResultForm',
                    name:'commitResultForm',
                    fieldName: 'commitResultForm', // 很重要，用来赋值
                    fieldLabel: '拟提交研究成果形式',
                    tabIndex:1,
                    labelWidth: 130,
                    readOnly: this.isShow,
                    allowBlank: true,
                    width: 330                   
                }, {
                    fieldLabel: '拟提交研究成果时间',
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    tabIndex: 3,
                    readOnly: this.isShow,
                    name: 'commitResultTime',
                    itemId: 'commitResultTime',
                    labelWidth: 130,
                    allowBlank: true,
                    width: 330                 
                }]
            }, {
                columnWidth: .5, //第二列
                layout: 'form',
                border: false,
                style: 'margin-left: 20px;',
                bodyStyle: 'background-color: #dfe8f5;',
                items: [{
                      xtype: 'textfield',             
                    fieldName: 'commitResultAmount',
                    name:'commitResultAmount',
                    fieldLabel: '拟提交研究成果数量',
                    itemId: 'commitResultAmount',
                    tabIndex: 2,
                    readOnly: this.isShow,
                    allowBlank: true,
                    labelWidth: 130,
                    width: 330                               
                }]
             }]            
        }, {           
            xtype: 'hiddenfield',
            name: 'id'
        }];
        this.callParent();
    }
});