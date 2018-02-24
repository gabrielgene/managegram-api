const handleHttpStatus = res => {
  if (res.status >= 200 && res.status < 300) {
    return res.json();
  }
  throw res;
};

const createErrorHandler = defaultValue => res => {
  console.error('request failed', res);
  return defaultValue;
};

export const postLogin = (login) => {
  return fetch('/api/login', {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(login),
  }).then( res => res.status).catch(createErrorHandler(500));
};

export const getConfig = (userId) => {
  return fetch(`/api/config/${userId}`, {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(handleHttpStatus).catch(createErrorHandler({}));
};
