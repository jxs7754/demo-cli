<template>
  <div class="pio-wrapper">
    <i class="iconfont icon-account"></i>
    {{num}}
    <i class="icon-account"></i>
    {{num}}
    <i class="icon-account"></i>
    {{num}}
    <i class="icon-account"></i>
    <div>123</div>
    <img src="images/Idcard.png" alt="">
    <pio-table has-selection :table-data="tableData" :table-info="tableInfo"></pio-table>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js';
import { isArray } from 'lodash-es';
import { fun1 } from '../util';
import search1 from '@/views/search1.vue';
import PioTable from '../components/pio-table.vue';

const searchList = [
  {
    type: 'text',
    key: 'name',
    label: '姓名',
  },
  {
    type: 'text',
    key: 'sex',
    label: '性别',
  },
];
export default {
  name: 'search1',
  components: {
    PioTable,
    search1,
  },
  data() {
    return {
      deleteFun: true,
      updateFun: true,
      keyword: '',
      searchList: [],
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
      tableInfo: [
        { label: '姓名', prop: 'name', width: 150 },
        { label: '性别', prop: 'sex', width: 150 },
        {
          label: '年龄',
          isRender: true,
          render: (row) => <span>{row.sex}</span>,
          headerRender: () => <el-input vModel={this.keyword}></el-input>,
        },
        {
          label: 'age',
          prop: 'des',
          width: 200,
          sortable: true,
        },
        {
          label: '操作',
          width: 250,
          isRender: true,
          render: (row) => <div>
            {this.deleteFun ? <el-button onClick={() => this.handleClick(row)}>删除</el-button> : ''}
            {this.updateFun ? <el-button vOn:click={() => this.handleClick(row)}>详情</el-button> : ''}
            {this.updateFun ? <el-button vOn:click={() => this.handleClick(row)}>编辑</el-button> : ''}
          </div>,
        },
      ],
      num: 1,
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
      let num = new BigNumber(0.1);
      let num1 = new BigNumber(0.2);
      let num2 = num.plus(num1);
      console.log(num2);
      this.num = num2;
    },
  },
  created() {
    // this.searchList = cloneDeep(searchList);
    let ss = isArray(searchList);
    console.log(ss);
    fun1();
  },
};
</script>

<style lang="scss" scoped>

</style>
