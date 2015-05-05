Ext.define('Soims.controller.tree.Tree', {
    extend: 'Ext.app.Controller',
    views: ['tree.TreeWindow', 'tree.TreeField'],
    refs: [{
        ref: 'treeWindow',
        selector: 'treeWindow'
    }, {
        ref: 'treeField',
        selector: 'treeField',
        autoCreate: true,
        xtype: 'treeField'
    }],
    init: function () {
        this.control({
            'treeWindow>treePanel': {
                checkchange: function (node, checked) {
                    if (checked) {
                        node.eachChild(function (child) {
                            this.chd(child, true);
                        }, this);
                    } else {
                        node.eachChild(function (child) {
                            this.chd(child, false);
                        }, this);
                    }
                    this.parentnode(node); // 进行父级选中操作
                }
            },
            'treeWindow button[itemId=cancel]': {
                click: function (button, e) {
                    var window = button.up('window');
                    window.close();
                    var view = window.treeField;
                    view.down('textfield').setValue('');
                }
            },
            'treeWindow button[itemId=determine]': {
                click: function (button, e) {
                    var window = button.up('window');
                    var view = window.treeField;
                    var tree = window.down('panel');

                    var names = this.getCheckedChildNames(tree);
                    var value = '';
                    Ext.Array.each(names, function (name) {
                        value = value + '【' + name + '】';
                    });

                    view.setValue(this.getCheckedChildIds(tree));
                    view.down('textfield').setValue(value);
                    window.hide();
                }
            }
        });
    },
    showWindow: function (panelView, extraParam) {
        var id = panelView.windowId;
        var window = Ext.ComponentQuery.query('#' + id, window)[0];

        if (window) {
            window.setVisible(true);
        } else {
            var view = this.getTreeTreeWindowView();
            var storePath = panelView.storePath;
            var title = panelView.windowTitle;
            var treeField = panelView;
            Ext.create(view, { storePath: storePath, extraParam: extraParam, title: title, id: id, treeField: treeField });
        }
    },
    nodep: function (node) {
        var bnode = true;
        Ext.Array.each(node.childNodes, function (v) {
            if (!v.data.checked) {
                bnode = false;
                return;
            }
        });
        return bnode;
    },
    parentnode: function (node) {
        if (node.parentNode != null) {
            if (this.nodep(node.parentNode)) {
                node.parentNode.set('checked', true);
            } else {
                node.parentNode.set('checked', false);
            }
            this.parentnode(node.parentNode);
        }
    },
    chd: function (node, check) {
        node.set('checked', check);
        if (node.isNode) {
            node.eachChild(function (child) {
                this.chd(child, check);
            }, this);
        }
    },
    getCheckedAllNames: function (tree) {
        var records = tree.getView().getChecked();
        var names = [];
        Ext.Array.each(records, function (rec) {
            names.push(rec.get('text'));
        });
        return names;
    },
    getCheckedChildNames: function (tree) {
        var records = tree.getView().getChecked();
        var names = [];
        Ext.Array.each(records, function (rec) {
            if (rec.get('leaf')) {
                names.push(rec.get('text'));
            }
        });
        return names;
    },
    getCheckedAllIds: function (tree) {
        var records = tree.getView().getChecked();
        var names = [];
        Ext.Array.each(records, function (rec) {
            names.push(rec.get('id'));
        });
        return names;
    },
    getCheckedChildIds: function (tree) {
        var records = tree.getView().getChecked();
        var names = [];
        Ext.Array.each(records, function (rec) {
            if (rec.get('leaf')) {
                names.push(rec.get('id'));
            }
        });
        return names;
    },
    getCon: function (projectPath) {
        var loginApp = this.application;
        return loginApp.getController(projectPath);
    }
});