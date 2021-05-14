import React, {Component} from 'react';
import '../testComponent/testIn.css';
import {AiOutlineUser} from "react-icons/ai";
import {WiDirectionRight, WiDirectionLeft} from "react-icons/wi";
import {Tab, Row, Col, Nav, Form, Modal, Button, Tabs} from 'react-bootstrap';
import Countdown from 'react-countdown';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink, Redirect
} from "react-router-dom";
import {createBlok, get_process, getUser, saveAnswer} from "../../../server/user/user";
import {GetQuestionId, SetLocalstorage} from "../../../utilits";
import {connect} from "react-redux";
import {UzLang} from "../../../redux/Actions/UzLang";
import {RuLang} from "../../../redux/Actions/RuLang";

class TestIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 1,
            handle: false,
            activeTab: props.activeTab || 1,
            activeBackButtonState: false,
            activeNextButtonState: false,
            user: null,
            checkedId:'',
            firstStart:true,
            secondStart:false,
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
    }

    getMe = () => {
        getUser().then(res => this.setState({user: res && res.data && res.data.data})).catch(err => window.location.href = "/signup")
    }
    getBlok = () => {
        const values = {
            blokFirstId: localStorage.getItem("s1"),
            blokSecondId: localStorage.getItem("s2"),
            blokThirdId: localStorage.getItem("s3")
        }
        console.log(values)
        createBlok(values)
            .then(res => {
                    // if (res&&res.data&&res.data.data === null) {
                    //     localStorage.setItem("proc", "true")
                    //     window.location.href="/testing"
                    // }
                    console.log(res.data)
                    this.setState({
                        blok: res.data.data
                    })
                    localStorage.setItem("proc", "true")
                }
            )
            .catch(err => console.log(err))

    }

    Subject_selected=(num)=>{
        if(num===1){
            document.querySelector('.firstsub').classList.add('btn-dark')
            document.querySelector('.secondsub').classList.remove('btn-dark')
            document.querySelector('.thirdsub').classList.remove('btn-dark')
            this.setState({
                firstStart:true,
                secondStart:false,
            })
        }else  if(num===2){
            document.querySelector('.firstsub').classList.remove('btn-dark')
            document.querySelector('.secondsub').classList.add('btn-dark')
            document.querySelector('.thirdsub').classList.remove('btn-dark')
            this.setState({
                firstStart:false,
                secondStart:true,
            })
        }else{
            document.querySelector('.firstsub').classList.remove('btn-dark')
            document.querySelector('.secondsub').classList.remove('btn-dark')
            document.querySelector('.thirdsub').classList.add('btn-dark')
            this.setState({
                firstStart:false,
                secondStart:false,
            })
        }
    };

    componentDidMount(props) {
        console.log(this.props);
        this.getMe();

        if (localStorage.getItem("proc").toString() === "true") {
            get_process().then(res => {
                localStorage.setItem("proc", "false");
                console.log(res)
                this.setState({
                    blok: res.data.data
                })
            }).catch(err => {
                localStorage.setItem("proc", "false");
            });
        } else {
            this.getBlok()
        }
    }

    handleClose = () => {
        this.setState({
            handle: false
        })
    }
    handleOpen = () => {
        this.setState({
            handle: true,
        })
    }
    onChangeBtn = (id, val,key) => {
        SetLocalstorage(id,val)

        console.log(val)
        saveAnswer(id, val).then(res =>
            get_process().then(res => {
                localStorage.setItem("proc", "false");
                console.log(res)
                this.setState({
                    blok: res.data.data
                })
            }).catch(err => {
                localStorage.setItem("proc", "false");
            }))
            .catch(err => console.log(err))
    }

    render() {
        const {uzLang}=this.props;
        const tabCount = 6;
        const {selectedTab, k, user, blok,firstStart,secondStart} = this.state;
        return (
            <div className='bg-light'>
                <div className='container bg-white marginTop'>
                    <div className='row'>
                        <div className='col-8 col-md-6'>
                            <p className='user mr-3'><AiOutlineUser/></p>
                            <p className='person pr-2 br mr-3'><strong>{uzLang?"Ism":"Имя"}</strong><br/>{user && user.last_name}</p>
                            <p className='person'><strong>{uzLang?"Familiya":"Фамилия"}</strong><br/>{user && user.first_name}</p>
                        </div>
                        <div className='col-4 col-md-4'>
                            <p className='time'><strong>Time: </strong>
                                <Countdown date={new Date(blok && blok.blok && blok.blok.finalDate) + 10800000}>
                                    {uzLang?"Test yakunlandi":"Тест завершен"} !
                                </Countdown>
                            </p>
                        </div>
                    </div>
                    <div className="subject-select">
                        <div className="btn btn-hover btn-primary mr-3 mb-3 firstsub btn-dark" onClick={()=>this.Subject_selected(1)}>
                            {
                                blok&&uzLang?blok.blok.blokFirst.nameUz:blok&&blok.blok.blokFirst.nameRu
                            }
                        </div>
                        <div className="btn btn-hover btn-primary mr-3 mb-3 secondsub" onClick={()=>this.Subject_selected(2)}>
                            {
                                blok&&uzLang?blok.blok.blokSecond.nameUz:blok&&blok.blok.blokSecond.nameRu
                            }
                        </div>
                        <div className="btn btn-hover btn-primary mr-3 mb-3 thirdsub" onClick={()=>this.Subject_selected(3)}>
                            {
                                blok&&uzLang?blok.blok.blokThird.nameUz:blok&&blok.blok.blokThird.nameRu
                            }
                        </div>
                    </div>
                    <div className='mb-5 subject-title'>
                        {
                            firstStart && !secondStart?
                                <div>

                                    <h3> {
                                        blok&&uzLang?blok.blok.blokFirst.nameUz:blok&&blok.blok.blokFirst.nameRu
                                    }</h3>
                                    <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect} id="controlled-tab-example"
                                    >
                                        {
                                            blok && blok.blok && blok.blok.questionFirstList && blok.blok.questionFirstList.map((i, key) => (
                                                <Tab key={i.id} className={this.state.className} eventKey={key + 1} title={key + 1}>
                                                    <p className='test-text'><strong>{key + 1}-{uzLang?"savol":"вопрос"}.</strong>
                                                        <p dangerouslySetInnerHTML={{
                                                            __html: uzLang?i.questionUz:i.questionRu
                                                        }}/>
                                                    </p>
                                                    {i.answer && i.answer.map((item, key) =>  {
                                                        let t=0;
                                                        blok.savedAnswers&& blok.savedAnswers.map(item1=>(
                                                            item1.selectedId===item.id?t++:null
                                                        ))


                                                        return <div
                                                            className={
                                                                // blok && blok.savedAnswers ? blok.savedAnswers.map(item1 => (
                                                                // item1.selectedId === item.id ?
                                                                // ))
                                                                t === 1 ? "radio_ansver my-2 variant backcolor" : "radio_ansver my-2 variant"
                                                            }
                                                            onClick={() => this.onChangeBtn(i.id, item.id, key)}
                                                            key={item.id}
                                                            id={key + i.id}
                                                        >
                                                            <p dangerouslySetInnerHTML={{__html: uzLang ? item.titleUz : item.titleRu}}/>
                                                        </div>
                                                    })}
                                                </Tab>
                                            ))
                                        }
                                    </Tabs>
                                </div>
                                :!firstStart && secondStart?
                                <div>

                                    <h3>{
                                        blok&&uzLang?blok.blok.blokSecond.nameUz:blok&&blok.blok.blokSecond.nameRu
                                    }</h3>
                                    <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect} id="controlled-tab-example"
                                    >
                                        {
                                            blok && blok.blok && blok.blok.questionSecondList && blok.blok.questionSecondList.map((i, key) => (
                                                <Tab   key={i.id} className={this.state.className} eventKey={key + 1} title={key + 1}>
                                                    <p className='test-text'><strong>{key + 1}-{uzLang?"savol":"вопрос"}.</strong>
                                                        <p dangerouslySetInnerHTML={{
                                                            __html: uzLang?i.questionUz:i.questionRu
                                                        }}/>
                                                    </p>
                                                    {i.answer && i.answer.map((item, key) => {
                                                        let t=0;
                                                        blok.savedAnswers&& blok.savedAnswers.map(item1=>(
                                                            item1.selectedId===item.id?t++:null
                                                        ))


                                                        return <div
                                                            className={
                                                                // blok && blok.savedAnswers ? blok.savedAnswers.map(item1 => (
                                                                // item1.selectedId === item.id ?
                                                                // ))
                                                                t === 1 ? "radio_ansver my-2 variant backcolor" : "radio_ansver my-2 variant"
                                                            }
                                                            onClick={() => this.onChangeBtn(i.id, item.id, key)}
                                                             key={item.id}
                                                            id={key + i.id}
                                                        >
                                                            <p dangerouslySetInnerHTML={{__html: uzLang ? item.titleUz : item.titleRu}}/>
                                                        </div>
                                                    })}
                                                </Tab>

                                            ))
                                        }
                                    </Tabs>
                                </div>:
                                <div>

                                    <h3>{
                                        blok&&uzLang?blok.blok.blokThird.nameUz:blok&&blok.blok.blokThird.nameRu
                                    }</h3>
                                    <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect} id="controlled-tab-example"
                                    >
                                        {
                                            blok && blok.blok && blok.blok.questionThirdList && blok.blok.questionThirdList.map((i, key) => (
                                                <Tab key={i.id}  className={this.state.className} eventKey={key + 1} title={key + 1}>
                                                    <p className='test-text'><strong>{key + 1}-{uzLang?"savol":"вопрос"}.</strong>
                                                        <p dangerouslySetInnerHTML={{
                                                            __html: uzLang?i.questionUz:i.questionRu
                                                        }}/>
                                                    </p>
                                                    {i.answer && i.answer.map((item, key) =>  {
                                                        let t=0;
                                                        blok.savedAnswers&& blok.savedAnswers.map(item1=>(
                                                            item1.selectedId===item.id?t++:null
                                                        ))


                                                        return <div
                                                            className={
                                                                // blok && blok.savedAnswers ? blok.savedAnswers.map(item1 => (
                                                                // item1.selectedId === item.id ?
                                                                // ))
                                                                t === 1 ? "radio_ansver my-2 variant backcolor" : "radio_ansver my-2 variant"
                                                            }
                                                            onClick={() => this.onChangeBtn(i.id, item.id, key)}
                                                            key={item.id}
                                                            id={key + i.id}
                                                        >
                                                            <p dangerouslySetInnerHTML={{__html: uzLang ? item.titleUz : item.titleRu}}/>
                                                        </div>
                                                    })}
                                                </Tab>

                                            ))
                                        }
                                    </Tabs>
                                </div>
                        } <br/>

                    </div>
                    <div className='row pb-5'>
                        {/*<div className='col-12 col-md-6'>*/}
                        {/*    <button id='lastBtn' onClick={this.handleBackClick}*/}
                        {/*            disabled={this.state.activeBackButtonState} className='last_btn'><WiDirectionLeft*/}
                        {/*        style={{fontSize: '23px', marginBottom: '3px'}}/>Oldingi*/}
                        {/*    </button>*/}
                        {/*    <button id='nextBtn' onClick={this.handleNextClick}*/}
                        {/*            disabled={this.state.activeNextButtonState}*/}
                        {/*            className='last_btn'>Keyingi<WiDirectionRight style={{fontSize: '28px'}}/></button>*/}
                        {/*</div>*/}
                        <div className='col-12 col-md-6'>
                            <button className='finished_button mt-3' id='ddd' onClick={this.handleOpen}>
                                {uzLang?"Testni Tugatish":"Завершить тест"}
                            </button>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.handle} onHide={this.handleClose}>
                    {/* <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header> */}
                    <Modal.Body className='mt-4 modal-text'>{uzLang?"Testni tugatmoqchimisiz ":"Вы хотите пройти тест"}?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            {uzLang?"Yo'q":"Нет"}
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            <NavLink onClick={() => localStorage.setItem("blokId", blok && blok.blok && blok.blok.id)}
                                     className='text-white dec-none' to='/result'>{uzLang?"Ha":"Дa"}</NavLink>
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    handleSelect(selectedTab) {
        // The active tab must be set into the state so that
        // the Tabs component knows about the change and re-renders.
        this.setState({
            activeTab: selectedTab
        });
    }

    handleBackClick() {
        // let currTab = this.state.activeTab;
        if (this.state.activeTab <= 2) {
            console.log(this.state.activeTab);
            this.setState({
                activeTab: this.state.activeTab - 1,
                activeBackButtonState: true

            });
        } else {
            this.setState(
                {activeTab: this.state.activeTab - 1,});

        }
    }

    handleNextClick() {

        this.setState({
            activeTab: this.state.activeTab + 1
        });
    }

}
const mapStateToProps=(state)=>{
    return{
        uzLang:state.changeLang.uzLang,
    };
} ;


export default connect(mapStateToProps,{UzLang,RuLang})(
    TestIn
)