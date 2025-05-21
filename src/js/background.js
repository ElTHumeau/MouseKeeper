chrome.runtime.onInstalled.addListener(function() {
  // Initialiser l'état de l'extension
  chrome.storage.local.set({mouseKeeperEnabled: false});
});

// Écouter les messages du popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getState') {
    chrome.storage.local.get(['mouseKeeperEnabled'], function(result) {
      sendResponse({enabled: result.mouseKeeperEnabled || false});
    });
    return true; // Pour permettre une réponse asynchrone
  }
}); 