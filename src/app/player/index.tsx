import React from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import PlaylistStore from '../../stores/PlaylistStore';

const styles = (theme: Theme) =>
    createStyles({
        player: {
            width: '100%',
            height: '48px',
        },
        audio: {
            width: '100%',
            height: '48px',
            backgroundColor: 'rgb(241,243,244)',
        },
    });

interface PlayerProps extends WithStyles<typeof styles> {
    playlistStore: PlaylistStore;
}

@observer
class Player extends React.Component<PlayerProps> {
    handleEnd = () => {
        this.props.playlistStore.playNext();
    };

    render() {
        const { classes, playlistStore } = this.props;
        const { src } = playlistStore;
        return (
            <div className={classes.player}>
                <audio className={classes.audio} src={src} controls={true} onEnded={this.handleEnd} autoPlay={true}>
                    您的浏览器不支持 video 标签。
                </audio>
            </div>
        );
    }
}

export default inject(({ playlistStore }) => ({ playlistStore }))(withStyles(styles)(Player));
