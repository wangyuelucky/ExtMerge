Ext.define("Soims.view.application.new.V1Tab", {
    extend: 'Ext.tab.Panel',
    alias: 'widget.v1Tab',
    title: '航次报告样品申请',
    closable: true,
    iconCls: 'Project',
    requires: ['Soims.view.application.new.V1BasicInfo', 'Soims.view.application.common.SampleInfo', 'Soims.model.application.common.SampleApplicationType'],
    items: [{ xtype: 'v1basicinfo' }, { xtype: 'sampleinfo'}],
    initComponent: function () {
        var applicationType = Soims.model.application.common.SampleApplicationType;
        var me = this;
        this.items = [{
            xtype: 'v1basicinfo',
            isEdit: this.isEdit,
            isShow: this.isShow,
            applicationID: this.applicationID
        }, {
            xtype: 'sampleinfo',
            type: applicationType.V1.value,
            isEdit: this.isEdit,
            isShow: this.isShow,
            applicationID: this.applicationID
        }];
        this.items[0].buttons = [{
            text: '保存',
            xtype: 'button',
            itemId: 'v1Page1Save',
            action: 'v1Page1Save',
            handler: function (button) {
                me.itemSave_0(button, me);
            }
        }, {
            text: '下一步',
            xtype: 'button',
            itemId: 'v1Page1Next',
            action: 'v1Page1Next'
        }];

        this.items[1].buttons = [{
            text: '上一步',
            xtype: 'button',
            itemId: 'v1Page2Later',
            action: 'v1Page2Later'
        }, {
            text: '保存',
            xtype: 'button',
            itemId: 'samplePage2Save',
            action: 'v1Page2Save'
        }, {
            text: '预览',
            xtype: 'button',
            itemId: 'v1Page2Preview',
            action: 'v1Page2Preview'
        }, {
            text: '提交',
            xtype: 'button',
            itemId: 'v1Page2Submit',
            action: 'v1Page2Submit',
            handler: function (button) {
                me.itemSubmit_4(button, me);
            }
        }];
        this.callParent();
    },
    getCon: function (path) {
        var loginApp = this.application;
        return loginApp.getController(path);
    },
    itemSave_0: function (button, me) {
        var b1BasicInfo = button.up('#applicationNewV1BasicInfo');
        var divisionID = b1BasicInfo.down('#division').getValue();
        var params = { voyageReportDivisionID: divisionID,
            applicationID: this.applicationID
        };
        me.save(params, Soims.service.applications.ApplicationsService + '/SaveV1Application');
    },
    itemSubmit_4: function (button, me) {
        if (me.validate() == false)
            return;
        var params = {
            applicationID: this.applicationID,
            type: Soims.model.application.common.SampleApplicationType.V1.value
        };
        Ext.MessageBox.alert('提示', '申请提交之后信息将无法修改，确认提交？', function (btn) {
            if (btn == 'ok') {
                var sampleContr = this.getCon('application.common.SampleInfo');
                sampleContr.saveAction(button.up('#applicationCommonSampleInfo').applicationID, button.up('#applicationCommonSampleInfo'), false);
                me.save(params, Soims.service.applications.ApplicationsService + '/Submit');
            }
        }, this);
    },
    save: function (params, url) {
        Ext.Ajax.request({
            url: url,
            params: params,
            method: 'POST',
            scope: this,
            success: function (response) {
                var obj = Ext.JSON.decode(response.responseText);
                if ("Result" in obj) {
                    switch (obj.Result) {
                        case 'Success':
                            if (url == Soims.service.applications.ApplicationsService + '/Submit') {
                                Ext.MessageBox.alert('成功', '申请提交成功！', function () {
                                    this.close();
                                    var app = this.application;
                                    var panel = app.getController('application.ApplicationPanel').getApplicationpanel();
                                    var con = app.getController('mainFrame.Main');
                                    con.addTab(panel);
                                    panel.getStore().reload();
                                    var selection = panel.getSelectionModel();
                                    selection.deselect(selection.getSelection()[0], true);
                                }, this);
                                return;
                            }
                            Ext.MessageBox.alert('成功', '信息保存成功！', function () { }, this);
                            break;
                        case 'Failure':
                            Ext.MessageBox.alert('失败', '信息保存失败，请核对填写信息。', function () { }, this);
                            break;
                    }
                }

                if ("ApplicationID" in obj) {
                    this.applicationID = obj.ApplicationID;

                    //界面传参
                    this.down('#applicationNewV1BasicInfo').applicationID = this.applicationID;
                    this.down('#applicationCommonSampleInfo').applicationID = this.applicationID;


                }
            }
        });
    },
    validate: function () {
        console.log(this.applicationID);
        if (this.applicationID == undefined) {
            Ext.MessageBox.alert('失败', '请先保存申请基本信息', function () {
                this.setActiveTab(0);
            }, this);
            return false;
        }
    }
});