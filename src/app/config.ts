import { NbAuthSimpleToken, NbPasswordAuthStrategy } from '@nebular/auth';
import { constants } from './constants';

const formSetting = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};

export const appConfig: any = {
  authOptions: {
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: constants.apiUrl,
        token: {
          class: NbAuthSimpleToken,
          key: 'token',
        },
        login: {
          endpoint: 'auth/login/',
          method: 'post',
          redirect: {
            success: '/',
            failure: null,
          },
        },
        logout: {
          endpoint: 'auth/logout/',
          method: 'delete',
        },
      }),
    ],
    forms: {
      login: formSetting,
      logout: {
        redirectDelay: 1000,
      },
    },
  },
};
