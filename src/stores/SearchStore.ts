import RootStore from './RootStore';
import { observable, action, flow } from 'mobx';

import { Driver, Song } from '../interface';

export interface DriverInstance {
    title: string;
    instance: Driver;
}

export class SearchResult {
    @observable searching: boolean = true;
    @observable title: string = '';
    @observable count: number = 0;
    @observable songs: Song[] = [];
}

export default class SearchStore {
    root: RootStore;
    drivers: DriverInstance[] = [];
    @observable selectedDrivers: [] = [];
    @observable keywords: string = '雪落下的声音';
    @observable result: SearchResult[] = [];

    constructor(root: RootStore) {
        this.root = root;
        this.drivers = this.scanDrivers();
    }

    scanDrivers() {
        const context = require.context('../drivers/', false, /\.ts$/);
        const drivers = context.keys().map(key => {
            const DriverClass = context(key).default;
            return <DriverInstance>{ title: DriverClass.title, instance: new DriverClass() };
        });
        return drivers;
    }

    @action
    setKeyowrds(keyowrds: string) {
        this.keywords = keyowrds;
    }

    @action
    search() {
        this.drivers.forEach(d => this.runDriver(d));
    }

    runDriver = flow(function*(this: SearchStore, driver: DriverInstance) {
        const resultItem = new SearchResult();
        resultItem.title = driver.title;
        this.result = [];
        this.result.push(resultItem);
        const { count, list } = yield driver.instance.search(this.keywords, 1, 20);
        resultItem.count = count;
        resultItem.songs = list;
        resultItem.searching = false;
    });
}
