import RootStore from './RootStore'
import { action, computed, flow, autorun, observable } from 'mobx'
import { ISong } from '../interface'

export default class PlaylistStore {
    root: RootStore
    // 播放清单
    @observable songs: ISong[] = []
    get availableSongs() {
        return this.songs.filter(s => s.flag !== 'deleted')
    }
    // 清单存储到storage的key
    storageKey = 'baiyezi-playlist'

    constructor(root: RootStore) {
        this.root = root
        this.load()
        autorun(() => this.save())
    }

    save() {
        const playlistJSON = JSON.stringify(this.songs)
        localStorage.setItem(this.storageKey, playlistJSON)
    }
    load() {
        const playlistJSON = localStorage.getItem(this.storageKey) || '[]'
        const saveData = JSON.parse(playlistJSON)
        this.songs = saveData || this.songs
    }

    // 添加一首歌到播放列表
    @action
    add(item: ISong, play: boolean = false) {
        const predicate = (song: ISong) => song.id === item.id && song.driver == item.driver
        const oldIndex = this.songs.findIndex(predicate)
        let playIndex = oldIndex
        if (oldIndex === -1) {
            item.flag = 'created'
            this.songs.push(item)
            playIndex = this.songs.length - 1
        }
        if (play) {
            this.root.playerStore.playlistIndex = playIndex
        }
    }

    @action
    append(songs: ISong[], play: boolean = false) {
        for (let i = 0; i < songs.length; i++) {
            i === 0 && play ? this.add(songs[i], true) : this.add(songs[i])
        }
    }

    // 清空播放列表
    @action
    clear() {
        // this.songs = []
        this.songs.forEach(s => (s.flag = 'deleted'))
        this.root.playerStore.src = ''
        this.root.playerStore.playlistIndex = 0
    }

    // 删除某一首歌
    @action
    remove(index: number) {
        this.songs.find((s, i) => i === index)!.flag = 'deleted'
        // this.songs.splice(index, 1)
        if (index === this.root.playerStore.playlistIndex) {
            this.root.playerStore.fetchSrc()
        } else if (index < this.root.playerStore.playlistIndex) {
            this.root.playerStore.playlistIndex--
        }
    }
}
