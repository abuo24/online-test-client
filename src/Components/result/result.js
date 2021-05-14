import React, { Component } from 'react';
import '../result/result.css';
import { Table } from 'react-bootstrap';
import {RuLang} from  '../../redux/Actions/RuLang';
import {UzLang} from '../../redux/Actions/UzLang'
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom";
import {finishedTest, getUser} from "../../server/user/user";
class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blokId: localStorage.getItem("blokId")
        }
    }
    getMe = () => {
        getUser().then(res => this.setState({user: res && res.data && res.data.data})).catch(err => window.location.href = "/signup")
    }
    stopTest =()=>{
        finishedTest(this.state.blokId).then(res=> {
            console.log(res.data)
            this.setState({blok: res.data})
        }).catch(err=>console.log(err))
    }
    componentDidMount() {
        this.stopTest()
        this.getMe()
    }

    render() {
        const {uzLang, } = this.props;
        const {user, blok} = this.state;
        return (
            <div>
                <div className='container'>
                    <div className='top_res pt-5 mt-5'>
                        <p className='text-center fs-25'>{uzLang?"Natija":"Результат"}</p>
                        <div className='scroll'>
                            <Table striped bordered >
                                <thead>
                                    <tr>
                                        <th className='top_table'>{uzLang?"Ism":"Имя"}</th>
                                        <th className='top_table'>{uzLang?"Familiya":"Фамилия"}</th>
                                        <th className='top_table'>{uzLang?"Testlar soni":"Количество тестов"}</th>
                                        <th className='top_table'>{uzLang?"To'g'ri javoblar soni":"Количество правильных ответов"}</th>
                                        <th className='top_table'>{uzLang?"Ball":"Балы"}</th>
                                        <th className='top_table'>{uzLang?"Foiz":"Процентов"}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='fs-22'>{user?user.first_name:""}</td>
                                        <td className='fs-22'>{user&&user.last_name}</td>
                                        <td className='fs-22'>{blok&&(blok.blok.questionSecondList.length+blok.blok.questionFirstList.length+blok.blok.questionThirdList.length)}</td>
                                        <td className='fs-22'>{blok&&blok.countAll}</td>
                                        <td className='fs-22'>{blok&&blok.ballAll}</td>
                                        <td className='fs-22'>{blok&&(blok.percentAll*100).toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className='bottom_res'>
                        <p className='text-center fs-25'>{uzLang?"Xato belgilagan testlaringizni bilib oling:":"Найдите тесты, которые вы отметили как ошибки:"}</p>
                    <div className='scroll'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>{uzLang?"Test Nomeri":"Номера тестов"}</th>
                                    <th>{uzLang?"Savol":"Вопрос"}</th>
                                    <th>{uzLang?"Sizning javobingiz":"Ваш ответ"}</th>
                                    <th>{uzLang?"To'g'ri javob":"Правильный ответ"}</th>
                                </tr>
                            </thead>
                            <tbody>
                            {blok&&blok.blok&&blok.blok.questionFirstList?
                                blok.blok.questionFirstList.map(item=>(
                                    blok&&blok.historySavedAnswers?
                                        blok.historySavedAnswers.map((i,key)=>(
                                            !(i.selectedId===i.correctAnswerId) && i.questionId===item.id?
                                                <tr key={key+1}>
                                                    <td className='fs-16'>{key+1}</td>
                                                    <td className='fs-16'><p dangerouslySetInnerHTML={{__html:
                                                            uzLang?item.questionUz:item.questionRu
                                                    }}/></td>
                                                    <td className='fs-16'>{
                                                        Array.isArray(item.answer)?item.answer.map(e=>(
                                                            e.id===i.selectedId?<p dangerouslySetInnerHTML={{__html:
                                                                    uzLang?e.titleUz:e.titleRu}}/>:''
                                                        )):""
                                                    }</td>
                                                    <td className='fs-16'>
                                                        {   Array.isArray(item.answer)?item.answer.map(e=>(
                                                            e.id===i.correctAnswerId?<p dangerouslySetInnerHTML={{__html:
                                                                    uzLang?e.titleUz:e.titleRu}}/>:''
                                                        )) :""
                                                        }
                                                    </td>
                                                </tr>:''
                                        ))
                                        :''
                                ))
                                :''}
                            {blok&&blok.blok&&blok.blok.questionSecondList?
                                blok.blok.questionSecondList.map(item=>(
                                    blok&&blok.historySavedAnswers?
                                        blok.historySavedAnswers.map((i,key)=>(
                                            !(i.selectedId===i.correctAnswerId) && i.questionId===item.id?
                                                <tr  key={key*100+1}>
                                                    <td className='fs-16'>{key+1}</td>
                                                    <td className='fs-16'><p dangerouslySetInnerHTML={{__html:
                                                            uzLang?item.questionUz:item.questionRu
                                                    }}/></td>
                                                    <td className='fs-16'>{
                                                        Array.isArray(item.answer)?item.answer.map(e=>(
                                                            e.id===i.selectedId?<p dangerouslySetInnerHTML={{__html:
                                                                    uzLang?e.titleUz:e.titleRu}}/>:''
                                                        )):""
                                                    }</td>
                                                    <td className='fs-16'>
                                                        {   Array.isArray(item.answer)?item.answer.map(e=>(
                                                            e.id===i.correctAnswerId?<p dangerouslySetInnerHTML={{__html:
                                                                    uzLang?e.titleUz:e.titleRu}}/>:''
                                                        )) :""
                                                        }
                                                    </td>
                                                </tr>:''
                                        ))
                                        :''
                                ))
                                :''}
                            {blok&&blok.blok&&blok.blok.questionThirdList?
                                blok.blok.questionThirdList.map(item=>(
                                    blok&&blok.historySavedAnswers?
                                        blok.historySavedAnswers.map((i,key)=>(
                                            !(i.selectedId===i.correctAnswerId) && i.questionId===item.id?
                                                <tr  key={key*10+1}>
                                                    <td className='fs-16'>{key+1}</td>
                                                    <td className='fs-16'><p dangerouslySetInnerHTML={{__html:
                                                            uzLang?item.questionUz:item.questionRu
                                                    }}/></td>
                                                    <td className='fs-16'>{
                                                        item.answer.map(e=>(
                                                            e.id===i.selectedId?<p dangerouslySetInnerHTML={{__html:
                                                                    uzLang?e.titleUz:e.titleRu}}/>:''
                                                        ))
                                                    }</td>
                                                    <td className='fs-16'>
                                                        {
                                                            item.answer.map(e=>(
                                                                e.id===i.correctAnswerId?<p dangerouslySetInnerHTML={{__html:
                                                                        uzLang?e.titleUz:e.titleRu}}/>:''
                                                            ))
                                                        }
                                                    </td>
                                                </tr>:''
                                        ))
                                        :''
                                ))
                                :''}
                                {/*<tr>*/}
                                {/*    <td className='fs-16'>1</td>*/}
                                {/*    <td className='fs-16'>Bir nechta natural sonning yig‘indisi 85 ga teng. Agar shu sonlarning har biridan 2 ni ayirib, yig‘indi hisoblansa, u 61 ga teng bo‘ladi. Yig‘indida nechta son qatnashgan?</td>*/}
                                {/*    <td className='fs-16'>Belgilanmagan</td>*/}
                                {/*    <td className='fs-16'>12</td>*/}
                                {/*</tr>*/}
                                {/*<tr>*/}
                                {/*    <td className='fs-16'>1</td>*/}
                                {/*    <td className='fs-16'>Bir nechta natural sonning yig‘indisi 85 ga teng. Agar shu sonlarning har biridan 2 ni ayirib, yig‘indi hisoblansa, u 61 ga teng bo‘ladi. Yig‘indida nechta son qatnashgan?</td>*/}
                                {/*    <td className='fs-16'>Belgilanmagan</td>*/}
                                {/*    <td className='fs-16'>12</td>*/}
                                {/*</tr>*/}
                            </tbody>
                        </Table>
                    </div>

                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        uzLang:state.changeLang.uzLang,
    };
} ;


export default connect(mapStateToProps,{UzLang,RuLang})(
    Result
)