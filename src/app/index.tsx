import React from 'react'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Layout from './layout'
import Search from './search'
import Songlist from './songlist'
import Playlist from './playlist'
import Github from './oauth/Github'

import history from '../../src/history'
import RootStore from '../stores/RootStore'

const store = new RootStore()
window.baiyezi_music_store = store

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        // type: 'dark',
    },
})

export default function index() {
    return (
        <Provider {...store}>
            <Router history={history} basename={process.env.PUBLIC_URL || '/'}>
                <Switch>
                    <Route path="/oauth/github" component={Github} />
                    <MuiThemeProvider theme={theme}>
                        <Layout>
                            <Switch>
                                <Route path="/search" component={Search} />
                                <Route path="/playlist" component={Playlist} />
                                <Route path="/songlist/:title" component={Songlist} />
                                <Redirect path="/" to="/search" />
                            </Switch>
                        </Layout>
                    </MuiThemeProvider>
                </Switch>
            </Router>
        </Provider>
    )
}
