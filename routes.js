import LoginPage from 'isotope-client/login/LoginPage'
import App from './containers/App'
import DashboardPage from './containers/dashboard/DashboardPage'
import Note_de_frais from './containers/note_de_frais/Note_de_frais'
import Validation from './containers/validation/Validation'

export default (checkOnEnter, checkOnChange, redirectToDashboard, logout) => ({
	childRoutes: [
		{
			path: '/login',
			component: LoginPage,
			onEnter: redirectToDashboard
		},
		{
			path: '/logout',
			component: LoginPage,
			onEnter: logout
		},
        {
            path: '/notedefrais',
            component: Note_de_frais
        },
        {
            path: '/validation',
            component: Validation
        },
		{
			path: '/',
            onEnter: checkOnEnter,
            onChange: checkOnChange,
			component: App,
			indexRoute: { component : DashboardPage},
			childRoutes: [
				{
					path: 'dashboard',
					component: DashboardPage
				}
			]
		},
		{
			path: '*',
            onEnter: checkOnEnter,
            onChange: checkOnChange,
			component: App
		}
	]
})
