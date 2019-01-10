import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider, ListSubheader } from '@material-ui/core';
import { Search, PlaylistPlay } from '@material-ui/icons';

function ListItemLink(props: any) {
    return <ListItem button component="a" {...props} />;
}

const Sidebar = () => (
    <div>
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
        <Divider />
        <List subheader={<ListSubheader>我的歌单</ListSubheader>} component="nav">
            <ListItem button>
                <ListItemText primary="Trash" />
            </ListItem>
            <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
            </ListItemLink>
        </List>
    </div>
);

export default Sidebar;
