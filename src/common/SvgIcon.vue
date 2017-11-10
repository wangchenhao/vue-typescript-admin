<script>
  import Icons from '../assets/icons';

  export default {
    functional: true,
    props: {
      name: String,
    },
    render(h, context) {
      const { name } = context.props;
      const icon = Icons[name];
      if (icon) {
        const iconClass = `svg-icon svg-icon-${name}`;
        const iconId = `#${icon.id}`;
        return (<svg aria-hidden="true" class={iconClass}>
          <use xlinkHref={iconId}></use>
        </svg>);
      }
      return (<svg></svg>);
    },
  };

</script>
<style lang="scss">
  svg.svg-icon {
    overflow: hidden;
    width: 1em;
    height: 1em;
    vertical-align: -.15em;
    fill: currentColor;
  }

</style>
