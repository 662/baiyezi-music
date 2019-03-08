import React from 'react'
import { inject } from 'mobx-react' // eslint-disable-line
import qs from 'query-string'
// import gist from "@src/gist";
import { oauth } from '@src/gh'

class Github extends React.Component {
    componentDidMount() {
        const { location, history, session } = this.props
        const { search } = location
        const { code } = qs.parse(search)
        if (code) {
            oauth.getAccessToken(code).then(r => {
                session.setToken(r.access_token)
                history.replace('/')
            })
        } else {
            window.location.replace(oauth.getAuthorizeURL())
        }
    }
    render() {
        return <div>正在请求github……</div>
    }
}

export default inject(({ store }) => ({ session: store.session }))(Github)
