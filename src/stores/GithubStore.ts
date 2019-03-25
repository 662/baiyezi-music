import RootStore from './RootStore'
import { observable, action, flow } from 'mobx'
import OAuth from '../github/OAuth'

export default class GithubStore {
    root: RootStore
    oauth: OAuth
    authorizeURL: string

    // github oauth token
    @observable token: string = ''

    constructor(root: RootStore) {
        this.root = root
        this.oauth = new OAuth('8353b545fe018f2066ef', '838e759c5f223e2604e0ae3126b6f6eec48843a9', 'user gist', '/')
        this.authorizeURL = this.oauth.getAuthorizeURL()
    }

    @action
    setToken(token: string) {
        this.token = token
    }

    getAccessToken = flow(function*(this: GithubStore, code: string) {
        this.token = yield this.oauth.getAccessToken(code)
    })
}
