import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) =>
    createStyles({
        player: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '48px',
        },
        audio: {
            width: '100%',
            height: '48px',
            backgroundColor: 'rgb(241,243,244)',
        },
    });

class Player extends React.Component<WithStyles<typeof styles>, {}> {
    handleEnd = () => {};

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.player}>
                <audio className={classes.audio} src="" controls={true} onEnded={this.handleEnd}>
                    您的浏览器不支持 video 标签。
                </audio>
            </div>
        );
    }
}

export default withStyles(styles)(Player);
