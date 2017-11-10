import './tabs.scss';
import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator';

@Component
export default class Tags extends Vue {

  @Model('change')
  currentName: string;

  @Prop({
    default: [],
    type: Array,
  })
  data: {
    [key: string]: any,
  }[];

  scrollable: boolean | { [key: string]: any } = false;
  navStyle = {
    transform: '',
  };
  @Watch('currentName')
  onCurrentNameChange() {
    this.$nextTick(() => {
      this.scrollToActiveTab();
    });
  }
  render(h: Function): Element {
    const {
      currentName,
      data,
      navStyle,
      scrollable,
      scrollNext,
      scrollPrev,
      onTabClick,
      onTabRemove,
    } = this;
    const scrollBtn = scrollable
      ? [h('span', {
        class: { 'tabs-nav-prev': true, 'is-disabled': !!scrollable.prev },
        on: { click: scrollPrev },
      }, [h('i', { staticClass: 'el-icon-arrow-left' })]),h('span', {
        class: { 'tabs-nav-next': true, 'is-disabled': !!scrollable.next },
        on: { click: scrollNext },
      }, [h('i', { staticClass: 'el-icon-arrow-right' })]),
      ] : null;

    const tabs: any[] = [];

    data.forEach((tab, index) => {
      const tabName = tab.id.toString() || tab.index || index;
      const closable = tab.isClosable === false ? false : true;
      tab.index = `${index}`;

      const btnClose = closable
        ? h('span', { staticClass: 'el-icon-close', on: { click: (ev: Event) => { onTabRemove(tab, ev); } } })
        : null;
      const tabIcon = h('span', { staticClass: 'tab-dot-inner' });
      const tabLabelContent = h('span', { staticClass: 'tab-text' }, tab.text);
      tabs.push(h('div', {
        ref: 'tabs',
        class: {
          'tabs-item': true,
          'is-active': tabName === currentName,
          'is-disabled': tab.disabled,
          'is-closable': closable,
        },
        on: {
          click: (ev: Event) => {
            onTabClick(tab, tabName, ev);
          },
        },
      }, [tabIcon, tabLabelContent, btnClose]));
    });
    return h('div', {
      class: {
        'tabs-nav-wrap': true,
        'is-scrollable': scrollable ? true : false,
      },
    }, [scrollBtn, h('div', { ref: 'navScroll', staticClass: 'tabs-nav-scroll' },
      [h('div', { ref: 'nav', style: navStyle, staticClass: 'tabs-nav' }, [tabs])],
    )]);
  }
  updated() {
    this.update();
  }
  mounted() {
    // addResizeListener(this.$el, this.update);
  }
  beforeDestroy() {
    // if (this.$el && this.update) removeResizeListener(this.$el, this.update);
  }
  scrollPrev() {
    const containerWidth = this.$refs.navScroll.offsetWidth;
    const currentOffset = this.getCurrentScrollOffset();

    if (!currentOffset) return;

    const newOffset = currentOffset > containerWidth
      ? currentOffset - containerWidth
      : 0;

    this.setOffset(newOffset);
  }
  scrollNext() {
    const navWidth = this.$refs.nav.offsetWidth;
    const containerWidth = this.$refs.navScroll.offsetWidth;
    const currentOffset = this.getCurrentScrollOffset();

    if (navWidth - currentOffset <= containerWidth) return;

    const newOffset = navWidth - currentOffset > containerWidth * 2
      ? currentOffset + containerWidth
      : (navWidth - containerWidth);

    this.setOffset(newOffset);
  }
  scrollToActiveTab() {
    if (!this.scrollable) return;
    const nav = this.$refs.nav;
    const activeTab = this.$el.querySelector('.is-active');
    const navScroll = this.$refs.navScroll;
    const activeTabBounding = activeTab.getBoundingClientRect();
    const navScrollBounding = navScroll.getBoundingClientRect();
    const navBounding = nav.getBoundingClientRect();
    const currentOffset = this.getCurrentScrollOffset();
    let newOffset = currentOffset;

    if (activeTabBounding.left < navScrollBounding.left) {
      newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left);
    }
    if (activeTabBounding.right > navScrollBounding.right) {
      newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right;
    }
    if (navBounding.right < navScrollBounding.right) {
      newOffset = nav.offsetWidth - navScrollBounding.width;
    }
    this.setOffset(Math.max(newOffset, 0));
  }
  getCurrentScrollOffset(): number {
    const { navStyle } = this;
    const scrollOffset = navStyle.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/);
    return navStyle.transform
      ? Number(scrollOffset ? scrollOffset[1] : 0)
      : 0;
  }
  setOffset(value: number) {
    this.navStyle.transform = `translateX(-${value}px)`;
  }
  update() {
    const navWidth = this.$refs.nav.offsetWidth;
    const containerWidth = this.$refs.navScroll.offsetWidth;
    let currentOffset = this.getCurrentScrollOffset();

    if (containerWidth < navWidth) {
      currentOffset = this.getCurrentScrollOffset();
      this.scrollable = this.scrollable || {};
      this.scrollable.prev = currentOffset;
      this.scrollable.next = currentOffset + containerWidth < navWidth;
      if (navWidth - currentOffset < containerWidth) {
        this.setOffset(navWidth - containerWidth);
      }
    } else {
      this.scrollable = false;
      if (currentOffset > 0) {
        this.setOffset(0);
      }
    }
  }
  onTabClick(tab: any, tabName: string, event: Event) {
    this.$emit('change', tabName);
    this.$emit('tab-click', tab, event);
  }
  onTabRemove(tab: any, event: Event) {
    event.stopPropagation();
    this.$emit('tab-remove', tab, event);
  }
}
