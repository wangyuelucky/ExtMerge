Ext.define('Soims.controller.application.new.V2BasicInfo', {
    extend: 'Ext.app.Controller',
    views: ['application.new.V2BasicInfo'],
    refs: [{
        ref: 'v2BasicInfo',
        selector: 'v2basicinfo',
        autoCreate: true,
        xtype: 'v2basicinfo'
    }],
    init: function () {
        //var voyageTaskStore = Ext.create('Soims.store.application.new.VoyageTask');  
        this.control({
            'v2basicinfo': {
                afterrender: function (panel, eOpts) {
                    panel.down('#subjectchargerName').setValue(Soims.currentUser.name);
                    panel.down('#subjectaddress').setValue(Soims.currentUser.address);
                    panel.down('#subjectcellphone').setValue(Soims.currentUser.cellPhone);
                    panel.down('#subjecttelphone').setValue(Soims.currentUser.telPhone);
                    panel.down('#subjectzipCode').setValue(Soims.currentUser.zip);
                    panel.down('#subjectdepartment').setValue(Soims.currentUser.department);
                    panel.down('#subjectfax').setValue(Soims.currentUser.fax);
                    panel.down('#subjectemail').setValue(Soims.currentUser.email);
                }
            },
            'v2basicinfo combobox[itemId=subject]': {
                render: function (combobox, opts) {
                    var v2 = combobox.up('#applicationNewV2BasicInfo');
                    var store = combobox.getStore();
                    store.load();
                    store.on({
                        load: function () {
                            if (store.getCount() != 0) {
                                v2.down('#subject').select(store.getAt(0));
                                v2.down('#subjectnumber').setValue(store.getAt(0).get('topicNumber'));
                                v2.down('#project').setValue(store.getAt(0).get('projectName'));
                                v2.down('#projectnumber').setValue(store.getAt(0).get('projectNumber'));
                                v2.down('#projectchargerName').setValue(store.getAt(0).get('projectChargerName'));
                                v2.down('#projectaddress').setValue(store.getAt(0).get('projectAddress'));
                                v2.down('#projectcellphone').setValue(store.getAt(0).get('projectCellphone'));
                                v2.down('#projecttelphone').setValue(store.getAt(0).get('projectTelphone'));
                                v2.down('#projectzipCode').setValue(store.getAt(0).get('projectZipCode'));
                                v2.down('#projectfax').setValue(store.getAt(0).get('projectFax'));
                                v2.down('#projectemail').setValue(store.getAt(0).get('projectEmail'));
                                v2.down('#projectdepartment').setValue(store.getAt(0).get('projectDepartment'));
                            }
                            else {
                                Ext.MessageBox.alert('提示', '不存在您负责的课题，如有疑问请联系系统工作人员，谢谢！', function () { }, this);
                            }
                        }
                    });
                },
                select: function (combobox, records, eOpts) {
                    var v2 = combobox.up('#applicationNewV2BasicInfo');
                    v2.down('#subjectnumber').setValue(records[0].get('topicNumber'));
                    v2.down('#project').setValue(records[0].get('projectName'));
                    v2.down('#projectnumber').setValue(records[0].get('projectNumber'));
                    v2.down('#projectchargerName').setValue(records[0].get('projectChargerName'));
                    v2.down('#projectaddress').setValue(records[0].get('projectAddress'));
                    v2.down('#projectcellphone').setValue(records[0].get('projectCellphone'));
                    v2.down('#projecttelphone').setValue(records[0].get('projectTelphone'));
                    v2.down('#projectzipCode').setValue(records[0].get('projectZipCode'));
                    v2.down('#projectfax').setValue(records[0].get('projectFax'));
                    v2.down('#projectemail').setValue(records[0].get('projectEmail'));
                    v2.down('#projectdepartment').setValue(records[0].get('projectDepartment'));
                }

            }
        });
    },
    showTab: function (id, isShow, panel, applicationID) {
        var con = this.getCon('application.new.V2Tab');
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