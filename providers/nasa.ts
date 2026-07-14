import type { Provider } from './index';

/** Placeholder NASA data provider. */
export const nasaProvider: Provider = {
  name: 'nasa',
  async fetchEntities() {
    return [];
  },
};
