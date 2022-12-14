import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './Stateprovider';
import reducer,{initialState} from "./reducer";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
    <App />
     </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
//#### Video Demo:  https://youtu.be/uaFpnPi0gOY

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
