Ext.define("Soims.view.applicationDiscussion.AllocationInfor", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.allocationinfor',
    title: '分配信息列表',
    iconCls: 'ApplicationViewColumns',
    selType: 'rowmodel',
    plugins: [{ ptype: 'cellediting', clicksToEdit: 2}],
    viewConfig: { emptyText: '没有满足条件的分配信息' },
    minHeight: 200,
    initComponent: function () {
        this.store = Ext.create('Soims.store.applicationDiscussion.AllocationInfor');
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
               header: '本任务既往使用样品情况',
               dataIndex: 'taskPreviousUsage',
               flex: 1
           }, {
               header: '申请人既往样品使用情况',
               dataIndex: 'supplierPreviousUsage',
               flex: 1
           }, {
               header: '分配建议',
               dataIndex: 'suggestion',
               flex: 1,
               editor: (!this.isShow && !this.isDiscussion) ? {
                   xtype: 'textfield'
               } : null
           }, {
               header: '取用次序',
               dataIndex: 'order',
               hidden: this.type == 'B1' || this.type == 'B2' ? false : true,
               flex: 1
           }];
        this.callParent();
    }
});