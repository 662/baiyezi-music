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
    onModeChange: playerStore.changeMode.bind(playerStore),
    onPausedChange: playerStore.changePaused.bind(playerStore),
    onMutedChange: playerStore.changeMuted.bind(playerStore),
    onVolumeChange: playerStore.changeVolume.bind(playerStore),
    onDurationChange: playerStore.changeDuration.bind(playerStore),
    onCurrentTimeChange: playerStore.changeCurrentTime.bind(playerStore),
}))(PlayerObservered)
