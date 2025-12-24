function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-center items-center">
        {/* Left */}
        <p className="text-sm text-slate-300">
          © {new Date().getFullYear()} CRM App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
