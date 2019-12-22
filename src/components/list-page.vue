<template>
  <pio-layout class="pio-wrapper" v-loading="tableLoading">
    <template slot="header-left" v-if="searchFormList&&searchFormList.length">
      <el-form ref="form" style="display: inline-block;" :model="searchForm" :inline="true">
        <el-form-item v-for="i in searchFormList" :key="i.key" :label="i.label">
          <template v-if="i.type === 'text'">
            <el-input v-model="searchForm[i.key]"></el-input>
          </template>
          <template v-if="i.type === 'date'">
            <el-input v-model="searchForm[i.key]"></el-input>
          </template>
          <template v-if="i.type === 'select'">
            <el-input v-model="searchForm[i.key]"></el-input>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleSearch" type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template slot="header-right">
      <el-button type="primary" @click="handleAdd" v-if="addFun">新增</el-button>
    </template>
    <el-table
      @selection-change="handleSelectionChange"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;height:100%">
      <el-table-column
        v-for="i in tableInfo"
        :key="i.prop"
        :prop="i.prop"
        :label="i.label"
        :width="i.width">
        <template slot="header" >
          <template v-if="i.headerRender">
            <header-render :render="i.headerRender"></header-render>
          </template>
          <template v-else>
            {{i.label}}
          </template>
        </template>
        <template slot-scope="{row}">
          <template v-if="i.isRender">
            <cell-render :render="i.render" :row="row"></cell-render>
          </template>
          <template v-else>
            {{row[i.prop]}}
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      slot="footer"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="prev, pager, next, sizes"
      :total="totalCount>10000?10000:totalCount">
    </el-pagination>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="visible"
      width="500px"
      :title="formTitle"
      @close="handleClose">
      <el-form ref="form" :model="form" :rules="formRule" label-width="80px">
        <el-form-item v-for="i in formList" :key="i.key" :label="i.label" :prop="i.key">
          <el-input v-model="form[i.key]"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <edit-dialog></edit-dialog>
  </pio-layout>
</template>

<script>
import PioLayout from './layout.vue';
import tableMix from '../mixins/table-mix.js';
import EditDialog from './edit-dialog.vue';

function transObj(arr, key) {
  let obj = {};
  arr.forEach((item) => {
    obj[item[key]] = '';
  });
  return obj;
}

export default {
  name: 'list-page',
  components: {
    EditDialog,
    PioLayout,
    HeaderRender: {
      props: {
        render: {
          required: true,
        },
        row: {
          type: Object,
        },
      },
      render() {
        console.log(this.row);
        return this.render();
      },
    },
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
  props: {
    searchFormList: {
      type: [Array],
    },
    getListFun: {
      type: [Function],
    },
    deleteFun: {
      type: Function,
    },
    formList: {
      type: Array,
    },
    addFun: {
      type: Function,
    },
    updateFun: {
      type: Function,
    },
  },
  mixins: [tableMix],
  data() {
    return {
      searchForm: transObj(this.searchFormList, 'key'),
      tableData: [
        {
          name: 'ddd',
          sex: 2,
        },
        {
          name: 'xxx',
          sex: 3,
        },
      ],
      visible: false,
      formTitle: '新增',
      form: transObj(this.formList, 'key'),
      formRule: {},
      keyword: '1234',
      tableInfo: [
        { label: '姓名', prop: 'name' },
        { label: '性别', prop: 'sex' },
        {
          label: 'age',
          isRender: true,
          render: (row) => <span>{row.sex}</span>,
          headerRender: () => <el-input vModel={this.keyword}></el-input>,
        },
        {
          label: '操作',
          isRender: true,
          render: (row) => <div>
            {this.deleteFun ? <el-button onClick={() => this.handleDelete(row)}>删除</el-button> : ''}
            {this.updateFun ? <el-button onClick={() => this.handleView(row)}>详情</el-button> : ''}
            {this.updateFun ? <el-button onClick={() => this.handleEdit(row)}>编辑</el-button> : ''}
          </div>,
        },
      ],
      postParams: {
        page: 1,
        pageSize: 20,
      },
    };
  },
  methods: {
    input(e) {
      this.keyword = e;
    },
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
    handleSearch() {
      this.beforeGetList();
    },
    handleAdd() {
      this.formTitle = '新增';
      this.visible = true;
    },
    handleEdit(row) {
      this.visible = true;
      this.$nextTick(() => {
        this.form = { ...row };
        this.formTitle = '编辑';
      });
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.visible = false;
    },
    handleConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let fun = this.formTitle === '新增' ? this.addFun : this.updateFun;
          fun(this.form).then(() => {
            this.visible = false;
            this.beforeGetList();
          });
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
    console.log(this.deleteFun);
  },
};
</script>

<style lang="scss" scoped>
.pio-wrapper {
  height: 100%;
}
</style>
