import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import ParticleBackground from './ParticleBackground';

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
              className='flex min-h-[560px] flex-col gap-6 @[480px]:gap-8 @[480px]:rounded-2xl items-center justify-center p-8 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800/30'
              variants={containerVariants}
              initial='hidden'
              animate='visible'
            >
              {/* Particle Background */}
              <ParticleBackground />

              {/* Content overlay */}
              <div className='absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/60 to-slate-950/80 z-0'></div>
              <motion.div
                className='flex flex-col gap-4 text-center max-w-[700px] z-20 relative'
                variants={itemVariants}
              >
                <motion.h1
                  className='text-white text-5xl md:text-6xl font-black leading-tight tracking-[-0.033em]'
                  variants={itemVariants}
                >
                  Hi, I'm{' '}
                  <span className='text-blue-400'>Yousuf Mohammad Amin</span>
                </motion.h1>
                <motion.div
                  className='text-gray-300 text-lg md:text-xl font-medium leading-relaxed'
                  variants={itemVariants}
                >
                  <div className='mb-2'>
                    <span className='text-blue-400 font-semibold'>
                      MERN Stack Developer
                    </span>
                  </div>
                  <div className='text-base md:text-lg text-gray-400 mb-3'>
                    (<span className='text-blue-300'>React</span> •{' '}
                    <span className='text-green-400'>Node</span> •{' '}
                    <span className='text-emerald-400'>MongoDB</span>) building
                    production-style webapps
                  </div>
                  <div className='text-base text-gray-300'>
                    I ship{' '}
                    <span className='text-blue-300 font-medium'>clean UI</span>,{' '}
                    <span className='text-green-400 font-medium'>
                      secure auth
                    </span>
                    , and{' '}
                    <span className='text-purple-400 font-medium'>
                      well-documented APIs
                    </span>
                    .
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                className='flex flex-wrap gap-4 justify-center z-20 relative mt-4'
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
                className='flex gap-4 justify-center z-20 relative mt-2'
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
                  <FaGithub />
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
                  <FaLinkedinIn />
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
