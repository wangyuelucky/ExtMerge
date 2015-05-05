Ext.define("Soims.view.application.common.SampleBackCountryNecessityForm", {
    extend: 'Ext.form.Panel',
    alias: 'widget.samplebackcountrynecessityform',
    bodyPadding: 2,
    title: '样品先行运送回国必要性说明',

    initComponent: function () {
        this.items = [{
            xtype: 'textareafield',
            grow: true,
            itemId: 'sampleBackCountryNecessityTextArea',
            width: 600,
            height: 150,
            readOnly: this.isShow
        }];
        this.callParent();
    }
});