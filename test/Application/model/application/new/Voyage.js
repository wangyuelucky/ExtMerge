Ext.define("Soims.model.application.new.Voyage", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'name', type: 'string', mapping: 'Name' },
    { name: 'number', type: 'string', mapping: 'Number' },
    { name: 'chargerName', type: 'string', mapping: 'ChargerName' },
    { name: 'chargerId', type: 'int', mapping: 'ChargerId' },
    { name: 'organizationId', type: 'int', mapping: 'OrganizationId' },
    { name: 'organizationName', type: 'string', mapping: 'OrganizationName' },
    { name: 'organizationDepartId', type: 'int', mapping: 'OrganizationDepartId' },
    { name: 'organizationDepartName', type: 'string', mapping: 'OrganizationDepartName' },
    { name: 'startTime', type: 'date', mapping: 'StartTime' },
    { name: 'endTime', type: 'date', mapping: 'EndTime' }
    ]
});