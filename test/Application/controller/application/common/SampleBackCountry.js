Ext.define('Soims.controller.application.common.SampleBackCountry', {
    extend: 'Ext.app.Controller',
    //stores: ['application.common.SampleBackCountry'],
    views: ['application.common.SampleBackCountry', 'application.common.SampleBackCountryGrid', 'application.common.SampleBackCountryNecessityForm'],
    refs: [{
        ref: 'samplebackcountry',
        selector: 'samplebackcountry',
        autoCreate: true,
        xtype: 'samplebackcountry'
    }, {
        ref: 'sampleBackCountryGrid',
        selector: 'samplebackcountrygrid',
        autoCreate: true,
        xtype: 'samplebackcountrygrid'
    }, {
        ref: 'sampleBackCountryNecessityform',
        selector: 'samplebackcountrynecessityform',
        autoCreate: true,
        xtype: 'samplebackcountrynecessityform'
    }],
    init: function () {
        this.control({
            'samplebackcountrygrid combobox[itemId=sampleType]': {
                select: function (combo, records, eOpts) {
                    var record = combo.up('#applicationCommonSampleBackCountryGrid').getSelectionModel().getSelection()[0];
                    record.set('sampleLeg', records[0].get('legID'));
                    record.set('sampleID', records[0].get('id'));
                }
            },
            'samplebackcountrygrid button[itemId=addSample]': {
                click: function (button) {
                    var gridPanel = button.up('#applicationCommonSampleBackCountryGrid');
                    if (gridPanel.up('samplebackcountry').applicationID == undefined) {
                        Ext.MessageBox.alert('失败', '请先保存申请基本信息', function () {
                            var tabPanel = button.up('samplebackcountry').up('tabpanel');
                            tabPanel.setActiveTab(0);
                        }, this);
                        return;
                    }
                    var model = Ext.create('Soims.model.application.common.SampleBackCountry');
                    //model.set('');
                    gridPanel.getStore().insert(0, model);
                    gridPanel.getView().refresh();
                }
            },
            'samplebackcountrygrid button[itemId=deleteSample]': {
                click: function (button, e) {
                    Ext.MessageBox.confirm('确认', '确认删除此样品？点击保存按钮生效。',
                    function (btn) {
                        if (btn == 'yes') {
                            var gridPanel = button.up('#applicationCommonSampleBackCountryGrid');
                            var selectionModel = gridPanel.getSelectionModel();
                            var record = selectionModel.getSelection();
                            gridPanel.getStore().remove(record);
                            gridPanel.getView().refresh();
                        }
                    }, this);
                }
            }
        });
    },
    getCon: function (sampleBackCountryGridPath) {
        var loginApp = this.application;
        return loginApp.getController(sampleBackCountryGridPath);
    },
    showTab: function (id, isShow, panel, applicationID) {
        var con = this.getCon('application.new.B1Tab');
        var instance = con.existInstance(id);
        if (!instance) {
            var panelNew = Ext.create(panel, { id: id, isShow: isShow, applicationID: applicationID });
            con.addTab(panelNew);
            return panelNew;
        } else {
            return instance;
        }
    }
});