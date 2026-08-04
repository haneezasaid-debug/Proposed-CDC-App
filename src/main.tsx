import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress cross-origin third-party script errors (e.g., from Disqus embeds in sandboxed iframes)
if (typeof window !== 'undefined') {
  const originalOnError = window.onerror;
  window.onerror = function (message, source, lineno, colno, error) {
    if (
      message === 'Script error.' ||
      (typeof message === 'string' && message.includes('Script error')) ||
      (source && typeof source === 'string' && source.includes('disqus'))
    ) {
      return true;
    }
    if (originalOnError) {
      return originalOnError.call(window, message, source, lineno, colno, error);
    }
  };

  window.addEventListener('error', (event) => {
    if (
      event.message === 'Script error.' ||
      (event.filename && event.filename.includes('disqus'))
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    if (
      event.reason &&
      (String(event.reason).includes('Script error') ||
        String(event.reason).includes('disqus'))
    ) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

