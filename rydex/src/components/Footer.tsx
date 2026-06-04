'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const footerData = [
    {
      title: "Company",
      links: ["About us", "Our offerings", "Newsroom", "Investors", "Blog", "Careers"],
    },
    {
      title: "Products",
      links: ["Ride", "Drive", "Eat", "Rydex for Business","Gift cards"],
    },
    {
      title: "Global citizenship",
      links: ["Safety", "Sustainability"],
    },
    {
      title: "Travel",
      links: ["Reserve", "Airports", "Cities"],
    },
  ];

const socialLinks = [
    { Icon: FaFacebookF, href: "#", color: "hover:text-blue-600" },
    { Icon: FaInstagram, href: "#", color: "hover:text-pink-500" },
    { Icon: FaTwitter, href: "#", color: "hover:text-sky-400" },
    { Icon: FaLinkedinIn, href: "#", color: "hover:text-blue-700" },
  ];

  return (
    <footer className="bg-black text-white py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Top Logo Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">RYDEX</h2>
          <p className="text-gray-400 text-sm max-w-xs">
            Book any vehicle - from bikes to trucks. Trusted owners. Transparent pricing.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {footerData.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-semibold text-lg mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Socials and Copyright */}
        <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Social Icons Row */}
          <div className="flex gap-5 mt-6">
            {socialLinks.map(({ Icon, href, color }, idx) => (
              <motion.a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className={`hover:bg-white rounded-full p-2 text-gray-400 transition-colors duration-300 ${color}`}
              >
                <Icon size={22} />
              </motion.a>
            ))}
          </div>
          
          <div className="text-gray-500 text-xs text-center md:text-right">
            <p>© {new Date().getFullYear()} RYDEX. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;