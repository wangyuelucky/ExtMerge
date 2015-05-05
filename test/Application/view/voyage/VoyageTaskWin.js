Ext.define("Soims.view.voyage.VoyageTaskWin", {
    extend: 'Ext.window.Window',
    alias: 'widget.voyagetaskwin',
    closable: true,
    resizable: false,
    modal: true,
    title: '航次任务',
    width: 500,
    height: 300,
    requires: ['Soims.view.voyage.VoyageTask'],
    autoShow: true,
    initComponent: function () {
        this.items = [{
            xtype: 'voyagetask',
            voyageId: this.voyageId
        }];
        this.buttons = [{
            text: '确定',
            xtype: 'button',
            itemId: 'determine'
        }, {
            text: '取消',
            xtype: 'button',
            itemId: 'cancel'
        }];
        this.callParent();
    }
});