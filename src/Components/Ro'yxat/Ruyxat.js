import React, { Component } from "react";
import { Row, Col, Form, Input, Button } from "antd";
import "../Ro'yxat/ruyxat.css";
import {
    BrowserRouter as Router,
    NavLink,
} from "react-router-dom";
import { connect } from "react-redux";
import { UzLang } from '../../redux/Actions/UzLang'
import { RuLang } from '../../redux/Actions/RuLang'
class Ruyxat extends Component {
    state={
        isUser:false,

    }
    render() {
        const {isUser} =this.state;
        // const onFinish=(values)=>{
            
        // }
        const { uzLang } = this.props;
        return (
            <div className='bg-light pb-4'>
                <div className="sign">
                    <div className="container pt-5">
                        <div className="ruyxat bg-white p-4">
                        <p className='form_header text-center pb-3 mt-3'>{uzLang ? "Ro'yxatdan o'tish" : "Зарегистрироваться"}</p>
                            <Form>
                                <div className="form-tex" >
                                    <div>
                                        <Row>
                                            <Col md={24} sm={24} xs={24} lg={24}>
                                                <Form.Item
                                                label={uzLang ? "Ismingiz" : "Имя"}
                                                style={{color:"red",outline:"red",display:'block'}}
                                                    name="name"
                                                    rules={[{ required: true, message: uzLang ? 'Ismingizni kiriting' : "Введите ваше имя" }]}
                                                >
                                                    <Input className='inputRoyxta' placeholder="First name" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <Row>
                                            <Col md={24} sm={24} xs={24} lg={24}>
                                                <Form.Item
                                                    label={uzLang ? "Familiyangiz" : "Ваша фамилия"}
                                                    style={{color:"red",outline:"red",display:'block'}}
                                                    name="lastname"
                                                    rules={[{ required: true, message: uzLang ? 'Familiyangizni kiriting!' : "Введите свою фамилию!" }]}
                                                >
                                                    <Input className='inputRoyxta' placeholder="Last name" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <Row>
                                            <Col md={24} sm={24} xs={24} lg={24}>
                                                <Form.Item
                                                    label={uzLang ? "Telefon raqamingiz" : "Твой номер телефона"}
                                                    style={{color:"red",outline:"red",display:'block'}}
                                                    name="phone"
                                                    rules={[{ required: true, message: uzLang ? 'Telefon raqamingizni kiritng!' : "Введите свой номер телефона!" }]}
                                                >
                                                    <Input className='inputRoyxta w-100' placeholder="Phone number" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <Row>
                                            <Col md={24} sm={24} xs={24} lg={24}>
                                                <Form.Item >
                                                    <Button htmlType="submit" className='success_btn w-100 py-2 mb-2 fs-22 hover_btn'>
                                                        {uzLang ? "Ro'yxatdan o'tish" : "Зарегистрироваться"}
                                                    </Button>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <Row>
                                            <Col md={24} sm={24} xs={24} lg={24}>
                                                <Form.Item >
                                                    <NavLink to={"/home"}>
                                                    <button className='start_btn text-center px-3 py-1 w-100 my-1'><NavLink className='text-white dec-none' to='/home'>{uzLang ? "Ortga" : "Назад"}</NavLink></button>
                                                    </NavLink>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        uzLang: state.changeLang.uzLang,
    };
};
export default connect(mapStateToProps, { UzLang, RuLang })(
    Ruyxat
)