<template>
  <div class="pio-wrapper">
    <i class="iconfont icon-account"></i>
    123 123 123
    <el-button type="primary">测试</el-button>
<!--    <el-table-->
    <!--      slot="table"-->
    <!--      ref="table"-->
    <!--      :data="tableData"-->
    <!--      tooltip-effect="dark">-->
    <!--      <el-table-column prop="name" label="姓名"></el-table-column>-->
    <!--      <el-table-column prop="age" label="性别"></el-table-column>-->
    <!--    </el-table>-->
  </div>
</template>

<script>
import { Button } from 'element-ui';

export default {
  name: 'search5',
  components: {
    [Button.name]: Button,
    // [Table.name]: Table,
    // [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      tableData: [
        { name: 2, age: 3 },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.pio-wrapper{
  height: 800px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}
</style>
