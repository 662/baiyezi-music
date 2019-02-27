import RootStore from './RootStore';
import { observable, action, flow, computed, autorun } from 'mobx';

import { IDriver, ISong, IDriverInstance } from '../interface';

export default class PlaylistStore {
    root: RootStore;

    modes: string[] = ['single', 'list', 'order', 'random'];

    // 循环 模式
    @observable modeIndex: number = 1;

    @computed get mode() {
        return this.modes[this.modeIndex];
    }
    // 播放器设置存储到storage的key
    storageKey = 'baiyezi-player';
    // 暂停
    @observable paused: boolean = false;

    // 静音
    @observable muted: boolean = false;

    // 音量
    @observable volume: number = 100;

    // 总时长
    @observable duration: number = 0;

    // 播放进度
    @observable currentTime: number = 0;

    @observable whoChangedCurrentTime: 'audio' | 'slider' = 'audio';

    constructor(root: RootStore) {
        this.root = root;
        this.load();
        autorun(() => this.save());
    }

    save() {
        const playerJSON = JSON.stringify({
            paused: this.paused,
            muted: this.muted,
            volume: this.volume,
            duration: this.duration,
            currentTime: this.currentTime,
            modeIndex: this.modeIndex,
        });
        localStorage.setItem(this.storageKey, playerJSON);
    }
    load() {
        const playerJSON = localStorage.getItem(this.storageKey) || '{}';
        const saveData = JSON.parse(playerJSON);
        this.paused = saveData.paused || this.paused;
        this.muted = saveData.muted || this.muted;
        this.volume = saveData.volume || this.volume;
        this.duration = saveData.duration || this.duration;
        this.currentTime = saveData.currentTime || this.currentTime;
        this.modeIndex = saveData.modeIndex || this.modeIndex;
    }

    @action
    changePaused() {
        this.paused = !this.paused;
    }
    @action
    changeMuted() {
        this.muted = !this.muted;
    }
    @action
    changeVolume(volume: number) {
        this.volume = volume;
        if (volume === 0) {
            this.muted = true;
        } else {
            this.muted = false;
        }
    }
    @action
    changeMode() {
        this.modeIndex = this.modeIndex === this.modes.length - 1 ? 0 : this.modeIndex + 1;
    }
    @action
    changeDuration(duration: number) {
        this.duration = duration;
    }
    @action
    changeCurrentTime(currentTime: number, whoChangedCurrentTime: 'audio' | 'slider') {
        this.currentTime = currentTime;
        this.whoChangedCurrentTime = whoChangedCurrentTime;
    }
}
