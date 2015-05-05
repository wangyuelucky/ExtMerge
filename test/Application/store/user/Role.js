Ext.define("Soims.store.user.Role", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.user.Role',
    proxy: {
        type: 'ajax',
        url: Soims.service.users.RoleService + '/Query',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalRecords: 'Total',
            totalProperty: 'Total'
        }
    }
    //autoLoad: true
});