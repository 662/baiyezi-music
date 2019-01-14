import React, { Component, FormEventHandler, ChangeEventHandler } from 'react';
import { inject, observer } from 'mobx-react';

import { TextField, withStyles, WithStyles, createStyles, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const styles = createStyles({
    search: {
        padding: '8px 0 8px 0',
        textAlign: 'center',
    },
    input: {
        width: '666px',
    },
});

interface SearchFormProps extends WithStyles<typeof styles> {
    value: string;
    onSubmit: () => void;
    onChange: (value: string) => void;
}

@observer
class SearchForm extends Component<SearchFormProps, {}> {
    handleSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        this.props.onSubmit();
    };
    handleChange: ChangeEventHandler<HTMLInputElement> = e => {
        this.props.onChange(e.target.value);
    };
    render() {
        const { value, classes } = this.props;
        return (
            <div className={classes.search}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        className={classes.input}
                        label="歌名/歌手"
                        autoFocus
                        value={value}
                        onChange={this.handleChange}
                        variant="outlined"
                    />
                </form>
            </div>
        );
    }
}

export default inject(({ searchStore }) => ({
    value: searchStore.keywords,
    onSubmit: searchStore.search.bind(searchStore),
    onChange: searchStore.setKeyowrds.bind(searchStore),
}))(withStyles(styles)(SearchForm));
