Ext.define("Soims.view.application.common.BoardingUserGrid", {
    itemId: 'applicationCommonBoardingUserGrid',
    extend: 'Ext.grid.Panel',
    alias: 'widget.boardinguser',
    requires: ['Ext.ux.form.SearchComboBox'],
    title: '样品现场使用人',
    //store: 'application.common.BoardingUser',
    selType: 'rowmodel',
    emptyText: '没有满足条件的人员',
    height: 200,
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    initComponent: function () {
        var me = this;
        console.log(this.applicationID);
        this.store = Ext.create('Soims.store.application.common.SampleSiteUser');
        if (this.applicationID != undefined) {
            this.store.getProxy().setExtraParam('applicationID', this.applicationID);
            this.store.load();
        }
        var boardingUserStore = Ext.create('Soims.store.application.common.BoardingUser');
        var legStore = Ext.create('Soims.store.application.common.SampleLeg');
        this.columns = [
            { xtype: 'rownumberer' },
            {
                header: 'ID',
                dataIndex: 'id',
                hidden: true
            }, {
                header: '<span>姓名<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
                dataIndex: 'name',
                flex: 1,
                editor: this.isShow == true ? null : {
                    itemId: 'boardingUserName',
                    xtype: 'searchcombo',
                    store: boardingUserStore,
                    valueField: 'name',
                    forbidBlankAndShowStar: true,
                    allowBlank: false,
                    enableKeyEvents: true, 
                    //disabled: this.isShow == true ? true : false,
                    //hideTrigger: true,
                    tpl: Ext.create('Ext.XTemplate',
                     '<tpl for=".">',
                          '<div class="x-boundlist-item">{name} - {department}</div>',
                      '</tpl>'
                    ),
                    displayTpl: Ext.create('Ext.XTemplate',
                      '<tpl for=".">',
                          '{name}',
                      '</tpl>'
                    ),
                    listeners: {
                        keyup: function (text, the, eOpts) {
                            //console.log("Hello");
                            me.searchBoardingUserName(text);
                        }
                    }
                }
            }, {
                header: '所在单位',
                dataIndex: 'department',
                flex: 1
            }, {
                header: '手机',
                dataIndex: 'cellphone',
                flex: 1
            }, {
                header: '联系电话',
                dataIndex: 'telphone',
                flex: 1
            }, {
                header: '<span>拟参加航段<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
                dataIndex: 'legs',
                flex: 1,
                editor: {
                    xtype: 'combobox',
                    itemId: 'legs',
                    forbidBlankAndShowStar: true,
                    multiSelect: true,
                    store: legStore,
                    displayField: 'leg',
                    queryMode: 'local',
                    valueField: 'leg',
                    disabled: this.isShow == true ? true : false,
                    editable: false,
                    listeners: {
                        expand: function (text, the, eOpts) {
                            me.expendLegs();
                        }
                    }
                }
            }];


        this.tbar = {
            hidden: this.isShow,
            items: [{
                text: '添加',
                xtype: 'button',
                itemId: 'addSiteUser',
                iconCls: 'Add'
            }, {
                text: '删除',
                itemId: 'deleteSiteUser',
                xtype: 'button',
                disabled: true,
                iconCls: 'Delete'
            }]
        };
        this.on('selectionchange', this.selectChange);
        this.callParent();
    },
    selectChange: function (selModel, records) {
        if (records.length != 0) {
            this.down('#deleteSiteUser').setDisabled(false);
        } else {
            this.down('#deleteSiteUser').setDisabled(true);
        }
    },
    expendLegs: function () {

        var store = this.down('#legs').getStore();
        store.getProxy().setExtraParam('applicationID', this.up('samplesiteuse').applicationID);
        store.load();
    },
    searchBoardingUserName: function (text) {
        var value = text.getValue();
        var voyageID = this.up('samplesiteuse').voyageID;
        var combo = this.down('#boardingUserName');
        combo.getStore().getProxy().setExtraParam('value', value);
        combo.getStore().getProxy().setExtraParam('voyageID', voyageID);
        combo.getStore().getProxy().setExtraParam('applicationID', this.up('samplesiteuse').applicationID);
    },
    listeners: {
        validateedit: function (editor, e) {
            var cellEditor = editor.getEditor(e.record, e.column);
            cellEditor.revertInvalid = false;
        }
    }
});