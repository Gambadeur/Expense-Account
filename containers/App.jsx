import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { refresh as refreshApi, storeLocalUser as storeLocalUserApi } from 'isotope-client/login/loginApi'
import { refreshToken as refreshTokenAction } from 'isotope-client/login/loginActions'



export class App extends Component {

	componentWillMount() {
		this.refresh()
		setInterval(() => {
			this.refresh()
		}, 1700 * 1000)
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.user.authenticated) {
			this.props.gotoLogin()
		}
	}

	refresh() {
		if (this.props.user && this.props.user.token) {
			const refreshAction = this.props.refreshAction
			const token = localStorage.getItem('token')
			refreshApi(token).then((json) => {
				if (json) {
					refreshAction(json.token)
					storeLocalUserApi(json)
				}
			})
		}
	}

	render() {
		document.body.classList.toggle('login-content', false)
		document.body.parentNode.classList.toggle('login-content', false)
		const { children } = this.props

		return (
			<div>

				{children}
			</div>
		)
	}
}

App.propTypes = {
	children: PropTypes.node,
	location: PropTypes.object.isRequired,
	gotoLogin: PropTypes.func.isRequired,
	refreshAction: PropTypes.func.isRequired,
	user: PropTypes.object
}
App.contextTypes = {
	muiTheme: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	user: state.user
})

const mapDispatchToProps = (dispatch) => ({
	refreshAction: (token) => dispatch(refreshTokenAction(token)),
	gotoLogin: () => dispatch(push('/login'))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
