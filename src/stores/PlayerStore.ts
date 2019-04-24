import RootStore from './RootStore'
import { observable, action, flow, autorun, observe } from 'mobx'

export default class PlayerStore {
    root: RootStore
    // 播放器设置存储到storage的key
    storageKey = 'baiyezi-player'

    // 播放模式
    @observable mode: 'single' | 'list' | 'order' | 'random' = 'list'

    // 暂停
    @observable paused: boolean = true

    // 静音
    @observable muted: boolean = false

    // 音量
    @observable volume: number = 100

    // 总时长
    @observable duration: number = 0

    // 播放进度
    @observable currentTime: number = 0

    @observable src: string = ''
    @observable playlistIndex: number = 0

    get playlist() {
        return this.root.playlistStore.availableSongs
    }
    // 当前播放的歌曲
    get currentSong() {
        return this.playlist[this.playlistIndex]
    }

    constructor(root: RootStore) {
        this.root = root
        this.load()
        autorun(() => this.save())
        observe(this, 'playlistIndex', change => this.fetchSrc())
        if (this.playlist.length > this.playlistIndex) {
            this.fetchSrc()
        } else {
            this.currentTime = 0
            this.duration = 0
            this.playlistIndex = 0
            this.src = ''
        }
    }

    save() {
        const playerJSON = JSON.stringify({
            muted: this.muted,
            volume: this.volume,
            duration: this.duration,
            currentTime: this.currentTime,
            mode: this.mode,
            src: this.src,
            playlistIndex: this.playlistIndex,
        })
        localStorage.setItem(this.storageKey, playerJSON)
    }
    load() {
        const playerJSON = localStorage.getItem(this.storageKey) || '{}'
        const saveData = JSON.parse(playerJSON)
        this.muted = saveData.muted || this.muted
        this.volume = saveData.volume || this.volume
        this.duration = saveData.duration || this.duration
        this.currentTime = saveData.currentTime || this.currentTime
        this.mode = saveData.mode || this.mode
        this.playlistIndex = saveData.playlistIndex || this.playlistIndex
        this.src = saveData.src || this.src
    }

    @action
    changePaused(paused: boolean) {
        this.paused = paused
    }
    @action
    changeMuted(muted: boolean) {
        this.muted = muted
    }
    @action
    changeVolume(volume: number) {
        this.volume = volume
        this.muted = volume === 0
    }
    @action
    changeMode(mode: 'single' | 'list' | 'order' | 'random') {
        this.mode = mode
    }
    @action
    changeDuration(duration: number) {
        this.duration = duration
    }
    @action
    changeCurrentTime(currentTime: number) {
        this.currentTime = currentTime
    }

    @action
    playNext() {
        const playlistLength = this.playlist.length
        switch (this.mode) {
            case 'single':
                this.src += ' '
                break
            case 'list':
                this.playlistIndex = this.playlistIndex < playlistLength - 1 ? this.playlistIndex + 1 : 0
                break
            case 'order':
                if (this.playlistIndex < playlistLength - 1) this.playlistIndex = this.playlistIndex + 1
                break
            case 'random':
                this.playlistIndex = Math.round(Math.random() * (playlistLength - 1))
                break
        }
    }

    @action
    playPrev() {
        const playlistLength = this.playlist.length
        switch (this.mode) {
            case 'single':
                this.src += ' '
                break
            case 'list':
                this.playlistIndex = this.playlistIndex > 0 ? this.playlistIndex - 1 : playlistLength - 1
                break
            case 'order':
                if (this.playlistIndex > 0) this.playlistIndex = this.playlistIndex - 1
                break
            case 'random':
                this.playlistIndex = Math.round(Math.random() * (playlistLength - 1))
                break
        }
    }

    fetchSrc = flow(function*(this: PlayerStore) {
        if (this.currentSong) {
            const driver = this.root.driverStore.drivers.find(item => item.title === this.currentSong.driver)
            const src = yield driver!.instance.find(this.currentSong.id)
            this.src = src
        } else {
            this.src = ''
        }
    })
}
