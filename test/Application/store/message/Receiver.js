Ext.define("Soims.store.message.Receiver", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.message.Receiver',
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