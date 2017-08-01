export function getBaseUrl(req) {
  let protocol = 'http';
  if(req.headers['x-forwarded-proto'] === 'https') {
    protocol = 'https';
  }
  return req ? `${protocol}://${req.get('Host')}` : '';
}
