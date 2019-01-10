import RootStore from './RootStore';
import { observable, action, autorun } from 'mobx';
import { IPlaylist, IDriverSong } from '../interface';

export default class SonglistStore {
    root: RootStore;

    @observable songlists: IPlaylist[] = [];

    songlistsStorageKey = 'songlists';

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
    createPlaylist(title: string) {
        this.songlists.push({ title, items: [] });
    }
    @action
    renamePlaylist(oldTitle: string, newTitle: string) {
        let playlist = this.songlists.find(pl => pl.title === oldTitle);
        playlist!.title = newTitle;
    }
    @action
    deletePlaylist(title: string) {
        this.songlists = this.songlists.filter(pl => pl.title !== title);
    }
    @action
    pushPlaylist(title: string, item: IDriverSong) {
        const playlist = this.songlists.find(pl => pl.title === title);
        playlist!.items.push(item);
    }
    @action
    popPlaylist(title: string, driver: string, id: string | number) {
        const playlist = this.songlists.find(pl => pl.title === title);
        playlist!.items = playlist!.items.filter(pli => pli.driver !== driver && pli.song.id !== id);
    }

    savesonglists() {
        const songlistsJSON = JSON.stringify(this.songlists);
        localStorage.addItem(this.songlistsStorageKey, songlistsJSON);
    }
}
