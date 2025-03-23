export const initializeApp = jest.fn(() => ({}));
export const getAuth = jest.fn(() => ({
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { email: 'test@example.com' } }))
}));
export const auth = getAuth();
export const signInWithEmailAndPassword = auth.signInWithEmailAndPassword;