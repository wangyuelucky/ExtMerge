Ext.define('Soims.model.applicationDiscussion.DiscussType', {
    statics: {
        SmeDiscuss: { value: 'SmeDiscuss', name: '专家委员会委员审议', roleCode: 'SME' },
        SmecDiscuss: { value: 'SmecDiscuss', name: '专家委员会主任审议', roleCode: 'SMEC'},
        /**
        *  根据角色，返回审议类型
        */
        getDiscussTypeByUserRole: function (userRole) {
            var obj = {};
            for (var p in this) {
                if (this[p].roleCode === userRole) {
                    obj = this[p];
                    break;
                }
            }
            return obj;
        }
    }
});