export const auth = {
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { email: 'test@example.com' } })),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback({ email: 'test@example.com' }); // Mock authenticated user
    return jest.fn(); // Mock unsubscribe
  })
};

export const initializeApp = jest.fn(() => ({}));
export const getAuth = jest.fn(() => auth);
export const signInWithEmailAndPassword = auth.signInWithEmailAndPassword;
export const onAuthStateChanged = auth.onAuthStateChanged;