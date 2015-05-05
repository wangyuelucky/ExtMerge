Ext.define("Soims.view.application.common.AnlyseTestProjectGrid", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.anlysetestprojectgrid',
    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1,
        revertInvalid: false // 验证不通过，不回退
    })],
    header: false,
    closable: false,
    store: 'application.common.AddAnlyseTestProject',
    selModel: new Ext.selection.RowModel(),
    emptyText: '没有满足条件的测试项目指标',
    initComponent: function () {
        this.columns = [
            {
                header: '分析测试项目指标',
                dataIndex: 'anlyseTestProject',
                flex: 1
            }, {
                header: '<span>拟提交测试数据<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
                dataIndex: 'intendCommitTestData',
                flex: 1,
                editor: {
                    allowBlank: false
                }
            }, {
                header: '<span>拟提交时间<em style="font-style:normal;font-size:12px;color:#FF0000">（必填）</em></span>',
                dataIndex: 'commitTestDataTime',
                flex: 1,
                renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                editor: {
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    allowBlank: false,
                    minValue: new Date()
                }
            }];

        this.callParent();
    },
    listeners: {
        validateedit: function (editor, e) {
            var cellEditor = editor.getEditor(e.record, e.column);
            cellEditor.revertInvalid = false;
        }
    }
});

