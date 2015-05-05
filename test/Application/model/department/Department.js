Ext.define("Soims.model.department.Department", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'name', type: 'string', mapping: 'Name' },
    { name: 'address', type: 'string', mapping: 'Address' },
    { name: 'type', type: 'string', mapping: 'Type' },
    { name: 'test', type: 'string', mapping: 'Test' }
    ]
});