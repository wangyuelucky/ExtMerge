Ext.define("Soims.view.project.EditProjectBasic", {
    extend: 'Ext.form.Panel',
    alias: 'widget.editprojectbasic',
    requires: ['Soims.store.project.User', 'Ext.ux.form.SearchComboBox'],
    bodyStyle: 'background-color: #dfe8f5;',
    title: '项目基本信息',
    autoShow: true,
    initComponent: function () {
        var store = Ext.create('Soims.store.project.User');
        this.items = {
            xtype: 'panel',
            layout: 'form',
            border: false,
            width: 400,
            collapsible: false,
            bodyStyle: 'background-color: #dfe8f5;',
            margin: '10 10 10 10',
            items: [{
                xtype: 'textfield',
                itemId: 'id',
                padding: '5 5 5 5',
                name: 'id',
                hidden: true
            }, {
                xtype: 'textfield',
                name: 'name',
                padding: '5 5 5 5',
                readOnly: this.isShow,
                forbidBlankAndShowStar: true,
                itemId: 'name',
                fieldLabel: '项目名称'
            }, {
                xtype: 'textfield',
                name: 'number',
                padding: '5 5 5 5',
                itemId: 'number',
                readOnly: this.isShow,
                forbidBlankAndShowStar: true,
                fieldLabel: '项目编号'
            }, {
                xtype: 'searchcombo',
                name: 'managerId',
                readOnly: this.isShow,
                itemId: 'managerId',
                padding: '5 5 5 5',
                fieldLabel: '项目负责人',
                showStar: true,
                store: store,
                valueField: 'id',
                tpl: Ext.create('Ext.XTemplate',
             '<tpl for=".">',
                  '<div class="x-boundlist-item">{name} - {departmentName}</div>',
              '</tpl>'
            ),
                displayTpl: Ext.create('Ext.XTemplate',
              '<tpl for=".">',
                  '{name}',
              '</tpl>'
            )
            }]
        };
        this.callParent();
    }
});