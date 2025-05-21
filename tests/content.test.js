// Mock des objets Chrome
global.chrome = {
  storage: {
    local: {
      get: jest.fn().mockImplementation((keys, callback) => {
        callback({ mouseKeeperEnabled: false });
      }),
      set: jest.fn()
    }
  },
  runtime: {
    onMessage: {
      addListener: jest.fn()
    }
  }
};

// Mock du document et window
document.addEventListener = jest.fn();
document.removeEventListener = jest.fn();
document.querySelectorAll = jest.fn().mockReturnValue([]);
document.body = document.createElement('body');
document.dispatchEvent = jest.fn();

// Mock pour MutationObserver
global.MutationObserver = class {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  disconnect() {}
};

// Mock pour MouseEvent
global.MouseEvent = class {
  constructor(type, options) {
    this.type = type;
    this.clientX = options.clientX;
    this.clientY = options.clientY;
    this.bubbles = options.bubbles;
    this.cancelable = options.cancelable;
  }
};

describe('Content Script', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('devrait configurer les écouteurs d\'événements lors de l\'importation', () => {
    // Importer le script à tester
    require('../src/js/content.js');
    
    // Vérifier que le storage.local.get a été appelé
    expect(chrome.storage.local.get).toHaveBeenCalledWith(['mouseKeeperEnabled'], expect.any(Function));
    
    // Vérifier que l'écouteur onMessage a été ajouté
    expect(chrome.runtime.onMessage.addListener).toHaveBeenCalled();
    
    // Vérifier que l'écouteur mousemove a été ajouté
    expect(document.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
  });
}); 