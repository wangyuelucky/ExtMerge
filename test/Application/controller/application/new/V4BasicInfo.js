Ext.define('Soims.controller.application.new.V4BasicInfo', {
    extend: 'Ext.app.Controller',

    views: ['application.new.V4BasicInfo'],
    refs: [{
        ref: 'v4basicinfo',
        selector: 'v4basicinfo',
        autoCreate: true,
        xtype: 'v4basicinfo'
    }],
    init: function () {
        console.log('hello');
        this.control({
            'v4basicinfo': {
                afterrender: function (panel, eOpts) {
                   
                    if (panel.isEdit != true && panel.isShow != true) {
                        panel.down('textfield[name=chargerName]').setValue(Soims.currentUser.name);
                        panel.down('textfield[name=address]').setValue(Soims.currentUser.address);
                        panel.down('textfield[name=cellphone]').setValue(Soims.currentUser.cellPhone);
                        panel.down('textfield[name=telphone]').setValue(Soims.currentUser.telPhone);
                        panel.down('textfield[name=zipCode]').setValue(Soims.currentUser.zip);
                        panel.down('textfield[name=department]').setValue(Soims.currentUser.department);
                        panel.down('textfield[name=fax]').setValue(Soims.currentUser.fax);
                        panel.down('textfield[name=email]').setValue(Soims.currentUser.email);
                    }
                }
            },
            'v4basicinfo combobox[itemId=activity]': {
                select: function (combobox, records, eOpts) {
                    console.log(records[0].get('activityDepartment'));
                    var panel = combobox.up('#applicationNewV4BasicInfo');
                    panel.down('textfield[name=activityPlace]').setValue(records[0].get('activityPlace'));
                    panel.down('textfield[name=activityDepartment]').setValue(records[0].get('activityDepartment'));
                }

            }
        });
    },
    showTab: function (id, isShow, panel, applicationID) {
        var con = this.getCon('application.new.V4Tab');
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