import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { List, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import Panel from '../../components/Panel';
import { SongItemInjected } from '../injected-components';
import { ISong } from '../../interface';

interface PlaylistProps {
    songs: ISong[];
    onRemove(index: number): void;
}

@observer
class Playlist extends React.Component<PlaylistProps> {
    render() {
        const { songs, onRemove } = this.props;
        return (
            <Panel title="播放列表">
                {songs.length === 0 ? (
                    <div>
                        暂无歌曲，去<Link to="/search">添加</Link>
                    </div>
                ) : (
                    <List>
                        {songs.map((song, index) => (
                            <SongItemInjected
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
        );
    }
}

export default inject(({ playlistStore }) => ({ songs: playlistStore.songs, onRemove: (index: number) => playlistStore.remove(index) }))(Playlist);
