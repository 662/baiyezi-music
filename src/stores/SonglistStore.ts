import RootStore from './RootStore'
import { observable, action, autorun, toJS } from 'mobx'
import { ISonglist, ISong } from '../interface'

export default class SonglistStore {
    root: RootStore

    @observable songlists: ISonglist[] = []

    songlistsStorageKey = 'baiyezi-songlists'

    constructor(root: RootStore) {
        this.root = root
        // 加载本地数据
        const songlistsJSON = localStorage.getItem(this.songlistsStorageKey) || '[]'
        this.songlists = JSON.parse(songlistsJSON)

        autorun(() => {
            const songlistsJSON = JSON.stringify(this.songlists)
            localStorage.setItem(this.songlistsStorageKey, songlistsJSON)
        })
    }

    @action
    createSonglist(title: string) {
        if (title) {
            if (this.songlists.some(item => item.title === title)) {
                throw new Error(`歌单名已存在`)
            } else {
                this.songlists.push({ title, items: [], flag: 'created' })
            }
        }
    }
    @action
    renameSonglist(oldTitle: string, newTitle: string) {
        let songlist = this.songlists.find(pl => pl.title === oldTitle)!
        songlist.title = newTitle

        // 维护和远端的同步关系
        songlist.flag = 'created'
        this.songlists.push({ flag: 'deleted', title: oldTitle, items: [] })
    }
    @action
    deleteSonglist(title: string) {
        // this.songlists = this.songlists.filter(pl => pl.title !== title)
        this.songlists.find(sl => sl.title === title)!.flag = 'deleted'
    }
    @action
    pushSonglist(title: string, item: ISong) {
        const songlist = this.songlists.find(pl => pl.title === title)!
        const predicate = (song: ISong) => song.id === item.id && song.driver == item.driver
        const oldIndex = songlist.items.findIndex(predicate)
        if (oldIndex === -1) {
            item.flag = 'created'
            songlist.items.push(item)
        }
    }
    @action
    popSonglist(title: string, driver: string, id: string | number) {
        const songlist = this.songlists.find(pl => pl.title === title)!
        // songlist.items = songlist.items.filter(pli => pli.driver !== driver || pli.id !== id)
        songlist.items.find(sli => sli.driver === driver && sli.id === id)!.flag = 'deleted'
    }
}
