Ext.define("Soims.store.applicationAuditing.Audit", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.applicationAuditing.Audit',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: Soims.service.ApplicationAuditings.AuditService + '/GetAudit',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    },
    /** 自定义事件，设置额外参数
    *  params为JSON格式，如{ID:'3', Name: 'wy'}
    */
    setExtraParams: function (params) {
        for (var par in params) {
            if(params.hasOwnProperty(par)){
                this.getProxy().setExtraParam(par, params[par]);
            }
        }
    }

});