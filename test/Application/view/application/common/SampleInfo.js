Ext.define("Soims.view.application.common.SampleInfo", {
    itemId: 'applicationCommonSampleInfo',
    extend: 'Ext.form.Panel',
    alias: 'widget.sampleinfo',
    padding: 2,
    title: '拟申请样品信息',
    //width: 400,
    AutoScroll: true,
    overflowY: 'auto',
    autoShow: true,
    autoHeight: true,
    requires: ['Soims.view.application.Common.SampleGrid', 'Soims.view.application.Common.SampleGridShow'],

    initComponent: function () {
        
        if (this.isShow) {
            this.items = [{                
                xtype: 'samplegridshow',
                applicationID: this.applicationID,
                isShow: this.isShow,
                panelType: this.panelType,
                type: this.type
            }];
        }
        else {
            this.items = [{
                xtype: 'samplegrid',
                applicationID: this.applicationID,
                //            voyageID: this.voyageID,
                isShow: this.isShow,
                isAudit: this.isAudit,
                type: this.type
            }, {                
                xtype: 'testdatainfo',
                applicationID: this.applicationID,
                isShow: this.isShow,
                isAudit: this.isAudit,
                type: this.type
            }];
        }
        this.callParent();

    }
});