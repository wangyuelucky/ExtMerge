Ext.define("Soims.store.applicationDiscussion.SampleInfor", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.applicationDiscussion.SampleInfor',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: Soims.service.samples.SampleService + '/Query',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }
});