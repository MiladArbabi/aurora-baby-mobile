export const initializeApp = jest.fn(() => ({}));
export const getAuth = jest.fn(() => ({
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { email: 'test@example.com', uid: 'mock-uid', getIdToken: jest.fn().mockResolvedValue('mock-token') } })),
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { email: 'test@example.com', uid: 'mock-uid', getIdToken: jest.fn().mockResolvedValue('mock-token') } })),
  onAuthStateChanged: jest.fn((callback) => {
    callback({ email: 'test@example.com', uid: 'mock-uid', getIdToken: jest.fn().mockResolvedValue('mock-token') });
    return jest.fn();
  }),
}));
export const onAuthStateChanged = jest.fn((_, callback) => {
  callback({ email: 'test@example.com', uid: 'mock-uid', getIdToken: jest.fn().mockResolvedValue('mock-token') });
  return jest.fn();
});
export const signInWithEmailAndPassword = getAuth().signInWithEmailAndPassword;
export const createUserWithEmailAndPassword = getAuth().createUserWithEmailAndPassword;
export const GoogleAuthProvider = jest.fn(() => ({
  credential: jest.fn(() => ({}))
}));
export const signInWithCredential = jest.fn(() => Promise.resolve({
  user: { email: 'test@example.com', uid: 'mock-uid', getIdToken: jest.fn().mockResolvedValue('mock-token') }
}));
export const signInWithGoogle = jest.fn(() => Promise.resolve({ email: 'test@example.com', uid: 'mock-uid', getIdToken: jest.fn().mockResolvedValue('mock-token') }));
export const signInWithEmail = jest.fn(() => Promise.resolve({ email: 'test@example.com', uid: 'mock-uid', getIdToken: jest.fn().mockResolvedValue('mock-token') }));
export const signUpWithEmail = jest.fn(() => Promise.resolve({ email: 'test@example.com', uid: 'mock-uid', getIdToken: jest.fn().mockResolvedValue('mock-token') }));
export const checkAuthState = jest.fn(() => Promise.resolve({ email: 'test@example.com', uid: 'mock-uid', getIdToken: jest.fn().mockResolvedValue('mock-token') }));
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();