<template>
  <div class="pio-wrapper">
    <i class="iconfont icon-account"></i>
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
  name: 'search4',
  components: {
    [Button.name]: Button,
    // [Table.name]: Table,
    // [TableColumn.name]: TableColumn,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>

</style>
