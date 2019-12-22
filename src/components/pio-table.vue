<template>
  <el-table
    :data="tableData"
    tooltip-effect="dark"
    @sort-change="sortChange"
    style="width: 100%;height:100%">
    <el-table-column type="selection" width="55" v-if="hasSelection"></el-table-column>
    <el-table-column
      v-for="i in tableInfo"
      :key="i.prop"
      :prop="i.prop"
      :label="i.label"
      :sortable="i.sortable?'custom':false"
      :width="i.width">
      <template slot="header">
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
</template>

<script>
import { Table, TableColumn } from 'element-ui';

export default {
  name: 'pio-table',
  components: {
    ElTable: Table,
    [TableColumn.name]: TableColumn,
  },
  props: {
    tableData: {
      type: Array,
    },
    tableInfo: {
      type: Array,
    },
    hasSelection: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    HeaderRender: {
      props: {
        render: {
          required: true,
        },
      },
      render() {
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
  data() {
    return {};
  },
  methods: {
    sortChange({ column, prop, order }) {
      console.log(column, prop, order);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
