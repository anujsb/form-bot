import React from 'react';
import { createRoot } from 'react-dom/client';
import { Widget } from './components/Widget';

// Function to initialize the widget
function initializeWidget() {
  // Find all widget elements
  const widgetElements = document.querySelectorAll('ai-form');
  
  widgetElements.forEach(element => {
    const formId = element.getAttribute('form-id');
    const root = createRoot(element);
    root.render(<Widget projectId={formId} />);
  });
}

// Initialize when the script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeWidget);
} else {
  initializeWidget();
}

// Export for external usage
window.AiFormWidget = {
  init: initializeWidget
};