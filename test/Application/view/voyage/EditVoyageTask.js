Ext.define("Soims.view.voyage.EditVoyageTask", {
    extend: 'Ext.form.Panel',
    alias: 'widget.editvoyagetask',
    title: '航次任务',
    buttonAlign: 'center',
    requires: ['Soims.view.voyage.VoyageTask'],
    autoShow: true,
    initComponent: function () {
        this.items = [{
            xtype: 'voyagetask',
            voyageId: this.voyageId,
            isShow: this.isShow
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
            text: '下一步',
            xtype: 'button',
            itemId: 'next'
        }];
        this.callParent();
    },
    lock: function () {
        this.down('#save').setDisabled(true);
    },
    unlock: function () {
        this.down('#save').setDisabled(false);
    }
});