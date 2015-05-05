Ext.define("Soims.model.user.Role", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'rolename', type: 'string', mapping: 'Name' },
    { name: 'code', type: 'string', mapping: 'Code' }
    ]
});