export default {
  data() {
    return {
      isObject: false,
      downloadId: '',
      downloadType: '',
      isBatch: false,
    };
  },
  methods: {
    handleRightClick(type, data) {
      switch (type) {
        case 'add':
        case 'copy':
        case 'move':
          this.handleData = [data];
          this.targetVisible = true;
          this.handleType = type;
          break;
        case 'label':
          this.tagVisible = true;
          this.isObject = true;
          this.handleData = [data];
          break;
        case 'delete':
          this.handleData = [data];
          this.handleDelete();
          break;
        case 'download':
          this.downloadType = data.downloadType;
          this.downloadId = data.uuid || data.objectId || data.xihuId;
          this.downloadVisible = true;
          this.isBatch = false;
          break;
        default:
      }
    },
  },
};
