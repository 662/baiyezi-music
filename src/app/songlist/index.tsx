import React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { RouteChildrenProps } from 'react-router'
import { List, IconButton, Button } from '@material-ui/core'
import { Delete, PlayArrow, Add } from '@material-ui/icons'

import Panel from '../../components/Panel'
import { SongItemInjected } from '../injected-components'
import { ISonglist, ISong } from '../../interface'

interface SonglistProps extends RouteChildrenProps<{ title: string }> {
    songlists: ISonglist[]
    onPlayAll(songs: ISong[], title: string): void
    onAddToPlaylist(songs: ISong[], title: string): void
    onRemove(title: string, driver: string, id: string | number): void
}

@observer
class Songlist extends React.Component<SonglistProps> {
    getSonglistTitle = () => {
        const { match } = this.props
        return match!.params.title
    }
    getSonglist = () => {
        const { songlists } = this.props
        const title = this.getSonglistTitle()
        const songlist = songlists.find(item => item.title === title)!
        return songlist
    }
    handlePlayAllClick: React.MouseEventHandler = () => {
        const title = this.getSonglistTitle()
        const songlist = this.getSonglist()
        this.props.onPlayAll(songlist.items, title)
    }
    handleAddToPlaylistClick: React.MouseEventHandler = () => {
        const title = this.getSonglistTitle()
        const songlist = this.getSonglist()
        this.props.onAddToPlaylist(songlist.items, title)
    }

    render() {
        const { onRemove } = this.props
        const songlist = this.getSonglist()
        return (
            <Panel
                title={songlist.title}
                actions={[
                    <Button key="playAll" variant="contained" size="small" onClick={this.handlePlayAllClick}>
                        <PlayArrow fontSize="small" />
                        全部播放
                    </Button>,
                    <Button key="addToPlaylist" variant="contained" size="small" onClick={this.handleAddToPlaylistClick}>
                        <Add fontSize="small" />
                        加入播放列表
                    </Button>,
                ]}
            >
                {songlist.items.length === 0 ? (
                    <div>
                        暂无歌曲，去<Link to="/search">添加</Link>
                    </div>
                ) : (
                    <List>
                        {songlist.items.map(
                            song =>
                                song.flag !== 'deleted' && (
                                    <SongItemInjected
                                        key={song.id + song.driver}
                                        song={song}
                                        extendAction={
                                            <IconButton onClick={e => onRemove(songlist.title, song.driver, song.id)}>
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        }
                                    />
                                )
                        )}
                    </List>
                )}
            </Panel>
        )
    }
}

export default inject(({ songlistStore, playlistStore, snackbarStore }) => ({
    songlists: songlistStore.songlists,
    onPlayAll: (songs: ISong[], title: string) => {
        playlistStore.append(songs, true)
        snackbarStore.success(`${title} 已添加到 {播放列表}`)
    },
    onAddToPlaylist: (songs: ISong[], title: string) => {
        playlistStore.append(songs, false)
        snackbarStore.success(`${title} 已添加到 {播放列表}`)
    },
    onRemove: (title: string, driver: string, id: string | number) => songlistStore.popSonglist(title, driver, id),
}))(Songlist)
