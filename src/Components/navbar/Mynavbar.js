import React, { Component } from 'react';
import '../navbar/navbar.css';
import { Navbar, NavDropdown, Nav,Form } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom";
import UzPng from '../../imgs/uz.png';
import RuPng from '../../imgs/ru.png';
import { connect } from 'react-redux';
import {RuLang} from  '../../redux/Actions/RuLang';
import {UzLang} from '../../redux/Actions/UzLang'
class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            className:'firstClass',
            classNameLink:'firstLink'
        };
    }

    ToggleSwitch=()=>{
        !document.querySelector('#switch-1').checked?
        this.props.RuLang():this.props.UzLang()
    }
    handleScroll = () => {

        if (window.pageYOffset > 0) {
          if (!this.state.className) {
            this.setState({ className: "whiteNav",classNameLink:"secondLink" });
          }else{
            this.setState({className:"whiteNav",classNameLink:"secondLink"})
          }
        } else {
          if (this.state.className) {
            this.setState({ className: "firstClass",classNameLink:"firstLink" })
          }
        }
    
      }

      componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
      }


    render() {
        const {uzLang} = this.props;
        return (

            <Navbar bg="light" className={this.state.className} expand="lg position-fixed">
                <div className='container'>
                    <Navbar.Brand href="#home">
                        <NavLink className='text-dark dec-none' style={{textTransform:'uppercase'}} to='/home'>{uzLang?"Bosh sahifa":"домашняя страница"}</NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {/*<Nav.Link className={`navLink mx-2 ${this.state.classNameLink}`} id='a' href="#home">{uzLang?"Bosh sahifa":"sdsf"}</Nav.Link>*/}
                            <Form inline>
                            <form action="#" className='check_box'>
                                <span className='mr-2 lang-label'>Ru
                                </span>
                                <div class="switch">
                                    <input defaultChecked={localStorage.getItem("Zako")==='UZ'} id="switch-1" onChange={this.ToggleSwitch} type="checkbox" class="switch-input" />
                                    <label for="switch-1" class="switch-label">Switch</label>
                                </div>
                                <span className='ml-2 lang-label'>Uz</span>
                            </form>
                            </Form>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        uzLang:state.changeLang.uzLang,
    };
} ;
export default connect(mapStateToProps,{UzLang,RuLang})(
    NavMenu
)