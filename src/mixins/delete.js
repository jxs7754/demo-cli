/**
 * Created by jinxiaoshuai on 2017/11/17.
 */
const deleteMix = {
  methods: {
    /*
     * msg需要展示的信息一般只改title 内容
     * fun 点击确定触发的函数
     * funMsg 触发函数中需要的参数
     * hasThen 是否需要返回Promise.resolve()
     * leng 删除的个数
     * */
    deleteConfirm(msg, fun, funMsg) {
      return this.$confirm(msg.title, '提示', {
        closeOnClickModal: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: msg.type || 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            fun(funMsg)
              .then(() => {
                instance.confirmButtonLoading = false;
                done();
              })
              .catch((err) => {
                instance.confirmButtonLoading = false;
                return Promise.reject(err);
              });
          } else {
            instance.confirmButtonLoading = false;
            done();
          }
        },
      })/* eslint-disable-next-line */
        .then((res) => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 3000,
            showClose: true,
          });
          if (msg.hasThen) {
            return Promise.resolve(res);
          }
          let page = this.postParams.pageNum;
          let tableLength = this.tableData.length;
          let deleteLength = msg.leng || 1;
          if (deleteLength === tableLength) {
            if (page === 1) {
              this.tableData = [];
            } else {
              this.beforeGetList(page - 1);
            }
          } else {
            this.getTableList();
          }
        })
        .catch((err) => {
          if (err !== 'cancel') {
            console.error(err);
          }
          return Promise.reject(err);
        });
    },
  },
};

export default deleteMix;
