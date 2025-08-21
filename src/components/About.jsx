// src/components/AboutContact.jsx

import React from "react";

const AboutContact = () => {
  return (
    <section className="relative mt-[-35px] px-6 py-16 text-center text-white">
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 -z-10"></div> {/* Gradient overlay for subtle depth */}
      
      <div className="relative max-w-4xl mx-auto">
        {/* Unified About and Contact */}
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-100">
          About & Contact
        </h2>
        
        <p className="text-lg sm:text-xl text-gray-300 opacity-90 mb-6">
          Stay motivated and focused with daily tips and inspiring quotes. Reach out if you have any questions or feedback — we're always happy to help!
        </p>

        {/* Contact Links with SVG icons */}
        <div className="flex justify-center gap-6 mt-6 flex-wrap">
          <a
            href="mailto:support@example.com"
            className="inline-flex items-center px-6 py-3 text-lg sm:text-xl text-white border-2 border-white rounded-full hover:bg-white/20 transition duration-300 justify-center"
          >
            {/* Envelope SVG Icon for Email */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.293 7.293a1 1 0 001.414 0L21 8M3 12l7.293 7.293a1 1 0 001.414 0L21 12"
              />
            </svg>
            Email Us
          </a>
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 text-lg sm:text-xl text-white border-2 border-white rounded-full hover:bg-white/20 transition duration-300 justify-center"
          >
            {/* Twitter SVG Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M23 3a10.17 10.17 0 01-2.825.775A4.8 4.8 0 0022.5 2.29a9.9 9.9 0 01-3.149 1.209A4.803 4.803 0 0016.5 3a4.75 4.75 0 00-4.747 4.747c0 .37.045.73.13 1.08a13.478 13.478 0 01-9.862-5.013A4.756 4.756 0 005.6 7.04a4.744 4.744 0 00-2.15-.593c.034.69.108 1.36.228 2.004a4.747 4.747 0 003.77 3.88c-.62.17-1.27.27-1.93.271-.473 0-.94-.045-1.39-.13.94 2.944 3.671 5.1 6.952 5.17a9.53 9.53 0 01-7.137 1.957c.623.354 1.348.564 2.085.563 2.5 0 4.89-.869 6.675-2.438A10.12 10.12 0 0023 3z"
              />
            </svg>
            Twitter
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutContact;
