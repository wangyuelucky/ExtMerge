Ext.define("Soims.store.message.MessageList", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.message.MessageList',
    autoLoad: true,
    pageSize: 25,
    proxy: {
        type: 'ajax',
        url: Soims.service.users.MessageService + '/GetUnReadMessages',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalRecords: 'Total',
            totalProperty: 'Total'
        }
    }
    
});