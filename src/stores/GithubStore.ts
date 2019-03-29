import RootStore from './RootStore'
import { observable, action, flow, autorun } from 'mobx'
import OAuth from '../github/OAuth'

export default class GithubStore {
    root: RootStore
    oauth: OAuth
    authorizeURL: string

    // github oauth token
    @observable token: string = localStorage.getItem('github-token') || ''

    constructor(root: RootStore) {
        this.root = root
        this.oauth = new OAuth('8353b545fe018f2066ef', '838e759c5f223e2604e0ae3126b6f6eec48843a9', 'user gist', '/')
        this.authorizeURL = this.oauth.getAuthorizeURL()
        autorun(() => localStorage.setItem('github-token', this.token))
    }

    @action
    oauthSuccess(token: string) {
        this.token = token
        this.root.snackbarStore.success('已成功登录Github')
    }

    sync() {
        console.log('sync: start.')
    }

    getAccessToken = flow(function*(this: GithubStore, code: string) {
        this.token = yield this.oauth.getAccessToken(code)
        return this.token
    })
}
