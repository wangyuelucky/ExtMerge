Ext.define("Soims.view.application.common.SampleGrid", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.samplegrid',
    title: '样品列表',
    viewConfig: { emptyText: '没有满足条件的拟申请样品' },
    minHeight: 200,
    padding: '2 2 2 2',
    //features: [{ ftype: 'grouping'}],
    selModel: {
        mode: "MULTI"
    },
    hidden: this.isShow==true,
    selType: 'rowmodel',
    initComponent: function () {
        
        this.store = Ext.create('Soims.store.application.common.Sample');
        if (this.type == 'V1' || this.type == 'B1' || this.type == 'B2') {
            this.features = [{ ftype: 'grouping'}];
        }
        this.leg = '';
        this.legID = '';
        this.deleteid = '';
        this.columns = [
        {
            xtype: 'rownumberer'
        }, {
            text: '样品类型',
            locked: true,
            width: 150,
            sortable: false,
            dataIndex: 'sampleType'
        }, {
            text: '所在航段',
            locked: true,
            width: 100,
            sortable: false,
            dataIndex: 'leg',
            hidden: this.type == 'V2' || this.type == 'V3' || this.type == 'V4' ? true : false
        }, {
            text: '使用目的',
            lockable: false,
            width: 100,
            sortable: true,
            dataIndex: 'usePurpose'
        }, {
            text: '涉及学科',
            width: 100,
            sortable: false,
            dataIndex: 'involvedSubject'
        }, {
            text: '岩心分取方案',
            width: 200,
            sortable: true,
            dataIndex: 'samplingMethod'
        }, {
            text: '制样方案',
            width: 100,
            sortable: true,
            dataIndex: 'samplePreparation'
        }, {
            text: '分析测试项目、指标',
            width: 230,
            sortable: true,
            dataIndex: 'anlyseTestProject'
        }, {
            text: '采样区域',
            width: 220,
            sortable: true,
            dataIndex: 'samplingArea'
        }, {
            text: '站位数',
            width: 100,
            sortable: true,
            dataIndex: 'stationDigit'
        }, {
            text: '各站样品数',
            width: 100,
            sortable: true,
            dataIndex: 'stationSampleNumber'
        }, {
            text: '总样品件数',
            width: 100,
            sortable: true,
            dataIndex: 'sampleTotalNumber'
        }, {
            text: '单件样品量',
            width: 100,
            sortable: true,
            dataIndex: 'oneSampleAmount'
        }, {
            text: '其它',
            width: 100,
            sortable: true,
            dataIndex: 'otherRequirements'
        }];

        this.tbar = {
            hidden: this.isShow,
            items: [{
                text: '添加样品',
                xtype: 'button',
                itemId: 'sampleAdd',
                iconCls: 'Add'
            }, {
                text: '修改',
                itemId: 'sampleModify',
                disabled: true,
                xtype: 'button',
                iconCls: 'Disk'
            }, {
                text: '删除',
                itemId: 'sampleDelete',
                disabled: true,
                xtype: 'button',
                iconCls: 'Delete'
            }, {
                text: '样品克隆',
                itemId: 'sampleClone',
                xtype: 'button',
                disabled: true,
                iconCls: 'Add',
                hidden: this.type == 'V2' || this.type == 'V3' || this.type == 'V4' ? true : false
            }, {
                text: '(复制选中样品到指定航段)',
                xtype: 'label',
                style: 'font-size:12px;color:#FF0000',
                hidden: this.type == 'V2' || this.type == 'V3' || this.type == 'V4' ? true : false
            }, {
                text: '整航段样品克隆',
                itemId: 'sampleLegClone',
                xtype: 'button',
                disabled: false,
                iconCls: 'Add',
                hidden: this.type == 'V2' || this.type == 'V3' || this.type == 'V4' ? true : false

            }]
        };
        this.on('selectionchange', this.buttonChange);
        this.callParent();
    },

    buttonChange: function (selModel, records) {

        if (records.length > 0) {
            this.down('#sampleClone').setDisabled(false);
            this.down('#sampleDelete').setDisabled(false);
            this.down('#sampleModify').setDisabled(false);

            if (records.length > 1) {
                this.down('#sampleModify').setDisabled(true);
                this.down('#sampleDelete').setDisabled(false);
                this.down('#sampleClone').setDisabled(false);
            }
        }
        else {
            this.down('#sampleClone').setDisabled(true);
            this.down('#sampleModify').setDisabled(true);
            this.down('#sampleDelete').setDisabled(true);
        }
    }
});
