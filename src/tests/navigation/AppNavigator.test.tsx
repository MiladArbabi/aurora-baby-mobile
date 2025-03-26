import { render } from '@testing-library/react-native';
import App from '../../../App';

jest.mock('../../services/firebase', () => ({
  auth: {},
  checkAuthState: jest.fn(() => Promise.resolve({ email: 'test@example.com' })),
  onAuthStateChanged: jest.fn((auth, callback) => callback({ email: 'test@example.com' })),
}));

describe('AppNavigator', () => {
  it('starts at Home screen in dev mode', async () => {
    const { findByText } = render(<App />);
    const harmonyText = await findByText('Harmony', {}, { timeout: 2000 });
    expect(harmonyText).toBeTruthy();
  });
});