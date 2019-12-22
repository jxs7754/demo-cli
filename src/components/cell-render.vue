<script>
export default {
  functional: true,
  props: {
    row: Object,
    render: Function,
    // column: {
    //   type: Object,
    //   default: null,
    // },
  },
  render: (h, ctx) => {
    let { row } = ctx.props;
    console.log(row);
    let render = ctx.props.render(row);
    // if (typeof (render) !== 'object') {
    //   return (<div>{render}</div>);
    // }
    return (render);
  },
};
</script>
