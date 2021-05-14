import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavMenu from './Components/navbar/Mynavbar';
import FirstPage from './Components/firstpage/firstPage';
import TestSelect from './Components/Test/testSelect';
import TestIn from './Components/Test/testComponent/testIn';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect

} from "react-router-dom";
import Result from './Components/result/result';
import Ruyxat from './Components/Ro\'yxat/Ruyxat';
import Footer from './Components/footer/footer';
import LastRes from './Components/last_tests/lastRes';
import 'antd/dist/antd.css';
import Login from './Components/signIn/signIn';
import {getToken} from './utilits';
import {tokenKey} from './Components/constants/constants';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>

                <Router>
                    <Switch>
                        <Route path='/signup'>
                            <Login/>
                        </Route>
                        <Route path='/result'>
                            <NavMenu/>
                            <Result/>
                        </Route>
                        <Route path='/royxat'>
                            <NavMenu/>
                            <TestSelect/>
                            <Footer/>
                        </Route>
                        <Route path='/testing'>
                            <NavMenu/>
                            <TestIn/>
                            <Footer/>
                        </Route>
                        <Route path='/'>
                            <NavMenu/>
                            <FirstPage/>
                            <LastRes/>
                            <Footer/>
                        </Route>

                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
