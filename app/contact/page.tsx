'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import { Mail, Phone, MapPin, Send, Github, Twitter, Linkedin, Download } from 'lucide-react';
import personalInfo from '@/lib/data/personal-info.json';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/ui/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className={`h-64 flex items-center justify-center ${
      useTheme().settings.theme === 'developer' ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <MapPin className={`h-12 w-12 mx-auto ${
        useTheme().settings.theme === 'developer' ? 'text-green-400' : 'text-gray-400'
      }`} />
    </div>
  )
});

export default function ContactPage() {
  const { settings } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isDeveloper = settings.theme === 'developer';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      alert('Thank you for your message! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialIcons = {
    GitHub: Github,
    Twitter: Twitter,
    LinkedIn: Linkedin,
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h1 className={`mb-4 ${
              isDeveloper ? 'text-green-400 neon-text' : 'text-gray-900'
            }`}>
              Get In Touch
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDeveloper ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Ready to bring your ideas to life? Let's discuss your next project!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className={`p-8 rounded-xl ${
                isDeveloper 
                  ? 'glass-dark border-green-500/30' 
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}>
                <h2 className={`text-2xl font-bold mb-6 ${
                  isDeveloper ? 'text-green-400' : 'text-gray-900'
                }`}>
                  {isDeveloper ? '// Contact Info' : 'Contact Information'}
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${
                      isDeveloper ? 'bg-green-400/20 text-green-400' : 'bg-blue-50 text-blue-600'
                    }`}>
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className={`font-medium ${
                        isDeveloper ? 'text-green-400' : 'text-gray-900'
                      }`}>
                        Email
                      </div>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className={`${
                          isDeveloper ? 'text-gray-300 hover:text-green-300' : 'text-gray-600 hover:text-blue-600'
                        } transition-colors duration-200`}
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  {personalInfo.phone && (
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        isDeveloper ? 'bg-green-400/20 text-green-400' : 'bg-blue-50 text-blue-600'
                      }`}>
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <div className={`font-medium ${
                          isDeveloper ? 'text-green-400' : 'text-gray-900'
                        }`}>
                          Phone
                        </div>
                        <span className={`${
                          isDeveloper ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {personalInfo.phone}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${
                      isDeveloper ? 'bg-green-400/20 text-green-400' : 'bg-blue-50 text-blue-600'
                    }`}>
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className={`font-medium ${
                        isDeveloper ? 'text-green-400' : 'text-gray-900'
                      }`}>
                        Location
                      </div>
                      <span className={`${
                        isDeveloper ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Jabalpur(M.P.), India
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-8 rounded-xl ${
                isDeveloper 
                  ? 'glass-dark border-green-500/30' 
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}>
                <h3 className={`text-xl font-bold mb-6 ${
                  isDeveloper ? 'text-green-400' : 'text-gray-900'
                }`}>
                  {isDeveloper ? '// Follow Me' : 'Connect With Me'}
                </h3>
                
                <div className="grid grid-cols-1 gap-3">
                  {personalInfo.socials.slice(0, 3).map((social) => {
                    const IconComponent = socialIcons[social.platform as keyof typeof socialIcons];
                    return (
                      <motion.a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-3 p-4 rounded-lg transition-all duration-200 ${
                          isDeveloper
                            ? 'bg-gray-800/50 hover:bg-green-400/10 text-gray-300 hover:text-green-400 border border-gray-700 hover:border-green-400/30'
                            : 'bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-200'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {IconComponent && <IconComponent className="h-5 w-5" />}
                        <div>
                          <div className="font-medium">{social.platform}</div>
                          <div className={`text-xs ${
                            isDeveloper ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            Follow me on {social.platform}
                          </div>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              <div className="text-center">
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isDeveloper
                      ? 'bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Download className="h-5 w-5" />
                  <span>Download Resume</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className={`p-8 rounded-xl ${
                isDeveloper 
                  ? 'glass-dark border-green-500/30' 
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}>
                <h2 className={`text-2xl font-bold mb-6 ${
                  isDeveloper ? 'text-green-400' : 'text-gray-900'
                }`}>
                  {isDeveloper ? '// Send Message' : 'Send a Message'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label 
                        htmlFor="name" 
                        className={`block text-sm font-medium mb-2 ${
                          isDeveloper ? 'text-green-400' : 'text-gray-700'
                        }`}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                          isDeveloper
                            ? 'bg-gray-800/50 border-gray-600 text-green-400 placeholder-gray-400 focus:border-green-400 focus:ring-1 focus:ring-green-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                        }`}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="email" 
                        className={`block text-sm font-medium mb-2 ${
                          isDeveloper ? 'text-green-400' : 'text-gray-700'
                        }`}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                          isDeveloper
                            ? 'bg-gray-800/50 border-gray-600 text-green-400 placeholder-gray-400 focus:border-green-400 focus:ring-1 focus:ring-green-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                        }`}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="subject" 
                      className={`block text-sm font-medium mb-2 ${
                        isDeveloper ? 'text-green-400' : 'text-gray-700'
                      }`}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                        isDeveloper
                          ? 'bg-gray-800/50 border-gray-600 text-green-400 placeholder-gray-400 focus:border-green-400 focus:ring-1 focus:ring-green-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                      }`}
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="message" 
                      className={`block text-sm font-medium mb-2 ${
                        isDeveloper ? 'text-green-400' : 'text-gray-700'
                      }`}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 resize-none ${
                        isDeveloper
                          ? 'bg-gray-800/50 border-gray-600 text-green-400 placeholder-gray-400 focus:border-green-400 focus:ring-1 focus:ring-green-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                      }`}
                      placeholder="Tell me about your project or idea..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isDeveloper
                        ? 'bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30 disabled:opacity-50'
                        : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'
                    }`}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>

          <motion.div
            className={`mt-12 rounded-xl overflow-hidden ${
              isDeveloper ? 'border-2 border-green-500/30' : 'border border-gray-200'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Map 
              isDeveloper={isDeveloper}
              location="Jabalpur- 482001"
              coordinates={[23.1676, 79.9331]} // MGM School coordinates
              zoom={16} // Close zoom level
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}