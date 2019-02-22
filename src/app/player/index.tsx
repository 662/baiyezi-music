import React from 'react';
import { inject, observer } from 'mobx-react';
import Player from '../../components/Player';

export default inject(({ playlistStore, playerStore }) => ({
    src: playlistStore.src,
    song: playlistStore.current.name,
    singer: playlistStore.current.singer.map(s => s.name).join('&'),

    paused: playerStore.paused,
    muted: playerStore.muted,
    volume: playerStore.volume,
    duration: playerStore.duration,
    currentTime: playerStore.currentTime,
    mode: playerStore.mode,
    whoChangedCurrentTime: playerStore.whoChangedCurrentTime,

    playNext: playlistStore.playNext.bind(playlistStore),
    playRandom: playlistStore.playRandom.bind(playlistStore),
    playPrev: playlistStore.playPrev.bind(playlistStore),

    changePaused: playerStore.changePaused.bind(playerStore),
    changeMuted: playerStore.changeMuted.bind(playerStore),
    changeVolume: playerStore.changeVolume.bind(playerStore),
    changeMode: playerStore.changeMode.bind(playerStore),
    changeDuration: playerStore.changeDuration.bind(playerStore),
    changeCurrentTime: playerStore.changeCurrentTime.bind(playerStore),
}))(Player);
