// Configuration globale pour les tests

// Mock des objets Chrome pour tous les tests
global.chrome = {
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn()
    }
  },
  runtime: {
    onMessage: {
      addListener: jest.fn()
    },
    onInstalled: {
      addListener: jest.fn()
    }
  },
  tabs: {
    query: jest.fn()
  }
};

// Réinitialiser les mocks avant chaque test
beforeEach(() => {
  jest.clearAllMocks();
}); 