import {
  Vue,
  Component,
  Prop
} from 'vue-property-decorator'
import _ from 'lodash'
import Icons from '../assets/icons'

@Component({
  template: '<svg class="icon" :class="iconClass"><use :xlink:href="getIconId(Icons[name])"></use></svg>'
})
class Icon extends Vue {
  @Prop({ default: '', type: String, validator(val) { return _.has(Icons, val) } })
  name: string

  private Icons: object = Icons
  private iconClass: string = `icon-${this.name}`

  getIconId(svg: any) {
    return `#${svg.id}`
  }
}
export default Icon
