import SearchStore from './SearchStore';
import DriverStore from './DriverStore';
import PlaylistStore from './PlaylistStore';
import SonglistStore from './SonglistStore';

export default class RootStore {
    driverStore: DriverStore;
    searchStore: SearchStore;
    playlistStore: PlaylistStore;
    songlistStore: SonglistStore;

    constructor() {
        this.driverStore = new DriverStore(this);
        this.searchStore = new SearchStore(this);
        this.playlistStore = new PlaylistStore(this);
        this.songlistStore = new SonglistStore(this);
    }
}
