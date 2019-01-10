import RootStore from './RootStore';
import { observable, action, autorun } from 'mobx';
import { IPlaylist, IPlaylistItem } from '../interface';

export default class PlaylistStore {
    root: RootStore;

    @observable playlists: IPlaylist[] = [];

    playlistsStorageKey = 'playlists';

    constructor(root: RootStore) {
        this.root = root;
        // 加载本地数据
        const playlistsJSON = localStorage.getItem(this.playlistsStorageKey) || '[]';
        this.playlists = JSON.parse(playlistsJSON);

        autorun(() => {
            const playlistsJSON = JSON.stringify(this.playlists);
            localStorage.addItem(this.playlistsStorageKey, playlistsJSON);
        });
    }

    @action
    createPlaylist(title: string) {
        this.playlists.push({ title, items: [] });
    }
    @action
    renamePlaylist(oldTitle: string, newTitle: string) {
        let playlist = this.playlists.find(pl => pl.title === oldTitle);
        playlist!.title = newTitle;
    }
    @action
    deletePlaylist(title: string) {
        this.playlists = this.playlists.filter(pl => pl.title !== title);
    }
    @action
    pushPlaylist(title: string, item: IPlaylistItem) {
        const playlist = this.playlists.find(pl => pl.title === title);
        playlist!.items.push(item);
    }
    @action
    popPlaylist(title: string, driver: string, id: string | number) {
        const playlist = this.playlists.find(pl => pl.title === title);
        playlist!.items = playlist!.items.filter(pli => pli.driver !== driver && pli.song.id !== id);
    }

    savePlaylists() {
        const playlistsJSON = JSON.stringify(this.playlists);
        localStorage.addItem(this.playlistsStorageKey, playlistsJSON);
    }
}
