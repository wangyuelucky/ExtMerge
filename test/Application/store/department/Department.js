Ext.define("Soims.store.department.Department", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.department.Department',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: Soims.service.departments.DepartmentService + '/Query',
        reader: {
            type: 'xml',
            root: 'List',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }
});
