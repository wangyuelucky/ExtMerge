Ext.define("Soims.store.message.AllMessageList", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.message.AllMessageList',
    autoLoad: true,
    pageSize: 30,
    proxy: {
        type: 'ajax',
        url: Soims.service.users.MessageService + '/GetMessages',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalRecords: 'Total',
            totalProperty: 'Total'
        }
    }
    
});