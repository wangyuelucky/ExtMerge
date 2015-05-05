Ext.define("Soims.model.user.User", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'name', type: 'string', mapping: 'Name' },
    { name: 'telphone', type: 'string', mapping: 'Telphone' },
    { name: 'email', type: 'string', mapping: 'Email' },
    { name: 'department', type: 'int', mapping: 'Department' },
    { name: 'departmentName', type: 'string', mapping: 'DepartmentName' },
    { name: 'roleIds', type: 'string', mapping: 'RoleIds' },
    { name: 'roles', type: 'string', mapping: 'Roles' }
    ]
});