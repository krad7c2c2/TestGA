import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../LoginScreen';

describe('LoginScreen', () => {
    it('should render correctly', () => {
        const { getByPlaceholderText, getByTestId } = render(<LoginScreen />);
        
        expect(getByPlaceholderText('Nombre')).toBeTruthy();
        expect(getByPlaceholderText('Contraseña')).toBeTruthy();
        expect(getByTestId('btn-login')).toBeTruthy();
    });

    it('should show alert when fields are empty', async () => {
        const navigation = { navigate: jest.fn() };
        const { getByTestId } = render(<LoginScreen navigation={navigation} />);
        
        fireEvent.press(getByTestId('btn-login'));
        
        await waitFor(() => {
            expect(navigation.navigate).not.toHaveBeenCalled();
        });
    });

    it('should validate only letters in name', async () => {
        const navigation = { navigate: jest.fn() };
        const { getByPlaceholderText, getByTestId } = render(<LoginScreen navigation={navigation} />);
        
        fireEvent.changeText(getByPlaceholderText('Nombre'), '123');
        fireEvent.changeText(getByPlaceholderText('Contraseña'), 'password123');
        fireEvent.press(getByTestId('btn-login'));
        
        await waitFor(() => {
            expect(navigation.navigate).not.toHaveBeenCalled();
        });
    });

    it('should navigate to Home when valid credentials are entered', async () => {
        const navigation = { navigate: jest.fn() };
        const { getByPlaceholderText, getByTestId } = render(<LoginScreen navigation={navigation} />);
        
        fireEvent.changeText(getByPlaceholderText('Nombre'), 'John');
        fireEvent.changeText(getByPlaceholderText('Contraseña'), 'password123');
        fireEvent.press(getByTestId('btn-login'));
        
        await waitFor(() => {
            expect(navigation.navigate).toHaveBeenCalledWith('Home');
        });
    });
});
