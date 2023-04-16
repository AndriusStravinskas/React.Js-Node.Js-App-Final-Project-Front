export const pages = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Register',
    path: '/register',
  },
  {
    title: 'Login',
    path: '/login',
  },
];

export const userLoginPage = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Chats',
    path: '/chats',
  },
];

export const settings = [
  {
    title: 'Profile',
    path: `/profile/${localStorage.getItem('username')}`,
    
  },
  {
    title: 'Logout',
    path: '/logout',
    handle: () => {
      localStorage.removeItem('userSecret');
      localStorage.removeItem('username');
      window.location.href = '/';
    },
  }
];
