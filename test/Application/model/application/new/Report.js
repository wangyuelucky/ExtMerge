Ext.define("Soims.model.application.new.Report", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'name', type: 'string', mapping: 'Name' },
    { name: 'reportChargerName', type: 'string', mapping: 'ChargerName' },
    { name: 'chargerID', type: 'string', mapping: 'ChargerId' },
    { name: 'reportAddress', type: 'string', mapping: 'ReportAddress' },
    { name: 'reportCellphone', type: 'string', mapping: 'ReportCellphone' },
    { name: 'reportTelphone', type: 'string', mapping: 'ReportTelphone' },
    { name: 'reportZipCode', type: 'string', mapping: 'ReportZipCode' },
    { name: 'reportFax', type: 'string', mapping: 'ReportFax' },
    { name: 'reportEmail', type: 'string', mapping: 'ReportEmail' },
    { name: 'reportDepartment', type: 'string', mapping: 'ReportDepartment' }
    ]
});

