import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';

// for routing to diff pages.
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<AuthWrapper>
			<Router>
				<Switch>
					<PrivateRoute path="/" exact> {/*if exact prop is not present then Dashboard will be present in all the routes */}
						<Dashboard></Dashboard>
					</PrivateRoute>

					<Route path="/login" exact>
						<Login />
					</Route>

					<Route path="*">
						<Error />
					</Route>
				</Switch>
			</Router>
		</AuthWrapper>
	);
}

export default App;
