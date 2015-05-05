Ext.define("Soims.view.tree.TreeWindow", {
    extend: 'Ext.window.Window',
    alias: 'widget.treeWindow',
    closable: false,
    requires: ['Soims.view.tree.TreePanel'],
    autoShow: true,
    initComponent: function () {
        Ext.require(this.storePath);
        var store = Ext.create(this.storePath);
        if (this.extraParam) { // extraParam格式为{index: '', value: ''}
            store.getProxy().setExtraParam(this.extraParam.index, this.extraParam.value);
        }
        
        this.items = [{
            xtype: 'treePanel',
            store: store
        }];
        this.buttons = [{
            text: '确定',
            xtype: 'button',
            itemId: 'determine',
            action: 'determine'
        }, {
            text: '取消',
            xtype: 'button',
            itemId: 'cancel',
            action: 'cancel'
        }];
        this.callParent();
    }
});