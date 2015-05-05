Ext.define("Soims.store.applicationAuditing.AuditApplicationComplete", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.applicationAuditing.Audit',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: Soims.service.ApplicationAuditings.AuditService + '/QueryAuditCompleteByUser',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }

});