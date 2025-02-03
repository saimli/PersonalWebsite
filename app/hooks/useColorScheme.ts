'use client';

import { useState, useEffect } from 'react';

export function useColorScheme() {
    const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        // Check initial system preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const initialScheme = mediaQuery.matches ? 'dark' : 'light';
        setColorScheme(initialScheme);
        
        // Apply initial theme
        if (initialScheme === 'light') {
            document.documentElement.classList.add('light-mode');
        } else {
            document.documentElement.classList.remove('light-mode');
        }

        // Listen for system preference changes
        const handleChange = (e: MediaQueryListEvent) => {
            const newScheme = e.matches ? 'dark' : 'light';
            setColorScheme(newScheme);
            if (newScheme === 'light') {
                document.documentElement.classList.add('light-mode');
            } else {
                document.documentElement.classList.remove('light-mode');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleColorScheme = () => {
        const newScheme = colorScheme === 'light' ? 'dark' : 'light';
        setColorScheme(newScheme);
        
        if (newScheme === 'light') {
            document.documentElement.classList.add('light-mode');
        } else {
            document.documentElement.classList.remove('light-mode');
        }
    };

    return { colorScheme, toggleColorScheme };
} 