<template>
  <div class="pio-wrapper">
    <i class="iconfont icon-account"></i>
    <el-button type="primary">测试</el-button>
    <list :list="tableData"></list>
    1234 12341234512dd12322123dd123123ddd
    {{keyList}}
    <img src="images/group.png" alt="">
    <el-table
      slot="table"
      ref="table"
      :data="tableData"
      tooltip-effect="dark">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="性别"></el-table-column>
    </el-table>

  </div>
</template>

<script>
import { Button, Table, TableColumn } from 'element-ui';
import List from '../components/list.vue';

export default {
  name: 'search6',
  components: {
    List,
    [Button.name]: Button,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      tableData: null,
      keyList: [],
    };
  },
  methods: {},
  created() {
    let obj1 = { name: 1, age: 2 };
    let obj = {
      sex: 3,
    };
    let obj2 = { ...obj1, ...obj };
    this.keyList = Object.keys(obj2).map((ind) => ind);
    let arr = [
      ...[1,2,3].map((item)=>{
        return item+1;
      })
    ]

  },
};
</script>

<style lang="scss">
@import './index.scss';
</style>
