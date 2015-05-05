Ext.define("Soims.view.applicationDiscussion.SampleInfor", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sampleinfor',
    title: '样品信息列表',
    iconCls: 'ApplicationViewColumns',
    viewConfig: { emptyText: '没有满足条件的样品信息' },
    minHeight: 200,
    selType: 'rowmodel',
    initComponent: function () {
        this.store = Ext.create('Soims.store.applicationDiscussion.SampleInfor');
        this.store.getProxy().setExtraParam('applicationID', this.applicationID);
        this.store.load();
        this.columns = [
           {
               header: 'id',
               dataIndex: 'id',
               flex: 1,
               hidden: true
           }, {
               header: '样品类型',
               dataIndex: 'sampleType',
               flex: 1
           }, {
               header: '使用目的',
               dataIndex: 'usePurpose',
               flex: 1
           }, {
               header: '分析测试指标',
               dataIndex: 'testProject',
               flex: 1
           }, {
               header: '采样区域',
               dataIndex: 'sampleArea',
               flex: 1
           }, {
               header: '站位数',
               dataIndex: 'stationDigit',
               flex: 1
           }, {
               header: '站位样品数',
               dataIndex: 'stationNumber',
               flex: 1
           }, {
               header: '样品总件数',
               dataIndex: 'totalNumber',
               flex: 1
           }, {
               header: '单件样品量',
               dataIndex: 'oneSampleAmount',
               flex: 1
           }];
        this.callParent();
    }
});