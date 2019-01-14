import React from 'react';
import { ListItem, ListItemText, IconButton, createStyles, withStyles, WithStyles, ListItemSecondaryAction } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import DelayTooltip from '../../components/DelayTooltip';
import history from '../../history';

const styles = createStyles({
    songlistitem: {
        '& .delete': {
            display: 'none',
        },
        '&:hover .delete': {
            display: 'block',
        },
    },
});

interface SonglistItemProps extends WithStyles<typeof styles> {
    title: string;
    onDelete(title: string): void;
}

class SonglistItem extends React.Component<SonglistItemProps> {
    handleClick = () => history.push(`/songlist/${this.props.title}`);
    handleDelete = () => this.props.onDelete(this.props.title);

    render() {
        const { title, classes } = this.props;
        return (
            <ListItem button onClick={this.handleClick} ContainerProps={{ className: classes.songlistitem }}>
                <ListItemText primary={title} />
                <ListItemSecondaryAction className="delete">
                    <DelayTooltip title="删除">
                        <IconButton onClick={this.handleDelete}>
                            <Delete fontSize="small" />
                        </IconButton>
                    </DelayTooltip>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default withStyles(styles)(SonglistItem);
