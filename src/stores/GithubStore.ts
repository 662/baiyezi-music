import RootStore from './RootStore'
import { observable, action, flow, autorun } from 'mobx'
import OAuth from '../github/OAuth'
import GithubSync from '../github/Sync'

export default class GithubStore {
    root: RootStore
    oauth: OAuth
    authorizeURL: string
    githubSync?: GithubSync

    // github oauth token
    @observable token: string = ''

    @observable syncing: boolean = false

    constructor(root: RootStore) {
        this.root = root
        this.oauth = new OAuth('8353b545fe018f2066ef', '838e759c5f223e2604e0ae3126b6f6eec48843a9', '/', 'user gist')
        this.authorizeURL = this.oauth.getAuthorizeURL()
        const token = localStorage.getItem('github-token')
        if (token) {
            this.token = token
            this.githubSync = new GithubSync(token)
        }
        autorun(() => localStorage.setItem('github-token', this.token))
    }

    @action
    oauthSuccess(token: string) {
        this.token = token
        this.githubSync = new GithubSync(token)
        this.sync()
    }

    sync = flow(function*(this: GithubStore) {
        this.syncing = true
        this.root.playlistStore.songs = yield this.githubSync!.syncPlaylist(this.root.playlistStore.songs)
        this.root.songlistStore.songlists = yield this.githubSync!.syncSonglist(this.root.songlistStore.songlists)
        this.syncing = false
    })

    getAccessToken = flow(function*(this: GithubStore, code: string) {
        this.token = yield this.oauth.getAccessToken(code)
        return this.token
    })
}
