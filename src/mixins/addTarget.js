import AddTarget from '@/views/target-manage/comp/add-target';

export default {
  components: {
    AddTarget,
  },
  data() {
    return {
      targetVisible: false,
    };
  },
  methods: {
    addProject() {
      this.targetVisible = true;
    },
  },
};
