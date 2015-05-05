Ext.define('Soims.controller.application.common.SampleLegWindow', {
    extend: 'Ext.app.Controller',
    views: ['application.common.SampleLegWindow'],
    refs: [{
        ref: 'samplelegwindow',
        selector: 'samplelegwindow',
        autoCreate: true,
        xtype: 'samplelegwindow'
    }],
    init: function () {

        this.control({
            'samplelegwindow button[itemId=LegSave]': {
                click: function (button, e) {
                    var window = button.up('window');
                    var panel = window.panel;
                    if (this.getSamplelegwindow().leg == '') {
                        Ext.Tools.Msg('请选择航段！', 9);
                        return;
                    }
                    var leg = this.getSamplelegwindow().leg;
                    var legID = this.getSamplelegwindow().legID;
                    window.close();

                    var addSampleContr = this.getCon('application.common.AddSampleInfo');
                    addSampleContr.show(leg, legID, undefined, panel.down('samplegrid'), undefined);

                    var win = addSampleContr.getAddsampleinfowindow();
                    win.leg = leg;
                    win.legID = legID;

                    addSampleContr.onSampleInfoGridClear();
                    this.storeInit(leg, legID, panel);
                    addSampleContr.sampleInfoFormAddItem(leg, legID);
                }
            },
            'samplelegwindow button[itemId=LegCancel]': {
                click: function (button, e) {
                    var window = button.up('window');
                    window.close();
                }
            },
            'samplelegwindow combobox[itemId=sampleleg]': {
                select: function (combo, records, eOpts) {

                    this.getSamplelegwindow().leg = records[0].get('leg');
                    this.getSamplelegwindow().legID = records[0].get('id');
                }
            },
            'samplelegwindow': {
                beforerender: function (view) {
                    var contr = this.getCon('application.new.B1BasicInfo');
                    var b1 = contr.getB1BasicInfo();
                    var voyageid = b1.down('combobox[name=voyageTask]').getValue();
                    var store = view.down('combobox[name=sampleleg]').getStore();
                    var applicationID = view.panel.applicationID;
                    var voyageID = view.panel.voyageID;

                    store.getProxy().setExtraParam('applicationID', applicationID);
                    store.getProxy().setExtraParam('voyageID', voyageID);
                    store.load(function () {
                        if (store.getCount() == 0) {
                            Ext.Tools.Msg('没有开放航段！', 9);
                        }
                    });
                }
            }
        });
    },
    show: function (panel) {
        var window = this.getApplicationCommonSampleLegWindowView();
        var samplelegwindow = Ext.create(window, { panel: panel });

        samplelegwindow.show();
    },
    getCon: function (sampleLegWindowPath) {
        var loginApp = this.application;
        return loginApp.getController(sampleLegWindowPath);
    },
    storeInit: function (leg, legID, panel) {

        var sampleGridContr = this.getCon('application.common.SampleGrid');
        sampleGridContr.leg = leg;

        sampleGridContr.storeInit(leg, undefined, panel.down('samplegrid'));

        var testDataGridContr = this.getCon('application.common.TestDataGrid');
        testDataGridContr.storeInit(leg, panel.down('testdatagrid'));
    }
});