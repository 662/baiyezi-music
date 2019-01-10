import RootStore from './RootStore';
import { observable, action, computed, flow, autorun } from 'mobx';
import { IPlaylist, IDriverSong } from '../interface';

export default class PlaylistStore {
    constructor(root: RootStore) {
        this.root = root;
        const playlistJSON = localStorage.getItem(this.storageKey) || '[]';
        this.songs = JSON.parse(playlistJSON);

        autorun(() => {
            const playlistJSON = JSON.stringify(this.songs);
            localStorage.setItem(this.storageKey, playlistJSON);
        });
        // autorun(() => {
        //     this.currentDriver.find(this.index).then((r: any) => {
        //         this.src = r;
        //     });
        // });
    }

    root: RootStore;
    // 播放清单
    songs: IDriverSong[] = [];
    // 当前播放的歌曲地址
    src: string = '';
    // 当前播放的歌曲在歌单中的索引
    index: number = 0;
    // 清单存储到storage的key
    storageKey = 'baiyezi-playlist';

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
    add(item: IDriverSong, play: boolean = false) {
        this.songs.push(item);
        if (play) {
            this.index = this.songs.length - 1;
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
    }
    // 播放某一首歌
    @action
    play(index: number) {
        this.index = index;
    }

    @action
    playNext() {
        const maxIndex = this.songs.length - 1;
        this.index = this.index < maxIndex ? this.index + 1 : 0;
    }

    fetchSrc = flow(function*(this: PlaylistStore) {
        const driver = this.root.driverStore.drivers.find(item => item.title === this.current.driver);
        const src = yield driver!.instance.find(this.current.song.id);
        this.src = src;
    });
}
