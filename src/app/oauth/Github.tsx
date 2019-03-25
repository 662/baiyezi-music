import React from 'react'
import { inject } from 'mobx-react' // eslint-disable-line
import qs from 'query-string'
import { RouteChildrenProps } from 'react-router'

interface GithubProps extends RouteChildrenProps<{ code: string }> {
    authorizeURL: string
    getAccessToken(code: string): Promise<void>
}

class Github extends React.Component<GithubProps> {
    componentDidMount() {
        const { location, history, authorizeURL, getAccessToken } = this.props
        const { search } = location
        const { code } = qs.parse(search)
        if (code) {
            getAccessToken(code as string).then(() => history.replace('/'))
        } else {
            window.location.replace(authorizeURL)
        }
    }
    render() {
        return <div>正在请求github……</div>
    }
}

export default inject(({ githubStore }) => ({
    authorizeURL: githubStore.authorizeURL,
    getAccessToken: githubStore.getAccessToken.bind(githubStore) as ((code: string) => Promise<void>),
}))(Github)
