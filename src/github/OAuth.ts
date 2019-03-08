import qs from 'query-string'
import fetch from 'isomorphic-fetch'

export default class OAuth {
    url = {
        authorize: 'https://github.com/login/oauth/authorize',
        access_token: 'https://github.com/login/oauth/access_token',
        cross_origin: 'https://cors-anywhere.herokuapp.com',
    }

    constructor({ client_id, client_secret, redirect_url, scope }) {
        this.config = { client_id, client_secret, redirect_url, scope }
    }
    getAuthorizeURL(state = '') {
        const { client_id, scope } = this.config
        const queryString = qs.stringify({ client_id, scope, state })
        return `${this.url.authorize}?${queryString}`
    }
    getAccessTokenURL(code) {
        const { client_id, client_secret } = this.config
        const query = { client_id, client_secret, code }
        const queryString = qs.stringify(query)
        return `${this.url.cross_origin}/${this.url.access_token}?${queryString}`
    }
    async getAccessToken(code) {
        const url = this.getAccessTokenURL(code)
        const response = await fetch(url)
        const responseText = await response.text()
        const responseData = qs.parse(responseText)
        return responseData
    }
}
