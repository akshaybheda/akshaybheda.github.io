import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TextComparer from '../TextComparer';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
    return render(
        <ThemeProvider theme={theme}>
            {component}
        </ThemeProvider>
    );
};

describe('TextComparer Component', () => {
    it('renders correctly', () => {
        renderWithTheme(<TextComparer />);
        expect(screen.getByText('Text Comparer')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Paste your original text here...')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Paste your modified text here...')).toBeInTheDocument();
    });

    it('computes diff and shows unified view correctly', () => {
        renderWithTheme(<TextComparer />);
        const input1 = screen.getByPlaceholderText('Paste your original text here...');
        const input2 = screen.getByPlaceholderText('Paste your modified text here...');
        const compareButton = screen.getByText('Compare');

        fireEvent.change(input1, { target: { value: 'line 1\nline 2' } });
        fireEvent.change(input2, { target: { value: 'line 1\nline 3' } });
        fireEvent.click(compareButton);

        expect(screen.getByTestId('added-stats')).toHaveTextContent('+1 added');
        expect(screen.getByTestId('removed-stats')).toHaveTextContent('-1 removed');
        expect(screen.getByTestId('unchanged-stats')).toHaveTextContent('1 unchanged');

        // Unified view should show both lines
        expect(screen.getAllByText('line 1').length).toBeGreaterThan(0);
        expect(screen.getByText('line 2')).toBeInTheDocument();
        expect(screen.getByText('line 3')).toBeInTheDocument();
    });

    it('switches between unified and split views', () => {
        renderWithTheme(<TextComparer />);
        const input1 = screen.getByPlaceholderText('Paste your original text here...');
        const input2 = screen.getByPlaceholderText('Paste your modified text here...');
        const compareButton = screen.getByText('Compare');

        fireEvent.change(input1, { target: { value: 'test' } });
        fireEvent.change(input2, { target: { value: 'test mod' } });
        fireEvent.click(compareButton);

        const splitToggle = screen.getByText('Split');
        fireEvent.click(splitToggle);

        expect(screen.getByText('Original')).toBeInTheDocument();
        expect(screen.getByText('Modified')).toBeInTheDocument();
    });

    it('clears input and output correctly', () => {
        renderWithTheme(<TextComparer />);
        const input1 = screen.getByPlaceholderText('Paste your original text here...');
        const clearButton = screen.getByText('Clear');

        fireEvent.change(input1, { target: { value: 'some text' } });
        fireEvent.click(clearButton);

        expect(input1).toHaveValue('');
    });
});
