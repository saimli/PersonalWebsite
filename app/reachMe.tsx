'use client'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const ReachMe = ({ onClose }: { onClose: () => void }) => {
  // Define the type for formData
  interface FormData {
    name: string;
    email: string;
    message: string;
    honeypot?: string; // Make honeypot optional
  }
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '', honeypot: '' })
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Load the reCAPTCHA script
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`
    script.async = true
    script.defer = true
    document.body.appendChild(script)
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true); // Set loading to true when form is submitted

    const honeypotValue = formData.honeypot;
    if (honeypotValue) {
      console.log("Honepot field filled, submission blocked.");
      setIsLoading(false); // Reset loading state
      return;
    }
    /* Delete the honeypot from data emailed */ 
    delete formData.honeypot;

    if (typeof window !== 'undefined') {
      if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        console.log('Invalid/Missing environment variable: "NEXT_PUBLIC_RECAPTCHA_SITE_KEY"');
        setIsLoading(false); // Reset loading state
        return;
      }
    /* Get the web3form key */
    const web3formkey = process.env.NEXT_PUBLIC_WEB3FORMKEY;
    if (!web3formkey) {
      console.log('Invalid/Missing enviroment variable: "NEXT_PUBLIC_WEB3FORMKEY"');
      setIsLoading(false); // Reset loading state
      return;
    }
      try {
        // Execute reCAPTCHA and get the token
        const token = await window.grecaptcha.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
          { action: "submit" }
        );
        
        // Verify reCAPTCHA token
        const verifyResponse = await fetch('/api/verify-recaptcha', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const verifyResult = await verifyResponse.json();
        console.log(verifyResult);
        if (!verifyResult.success) {
          console.error('reCAPTCHA verification failed');
          setIsLoading(false); // Reset loading state
          return;
        }

        // Proceed with form submission to web3forms
        // Create an object from formData
        const object = {
          ...formData,
          access_key: web3formkey,
        };

        const json = JSON.stringify(object);

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response: ", errorData);
          throw new Error(`error: ${errorData.message || 'Unknown error'}`);
        }

        const result = await response.json();
        if (result.success) {
          console.log(result);
          Swal.fire({
            title: "Success!",
            text: "I'll be in touch soon!",
            icon: "success",
            confirmButtonText: 'Got it!',
            customClass: {
              confirmButton: 'text-lg w-full h-[55px] font-medium mt-6 border-none rounded-md cursor-pointer bg-[#3F8E00] hover:bg-[#347400] text-white  hover:shadow-[0_0_20px_rgba(63,142,0,0.7)] sm:text-lg transition-all duration-200'
            }
          });
          onClose();
        }
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setIsLoading(false); // Reset loading state
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit} className='relative bg-white pt-10 px-6 sm:px-10 pb-10 w-full max-w-[1000px] min-w-[400px] sm:min-w-[500px] md:min-w-[600px] min-h-[500px] sm:min-h-[600px] md:min-h-[750px] rounded-lg shadow-md text-[#333] m-4'>
          <button
              onClick={onClose}
              className="absolute top-2 right-2 bg-red-500 text-white text-2xl hover:bg-red-700 transition shadow-[0_0_15px_rgba(255,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,0,0,0.7)] rounded-full w-8 h-8 flex items-center justify-center"
              aria-label="Close"
            >
              &times;
          </button>
          <h2 className='text-3xl text-center font-bold w-full'>Contact Form</h2>
          <div className='mt-5 font-sem'>
            <label className='font-medium'>Full Name</label>
            <input type='text' name='name' placeholder='Enter your name' required onChange={(e) => setFormData({...formData, name: e.target.value})} className='w-full h-[50px] bg-transparent border-2 border-[#ddd] outline-none rounded-md p-[15px] text-[16px] text-[#333] mt-2'></input>
          </div>
          <div className='mt-5'>
            <label className='font-medium'>Email Address</label>
            <input type='email' name='email' placeholder='Enter your email' required onChange={(e) => setFormData({...formData, email: e.target.value})} className='w-full h-[50px] bg-transparent border-2 border-[#ddd] outline-none rounded-md p-[15px] text-[16px] text[#333] mt-2'></input>
          </div>
          <div className='mt-5'>
            <label className='font-medium'>Your Message</label>
            <textarea name='message' placeholder='Enter your Message' required onChange={(e) => setFormData({...formData, message: e.target.value})} className='w-full h-[300px] resize-none bg-transparent border-2 border-[#ddd] outline-none rounded-md p-[15px] text-[16px] text-[#333] mt-2'></textarea>
          </div>
          <input type="text" name="honeypot" className="hidden"/>
          <button type='submit' className='text-lg w-full h-[55px] font-medium mt-6 border-none rounded-md cursor-pointer bg-[#3F8E00] hover:bg-[#347400] text-white shadow-[0_0_15px_rgba(63,142,0,0.5)] hover:shadow-[0_0_20px_rgba(63,142,0,0.7)] sm:text-lg transition-all duration-200'>
            {isLoading ? 'Sending' : 'Send Message ›'}
            {isLoading && <span className='loading-dots'>...</span>}
          </button>
          <p className="absolute md:bottom-3.5 bottom-1 left-0 right-0 text-[10px] text-center text-gray-500 text-opacity-50 mt-4">
            This site is protected by reCAPTCHA and the Google 
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-opacity-90 hover:underline"> Privacy Policy</a> and 
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-opacity-90 hover:underline"> Terms of Service</a> apply.
          </p>
        </form>
    </div>
  )
}

export default ReachMe