/// <reference path="Application/common/ext/resources/ext-all-dev.js" />
Ext.define("Soims.view.application.new.B1Tab", {
    extend: 'Ext.tab.Panel',
    alias: 'widget.b1Tab',
    title: '航次任务样品申请',
    closable: true,
    iconCls: 'Project',
    frame: true,
    //requires: ['Soims.view.application.new.B1BasicInfo', 'Soims.view.application.common.SampleInfo', 'Soims.view.application.common.SampleSiteUse', 'Soims.view.application.common.SampleBackCountry', 'Soims.view.application.common.ElectronicDocument', 'Soims.model.application.common.SampleApplicationType'],
    initComponent: function () {
        var applicationType = Soims.model.application.common.SampleApplicationType;
        var me = this;
        this.items = [{
            xtype: 'b1basicinfo',
            isEdit: this.isEdit,
            isShow: this.isShow,
            applicationID: this.applicationID
        }, {
            xtype: 'sampleinfo',
            isEdit: this.isEdit,
            isShow: this.isShow,
            type: applicationType.B1.value,
            applicationID: this.applicationID
        }, {
            xtype: 'samplesiteuse',
            isEdit: this.isEdit,
            isShow: this.isShow,
            applicationID: this.applicationID
        }, {
            xtype: 'samplebackcountry',
            isShow: this.isShow,
            isEdit: this.isEdit,
            applicationID: this.applicationID
        }, {
            xtype: 'electronicdocument',
            isEdit: this.isEdit,
            type: applicationType.B1.value,
            isShow: this.isShow,
            applicationID: this.applicationID
        }];
        this.items[0].buttons = [{
            text: '保存',
            xtype: 'button',
            itemId: 'b1Page1Save',
            action: 'b1Page1Save',
            handler: function (button) {
                me.itemSave_0(button, me);
            }
        }, {
            text: '下一步',
            xtype: 'button',
            itemId: 'b1Page1Next',
            action: 'b1Page1Next'
        }];
        this.items[1].buttons = [{
            text: '上一步',
            xtype: 'button',
            itemId: 'b1Page2Later',
            action: 'b1Page2Later'
        }, {
            text: '保存',
            xtype: 'button',
            itemId: 'samplePage2Save',
            action: 'b1Page2Save'
        }, {
            text: '下一步',
            xtype: 'button',
            itemId: 'b1Page2Next',
            action: 'b1Page2Next'
        }];
        this.items[2].buttons = [{
            text: '上一步',
            xtype: 'button',
            itemId: 'b1Page3Later',
            action: 'b1Page3Later'
        }, {
            text: '保存',
            xtype: 'button',
            itemId: 'b1Page3Save',
            action: 'b1Page3Save',
            handler: function (button) {
                me.itemSave_2(button, me);
            }
        }, {
            text: '下一步',
            xtype: 'button',
            itemId: 'b1Page3Next',
            action: 'b1Page3Next'
        }];
        this.items[3].buttons = [{
            text: '上一步',
            xtype: 'button',
            itemId: 'b1Page4Later',
            action: 'b1Page4Later'
        }, {
            text: '保存',
            xtype: 'button',
            itemId: 'b1Page4Save',
            action: 'b1Page4Save',
            handler: function (button) {
                me.itemSave_3(button, me);
            }
        }, {
            text: '下一步',
            xtype: 'button',
            itemId: 'b1Page4Next',
            action: 'b1Page4Next'
        }];
        this.items[4].buttons = [{
            text: '上一步',
            xtype: 'button',
            itemId: 'b1Page5Later',
            action: 'b1Page5Later'
        }, {
            text: '保存',
            xtype: 'button',
            itemId: 'b1Page5Save',
            action: 'b1Page5Save',
            handler: function (button) {
                me.itemSave_4(button, me);
            }
        }, {
            text: '预览',
            xtype: 'button',
            itemId: 'b1Page5Preview',
            action: 'b1Page5Preview'
        }, {
            text: '提交',
            xtype: 'button',
            itemId: 'b1Page5Submit',
            action: 'b1Page5Submit',
            handler: function (button) {
                me.itemSubmit_4(button, me);
            }
        }];

        this.callParent();
    },

    itemSave_0: function (button, me) {
        var b1BasicInfo = button.up('b1basicinfo');
        var voyageID = b1BasicInfo.down('#voyage').getValue();
        var voyageTaskID = b1BasicInfo.down('#voyageTask').getValue();
        var chargerID = b1BasicInfo.down('#chargerName').getValue();
        var legs = b1BasicInfo.down('#legs').getValue();
        if (voyageID == '' || voyageTaskID == '' || chargerID == '' || legs == '') {
            Ext.MessageBox.alert('失败', '请保证申请基本信息完整', function () {
            }, this);
            return;
        }

        var params = {
            voyageID: voyageID,
            voyageTaskID: voyageTaskID,
            chargerID: chargerID,
            legs: legs,
            applicationID: this.applicationID
        };
        me.save(params, Soims.service.applications.ApplicationsService + '/SaveB1Application');
    },
    itemSave_2: function (button, me) {
        if (me.validate() == false)
            return;
        var boardingUser = button.up('samplesiteuse');
        var boardingUserGrid = boardingUser.down('#applicationCommonBoardingUserGrid');
        var boardingUserStore = boardingUserGrid.getStore();
        var sampleSiteUseNecessity = boardingUser.down('#sampleSiteUseNecessityTextArea').getValue();
        var id = "";
        var legs = "";
        var params = {};
        boardingUserStore.each(function (record) {
            if (record.get("id") != "") {
                id = id + record.get("id") + ' ';
                legs = legs + record.get("legIDs") + ' ';
            }
        });
        if (id != "") {
            id = id.substr(0, id.length - 1);
        }
        if (legs != "") {
            legs = legs.substr(0, legs.length - 1);
        }
        params = {
            applicationID: boardingUser.applicationID,
            boardingUserID: id,
            legs: legs,
            sampleSiteUseNecessity: sampleSiteUseNecessity
        };
        me.save(params, Soims.service.applications.BoardingUserService + '/SaveBoardingUser', button, boardingUserGrid);
    },
    itemSave_3: function (button, me) {
        if (me.validate() == false)
            return;
        var sampleBackCountry = button.up('samplebackcountry');
        var sampleBackCountryNec = sampleBackCountry.down('#sampleBackCountryNecessityTextArea').getValue();
        var sampleBackCountryStore = sampleBackCountry.down('#applicationCommonSampleBackCountryGrid').getStore();
        var jsonArray = [];
        sampleBackCountryStore.each(function (record) {
            console.log(record.get("sampleID"));
            if (record.get("sampleID") != "" && record.get("sampleID") != undefined) {
                jsonArray.push(Ext.JSON.encode(record.data));
            }
        });
        var params = {
            applicationID: sampleBackCountry.applicationID,
            backCountrySample: '[' + [jsonArray] + ']',
            sampleBackCountryNecessity: sampleBackCountryNec
        };
        //console.log(params);
        me.save(params, Soims.service.applications.SampleBackCountry + '/SaveInfo', button, sampleBackCountryStore);
    },
    itemSave_4: function (button, me) {
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
        me.save(params, Soims.service.applications.ElectronicDocument + '/Save', button, electronicDocumentGrid);
    },
    itemSubmit_4: function (button, me) {
        if (me.validate() == false)
            return;
        var params = {
            applicationID: button.up('electronicdocument').applicationID,
            type: Soims.model.application.common.SampleApplicationType.B1.value
        };
        Ext.MessageBox.alert('提示', '申请提交之后信息将无法修改，确认提交？', function (btn) {
            if (btn == 'ok') {
                me.save(params, Soims.service.applications.ApplicationsService + '/Submit');
            }
        }, this);
    },
    save: function (params, url, button, grid) {
        //if (grid != undefined) {
        //    console.log(grid);
        //    var gridValid = grid.isValid();
        //    if (!gridValid) {
        //        Ext.tool.Msg('信息填写不完整', 9);
        //        return;
        //    }
        //}
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
                                Ext.MessageBox.alert('成功', '申请提交成功！', function (btn) {
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
                            //刷新后面改
                            //                            if (button != undefined) {
                            //                                var applicationID = button.up('form').applicationID;
                            //                                var store = button.up('form').down('gridpanel').getStore();
                            //                                store.getProxy().setExtraParam('applicationID', this.applicationID);
                            //                                store.load();
                            //                            }
                            Ext.MessageBox.alert('成功', '信息保存成功！', function (btn) { }, this);
                            break;
                        case 'Failure':
                            Ext.MessageBox.alert('失败', '信息保存失败，请核对填写信息。', function () { }, this);
                            break;
                    }
                }
                console.log(obj);
                if ("ApplicationID" in obj && "VoyageID" in obj) {
                    this.applicationID = obj.ApplicationID;
                    this.voyageID = obj.VoyageID;
                    //界面传参
                    this.down('#applicationNewB1BasicInfo').applicationID = this.applicationID;
                    this.down('#applicationNewB1BasicInfo').voyageID = this.voyageID;

                    this.down('#applicationCommonSampleInfo').applicationID = this.applicationID;

                    this.down('samplesiteuse').applicationID = this.applicationID;
                    this.down('samplesiteuse').voyageID = this.voyageID;

                    this.down('samplebackcountry').applicationID = this.applicationID;

                    this.down('electronicdocument').applicationID = this.applicationID;
                }
            }
        });
    },
    validate: function () {
        console.log(this.applicationID + ' ' + this.voyageID);
        if (this.applicationID == undefined) {
            Ext.MessageBox.alert('失败', '请先保存申请基本信息', function () {
                this.setActiveTab(0);
            }, this);
            return false;
        }
    }
});