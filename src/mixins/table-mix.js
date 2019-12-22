/**
 * Created by jinxiaoshuai on 2017/10/30.
 */
const tableMix = {
  data() {
    return {
      tableData: [],
      selectedData: [],
      page: 1,
      pageSize: 20,
      pageSizes: [2, 10, 20, 30, 40, 50],
      totalCount: 0,
      tableLoading: false,
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.selectedData = val;
    },
    // 分页大小改变
    handleSizeChange(size) {
      this.pageSize = size;
      this.postParams.pageSize = size;
      this.beforeGetList();
    },
    // 多少页
    handleCurrentChange(page) {
      this.postParams.pageNum = page;
      this.getTableList();
    },
    beforeGetList(page) {
      page = page || 1;
      this.page = page;
      this.handleCurrentChange(page);
    },
  },
};

export default tableMix;
