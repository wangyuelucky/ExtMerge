Ext.define("Soims.store.project.User", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.project.User',
    proxy: {
        type: 'ajax',
        url: Soims.service.users.UserService + '/Search',
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