Ext.define("Soims.view.notification.SendNotificationBasic", {
    extend: 'Ext.form.Panel',
    alias: 'widget.sendnotificationbasic',
    requires: ['Soims.store.notification.State', 'Soims.store.voyage.Voyage', 'Soims.store.user.Role'],
    title: '发布公告',
    //width: 400,
    autoShow: true,
    initComponent: function () {
        var store = Ext.create('Soims.store.notification.State');
        var voyageStore = Ext.create('Soims.store.voyage.Voyage');
        var roleStore = Ext.create('Soims.store.user.Role');
        this.items = [{
            xtype: 'textfield',
            name: 'id',
            itemId: 'id',
            hidden: true
        }, {
            xtype: 'textfield',
            width: 450,
            name: 'title',
            itemId: 'title',
            readOnly: this.isShow,
            fieldLabel: '标题'
        }, {
            xtype: 'combobox',
            itemId: 'state',
            name: 'state',
            fieldLabel: '状态',
            store: store,
            queryMode: 'local',
            displayField: 'state',
            disabled: this.isShow,
            valueField: 'id'

        }, {
//            xtype: 'fieldset',
//            autoHeight: true,
            items: [{
                xtype: 'radiogroup',
                fieldLabel: '是否发送邮件',
                id: 'sendEmailRadioGroup',
                itemId: 'sendEmailRadioGroup',
                hidden: this.isShow,
                items: [{
                    boxLabel: '是',
                    name: 'email',
                    inputValue: 'yes'
//                    checked: true
                    
                }, {
                    boxLabel: '否',
                    name: 'email',
                    inputValue: 'no'
                }],
                listeners: {
                    change: {
                        fn: function (view, newValue, oldValue) {
//                                                        var o = Ext.getCmp('sendEmailRadioGroup');
//                                                        console.log(o.getValue());
                            //                            console.log(newValue);

                            if (newValue.email == 'no') {
                                Ext.getCmp('name').setDisabled(true);
                                Ext.getCmp('sendEmailCheckboxGroup').setDisabled(true);

                            }
                            else {
                                Ext.getCmp('name').setDisabled(false);
                                Ext.getCmp('sendEmailCheckboxGroup').setDisabled(false);
                            }

                        }
                    }
                }
            }, {
                xtype: 'combobox',
                itemId: 'name',
                name: 'name',
                fieldLabel: '邮件发送航次',
                store: voyageStore,
                displayField: 'name',
                id: 'name',
                hidden:this.isShow,
                valueField: 'id'
            }, {
                
                xtype: "checkboxgroup",
                fieldLabel: "邮件发送角色",
                id: 'sendEmailCheckboxGroup',
                itemId: 'sendEmailCheckboxGroup',
                columns: 2,
                hidden:this.isShow,
                items: [
                { boxLabel: "航次首席科学家", name: "rolename", inputValue: "VS" },
                { boxLabel: "航段首席科学家", name: "rolename", inputValue: "LS" },
                { boxLabel: "项目负责人", name: "rolename", inputValue: "PC" },
                { boxLabel: "课题负责人", name: "rolename", inputValue: "TC" }
                ]
      
                
//                xtype: 'combobox',
//                itemId: 'rolename',
//                name: 'rolename',
//                fieldLabel: '邮件发送角色',
//                store: roleStore,
//                displayField: 'rolename',
//                id: 'rolename',
//                disabled: false,
//                valueField: 'id'
            }]


            //        }, {
            //            itemId: 'uploadFilefield',
            //            padding: 2,
            //            xtype: 'filefield',
            //            name: 'fileName',
            //            fieldLabel: '相关资料上传',           
            //            msgTarget: 'side',
            //            anchor: '100%',
            //            buttonText: '选择文件'
        }, {
            xtype: 'htmleditor',
            name: 'content',
            itemId: 'content',
            readOnly: this.isShow,
            fieldLabel: '内容'

        }];
        this.callParent();
    }
});