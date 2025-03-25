export const initializeApp = jest.fn(() => ({}));
export const getAuth = jest.fn(() => ({
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { email: 'test@example.com' } })),
  onAuthStateChanged: jest.fn((callback) => {
    callback({ email: 'test@example.com', uid: 'mock-uid' }); // Add uid for auth state
    return jest.fn(); // Mock unsubscribe
  }),
}));
export const onAuthStateChanged = jest.fn((auth, callback) => {
  callback({ email: 'test@example.com', uid: 'mock-uid' }); // Ensure callback fires
  return jest.fn();
});
export const signInWithEmailAndPassword = jest.fn();
export const GoogleAuthProvider = {
  credential: jest.fn(() => ({}))
};
export const signInWithCredential = jest.fn(() => ({
  user: { getIdToken: jest.fn().mockResolvedValue('mock-token') }
}));
export const signInWithGoogle = jest.fn(() => Promise.resolve({ email: 'test@example.com', uid: 'mock-uid' }));
export const auth = getAuth();
export const googleProvider = GoogleAuthProvider;