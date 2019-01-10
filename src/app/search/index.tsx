import React from 'react';
import SearchForm from './SearchForm';
import ResultList from './ResultList';

import {
    List,
    ListItem,
    Checkbox,
    ListSubheader,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
} from '@material-ui/core';
import { Add, PlayArrow } from '@material-ui/icons';

const Search = () => (
    <div>
        <SearchForm />
        <ResultList />

        <List>
            <ListSubheader>哈哈哈哈</ListSubheader>
            {[0, 1, 2, 3].map(value => (
                <ListItem key={value}  dense button>
                    <Checkbox tabIndex={-1} disableRipple />
                    <ListItemText primary={`Line item ${value + 1}`} secondary="fdasfdsafsafd" />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Play">
                            <PlayArrow />
                        </IconButton>
                        <IconButton aria-label="Add">
                            <Add />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    </div>
);

export default Search;
