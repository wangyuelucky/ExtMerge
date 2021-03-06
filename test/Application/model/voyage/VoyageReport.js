﻿Ext.define("Soims.model.voyage.VoyageReport", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'name', type: 'string', mapping: 'Name' },
    { name: 'chargerId', type: 'int', mapping: 'ChargerId' },
    { name: 'chargerName', type: 'string', mapping: 'ChargerName' }
    
    ]
});