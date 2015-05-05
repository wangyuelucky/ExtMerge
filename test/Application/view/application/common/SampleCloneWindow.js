Ext.define("Soims.view.application.common.SampleCloneWindow", {
    extend: 'Ext.window.Window',
    alias: 'widget.sampleclonewindow',
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
        var store = Ext.create('Soims.store.application.common.Leg');
        this.leg = '';
        this.legID = '';
        this.selectSample;
        this.items = [{
            xtype: 'combobox',
            name: 'cloneleg',
            itemId: 'cloneleg',
            emptyText:'请选择航段', 
            labelWidth: 130,
            margin: '5 30 2 30',
            width: 330,
            store: store,
            fieldLabel: '拟申请样品克隆到',
            queryMode: 'local',
            displayField: 'leg',
            allowBlank: false,
            forceSelection: true,
            valueField: 'id',
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