import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import { Provider, intlReducer } from 'react-intl-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { AppContainer } from 'react-hot-loader'

// Middlewares
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'

import getMuiTheme from 'material-ui/styles/getMuiTheme'

import * as reducers from './reducers'

import { saveStore } from 'isotope-client/entities/fetchEntities.js'
import { fetchUser as fetchUserApi } from 'isotope-client/login/loginApi'
import { logOut } from 'isotope-client/login/loginActions'
import { isAuthorized as isAuthorizedApi } from 'isotope-client/users/functions/functionApi'
import Root from './containers/Root'

import { addLocaleData } from 'react-intl'
import fr from 'react-intl/locale-data/fr'

import messages from './messages'
import messagesIsotope from 'isotope-client/messages'

export const muiTheme = getMuiTheme()

function reactInit(user) {

	addLocaleData(fr)
	const formats = {
		date: {
			datetime: {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric'
			}
		}
	}

	const enhancers = [
		applyMiddleware(
			thunk,
			promiseMiddleware,
			routerMiddleware(browserHistory)
		)
	]

	if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
		enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
	}
	const store = createStore(combineReducers({
		...reducers,
		form: formReducer,
		routing: routerReducer,
		intl: intlReducer
	}), {
		user,
		intl: {
			locale: 'fr',
			messages: {
				...messages,
				...messagesIsotope
			},
			formats: {
				...formats
			},
			defaultLocale: 'fr',
			defaultFormats: {
				...formats
			}
		}
	}, compose(...enhancers))

	const checkLogin = (nextState, replace) => {
		const userState = store.getState().user
		if (!userState.authenticated) {
			replace({
				pathname: '/login',
				state: {
					nextPathname: nextState.location.pathname
				}
			})
		} else {
			// Si le user est bien authentifié, je vérifie les droits
			isAuthorizedApi(nextState.location.pathname)
				.then(retour => {
					if (!retour) logout()
				})
		}
	}

	const checkOnEnter = (nextState, replace) => {
		checkLogin(nextState, replace)
	}

	const checkOnChange = (prevState, nextState, replace) => {
		checkLogin(nextState, replace)
	}

	const redirectToDashboard = (nextState, replace) => {
		const userState = store.getState().user
		if (userState.authenticated) {
			replace('/')
		}
	}

	const logout = () => {
		store.dispatch(logOut())
	}

	// Save store for redirectToLogin
	saveStore(store)

	// Create an enhanced history that syncs navigation events with the store
	const history = syncHistoryWithStore(browserHistory, store)

	// Needed for onTouchTap
	// Check this repo:
	// https://github.com/zilverline/react-tap-event-plugin
	injectTapEventPlugin()

	const root = document.getElementById('app')

	ReactDOM.render(
		<AppContainer>
			<Root
				store={store}
				checkOnEnter={checkOnEnter}
				checkOnChange={checkOnChange}
				muiTheme={muiTheme}
				history={history}
				redirectToDashboard={redirectToDashboard}
				logout={logout}
			/>
		</AppContainer>, root)

	if (module.hot) {
		module.hot.accept('./containers/Root', () => {
			const NextRoot = require('./containers/Root').default
			ReactDOM.render(
				<AppContainer>
					<NextRoot
						store={store}
						muiTheme={muiTheme}
						history={history}
						checkOnEnter={checkOnEnter}
						checkOnChange={checkOnChange}
						redirectToDashboard={redirectToDashboard}
						logout={logout}
					/>
				</AppContainer>,
				root
			)
		})
	}

}

const token = window.localStorage.getItem('token')
if (token) {
	fetchUserApi(token).then(user => {
		if (user) {
			user.token = token
			user.authenticated = true
		}
		reactInit(user)
	}).catch((error) => {
		console.log(error)
		reactInit()
	})
} else {
	reactInit()
}
