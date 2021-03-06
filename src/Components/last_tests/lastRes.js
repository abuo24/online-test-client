import React, {Component} from 'react';
import '../last_tests/lastRes.css'
// import {Table} from 'react-bootstrap'
import {connect} from 'react-redux';
import {RuLang} from '../../redux/Actions/RuLang';
import {UzLang} from '../../redux/Actions/UzLang';
import {Table, Tag, Space} from 'antd';
import {getHistories} from "../../server/user/user";

class LastRes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        }
    }

    getHistory = (page = 0) => {
        const {currentPage} = this.state;
        const current = currentPage - 1;
        if (current >= 0) {
            getHistories(current).then(res =>
            {
                const list = []
                this.setState({history: res.data.data.histories})
                res.data.data.histories.map((item, key) => {
                    const obj = {
                        key: key + 1,
                        name: item.user.first_name + " " + item.user.last_name,
                        number: item.blok.questionSecondList.length + item.blok.questionFirstList.length + item.blok.questionThirdList.length,
                        address: item.countAll,
                        ball: item.ballAll,
                        age: (item.percentAll * 100).toFixed(2),
                        date: item.createAt.slice(0, 16),
                    }
                    list.push(obj)
                })

                this.setState({
                    isFetching: false,
                    selectedRowKeys: [],
                    totalElements: res.data.data.totalItems,
                    list: res.data.data.subjects,
                    listDatas: list
                })
            }).catch(err => console.log(err))
        }
    }

    componentDidMount() {
        this.getHistory()
    }

    handlePaginationChange = (page) => {
        this.setState({
            currentPage: page,
        }, () => this.getHistory());
    };

    render() {
        const {uzLang} = this.props;
        const {history, currentPage, totalElements, listDatas} = this.state;
        const columns = [
            {
                title: uzLang?"Ism familiyasi":"?????? ?? ??????????????",
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
            },
            {
                title: uzLang?"Testlar soni":"???????????????????? ????????????",
                dataIndex: 'number',
                key: 'number',
            },
            {
                title: uzLang?"To'g'ri belgilanganlar":"?????????????????? ??????????????",
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: uzLang?"Foiz":"??????????????????",
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: uzLang?"Ball":"????????",
                dataIndex: 'ball',
                key: 'ball',
            },
            {
                title: uzLang?"Sana vaqti":"???????? ??????????",
                dataIndex: 'date',
                key: 'date',
            },
        ];

        return (
            <div className='container'>
                <p className='text-center mt-4 fs-25'>{uzLang ? "Umumiy test natijalari" : "?????????? ???????????????????? ??????????????????"}</p>
                <div className='scroll'>
                    <Table columns={columns} dataSource={listDatas}
                           pagination={{
                               current: currentPage,
                               total: totalElements,
                               pageSize: 10,
                               onChange: this.handlePaginationChange,
                               showTotal: (totalElements) => `??????: ${totalElements}`,
                           }}
                    />
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
export default connect(mapStateToProps, {UzLang, RuLang})(
    LastRes
)