document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggleButton');
  const statusText = document.getElementById('status');
  const statusContainer = document.getElementById('statusContainer');
  
  chrome.storage.local.get(['mouseKeeperEnabled'], function(result) {
    const isEnabled = result.mouseKeeperEnabled || false;
    updateUI(isEnabled);
  });
  
  toggleButton.addEventListener('change', function() {
    const newState = toggleButton.checked;
    
    chrome.runtime.sendMessage({action: 'toggleState', enabled: newState}, function(response) {
      if (response && response.success) {
        updateUI(response.newState);
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          if (tabs[0]) {
            try {
              chrome.tabs.sendMessage(tabs[0].id, {action: 'toggleMouseKeeper', enabled: newState})
                .catch(error => {
                  console.log("Impossible d'envoyer le message à l'onglet:", error);
                });
            } catch (error) {
              console.log("Erreur lors de l'envoi du message:", error);
            }
          }
        });
      }
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