Ext.define("Soims.store.application.common.BoardingUser", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.common.BoardingUser',
    proxy: {
        type: 'ajax',
        url: Soims.service.applications.BoardingUserService + '/QueryBoardingUser',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        },
        listeners: {
            exception: function (proxy, response, options) {
                console.log(response);
                Ext.MessageBox.alert('提示', '请先保存样品信息');
            }
        }
    }
    //    listeners: {
    //        load: function (store, records, successful) {
    //            if (store.getCount() == 0) {
    //                Ext.MessageBox.alert('提示', '请先保存样品信息。', function (btn) {
    //                }, this);
    //            }
    //        }
    //    }
});