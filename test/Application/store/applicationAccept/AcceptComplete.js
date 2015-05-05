Ext.define("Soims.store.applicationAccept.AcceptComplete", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.applicationAccept.Accept',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: Soims.service.ApplicationAccepts.AcceptService + '/QueryAcceptCompleteByUser',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }

});