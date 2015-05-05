Ext.define("Soims.store.application.common.ElectronicDocument", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.common.ElectronicDocument',
    proxy: {
        type: 'ajax',
        url: Soims.service.applications.ElectronicDocument + '/Query',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }
});