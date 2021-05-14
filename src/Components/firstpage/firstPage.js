import Reatc,{Component} from 'react';
import '../firstpage/firstPage.css';
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
class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {uzLang} = this.props;
        return ( 
            <div className='biggest pt-0'>
                <div className='bigger'>
                    <div className='container'>
                        <div className='text-center py-5 text-white'>
                            <h1 className='mt-5 pt-5 text-white firstTExt'>{uzLang?"ABITURIYENT!":"ЗАЯВИТЕЛЬ!"}</h1>
                            <p className='h4'>{uzLang?"Tanlangan mutaxassislik bo‘yicha oliygohga kira olasizmi?":"Можете ли вы поступить в колледж по вашему выбору?"}</p>
                            <p className='text-first'>{uzLang?"Online test yechish orqali bilimlaringizni baholang":"Оцените свои знания, решив онлайн-тест"}</p>
                            <button className='my-button px-3 py-2 mb-5'>
                                <NavLink className='text-white dec-none' to='/royxat'>{uzLang?"Online Test Topshirish":"Подача онлайн-теста"}</NavLink>
                            </button>
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
    FirstPage
)