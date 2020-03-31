import React from 'react';
import { Route } from 'react-router-dom';
import map from 'crocks/pointfree/map';
import composeB from 'crocks/combinators/composeB';
import * as routes from '../../configs/routes';

const routesMapper = (props) => (<Route {...props} />);

const RouteComponentsList = composeB(map(routesMapper), Object.values);

const Routes = () => RouteComponentsList(routes);

export default Routes;
