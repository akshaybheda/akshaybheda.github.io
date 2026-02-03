import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import JsonFormatter from '../JsonFormatter';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
    return render(
        <ThemeProvider theme={theme}>
            {component}
        </ThemeProvider>
    );
};

describe('JsonFormatter Component', () => {
    it('renders correctly', () => {
        renderWithTheme(<JsonFormatter />);
        expect(screen.getByText('JSON Formatter & Validator')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('{"paste": "your JSON here"}')).toBeInTheDocument();
    });

    it('formats valid JSON correctly', () => {
        renderWithTheme(<JsonFormatter />);
        const input = screen.getByPlaceholderText('{"paste": "your JSON here"}');
        const formatButton = screen.getByText('Format');

        fireEvent.change(input, { target: { value: '{"a":1,"b":"test"}' } });
        fireEvent.click(formatButton);

        const output = screen.getByPlaceholderText('Formatted JSON will appear here') as HTMLTextAreaElement;
        expect(output.value).toContain('"a": 1');
        expect(output.value).toContain('"b": "test"');
        expect(screen.getByText(/Valid JSON/)).toBeInTheDocument();
    });

    it('minifies valid JSON correctly', () => {
        renderWithTheme(<JsonFormatter />);
        const input = screen.getByPlaceholderText('{"paste": "your JSON here"}');
        const minifyButton = screen.getByText('Minify');

        fireEvent.change(input, { target: { value: '{\n  "a": 1\n}' } });
        fireEvent.click(minifyButton);

        const output = screen.getByPlaceholderText('Formatted JSON will appear here') as HTMLTextAreaElement;
        expect(output.value).toBe('{"a":1}');
    });

    it('shows error for invalid JSON', () => {
        renderWithTheme(<JsonFormatter />);
        const input = screen.getByPlaceholderText('{"paste": "your JSON here"}');
        const formatButton = screen.getByText('Format');

        fireEvent.change(input, { target: { value: '{"a":1,' } });
        fireEvent.click(formatButton);

        expect(screen.getByText(/Invalid JSON/)).toBeInTheDocument();
    });

    it('clears input and output correctly', () => {
        renderWithTheme(<JsonFormatter />);
        const input = screen.getByPlaceholderText('{"paste": "your JSON here"}') as HTMLTextAreaElement;
        const clearButton = screen.getByText('Clear');

        fireEvent.change(input, { target: { value: '{"a":1}' } });
        fireEvent.click(clearButton);

        expect(input.value).toBe('');
        expect(screen.getByPlaceholderText('Formatted JSON will appear here')).toHaveValue('');
    });
});
