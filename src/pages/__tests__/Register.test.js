import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../Register'

test('renders Register component', () => {
    render(<Register />);

    // Check if the Register component is rendered
    const registerTitle = screen.getByText(/Créer un compte/i);
    expect(registerTitle).toBeInTheDocument();

    // Check if email input is rendered
    const emailInput = screen.getByLabelText(/Adresse Email/i);
    expect(emailInput).toBeInTheDocument();

    // Check if password input is rendered
    const passwordInput = screen.getByLabelText(/Mot de passe/i);
    expect(passwordInput).toBeInTheDocument();

    // Check if confirmation password input is rendered
    const confirmPwdInput = screen.getByLabelText(/Confirmation mot de passe/i);
    expect(confirmPwdInput).toBeInTheDocument();

    // Check if submit button is rendered
    const submitButton = screen.getByRole('button', { name: /Créer un compte/i });
    expect(submitButton).toBeInTheDocument();
});

test('handles form submission', () => {
    render(<Register />);

    // Mocking the API call
    const mockPost = jest.fn();
    jest.mock('../../axios', () => ({
        post: mockPost,
    }));

    // Fill in the form
    const emailInput = screen.getByLabelText(/Adresse Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);
    const confirmPwdInput = screen.getByLabelText(/Confirmation mot de passe/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPwdInput, { target: { value: 'password123' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /Créer un compte/i });
    fireEvent.click(submitButton);

    // Check if the API call is made with the correct data
    expect(mockPost).toHaveBeenCalledWith('users/create/', {
        email: 'test@example.com',
        password: 'password123',
    });

    // Check if the page navigates to '/confirm' after successful submission
    // (You may need to mock the 'useNavigate' hook if it's not working in the test)
    expect(mockNavigate).toHaveBeenCalledWith('/confirm');
});
