import type { Provider } from './index';

/** Placeholder LandSpace data provider. */
export const landspaceProvider: Provider = {
  name: 'landspace',
  async fetchEntities() {
    return [];
  },
};
