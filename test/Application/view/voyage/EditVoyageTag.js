Ext.define("Soims.view.voyage.EditVoyageTag", {
    extend: 'Ext.tab.Panel',
    alias: 'widget.editvoyagetag',
    title: '航次任务样品申请',
    closable: true,
    iconCls: 'Project',
    requires: ['Soims.view.voyage.EditVoyageLeg', 'Soims.view.voyage.EditVoyageTask', 'Soims.view.voyage.EditVoyageReport', 'Soims.view.voyage.BoardPeoplePanel'],
    initComponent: function () {
        this.items = [{
            xtype: 'editvoyageleg',
            isShow: this.isShow,
            voyageId: this.voyageId
        }, {
            xtype: 'editvoyagetask',
            isShow: this.isShow,
            voyageId: this.voyageId
        }, {
            xtype: 'editvoyagereport',
            isShow: this.isShow,
            voyageId: this.voyageId
        }, {
            xtype: 'boardpeoplepanel',
            isShow: this.isShow,
            voyageId: this.voyageId
        }];
        this.callParent();
    }
});