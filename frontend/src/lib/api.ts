export const API_URL = '/api/v1';

export class ApiException extends Error {
  constructor(public status: number, public data: any) {
    super(data?.message || 'An API error occurred');
  }
}

async function fetchWrapper(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  headers.set('Content-Type', 'application/json');

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/';
    throw new ApiException(401, { message: 'Session expired' });
  }
  
  if (!response.ok) {
    let data;
    try {
      data = await response.json();
    } catch {
      data = { message: response.statusText };
    }
    throw new ApiException(response.status, data);
  }

  return response.json().catch(() => ({}));
}

export const api = {
  get: <T = any>(endpoint: string) => fetchWrapper(endpoint, { method: 'GET' }) as Promise<T>,
  post: <T = any>(endpoint: string, body: any) => fetchWrapper(endpoint, { method: 'POST', body: JSON.stringify(body) }) as Promise<T>,
  put: <T = any>(endpoint: string, body: any) => fetchWrapper(endpoint, { method: 'PUT', body: JSON.stringify(body) }) as Promise<T>,
};
