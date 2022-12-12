import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;

  async model() {
    let new_user = this.store.createRecord('user');
    let users = await this.store.findAll('user');

    return {
      new_user,
      users,
    };
  }
}
