import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import BaseLayout from './components/layout/BaseLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/reducer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reduxThunk from 'redux-thunk'
import RequireAuth from './components/RequireAuth'
import { checkToken } from './actions'
import Profile from './components/Profile';
import Card from './components/Card';
import List from './components/List';
import SearchResults from './components/SearchResults';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(reducer, {},  
  composeEnhancers(applyMiddleware(reduxThunk)));

  store.dispatch(checkToken())

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <Router>
      <BaseLayout>
        <Routes>
          <Route path='/' element={<App />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/signin' element={<Signin />}/>
          <Route path='/signout' element={<Signout />}/>
          <Route path='/search-result/:search' element={<SearchResults />}/>
          <Route path='/card-info/:card' element={<Card />}/>
          <Route path='/list-info/:id/:list' element={<List />}/>
          <Route path='/profile' element={<RequireAuth><Profile /></RequireAuth>}/>
        </Routes>
      </BaseLayout>
    </Router>
  </Provider>
  
);
