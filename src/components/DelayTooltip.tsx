import React from 'react'
import { Tooltip } from '@material-ui/core'

interface DelayTooltipProps {
    title: string
    children: React.ReactElement<any>
}

function DelayTooltip({ title, children }: DelayTooltipProps) {
    return (
        <Tooltip title={title} enterDelay={500} leaveDelay={200}>
            {children}
        </Tooltip>
    )
}

export default DelayTooltip
