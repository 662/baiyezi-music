import SearchStore from './SearchStore';
import PlaylistStore from './PlaylistStore';
import DriverStore from './DriverStore';
import PlayerStore from './PlayerStore';

export default class RootStore {
    driverStore: DriverStore;
    searchStore: SearchStore;
    // playlistStore: PlaylistStore;
    // playerStore: PlayerStore;

    constructor() {
        this.driverStore = new DriverStore(this);
        this.searchStore = new SearchStore(this);
        // this.playlistStore = new PlaylistStore(this);
        // this.playerStore = new PlayerStore(this);
    }
}
