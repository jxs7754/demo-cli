<template>
  <div class="pio-layout">
    <div class="pio-header" v-if="hasHeader">
      <slot name="header-left"></slot>
      <div class="pull-right">
        <slot name="header-right"></slot>
      </div>
    </div>
    <div
      class="pio-content"
      :class="{ 'no-footer': hideFooter, 'no-header': !hasHeader }"
      v-loading="loading">
      <template v-if="hideScroll">
        <div class="checked-wrap" v-if="checkedNumber">
          <span class="mr-10">已选择{{ checkedNumber }}条记录</span>
          <slot name="tool-group"></slot>
        </div>
        <slot name="table"></slot>
      </template>
      <el-scrollbar
        v-else
        wrap-class="scroll-wrap"
        ref="layoutScroll">
        <slot name="content"></slot>
      </el-scrollbar>
    </div>
    <div class="pio-footer" v-if="!hideFooter">
      <slot name="footer"></slot>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import loadmore from '@/directives/loadMore.js';

export default {
  name: 'PioLayout',
  directives: {
    loadmore,
  },
  data() {
    return {
      hideFooter: false,
      hideScroll: false,
    };
  },
  props: {
    checkedNumber: {
      type: Number,
    },
    loading: {
      type: Boolean,
    },
    hasHeader: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    scrollTop() {
      this.$refs.layoutScroll.$refs.wrap.scrollTop = 0;
    },
    handleLoadMore() {
      this.$emit('load-more');
    },
  },
  mounted() {
    if (!this.$slots.footer) {
      this.hideFooter = true;
    }
    if (this.$slots.table) {
      this.hideScroll = true;
    }
  },
  updated() {
    this.hideScroll = !!this.$slots.table;
  },
};
</script>
<style lang="scss">
  .pio-layout {
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    overflow: hidden;
    boder:1px solid #ddd;

    .pio-header {
      width: 100%;
      height: 61px;
      border-bottom: 1px solid #ddd;
      padding: 15px 20px;
      line-height: 30px;

      .el-input {
        width: 200px;
      }
    }

    .pull-right {
      float: right;
    }

    .pio-content {
      position: absolute;
      top: 61px;
      bottom: 60px;
      width: 100%;

      &.no-header {
        top: 0;
      }

      &.no-footer {
        bottom: 0;
      }
    }

    .el-scrollbar {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .scroll-wrap {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: auto;
    }

    .el-table__body-wrapper {
      position: absolute;
      top: 41px;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-x: hidden;
      overflow-y: auto;
    }

    .el-table th {
      height: 40px;
      padding: 5px 0;
      background: #f6f9fe;
    }

    .el-table th > .cell {
      height: 30px;
      line-height: 30px;
    }

    .el-table th > .cell > div {
      line-height: 30px;
    }

    .checked-wrap {
      position: absolute;
      top: 0;
      left: 55px;
      right: 0;
      z-index: 1;
      height: 40px;
      line-height: 40px;
      background: #f6f9fe;
      padding-right: 20px;
      color: #666;
      font-size: 12px;
    }

    .pio-footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 61px;
      padding: 15px;
      z-index: 2;
      border-top: 1px solid #ddd;
      text-align: center;
    }
  }

</style>
