import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Marquee from 'react-fast-marquee';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3,
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

  const frontendSkills = [
    {
      name: 'JavaScript',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    },
    {
      name: 'React',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    },
    {
      name: 'Tailwind CSS',
      logo: 'https://img.icons8.com/?size=100&id=x7XMNGh2vdqA&format=png&color=000000',
    },
    {
      name: 'HTML5',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    },
    {
      name: 'CSS3',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    },
  ];

  const backendSkills = [
    {
      name: 'Node.js',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    },
    {
      name: 'Express.js',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    },
    {
      name: 'MongoDB',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    },
    {
      name: 'Firebase',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    },
    {
      name: 'Python',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    },
    {
      name: 'SQL',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    },
  ];

  return (
    <section
      className='w-full flex justify-center px-4 sm:px-8 md:px-10 lg:px-40 py-16 overflow-hidden'
      id='skills'
      ref={ref}
    >
      <div className='layout-content-container flex flex-col max-w-[960px] flex-1 overflow-hidden'>
        <motion.h2
          className='text-white text-[28px] font-bold leading-tight tracking-[-0.015em] px-4 pb-8 pt-5 text-center'
          variants={itemVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          Technical Expertise
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Frontend Skills Row */}
          <motion.div className='mb-6' variants={itemVariants}>
            <h3 className='text-white text-lg font-semibold mb-4 text-center'>
              Frontend Development
            </h3>
            <div className='w-full overflow-hidden mb-2'>
              <Marquee
                gradient={true}
                gradientColor='#020617'
                gradientWidth={100}
                speed={50}
                pauseOnHover={true}
                className='py-4'
              >
                {frontendSkills.map((skill, index) => (
                  <div
                    key={index}
                    className='flex flex-col items-center justify-center mx-6 p-4 rounded-xl border border-slate-800/30 bg-slate-900/50 shadow-lg shadow-slate-900/20 hover:border-blue-500/30 hover:shadow-blue-500/10 hover:shadow-xl transition-all duration-300 group min-w-[100px] hover:scale-110'
                  >
                    <div className='w-12 h-12 mb-3 flex items-center justify-center'>
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className='w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300'
                      />
                    </div>
                    <h3 className='text-white text-xs font-semibold text-center group-hover:text-blue-400 transition-colors duration-300'>
                      {skill.name}
                    </h3>
                  </div>
                ))}
              </Marquee>
            </div>
          </motion.div>

          {/* Backend Skills Row */}
          <motion.div variants={itemVariants}>
            <h3 className='text-white text-lg font-semibold mb-4 text-center'>
              Backend Development
            </h3>
            <div className='w-full overflow-hidden'>
              <Marquee
                gradient={true}
                gradientColor='#020617'
                gradientWidth={100}
                speed={40}
                direction='right'
                pauseOnHover={true}
                className='py-4'
              >
                {backendSkills.map((skill, index) => (
                  <div
                    key={index}
                    className='flex flex-col items-center justify-center mx-6 p-4 rounded-xl border border-slate-800/30 bg-slate-900/50 shadow-lg shadow-slate-900/20 hover:border-blue-500/30 hover:shadow-blue-500/10 hover:shadow-xl transition-all duration-300 group min-w-[100px] hover:scale-110'
                  >
                    <div className='w-12 h-12 mb-3 flex items-center justify-center'>
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className='w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300'
                      />
                    </div>
                    <h3 className='text-white text-xs font-semibold text-center group-hover:text-blue-400 transition-colors duration-300'>
                      {skill.name}
                    </h3>
                  </div>
                ))}
              </Marquee>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
