Ext.define("Soims.view.department.DepartmentPanel", {
    extend: 'Ext.form.Panel',
    alias: 'widget.departmentPanel',
    requires: ['Soims.store.department.DepartmentType', 'Soims.store.tree.SampingMethod', 'Ext.ux.form.InputField'],
    autoShow: true,
    margin: '10 10 10 10',
    layout: 'form',
    //style: 'margin-left: 20px;',
    bodyStyle: 'background-color: #dfe8f5;',
    initComponent: function () {

        var store = Ext.create('Soims.store.department.DepartmentType');
        var treeStore = Ext.create('Soims.store.tree.SampingMethod');
        //treeStore.getProxy().setExtraParam('legId', '82');

        this.items = [{
            xtype: 'textfield',
            name: 'id',
            hidden: true
        }, {
            xtype: 'textfield',
            name: 'name',
            margin: '10 10 10 10',
            itemId: 'name',
            blankText: '单位名称不能为空',
            forbidBlankAndShowStar: true,
            fieldLabel: '单位名称'
        }, {
            xtype: 'textfield',
            name: 'address',
            margin: '10 10 10 10',
            forbidBlankAndShowStar: true,
            itemId: 'address',
            fieldLabel: '单位地址'
        }, {
            xtype: 'combobox',
            itemId: 'type',
            name: 'type',
            margin: '10 10 10 10',
            //margin: '10 10 10 10',
            fieldLabel: '单位类型',
            //forceSelection: true,
            editable: false,
            forbidBlankAndShowStar: true,
            store: store,
            queryMode: 'local',
            displayField: 'type',
            valueField: 'id'
        }, {
            xtype: 'inputfield',
            name: 'test',
            itemId: 'test',
            //loadOnce: true,
            //singleChecked: true,
            //onlyCheckChild: true,
            hidden: true,
            fieldLabel: '样品类型',
            store: treeStore
        }];
        this.callParent();
    }
});