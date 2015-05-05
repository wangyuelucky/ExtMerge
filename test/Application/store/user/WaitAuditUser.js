Ext.define("Soims.store.user.WaitAuditUser", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.user.WaitAuditUser',
    proxy: {
        type: 'ajax',
        url: Soims.service.users.PersonService + '/Query',
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