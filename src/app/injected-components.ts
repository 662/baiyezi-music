import { observer, inject } from 'mobx-react';
import SongItem from '../components/SongItem';
import { ISong } from '../interface';

// const SongItemObservered = observer(SongItem);
const SongItemInjected = inject(({ playlistStore, songlistStore }) => ({
    songlists: songlistStore.songlists,
    onPlay: (song: ISong) => playlistStore.add(song, true),
    onAddToPlaylist: (song: ISong) => playlistStore.add(song),
    onAddToSonglist: (title: string, song: ISong) => songlistStore.pushSonglist(title, song),
}))(SongItem);

// const SnackbarInjected = inject()(

// );

export { SongItemInjected };
