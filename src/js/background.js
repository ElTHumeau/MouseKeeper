chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({mouseKeeperEnabled: false}, function() {
    updateExtensionIcon(false);
  });
});

chrome.runtime.onStartup.addListener(function() {
  chrome.storage.local.get(['mouseKeeperEnabled'], function(result) {
    const isEnabled = result.mouseKeeperEnabled || false;
    updateExtensionIcon(isEnabled);
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getState') {
    chrome.storage.local.get(['mouseKeeperEnabled'], function(result) {
      sendResponse({enabled: result.mouseKeeperEnabled || false});
    });
    return true;
  } else if (request.action === 'toggleState') {
    chrome.storage.local.get(['mouseKeeperEnabled'], function(result) {
      const currentState = result.mouseKeeperEnabled || false;
      const newState = request.enabled !== undefined ? request.enabled : !currentState;
      
      chrome.storage.local.set({mouseKeeperEnabled: newState}, function() {
        updateExtensionIcon(newState);
        
        notifyAllTabs(newState);
        
        sendResponse({success: true, newState: newState});
      });
    });
    return true;
  }
});

function notifyAllTabs(newState) {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      try {
        chrome.tabs.sendMessage(tab.id, {
          action: 'toggleMouseKeeper',
          enabled: newState
        }).catch(() => { /* Impossible d'envoyer le message */ });
      } catch (error) { /* Erreur lors de l'envoi du message */ }
    });
  });
}

function updateExtensionIcon(isEnabled) {
  chrome.action.setBadgeText({
    text: isEnabled ? 'ON' : 'OFF'
  });
  
  chrome.action.setBadgeBackgroundColor({
    color: isEnabled ? '#28a745' : '#dc3545'
  });
} 