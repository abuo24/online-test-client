import React, { Component } from 'react';
import '../Test/testSelect.css'
import { Form, Table } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    NavLink
  } from "react-router-dom";
import { getToken } from '../../utilits';
import { tokenKey } from '../constants/constants';
import {
    get_process,
    get_routes,
    get_secont_route,
    get_secont_subjects,
    get_subject, get_third_route,
    get_third_subjects, post_subjects_id
} from "../../server/user/user";
import {connect} from "react-redux";
import {UzLang} from "../../redux/Actions/UzLang";
import {RuLang} from "../../redux/Actions/RuLang";
class TestSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected1:true,
            selected2:true,
            selected3:true,
            selected4:true,
            subjects:[],
            firstParent:[],
            secondParent:[],
            parentId:null,
            firstId:null,
            secondId:null,
            thirdId:null,
            firstSub:'',
            secondSubject:'',
            thirdSub:'',
            routes:[],
            routeCode:null,
        }
    }
    selectedLesson=()=>{
            this.setState({
                selected1:false
            })
    }
    selectedLesson2=()=>{
        this.setState({
            selected2:false
        })
    }
    selectedLesson3=()=>{
        this.setState({
            selected3:false
        })
    }
    selectedLesson4=()=>{
        this.setState({
            selected4:false
        })
    };

    get_subjects=()=>{
        get_subject().then(res=>{
            this.setState({
                subjects:res.data.data,
            });
            })
    };
    get_routess=()=>{
        get_routes().then(res=>{
            this.setState({
                routes:res.data.data,
            })
        })
    }

    changeOption=(e)=>{
        get_secont_route(e.target.value.split('/')[0]).then(res=>{
            this.setState({
                routes:res.data.data,
            })
        });
        get_secont_subjects(e.target.value.split('/')[0]).then(res=>{
            this.setState({
                firstParent:res.data.data.parentsFirst,
                firstSub:e.target.value.split('/')[1],
            })
        })

        console.log(e.target.value)
        this.setState({
            parentId:e.target.value.split('/')[0],
        });
        };
    changeOption1=(e)=>{
        get_third_subjects(this.state.parentId,e.target.value.split('/')[0]).then(res=>{
            this.setState({
                secondParent:res.data.data,
                firstId:e.target.value.split('/')[0],
                secondSubject:e.target.value.split('/')[1],
            })
        })

    };
    changeOption2=(e)=>{
        get_third_route(this.state.parentId,this.state.firstId,e.target.value.split('/')[0]).then(res=>{
            this.setState({
                routes:res.data.data,
            })
        });
        console.log(e.target.value)
        this.setState({
            secondId:e.target.value.split('/')[0],
            thirdSub:e.target.value.split('/')[1],
        })
    };
    change_route=(e)=>{
        this.setState({
            routeCode:e.target.value,
        });
    };

    post_subjects=()=>{
        get_process().then(res=>{
            console.log(res)

            if (res.status===400) {
                localStorage.setItem("s1",this.state.parentId)
                localStorage.setItem("s2",this.state.firstId)
                localStorage.setItem("s3",this.state.secondId)
                localStorage.setItem("proc", "false")
                window.location.href = "/testing"
            } else if(res.status === 200 && !res.data.succes) {

                localStorage.setItem("s1",this.state.parentId)
                localStorage.setItem("s2",this.state.firstId)
                localStorage.setItem("s3",this.state.secondId)
                localStorage.getItem("proc", "false")
                window.location.href = "/testing"
            } else {
                localStorage.getItem("proc", "true")
            };
        }).catch(err=>{
            localStorage.setItem("s1",this.state.parentId)
            localStorage.setItem("s2",this.state.firstId)
            localStorage.setItem("s3",this.state.secondId)
            localStorage.setItem("proc","false");
            window.location.href = "/testing"});
        // var data={
        //     "blokFirstId": `${this.state.parentId}`,
        //     "blokSecondId": `${this.state.firstId}`,
        //     "blokThirdId": `${this.state.secondId}`
        // };
        // post_subjects_id(data).then(res=>{
        //     console.log(res.data)
        // })
    };

    componentDidMount() {
        this.get_subjects();
        this.get_routess();
    }

    render() {
        const {uzLang}=this.props;
        const {selected1,
            selected2,
            selected3,
            selected4,
            subjects,
            firstParent,
            secondParent,
            firstSub,
            secondSubject,
            thirdSub,
            routeCode,
            routes}=this.state;

        return (
            <div className='bg-img mt-5 pb-5'>
                <div className='container'>
                    <div className='row pt-5'>
                        <div className='col-12 col-md-3'>

                        </div>
                        <div className='col-12 col-md-6 mt-5 card_form bg-white p-3'>
                            <p className='form_header text-center pb-3'>{uzLang?"Virtual Imtihon":"Виртуальный экзамен"}</p>
                            <Form.Group>
                                <p className='m-0'><strong>{uzLang?"Birinchi fan":"Первая наука"}</strong></p>
                                <Form.Control onBlur={this.changeOption} onChange={this.changeOption} onClick={this.selectedLesson} className='form_item firstSelect' as="select">
                                    {
                                        subjects.map((item,key)=>(
                                            <option defaultValue={subjects&&subjects[0]&&subjects[0].id} value={uzLang?(item.id+"/"+item.nameUz):(item.id+"/"+item.nameRu)}>{uzLang?item.nameUz:item.nameRu}</option>
                                        ))
                                    }

                                </Form.Control>
                                <p className='m-0'><strong>{uzLang?"Ikkinchi fan":"Вторая наука"}</strong></p>
                                <Form.Control onBlur={this.changeOption1} onChange={this.changeOption1} onClick={this.selectedLesson2} disabled={selected1}  className='form_item secondSelect' as="select">
                                    {
                                        firstParent.map((item,key)=>(
                                            <option defaultValue={firstParent&&firstParent[0]&&firstParent[0].id} value={uzLang?(item.id+"/"+item.nameUz):(item.id+"/"+item.nameRu)}>{uzLang?item.nameUz:item.nameRu}</option>
                                        ))
                                    }


                                </Form.Control>
                                <p className='m-0'><strong>{uzLang?"Uchinchi fan":"Третья наука"}</strong></p>
                                <Form.Control onBlur={this.changeOption2} onChange={this.changeOption2} onClick={this.selectedLesson3} disabled={selected2} className='form_item thirdSelect' as="select">
                                    {
                                        secondParent.map(item=>(
                                            <option defaultValue={secondParent&&secondParent[0]&&secondParent[0].id} value={uzLang?(item.id+"/"+item.nameUz):(item.id+"/"+item.nameRu)}>{uzLang?item.nameUz:item.nameRu}</option>
                                        ))
                                    }
                                </Form.Control>
                                <hr className='mb-4' />
                                <p className='m-0'><strong>{uzLang?"Ta'lim to'nalishi":"Вор образования"}</strong></p>
                                <Form.Control onChange={this.change_route} disabled={selected3}  onClick={this.selectedLesson4} className='form_item' as="select">
                                    {routes.map(item=>(
                                        <option value={item.code}>{item.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th className='table_text'>{uzLang?"Mutaxassislik kodi":"Код специальности"}</th>
                                        <th className='table_text'>{routeCode}</th>
                                    </tr>
                                </thead>
                                <thead>
                                    <tr>
                                        <th className='table_text'>{uzLang?"Test kodi":"Тестовый код"}</th>
                                        <th className='table_text'>{routeCode}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='table_text'>{firstSub}</td>
                                        <td className='table_text'>3.1</td>
                                    </tr>
                                    <tr>
                                        <td className='table_text'>{secondSubject}</td>
                                        <td className='table_text'>2.1</td>
                                    </tr>
                                    <tr>
                                        <td className='table_text'>{thirdSub}</td>
                                        <td className='table_text'>1.1</td>
                                    </tr>
                                    <tr>
                                        <td className='bold-text'>{uzLang?"Sinov umumiy vaqti":"Общее время тестирования"}</td>
                                        <td className='bold-text'>180 {uzLang?"minut":"минут"}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className='text-center'>
                                <button onClick={this.post_subjects} disabled={selected4} className='start_btn text-center px-3 py-1'>
                                    {uzLang?"Boshlamoq":"Начать"}
                                    {/*<NavLink disabled={selected4} className='text-white dec-none' to={getToken(tokenKey)?"/testing":"/signup"}>Boshlamoq</NavLink>*/}
                                </button>
                            </div>
                        </div>
                        <div className='col-12 col-md-3'>

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
    TestSelect
)