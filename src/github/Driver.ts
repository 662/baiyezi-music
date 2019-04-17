import Github from 'github-api'
import Helper from './Helper'
import { ISong, ISonglist } from '../interface'

export default class Driver {
    helper?: Helper
    github?: Github
    storeName = 'baiyezi-music'
    storeGistID?: number

    async initGithub(token: string) {
        this.github = new Github({ token })
        this.helper = new Helper(this.github)
    }

    async createStore() {
        return await this.helper!.createGist(this.storeName, {
            'playlist.json': { content: '[]' },
            'songlist.json': { content: '[]' },
        })
    }

    async getStore() {
        if (!this.helper) throw new Error('尚未获得github授权')

        let store: any = null
        if (this.storeGistID) {
            store = await this.helper.findGistById(this.storeGistID)
        } else {
            store = await this.helper.findMyGistByDescription('baiyezi-music')
            if (store) {
                store = await this.helper.findGistById(store.id)
            } else {
                store = await this.createStore()
            }
        }
        return store
    }

    async syncPlaylist(songs: ISong[]) {
        const store = await this.getStore()
        const oldData = JSON.parse(store.files[`playlist.json`].content)
        const newData: ISong[] = []
        return this.helper!.updateGistFiles(store.id, {
            'playlist.json': { content: newData },
        })
    }
    async syncSonglist(songlists: ISonglist[]) {
        const store = await this.getStore()
        const oldData = JSON.parse(store.files[`songlist.json`].content)
        const newData: ISonglist[] = []
        return this.helper!.updateGistFiles(store.id, {
            'playlist.json': { content: newData },
        })
    }
}
