import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add your form submission logic here
  };

  return (
    <section
      className='w-full flex justify-center px-4 sm:px-8 md:px-10 lg:px-40 py-12 mb-12'
      id='contact'
    >
      <div className='layout-content-container flex flex-col max-w-[960px] flex-1'>
        <div className='flex flex-col md:flex-row gap-8 bg-surface-dark border border-border-light rounded-2xl p-6 md:p-10 overflow-hidden'>
          {/* Contact Info */}
          <div className='flex-1 flex flex-col gap-6'>
            <div>
              <h2 className='text-white text-3xl font-bold leading-tight mb-2'>
                Let's work together
              </h2>
              <p className='text-gray-400 text-base'>
                Have a project in mind? I'm currently available for freelance
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
            </div>
            <div className='mt-auto'>
              <h3 className='text-white text-sm font-bold uppercase tracking-wider mb-3 text-opacity-80'>
                Connect
              </h3>
              <div className='flex gap-3'>
                <a
                  className='w-10 h-10 flex items-center justify-center rounded-lg border border-border-light hover:bg-[#282e39] hover:text-white hover:border-primary transition-all text-gray-400'
                  href='#'
                >
                  <span className='material-symbols-outlined'>code</span>
                </a>
                <a
                  className='w-10 h-10 flex items-center justify-center rounded-lg border border-border-light hover:bg-[#282e39] hover:text-white hover:border-primary transition-all text-gray-400'
                  href='#'
                >
                  <span className='material-symbols-outlined'>work</span>
                </a>
                <a
                  className='w-10 h-10 flex items-center justify-center rounded-lg border border-border-light hover:bg-[#282e39] hover:text-white hover:border-primary transition-all text-gray-400'
                  href='#'
                >
                  <span className='material-symbols-outlined'>
                    alternate_email
                  </span>
                </a>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div className='flex-1 bg-[#111318] p-6 rounded-xl border border-border-light/50'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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
                  placeholder='John Doe'
                  type='text'
                  value={formData.name}
                  onChange={handleChange}
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
                  placeholder='john@example.com'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
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
                  placeholder='Tell me about your project...'
                  rows='4'
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                className='mt-2 w-full h-11 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2'
                type='submit'
              >
                <span>Send Message</span>
                <span className='material-symbols-outlined text-sm'>send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
