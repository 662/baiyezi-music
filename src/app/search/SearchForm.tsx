import React, { Component, FormEventHandler, ChangeEventHandler } from 'react';
import { inject, observer } from 'mobx-react';

import TextField from '@material-ui/core/TextField';

interface SearchFormProps {
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
        const { value } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField value={value} onChange={this.handleChange} />
            </form>
        );
    }
}

export default inject(({ searchStore }) => ({
    value: searchStore.keywords,
    onSubmit: searchStore.search.bind(searchStore),
    onChange: searchStore.setKeyowrds.bind(searchStore),
}))(SearchForm);
