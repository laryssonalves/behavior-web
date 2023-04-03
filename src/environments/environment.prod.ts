/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const apiUrl = 'https://bhavior-api.herokuapp.com/'

export const environment = {
  production: true,
  apiUrl,
  resetPasswordUrl: `${apiUrl}reset-password/`,
}
