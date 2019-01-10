import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

interface SonglistItemProps {
    title: string;
    index: number;
    onClick(index: number): void;
    onDelete(index: number): void;
}
interface SonglistItemState {
    hover: boolean;
}
class SonglistItem extends React.Component<SonglistItemProps, SonglistItemState> {
    state = {
        hover: false,
    };
    handleMouseOver = () => this.setState({ hover: true });
    handleMouseOut = () => this.setState({ hover: false });
    handleClick = () => this.props.onClick(this.props.index);
    handleDelete = () => this.props.onDelete(this.props.index);

    render() {
        const { title } = this.props;
        const { hover } = this.state;
        return (
            <ListItem
                button
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                onClick={this.handleClick}
            >
                <ListItemText primary={title} />
                {hover && (
                    <ListItemSecondaryAction>
                        <IconButton aria-label="删除" onClick={this.handleDelete}>
                            <Delete />
                        </IconButton>
                    </ListItemSecondaryAction>
                )}
            </ListItem>
        );
    }
}

export default SonglistItem;
