import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import Header from "./components/Header";
import { ImageFinder } from "./components/ImageFinder";
import { APIRequester } from "./components/APIRequster";
import { GQLRequester } from "./components/GQLRequester";

import './scss/App.scss';


const App = () => {
  return (
    <div className="App">
        <BrowserRouter>
            <Header />
            <Redirect exact from="/" to="/images"></Redirect>
            <Switch>
                <Route path="/images" component={ImageFinder} />
                <Route path="/rest" component={APIRequester} />
                <Route path="/gql" component={GQLRequester} />
                <Route component={() => <h1>It's 404 page !</h1>} />
            </Switch>
            <footer className='App-footer'>
                <ul className='App-footer__list'>
                    <li className="App-footer__list--item">Andrew B</li>
                    <li className="App-footer__list--item">Developer</li>
                    <li className="App-footer__list--item">Novosibirsk</li>
                    <li className="App-footer__list--item">© Copyright</li>
                </ul>
            </footer>
        </BrowserRouter>
    </div>
  );
};

export default App;
