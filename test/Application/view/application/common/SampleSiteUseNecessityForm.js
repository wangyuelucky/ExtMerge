Ext.define("Soims.view.application.common.SampleSiteUseNecessityForm", {
    extend: 'Ext.form.Panel',
    alias: 'widget.samplesiteusenecessityform',
    bodyPadding: 2,
    title: '样品现场使用必要性说明',
    initComponent: function () {
        this.items = [{
        xtype: 'textareafield',
        grow      : true,
        itemId    : 'sampleSiteUseNecessityTextArea',
        width     : 600,
        height    : 150,
        readOnly  : this.isShow
    }];
        this.callParent();
    }
});