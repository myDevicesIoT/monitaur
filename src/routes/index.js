import { mount, route, lazy, map, redirect } from 'navi';
import React, { Suspense } from 'react';
import { Router, View } from 'react-navi';

import { useKeycloak } from 'react-keycloak';
import { withAuthentication } from './utils';
import Layout from '../views/Layout';
import Explorer from '../views/Explorer';
import Account from '../views/Account';


// Define your routes
const routes = mount({
  'explorer': withAuthentication(
    route(async req => {
      return {
        view: <Explorer />
      }
    }),
  ),
  'account': withAuthentication(
    route(async req => {
      return {
        view: <Account />
      }
    }),
  ),
  '/login': map(async (request, context) =>
    context.isAuthenticated
      ? redirect(
          // Redirect to the value of the URL's `redirectTo` parameter. If no
          // redirectTo is specified, default to `/home`.
          request.params.redirectTo ? decodeURIComponent(request.params.redirectTo) : '/explorer',
        )
     : lazy(() => import('../views/Login')),
      ),
  '/': redirect('/login'),
});

export const AppRouter = () => {
  const [keycloak, initialized] = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <Router routes={routes} context={{ isAuthenticated: keycloak.authenticated }}>
      <Layout>
        <Suspense fallback={null}>
          <View className="app-view" />
        </Suspense>
      </Layout>
    </Router>
  );
};