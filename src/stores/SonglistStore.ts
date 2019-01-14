import RootStore from './RootStore';
import { observable, action, autorun } from 'mobx';
import { ISonglist, ISong } from '../interface';

export default class SonglistStore {
    root: RootStore;

    @observable songlists: ISonglist[] = [];

    songlistsStorageKey = 'baiyezi-songlists';

    constructor(root: RootStore) {
        this.root = root;
        // 加载本地数据
        const songlistsJSON = localStorage.getItem(this.songlistsStorageKey) || '[]';
        this.songlists = JSON.parse(songlistsJSON);

        autorun(() => {
            const songlistsJSON = JSON.stringify(this.songlists);
            localStorage.setItem(this.songlistsStorageKey, songlistsJSON);
        });
    }

    @action
    createSonglist(title: string) {
        if (title) {
            if (this.songlists.some(item => item.title === title)) {
                throw `歌单名已存在`;
            } else {
                this.songlists.push({ title, items: [] });
            }
        }
    }
    @action
    renameSonglist(oldTitle: string, newTitle: string) {
        let songlist = this.songlists.find(pl => pl.title === oldTitle);
        songlist!.title = newTitle;
    }
    @action
    deleteSonglist(title: string) {
        this.songlists = this.songlists.filter(pl => pl.title !== title);
    }
    @action
    pushSonglist(title: string, item: ISong) {
        const songlist = this.songlists.find(pl => pl.title === title);
        songlist!.items.push(item);
    }
    @action
    popSonglist(title: string, driver: string, id: string | number) {
        const songlist = this.songlists.find(pl => pl.title === title);
        songlist!.items = songlist!.items.filter(pli => pli.driver !== driver && pli.id !== id);
    }

    savesonglists() {
        const songlistsJSON = JSON.stringify(this.songlists);
        localStorage.addItem(this.songlistsStorageKey, songlistsJSON);
    }
}
