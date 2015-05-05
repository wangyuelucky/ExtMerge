Ext.define("Soims.view.application.common.SampleBackCountry", {
    //itemId: 'applicationCommoSampleBackCountry',
    extend: 'Ext.form.Panel',
    alias: 'widget.samplebackcountry',
    requires: ['Soims.view.application.common.SampleBackCountryNecessityForm', 'Soims.view.application.common.SampleBackCountryGrid', 'Soims.view.application.common.SampleBackCountryGridShow'],
    padding: 2,
    title: '样品回国信息',
    //width: 400,
    autoShow: true,
    initComponent: function () {
        
        if (this.isShow) {
            this.items = [{ xtype: 'samplebackcountrygridshow',
                applicationID: this.applicationID,
                isAudit: this.isAudit,
                isShow: this.isShow,
                panelType: this.panelType
            }];
        }
        else {
            this.items = [{ xtype: 'samplebackcountrygrid',
                applicationID: this.applicationID,
                isAudit: this.isAudit,
                isShow: this.isShow
            }, { xtype: 'samplebackcountrynecessityform',
                margin: '3 0 0 0',
                applicationID: this.applicationID,
                isAudit: this.isAudit,
                isShow: this.isShow
            }];
        }
        this.callParent();
    }
});