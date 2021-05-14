// signin
export const getToken=(key)=>{
    return localStorage.getItem(key);
}

export const SetLocalstorage=(key,value)=>{
    localStorage.setItem(key,value)
}

export const deleteLocalStorage=(value)=>{
    localStorage.removeItem(value)
}

export const GetLanguage=()=>{
    return localStorage.getItem("Zako")==='UZ'
}

export const GetRuLanguage=()=>{
    return localStorage.getItem("Zako")==="RU"
}

export const getValue=()=>{
    return localStorage.getItem("Zako");
}
export const GetQuestionId=(id,val)=>{
    return localStorage.getItem(id)===val
}