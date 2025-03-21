import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {

    const { token } = req.body;
    //console.log("Received token:", token);

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      res.status(404).json({ success: false, error: 'Invalid/Missing environment variable: "RECAPTCHA_SECRET_KEY"'});
      return; // Ensure to return after sending a response
    }
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    try {
      const response = await fetch(verificationUrl, { method: 'POST' });
      const data = await response.json();

      if (data.success) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false, error: 'reCAPTCHA verification failed' });
      }
    } catch (error) {
      console.log("Captcha error:", error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 