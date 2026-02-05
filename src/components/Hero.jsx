import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section
      className='w-full flex justify-center px-4 sm:px-8 md:px-10 lg:px-40 py-12 md:py-20'
      id='home'
    >
      <div className='layout-content-container flex flex-col max-w-[960px] flex-1'>
        <div className='@container'>
          <div className='@[480px]:p-4'>
            <motion.div
              className='flex min-h-[560px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-2xl items-center justify-center p-8 relative overflow-hidden'
              style={{
                backgroundImage: `linear-gradient(
                  rgba(2, 6, 23, 0.7) 0%,
                  rgba(2, 6, 23, 0.9) 100%
                ),
                url('https://lh3.googleusercontent.com/aida-public/AB6AXuAc3jX0XIDwWpT-XMyX8ghquQbVqhTLDYinaBlr8ywqyHtUZInstaJd5hEadum2MQLQaS_W-Xtfa8-xErUAKd_LeIOmmgIhGtV93-osYtMvBPO4WT2YpifGdFFJQrvao-vavNzOM5jZFAeyVNrOdIPfuJkyk4cUmlfpc9qRGF5yuy0eJluDGN_XW-GIpvvKVfKL4v8zJJRR8ICiaX7cXV0kmtCfSxC1kZ3xjxE8wNvky-R5njmhNNaulQYxaeuZ7gKnvjPTnYiPfJsi')`,
              }}
              variants={containerVariants}
              initial='hidden'
              animate='visible'
            >
              <motion.div
                className='flex flex-col gap-4 text-center max-w-[700px] z-10'
                variants={itemVariants}
              >
                <motion.h1
                  className='text-white text-5xl md:text-6xl font-black leading-tight tracking-[-0.033em]'
                  variants={itemVariants}
                >
                  Building Digital Experiences
                </motion.h1>
                <motion.h2
                  className='text-gray-300 text-lg font-normal leading-relaxed'
                  variants={itemVariants}
                >
                  Hi, I'm Yousuf. I build accessible, pixel-perfect web
                  applications focused on performance and modern user
                  experiences.
                </motion.h2>
              </motion.div>
              <motion.div
                className='flex flex-wrap gap-4 justify-center z-10 mt-4'
                variants={itemVariants}
              >
                <motion.a
                  className='flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-blue-600 transition-all text-white text-base font-bold shadow-lg shadow-blue-900/20'
                  href='#projects'
                  variants={buttonVariants}
                  whileHover='hover'
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.a>
                <motion.a
                  className='flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-slate-800 border border-slate-700/50 hover:bg-slate-700 hover:shadow-lg hover:shadow-slate-600/20 transition-all text-white text-base font-bold'
                  href='#contact'
                  variants={buttonVariants}
                  whileHover='hover'
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className='flex gap-4 justify-center z-10 mt-2'
                variants={itemVariants}
              >
                <motion.a
                  className='w-12 h-12 flex items-center justify-center rounded-lg border border-slate-700/50 bg-slate-800/50 hover:bg-slate-700/50 hover:border-blue-500/30 transition-all text-gray-400 hover:text-white'
                  href='https://github.com/y-m-amin'
                  target='_blank'
                  rel='noopener noreferrer'
                  variants={buttonVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className='w-5 h-5' />
                </motion.a>
                <motion.a
                  className='w-12 h-12 flex items-center justify-center rounded-lg border border-slate-700/50 bg-slate-800/50 hover:bg-slate-700/50 hover:border-blue-500/30 transition-all text-gray-400 hover:text-white'
                  href='https://www.linkedin.com/in/yousuf-mohammad-amin/'
                  target='_blank'
                  rel='noopener noreferrer'
                  variants={buttonVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedinIn className='w-5 h-5' />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
