Ext.define("Soims.view.voyage.VoyageReportWin", {
    extend: 'Ext.window.Window',
    alias: 'widget.voyagereportwin',
    closable: true,
    resizable: false,
    modal: true,
    title: '航次报告',
    width: 800,
    height: 400,
    requires: ['Soims.view.voyage.VoyageReportBasic', 'Soims.view.voyage.VoyageReportDetail'],
    autoShow: true,
    initComponent: function () {
        this.items = [{
            xtype: 'voyagereportbasic',
            isShow: this.isShow,
            voyageId: this.voyageId
        }, {
            xtype: 'voyagereportdetail',
            isShow: this.isShow,
            voyageId: this.voyageId
        }];
        this.buttons = [{
            text: '保存',
            xtype: 'button',
            hidden: this.isShow,
            itemId: 'save'
        }, {
            text: '取消',
            xtype: 'button',
            hidden: this.isShow,
            itemId: 'cancel'
        }];
        this.callParent();
    }
});
