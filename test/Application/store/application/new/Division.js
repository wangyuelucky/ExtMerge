Ext.define("Soims.store.application.new.Division", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.new.Division',
    proxy: {
        type: 'ajax',
//        url: Soims.service.applications.VoyageReportDivision + '/Query',
        url: '/Service/Applications/VoyageReportDivision.asmx' + '/Query',        
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }
});