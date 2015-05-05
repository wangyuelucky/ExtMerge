Ext.define('Soims.store.mainFrame.RoleMenu', {
    extend: 'Ext.data.Store',
    model: 'Soims.model.mainFrame.RoleMenu',
    proxy: {
        type: 'ajax',
        url: Soims.service.users.RoleService + '/GetRole',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    autoLoad: true
});