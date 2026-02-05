const Footer = () => {
  return (
    <footer className='w-full border-t border-border-dark bg-[#111318] py-8'>
      <div className='layout-container flex justify-center px-4 sm:px-8 md:px-10 lg:px-40'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 max-w-[960px] flex-1'>
          <div className='flex items-center gap-2 text-white'>
            <span className='material-symbols-outlined text-primary'>
              terminal
            </span>
            <span className='font-bold'>DevPortfolio</span>
          </div>
          <p className='text-gray-500 text-sm text-center md:text-right'>
            © 2025 Yousuf Mohammad Amin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
