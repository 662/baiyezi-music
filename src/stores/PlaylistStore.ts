import RootStore from './RootStore';
import { action, computed, flow, autorun, observable } from 'mobx';
import { ISong } from '../interface';
import { appendFile } from 'fs';

export default class PlaylistStore {
    constructor(root: RootStore) {
        this.root = root;
        const playlistJSON = localStorage.getItem(this.storageKey) || '[]';
        this.songs = JSON.parse(playlistJSON);
        if (this.songs.length > 0) this.fetchSrc();

        autorun(() => {
            const playlistJSON = JSON.stringify(this.songs);
            localStorage.setItem(this.storageKey, playlistJSON);
        });
    }

    root: RootStore;
    // 播放清单
    @observable songs: ISong[] = [];
    // 当前播放的歌曲地址
    @observable src: string = '';
    // 当前播放的歌曲在歌单中的索引
    index: number = 0;
    // 清单存储到storage的key
    storageKey = 'baiyezi-playlist';

    modes: string[] = ['single', 'list', 'order', 'random'];
    // 循环 模式
    @observable modeIndex: number = 1;
    @computed get mode() {
        return this.modes[this.modeIndex];
    }

    // 当前播放的歌曲
    @computed get current() {
        return this.songs[this.index];
    }
    // 当前播放歌曲的驱动
    @computed get currentDriver() {
        return this.root.driverStore.drivers.find(item => item.title === this.current.driver)!.instance;
    }

    // 添加一首歌到播放列表
    @action
    add(item: ISong, play: boolean = false) {
        const predicate = (song: ISong) => song.id === item.id && song.driver == item.driver;
        const oldIndex = this.songs.findIndex(predicate);
        let playIndex = oldIndex;
        if (oldIndex === -1) {
            this.songs.push(item);
            playIndex = this.songs.length - 1;
        }
        if (play) {
            this.index = playIndex;
            this.fetchSrc();
        }
    }

    @action
    append(songs: ISong[], play: boolean = false) {
        for (let i = 0; i < songs.length; i++) {
            if (i === 0 && play) {
                this.add(songs[i], true);
            } else {
                this.add(songs[i]);
            }
        }
    }

    // 清空播放列表
    @action
    clear() {
        this.songs = [];
        this.src = '';
        this.index = 0;
    }
    // 删除某一首歌
    @action
    remove(index: number) {
        this.songs.splice(index, 1);
        if (index === this.index) {
            this.fetchSrc();
        } else if (index < this.index) {
            this.index--;
        }
    }
    // 播放某一首歌
    @action
    play(index: number) {
        this.index = index;
    }

    @action
    playNext(loop: boolean = true) {
        if (this.index < this.songs.length - 1) {
            this.index = this.index + 1;
            this.fetchSrc();
        } else if (loop) {
            this.index = 0;
            this.fetchSrc();
        }
    }
    @action
    playPrev(loop: boolean = true) {
        if (this.index > 0) {
            this.index = this.index - 1;
            this.fetchSrc();
        } else if (loop) {
            this.index = this.songs.length - 1;
            this.fetchSrc();
        }
    }
    @action
    playRandom() {
        this.index = Math.round(Math.random() * (this.songs.length - 1));
        this.fetchSrc();
    }

    @action
    changeMode() {
        this.modeIndex = this.modeIndex === this.modes.length - 1 ? 0 : this.modeIndex + 1;
    }

    fetchSrc = flow(function*(this: PlaylistStore) {
        const driver = this.root.driverStore.drivers.find(item => item.title === this.current.driver);
        const src = yield driver!.instance.find(this.current.id);
        this.src = src;
    });
}
