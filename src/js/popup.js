document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggleButton');
  const statusText = document.getElementById('status');
  const statusContainer = document.getElementById('statusContainer');
  
  // Vérifier l'état actuel
  chrome.storage.local.get(['mouseKeeperEnabled'], function(result) {
    const isEnabled = result.mouseKeeperEnabled || false;
    updateUI(isEnabled);
  });
  
  toggleButton.addEventListener('change', function() {
    const newState = toggleButton.checked;
    
    chrome.storage.local.set({mouseKeeperEnabled: newState}, function() {
      updateUI(newState);
      
      // Envoyer l'état au script de contenu
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {action: 'toggleMouseKeeper', enabled: newState});
        }
      });
    });
  });
  
  function updateUI(isEnabled) {
    toggleButton.checked = isEnabled;
    statusText.textContent = isEnabled ? 'Activé' : 'Désactivé';
    
    if (isEnabled) {
      statusContainer.classList.remove('inactive');
      statusContainer.classList.add('active');
    } else {
      statusContainer.classList.remove('active');
      statusContainer.classList.add('inactive');
    }
  }
}); 