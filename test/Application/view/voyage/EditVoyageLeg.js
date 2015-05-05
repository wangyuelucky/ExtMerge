Ext.define("Soims.view.voyage.EditVoyageLeg", {
    extend: 'Ext.form.Panel',
    alias: 'widget.editvoyageleg',
    title: '航次航段',
    buttonAlign: 'center',
    requires: ['Soims.view.voyage.VoyageBasic', 'Soims.view.voyage.LegGrid'],
    autoShow: true,
    initComponent: function () {
        this.items = [{
            xtype: 'voyagebasic',
            voyageId: this.voyageId,
            isShow: this.isShow
        }, {
            xtype: 'leggrid',
            voyageId: this.voyageId,
            isShow: this.isShow
        }];
        this.buttons = [{
            text: '保存',
            xtype: 'button',
            hidden: this.isShow,
            itemId: 'save'
        },{
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
