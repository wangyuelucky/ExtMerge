Ext.define("Soims.store.application.common.SampleSiteUser", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.common.BoardingUser',
    proxy: {
        type: 'ajax',
        url: Soims.service.applications.BoardingUserService + '/Query',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }
});