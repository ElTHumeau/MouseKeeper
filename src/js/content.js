let isActive = false;
let lastPosition = { x: 0, y: 0 };
let observer = null;
let mouseInterval;

// Recevoir l'état initial
chrome.storage.local.get(['mouseKeeperEnabled'], function(result) {
  isActive = result.mouseKeeperEnabled || false;
  if (isActive) {
    startMouseSimulation();
  }
});

// Écouter les changements d'état
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'toggleMouseKeeper') {
    isActive = request.enabled;
    
    if (isActive) {
      startMouseSimulation();
    } else {
      stopMouseSimulation();
    }
    
    sendResponse({success: true});
  }
});

// Suivre la dernière position connue de la souris
document.addEventListener('mousemove', function(e) {
  if (isActive) {
    lastPosition = { x: e.clientX, y: e.clientY };
  }
});

function startMouseSimulation() {
  // Intercepter les événements de souris
  document.addEventListener('mouseout', preventMouseOut, true);
  document.addEventListener('mouseleave', preventMouseOut, true);
  
  // Créer un MutationObserver pour appliquer les intercepteurs aux nouveaux éléments
  observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) { // Élément Node
            applyListenersToElement(node);
          }
        });
      }
    });
  });
  
  // Configuration de l'observateur
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Appliquer les intercepteurs aux éléments existants
  applyListenersToAllElements();
  
  // Simuler un mouvement périodique de souris
  startMouseMovementInterval();
}

function stopMouseSimulation() {
  document.removeEventListener('mouseout', preventMouseOut, true);
  document.removeEventListener('mouseleave', preventMouseOut, true);
  
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  
  clearInterval(mouseInterval);
}

function preventMouseOut(e) {
  if (isActive) {
    e.stopPropagation();
    e.preventDefault();
  }
}

function applyListenersToElement(element) {
  element.addEventListener('mouseout', preventMouseOut, true);
  element.addEventListener('mouseleave', preventMouseOut, true);
}

function applyListenersToAllElements() {
  const allElements = document.querySelectorAll('*');
  allElements.forEach(applyListenersToElement);
}

function startMouseMovementInterval() {
  mouseInterval = setInterval(function() {
    if (isActive) {
      // Simuler un petit mouvement de souris pour maintenir l'activité
      const mouseEvent = new MouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: lastPosition.x + (Math.random() * 2 - 1),
        clientY: lastPosition.y + (Math.random() * 2 - 1)
      });
      
      document.dispatchEvent(mouseEvent);
    }
  }, 3000); // Intervalle de 3 secondes
} 