Ext.define("Soims.store.application.new.Report", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.new.Report',
    proxy: {
        type: 'ajax',
//        url: Soims.service.applications.VoyageReport + '/Query',
        url: '/Service/Applications/VoyageReport.asmx' + '/Query',        
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }
});