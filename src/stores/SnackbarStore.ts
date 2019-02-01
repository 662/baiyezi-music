import RootStore from './RootStore';
import { observable } from 'mobx';

export default class SnackbarStore {
    root: RootStore;

    constructor(root: RootStore) {
        this.root = root;
    }
}
