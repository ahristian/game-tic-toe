import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class PlayerSetupComponent extends Component {
  @action async onNamePlayer(player, name) {
    await this.args.onNamePlayer(player, name);
  }

  @action async onSetCurrentPlayer(player, symbol) {
    await this.args.onSetCurrentPlayer(player, symbol);
  }
}
