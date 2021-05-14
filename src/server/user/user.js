import {host, httpRequest} from "../host";

export let signin = (object) => {
    let config = {
        url: `${host}/api/auth/login`,
        method: 'post',
        data: object
    }
    return httpRequest(config);
}

export const get_subject = () => {
    let config = {
        url: `${host}/api/client/subject/all`,
        method: 'get'
    }
    return httpRequest(config)
}
export const getUser = () => {
    let config = {
        url: `${host}/api/auth/me`,
        method: 'get'
    }
    return httpRequest(config)
}
export const get_secont_subjects = (id) => {
    let config = {
        url: `${host}/api/client/subject/${id}`,
        method: 'get'
    };
    return httpRequest(config)

};
export const get_secont_route = (id) => {
    let config = {
        url: `${host}/api/client/route/${id}`,
        method: 'get'
    };
    return httpRequest(config)

};
export const get_third_route = (id, parentId, firstId) => {
    let config = {
        url: `${host}/api/client/routes/${id}?subjectSecondId=${parentId}&subjectThirdId=${firstId}`,
        method: 'get'
    };
    return httpRequest(config)
}
export const get_third_subjects = (id, secondId) => {
    let config = {
        url: `${host}/api/client/subjects/${id}?parentSecondId=${secondId}`,
        method: 'get',
    }
    return httpRequest(config)
};
export const saveAnswer = (id, selectedId) => {
    let config = {
        url: `${host}/api/user/blok/${id}?selectedId=${selectedId}`,
        method: 'post',
    }
    return httpRequest(config)
};
export const finishedTest = (blokId) => {
    let config = {
        url: `${host}/api/user/verifying/${blokId}`,
        method: 'get',
    }
    return httpRequest(config)
};
export const get_routes = () => {
    let config = {
        url: `${host}/api/client/route/all`,
        method: 'get'
    };
    return httpRequest(config)
};
export const get_process = () => {
    let config = {
        url: `${host}/api/user/blok/process`,
        method: 'get'
    };
    return httpRequest(config)
};
export const getHistories = (page, size=10) => {
    let config = {
        url: `${host}/api/client/history/all?page=${page}&size=${size}`,
        method: 'get'
    };
    return httpRequest(config)
};
export const createBlok = (data) => {
    let config = {
        url: `${host}/api/user/blok`,
        method: 'post',
        data: data
    };
    return httpRequest(config)
};

export const post_subjects_id = (data) => {
    let config = {
        url: `${host}/api/user/blog`,
        method: 'post',
        data: data
    };
    return httpRequest(config)
};