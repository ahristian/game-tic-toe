import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;

  async model() {
    const game = [
      { id: 0, value: '' },
      { id: 1, value: '' },
      { id: 2, value: 'd' },
      { id: 3, value: '' },
      { id: 4, value: '' },
      { id: 5, value: '' },
      { id: 6, value: '' },
      { id: 7, value: '' },
      { id: 8, value: '' },
    ];

    let new_user = this.store.createRecord('user');
    let users = await this.store.findAll('user');

    return {
      game,
      new_user,
      users,
    };
  }
}
