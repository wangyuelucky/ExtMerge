Ext.define("Soims.view.application.common.B2BasicInfoPanel", {
    extend: 'Ext.form.Panel',
    alias: 'widget.b2basicinfopanel',
    title: '大洋课题基本信息',
    padding: 2,
    defaults: {
        bodyStyle: 'background-color:#dfe8f5;'
    },
    autoShow: true,
    initComponent: function () {
        var me = this;
        var subjectStore = Ext.create('Soims.store.application.new.Subject');
        var voyageStore = Ext.create('Soims.store.application.new.Voyage');
        this.items = {
            xtype: 'panel',
            autoHeight: true,
            layout: 'column',
            items: [
        {
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
                xtype: 'combobox',
                itemId: 'subject',
                name: 'topicName',
                fieldLabel: '课题名称',
                store: subjectStore,
                queryMode: 'local',
                displayField: 'topicName',
                valueField: 'id',
                editable: false,        
                readOnly: this.isShow == true ? true : false
            }, {
                fieldLabel: '负责人姓名',
                xtype: 'textfield',
                itemId: 'subjectchargerName',
                name: 'topicChargerName'
            }, {
                fieldLabel: '通讯地址',
                xtype: 'textfield',
                itemId: 'subjectaddress',
                name: 'topicAddress'
            }, {
                fieldLabel: '联系电话',
                xtype: 'textfield',
                itemId: 'subjectcellphone',
                name: 'topicCellphone'
            }, {
                fieldLabel: '手机',
                xtype: 'textfield',
                itemId: 'subjecttelphone',
                name: 'topicTelphone'
            }, {
                xtype: 'textfield',
                name: 'projectName',
                itemId: 'project',
                fieldLabel: '项目名称',
                margin :'20 0 5 0' 
               
            }, {
                fieldLabel: '负责人姓名',
                xtype: 'textfield',
                itemId: 'projectchargerName',
                name: 'projectChargerName'
            }, {
                fieldLabel: '通讯地址',
                xtype: 'textfield',
                itemId: 'projectaddress',
                name: 'projectAddress'
            }, {
                fieldLabel: '联系电话',
                xtype: 'textfield',
                itemId: 'projectcellphone',
                name: 'projectCellphone'
            }, {
                fieldLabel: '手机',
                xtype: 'textfield',
                itemId: 'projecttelphone',
                name: 'projectTelphone'               
//            }, {              
//                xtype: 'combobox',
//                itemId: 'voyage',
//                name: 'voyage',
//                fieldLabel: '所在航次',
//                store: voyageStore,
//                queryMode: 'local',
//                displayField: 'name',
//                valueField: 'id',
//                margin :'20 0 5 0' ,
//                readOnly: false,
//                hidden: this.hideVoyage
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
             
                fieldLabel: '课题编号',
                xtype: 'textfield',
                itemId: 'subjectnumber',
                name: 'topicNumber'
                
            }, {
                fieldLabel: '所在单位',
                xtype: 'textfield',
                itemId: 'subjectdepartment',
                name: 'topicDepartment'
            }, {
                fieldLabel: '邮政编码',
                xtype: 'textfield',
                itemId: 'subjectzipCode',
                name: 'topicZipCode'
            }, {
                fieldLabel: '传真',
                xtype: 'textfield',
                itemId: 'subjectfax',
                name: 'topicFax'
            }, {
                fieldLabel: '邮箱',
                xtype: 'textfield',
                itemId: 'subjectemail',
                name: 'topicEmail'
            },{
                fieldLabel: '项目编号',
                xtype: 'textfield',
                name: 'projectNumber',
                itemId: 'projectnumber',
                margin :'20 0 5 0' 
            }, {
                fieldLabel: '所在单位',
                xtype: 'textfield',
                itemId: 'projectdepartment',
                name: 'projectDepartment'
            }, {
                fieldLabel: '邮政编码',
                xtype: 'textfield',
                itemId: 'projectzipCode',
                name: 'projectZipCode'
            }, {
                fieldLabel: '传真',
                xtype: 'textfield',
                itemId: 'projectfax',
                name: 'projectFax'
            }, {
                fieldLabel: '邮箱',
                xtype: 'textfield',
                itemId: 'projectemail',
                name: 'projectEmail'
           
            }]
        }]
        };
        this.callParent();
    },
    searchSubject:function (combobox, opts) {
        var store = combobox.getStore();
        var panel = this.up('#applicationCommonB2BasicInfoPanel');
        if (panel.isShow != true) {
            store.load();
            store.on({
                load: function () {
                    //console.log(panel);
                    if (store.getCount() != 0) {
                        panel.down('#subject').select(store.getAt(0));
                        
                    }
                    else {
                        Ext.MessageBox.alert('提示', '不存在可用于申请样品的航次任务，如有疑问请联系系统工作人员，谢谢！', function () {
                            panel.up('tabpanel').close();
                        }, this);
                    }
                }
            });
        }
    }
});