function Footer() {
  return (
    <footer className="bg-[#FFF9FB] text-[#1F1F1F] pt-10 pb-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between pb-8 border-b border-[rgba(0,0,0,0.06)]">
          <div className="mb-6 md:mb-0">
            <h3 className="font-bold text-xl mb-4">
              <span className="text-[#FF6F91]">Campus</span>
              <span>Crush</span>
              <span className="ml-1">💌</span>
            </h3>
            <p className="text-[#7B7B7B] max-w-xs">
              Connecting college students across campus. Find your campus crush
              today!
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6">
          <p className="text-[#7B7B7B] text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} CampusCrush. All rights reserved.
          </p>

          {/* socials Link */}
          <div className="flex space-x-4">
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
