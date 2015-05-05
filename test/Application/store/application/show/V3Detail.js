Ext.define("Soims.store.application.show.V3Detail", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.show.V3Detail',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: Soims.service.applications.ApplicationsService + '/GetV3ApplicationByID',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }

});