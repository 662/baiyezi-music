import React from 'react'
import { inject, observer } from 'mobx-react'
import Player from '../../components/Player'

const PlayerObservered = observer(Player)
export default inject(({ playerStore }) => ({
    src: playerStore.src,
    song: playerStore.song ? playerStore.song.name : '',
    singer: playerStore.song ? playerStore.song.singer.map(s => s.name).join('&') : '',

    paused: playerStore.paused,
    muted: playerStore.muted,
    volume: playerStore.volume,
    duration: playerStore.duration,
    currentTime: playerStore.currentTime,
    mode: playerStore.mode,

    onPlayPrev: playerStore.playPrev.bind(playerStore),
    onPlayNext: playerStore.playNext.bind(playerStore),

    changePaused: playerStore.changePaused.bind(playerStore),
    changeMuted: playerStore.changeMuted.bind(playerStore),
    changeVolume: playerStore.changeVolume.bind(playerStore),
    changeMode: playerStore.changeMode.bind(playerStore),
    changeDuration: playerStore.changeDuration.bind(playerStore),
    changeCurrentTime: playerStore.changeCurrentTime.bind(playerStore),
}))(PlayerObservered)
