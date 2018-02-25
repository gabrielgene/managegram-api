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
      Accept: 'application/json',
    },
    body: JSON.stringify(login),
  }).then(res => res.status).catch(createErrorHandler(500));
};

export const getVerifyLogin = () => {
  return fetch('/api/verify', {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(handleHttpStatus).catch(createErrorHandler(403));
};

export const postUpdateConfig = (data) => {
  return fetch('/api/update', {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  }).then(handleHttpStatus).catch(createErrorHandler(500));
};

export const postInstaVerify = (login) => {
  return fetch('/api/instaverify', {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(login),
  }).then(res => res.status).catch(createErrorHandler(500));
};

export const getUser = () => {
  return fetch('/api/all', {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(handleHttpStatus).catch(createErrorHandler([]));
};

export const getUpdateAdmEnable = (userId) => {
  return fetch(`/api/admin/enable/${userId}`, {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(handleHttpStatus).catch(createErrorHandler([]));
};

export const getUpdateAdmDisable = (userId) => {
  return fetch(`/api/admin/disable/${userId}`, {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(handleHttpStatus).catch(createErrorHandler([]));
};
