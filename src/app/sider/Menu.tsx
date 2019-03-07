import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Search, PlaylistPlay } from '@material-ui/icons'
import history from '../../history'

const Menu = () => {
    return (
        <List component="nav">
            <ListItem button onClick={e => history.push('/search')}>
                <ListItemIcon>
                    <Search />
                </ListItemIcon>
                <ListItemText primary="搜索歌曲" />
            </ListItem>
            <ListItem button onClick={e => history.push('/playlist')}>
                <ListItemIcon>
                    <PlaylistPlay />
                </ListItemIcon>
                <ListItemText primary="播放列表" />
            </ListItem>
        </List>
    )
}

export default Menu
