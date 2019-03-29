/// <reference types="react-scripts" />

import { inject } from 'mobx-react'
import RootStore from './stores/RootStore'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

declare module 'mobx-react' {
    export function inject<D extends object>(
        mapStoreToProps: (store: RootStore) => D
    ): <A extends D>(component: React.ComponentType<A>) => React.SFC<Omit<A, keyof D> & Partial<D>>
}

declare global {
    interface Window {
        baiyezi_music_store: RootStore
    }
}
