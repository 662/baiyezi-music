import { WithStyles } from '@material-ui/core'
import styles from './styles'

export default interface PlayerProps extends WithStyles<typeof styles> {
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
    onModeChange(mode: 'single' | 'list' | 'order' | 'random'): void
    onPausedChange(paused: boolean): void
    onMutedChange(muted: boolean): void
    onVolumeChange(volume: number): void
    onDurationChange(duration: number): void
    onCurrentTimeChange(currentTime: number): void
}
