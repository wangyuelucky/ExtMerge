Ext.define("Soims.store.applicationApproval.Approval", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.Application',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: Soims.service.applications.ApplicationsService + '/QueryApprovalByUser',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }
});