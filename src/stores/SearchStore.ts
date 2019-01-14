import RootStore from './RootStore';
import { observable, action, flow } from 'mobx';

import { IDriver, ISong, ISearchResult } from '../interface';

export interface DriverInstance {
    title: string;
    instance: IDriver;
}

export class SearchResult {
    @observable searching: boolean = true;
    @observable title: string = '';
    @observable total: number = 0;
    @observable songs: ISong[] = [];
}

export default class SearchStore {
    root: RootStore;
    @observable keywords: string = '雪落下的声音';
    @observable result: SearchResult[] = [];

    constructor(root: RootStore) {
        this.root = root;
    }

    @action
    setKeyowrds(keyowrds: string) {
        this.keywords = keyowrds;
    }

    @action
    search() {
        this.result = [];
        this.root.driverStore.drivers.forEach(d => this.runDriver(d));
    }

    runDriver = flow(function*(this: SearchStore, driver: DriverInstance) {
        const resultItem = new SearchResult();
        resultItem.title = driver.title;
        this.result.push(resultItem);
        const { total, list }: ISearchResult = yield driver.instance.search(this.keywords, 1, 20);
        resultItem.total = total;
        resultItem.songs = list;
        resultItem.searching = false;
    });
}
