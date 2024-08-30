// Local storage keys
export const STORAGE_KEYS = {
  JWT_TOKEN_STUDENT: 'JWT_TOKEN_STUDENT',
  JWT_TOKEN_INSTRUCTOR: 'JWT_TOKEN_INSTRUCTOR',
  ADDRESS: 'ADDRESS',
  TOKEN: localStorage.getItem('token')
};

// React-query keys
export const QUERY_KEYS = {
  SELF: 'SELF',
  TODOS: 'TODOS',
  TODO: 'TODO',
  EXAMPLE: 'EXAMPLE',
  TOKEN: 'TOKEN',
  STATISTIC: 'statistic',
  TRENDING: 'trending'
};

// Backend Routes
export const BACKEND_KEYS = {
  EXAMPLE: 'example',
  COURSES: 'courses',
  ARTICLES: 'articles',
  STATISTIC: 'statistic',
  TRENDING: 'trending',
  FEATURED_ARTICLES: 'featured_articles',
  TODO: 'todos',

  AUTH: {
    AUTH: 'auth',
    REGISTER: 'auth/register',
    LOGIN: 'auth/login',
    FORGOT_PASSWORD: 'auth/reset-password',
    SELF: 'auth/self'
  }
};

export const ROUTER_KEYS = {
  ERROR: '/404',
  FORGOT_PASSWORD: '/reset-password/',
  RESET_PASSWORD: '/reset-password/:token',
  ROOT: '/',
  AUTH: '/auth',
  HOME: 'home',
  TODO: '/todo/:id',
  TODO_PAGE: 'todo/',
  AUTHORIZED: 'authorized'
};
