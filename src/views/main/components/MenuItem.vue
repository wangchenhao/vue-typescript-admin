<script>
  function createEl(h, model, isCollapse, leafNodeClick) {
    // 判断是否是叶子节点
    const isLeaf = !model.children || model.children.length === 0;
    // 是否显示提示
    const isTooltip = model.parentId === 0 && isLeaf && isCollapse;
    // 获取节点 ID 无 ID 默认为时间戳
    const id = model.id ? model.id.toString() : new Date().getTime().toString();
    // 图标
    const iconEl = model.icon ? <i class={model.icon}></i> : null;
    // menu-item text
    const textEl = isTooltip ? (<el-tooltip effect='dark' placement='right'>
      <div
        style='position:absolute;left: 0;top: 0;height:100%;width:100%;display:inline-block;box-sizing:border-box;padding:0 20px;'>
        {iconEl}
      </div>
      <div slot='content'>{model.text}</div>
    </el-tooltip>) : <div>{iconEl}<span slot='title'>{model.text}</span></div>;

    // 点击方法
    const onClick = (ev) => {
      if (leafNodeClick) leafNodeClick(model, ev);
    };

    if (isLeaf) {
      return (<el-menu-item index={id} on-click={onClick}>{textEl}</el-menu-item>);
    }
    const childrenEl = [];
    model.children.map((item) => {
      childrenEl.push(createEl(h, item, isCollapse, leafNodeClick));
      return true;
    });
    return (
      <el-submenu index={id}>
        <template slot='title'>{textEl}</template>
        {childrenEl}
      </el-submenu>
    );
  }

  export default {
    functional: true,
    render(h, context) {
      return createEl(
        h,
        context.props.model,
        context.parent.isCollapse,
        context.listeners['leaf-node-click'],
      );
    },
  };

</script>
