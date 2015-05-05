Ext.define("Soims.view.voyage.BoardPeopleWin", {
    extend: 'Ext.window.Window',
    alias: 'widget.boardpeoplewin',
    closable: true,
    resizable: false,
    modal: true,
    title: '上船人员',
    width: 600,
    height: 300,
    //requires: ['Soims.view.voyage.VoyageReportBasic', 'Soims.view.voyage.VoyageReportDetail'],
    autoShow: true,
    initComponent: function () {
        var states = Ext.create('Ext.data.Store', {
            fields: ['name'],
            data: [{ "name": "男" },
                   { "name": "女"}]
        });
        var store = Ext.create('Soims.store.department.Department');
        this.items = [{
            xtype: 'form',
            border: false,
            layout: 'column',
            margin: '10 10 10 10',
            bodyStyle: 'background-color: #dfe8f5;',
            items: [{
                xtype: 'panel',
                border: false,
                //layout: 'column',
                columnWidth: 0.5,
                margin: '10 10 10 10',
                bodyStyle: 'background-color: #dfe8f5;',
                items: [{
                    xtype: 'textfield',
                    name: 'id',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    margin: '5 5 5 5',
                    fieldLabel: '姓 名'
                }, {
                    xtype: 'textfield',
                    name: 'nameSpell',
                    margin: '5 5 5 5',
                    fieldLabel: '姓名全拼'
                }, {
                    xtype: 'combobox',
                    name: 'userCompanyID',
                    store: store,
                    editable: false,
                    displayField: 'name',
                    margin: '5 5 5 5',
                    valueField: 'id',
                    allowBlank: false,
                    emptyText: '请选择您的单位',
                    fieldLabel: '单 位'
                }, {
                    xtype: 'textfield',
                    name: 'address',
                    margin: '5 5 5 5',
                    fieldLabel: '住  址'
                }, {
                    xtype: 'textfield',
                    name: 'tellPhone',
                    margin: '5 5 5 5',
                    fieldLabel: '联系电话'
                }, {
                    xtype: 'textfield',
                    name: 'cellPhone',
                    margin: '5 5 5 5',
                    fieldLabel: '移动电话'
                }]
            }, {
                xtype: 'panel',
                border: false,
                //layout: 'column',
                columnWidth: 0.5,
                margin: '10 10 10 10',
                bodyStyle: 'background-color: #dfe8f5;',
                items: [{
                    xtype: 'combo',
                    name: 'sex',
                    queryMode: 'local',
                    valueField: 'name',
                    store: states,
                    margin: '5 5 5 5',
                    emptyText: '请选择您的性别',
                    fieldLabel: '性别',
                    displayField: 'name'
                }, {
                    xtype: 'datefield',
                    name: 'birthday',
                    margin: '5 5 5 5',
                    fieldLabel: '出生日期'
                }, {
                    xtype: 'textfield',
                    name: 'identityNumber',
                    margin: '5 5 5 5',
                    fieldLabel: '身份证号'
                }, {
                    xtype: 'textfield',
                    name: 'email',
                    margin: '5 5 5 5',
                    fieldLabel: '邮箱'
                }, {
                    xtype: 'textfield',
                    name: 'position',
                    margin: '5 5 5 5',
                    fieldLabel: '职务'
                }, {
                    xtype: 'textfield',
                    name: 'duty',
                    margin: '5 5 5 5',
                    fieldLabel: '岗位职责'
                }]
            }]
        }];
        this.buttons = [{
            text: '保存',
            xtype: 'button',
            //hidden: this.isShow,
            itemId: 'save'
        }, {
            text: '取消',
            xtype: 'button',
            //hidden: this.isShow,
            itemId: 'cancel'
        }];
        this.callParent();
    }
});