import RootStore from './RootStore'
import { observable, action, flow, computed, autorun, observe } from 'mobx'

import { IDriver, ISong, IDriverInstance } from '../interface'

export default class PlayerStore {
    root: RootStore
    // 播放器设置存储到storage的key
    storageKey = 'baiyezi-player'

    modes: string[] = ['single', 'list', 'order', 'random']

    // 循环 模式
    @observable modeIndex: number = 1

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

    @computed get mode() {
        return this.modes[this.modeIndex]
    }

    @observable src: string = ''
    @observable playlistIndex: number = 0

    // 当前播放的歌曲
    get song() {
        return this.root.playlistStore.songs[this.playlistIndex]
    }

    constructor(root: RootStore) {
        this.root = root
        this.load()
        autorun(() => this.save())
        observe(this, 'playlistIndex', change => this.fetchSrc())
        if (this.root.playlistStore.songs.length > this.playlistIndex) {
            this.fetchSrc()
        } else {
            this.currentTime = 0
            this.duration = 0
            this.playlistIndex = 0
        }
    }

    save() {
        const playerJSON = JSON.stringify({
            muted: this.muted,
            volume: this.volume,
            duration: this.duration,
            currentTime: this.currentTime,
            modeIndex: this.modeIndex,
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
        this.modeIndex = saveData.modeIndex || this.modeIndex
        this.playlistIndex = saveData.playlistIndex || this.playlistIndex
        this.src = saveData.src || this.src
    }

    @action
    changePaused(paused: boolean) {
        this.paused = paused
    }
    @action
    changeMuted() {
        this.muted = !this.muted
    }
    @action
    changeVolume(volume: number) {
        this.volume = volume
        this.muted = volume === 0
    }
    @action
    changeMode() {
        this.modeIndex = this.modeIndex === this.modes.length - 1 ? 0 : this.modeIndex + 1
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
        const playlistLength = this.root.playlistStore.songs.length
        console.log(this.playlistIndex, playlistLength, this.mode)
        switch (this.mode) {
            case 'single':
                this.currentTime = 0
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
        const playlistLength = this.root.playlistStore.songs.length
        switch (this.mode) {
            case 'single':
                this.currentTime = 0
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
        if (this.song) {
            const driver = this.root.driverStore.drivers.find(item => item.title === this.song.driver)
            const src = yield driver!.instance.find(this.song.id)
            this.src = src
        } else {
            this.src = ''
        }
    })
}
