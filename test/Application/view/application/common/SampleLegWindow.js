Ext.define("Soims.view.application.common.SampleLegWindow", {
    extend: 'Ext.window.Window',
    alias: 'widget.samplelegwindow',
    requires: ['Soims.store.application.common.Leg'],
    title: '选择航段',
    //padding: '2 30 2 30',
    width: 400,
    height: 100,
    deferredRender: false,
    frame: true,
    //    layout: 'form',
    buttonAlign: 'right',
    iconCls: 'icon-change-password',
    resizable: false,
    modal: true,
    initComponent: function () {
        this.leg = '';
        this.legID = '';
        this.panel;
        var store = Ext.create('Soims.store.application.common.Leg');
        this.items = [{
            xtype: 'combobox',
            name: 'sampleleg',
            itemId: 'sampleleg',
            emptyText: '请选择航段', 
            labelWidth: 130,
            margin: '5 30 2 30',
            width: 330,
            store: store,
            fieldLabel: '拟申请样品所在航段',
            queryMode: 'local',
            displayField: 'leg',
            valueField: 'id',
            forceSelection: true,
            editable: false
//            tpl: Ext.create('Ext.XTemplate',
//             '<tpl for=".">',
//                  '<div class="x-boundlist-item">{legName} - {voyageName}</div>',
//              '</tpl>'
//            ),
//            displayTpl: Ext.create('Ext.XTemplate',
//              '<tpl for=".">',
//                  '{legName}',
//              '</tpl>'
//            )
        }];
        this.buttons = [{
            text: '确定',
            xtype: 'button',
            itemId: 'LegSave',
            action: 'LegSave'
        }, {
            text: '取消',
            xtype: 'button',
            itemId: 'LegCancel',
            action: 'LegCancel'
        }];
        this.callParent();
    }

});