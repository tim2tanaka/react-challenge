import ReactDOM from 'react-dom/client';
import { Provider } from './app_state/context';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
      <Provider>
        <App />
      </Provider>
  </>
);
