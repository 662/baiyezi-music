import RootStore from './RootStore';
import { observable, action } from 'mobx';
import { SnackbarVariant } from '../interface';

interface ISnackMessage {
    key: number;
    message: string;
    variant: SnackbarVariant;
}
export default class SnackbarStore {
    root: RootStore;

    @observable key: number = new Date().valueOf();
    @observable open: boolean = false;
    @observable message: string = '';
    @observable variant: SnackbarVariant = 'info';
    queue: ISnackMessage[] = [];

    constructor(root: RootStore) {
        this.root = root;
    }
    @action close() {
        this.open = false;
    }
    @action push(message: string, variant: SnackbarVariant) {
        this.queue.push({ message, variant, key: new Date().valueOf() });
        if (this.open) {
            this.open = false;
        } else {
            this.show();
        }
    }
    @action show() {
        if (this.queue.length > 0) {
            const content = this.queue.shift()!;
            this.message = content.message;
            this.variant = content.variant;
            this.open = true;
        }
    }
    @action success(message: string) {
        this.push(message, 'success');
    }
    @action warning(message: string) {
        this.push(message, 'warning');
    }
    @action error(message: string) {
        this.push(message, 'error');
    }
    @action info(message: string) {
        this.push(message, 'info');
    }
}
