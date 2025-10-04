import axios, { HttpStatusCode } from 'axios';

const apiClient = axios.create({
  baseURL: 'https://iss.moex.com',
  // ошибки со статусом кода меньше 500 обрабатываем на фронте
  validateStatus: (status: number) =>
    status < HttpStatusCode.InternalServerError,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export { apiClient };
