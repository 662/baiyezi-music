import React, { MouseEventHandler } from 'react'

import { Typography, Divider, ListItemIcon, ListItem, ListItemText, ListItemSecondaryAction, IconButton, MenuItem, Fab, Menu } from '@material-ui/core'
import { withStyles, createStyles } from '@material-ui/core'
import { WithStyles, Theme } from '@material-ui/core'
import { Add, PlayArrow } from '@material-ui/icons'

import DelayTooltip from './DelayTooltip'
import SongDetail from './SongDetail'

import { ISong, ISonglist } from '../interface'

const styles = (theme: Theme) =>
    createStyles({
        listitem: {
            cursor: 'default',
            borderBottom: 'dashed 1px #ddd',
        },
        driver: {
            marginLeft: '8px',
            color: '#999',
            fontSize: '12px',
        },
    })

interface SongItemProps extends WithStyles<typeof styles> {
    showPlaylistOnMenu: boolean
    song: ISong
    songlists: ISonglist[]
    onPlay(song: ISong): void
    onAddToPlaylist(song: ISong): void
    onAddToSonglist(title: string, song: ISong): void
    extendAction?: React.ReactNode
    hideDriver?: boolean
}

interface SongItemState {
    menu: boolean
}

class SongItem extends React.Component<SongItemProps, SongItemState> {
    state = {
        menu: false,
    }
    anchorEl: any = null

    handleAdd: MouseEventHandler = e => this.setState({ menu: true })
    handleCloseMenu = () => this.setState({ menu: false })

    handlePlay: MouseEventHandler = e => {
        const { onPlay, song } = this.props
        onPlay(song)
    }
    handleAddToPlaylist: MouseEventHandler = e => {
        const { onAddToPlaylist, song } = this.props
        onAddToPlaylist(song)
        this.handleCloseMenu()
    }
    handleAddToSonglist = (title: string) => {
        const { onAddToSonglist, song } = this.props
        onAddToSonglist(title, song)
        this.handleCloseMenu()
    }

    render() {
        const { song, classes, songlists, extendAction, showPlaylistOnMenu, hideDriver } = this.props
        const { menu } = this.state

        return (
            <ListItem ContainerProps={{ className: classes.listitem }}>
                <ListItemIcon>
                    <DelayTooltip title="播放">
                        <Fab size="small" onClick={this.handlePlay}>
                            <PlayArrow />
                        </Fab>
                    </DelayTooltip>
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Typography variant="inherit" noWrap>
                            {song.name}
                            {!hideDriver && <small className={classes.driver}>[{song.driver}]</small>}
                        </Typography>
                    }
                    secondary={<SongDetail song={song} />}
                />
                <ListItemSecondaryAction>
                    <IconButton buttonRef={node => (this.anchorEl = node)} onClick={this.handleAdd}>
                        <Add fontSize="small" />
                    </IconButton>
                    <Menu open={menu} anchorEl={this.anchorEl} onClose={this.handleCloseMenu}>
                        {showPlaylistOnMenu && <MenuItem onClick={this.handleAddToPlaylist}>播放列表</MenuItem>}
                        {showPlaylistOnMenu && <Divider />}
                        {songlists.map(item => (
                            <MenuItem key={item.title} onClick={e => this.handleAddToSonglist(item.title)}>
                                {item.title}
                            </MenuItem>
                        ))}
                    </Menu>
                    {extendAction}
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}

export default withStyles(styles)(SongItem)
