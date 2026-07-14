import type { Provider } from './index';

/** Placeholder SpaceX data provider. */
export const spacexProvider: Provider = {
  name: 'spacex',
  async fetchEntities() {
    return [];
  },
};
