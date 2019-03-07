import RootStore from './RootStore'
import { observable, action, flow } from 'mobx'

import { IDriver, ISong, IDriverInstance } from '../interface'

export default class DriverStore {
    root: RootStore
    drivers: IDriverInstance[] = []

    constructor(root: RootStore) {
        this.root = root
        this.scanDrivers()
    }

    scanDrivers() {
        const context = require.context('../drivers/', false, /\.ts$/)
        const drivers = context.keys().map(key => {
            const DriverClass = context(key).default
            return <IDriverInstance>{ title: DriverClass.title, instance: new DriverClass() }
        })
        this.drivers = drivers
    }
}
