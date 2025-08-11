getHeaders(): HttpHeaders {
  let headers = new HttpHeaders();
  if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  }
  return headers;
}
