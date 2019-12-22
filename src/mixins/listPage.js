import PioLayout from '../components/layout.vue';
import tableMix from './table-mix';

export default {
  name: 'list-page',
  components: {
    PioLayout,
    CellRender: {
      props: {
        render: {
          required: true,
        },
        row: {
          type: Object,
        },
      },
      render() {
        return this.render(this.row);
      },
    },
  },
  mixins: [tableMix],
  data() {
    return {
      searchList: [],
      searchForm: {},
      getListFun: null,
      deleteFun: null,
      addFun: null,
      updateFun: null,
      searchFormList: [],
      visible: false,
      formTitle: '新增',
      form: {},
      formList: [],
      formRule: {},
      tableInfo: [
        {
          label: '姓名',
          prop: 'name',
        },
        {
          label: '性别',
          prop: 'sex',
        },
        {
          label: '操作',
          isRender: true,
          render: (row) => <div>
            <el-button onClick={() => this.handleView(row)}>详情</el-button>
            <el-button onClick={() => this.handleEdit(row)}>编辑</el-button>
            <el-button onClick={() => this.handleDelete(row)}>删除</el-button>
          </div>,
        },
      ],
    };
  },
  methods: {
    getTableList() {
      this.tableLoading = true;
      this.getListFun()
        .then((res) => {
          this.tableLoading = false;
          this.tableData = res.data;
          this.total = res.total;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    handleAdd() {
      this.formTitle = '新增';
      this.visible = true;
    },
    handleEdit(row) {
      console.log(row);
      this.formTitle = '编辑';
      this.visible = true;
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.visible = false;
    },
    handleConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.formTitle === '新增') {
            this.addFun(this.form)
              .then(() => {
                this.beforeGetList();
              });
          } else {
            this.updateFun(this.form)
              .then(() => {
                this.beforeGetList();
              });
          }
        } else {
          return false;
        }
      });
    },
    handleView(row) {
      console.log(row);
    },
    handleDelete(row) {
      this.deleteConfirm({
        title: '确定要删除该条数据',
      }, this.deleteFun, row)
        .then(() => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 3000,
            showClose: true,
          });
          this.getTableList();
        });
    },
  },
  created() {
    // this.getTableList();
  },
};
