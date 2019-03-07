import React, { ChangeEventHandler, FormEventHandler, MouseEventHandler } from 'react'
import { ListItem, Input, IconButton } from '@material-ui/core'
import { Cancel, Done } from '@material-ui/icons'
import DelayTooltip from '../../components/DelayTooltip'

interface SonglistFiledProps {
    onHide(): void
    onDone(v: string): void
}

class SonglistFiled extends React.Component<SonglistFiledProps> {
    state = {
        value: '',
    }

    done = () => {
        this.props.onDone(this.state.value)
        this.props.onHide()
    }
    handleSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault()
        this.done()
    }
    handleInputChange: ChangeEventHandler<HTMLInputElement> = e => this.setState({ value: e.target.value })
    handleDoneClick: MouseEventHandler = e => this.done()
    handleCancelClick: MouseEventHandler = e => this.props.onHide()

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <ListItem>
                    <Input placeholder="歌单名" autoFocus value={this.state.value} onChange={this.handleInputChange} />
                    <DelayTooltip title="创建">
                        <IconButton onClick={this.handleDoneClick}>
                            <Done fontSize="small" />
                        </IconButton>
                    </DelayTooltip>
                    <DelayTooltip title="取消">
                        <IconButton onClick={this.handleCancelClick}>
                            <Cancel fontSize="small" />
                        </IconButton>
                    </DelayTooltip>
                </ListItem>
            </form>
        )
    }
}

export default SonglistFiled
