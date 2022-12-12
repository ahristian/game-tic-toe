import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class GameComponent extends Component {
  @action async onCellClick(id, cell) {
    await this.args.onCellClick(id, cell);
  }
}
