/**
 * Oauth response interface
 * @author Boenec Yann
 * @date 21/02/2019
 */
export interface OauthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

/**
 * User object
 * @author Boenec Yann
 * @date 21/02/2019
 */
export interface User {
  firstName: string;
  lastName: string;
}

/**
 * ItemErrorResponse object
 * @author Boenec Yann
 * @date 18/03/2019
 */
export interface ItemErrorResponse {
  label: string;
  values: string[];
}
