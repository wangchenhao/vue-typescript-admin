import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
class MenuItem extends Vue {

  @Prop({ default: {}, type: Object })
  model: { [key: string]: any };

  render(h: Function) {
    return this.createEl(h, this.model);
  }
  /**
   * 判断是否是叶子节点
   * @param {any} model [数据]
   */
  isLeaf(model: any) {
    return !model.children || model.children.length === 0;
  }
  /**
   * 获取节点 ID 无 ID 默认为时间戳
   * @param {any} model [数据]
   */
  getId(model: any) {
    return model.id ? model.id.toString() : new Date().getTime().toString();
  }
  /**
   * 点击叶子节点事件
   * @param {any} item [数据]
   */
  onLeafItemClick(item: any) {
    this.$emit('onLeafItemClick', item);
  }
  /**
   * 递归生成节点
   * @param  {Function} h     [创建节点函数]
   * @param  {any}      model [数据]
   * @return {Element}        [返回生成的节点]
   */
  createEl(h: Function, model: any): Element {
    if (this.isLeaf(model)) {
      return h('el-menu-item',
        {
          attrs: {
            index: this.getId(model),
          },
          nativeOn: {
            click: () => {
              this.onLeafItemClick(model);
            },
          },
          key: model.id,
        },
        [
          h('i',
            { staticClass: 'el-icon-location' },
          ),
          h('span',
            { attrs: { slot: 'title' }, slot: 'title' },
            [model.text],
          ),
        ],
      );
    } else {
      return h('el-submenu',
        {
          attrs: {
            index: this.getId(model),
          },
          key: model.id,
        },
        [
          h('template',
            { attrs: { slot: 'title' }, slot: 'title' },
            [
              h('i',
                { staticClass: 'el-icon-location' },
              ),
              h('span',
                { attrs: { slot: 'title' }, slot: 'title' },
                [model.text],
              ),
            ],
          ),
          model.children.map((item: any) => {
            return this.createEl(h, item);
          }),
        ],
      );
    }
  }
}

export default MenuItem;
