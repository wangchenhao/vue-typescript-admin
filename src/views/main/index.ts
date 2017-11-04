import { Basis, Component } from '../Basis';
@Component({
  template: require('./layout.html'),
})
class Main extends Basis {
  menuList = {
    id: 1,
    text: '节点1',
    children: [{
      id: 2,
      text: '节点2',
    }, {
      id: 3,
      text: '节点3',
    }],
  };
  mounted() {
    const loadEl = document.getElementById('loading');
    if (loadEl) {
      loadEl.style.display = 'none';
    }
  }
}

export default Main;
