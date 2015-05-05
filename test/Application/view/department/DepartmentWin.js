Ext.define("Soims.view.department.DepartmentWin", {
    extend: 'Ext.window.Window',
    alias: 'widget.departmentWin',
    title: '单位信息',
    iconCls: 'Group',
    resizable: false,
    modal: true,
    width: 300,
    closable: true,
    iconCls: '  ',
    requires: ['Soims.view.department.DepartmentPanel'],
    items: [{ xtype: 'departmentPanel' }],
    autoShow: true,
    initComponent: function () {
        this.buttons = [{
            text: '保存',
            xtype: 'button',
            iconCls: 'Disk',
            itemId: 'save'
        }, {
            text: '取消',
            xtype: 'button',
            iconCls: 'Cancel',
            itemId: 'cancel'
        }];
        this.callParent();
    }
});