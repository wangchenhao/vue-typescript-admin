import { Basis, Component } from '../Basis';

@Component({
  template: require('./layout.html'),
})
class Main extends Basis {
  constructor() {
    super();
  }
  mounted() {
    const loadEl = document.getElementById('loading');
    if (loadEl) {
      loadEl.style.display = 'none';
    }
    this.$http({
      url: '/public/reset',
      method: 'post',
      params: {
        ID: 12345,
      },
      // get 不会发送 data 中的数据
      data: {
        firstName: 'Fred',
      },
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  open() {
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      type: 'warning',
    }).then(() => {
      this.$message({
        type: 'success',
        message: '删除成功!',
      });
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除',
      });
    });
  }

  onSwitch() {
    const lang = this.$cookie.get('lang') === 'en' ? 'zh-CN' : 'en';
    this.$cookie.set('lang', lang);
    this.$i18n.locale = lang;
  }
}

export default Main;
