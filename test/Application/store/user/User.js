Ext.define("Soims.store.user.User", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.user.User',
    proxy: {
        type: 'ajax',
        url: Soims.service.users.UserService + '/Query',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalRecords: 'Total',
            totalProperty: 'Total'
        }
    },
    autoLoad: true
});