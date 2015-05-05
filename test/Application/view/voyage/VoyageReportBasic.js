Ext.define("Soims.view.voyage.VoyageReportBasic", {
    extend: 'Ext.form.Panel',
    alias: 'widget.voyagereportbasic',
    requires: ['Soims.store.project.User', 'Ext.ux.form.SearchComboBox'],
    title: '航次报告基本信息',
    bodyStyle: 'background-color: #dfe8f5;',
    layout: 'column',
    autoShow: true,
    initComponent: function () {
        var store = Ext.create('Soims.store.project.User');
        this.items = [{
            xtype: 'textfield',
            name: 'id',
            itemId: 'id',
            hidden: true
        }, {
            xtype: 'panel',
            border: false,
            margin: '5 5 5 5',
            layout: 'form',
            bodyStyle: 'background-color: #dfe8f5;',
            columnWidth: 0.4,
            items: [{
                xtype: 'textfield',
                name: 'name',
                allowBlank: false,
                readOnly: this.isShow,
                forbidBlankAndShowStar: true,
                itemId: 'name',
                fieldLabel: '航次报告名称'
            }]
        }, {
            xtype: 'panel',
            border: false,
            layout: 'form',
            margin: '5 5 5 5',
            bodyStyle: 'background-color: #dfe8f5;',
            columnWidth: 0.4,
            items: [{
                xtype: 'searchcombo',
                name: 'chargerId',
                readOnly: this.isShow,
                showStar: true,
                itemId: 'chargerId',
                fieldLabel: '报告牵头负责人',
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
        }];
        this.callParent();
    }
});