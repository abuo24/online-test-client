import {GetLanguage, GetRuLanguage, getValue, SetLocalstorage} from '../../utilits';

const initialState={
    uzLang: localStorage.getItem("Zako")==='UZ'
};

export const langReducer = (state=initialState,action)=>{
    switch(action.type){
        case "UzLang":
            
            SetLocalstorage("Zako","UZ")
            return {uzLang:true}
        case "RuLang":

            SetLocalstorage("Zako","RU")
            return{
                uzLang:false,
            }
        default:
        // {!GetRuLanguage()?SetLocalstorage("Zako","RU"):SetLocalstorage("Zako","UZ")}
        return{
            uzLang:localStorage.getItem("Zako")==='UZ',
        };
    }
};