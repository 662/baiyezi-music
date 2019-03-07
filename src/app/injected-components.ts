import { observer, inject } from 'mobx-react'
import SongItem from '../components/SongItem'
import Snackbar from '../components/Snackbar'
import { ISong } from '../interface'

// const SongItemObservered = observer(SongItem);
const SongItemInjected = inject(({ playlistStore, songlistStore, snackbarStore }) => ({
    showPlaylistOnMenu: true,
    songlists: songlistStore.songlists,
    onPlay: (song: ISong) => {
        playlistStore.add(song, true)
        snackbarStore.success(`《${song.name}》已添加到 {播放列表}`)
    },
    onAddToPlaylist: (song: ISong) => {
        playlistStore.add(song)
        snackbarStore.success(`《${song.name}》已添加到 {播放列表}`)
    },
    onAddToSonglist: (title: string, song: ISong) => {
        songlistStore.pushSonglist(title, song)
        snackbarStore.success(`《${song.name}》已添加到 {${title}}`)
    },
}))(SongItem)

const PlaylistItemInjected = inject(({ playlistStore, songlistStore, snackbarStore }) => ({
    showPlaylistOnMenu: false,
    songlists: songlistStore.songlists,
    onPlay: (song: ISong) => {
        playlistStore.add(song, true)
    },
    onAddToPlaylist: (song: ISong) => {
        playlistStore.add(song)
        snackbarStore.success(`《${song.name}》已添加到 {播放列表}`)
    },
    onAddToSonglist: (title: string, song: ISong) => {
        songlistStore.pushSonglist(title, song)
        snackbarStore.success(`《${song.name}》已添加到 {${title}}`)
    },
}))(SongItem)

const SnackbarObservered = observer(Snackbar)
const SnackbarInjected = inject(({ snackbarStore }) => ({
    key: snackbarStore.key,
    open: snackbarStore.open,
    variant: snackbarStore.variant,
    message: snackbarStore.message,
    onClose: () => snackbarStore.close(),
    onExited: () => snackbarStore.show(),
}))(SnackbarObservered)

export { SongItemInjected, PlaylistItemInjected, SnackbarInjected }
