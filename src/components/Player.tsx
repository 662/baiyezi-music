import React from 'react';
import { Fab, IconButton } from '@material-ui/core';
import { Slider } from '@material-ui/lab';
import { SkipNext, SkipPrevious, PlayArrow, Pause, VolumeUp, VolumeOff, SaveAlt, Repeat, RepeatOne, List, Shuffle } from '@material-ui/icons';
import { withStyles, createStyles } from '@material-ui/core';
import { WithStyles, Theme } from '@material-ui/core';
import Duration from './Duration';

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
    });

interface PlayerProps extends WithStyles<typeof styles> {
    src: string;
    song: string;
    singer: string;

    mode: 'single' | 'list' | 'order' | 'random';
    paused: boolean;
    muted: boolean;
    volume: number;
    duration: number;
    currentTime: number;
    whoChangedCurrentTime: 'audio' | 'slider';

    playNext(loop: boolean): void;
    playRandom(): void;
    playPrev(loop: boolean): void;

    changePaused(): void;
    changeMuted(): void;
    changeVolume(volume: number): void;
    changeMode(): void;
    changeDuration(duration: number): void;
    changeCurrentTime(currentTime: number, whoChangedCurrentTime: 'audio' | 'slider'): void;
}

const ModeIcons: {
    [key: string]: any;
} = {
    single: RepeatOne,
    list: Repeat,
    order: List,
    random: Shuffle,
};

class Player extends React.Component<PlayerProps> {
    audio: HTMLAudioElement | null = null;
    durationTimer?: NodeJS.Timeout;

    componentDidMount() {
        const audio = this.audio!;
        const props = this.props;
        audio.oncanplay = () => {
            props.changeDuration(audio.duration);
            this.durationTimer = setInterval(() => {
                props.changeCurrentTime(audio.currentTime, 'audio');
            }, 200);
        };
        this.initPlayerWithProps();
    }

    componentWillUnmount() {
        this.durationTimer && clearInterval(this.durationTimer);
    }

    initPlayerWithProps() {
        const audio = this.audio!;
        // 初始化 暂停状态
        // this.props.paused ? audio.pause() : audio.play();
        // 初始化 播放进度
        audio.currentTime = this.props.currentTime;
        // // 初始化 音量
        audio.volume = this.props.muted ? 0 : this.props.volume / 100;
    }

    next = () => {
        const audio = this.audio!;
        const { mode, playNext, playRandom } = this.props;
        switch (mode) {
            case 'single':
                audio.load();
                break;
            case 'list':
                playNext(true);
                break;
            case 'order':
                playNext(false);
                break;
            case 'random':
                playRandom();
                break;
        }
    };
    prev = () => {
        const audio = this.audio!;
        const { mode, playRandom, playPrev } = this.props;
        switch (mode) {
            case 'single':
                audio.load();
                break;
            case 'list':
                playPrev(true);
                break;
            case 'order':
                playPrev(false);
                break;
            case 'random':
                playRandom();
                break;
        }
    };

    handleEnd = () => this.next();

    componentDidUpdate(prevProps: PlayerProps, prevState: any, snapshot: any) {
        const audio = this.audio!;
        if (this.props.muted !== prevProps.muted) {
            audio.volume = this.props.muted ? 0 : this.props.volume / 100;
        }
        if (this.props.paused !== prevProps.paused) {
            this.props.paused ? audio.pause() : audio.play();
        }
        if (this.props.volume !== prevProps.volume) {
            audio.volume = this.props.volume / 100;
        }
        if (this.props.currentTime !== prevProps.currentTime && this.props.whoChangedCurrentTime === 'slider') {
            audio.currentTime = this.props.currentTime;
        }
    }

    render() {
        const { classes } = this.props;
        const { paused, muted, volume, duration, currentTime, mode } = this.props;
        const { changePaused, changeMuted, changeVolume, changeMode, changeCurrentTime } = this.props;
        const { src, song, singer } = this.props;
        const ModeIcon = ModeIcons[mode];
        return (
            <div className={classes.wrapper}>
                <div className={classes.audioWrapper}>
                    <audio ref={audio => (this.audio = audio)} className={classes.audio} src={src} controls={true} onEnded={this.handleEnd} autoPlay={true}>
                        您的浏览器不支持 video 标签。
                    </audio>
                </div>
                <div className={classes.player}>
                    <div className={classes.mainControl}>
                        <IconButton onClick={this.prev}>
                            <SkipPrevious fontSize="large" />
                        </IconButton>
                        <IconButton onClick={changePaused}>{paused ? <PlayArrow fontSize="large" /> : <Pause fontSize="large" />}</IconButton>
                        <IconButton onClick={this.next}>
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
                            <Slider min={0} max={duration} value={currentTime} onChange={(e, v) => changeCurrentTime(v, 'slider')} />
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
        );
    }
}

export default withStyles(styles)(Player);
