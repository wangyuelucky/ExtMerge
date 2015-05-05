Ext.define('Soims.controller.application.common.BoardingUser', {
    extend: 'Ext.app.Controller',
    stores: ['application.common.BoardingUser'],
    views: ['application.common.SampleSiteUse', 'application.common.BoardingUserGrid', 'application.common.SampleSiteUseNecessityForm'],
    refs: [{
        ref: 'samplesiteuse',
        selector: 'samplesiteuse',
        autoCreate: true,
        xtype: 'samplesiteuse'
    }, {
        ref: 'boardingUser',
        selector: 'boardinguser',
        autoCreate: true,
        xtype: 'boardinguser'
    }, {
        ref: 'sampleSiteUseNecessityForm',
        selector: 'samplesiteusenecessityform',
        autoCreate: true,
        xtype: 'samplesiteusenecessityform'
    }],
    init: function () {
        this.control({
            'boardinguser': {

        },
        'boardinguser button[itemId=addSiteUser]': {
            click: function (button) {
                var gridPanel = button.up('#applicationCommonBoardingUserGrid');
                if (gridPanel.up('samplesiteuse').applicationID == undefined) {
                    Ext.MessageBox.alert('失败', '请先保存申请基本信息', function () {
                        var tabPanel = button.up('samplesiteuse').up('tabpanel');
                        tabPanel.setActiveTab(0);
                    }, this);
                    return;
                }
                gridPanel.getStore().insert(0, Ext.create('Soims.model.application.common.BoardingUser'));
                gridPanel.getView().refresh();
            }
        },
        'boardinguser button[itemId=deleteSiteUser]': {
            click: function (button, e) {
                Ext.MessageBox.confirm('确认', '确认删除此人员？点击保存按钮生效。',
                    function (btn) {
                        if (btn == 'yes') {
                            var gridPanel = button.up('#applicationCommonBoardingUserGrid');
                            var selectionModel = gridPanel.getSelectionModel();
                            var record = selectionModel.getSelection();
                            this.getBoardingUser().getStore().remove(record);
                            this.getBoardingUser().getView().refresh();
                        }
                    }, this);
            }
        },
        'boardinguser searchcombo[itemId=boardingUserName]': {

            select: function (combo, records, eOpts) {
                var record = combo.up('#applicationCommonBoardingUserGrid').getSelectionModel().getSelection()[0];
                record.set('id', records[0].get('id'));
                record.set('name', records[0].get('name'));
                record.set('department', records[0].get('department'));
                record.set('cellphone', records[0].get('cellphone'));
                record.set('telphone', records[0].get('telphone'));
            }
        },
        'boardinguser combobox[itemId=legs]': {

            select: function (combo, records, eOpts) {
                var record = combo.up('#applicationCommonBoardingUserGrid').getSelectionModel().getSelection()[0];
                var legIDs = '';
                for (var i = 0; i < records.length; i++) {
                    legIDs += records[i].get('id') + ',';
                }
                if (legIDs != '') {
                    legIDs = legIDs.substring(0, legIDs.length - 1);
                }
                record.set('legIDs', legIDs);
                console.log(legIDs);
            }
        }
    });
},
getCon: function (boardingUserPath) {
    var loginApp = this.application;
    return loginApp.getController(boardingUserPath);
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