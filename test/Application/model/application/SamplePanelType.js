Ext.define('Soims.model.application.SamplePanelType', {
    statics: {
        AuditShow: { value: 'AuditShow', name: '显示审核意见' },
        AuditEdit: { value: 'AuditEdit', name: '编辑审核意见' },
        AllocationIndoorShow: { value: 'AllocationIndoorShow', name: '显示到入馆分配建议' },
        AllocationIndoorEdit: { value: 'AllocationIndoorEdit', name: '编辑入馆分配建议' },
        AllocationOutdoorShow: { value: 'AllocationOutdoorShow', name: '显示到现场分配建议' },
        AllocationOutdoorEdit: { value: 'AllocationOutdoorEdit', name: '编辑现场分配建议' },
        DiscussionIndoorShow: { value: 'DiscussionIndoorShow', name: '显示到入馆审议意见' },
        DiscussionIndoorEdit: { value: 'DiscussionIndoorEdit', name: '编辑入馆审议意见' },
        DiscussionOutShow: { value: 'DiscussionOutShow', name: '显示到现场审议意见' },
        DiscussionOutEdit: { value: 'DiscussionOutEdit', name: '编辑现场审议意见' },
        /**
        * 根据申请书类型来判断是现场还是室内申请
        * 注意：这个方法写的不好，不能适应枚举状态的变动
        */
        getByAppType: function (appType, isEdit, isDiscuss) {
            var reg = /^b[12]$/gi, res;
            if (reg.test(appType)) { // 现场
                if (isDiscuss) {
                    res = isEdit ? this.DiscussionOutEdit.value : this.DiscussionOutShow.value;
                } else {
                    res = isEdit ? this.AllocationOutdoorEdit.value : this.AllocationOutdoorShow.value;
                }
            } else { // 室内
                if (isDiscuss) {
                    res = isEdit ? this.DiscussionIndoorEdit.value : this.DiscussionIndoorShow.value;
                } else {
                    res = isEdit ? this.AllocationIndoorEdit.value : this.AllocationIndoorShow.value;
                }
            }
            return res;
        }
    }
});