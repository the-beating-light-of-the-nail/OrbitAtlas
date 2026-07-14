import type { Provider } from './index';

/** Placeholder CNSA (China National Space Administration) data provider. */
export const cnsaProvider: Provider = {
  name: 'cnsa',
  async fetchEntities() {
    return [];
  },
};
