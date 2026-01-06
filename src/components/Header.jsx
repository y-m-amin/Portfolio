const Header = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <header className='sticky top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/90 backdrop-blur-md'>
      <div className='layout-container flex justify-center px-4 sm:px-8 md:px-10 lg:px-40 py-3'>
        <div className='flex flex-1 items-center justify-between max-w-[960px]'>
          <div
            className='flex items-center gap-2 text-white cursor-pointer'
            onClick={scrollToTop}
          >
            <div className='flex items-center justify-center text-primary'>
              <span className='material-symbols-outlined text-[28px]'>
                terminal
              </span>
            </div>
            <h2 className='text-white text-lg font-bold leading-tight tracking-[-0.015em]'>
              YMA
            </h2>
          </div>
          <div className='flex flex-1 justify-end gap-8 items-center'>
            <div className='hidden md:flex items-center gap-8'>
              <a
                className='text-gray-300 hover:text-white text-sm font-medium leading-normal transition-colors'
                href='#home'
              >
                Home
              </a>
              <a
                className='text-gray-300 hover:text-white text-sm font-medium leading-normal transition-colors'
                href='#about'
              >
                About
              </a>
              <a
                className='text-gray-300 hover:text-white text-sm font-medium leading-normal transition-colors'
                href='#skills'
              >
                Skills
              </a>
              <a
                className='text-gray-300 hover:text-white text-sm font-medium leading-normal transition-colors'
                href='#experience'
              >
                Experience
              </a>
              <a
                className='text-gray-300 hover:text-white text-sm font-medium leading-normal transition-colors'
                href='#education'
              >
                Education
              </a>
              <a
                className='text-gray-300 hover:text-white text-sm font-medium leading-normal transition-colors'
                href='#projects'
              >
                Projects
              </a>
              <a
                className='text-gray-300 hover:text-white text-sm font-medium leading-normal transition-colors'
                href='#contact'
              >
                Contact
              </a>
            </div>
            <a
              className='flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary hover:bg-primary/90 transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em]'
              href='#contact'
            >
              <span className='truncate'>Download CV</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
