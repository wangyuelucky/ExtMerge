Ext.define('Soims.model.mainFrame.RoleMenu', {
    extend: 'Ext.data.Model',
    // We put 'config' as well as 'id' and 'text', so that
    // we can switch specific menu option or menuitem option
    fields: ['id', 'text', 'code', 'iconCls', 'checked', 'config']
});