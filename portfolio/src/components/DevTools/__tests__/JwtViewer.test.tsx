import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import JwtViewer from '../JwtViewer';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
    return render(
        <ThemeProvider theme={theme}>
            {component}
        </ThemeProvider>
    );
};

// Sample JWT for testing (alg: HS256, payload: {sub: "123", name: "John", iat: 1516239022})
const sampleJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

describe('JwtViewer Component', () => {
    it('renders correctly', () => {
        renderWithTheme(<JwtViewer />);
        expect(screen.getByText('JWT Decoder & Viewer')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/eyJhbGciOiJIUzI1Ni/)).toBeInTheDocument();
    });

    it('decodes a valid JWT correctly', () => {
        renderWithTheme(<JwtViewer />);
        const input = screen.getByPlaceholderText(/eyJhbGciOiJIUzI1Ni/);

        fireEvent.change(input, { target: { value: sampleJwt } });

        expect(screen.getByText('HEADER')).toBeInTheDocument();
        expect(screen.getByText('PAYLOAD')).toBeInTheDocument();
        expect(screen.getByText('SIGNATURE')).toBeInTheDocument();

        expect(screen.getByText(/"alg"/)).toBeInTheDocument();
        expect(screen.getByText(/"HS256"/)).toBeInTheDocument();
        expect(screen.getByText(/"name"/)).toBeInTheDocument();
        expect(screen.getByText(/"John Doe"/)).toBeInTheDocument();
    });

    it('shows error for invalid JWT format', () => {
        renderWithTheme(<JwtViewer />);
        const input = screen.getByPlaceholderText(/eyJhbGciOiJIUzI1Ni/);

        fireEvent.change(input, { target: { value: 'invalid.token' } });

        expect(screen.getByText(/JWT must have 3 parts/)).toBeInTheDocument();
    });

    it('handles expired tokens (if exp is in the past)', () => {
        // Create a JWT with an expired 'exp' claim
        const expiredPayload = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) - 3600 }));
        const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
        const expiredJwt = `${header}.${expiredPayload}.signature`;

        renderWithTheme(<JwtViewer />);
        const input = screen.getByPlaceholderText(/eyJhbGciOiJIUzI1Ni/);

        fireEvent.change(input, { target: { value: expiredJwt } });

        expect(screen.getByText('EXPIRED')).toBeInTheDocument();
    });
});
