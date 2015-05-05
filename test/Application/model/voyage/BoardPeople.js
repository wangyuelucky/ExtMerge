Ext.define("Soims.model.voyage.BoardPeople", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'voyageId', type: 'int', mapping: 'VoyageId' },
    { name: 'name', type: 'string', mapping: 'Name' },
    { name: 'sex', type: 'string', mapping: 'Sex' },
    { name: 'adress', type: 'string', mapping: 'Address' },
    { name: 'nameSpell', type: 'string', mapping: 'NameSpell' },
    { name: 'userCompany', type: 'string', mapping: 'Department' },
    { name: 'userCompanyID', type: 'int', mapping: 'DepartmentID' },
    { name: 'birthday', type: 'string', mapping: 'Birthday' },
    { name: 'position', type: 'string', mapping: 'Position' },
    { name: 'duty', type: 'string', mapping: 'Duty' },
    { name: 'identityNumber', type: 'string', mapping: 'IdentityNumber' },
    { name: 'email', type: 'string', mapping: 'Email' },
    { name: 'address', type: 'string', mapping: 'Address' },
    { name: 'tellPhone', type: 'string', mapping: 'TelPhone' },
    { name: 'cellPhone', type: 'string', mapping: 'CellPhone' }
    ]
});