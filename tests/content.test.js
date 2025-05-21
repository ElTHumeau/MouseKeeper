// Mock des objets Chrome
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
    }
  }
};

// Mock du document
document.addEventListener = jest.fn();
document.removeEventListener = jest.fn();
document.querySelectorAll = jest.fn().mockReturnValue([]);
document.body = {};
document.dispatchEvent = jest.fn();

// Import du script à tester
require('../src/js/content.js');

describe('Content Script', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('devrait ajouter un écouteur d\'événement pour mousemove', () => {
    expect(document.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
  });

  test('devrait ajouter un écouteur pour les messages du runtime', () => {
    expect(chrome.runtime.onMessage.addListener).toHaveBeenCalled();
  });

  test('devrait vérifier l\'état initial dans le stockage local', () => {
    expect(chrome.storage.local.get).toHaveBeenCalledWith(['mouseKeeperEnabled'], expect.any(Function));
  });
}); 