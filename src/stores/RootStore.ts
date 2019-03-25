import SearchStore from './SearchStore'
import DriverStore from './DriverStore'
import PlaylistStore from './PlaylistStore'
import SonglistStore from './SonglistStore'
import SnackbarStore from './SnackbarStore'
import PlayerStore from './PlayerStore'
import SessionStore from './SessionStore'
import GithubStore from './GithubStore'

export default class RootStore {
    driverStore: DriverStore
    searchStore: SearchStore
    playlistStore: PlaylistStore
    songlistStore: SonglistStore
    snackbarStore: SnackbarStore
    playerStore: PlayerStore
    sessionStore: SessionStore
    githubStore: GithubStore

    constructor() {
        this.driverStore = new DriverStore(this)
        this.searchStore = new SearchStore(this)
        this.playlistStore = new PlaylistStore(this)
        this.songlistStore = new SonglistStore(this)
        this.snackbarStore = new SnackbarStore(this)
        this.playerStore = new PlayerStore(this)
        this.sessionStore = new SessionStore(this)
        this.githubStore = new GithubStore(this)
    }
}
