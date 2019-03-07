import React from 'react'
import { Fab, IconButton } from '@material-ui/core'
import { Slider } from '@material-ui/lab'
import { SkipNext, SkipPrevious, PlayArrow, Pause, VolumeUp, VolumeOff, SaveAlt, Repeat, RepeatOne, List, Shuffle } from '@material-ui/icons'
import { withStyles, createStyles } from '@material-ui/core'
import { WithStyles, Theme } from '@material-ui/core'
import Duration from './Duration'

const styles = (theme: Theme) =>
    createStyles({
        wrapper: {
            width: '100%',
            backgroundColor: '#ccc',
        },
        audioWrapper: {
            display: 'none',
        },
        player: {
            display: 'flex',
            alignItems: 'center',
            padding: '4px 16px',
        },
        audio: {
            width: '100%',
            height: '48px',
            backgroundColor: 'rgb(241,243,244)',
        },
        mainControl: {},
        info: {
            padding: '16px',
            flex: 1,
        },
        secondaryControl: {
            display: 'flex',
            alignItems: 'center',
        },
        volumeSlider: {
            width: '100px',
        },
        mainSliderTitle: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontSize: '12px',
        },
        mainSliderWrapper: {
            flex: 1,
        },
    })

const ModeIcons: {
    [key: string]: any
} = {
    single: RepeatOne,
    list: Repeat,
    order: List,
    random: Shuffle,
}

interface PlayerProps extends WithStyles<typeof styles> {
    src: string
    song: string
    singer: string

    mode: 'single' | 'list' | 'order' | 'random'
    paused: boolean
    muted: boolean
    volume: number
    duration: number
    currentTime: number

    onPlayPrev(): void
    onPlayNext(): void

    changePaused(paused: boolean): void
    changeMuted(): void
    changeVolume(volume: number): void
    changeMode(): void
    changeDuration(duration: number): void
    changeCurrentTime(currentTime: number): void
}

class Player extends React.Component<PlayerProps> {
    audio: HTMLAudioElement | null = null
    audioReadied: boolean = false
    progressTimeout?: NodeJS.Timeout
    mounted: boolean = false
    whoChangedCurrentTime: 'player' | 'audio' = 'player'
    whoChangedPaused: 'player' | 'audio' = 'player'
    progressSliderDragging: boolean = false

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
            this.whoChangedPaused = 'player'
            this.whoChangedCurrentTime = 'player'
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
            this.props.changeCurrentTime(this.audio.currentTime)
            this.whoChangedCurrentTime = 'audio'
        }
        this.progressTimeout = setTimeout(this.progress, 200)
    }

    handleAudioonCanPlayThrough = () => {
        this.audioReadied = true
        if (!this.mounted) return
        // 获取当前音频的长度
        this.props.changeDuration(this.audio!.duration)
    }

    handleAudioOnPlay = () => {
        this.props.changePaused(false)
        this.whoChangedPaused = 'audio'
    }
    handlePausedOrPlayOnClick = () => {
        this.props.changePaused(!this.props.paused)
        this.whoChangedPaused = 'player'
    }
    handleAudioOnEnd = () => this.props.onPlayNext()
    handleDurationSliderOnChange = (e: React.ChangeEvent<{}>, v: number) => {
        this.props.changeCurrentTime(v)
        this.whoChangedCurrentTime = 'player'
    }
    handleDurationSlideronDragStart = () => {
        this.progressSliderDragging = true
    }
    handleDurationSlideronDragEnd = () => {
        this.progressSliderDragging = false
    }

    render() {
        const { classes } = this.props
        const { paused, muted, volume, duration, currentTime, mode } = this.props
        const { changeMuted, changeVolume, changeMode, onPlayPrev, onPlayNext } = this.props
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
                            onPlay={this.handleAudioOnPlay}
                            onEnded={this.handleAudioOnEnd}
                            onCanPlayThrough={this.handleAudioonCanPlayThrough}
                        >
                            您的浏览器不支持 video 标签。
                        </audio>
                    )}
                </div>
                <div className={classes.player}>
                    <div className={classes.mainControl}>
                        <IconButton onClick={onPlayPrev}>
                            <SkipPrevious fontSize="large" />
                        </IconButton>
                        <IconButton onClick={this.handlePausedOrPlayOnClick}>{paused ? <PlayArrow fontSize="large" /> : <Pause fontSize="large" />}</IconButton>
                        <IconButton onClick={onPlayNext}>
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
                                onChange={this.handleDurationSliderOnChange}
                                onDragStart={this.handleDurationSlideronDragStart}
                                onDragEnd={this.handleDurationSlideronDragEnd}
                            />
                        </div>
                    </div>
                    <div>
                        <IconButton>
                            <SaveAlt />
                        </IconButton>
                        <IconButton onClick={changeMode}>
                            <ModeIcon />
                        </IconButton>
                    </div>
                    <div className={classes.secondaryControl}>
                        <IconButton onClick={changeMuted}>{muted ? <VolumeOff /> : <VolumeUp />}</IconButton>
                        <div className={classes.volumeSlider}>
                            <Slider min={0} max={100} value={volume} onChange={(e, v) => changeVolume(v)} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Player)
