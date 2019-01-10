import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Search, PlaylistPlay } from '@material-ui/icons';

const Menu = () => {
    return (
        <List component="nav">
            <ListItem button>
                <ListItemIcon>
                    <Search />
                </ListItemIcon>
                <ListItemText primary="搜索歌曲" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PlaylistPlay />
                </ListItemIcon>
                <ListItemText primary="播放列表" />
            </ListItem>
        </List>
    );
};

export default Menu;
