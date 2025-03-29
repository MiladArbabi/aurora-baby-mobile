import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../../components/common/Button';
import { ThemeProvider } from '@rneui/themed';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { rneThemeBase, theme } from '../../styles/theme';

const renderWithTheme = (component: React.ReactNode) => {
  return render(
    <ThemeProvider theme={rneThemeBase}>
      <StyledThemeProvider theme={theme}>
        {component}
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

describe('Button', () => {
  it('renders with provided text and themed styles', () => {
    const { getByText, getByTestId } = renderWithTheme(
      <Button text="Click Me" onPress={() => {}} testID="styled-button" />
    );
    const buttonText = getByText('Click Me');
    const button = getByTestId('styled-button');

    expect(buttonText).toBeTruthy();
    expect(buttonText.props.style).toMatchObject({
      color: theme.colors.background,
      fontFamily: theme.fonts.regular,
      textAlign: 'center',
    });
    expect(button.props.style).toMatchObject({
      backgroundColor: theme.colors.primary,
      paddingTop: theme.spacing.small,
      paddingRight: theme.spacing.medium,
      paddingBottom: theme.spacing.small,
      paddingLeft: theme.spacing.medium,
      borderTopLeftRadius: theme.spacing.small,
      borderTopRightRadius: theme.spacing.small,
      borderBottomRightRadius: theme.spacing.small,
      borderBottomLeftRadius: theme.spacing.small,
    });
  });

  it('calls onPress when clicked', () => {
    const mockOnPress = jest.fn();
    const { getByText } = renderWithTheme(
      <Button text="Click Me" onPress={mockOnPress} testID="styled-button" />
    );
    fireEvent.press(getByText('Click Me'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});