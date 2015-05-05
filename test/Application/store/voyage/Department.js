Ext.define("Soims.store.voyage.Department", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.voyage.Department',
    proxy: {
        type: 'ajax',
        url: Soims.service.departments.DepartmentService + '/Search',
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