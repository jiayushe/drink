import UsersAPI from './users';

const api = {
  users: new UsersAPI()
};

Object.freeze(api);

export default api;
