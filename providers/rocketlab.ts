import type { Provider } from './index';

/** Placeholder Rocket Lab data provider. */
export const rocketlabProvider: Provider = {
  name: 'rocketlab',
  async fetchEntities() {
    return [];
  },
};
