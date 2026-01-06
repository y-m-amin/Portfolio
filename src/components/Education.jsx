import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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

  const education = [
    {
      institution: 'American International University-Bangladesh',
      degree: "Bachelor's degree",
      field: 'Electrical and Electronics Engineering',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/American_International_University-Bangladesh_logo.png/150px-American_International_University-Bangladesh_logo.png',
    },
  ];

  return (
    <section
      className='w-full flex justify-center px-4 sm:px-8 md:px-10 lg:px-40 py-16'
      id='education'
      ref={ref}
    >
      <div className='layout-content-container flex flex-col max-w-[960px] flex-1'>
        <motion.h2
          className='text-white text-[28px] font-bold leading-tight tracking-[-0.015em] px-4 pb-8 pt-5 text-center'
          variants={itemVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          Education
        </motion.h2>

        <motion.div
          className='flex flex-col gap-6 px-4'
          variants={itemVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className='bg-slate-900/50 border border-slate-800/30 rounded-xl p-6 shadow-lg shadow-slate-900/20 hover:border-blue-500/30 hover:shadow-blue-500/10 hover:shadow-xl transition-all duration-300'
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <div className='flex flex-col md:flex-row md:items-center gap-6'>
                <div className='shrink-0'>
                  <div className='w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 shadow-md'>
                    <img
                      src={edu.logo}
                      alt={edu.institution}
                      className='w-full h-full object-contain'
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className='w-full h-full bg-primary/20 rounded flex items-center justify-center hidden'>
                      <span className='text-primary font-bold text-lg'>
                        {edu.institution
                          .split(' ')
                          .map((word) => word[0])
                          .join('')
                          .slice(0, 3)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='flex-1'>
                  <h3 className='text-white text-xl font-semibold mb-2'>
                    {edu.institution}
                  </h3>
                  <h4 className='text-primary text-lg font-medium mb-1'>
                    {edu.degree}
                  </h4>
                  <p className='text-gray-400 text-base'>{edu.field}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
