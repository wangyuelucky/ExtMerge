Ext.define("Soims.view.application.common.SampleGridShow", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.samplegridshow',
    requires: ['Ext.ux.grid.AssociationRowExpander', 'Soims.model.applicationDiscussion.DiscussType', 'Soims.model.applicationAuditing.ContentType', 'Soims.model.applicationAuditing.AuditType', 'Soims.model.application.SamplePanelType'],
    viewConfig: { emptyText: '没有满足条件的拟申请样品' },
    minHeight: 200,
    padding: '2 2 2 2',
    selType: 'rowmodel',
    plugins: [{
        ptype: 'associationrowexpander',
        pluginId: 'sampleGridExpander',
        selectRowOnExpand: true,
        rowBodyTpl: new Ext.XTemplate(
            '<tpl for=".">',
                '<table width="700"  style="margin-left:30px;line-height:20px" frame=below>',
                '<tr><td width="300"><b>样品类型:&nbsp;&nbsp;</b>{data.sampleType}</td><td><b>所在航段:&nbsp;&nbsp;</b>{data.leg}</td></tr>',
                '</table><br>',
                '<table width="700"  style="margin-left:30px;line-height:20px" frame=below>',
                '<tr><td><b>使用目的:&nbsp;&nbsp;</b>{data.usePurpose}</td></tr>',
                '<tr><td><b>涉及学科:&nbsp;&nbsp;</b>{data.involvedSubject}</td></tr>',
                '<tr><td><b>岩心分取方案:&nbsp;&nbsp;</b>{data.samplingMethod}</td></tr>',
                '<tr><td><b>制样方案:&nbsp;&nbsp;</b>{data.samplePreparation}</td></tr>',
                '<tr><td><b>分析测试项目、指标:&nbsp;&nbsp;</b>{data.sampleType}</td></tr>',
                '</table><br>',
                '<table width="700"   style="padding-left:30px;line-height:20px">',
                '<tr><td><b>采样区域:&nbsp;&nbsp;</b>{data.samplingArea}</td></tr>',
                '<tr><td width="300"><b>站位数:&nbsp;&nbsp;</b>{data.stationDigit}</td><td><b>各站样品数:&nbsp;&nbsp;</b>{data.stationSampleNumber}</td></tr>',
                '<tr><td width="300"><b>总样品件数:&nbsp;&nbsp;</b>{data.sampleTotalNumber}</td><td><b>单件样品量:&nbsp;&nbsp;</b>{data.oneSampleAmount}</td></tr>',
                '<tr><td><b>其它:&nbsp;&nbsp;</b>{data.otherRequirements}</td></tr>',
                '</table><br>',
                 '<div id="dataTest{data.id}" style="padding-left:30px;line-height:20px"><b>拟提交测试数据</b></div>',
                 '<table width="700"  border="1" cellspacing="0px" style="margin-left:50px;line-height:20px;border-collapse:collapse">',
                 '<tr><th>分析测试指标</th><th>拟提交测试数据</th><th>拟提交时间</th></tr>',
                 '<tpl for="AnlysesStore">',
                        '<tr><td><span >{data.anlyseTestProject}</span></td><td>{data.intendCommitTestData}</td><td>{data.commitTestDataTime}</td></tr>',
                 '</tpl>',
                 '</table><br>',
                '<div id="auditList{data.id}" style="padding-left:30px;line-height:20px"><b>审核记录</b></div>',
                '<tpl for="getSampleAuditsStore">',
                    '<tpl if="this.colorChange(data.auditerID,data.auditType)">',
                        '<tpl if="this.formatChange(data.auditType)">',
                             '<span style="padding-left:50px;line-height:20px"  auditor="{data.auditerID}" auditType="{data.auditType}" sampleID="{[values.getSample().data.id]}">{[Soims.model.applicationAuditing.AuditType[values.data.auditType].name]}&nbsp;&nbsp;&nbsp;&nbsp;{data.auditerName}&nbsp;&nbsp;&nbsp;&nbsp;{data.createTime:date("Y/m/d")}&nbsp;&nbsp;&nbsp;&nbsp;审核{[Soims.model.applicationAuditing.ContentType[values.data.contentType].name]}</span><br/>',
                        '<tpl else>',
                             '<span style="padding-left:50px;line-height:20px"  auditor="{data.auditerID}" auditType="{data.auditType}" sampleID="{[values.getSample().data.id]}">{[Soims.model.applicationAuditing.AuditType[values.data.auditType].name]}&nbsp;&nbsp;&nbsp;&nbsp;{data.companyName}&nbsp;&nbsp;&nbsp;&nbsp;{data.createTime:date("Y/m/d")}&nbsp;&nbsp;&nbsp;&nbsp;审核{[Soims.model.applicationAuditing.ContentType[values.data.contentType].name]}</span><br/>',
                         '</tpl>',
                    '<tpl else>',
                        '<tpl if="this.formatChange(data.auditType)">',
                             '<span style="padding-left:50px;line-height:20px;color:red"  auditor="{data.auditerID}" auditType="{data.auditType}" sampleID="{[values.getSample().data.id]}">{[Soims.model.applicationAuditing.AuditType[values.data.auditType].name]}&nbsp;&nbsp;&nbsp;&nbsp;{data.auditerName}&nbsp;&nbsp;&nbsp;&nbsp;{data.createTime:date("Y/m/d")}&nbsp;&nbsp;&nbsp;&nbsp;审核{[Soims.model.applicationAuditing.ContentType[values.data.contentType].name]}</span><br/>',
                        '<tpl else>',
                             '<span style="padding-left:50px;line-height:20px;color:red"  auditor="{data.auditerID}" auditType="{data.auditType}" sampleID="{[values.getSample().data.id]}">{[Soims.model.applicationAuditing.AuditType[values.data.auditType].name]}&nbsp;&nbsp;&nbsp;&nbsp;{data.companyName}&nbsp;&nbsp;&nbsp;&nbsp;{data.createTime:date("Y/m/d")}&nbsp;&nbsp;&nbsp;&nbsp;审核{[Soims.model.applicationAuditing.ContentType[values.data.contentType].name]}</span><br/>',
                        '</tpl>',
                   '</tpl>',
                 '</tpl>',
                 '<hr align="left" style="margin-left:30px" width="700"></hr>',
                 '<tpl if="this.AuditButtonShow()">',
                    '<p style="text-align: center;"><button  id="sampleagree{data.id}">同意</button>   <button  id="sampleunagree{data.id}">拟同意</button>   <button  id="sampledisagree{data.id}">不同意</button></p>',
                '</tpl>',
                '<p>&nbsp;</p>',
                '<tpl if="this.AllocationIndoorEdit()">',
                    '<div id="allocationInfor{data.id}" style="padding-left:30px;line-height:20px"><b>分配建议</b></div>',
                        '<table width="700" id="allocationTb{data.id}"  border="1" cellspacing="0px" style="margin-left:50px;line-height:20px;border-collapse:collapse">',
                        '<tr><th>本任务既往使用样品情况</th><th>申请人既往样品使用情况</th><th>分配建议</th><th>大洋协会分配建议</th><th>备注</th></tr>',
                        '<tpl for="AllocationsStore">',
                            '<tr><td><span >{data.taskPreviousUsage}</span></td><td>{data.supplierPreviousUsage}</td><td>{data.suggestion}</td><td><b><textarea id="allocationTd{data.id}" type="text" style="height:100%;width:100%;resize:none">{data.oiSuggestion}</textarea></b></td><td></td></tr>',
                        '</tpl>',
                        '</table><br>',
                        '<p style="text-align: center;"><button  id="saveAllocation{data.id}">保存</button></p>',
                '</tpl>',
                '<tpl if="this.AllocationOutdoorEdit()">',
                    '<div id="allocationInfor{data.id}" style="padding-left:30px;line-height:20px"><b>分配建议</b></div>',
                        '<table width="700" id="allocationTb{data.id}"  border="1" cellspacing="0px" style="margin-left:50px;line-height:20px;border-collapse:collapse">',
                        '<tr><th>本任务既往使用样品情况</th><th>申请人既往样品使用情况</th><th>分配建议</th><th>取用次序</th><th>大洋协会分配建议</th><th>备注</th></tr>',
                        '<tpl for="AllocationsStore">',
                            '<tr><td><span >{data.taskPreviousUsage}</span></td><td>{data.supplierPreviousUsage}</td><td>{data.suggestion}</td><td>{data.useOrder}</td><td><b><textarea id="allocationTd{data.id}" type="text" style="height:100%;width:100%;resize:none">{data.oiSuggestion}</textarea></b></td><td></td></tr>',
                        '</tpl>',
                        '</table><br>',
                        '<p style="text-align: center;"><button  id="saveAllocation{data.id}">保存</button></p>',
                '</tpl>',
                 '<tpl if="this.AllocationOutdoorShow()">',
                    '<div id="allocationInfor{data.id}" style="padding-left:30px;line-height:20px"><b>分配建议</b></div>',
                        '<table width="700"  border="1" cellspacing="0px" style="margin-left:50px;line-height:20px;border-collapse:collapse">',
                        '<tr><th>本任务既往使用样品情况</th><th>申请人既往样品使用情况</th><th>分配建议</th><th>取用次序</th><th>大洋协会分配建议</th><th>备注</th></tr>',
                        '<tpl for="AllocationsStore">',
                            '<tr><td><span >{data.taskPreviousUsage}</span></td><td>{data.supplierPreviousUsage}</td><td>{data.suggestion}</td><td>{data.useOrder}</td><td>{data.oiSuggestion}</td><td></td></tr>',
                        '</tpl>',
                        '</table><br>',
                '</tpl>',
                '<tpl if="this.AllocationIndoorShow()">',
                    '<div id="allocationInfor{data.id}" style="padding-left:30px;line-height:20px"><b>分配建议</b></div>',
                        '<table width="700"  border="1" cellspacing="0px" style="margin-left:50px;line-height:20px;border-collapse:collapse">',
                        '<tr><th>本任务既往使用样品情况</th><th>申请人既往样品使用情况</th><th>分配建议</th><th>大洋协会分配建议</th><th>备注</th></tr>',
                        '<tpl for="AllocationsStore">',
                            '<tr><td><span >{data.taskPreviousUsage}</span></td><td>{data.supplierPreviousUsage}</td><td>{data.suggestion}</td><td>{data.oiSuggestion}</td><td></td></tr>',
                        '</tpl>',
                        '</table><br>',
                '</tpl>',
                '<tpl if="this.DiscussionsShow()">',
                    '<div id="discussionList{data.id}" style="padding-left:30px;line-height:20px"><b>审议记录</b></div>',
                    '<tpl for="DiscussionsStore">',
                        '<tpl if="this.colorChange(data.auditerID)">',
                            '<span style="padding-left:50px;line-height:20px"  auditor="{data.auditerID}" auditType="{data.discussType}" sampleID="{[values.getSample().data.id]}">', '<tpl if="data.discussType == \'SmeDiscuss\'">', '专家委员会委员审议', '<tpl else>', '专家委员会主任审议', '</tpl>', '&nbsp;&nbsp;&nbsp;&nbsp;{data.companyName}&nbsp;&nbsp;&nbsp;&nbsp;{data.createTime:date("Y/m/d")}&nbsp;&nbsp;&nbsp;&nbsp;审议{[Soims.model.applicationAuditing.ContentType[values.data.contentType].name]}</span><br/>',
                        '<tpl else>',
                            '<span style="padding-left:50px;line-height:20px;color:red"  auditor="{data.auditerID}" auditType="{data.discussType}" sampleID="{[values.getSample().data.id]}">', '<tpl if="data.discussType == \'SmeDiscuss\'">', '专家委员会委员审议', '<tpl else>', '专家委员会主任审议', '</tpl>', '&nbsp;&nbsp;&nbsp;&nbsp;{data.companyName}&nbsp;&nbsp;&nbsp;&nbsp;{data.createTime:date("Y/m/d")}&nbsp;&nbsp;&nbsp;&nbsp;审议{[Soims.model.applicationAuditing.ContentType[values.data.contentType].name]}</span><br/>',
                        '</tpl>',
                    '</tpl>',
                    '<hr align="left" style="margin-left:30px" width="700"></hr>',
                    '<tpl if="this.DiscussionButtonsShow()">',
                        '<p style="text-align: center;"><button  id="dicussionagree{data.id}">同意</button>   <button  id="dicussionunagree{data.id}">拟同意</button>   <button  id="dicussiondisagree{data.id}">不同意</button></p>',
                    '</tpl>',
                    '<p>&nbsp;</p>',
                '</tpl>',
            '</tpl>',
            {
                colorChange: function (id, type) {
                    var userid = Soims.currentUser.id;
                    var auditType = Soims.model.applicationAuditing.AuditType.getAuditTypeByUserRole(Soims.currentUser.currentRoleCode);
                    if (id == userid && type == auditType.value) {
                        return false;
                    }
                    else {
                        return true;
                    }
                },
                formatChange: function (type) {
                    var voyageCharger = Soims.model.applicationAuditing.AuditType.VoyageChargerAudit.value;
                    var legCharger = Soims.model.applicationAuditing.AuditType.LegChargerAudit.value;
                    if (type == voyageCharger || type == legCharger) {
                        return true;
                    }
                    else return false;
                },
                AllocationIndoorEdit: function () {
                    if (this.tplParam == Soims.model.application.SamplePanelType.AllocationIndoorEdit.value)
                        return true;
                    else return false;
                },
                AllocationOutdoorEdit: function () {
                    if (this.tplParam == Soims.model.application.SamplePanelType.AllocationOutdoorEdit.value)
                        return true;
                    else return false;
                },
                AllocationOutdoorShow: function () {
                    if (this.tplParam == Soims.model.application.SamplePanelType.DiscussionOutShow.value ||
                        this.tplParam == Soims.model.application.SamplePanelType.DiscussionOutEdit.value ||
                        this.tplParam == Soims.model.application.SamplePanelType.AllocationOutdoorShow.value)
                        return true;
                    else return false;
                },
                AllocationIndoorShow: function () {
                    if (this.tplParam == Soims.model.application.SamplePanelType.DiscussionIndoorShow.value ||
                        this.tplParam == Soims.model.application.SamplePanelType.DiscussionIndoorEdit.value ||
                        this.tplParam == Soims.model.application.SamplePanelType.AllocationIndoorShow.value)
                        return true;
                    else return false;
                },
                AuditButtonShow: function () {
                    if (this.tplParam == Soims.model.application.SamplePanelType.AuditEdit.value) return true;
                    else return false;
                },
                DiscussionsShow: function () {
                    if (this.tplParam == Soims.model.application.SamplePanelType.AuditShow.value ||
                    this.tplParam == Soims.model.application.SamplePanelType.AuditEdit.value)
                        return false;
                    else return true;
                },
                DiscussionButtonsShow: function () {
                    if (this.tplParam == Soims.model.application.SamplePanelType.DiscussionIndoorEdit.value ||
                    this.tplParam == Soims.model.application.SamplePanelType.DiscussionOutEdit.value)
                        return true;
                    else return false;
                }
            }
        )
    }],
    initComponent: function () {
        this.getPlugin('sampleGridExpander').setXTemplateParams(this.panelType);
        this.store = Ext.create('Soims.store.application.common.Sample');
        this.leg = '';
        this.legID = '';
        this.deleteid = '';
        this.title = this.isAudit ? '<span>样品列表</span><span style="font-size:12px;color:#FF0000">[请逐条样品进行审核]</span>' : '样品列表';
        this.columns = [
        {
            xtype: 'rownumberer'
        }, {
            text: '样品类型',
            width: 100,
            sortable: false,
            dataIndex: 'sampleType'
        }, {
            text: '所在航段',
            width: 100,
            sortable: false,
            dataIndex: 'leg',
            hidden: this.type == 'V2' || this.type == 'V3' || this.type == 'V4' ? true : false
        }, {
            text: '使用目的',
            width: 150,
            sortable: true,
            dataIndex: 'usePurpose'
        }, {
            text: '分析测试项目、指标',
            width: 290,
            sortable: true,
            dataIndex: 'anlyseTestProject'
        }, {
            text: '采样区域',
            width: 220,
            sortable: true,
            dataIndex: 'samplingArea'
        }];
        this.on('selectionchange', this.selectionChange);
        this.callParent();
    },
    selectionChange: function (selModel, records) {
        var agree = Ext.get('sampleagree' + records[0].get('id'));
        var unagree = Ext.get('sampleunagree' + records[0].get('id'));
        var disagree = Ext.get('sampledisagree' + records[0].get('id'));

        var dicussAgree = Ext.get('dicussionagree' + records[0].get('id'));
        var dicussUnagree = Ext.get('dicussionunagree' + records[0].get('id'));
        var dicussDisagree = Ext.get('dicussiondisagree' + records[0].get('id'));

        var save = Ext.get('saveAllocation' + records[0].get('id'));

        var self = this;
        if (agree != undefined) {
            agree.on('click', function () {
                self.onAuditClick(records[0], Soims.model.applicationAuditing.ContentType.Agree, records[0].get('id'));
            });
            unagree.on('click', function () {
                self.onAuditClick(records[0], Soims.model.applicationAuditing.ContentType.Doubt, records[0].get('id'));
            });
            disagree.on('click', function () {
                self.onAuditClick(records[0], Soims.model.applicationAuditing.ContentType.Reject, records[0].get('id'));
            });
        }
        if (dicussAgree != undefined) {
            dicussAgree.on('click', function () {
                self.onDiscussClick(records[0], Soims.model.applicationAuditing.ContentType.Agree, records[0].get('id'));
            });
            dicussUnagree.on('click', function () {
                self.onDiscussClick(records[0], Soims.model.applicationAuditing.ContentType.Doubt, records[0].get('id'));
            });
            dicussDisagree.on('click', function () {
                self.onDiscussClick(records[0], Soims.model.applicationAuditing.ContentType.Reject, records[0].get('id'));
            });
        }
        if (save != undefined) {
            save.on('click', function () {
                var allocatID = arguments[1].id.toString().replace(/saveAllocation/gi, '');
                self.onSaveClick(allocatID);
            });
        }
    },
    onAuditClick: function (record, type, sampleID) {
        var auditType = Soims.model.applicationAuditing.AuditType.getAuditTypeByUserRole(Soims.currentUser.currentRoleCode);
        var sampleID = record.get('id');
        Ext.Ajax.request({
            url: Soims.service.ApplicationAuditings.SampleAuditService + '/Auditing',
            params: { ContentType: type.value, AuditType: auditType.value, SampleID: sampleID },
            scope: this,
            success: function () {
                Ext.Tools.Msg('审核完成', 0);
                this.auditRowBodyChange(type, sampleID);
            }
        });
    },
    onDiscussClick: function (record, type, sampleID) {
        var sampleID = record.get('id'),
            discussType = Soims.model.applicationDiscussion.DiscussType.getDiscussTypeByUserRole(Soims.currentUser.currentRoleCode);
        Ext.Ajax.request({
            url: Soims.service.discussion.SampleDiscussionService + '/Discussing',
            params: { ContentType: type.value, DiscussType: discussType.value, SampleID: sampleID },
            scope: this,
            success: function () {
                Ext.Tools.Msg('审议完成', 0);
                this.discussRowBodyChange(type, sampleID);
            }
        });
    },
    onSaveClick: function (sampleID) {
        var area = document.getElementById('allocationTb' + sampleID).getElementsByTagName('textarea')[0];
        var allocationId;
        if (area != undefined) {
            allocationId = area.id.toString().replace(/allocationTd/gi, '');
            Ext.Ajax.request({
                url: Soims.service.samples.SampleAllocationService + '/Save',
                params: { id: allocationId, suggestion: area.value },
                scope: this,
                success: function () {
                    Ext.Tools.Msg('修改完成', 0);
                }
            });
        }
    },
    auditRowBodyChange: function (type, sampleID) {
        var self = this;
        var element = self.getView().el;
        var userid = Soims.currentUser.id;
        var auditType = Soims.model.applicationAuditing.AuditType.getAuditTypeByUserRole(Soims.currentUser.currentRoleCode);
        var querystr = "span[auditor='" + userid + "'][auditType=" + auditType.value + "][sampleID=" + sampleID + "]";
        var span = Ext.query(querystr);
        var info = this.getAuditInfo();
        if (span[0] == undefined) {
            var date = new Date();
            var list = Ext.get('auditList' + sampleID);
            var domstr = "<span style='padding-left:50px;line-height:20px;color:red' auditor='" + userid + "' auditType='" + auditType.value + "' sampleID='" + sampleID + "'>" + info + "&nbsp;&nbsp;&nbsp;&nbsp;" + date.toLocaleDateString() + "&nbsp;&nbsp;&nbsp;&nbsp;审核" + type.name + "</span><br/>";
            Ext.DomHelper.insertAfter(list, domstr);
        }
        else {
            var date = new Date();
            var spanel = Ext.get(span[0]);
            var textstr = info + "&nbsp;&nbsp;&nbsp;&nbsp;" + date.toLocaleDateString() + "&nbsp;&nbsp;&nbsp;&nbsp;审核" + type.name;
            Ext.DomHelper.overwrite(spanel, textstr);
            Ext.DomHelper.applyStyles(spanel, "color:red;");
        }
        self.getView().refreshSize();

    },
    getAuditInfo: function () {
        var roleCode = Soims.currentUser.currentRoleCode,
            info = Soims.model.applicationAuditing.AuditType.getAuditTypeByUserRole(Soims.currentUser.currentRoleCode).name + '&nbsp;&nbsp;&nbsp;&nbsp;';
        if (roleCode == 'VS' || roleCode == 'LS') {
            info += Soims.currentUser.name;
        } else {
            info += Soims.currentUser.department;
        }
        return info;
    },
    discussRowBodyChange: function (type, sampleID) {
        var self = this;
        var element = self.getView().el;
        var userid = Soims.currentUser.id;
        var auditType = Soims.model.applicationDiscussion.DiscussType.getDiscussTypeByUserRole(Soims.currentUser.currentRoleCode);
        var querystr = "span[auditor='" + userid + "'][auditType=" + auditType.value + "][sampleID=" + sampleID + "]";
        var span = Ext.query(querystr);
        if (span[0] == undefined) {
            var date = new Date();
            var list = Ext.get('discussionList' + sampleID);
            var domstr = "<span style='padding-left:50px;line-height:20px;color:red' auditor='" + userid + "' auditType='" + auditType.value + "' sampleID='" + sampleID + "'>" + auditType.name + "&nbsp;&nbsp;&nbsp;&nbsp;" + Soims.currentUser.department + "&nbsp;&nbsp;&nbsp;&nbsp;" + date.toLocaleDateString() + "&nbsp;&nbsp;&nbsp;&nbsp;审议" + type.name + "</span><br/>";
            Ext.DomHelper.insertAfter(list, domstr);
        }
        else {
            var date = new Date();
            var spanel = Ext.get(span[0]);
            var textstr = auditType.name + "&nbsp;&nbsp;&nbsp;&nbsp;" + Soims.currentUser.department + "&nbsp;&nbsp;&nbsp;&nbsp;" + date.toLocaleDateString() + "&nbsp;&nbsp;&nbsp;&nbsp;审议" + type.name;
            Ext.DomHelper.overwrite(spanel, textstr);
            Ext.DomHelper.applyStyles(spanel, "color:red;");
        }
        self.getView().refreshSize();
    }
});
