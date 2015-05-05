Ext.define('Soims.controller.application.new.V3BasicInfo', {
    extend: 'Ext.app.Controller',
    //    stores: ['project.Subject'],
    views: ['application.new.V3BasicInfo'],
    refs: [{
        ref: 'v3basicinfo',
        selector: 'v3basicinfo',
        autoCreate: true,
        xtype: 'v3basicinfo'
    }],
    init: function () {
        console.log('hello');
        this.control({
            'v3basicinfo': {
                afterrender: function (panel, eOpts) {
                    panel.down('textfield[name=chargerName]').setValue(Soims.currentUser.name);
                    panel.down('textfield[name=address]').setValue(Soims.currentUser.address);
                    panel.down('textfield[name=cellphone]').setValue(Soims.currentUser.cellPhone);
                    panel.down('textfield[name=telphone]').setValue(Soims.currentUser.telPhone);
                    panel.down('textfield[name=zipCode]').setValue(Soims.currentUser.zip);
                    panel.down('textfield[name=department]').setValue(Soims.currentUser.department);
                    panel.down('textfield[name=fax]').setValue(Soims.currentUser.fax);
                    panel.down('textfield[name=email]').setValue(Soims.currentUser.email);
                }
            },
            'v3basicinfo combobox[itemId=noOceanTopic]': {
                select: function (combobox, records, eOpts) {
                    var panel = combobox.up('#applicationNewV3BasicInfo');
                    panel.down('textfield[name=topicNumber]').setValue(records[0].get('topicNumber'));
                    panel.down('textfield[name=topicSource]').setValue(records[0].get('topicSource'));
                }

            }
        });
    },
    showTab: function (id, isShow, panel, applicationID) {
        var con = this.getCon('application.new.V3Tab');
        var instance = con.existInstance(id);
        if (!instance) {
            var panelNew = Ext.create(panel, { id: id, isShow: isShow, applicationID: applicationID });
            con.addTab(panelNew);
            return panelNew;
        } else {
            return instance;
        }
    },
    getCon: function (sampleBackCountryGridPath) {
        var loginApp = this.application;
        return loginApp.getController(sampleBackCountryGridPath);
    }
});