import { Route, Routes as BrowserRoutes } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';

import { Dashboard } from '../pages/Dashboard';
import { SignIn } from '../pages/SignIn';
import { Balance } from '../pages/Balance';
import { Transactions } from '../pages/Transactions';

export function Routes() {
  return (
    <BrowserRoutes>
      <Route path="/" element={<SignIn />} />
      <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
      <Route path="/balance" element={<PrivateRoute component={Balance} />} />
      <Route path="/transactions" element={<PrivateRoute component={Transactions} />} />
    </BrowserRoutes>
  );
}