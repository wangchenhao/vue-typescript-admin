import { Vue, Component } from 'vue-property-decorator'

@Component
class Header extends Vue {

}

@Component({
  template: require('./layout.html')
})
class Main extends Vue {
  constructor() {
    super()
  }
  mounted() {
    const loadEl = document.getElementById('loading')
    if (loadEl) {
      loadEl.style.display = 'none'
    }
  }
}
export default Main
