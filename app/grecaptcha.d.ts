declare global {
    interface Grecaptcha {
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
    }

    interface Window {
        grecaptcha: Grecaptcha;
    }
}

// This line is necessary to make the file a module
export {};
