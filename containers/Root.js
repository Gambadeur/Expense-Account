import React, { PropTypes } from 'react'
import { Provider } from 'react-intl-redux'
import { Router } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import routesFactory from '../routes'

const Root = ({ store, muiTheme, history, checkOnEnter, checkOnChange, redirectToDashboard, logout }) => {

	const routes = routesFactory(checkOnEnter, checkOnChange, redirectToDashboard, logout)

	return (
		<Provider store={store}>
			<MuiThemeProvider muiTheme={muiTheme}>
				<Router {...{ history, routes }} />
			</MuiThemeProvider>
		</Provider>
	)
}

Root.propTypes = {
	store: PropTypes.object.isRequired,
	muiTheme: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	checkOnEnter: PropTypes.func.isRequired,
	checkOnChange: PropTypes.func.isRequired,
	redirectToDashboard: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired
}

export default Root
