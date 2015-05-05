Ext.define("Soims.model.project.Project", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'name', type: 'string', mapping: 'Name' },
    { name: 'number', type: 'string', mapping: 'Number' },
    { name: 'managerName', type: 'string', mapping: 'ManagerName' },
    { name: 'managerId', type: 'int', mapping: 'ManagerId' }
    ]
});