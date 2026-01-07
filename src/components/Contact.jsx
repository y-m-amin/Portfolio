import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { FaWhatsapp, FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';
import BouncyDupesR3F from './BouncyDupesR3F';

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const replyTemplateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_REPLY_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    try {
      // 1) Send email to you
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);

      // 2) Auto reply to the sender (if reply template configured)
      if (replyTemplateId) {
        await emailjs.sendForm(
          serviceId,
          replyTemplateId,
          formRef.current,
          publicKey
        );
      }

      // Reset form
      setFormData({ name: '', email: '', message: '' });

      // Dark SweetAlert success
      Swal.fire({
        title: 'Message sent!',
        text: "Thanks for reaching out. I'll get back to you soon.",
        icon: 'success',
        background: '#020617', // dark slate
        color: '#e5e7eb', // gray-200
        confirmButtonColor: '#2563eb', // primary-ish blue
      });
    } catch (error) {
      console.error('EmailJS Error:', error);

      // Dark SweetAlert error
      Swal.fire({
        title: 'Oops...',
        text: 'Something went wrong while sending your message. Please try again.',
        icon: 'error',
        background: '#020617',
        color: '#e5e7eb',
        confirmButtonColor: '#ef4444',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className='w-full flex gap-5 justify-center px-4 sm:px-8 md:px-10 lg:px-40 py-12 mb-12 '
      id='contact'
    >
      <div className='layout-content-container flex flex-col max-w-240 flex-2'>
        <div className='flex flex-col md:flex-row gap-8 bg-surface-dark border border-border-light rounded-2xl p-6 md:p-10 overflow-hidden'>
          {/* Contact Info */}
          <div className='flex-1 flex flex-col gap-6'>
            <div>
              <h2 className='text-white text-3xl font-bold leading-tight mb-2'>
                Let&apos;s work together
              </h2>
              <p className='text-gray-400 text-base'>
                Have a project in mind? I&apos;m currently available for freelance
                work and open to full-time opportunities.
              </p>
            </div>
            <div className='flex flex-col gap-4 mt-4'>
              <div className='flex items-center gap-3 text-gray-300'>
                <div className='flex items-center justify-center w-10 h-10 rounded-full bg-[#282e39] text-primary'>
                  <span className='material-symbols-outlined'>mail</span>
                </div>
                <span>yousuf.amin8818@gmail.com</span>
              </div>
              <div className='flex items-center gap-3 text-gray-300'>
                <div className='flex items-center justify-center w-10 h-10 rounded-full bg-[#282e39] text-primary'>
                  <span className='material-symbols-outlined'>location_on</span>
                </div>
                <span>Dhaka, Bangladesh</span>
              </div>
              {/* WhatsApp fixed (proper icon) */}
              <div className='flex items-center gap-3 text-gray-300'>
                <div className='flex items-center justify-center w-10 h-10 rounded-full bg-[#282e39] text-[#25D366]'>
                  <FaWhatsapp className='w-5 h-5' />
                </div>
                <span>+880 1635 427 218</span>
              </div>
            </div>
            <div className='mt-auto'>
              <h3 className='text-white text-sm font-bold uppercase tracking-wider mb-3 text-opacity-80'>
                Connect
              </h3>
              <div className='flex gap-3'>
                {/* LinkedIn */}
                <a
                  className='w-10 h-10 flex items-center justify-center rounded-lg border border-border-light hover:bg-[#282e39] hover:text-white hover:border-primary transition-all text-gray-400'
                  href='https://www.linkedin.com/in/yousuf-mohammad-amin/'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FaLinkedinIn className='w-5 h-5' />
                </a>
                {/* Mail */}
                <a
                  className='w-10 h-10 flex items-center justify-center rounded-lg border border-border-light hover:bg-[#282e39] hover:text-white hover:border-primary transition-all text-gray-400'
                  href='mailto:yousuf.amin8818@gmail.com'
                >
                  <FaEnvelope className='w-5 h-5' />
                </a>
                {/* GitHub */}
                <a
                  className='w-10 h-10 flex items-center justify-center rounded-lg border border-border-light hover:bg-[#282e39] hover:text-white hover:border-primary transition-all text-gray-400'
                  href='https://github.com/y-m-amin'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FaGithub className='w-5 h-5' />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form (EmailJS) */}
          <div className='flex-1 bg-[#111318] p-6 rounded-xl border border-border-light/50'>
            <form
              ref={formRef}
              className='flex flex-col gap-4'
              onSubmit={handleSubmit}
            >
              <div className='flex flex-col gap-1'>
                <label
                  className='text-sm font-medium text-gray-300'
                  htmlFor='name'
                >
                  Name
                </label>
                <input
                  className='w-full h-11 rounded-lg bg-surface-dark border border-border-light px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
                  id='name'
                  name='name'
                  placeholder='John Doe'
                  type='text'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label
                  className='text-sm font-medium text-gray-300'
                  htmlFor='email'
                >
                  Email
                </label>
                <input
                  className='w-full h-11 rounded-lg bg-surface-dark border border-border-light px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
                  id='email'
                  name='email'
                  placeholder='john@example.com'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label
                  className='text-sm font-medium text-gray-300'
                  htmlFor='message'
                >
                  Message
                </label>
                <textarea
                  className='w-full rounded-lg bg-surface-dark border border-border-light p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none'
                  id='message'
                  name='message'
                  placeholder='Tell me about your project...'
                  rows='4'
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button
                className='mt-2 w-full h-11 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed'
                type='submit'
                disabled={loading}
              >
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
                <span className='material-symbols-outlined text-sm'>send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className='layout-content-container flex flex-col max-w-240 flex-1'>
        <BouncyDupesR3F />
      </div>
    </section>
  );
};

export default Contact;
