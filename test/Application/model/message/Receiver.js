Ext.define("Soims.model.message.Receiver", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'name', type: 'string', mapping: 'Name' },
    { name: 'departmentName', type: 'string', mapping: 'Department' }
    ]
});