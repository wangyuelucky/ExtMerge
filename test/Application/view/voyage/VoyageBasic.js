Ext.define("Soims.view.voyage.VoyageBasic", {
    extend: 'Ext.form.Panel',
    alias: 'widget.voyagebasic',
    requires: ['Soims.store.project.User', 'Soims.store.voyage.Department', 'Ext.ux.form.SearchComboBox'],
    title: '航次基本信息',
    bodyStyle: 'background-color: #dfe8f5;',
    layout: 'column',
    autoShow: true,
    initComponent: function () {
        var store = Ext.create('Soims.store.project.User');
        var deStore = Ext.create('Soims.store.voyage.Department');
        this.items = [{
            xtype: 'textfield',
            name: 'id',
            itemId: 'id',
            hidden: true
        }, {
            xtype: 'panel',
            border: false,
            padding: '10 0 10 10',
            layout: 'form',
            bodyStyle: 'background-color: #dfe8f5;',
            columnWidth: 0.3,
            items: [{
                xtype: 'textfield',
                name: 'name',
                forbidBlankAndShowStar: true,
                readOnly: this.isShow,
                itemId: 'name',
                fieldLabel: '航次名称'
            }, {
                xtype: 'textfield',
                name: 'number',
                itemId: 'number',
                forbidBlankAndShowStar: true,
                regex: Soims.component.voyageBasicStartTimeHidden == true ? undefined : /DY(\d*)-\d\d$/,
                regexText: '请输入正确格式，例如：DY125-05',
                readOnly: this.isShow,
                allowBlank: false,
                fieldLabel: '航次代码'
            }, {
                xtype: 'searchcombo',
                name: 'chargerId',
                itemId: 'chargerId',
                showStar: true,
                fieldLabel: '航次首席科学家',
                readOnly: this.isShow,
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
        }, {
            xtype: 'panel',
            border: false,
            layout: 'form',
            padding: '10 0 10 10',
            bodyStyle: 'background-color: #dfe8f5;',
            columnWidth: 0.3,
            items: [{
                xtype: 'searchcombo',
                name: 'organizationDepartId',
                readOnly: this.isShow,
                showStar: true,
                itemId: 'organizationDepartId',
                readOnly: this.isShow,
                fieldLabel: '实施单位',
                store: deStore,
                valueField: 'id',
                displayField: 'name'
            }, {
                xtype: 'datefield',
                name: 'beginTime',
                itemId: 'beginTime',
                forbidBlankAndShowStar: true,
                fieldLabel: '开始时间',
                format: 'Y-m-d',
                readOnly: this.isShow,
                allowBlank: false,
                listeners: {
                    change: function (view, newValue, oldValue) {
                        var stop = view.up('panel').down('#stopTime');
                        stop.setMinValue(newValue);
                    }
                }
            }, {
                xtype: 'datefield',
                name: 'stopTime',
                itemId: 'stopTime',
                forbidBlankAndShowStar: true,
                fieldLabel: '结束时间',
                format: 'Y-m-d',
                readOnly: this.isShow,
                allowBlank: false,
                listeners: {
                    change: function (view, newValue, oldValue) {
                        var begin = view.up('panel').down('#beginTime');
                        begin.setMaxValue(newValue);
                    }
                }
            }]
        }, {
            xtype: 'panel',
            border: false,
            layout: 'form',
            padding: '10 0 10 10',
            bodyStyle: 'background-color: #dfe8f5;',
            columnWidth: 0.3,
            items: [{
                xtype: 'searchcombo',
                name: 'organizationId',
                readOnly: this.isShow,
                showStar: true,
                itemId: 'organizationId',
                fieldLabel: '实施单位联系人',
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
            }, {
                xtype: 'datefield',
                name: 'startTime',
                itemId: 'startTime',
                forbidBlankAndShowStar: !Soims.component.voyageBasicStartTimeHidden,
                fieldLabel: '开放申请时间',
                format: 'Y-m-d',
                readOnly: this.isShow,
                hidden: Soims.component.voyageBasicStartTimeHidden,
                listeners: {
                    change: function (view, newValue, oldValue) {
                        var legStore = view.up('panel').up('panel').up('panel').down('leggrid').getStore();
                        var end = view.up('panel').down('#endTime');
                        end.setMinValue(newValue);
                        for (var i = 0; i < legStore.getCount(); i++) {
                            var rec = legStore.getAt(i);
                            rec.set('startApplyTime', newValue);
                        }
                    }
                }
            }, {
                xtype: 'datefield',
                name: 'endTime',
                itemId: 'endTime',
                forbidBlankAndShowStar: !Soims.component.voyageBasicStartTimeHidden,
                fieldLabel: '结束申请时间',
                format: 'Y-m-d',
                readOnly: this.isShow,
                hidden: Soims.component.voyageBasicEndTimeHidden,
                listeners: {
                    change: function (view, newValue, oldValue) {
                        var start = view.up('panel').down('#startTime');
                        start.setMaxValue(newValue);
                        var legStore = view.up('panel').up('panel').up('panel').down('leggrid').getStore();
                        for (var i = 0; i < legStore.getCount(); i++) {
                            var rec = legStore.getAt(i);
                            rec.set('endApplyTime', newValue);
                        }
                    }
                }
            }]
        }];

        this.callParent();
    }
});