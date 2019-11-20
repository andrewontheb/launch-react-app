import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import Header from "./components/Header";
import { FirstTab } from "./components/FirstTab";
import { SecondTab } from "./components/SecondTab";
import { ThirdTab } from "./components/ThirdTab";

import './scss/App.scss';


const App: React.FC = () => {
  return (
    <div className="App">
        <BrowserRouter>
            <Header></Header>
            <Redirect exact from="/" to="/images"></Redirect>
            <Switch>
                <Route  path="/images" component={FirstTab} />
                <Route path="/rest" component={SecondTab} />
                <Route path="/gql" component={ThirdTab} />
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
