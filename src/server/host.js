import axios from 'axios';
import {getToken} from '../utilits';
import {tokenKey} from '../Components/constants/constants';

// export let host='https://online-test-web-app.herokuapp.com';
export let host='https://educational-center-web-app.herokuapp.com';

export let httpRequest=(config)=>{
    return axios({
        ...config,
        headers:{
            Authorization:getToken(tokenKey)?'Bearer '+getToken(tokenKey):''
        }
    })
 }
