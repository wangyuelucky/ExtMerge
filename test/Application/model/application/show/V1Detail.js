Ext.define("Soims.model.application.show.V1Detail", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'divisionID', type: 'string', mapping: 'DivisionID' },
    { name: 'divisionName', type: 'string', mapping: 'DivisionName' },
    { name: 'divisionNumber', type: 'string', mapping: 'DivisionNumber' },
    { name: 'reportID', type: 'string', mapping: 'ReportID' },
    { name: 'reportName', type: 'string', mapping: 'ReportName' },
    { name: 'reportNumber', type: 'string', mapping: 'ReportNumber' },

    { name: 'divisionChargerName', type: 'string', mapping: 'DivisionChargerName' },
    { name: 'divisionAddress', type: 'string', mapping: 'DivisionChargerAddress' },
    { name: 'divisionCellphone', type: 'string', mapping: 'DivisionChargerTellPhone' },
    { name: 'divisionTelphone', type: 'string', mapping: 'DivisionChargerCellPhone' },
    { name: 'divisionDepartment', type: 'string', mapping: 'DivisionChargerUnitName' },
    { name: 'divisionZipCode', type: 'string', mapping: 'DivisionChargerZipCode' },
    { name: 'divisionFax', type: 'string', mapping: 'DivisionChargerFax' },
    { name: 'divisionEmail', type: 'string', mapping: 'DivisionChargerEmail' },

    { name: 'reportChargerName', type: 'string', mapping: 'ReportChargerName' },
    { name: 'reportAddress', type: 'string', mapping: 'ReportChargerAddress' },
    { name: 'reportCellphone', type: 'string', mapping: 'ReportChargerTellPhone' },
    { name: 'reportTelphone', type: 'string', mapping: 'ReportChargerCellPhone' },
    { name: 'reportDepartment', type: 'string', mapping: 'ReportChargerUnitName' },
    { name: 'reportZipCode', type: 'string', mapping: 'ReportChargerZipCode' },
    { name: 'reportFax', type: 'string', mapping: 'ReportChargerFax' },
    { name: 'reportEmail', type: 'string', mapping: 'ReportChargerEmail' },

    { name: 'commitResultTime', type: 'date', mapping: 'CommitResultTime' },
    { name: 'commitResultForm', type: 'string', mapping: 'CommitResultForm' },
    { name: 'commitResultAmount', type: 'string', mapping: 'CommitResultAmount' }
    ]
});