'use client';

import { useEffect, useState } from 'react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // ✳️ IMPORTANT: international format, digits only (country code + number), no plus.
  const whatsappNumber = '9801255090';

  const messagePlain =
    'Welcome to Sandiya Human Resources pvt ltd. Thanks for connecting with us.\n\nHow may we help you?';
  const message = encodeURIComponent(messagePlain);

  // Two possible safe formats:
  const waMeLink = `https://wa.me/${whatsappNumber}?text=${message}`;
  const apiLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;

  // Toggle which one to use if you want to try the fallback
  const useApiFallback = false;
  const whatsappLink = useApiFallback ? apiLink : waMeLink;

  if (!isVisible) return null;

  return (
    <>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-40 group"
        aria-label="Chat with us on WhatsApp"
      >
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-pulse opacity-75 group-hover:opacity-50 transition"></div>

        <div className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 transition duration-300 hover:-translate-y-1">
          {/* WhatsApp SVG (visual only) */}
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="false" role="img">
            <path d="M20.52 3.478C18.237 1.195 15.22 0 12 0 5.373 0 0 5.373 0 12c0 2.178.57 4.17 1.634 5.969L0 24l6.262-1.628A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12 0-3.22-1.195-6.237-3.48-8.522zM17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          </svg>
        </div>

        <div className="absolute bottom-20 right-0 bg-gray-900 text-white text-sm font-semibold px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap pointer-events-none">
          Chat with us on WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
        </div>
      </a>

      <style jsx>{`
        @media (max-width: 640px) {
          a {
            bottom: 6rem !important;
            right: 1rem !important;
          }
        }
      `}</style>
    </>
  );
}
