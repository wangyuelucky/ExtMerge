Ext.define("Soims.store.voyage.BoardPeople", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.voyage.BoardPeople',
    proxy: {
        type: 'ajax',
        url: Soims.service.applications.BoardingUserService + '/QueryByVoyageId',
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