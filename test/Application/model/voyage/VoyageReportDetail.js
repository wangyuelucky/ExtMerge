Ext.define("Soims.model.voyage.VoyageReportDetail", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'chargerId', type: 'int', mapping: 'ChargerId' },
    { name: 'chargerName', type: 'string', mapping: 'ChargerName' },
    { name: 'discipline', type: 'string', mapping: 'Discipline' }
    ]
});