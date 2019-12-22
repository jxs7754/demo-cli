<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="500px"
    :title="title"
    @close="handleClose">
    <el-form ref="form" :model="form" :rules="ruleForm" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'edit-dialog',
  props: {
    form: {
      type: Object,
      default() {
        return {};
      },
    },
    formList: {
      type: Array,
    },
    title: {
      type: String,
    },
    ruleForm: {
      type: Object,
    },
    confirmFun: {
      type: Function,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  render() {
    let arr = [
      { tag: 'el-button', type: 'text', prop: 'name' },
      { tag: 'el-button', type: 'text', prop: 'sex' },
    ];

    return <div>
      {
        arr.map((item) => {
          let str = Object.keys(item);
          return (
            <item.tag type="primary">{item.type}</item.tag>
          );
        })
      }
    </div>;
  },
  methods: {
    handleClose() {
      this.$refs.form.resetFields();
      this.visible = false;
    },
    handleConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.confirmFun(this.form).then(() => {
            this.visible = false;
            this.beforeGetList();
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
