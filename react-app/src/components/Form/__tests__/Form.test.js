import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';  // for the "toBeInTheDocument" matcher
import { useDispatch } from 'react-redux';
import Form from '../Form';
import * as constants from '../../../redux/constants';  // adjust the import to your file structure

// Mocking the useDispatch hook from react-redux
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('<Form />', () => {
  let dispatch;

  beforeEach(() => {
    // Set up a mock dispatch function
    dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
  });

  test('renders correctly', () => {
    const { getByPlaceholderText } = render(<Form />);
    expect(getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Message')).toBeInTheDocument();
  });

  test('shows validation errors', async () => {
    render(<Form />);
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument();
      expect(screen.getByText('Last name is required')).toBeInTheDocument();
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      expect(screen.getByText('Message must be at least 10 characters long')).toBeInTheDocument();
    });
  });

  test('submits the form when valid', async () => {
    const { getByPlaceholderText } = render(<Form />);

    fireEvent.change(getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'john.doe@gmail.com' } });
    fireEvent.change(getByPlaceholderText('Message'), { target: { value: 'Hello, this is a test message.' } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: constants.ADD_RECORD, // this should match whatever your real action looks like
        payload: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@gmail.com',
          message: 'Hello, this is a test message.'
        }
      });
    });
  });
});
