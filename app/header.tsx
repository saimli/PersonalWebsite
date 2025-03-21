"use client";
import React, { useState, useEffect, useRef } from 'react';
import { scrollToSection } from './utils/scroll';
import { useColorScheme } from './utils/useColorScheme';
import Modal from './Modal';
import ReachMe from './reachMe';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { colorScheme, toggleColorScheme } = useColorScheme();
    
    const [isOpen, setIsOpen] = useState(false);

    const hamburgerMenuRef = useRef<HTMLDivElement>(null); 
    
    useEffect(() => {
        const handleClickOutside = (event : MouseEvent) => {
            if (hamburgerMenuRef.current && !hamburgerMenuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [hamburgerMenuRef]);

    const handleNavClick = (sectionId: string) => {
        scrollToSection(sectionId);
        setIsMenuOpen(false);
    };

    return (
        /* Not sure if I want the top padding here yet */
        <div className="fixed top-0 w-full z-50 px-4 pt-4">
            <nav className="mx-auto max-w-[800px] bg-black bg-opacity-50 backdrop-blur-sm rounded-lg">
                <div className="px-6 py-3" ref={hamburgerMenuRef}>
                    <div className="flex items-center justify-between">
                        {/* Theme toggle button */}
                        <button 
                            onClick={toggleColorScheme}
                            className="text-white p-2"
                            aria-label="Toggle color scheme"
                        >
                            <div className="relative w-5 h-5 mx-auto">
                                {/* Sun icon */}
                                <svg 
                                    className={`w-5 h-5 absolute transition-all hover:text-gray-500 duration-300 transform ${
                                        colorScheme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                                    }`}
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>

                                {/* Moon icon */}
                                <svg 
                                    className={`w-5 h-5 absolute transition-all hover:text-gray-500 duration-300 transform ${
                                        colorScheme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
                                    }`}
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            </div>
                        </button>
                        
                        <button onClick={() => handleNavClick('about')} className="md:hidden p-2 text-white  hover:text-gray-500 transition-colors duration-200" >
                            Saim Ali
                        </button>

                        {/* Hamburger menu button */}
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2" >
                            <svg className={`w-6 h-6  transition-all  duration-300 transform ${isMenuOpen ? 'rotate-90 text-red-500  hover:text-red-700 transition-all duration-200' : 'text-white hover:text-gray-500 transition-all duration-200'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    /* 'X' Icon */
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    /* 'Hamburger Menu' Icon */
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>

                        {/* Center - Navigation (desktop) */}
                        <div className="hidden md:flex items-center space-x-8">
                            <button 
                                onClick={() => handleNavClick('about')}
                                className="text-white hover:text-gray-500 transition-colors duration-200 text-sm sm:text-base md:text-lg"
                            >
                                Home
                            </button>
                            <button 
                                onClick={() => handleNavClick('projects')}
                                className="text-white hover:text-gray-500 transition-colors duration-200 text-sm sm:text-base md:text-lg"
                            >
                                Projects
                            </button>
                            <button 
                                onClick={() => handleNavClick('slimewatcher')}
                                className="text-white hover:text-gray-500 transition-colors duration-200 text-sm sm:text-base md:text-lg"
                            >
                                Slime-Watcher
                            </button>
                            <button 
                                onClick={() => handleNavClick('experience')}
                                className="text-white hover:text-gray-500 transition-colors duration-200 text-sm sm:text-base md:text-lg"
                            >
                                Experience
                            </button>
                            <button onClick={() => setIsOpen(true)} 
                                className="text-white hover:text-gray-500 transition-colors duration-200 text-sm sm:text-base md:text-lg"
                                >
                                Reach Me
                            </button>
                            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                                <ReachMe onClose={() => setIsOpen(false)} />
                            </Modal>
                            
                        </div>

                        {/* Right side - Social links */}
                        <div className="hidden md:flex items-center space-x-4">
                            <a href="https://github.com/saimli" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-500">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/in/saim-ali-864702239/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-500">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {isMenuOpen && (
                        <div className="md:hidden pt-4 pb-2">
                            <div className="flex flex-col items-center space-y-3 text-center">
                                <button 
                                    onClick={() => handleNavClick('about')}
                                    className="text-white hover:text-gray-500 transition-colors duration-200 text-base sm:text-lg"
                                >
                                    Home
                                </button>
                                <button 
                                    onClick={() => handleNavClick('projects')}
                                    className="text-white hover:text-gray-500 transition-colors duration-200 text-base sm:text-lg"
                                >
                                    Projects
                                </button>
                                <button 
                                    onClick={() => handleNavClick('slimewatcher')}
                                    className="text-white hover:text-gray-500 transition-colors duration-200 text-base sm:text-lg"
                                >
                                    Slime-Watcher
                                </button>
                                <button 
                                    onClick={() => handleNavClick('experience')}
                                    className="text-white hover:text-gray-500 transition-colors duration-200 text-base sm:text-lg"
                                >
                                    Experience
                                </button>
                                <button onClick={() => setIsOpen(true)} 
                                className="text-white hover:text-gray-500 transition-colors duration-200 text-base sm:text-lg"
                                >
                                    Reach Me
                            </button>
                                <div className="flex justify-center space-x-4 pt-2 w-full">
                                    <a href="https://github.com/saimli" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-500">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="https://www.linkedin.com/in/saim-ali-864702239/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-500">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;