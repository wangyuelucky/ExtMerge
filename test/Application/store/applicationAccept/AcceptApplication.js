Ext.define("Soims.store.applicationAccept.AcceptApplication", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.Application',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: Soims.service.applications.ApplicationsService + '/QueryAcceptByUser',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }

});