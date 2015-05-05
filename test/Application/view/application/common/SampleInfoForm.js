Ext.define("Soims.view.application.common.SampleInfoForm", {
    extend: 'Ext.form.Panel',
    alias: 'widget.sampleinfoform',
    requires: ['Soims.view.application.common.AnlyseTestProjectGrid', 'Ext.ux.form.TreeField', 'Ext.ux.form.InputField'],
    title: '样品信息',
    frame: true,
    closable: false,
    collapsible: false,
    titleCollapse: false,
    hasChanged: false,
    autoHeight: true,
    buttonAlign: 'center',
    closeAction: 'destroy',
    initComponent: function () {
        var proxy= {
            type: 'ajax',
            url: Soims.service.samples.SamplingAreaService + '/QuerySamplingAreaByLegOrSampleType',
            async: false,
            reader: {
                type: 'json',
                root: 'root'
            }            
        };
        if (this.legID) {
            proxy.extraParams = {
                legID: this.legID
            };
        }
        var samplingAreaStore = Ext.create('Soims.store.tree.SamplingArea', {
            proxy: proxy
        });


        var treeStore = Ext.create('Soims.store.tree.Tree');
        var usePurposeStore = Ext.create('Soims.store.tree.UsePurpose');
        var anlyseTestProjectStore = Ext.create('Soims.store.tree.AnlyseTestProject');
        var samplePreparationStore = Ext.create('Soims.store.tree.SamplePreparation');
        var involvedSubjectStore = Ext.create('Soims.store.tree.InvolvedSubject');
        var methodStore = Ext.create('Soims.store.tree.SampingMethod');

        this.items = [{
            xtype: 'fieldset',
            title: '基本信息',
            collapsible: false,
            frame: true,
            style: 'background-color: #dfe8f5;',
            layout: 'column',
            items: [{
                columnWidth: .33, //第一列  
                layout: 'form',
                bodyStyle: 'background-color: #dfe8f5;',
                border: 0,
                items: [{
                    xtype: 'treefield',
                    name: 'sampleTypeID', // 很重要，用来赋值
                    singleChecked: true,
                    forbidBlankAndShowStar: true,
                    fieldLabel: '样品类型',
                    pickerTitle: '选择样品类型',
                    tabIndex: 1,
                    store: treeStore
                }, {
                    fieldLabel: '岩心分取方案',
                    pickerTitle: '岩心分取方案',
                    xtype: 'inputfield',
                    tabIndex: 4,
                    name: 'samplingMethodID',
                    store: methodStore
                }, {
                    xtype: 'treefield',
                    name: 'samplingAreaID',
                    fieldLabel: '采样区域',
                    onlyCheckChild: true,
                    loadOnce: true,
                    forbidBlankAndShowStar: true,
                    pickerTitle: '航段所在采样区域',
                    tabIndex: 7,
                    store: samplingAreaStore
                }, {
                    fieldLabel: '总样品件数',
                    tabIndex: 10,
                    forbidBlankAndShowStar: true,
                    xtype: 'textfield',
                    name: 'sampleTotalNumber'
                }]
            }, {
                columnWidth: .33, //第二列
                layout: 'form',
                border: false,
                style: 'margin-left: 20px;',
                bodyStyle: 'background-color: #dfe8f5;',
                items: [{
                    xtype: 'treefield',
                    name: 'usePurposeID',
                    forbidBlankAndShowStar: true,
                    fieldLabel: '使用目的',
                    pickerTitle: '选择使用目的',
                    tabIndex: 2,
                    store: usePurposeStore
                }, {
                    xtype: 'treefield',
                    name: 'anlyseTestProjectID',
                    forbidBlankAndShowStar: true,
                    fieldLabel: '分析测试指标',
                    loadOnce: false,
                    pickerTitle: '选择分析测试指标',
                    tabIndex: 5,
                    store: anlyseTestProjectStore
                }, {
                    fieldLabel: '站位数',
                    tabIndex: 8,
                    forbidBlankAndShowStar: true,
                    xtype: 'textfield',
                    name: 'stationDigit'
                }, {
                    fieldLabel: '单件样品量',
                    tabIndex: 11,
                    forbidBlankAndShowStar: true,
                    xtype: 'textfield',
                    name: 'oneSampleAmount'
                }]
            }, {
                columnWidth: .33, //第三列
                layout: 'form',
                border: false,
                bodyStyle: 'background-color: #dfe8f5;',
                style: 'margin-left: 20px;',
                items: [{
                    xtype: 'treefield',
                    name: 'involvedSubjectID',
                    fieldLabel: '涉及学科',
                    pickerTitle: '选择涉及学科',
                    forbidBlankAndShowStar: true,
                    tabIndex: 3,
                    store: involvedSubjectStore
                }, {
                    xtype: 'treefield',
                    name: 'samplePreparationID',
                    onlyCheckChild: true,
                    fieldLabel: '制样方案',
                    pickerTitle: '选择制样方案',
                    forbidBlankAndShowStar: true,
                    tabIndex: 6,
                    store: samplePreparationStore
                }, {
                    fieldLabel: '各站样品数',
                    tabIndex: 9,
                    forbidBlankAndShowStar: true,
                    xtype: 'textfield',
                    name: 'stationSampleNumber'
                }, {
                    fieldLabel: '其他要求',
                    tabIndex: 12,
                    xtype: 'textfield',
                    name: 'otherRequirements'
                }]
            }]
        }, {
            xtype: 'fieldset',
            title: '样品分析测试项目指标',
            collapsible: false,
            frame: true,
            items: [{
                xtype: 'anlysetestprojectgrid'
            }]
        }, {
            xtype: 'hiddenfield',
            name: 'id'
        }];
        this.buttons = [
          { text: '确定', action: 'add', iconCls: 'Add' }, '-',
          { text: '修改', action: 'save', iconCls: 'Disk', disabled: true },
          { text: '删除', action: 'delete', iconCls: 'Delete', disabled: true }, '-',
          { text: '完成', itemId: 'finish', style: 'margin-left:30px', action: 'finish', iconCls: 'Accept', disabled: false },
          { text: '完成克隆', itemId: 'clone', action: 'clone', iconCls: 'Accept', hidden: true }
        ];

        this.callParent(arguments);
    }
});