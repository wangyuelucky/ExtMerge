Ext.define("Soims.view.voyage.EditVoyageReport", {
    extend: 'Ext.form.Panel',
    alias: 'widget.editvoyagereport',
    title: '航次报告',
    buttonAlign: 'center',
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
            text: '上一步',
            xtype: 'button',
            itemId: 'back'
        }, {
            text: '保存',
            xtype: 'button',
            hidden: this.isShow,
            disabled: this.voyageId == undefined ? true : false,
            itemId: 'save'
        }, {
            text: '完成',
            xtype: 'button',
            hidden: this.isShow,
            disabled: this.voyageId == undefined ? true : false,
            itemId: 'complete'
        }];
        this.callParent();
    },
    lock: function () {
        this.down('#complete').setDisabled(true);
        this.down('#save').setDisabled(true);
    },
    unlock: function () {
        this.down('#complete').setDisabled(false);
        this.down('#save').setDisabled(false);
    }
});