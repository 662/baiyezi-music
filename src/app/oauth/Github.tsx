import React from 'react'
import { inject } from 'mobx-react' // eslint-disable-line
import qs from 'query-string'
import { CircularProgress } from '@material-ui/core'
import { RouteChildrenProps } from 'react-router'
import RootStore from '../../stores/RootStore'

interface GithubProps extends RouteChildrenProps<{ code: string }> {
    authorizeURL: string
    getAccessToken(code: string): Promise<string>
}

class Github extends React.Component<GithubProps> {
    componentDidMount() {
        const { location, history, authorizeURL, getAccessToken } = this.props
        const { search } = location
        const { code } = qs.parse(search)
        if (code) {
            getAccessToken(code as string).then(token => {
                if (window.opener) {
                    ;(window.opener.baiyezi_music_store as RootStore).githubStore.oauthSuccess(token)
                    window.close()
                }
            })
        } else {
            window.location.replace(authorizeURL)
        }
    }
    render() {
        return (
            <div style={{ textAlign: 'center', marginTop: 100 }}>
                <CircularProgress />
            </div>
        )
    }
}

export default inject(({ githubStore }) => ({
    authorizeURL: githubStore.authorizeURL,
    getAccessToken: githubStore.getAccessToken.bind(githubStore) as ((code: string) => Promise<string>),
}))(Github)
