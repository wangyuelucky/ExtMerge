Ext.define("Soims.model.application.show.B1Detail", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'voyageID', type: 'int', mapping: 'VoyageID' },
    { name: 'voyage', type: 'string', mapping: 'Voyage' },
    { name: 'voyageTaskID', type: 'int', mapping: 'VoyageTaskID' },
    { name: 'voyageTask', type: 'string', mapping: 'VoyageTaskName' },
    { name: 'chargerID', type: 'int', mapping: 'ChargerID' },
    { name: 'chargerName', type: 'string', mapping: 'ChargerName' },
    { name: 'address', type: 'string', mapping: 'ChargerAddress' },
    { name: 'cellphone', type: 'string', mapping: 'ChargerTellPhone' },
    { name: 'telphone', type: 'string', mapping: 'ChargerCellPhone' },
    { name: 'legs', type: 'string', mapping: 'VoyageTaskLegNames' },
    { name: 'department', type: 'string', mapping: 'ChargerUnitName' },
    { name: 'zipCode', type: 'string', mapping: 'ChargerZipCode' },
    { name: 'fax', type: 'string', mapping: 'ChargerFax' },
    { name: 'email', type: 'string', mapping: 'ChargerEmail' },
    { name: 'usingNecessity', type: 'string', mapping: 'UsingNecessity' },
    { name: 'repatriaionNecessity', type: 'string', mapping: 'RepatriaionNecessity' },
    { name: 'commitResultTime', type: 'date', mapping: 'CommitResultTime' },
    { name: 'commitResultForm', type: 'string', mapping: 'CommitResultForm' },
    { name: 'commitResultAmount', type: 'string', mapping: 'CommitResultAmount' }
    ]
});