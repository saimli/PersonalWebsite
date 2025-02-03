export const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        const navbarHeight = 48; // This matches the h-12 (48px)
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
}; 