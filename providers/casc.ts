import type { Provider } from './index';

/** Placeholder CASC data provider. */
export const cascProvider: Provider = {
  name: 'casc',
  async fetchEntities() {
    return [];
  },
};
