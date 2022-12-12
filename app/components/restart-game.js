import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class RestartGameComponent extends Component {
  @action async onRestartGame() {
    await this.args.onRestartGame();
  }
}
