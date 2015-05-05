Ext.define("Soims.model.application.common.BoardingUser", {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', mapping: 'ID' },
        { name: 'name', mapping: 'Name' },
        { name: 'department', mapping: 'Department' },
        { name: 'cellphone', mapping: 'CellPhone' },
        { name: 'telphone', mapping: 'TelPhone' },
        { name: 'legs', mapping: 'Legs' },
        { name: 'legIDs', mapping: 'LegIDs' },
        { name: 'userDetail', mapping: 'UserDetail' }
    ]
});