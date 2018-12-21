import SearchStore from './SearchStore';

export default class RootStore {
    searchStore: SearchStore;

    constructor() {
        this.searchStore = new SearchStore(this);
    }
}
