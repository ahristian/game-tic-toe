import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | game', function (hooks) {
  setupRenderingTest(hooks);
  const cellsData = ['', '', '', '', '', '', '', '', ''];

  test('it renders', async function (assert) {
    this.set('cellsData', cellsData);
    this.set('statusDisplay', 'This is test');

    await render(
      hbs`<Game @cellsData={{this.cellsData}} @statusDisplay={{this.statusDisplay}} />`
    );

    assert.dom(this.element).hasText('This is test');
  });
});
