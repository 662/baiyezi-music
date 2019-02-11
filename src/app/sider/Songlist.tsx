import React, { MouseEventHandler } from 'react';
import { inject, observer } from 'mobx-react';
import { List } from '@material-ui/core';

import SonglistStore from '../../stores/SonglistStore';
import SonglistItem from './SonglistItem';
import SonglistHeader from './SonglistHeader';
import SonglistFiled from './SonglistFiled';

interface SonglistProps {
    songlistStore: SonglistStore;
}

@observer
class Songlist extends React.Component<SonglistProps> {
    state = {
        add: false,
    };
    handleShowAdd: MouseEventHandler = e => this.setState({ add: true });
    handleHideAdd = () => this.setState({ add: false });
    handleAddDone = (value: string) => this.props.songlistStore.createSonglist(value);
    handleDelete = (title: string) => {
        const agree = confirm('删除歌单将无法恢复！\n继续？');
        agree && this.props.songlistStore.deleteSonglist(title);
    };

    render() {
        const { songlistStore } = this.props;
        const { songlists } = songlistStore;
        const { add } = this.state;
        return (
            <List subheader={<SonglistHeader onAdd={this.handleShowAdd} />} component="nav">
                {add && <SonglistFiled onDone={this.handleAddDone} onHide={this.handleHideAdd} />}
                {songlists.map(item => (
                    <SonglistItem key={item.title} title={item.title} onDelete={this.handleDelete} />
                ))}
            </List>
        );
    }
}

export default inject(({ songlistStore }) => ({ songlistStore }))(Songlist);
