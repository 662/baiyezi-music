import { createStyles, Theme } from '@material-ui/core'

const styles = (theme: Theme) =>
    createStyles({
        wrapper: {
            width: '100%',
            boxShadow: '0px 0px 4px #ddd',
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

export default styles
