import React from 'react'
import { IconButton } from '@material-ui/core'
import { Slider } from '@material-ui/lab'
import { SkipNext, SkipPrevious, PlayArrow, Pause, VolumeUp, VolumeOff, SaveAlt, Repeat, RepeatOne, List, Shuffle } from '@material-ui/icons'
import Duration from '../Duration'
import PlayerProps from './PlayerProps'

const ModeIcons: {
    [key: string]: any
} = {
    single: RepeatOne,
    list: Repeat,
    order: List,
    random: Shuffle,
}

export default class Player extends React.Component<PlayerProps> {
    audio: HTMLAudioElement | null = null
    audioReadied: boolean = false
    progressTimeout?: NodeJS.Timeout
    mounted: boolean = false
    whoChangedCurrentTime: 'player' | 'audio' = 'audio'
    whoChangedPaused: 'player' | 'audio' = 'audio'
    progressSliderDragging: boolean = false
    modes: string[] = ['single', 'list', 'order', 'random']

    componentDidMount() {
        this.mounted = true
        this.initAudio()
        this.progress()
    }
    componentWillUnmount() {
        this.progressTimeout && clearInterval(this.progressTimeout)
    }
    componentDidUpdate(prevProps: PlayerProps, prevState: any, snapshot: any) {
        const audio = this.audio
        const props = this.props
        if (audio) {
            if (props.muted !== prevProps.muted) {
                audio.volume = props.muted ? 0 : props.volume / 100
            }
            if (props.paused !== prevProps.paused && this.whoChangedPaused === 'player') {
                props.paused ? audio.pause() : audio.play()
            }
            if (props.volume !== prevProps.volume) {
                audio.volume = props.volume / 100
            }
            if (props.currentTime !== prevProps.currentTime && this.whoChangedCurrentTime === 'player' && !this.progressSliderDragging) {
                audio.currentTime = props.currentTime
            }
            this.whoChangedPaused = 'audio'
            this.whoChangedCurrentTime = 'audio'
        }
    }

    initAudio = () => {
        const audio = this.audio
        if (audio) {
            // 初始化 播放进度
            audio.currentTime = this.props.currentTime
            // 初始化 音量
            audio.volume = this.props.muted ? 0 : this.props.volume / 100
        }
    }
    progress = () => {
        if (this.props.src && this.audio && this.audioReadied && !this.progressSliderDragging) {
            this.props.onCurrentTimeChange(this.audio.currentTime)
            this.whoChangedCurrentTime = 'audio'
        }
        this.progressTimeout = setTimeout(this.progress, 200)
    }

    handlePausedOrPlayButtonClick = () => {
        this.props.onPausedChange(!this.props.paused)
        this.whoChangedPaused = 'player'
    }
    handleAudioCanPlayThrough = () => {
        this.audioReadied = true
        if (!this.mounted) return
        // 获取当前音频的长度
        this.props.onDurationChange(this.audio!.duration)
    }
    handleAudioPlay = () => {
        this.props.onPausedChange(false)
        this.whoChangedPaused = 'audio'
    }
    handleAudioEnd = () => {
        this.props.onPlayNext()
        this.props.onPausedChange(true)
        this.whoChangedPaused = 'audio'
    }
    handleDurationSliderChange = (e: React.ChangeEvent<{}>, v: number) => {
        this.props.onCurrentTimeChange(v)
        this.whoChangedCurrentTime = 'player'
    }
    handleDurationSliderDragStart = () => {
        this.progressSliderDragging = true
    }
    handleDurationSliderDragEnd = () => {
        this.progressSliderDragging = false
        this.audio!.currentTime = this.props.currentTime
    }
    handleNextButtonClick = () => {
        this.props.onPlayNext()
        this.whoChangedCurrentTime = 'player'
    }
    handlePrevButtonClick = () => {
        this.props.onPlayPrev()
        this.whoChangedCurrentTime = 'player'
    }
    handleModeButtonClick = () => {
        const currentModeIndex = this.modes.indexOf(this.props.mode)
        const nextModeIndex = currentModeIndex === this.modes.length - 1 ? 0 : currentModeIndex + 1
        const nextMode = this.modes[nextModeIndex] as 'single' | 'list' | 'order' | 'random'
        this.props.onModeChange(nextMode)
    }
    handleVolumeSliderChange = (e: React.ChangeEvent<{}>, v: number) => {
        this.props.onVolumeChange(v)
    }
    handleMutedButtionClick = () => {
        this.props.onMutedChange(!this.props.muted)
    }
    render() {
        const { classes } = this.props
        const { paused, muted, volume, duration, currentTime, mode } = this.props
        const { src, song, singer } = this.props
        const ModeIcon = ModeIcons[mode]
        return (
            <div className={classes.wrapper}>
                <div className={classes.audioWrapper}>
                    {src && (
                        <audio
                            controls
                            autoPlay
                            ref={audio => (this.audio = audio)}
                            className={classes.audio}
                            src={src}
                            onPlay={this.handleAudioPlay}
                            onEnded={this.handleAudioEnd}
                            onCanPlayThrough={this.handleAudioCanPlayThrough}
                        >
                            您的浏览器不支持 video 标签。
                        </audio>
                    )}
                </div>
                <div className={classes.player}>
                    <div className={classes.mainControl}>
                        <IconButton onClick={this.handlePrevButtonClick}>
                            <SkipPrevious fontSize="large" />
                        </IconButton>
                        <IconButton onClick={this.handlePausedOrPlayButtonClick}>
                            {paused ? <PlayArrow fontSize="large" /> : <Pause fontSize="large" />}
                        </IconButton>
                        <IconButton onClick={this.handleNextButtonClick}>
                            <SkipNext fontSize="large" />
                        </IconButton>
                    </div>
                    <div className={classes.info}>
                        <div className={classes.mainSliderTitle}>
                            <div>
                                {song} - {singer}
                            </div>
                            <div>
                                <Duration value={currentTime * 1000} /> /
                                <Duration value={duration * 1000} />
                            </div>
                        </div>
                        <div className={classes.mainSliderWrapper}>
                            <Slider
                                min={0}
                                max={duration}
                                value={currentTime}
                                onChange={this.handleDurationSliderChange}
                                onDragStart={this.handleDurationSliderDragStart}
                                onDragEnd={this.handleDurationSliderDragEnd}
                            />
                        </div>
                    </div>
                    <div>
                        <IconButton>
                            <SaveAlt />
                        </IconButton>
                        <IconButton onClick={this.handleModeButtonClick}>
                            <ModeIcon />
                        </IconButton>
                    </div>
                    <div className={classes.secondaryControl}>
                        <IconButton onClick={this.handleMutedButtionClick}>{muted ? <VolumeOff /> : <VolumeUp />}</IconButton>
                        <div className={classes.volumeSlider}>
                            <Slider min={0} max={100} value={volume} onChange={this.handleVolumeSliderChange} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
