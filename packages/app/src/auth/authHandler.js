import { API } from '@/http-commons';
import { useRootStore } from '@/stores/root.store';
import { initSocket } from '@/socket';
import { parseJsonWebToken } from '@/helpers';
import { error } from 'lint-staged/lib/figures';

const rootStore = useRootStore();

export const verifyJWT = (access_token, callback) => {
  API.post('/auth/refresh', { access_token })
    .catch((ex) => {
      console.error('Unable to verify access_token', ex);
    })
    .then(async (res) => {
      if (!res || res.status !== 204) {
        console.error(
          'Got unprocessable status code - aborting refresh attempt',
        );

        // if token is expired
        if (res.status === 401) {
          localStorage.removeItem('access_token');
        }

        rootStore.$patch({
          authLoading: true,
        });
      } else {
        console.log('The token has been verified successfully');
        rootStore.$patch({
          tokenVerified: true,
          authenticated: true,
        });

        initSocket();
      }
    });
};

export const checkLoginState = async (aTokenCallback, signOutCallback) => {
  const access_token = localStorage.getItem('access_token');

  if (access_token) {
    console.log('Token has been found inside local Storage');

    try {
      parseJsonWebToken(access_token);
    } catch {
      console.error('Unable to parse access_token', access_token);
      localStorage.removeItem('access_token');

      rootStore.$patch({
        authenticated: false,
      });
      aTokenCallback();
    }
    verifyJWT(access_token, signOutCallback);
  } else {
    aTokenCallback();
  }
};

export const fetchToken = async (tokenId, signOutCallback) => {
  const resp = await API.post(
    '/auth/login',
    {
      token: tokenId,
    },
    {
      timeout: 2000,
    },
  ).catch((ex) => {
    console.error('Unable to fetch token from backend ');
    rootStore.$patch({
      unauthorizedMessage: 'Zeitüberschreitung',
      authenticated: false,
    });

    if (ex.response && ex.response.status === 401) {
      console.log('Proceed with logout');
      signOutCallback();
    }
  });

  if (resp && resp.data !== undefined && resp.data.token !== undefined) {
    console.log('Token fetched successfully', resp.data.token);

    const access_token = localStorage.getItem('access_token');

    if (access_token !== undefined) {
      console.log('All good :)');
    }
    localStorage.setItem('access_token', resp.data.token);

    verifyJWT(resp.data.token, signOutCallback);
  } else {
    console.error('Got empty response');
    rootStore.$patch({
      authLoading: false,
      authenticated: false,
    });
  }
};
