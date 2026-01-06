import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Experience = () => {
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const experiences = [
    {
      company: 'E LAB | shaping idea into reality',
      position: 'Product Design Engineer',
      type: 'Full-time',
      duration: 'Jul 2025 - Present · 7 mos',
      location: 'Dhaka, Bangladesh',
      workType: 'On-site',
      skills: ['Product Design', 'Product Design Support', '+3 skills'],
      current: true,
    },
    {
      company: 'E LAB | shaping idea into reality',
      position: 'Jr. Product Design Engineer',
      type: 'Full-time',
      duration: 'Jan 2022 - Jun 2025 · 3 yrs 6 mos',
      location: 'Dhaka, Bangladesh',
      workType: 'On-site',
      skills: ['Blender', 'SolidWorks', '+2 skills'],
      current: false,
    },
    {
      company: 'E LAB | shaping idea into reality',
      position: 'Product Design Engineer',
      type: 'Internship',
      duration: 'Oct 2021 - Dec 2021 · 3 mos',
      location: 'Dhaka, Bangladesh',
      workType: 'On-site',
      skills: ['SolidWorks', 'Blender'],
      current: false,
    },
  ];

  return (
    <section
      className='w-full flex justify-center px-4 sm:px-8 md:px-10 lg:px-40 py-16'
      id='experience'
      ref={ref}
    >
      <div className='layout-content-container flex flex-col max-w-[960px] flex-1'>
        <motion.h2
          className='text-white text-[28px] font-bold leading-tight tracking-[-0.015em] px-4 pb-8 pt-5 text-center'
          variants={itemVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          Experience
        </motion.h2>

        <motion.div
          className='flex flex-col gap-6 px-4'
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className='bg-slate-900/50 border border-slate-800/30 rounded-xl p-6 shadow-lg shadow-slate-900/20 hover:border-blue-500/30 hover:shadow-blue-500/10 hover:shadow-xl transition-all duration-300'
              variants={itemVariants}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4'>
                <div className='flex-1'>
                  <h3 className='text-white text-xl font-semibold mb-2'>
                    {exp.position}
                  </h3>
                  <h4 className='text-primary text-lg font-medium mb-2'>
                    {exp.company}
                  </h4>
                  <div className='flex flex-wrap gap-2 mb-3'>
                    <span className='text-gray-300 text-sm bg-slate-800/50 border border-slate-700/30 px-2 py-1 rounded'>
                      {exp.type}
                    </span>
                    <span className='text-gray-300 text-sm bg-slate-800/50 border border-slate-700/30 px-2 py-1 rounded'>
                      {exp.workType}
                    </span>
                    {exp.current && (
                      <span className='text-green-400 text-sm bg-green-900/30 border border-green-700/30 px-2 py-1 rounded'>
                        Current
                      </span>
                    )}
                  </div>
                  <p className='text-gray-400 text-sm mb-2'>{exp.duration}</p>
                  <p className='text-gray-400 text-sm mb-3'>{exp.location}</p>
                  <div className='flex flex-wrap gap-2'>
                    {exp.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className='text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20'
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className='text-center mt-8 px-4'
          variants={itemVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          <p className='text-gray-400 text-sm'>
            Total Experience:{' '}
            <span className='text-primary font-semibold'>4 yrs 4 mos</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
