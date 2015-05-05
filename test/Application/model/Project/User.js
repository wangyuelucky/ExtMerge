Ext.define("Soims.model.project.User", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'name', type: 'string', mapping: 'Name' },
    { name: 'departmentName', type: 'string', mapping: 'Department' },
    { name: 'address', type: 'string', mapping: 'Address' },
    { name: 'cellphone', type: 'string', mapping: 'Cellphone' },
    { name: 'telphone', type: 'string', mapping: 'Telphone' },
    { name: 'email', type: 'string', mapping: 'Email' },
    { name: 'zipCode', type: 'string', mapping: 'ZipCode' },
    { name: 'fax', type: 'string', mapping: 'Fax' }
    ]
});