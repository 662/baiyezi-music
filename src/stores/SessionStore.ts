import RootStore from './RootStore'
import { observable, action } from 'mobx'

export default class SessionStore {
    root: RootStore

    // github oauth token
    @observable token: string = ''

    constructor(root: RootStore) {
        this.root = root
    }

    @action
    setToken(token: string) {
        this.token = token
    }
}
