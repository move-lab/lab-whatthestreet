import getConfig from 'next/config';
import { prefixURL } from '../../../utils/url';

const { publicRuntimeConfig } = getConfig();
const { URL_PREFIX } = publicRuntimeConfig;

export function getBaseUrl(req) {
  let protocol = 'http';
  if (req.headers['x-forwarded-proto'] === 'https') {
    protocol = 'https';
  }

  // return req ? `${protocol}://${req.get('Host')}` : '';
  return req ? `${protocol}://${req.get('Host')}${URL_PREFIX}` : '';
}
