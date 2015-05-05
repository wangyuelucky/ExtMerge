Ext.define("Soims.view.application.common.SampleSiteUse", {
    itemId: 'applicationCommonSampleSiteUse',
    extend: 'Ext.form.Panel',
    alias: 'widget.samplesiteuse',
    requires: ['Soims.view.application.common.BoardingUserGrid', 'Soims.view.application.common.SampleSiteUseNecessityForm'],
    padding: 2,
    title: '样品现场使用信息',
    //width: 400,
    autoShow: true,
    initComponent: function () {
        this.items = [{
            xtype: 'boardinguser',
            applicationID: this.applicationID,
            isShow: this.isShow
        }, {
            xtype: 'samplesiteusenecessityform',
            applicationID: this.applicationID,
            margin: '3 0 0 0',
            isShow: this.isShow
        }];
        this.callParent();
    }
});