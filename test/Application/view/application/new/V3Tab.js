Ext.define("Soims.view.application.new.V3Tab", {
    extend: 'Ext.tab.Panel',
    alias: 'widget.v3Tab',
    title: '非大洋课题样品申请',
    closable: true,
    iconCls: 'Project',
    requires: ['Soims.view.application.new.V3BasicInfo', 'Soims.view.application.common.SampleInfo', 'Soims.view.application.common.ElectronicDocument', 'Soims.model.application.common.SampleApplicationType'],
    initComponent: function () {
        var me = this;
        var applicationType = Soims.model.application.common.SampleApplicationType;
        this.items = [{
            xtype: 'v3basicinfo',
            isShow: this.isShow,
            applicationID: this.applicationID
        }, {
            xtype: 'sampleinfo',
            type: applicationType.V3.value,
            isShow: this.isShow,
            applicationID: this.applicationID
        }, {
            xtype: 'electronicdocument',
            isShow: this.isShow,
            type: applicationType.V3.value,
            applicationID: this.applicationID
        }];
        this.items[0].buttons = [{
            text: '保存',
            xtype: 'button',
            itemId: 'v3Page1Save',
            action: 'v3Page1Save',
            handler: function (button) {
                me.itemSave_0(button, me);
            }
        }, {
            text: '下一步',
            xtype: 'button',
            itemId: 'v3Page1Next',
            action: 'v3Page1Next'
        }];
        this.items[1].buttons = [{
            text: '上一步',
            xtype: 'button',
            itemId: 'v3Page2Later',
            action: 'v3Page2Later'
        }, {
            text: '保存',
            xtype: 'button',
            itemId: 'samplePage2Save',
            action: 'v3Page2Save'
        }, {
            text: '下一步',
            xtype: 'button',
            itemId: 'v3Page2Next',
            action: 'v3Page2Next'
        }];

        this.items[2].buttons = [{
            text: '上一步',
            xtype: 'button',
            itemId: 'v3Page5Later',
            action: 'v3Page5Later'
        }, {
            text: '保存',
            xtype: 'button',
            itemId: 'v3Page5Save',
            action: 'v3Page5Save',
            handler: function (button) {
                me.itemSave_2(button, me);
            }
        }, {
            text: '预览',
            xtype: 'button',
            itemId: 'v3Page5Preview',
            action: 'v3Page5Preview'
        }, {
            text: '提交',
            xtype: 'button',
            itemId: 'v3Page5Submit',
            action: 'v3Page5Submit',
            handler: function (button) {
                me.itemSubmit_2(button, me);
            }
        }];

        this.callParent();
    },
    getCon: function (path) {
        var loginApp = this.application;
        return loginApp.getController(path);
    },
    itemSave_2: function (button, me) {
        if (me.validate() == false)
            return;
        var electronicDocumentGrid = button.up('electronicdocument').down('#applicationCommonElectronicDocumentGrid');
        var electronicDocumentGridStore = electronicDocumentGrid.getStore();
        var jsonArray = [];
        electronicDocumentGridStore.each(function (record) {
            console.log(record);
            if (record.get("resourceID") != "") {
                jsonArray.push(Ext.JSON.encode(record.data));
            }
        });
        var params = {
            applicationID: button.up('electronicdocument').applicationID,
            electronicDocument: '[' + [jsonArray] + ']'
        };
        //console.log(params);
        me.save(params, Soims.service.applications.ElectronicDocument + '/Save');
    },
    itemSave_0: function (button, me) {
        if (me.saveValidate() == false)
            return;
        var v3BasicInfo = button.up('#applicationNewV3BasicInfo');
        var topicName = v3BasicInfo.down('#noOceanTopic').getValue();
        var topicNumber = v3BasicInfo.down('#topicNumber').getValue();
        var topicSource = v3BasicInfo.down('#topicSource').getValue();
        var params = { topicName: topicName,
            topicNumber: topicNumber,
            topicSource: topicSource,
            applicationID: this.applicationID
        };
        me.save(params, Soims.service.applications.ApplicationsService + '/SaveV3Application');
    },
    itemSubmit_2: function (button, me) {
        if (me.validate() == false)
            return;
        var params = {
            applicationID: button.up('electronicdocument').applicationID,
            type: Soims.model.application.common.SampleApplicationType.V3.value
        };
        Ext.MessageBox.alert('提示', '申请提交之后信息将无法修改，确认提交？', function () {
            me.save(params, Soims.service.applications.ApplicationsService + '/Submit');
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
                        case 'NameExist':
                            Ext.MessageBox.alert('失败', '非大洋课题名称已存在。', function () { }, this);
                            break;
                    }
                }
                console.log(obj);
                if ("ApplicationID" in obj) {
                    this.applicationID = obj.ApplicationID;
                    //界面传参
                    this.down('#applicationNewV3BasicInfo').applicationID = this.applicationID;
                    this.down('#applicationCommonSampleInfo').applicationID = this.applicationID;
                    this.down('electronicdocument').applicationID = this.applicationID;
                }
            }
        });
    },
    validate: function () {
        if (this.applicationID == undefined) {
            Ext.MessageBox.alert('失败', '请先保存申请基本信息', function () {
                this.setActiveTab(0);
            }, this);
            return false;
        }

    },
    saveValidate: function () {
        var result = true;
        result = this.down('v3basicinfopanel').down('combobox[itemId=noOceanTopic]').isValid() && result;
        result = this.down('v3basicinfopanel').down('textfield[itemId=topicNumber]').isValid() && result;
        result = this.down('v3basicinfopanel').down('textfield[itemId=topicSource]').isValid() && result;
        if (!result) {
            Ext.MessageBox.alert('失败', '请将申请基本信息填写完整');
        }
        return result;
    }

});