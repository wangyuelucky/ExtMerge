Ext.define("Soims.model.user.WaitAuditUser", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'name', type: 'string', mapping: 'Name' },
    { name: 'nameSpell', type: 'string', mapping: 'NameSpell' },
    { name: 'email', type: 'string', mapping: 'Email' },
    { name: 'department', type: 'string', mapping: 'Department' },
    { name: 'departmentID', type: 'int', mapping: 'DepartmentID' },
    { name: 'remark', type: 'string', mapping: 'Remark' }
    ]
});