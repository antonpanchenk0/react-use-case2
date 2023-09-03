import { render, screen } from '@testing-library/react';
import App from '../App';
import {useDispatch} from 'react-redux';

jest.mock('./components/Form', () => () => <div>Form</div>);
jest.mock('./components/DataTable', () => () => <div>DataTable</div>);

// Mocking the useDispatch hook from react-redux
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('<App />', () => {
  let dispatch;

  beforeEach(() => {
    // Set up a mock dispatch function
    dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
  });

  test('renders learn react link', () => {
    render(<App />);
    const formElement = screen.getByText('Form');
    expect(formElement).toBeInTheDocument();
  });
});
