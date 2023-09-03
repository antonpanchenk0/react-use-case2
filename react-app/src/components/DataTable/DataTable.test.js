import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useSelector } from 'react-redux';
import DataTable from './DataTable';  // adjust the import to your file structure

// Mock react-redux hooks
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('<DataTable />', () => {

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    useSelector.mockClear();
  });

  it('should render an empty table when there are no records', () => {
    useSelector.mockReturnValue([]); // Mocks empty array for useSelector
    render(<DataTable />);
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.queryByRole('row', { name: '' })).not.toBeInTheDocument();
  });

  it('should render records from the Redux store', () => {
    const mockRecords = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        message: 'Hello, world!',
      },
      {
        firstName: 'Jane2',
        lastName: 'Doe2',
        email: 'jane.doe@gmail.com',
        message: 'Hi, there!',
      },
    ];

    useSelector.mockReturnValue(mockRecords); // Mock return value for useSelector
    render(<DataTable />);

    mockRecords.forEach((record) => {
      expect(screen.getByText(record.firstName)).toBeInTheDocument();
      expect(screen.getByText(record.lastName)).toBeInTheDocument();
      expect(screen.getByText(record.email)).toBeInTheDocument();
      expect(screen.getByText(record.message)).toBeInTheDocument();
    });
  });
});
