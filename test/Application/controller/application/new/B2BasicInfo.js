Ext.define('Soims.controller.application.new.B2BasicInfo', {
    extend: 'Ext.app.Controller',
    //    stores: ['project.Project', 'project.Subject'],
    views: ['application.new.B2BasicInfo'],
    refs: [{
        ref: 'b2BasicInfo',
        selector: 'b2basicinfo',
        autoCreate: true,
        xtype: 'b2basicinfo'
    }],
    init: function () {

        this.control({
            'b2basicinfo': {
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
            'b2basicinfo combobox[itemId=subject]': {
                render: function (combobox, opts) {
                    var b2 = combobox.up('#applicationNewB2BasicInfo');
                    var store = combobox.getStore();
                    store.load();
                    store.on({
                        load: function () {

                            if (store.getCount() != 0) {
                                b2.down('#subject').select(store.getAt(0));
                                b2.down('#subjectnumber').setValue(store.getAt(0).get('topicNumber'));
                                b2.down('#project').setValue(store.getAt(0).get('projectName'));
                                b2.down('#projectnumber').setValue(store.getAt(0).get('projectNumber'));
                                b2.down('#projectchargerName').setValue(store.getAt(0).get('projectChargerName'));
                                b2.down('#projectaddress').setValue(store.getAt(0).get('projectAddress'));
                                b2.down('#projectcellphone').setValue(store.getAt(0).get('projectCellphone'));
                                b2.down('#projecttelphone').setValue(store.getAt(0).get('projectTelphone'));
                                b2.down('#projectzipCode').setValue(store.getAt(0).get('projectZipCode'));
                                b2.down('#projectfax').setValue(store.getAt(0).get('projectFax'));
                                b2.down('#projectemail').setValue(store.getAt(0).get('projectEmail'));
                                b2.down('#projectdepartment').setValue(store.getAt(0).get('projectDepartment'));
                            }
                            else {
                                Ext.MessageBox.alert('提示', '不存在您负责的课题，如有疑问请联系系统工作人员，谢谢！', function () { }, this);
                            }
                        }
                    });
                },
                select: function (combobox, records, eOpts) {
                    var panel = combobox.up('#applicationNewB2BasicInfo');
                    panel.down('#subjectnumber').setValue(records[0].get('topicNumber'));
                    panel.down('#project').setValue(records[0].get('projectName'));
                    panel.down('#projectnumber').setValue(records[0].get('projectNumber'));
                    panel.down('#projectchargerName').setValue(records[0].get('projectChargerName'));
                    panel.down('#projectaddress').setValue(records[0].get('projectAddress'));
                    panel.down('#projectcellphone').setValue(records[0].get('projectCellphone'));
                    panel.down('#projecttelphone').setValue(records[0].get('projectTelphone'));
                    panel.down('#projectzipCode').setValue(records[0].get('projectZipCode'));
                    panel.down('#projectfax').setValue(records[0].get('projectFax'));
                    panel.down('#projectemail').setValue(records[0].get('projectEmail'));
                    panel.down('#projectdepartment').setValue(records[0].get('projectDepartment'));
                }

            }
        });
    },
    showTab: function (id, isShow, panel, applicationID) {
        var con = this.getCon('application.new.B2Tab');
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