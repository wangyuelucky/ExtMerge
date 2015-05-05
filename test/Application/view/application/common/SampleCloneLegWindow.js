Ext.define("Soims.view.application.common.SampleCloneLegWindow", {
    extend: 'Ext.window.Window',
    alias: 'widget.sampleclonelegwindow',
    requires: ['Soims.store.application.common.Leg'],
    title: '选择航段',
    //padding: '2 30 2 30',
    width: 500,
    height: 100,
    deferredRender: false,
    frame: true,
    layout: 'column',
    buttonAlign: 'right',
    iconCls: 'icon-change-password',
    resizable: false,
    modal: true,
    initComponent: function () {
        var store = Ext.create('Soims.store.application.common.Leg');
        var store2 = Ext.create('Soims.store.application.common.Leg');
        this.leg = '';
        this.legID = '';
        this.selectSample;
        this.items = [{
            columnWidth: .5, //第一列  
            layout: 'form',
            bodyStyle: 'background-color: #dfe8f5;',
            border: 0,
            items: {
                xtype: 'combobox',
                name: 'fromleg',
                itemId: 'fromleg',
                emptyText: '请选择航段',
                labelWidth: 20,
                margin: '5 30 2 30',
                width: 330,
                store: store,
                fieldLabel: '从',
                queryMode: 'local',
                displayField: 'leg',
                allowBlank: false,
                forceSelection: true,
                valueField: 'id',
                editable: false,
                listeners: {
                    select: function (combobox, records, eOpts) {
                        var value = combobox.getValue();
                        var toCombo = combobox.up('window').down('combobox[itemId=toleg]');
                        var toStore = toCombo.getStore();
                        var applicationID = combobox.up('window').grid.applicationID;
                        toStore.getProxy().setExtraParam('applicationID', applicationID);
                        toCombo.clearValue();
                        toStore.load(function () {
                            toStore.removeAt(toStore.find('id', value));
                        });
                    }
                }
            }
        }, {
            columnWidth: .5, //第一列  
            layout: 'form',
            bodyStyle: 'background-color: #dfe8f5;',
            border: 0,
            items: {
                xtype: 'combobox',
                name: 'toleg',
                itemId: 'toleg',
                emptyText: '请选择航段',
                labelWidth: 60,
                margin: '5 30 2 30',
                width: 330,
                store: store2,
                fieldLabel: '克隆到',
                queryMode: 'local',
                displayField: 'leg',
                allowBlank: false,
                forceSelection: true,
                valueField: 'id',
                editable: false
            }
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