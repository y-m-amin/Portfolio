import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      className='w-full flex justify-center px-4 sm:px-8 md:px-10 lg:px-40 py-16'
      id='about'
      ref={ref}
    >
      <div className='layout-content-container flex flex-col max-w-[960px] flex-1'>
        <motion.h2
          className='text-white text-[28px] font-bold leading-tight tracking-[-0.015em] px-4 pb-8 pt-5 text-center'
          variants={itemVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          About Me
        </motion.h2>

        <motion.div
          className='grid grid-cols-1 lg:grid-cols-2 gap-8 px-4'
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Programming Journey */}
          <motion.div
            className='bg-slate-900/50 border border-slate-800/30 rounded-xl p-6 shadow-lg shadow-slate-900/20 hover:border-blue-500/30 hover:shadow-blue-500/10 hover:shadow-xl transition-all duration-300'
            variants={cardVariants}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
          >
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center'>
                <span className='material-symbols-outlined text-primary text-lg'>
                  code
                </span>
              </div>
              <h3 className='text-white text-xl font-semibold'>
                Programming Journey
              </h3>
            </div>
            <p className='text-gray-300 leading-relaxed'>
              My programming journey began during my engineering studies, where
              I discovered the power of code to solve real-world problems.
              Starting with basic programming concepts, I gradually evolved into
              full-stack development, mastering both frontend and backend
              technologies. What started as curiosity has grown into a passion
              for creating innovative digital solutions that make a difference.
            </p>
          </motion.div>

          {/* Work I Enjoy */}
          <motion.div
            className='bg-slate-900/50 border border-slate-800/30 rounded-xl p-6 shadow-lg shadow-slate-900/20 hover:border-blue-500/30 hover:shadow-blue-500/10 hover:shadow-xl transition-all duration-300'
            variants={cardVariants}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
          >
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center'>
                <span className='material-symbols-outlined text-primary text-lg'>
                  work
                </span>
              </div>
              <h3 className='text-white text-xl font-semibold'>Work I Enjoy</h3>
            </div>
            <p className='text-gray-300 leading-relaxed'>
              I thrive on building user-centric applications that combine
              beautiful design with robust functionality. My sweet spot is
              full-stack development where I can craft seamless user experiences
              on the frontend while architecting scalable backend systems. I
              particularly enjoy tackling complex problems and turning
              innovative ideas into reality through clean, efficient code.
            </p>
          </motion.div>
        </motion.div>

        {/* Hobbies & Interests */}
        <motion.div
          className='mt-8 px-4'
          variants={itemVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div
            className='bg-slate-900/50 border border-slate-800/30 rounded-xl p-6 shadow-lg shadow-slate-900/20 hover:border-blue-500/30 hover:shadow-blue-500/10 hover:shadow-xl transition-all duration-300'
            variants={cardVariants}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
          >
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center'>
                <span className='material-symbols-outlined text-primary text-lg'>
                  interests
                </span>
              </div>
              <h3 className='text-white text-xl font-semibold'>
                Beyond Programming
              </h3>
            </div>

            <motion.div
              className='grid grid-cols-1 md:grid-cols-2 gap-6'
              variants={containerVariants}
            >
              {/* Reading */}
              <motion.div
                className='flex items-start gap-4'
                variants={itemVariants}
              >
                <div className='w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0'>
                  <span className='material-symbols-outlined text-blue-400 text-xl'>
                    menu_book
                  </span>
                </div>
                <div>
                  <h4 className='text-white font-semibold mb-2'>Reading</h4>
                  <p className='text-gray-400 text-sm leading-relaxed'>
                    I'm an avid reader who enjoys diving into light novels,
                    exploring different worlds and narratives. Reading helps me
                    unwind and often sparks creative ideas for my projects.
                  </p>
                </div>
              </motion.div>

              {/* Gaming */}
              <motion.div
                className='flex items-start gap-4'
                variants={itemVariants}
              >
                <div className='w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center shrink-0'>
                  <span className='material-symbols-outlined text-green-400 text-xl'>
                    sports_esports
                  </span>
                </div>
                <div>
                  <h4 className='text-white font-semibold mb-2'>Gaming</h4>
                  <p className='text-gray-400 text-sm leading-relaxed'>
                    Gaming is my go-to way to relax and challenge myself.
                    Whether it's strategy games that test my problem-solving
                    skills or immersive adventures, gaming keeps my mind sharp
                    and provides great inspiration for UI/UX design.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Personal Philosophy */}
        <motion.div
          className='mt-8 px-4'
          variants={itemVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div
            className='bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6 shadow-lg shadow-blue-900/20 hover:border-blue-400/40 hover:shadow-blue-400/20 hover:shadow-xl transition-all duration-300'
            variants={cardVariants}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
          >
            <div className='text-center'>
              <h3 className='text-white text-lg font-semibold mb-3'>
                My Philosophy
              </h3>
              <p className='text-gray-300 leading-relaxed max-w-2xl mx-auto'>
                "Great software is born from the intersection of technical
                excellence and human empathy. I believe in writing code that not
                only works flawlessly but also creates meaningful experiences
                for users."
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
