import Github from 'github-api'
import Helper from './Helper'
import { ISong, ISonglist, ISync } from '../interface'

export default class Sync {
    helper?: Helper
    github?: Github
    storeName = 'baiyezi-music'
    storeGistID?: number

    constructor(token: string) {
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
    async syncPlaylist(local: ISong[]) {
        const store = await this.getStore()
        const remote = JSON.parse(store.files[`playlist.json`].content)
        const merged: ISong[] = this.mergeSongs(local, remote)
        await this.helper!.updateGistFiles(store.id, {
            'playlist.json': { content: JSON.stringify(merged, null, 4) },
        })
        return merged
    }
    async syncSonglist(local: ISonglist[]) {
        const store = await this.getStore()
        const remote = JSON.parse(store.files[`songlist.json`].content)
        const merged: ISonglist[] = this.mergeSonglists(local, remote)
        await this.helper!.updateGistFiles(store.id, {
            'songlist.json': { content: JSON.stringify(merged, null, 4) },
        })
        return merged
    }

    mergeSonglists(local: ISonglist[], remote: ISonglist[]) {
        const merged = this.merge(local, remote, a => b => a.title === b.title)
        merged.forEach(m => {
            const remoteItems = remote.find(r => r.title === m.title)
            if (remoteItems) {
                m.items = this.merge(m.items, remoteItems.items, a => b => a.id === b.id && a.driver === b.driver)
            }
        })
        return merged
    }

    mergeSongs(local: ISong[], remote: ISong[]) {
        return this.merge(local, remote, a => b => a.id === b.id && a.driver === b.driver)
    }

    merge<T extends ISync>(local: T[], remote: T[], filter: (a: T) => (b: T) => boolean) {
        const merged = JSON.parse(JSON.stringify(local)) as T[]
        remote.forEach(r => {
            // 远端有 & 本地无 -> 增加
            // 表示数据在远端被新增
            if (!merged.some(filter(r))) {
                merged.push(r)
            }
        })

        const deleted: number[] = []
        merged.forEach((m, i) => {
            if (remote.some(filter(m))) {
                // 远端有 & 本地被标记删除 -> 删除
                // 表示数据在本地被删除
                if (m.flag === 'deleted') deleted.push(i)
            } else {
                // 远端无 & 本地未被标记新增 -> 删除
                // 表示数据在远端被删除
                if (m.flag !== 'created') deleted.push(i)
            }
            delete m.flag
        })
        deleted.forEach(d => merged.splice(d, 1))
        return merged
    }
}
