Ext.define("Soims.model.application.new.Division", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'name', type: 'string', mapping: 'Discipline' },
    { name: 'divisionChargerName', type: 'string', mapping: 'ChargerName' },
    { name: 'divisionChargerID', type: 'string', mapping: 'ChargerId' },
    { name: 'divisionAddress', type: 'string', mapping: 'DetailAddress' },
    { name: 'divisionCellphone', type: 'string', mapping: 'DetailCellphone' },
    { name: 'divisionTelphone', type: 'string', mapping: 'DetailTelphone' },
    { name: 'divisionZipCode', type: 'string', mapping: 'DetailZipCode' },
    { name: 'divisionFax', type: 'string', mapping: 'DetailFax' },
    { name: 'divisionEmail', type: 'string', mapping: 'DetailEmail' },
    { name: 'divisionDepartment', type: 'string', mapping: 'DetailDepartment' }    
    ]
});