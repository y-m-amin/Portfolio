import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import krishiImg from '../assets/krishilink.png'
import passtimeImg from '../assets/passTimeGames.png'
import styledecorimg from '../assets/styleDecor.png'

const Projects = () => {
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const projects = [
    {
      title: 'KrishiLink',
      description:
        'A modern web application that connects farmers, traders, and consumers in one digital space — empowering collaboration and transparency across the agricultural sector.Built with React Router, TailwindCSS, and Firebase Authentication, KrishiLink provides a smooth, secure, and community-driven experience for agricultural networking.',
      image:
        krishiImg,
      technologies: ['React', 'Firebase', 'Node.js', 'MongoDB'],
      live_link: 'https://krishilink-e2675.web.app/',
    },
    {
      title: 'Style Decor',
      description:
        'StyleDecor is a complete appointment and service management platform for a local decoration company offering both in-studio consultations and on-site decoration services for homes, weddings, offices, and events.',
      image:styledecorimg,
        technologies: ['React', 'Firebase', 'Node.js', 'MongoDB'],
      live_link: 'https://style-decor-ceb45.web.app/',
    },
    {
      title: 'Pass Time Games',
      description:
        'A small collection of fun passtime games built with Phaser.js.This project acts as a simple launcher page linking to multiple mini-games such as Bug Invaders, Pong, Mole Unearther, Bug Dodger, and Cube Matcher.',
      image:passtimeImg,
        technologies: ['Phaser.js', 'Javascript'],
      live_link: 'https://phaser-games-collection.vercel.app/',
    },
  ];

  const handleProjectClick = (liveLink) => {
    window.open(liveLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      className='w-full flex justify-center px-4 sm:px-8 md:px-10 lg:px-40 py-16'
      id='projects'
      ref={ref}
    >
      <div className='layout-content-container flex flex-col max-w-[960px] flex-1'>
        <motion.h2
          className='text-white text-[28px] font-bold leading-tight tracking-[-0.015em] px-4 pb-8 pt-5 text-center'
          variants={itemVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          Featured Projects
        </motion.h2>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4'
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className='group flex flex-col rounded-xl overflow-hidden border border-slate-800/30 bg-slate-900/50 shadow-lg shadow-slate-900/20 hover:border-blue-500/30 hover:shadow-blue-500/10 hover:shadow-xl transition-all duration-300 cursor-pointer'
              variants={cardVariants}
              whileHover={{
                scale: 1.01,
                y: -5,
                transition: { duration: 0.2 },
              }}
              onClick={() => handleProjectClick(project.live_link)}
            >
              <div
                className='h-48 w-full bg-cover bg-center relative overflow-hidden'
                style={{
                  backgroundImage: `url('${project.image}')`,
                }}
              >
                <div className='absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0'>
                  <div className='w-8 h-8 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-400/30'>
                    <span className='material-symbols-outlined text-blue-400 text-sm'>
                      arrow_outward
                    </span>
                  </div>
                </div>
              </div>

              <div className='flex flex-col p-5 gap-3 flex-1'>
                <div className='flex justify-between items-start'>
                  <h3 className='text-white text-xl font-bold group-hover:text-blue-400 transition-colors duration-300'>
                    {project.title}
                  </h3>
                </div>

                <p className='text-gray-400 text-sm line-clamp-3 leading-relaxed'>
                  {project.description}
                </p>

                <div className='flex gap-2 flex-wrap mt-auto pt-2'>
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className='px-2 py-1 rounded text-xs font-medium bg-slate-800/50 text-gray-300 border border-slate-700/30 group-hover:border-blue-500/20 group-hover:text-blue-300 transition-all duration-300'
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className='mt-3 pt-3 border-t border-slate-800/30'>
                  <div className='flex items-center gap-2 text-sm text-gray-400 group-hover:text-blue-400 transition-colors duration-300'>
                    <span className='material-symbols-outlined text-sm'>
                      launch
                    </span>
                    <span>View Live Project</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
