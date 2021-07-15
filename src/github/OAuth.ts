import qs from 'query-string'

export default class OAuth {
    clientID: string
    clientSecret: string
    redirectURL: string
    scope: string
    url = {
        authorize: 'https://github.com/login/oauth/authorize',
        access_token: 'https://github.com/login/oauth/access_token',
        cross_origin: 'https://cross.662.workers.dev',
    }

    constructor(clientID: string, clientSecret: string, redirectURL: string, scope: string) {
        this.clientID = clientID
        this.clientSecret = clientSecret
        this.redirectURL = redirectURL
        this.scope = scope
    }
    getAuthorizeURL(state = '') {
        const queryString = qs.stringify({ client_id: this.clientID, scope: this.scope, state })
        return `${this.url.authorize}?${queryString}`
    }
    getAccessTokenURL(code: string) {
        const query = { client_id: this.clientID, client_secret: this.clientSecret, code }
        const queryString = qs.stringify(query)
        // return `${this.url.access_token}?${queryString}`
        return `${this.url.cross_origin}/${this.url.access_token}?${queryString}`
    }
    async getAccessToken(code: string) {
        const url = this.getAccessTokenURL(code)
        const response = await fetch(url)
        const responseText = await response.text()
        const { access_token } = qs.parse(responseText)
        return <string>access_token
    }
}
