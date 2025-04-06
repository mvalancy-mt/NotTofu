// Global configuration settings

// API URL - change this if your backend is hosted elsewhere
export const API_URL = 'http://localhost:8000';

// Refresh intervals (in milliseconds)
export const API_STATUS_CHECK_INTERVAL = 10000; // 10 seconds
export const DATA_REFRESH_INTERVAL = 5000; // 5 seconds

// Timeouts (in milliseconds)
export const API_REQUEST_TIMEOUT = 5000; // 5 seconds

// API endpoints
export const API_ENDPOINTS = {
  root: '/',
  status: '/status',
  testRuns: '/runs/',
  testPhases: '/phases/',
  getTestRun: (id: number | string) => `/runs/${id}`,
  getTestRunPhases: (id: number | string) => `/runs/${id}/phases`,
  updateTestRunStatus: (id: number | string) => `/runs/${id}/status`,
}; 