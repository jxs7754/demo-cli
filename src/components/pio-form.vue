<template>
  <el-form ref="form" :model="form" :rules="ruleForm" label-width="80px">
    <el-form-item label="活动名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'pio-form',
  data() {
    return {
      form: {},
      ruleForm: {
        name: '',
      },
      formList: [
        {
          label: '姓名',
          prop: 'name',
          type: 'text',
        },
        {
          label: '性别',
          prop: 'sex',
          type: 'select',

        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>

</style>
