import React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { List, IconButton, Button } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

import Panel from '../../components/Panel'
import { PlaylistItemInjected } from '../injected-components'
import { ISong } from '../../interface'

interface PlaylistProps {
    songs: ISong[]
    onRemove(index: number): void
    onClear(): void
}

@observer
class Playlist extends React.Component<PlaylistProps> {
    render() {
        const { songs, onRemove, onClear } = this.props
        return (
            <Panel
                title="播放列表"
                actions={
                    <Button variant="contained" size="small" onClick={onClear}>
                        <Delete fontSize="small" />
                        清空
                    </Button>
                }
            >
                {songs.length === 0 ? (
                    <div>
                        暂无歌曲，去<Link to="/search">添加</Link>
                    </div>
                ) : (
                    <List>
                        {songs.map((song, index) => (
                            <PlaylistItemInjected
                                key={song.id + song.driver}
                                song={song}
                                extendAction={
                                    <IconButton onClick={e => onRemove(index)}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                }
                            />
                        ))}
                    </List>
                )}
            </Panel>
        )
    }
}

export default inject(({ playlistStore }) => ({
    songs: playlistStore.songs,
    onClear: () => playlistStore.clear(),
    onRemove: (index: number) => playlistStore.remove(index),
}))(Playlist)
