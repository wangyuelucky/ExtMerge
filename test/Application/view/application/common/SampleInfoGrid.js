Ext.define("Soims.view.application.common.SampleInfoGrid", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sampleinfogrid',
    title: '样品列表',
    store: 'application.common.AddSample',
    selType: 'rowmodel',
    emptyText: '没有满足条件的样品',
    initComponent: function () {
        this.columns = [
            {
                header: '样品类型',
                dataIndex: 'sampleType',
                flex: 1
            }, {
                header: '使用目的',
                dataIndex: 'usePurpose',
                flex: 1
            }, {
                header: '涉及学科',
                dataIndex: 'involvedSubject',
                flex: 1
            }, {
                header: '采样区域',
                dataIndex: 'samplingArea',
                flex: 1
            }, {
                header: '制样方案',
                dataIndex: 'samplePreparation',
                flex: 1
            }, {
                header: '站位数',
                dataIndex: 'stationDigit',
                flex: 1
            }];
        this.callParent();
    }
});
