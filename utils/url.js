import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { URL_PREFIX, ROOT_URL } = publicRuntimeConfig


export function prefixURL(url) {
    if (url.charAt(0) === '/') {
        return `${URL_PREFIX}${url}`;
    } else {
        return `${URL_PREFIX}/${url}`;
    }
}

export function getRootURL() {
    return ROOT_URL;
}