Ext.define('Soims.controller.application.new.B1BasicInfo', {
    extend: 'Ext.app.Controller',
    //    stores: ['project.Subject'],
    views: ['application.new.B1BasicInfo'],
    refs: [{
        ref: 'b1BasicInfo',
        selector: 'b1basicinfo',
        autoCreate: true,
        xtype: 'b1basicinfo'
    }],
    init: function () {
        //var voyageTaskStore = Ext.create('Soims.store.application.new.VoyageTask');  
        this.control({
            'b1basicinfo': {
                afterrender: function (panel, eOpts) {
                    console.log(panel.isEdit);
                    if(panel.isShow != true && panel.isEdit != true)
                    {
                        var record = Ext.create('Soims.model.application.new.VoyageTask',
                                {
                                    'id': Soims.currentUser.id,
                                    'name': Soims.currentUser.name
                                });
                        panel.down('#chargerName').setValue(record);
                        panel.down('#voyageTask').getStore().getProxy().setExtraParam('userID', Soims.currentUser.id);
                        panel.down('textfield[name=address]').setValue(Soims.currentUser.address);
                        panel.down('textfield[name=cellphone]').setValue(Soims.currentUser.cellPhone);
                        panel.down('textfield[name=telphone]').setValue(Soims.currentUser.telPhone);
                        panel.down('textfield[name=zipCode]').setValue(Soims.currentUser.zip);
                        panel.down('textfield[name=department]').setValue(Soims.currentUser.department);
                        panel.down('textfield[name=fax]').setValue(Soims.currentUser.fax);
                        panel.down('textfield[name=email]').setValue(Soims.currentUser.email);  
                    }
                }
            }
        });
    },
    showTab: function (id, isShow, panel, applicationID) {
        var con = this.getCon('application.new.B1Tab');
        var instance = con.existInstance(id);
        if (!instance) {
            var panelNew = Ext.create(panel, { id: id, isShow: isShow, applicationID: applicationID});
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