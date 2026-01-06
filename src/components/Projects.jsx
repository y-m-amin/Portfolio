const Projects = () => {
  const projects = [
    {
      title: 'E-commerce Dashboard',
      description:
        'A comprehensive admin dashboard for online retailers. Features real-time sales tracking, inventory management, and customizable reporting widgets.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC8SQMbvV5WYNHebboL53SXe-LKgTvXEC9VP0s3zeTq4KidHtDPM5ApEWfPNDTp7QQQZbHV1iwa37CZF9KGLN4jto7x3CMUgEqzw_NpQI1lBAWJk_hdHejW8sLa0wsGfMRxJWIonPgqTgDNdC2TKv-9fNBGXDWSakvBGIPAxGDr6DEAfQP5308VX40LWRbN99EaLjED2Z0GbMJlDtdXDJ8GkEwSSZD40lxzDcDqLwbErKVXn1BQw-CKIt9BKE0D3KutOgCFfUnBNezT',
      technologies: ['React', 'Redux', 'Tailwind'],
    },
    {
      title: 'Finance Tracker',
      description:
        'Personal finance application with data visualization. Users can track expenses, set budgets, and view spending habits through interactive charts.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCMmK86nHn8ubSygs2T5ply7FCmrrwtzZbEWKKIOgRGai9xxj-CSw_Tj0k2U8rWPZmPin4vE7uYwXzStf3p_yhxpQDff_lCN1silagzdXmcrPPGpgRp0TIOvuQNJP714RQOWvBlNRRpSb8ypqIwGpAeX93erO4fP79UfTjOYK5eSBhX2T9TIuCnwDPMQpf4GP5hisnU5QrmSUo83FZH2F2L_CsewpdEdt4SU8qIppFfjiw4f6gT79v9LbdxkAeTf29uTMchKKRSXPyY',
      technologies: ['Vue.js', 'Firebase', 'D3.js'],
    },
    {
      title: 'SaaS Marketing Site',
      description:
        'High-performance landing page for a SaaS product. Optimized for SEO and conversions with fast load times and smooth animations.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAuBqm_200yBnzMbyhj2DKO_IZUZmoCUgtvuiaiI8LTub_MNw2r3zE4cgSjmWToW7_4T2-raK47pxAcairv7d52-4Htkg_QbC6f-deBb7wH_nemHQ2Egp6YPeEKCgGIeEeki3sVpuK0Tqo--J5ANSzeNPhlYHiwmCqHg95Uc53fVRGKdXrlxkU4NCtWYCTjoNtyJmt4tDJnQYtVTK-BfVhDVwahWhTy9WsMs054Y6T3929WXgN1MddwxKHCQMvvgS7WALQD3L2V_1_k',
      technologies: ['Next.js', 'Framer Motion', 'Vercel'],
    },
  ];

  return (
    <section
      className='w-full flex justify-center px-4 sm:px-8 md:px-10 lg:px-40 py-8'
      id='projects'
    >
      <div className='layout-content-container flex flex-col max-w-[960px] flex-1'>
        <h2 className='text-white text-[28px] font-bold leading-tight tracking-[-0.015em] px-4 pb-6 pt-5'>
          Featured Projects
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
          {projects.map((project, index) => (
            <div
              key={index}
              className='group flex flex-col rounded-xl overflow-hidden border border-border-light bg-surface-dark hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1'
            >
              <div
                className='h-48 w-full bg-cover bg-center'
                style={{
                  backgroundImage: `url('${project.image}')`,
                }}
              ></div>
              <div className='flex flex-col p-5 gap-3 flex-1'>
                <div className='flex justify-between items-start'>
                  <h3 className='text-white text-xl font-bold'>
                    {project.title}
                  </h3>
                  <span className='material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors'>
                    arrow_outward
                  </span>
                </div>
                <p className='text-gray-400 text-sm line-clamp-3'>
                  {project.description}
                </p>
                <div className='flex gap-2 flex-wrap mt-auto pt-2'>
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className='px-2 py-1 rounded text-xs font-medium bg-[#282e39] text-gray-300 border border-border-light'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
