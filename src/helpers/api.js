const apiEndpoint = 'http://localhost:3000';

const get = resource => {
  return fetch(`${apiEndpoint}/${resource}`, {
    method: 'GET'
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Fetching failed ...');
    }
  });
};

const getOne = (resource, id) => {
  return fetch(`${apiEndpoint}/${resource}/${id}`, {
    method: 'GET'
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Fetching failed ...');
    }
  });
};

const create = (resource, payload) => {
  return fetch(`${apiEndpoint}/${resource}`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      // Accept: 'application/json',
      'Content-type': 'application/json; charset=UTF-8'
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Fetching failed ...');
    }
  });
};

const edit = (resource, payload, id) => {
  return fetch(`${apiEndpoint}/${resource}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      // Accept: 'application/json',
      'Content-type': 'application/json; charset=UTF-8'
    }
  }).then(res => {
    return res.json();
  });
};

const deleteResource = (resource, id) => {
  return fetch(`${apiEndpoint}/${resource}/${id}`, {
    method: 'DELETE'
  }).then(res => {
    if (!res.ok) throw new Error('Fetching failed ...');
  });
};

export { get, getOne, create, edit, deleteResource };
