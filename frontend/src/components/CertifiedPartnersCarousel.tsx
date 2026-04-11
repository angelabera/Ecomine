'use client';

import { useState, useRef, useEffect } from 'react';

interface Partner {
  id: number;
  name: string;
  specialty: string;
  description: string;
  icon: string;
  recyclingCapacity: string;
}

const partners: Partner[] = [
  {
    id: 1,
    name: 'Aureum Gold Recovery',
    specialty: 'Gold Recycling',
    description: 'Leading gold extraction and recycling facility with state-of-the-art technology.',
    icon: '🏆',
    recyclingCapacity: '500 kg/month'
  },
  {
    id: 2,
    name: 'PrecisionMetals Corp',
    specialty: 'Gold Recycling',
    description: 'Specializes in high-purity gold recovery from electronic waste.',
    icon: '⚙️',
    recyclingCapacity: '750 kg/month'
  },
  {
    id: 3,
    name: 'GreenGold Solutions',
    specialty: 'Gold Recycling',
    description: 'Eco-friendly gold refining with zero-waste processes.',
    icon: '♻️',
    recyclingCapacity: '600 kg/month'
  },
  {
    id: 4,
    name: 'AuRefine Industries',
    specialty: 'Gold Recycling',
    description: 'ISO-certified gold recycling with transparent supply chains.',
    icon: '🔐',
    recyclingCapacity: '450 kg/month'
  },
  {
    id: 5,
    name: 'EcoAurum Global',
    specialty: 'Gold Recycling',
    description: 'Sustainable gold recovery supporting circular economy initiatives.',
    icon: '🌍',
    recyclingCapacity: '800 kg/month'
  },
  {
    id: 6,
    name: 'LumenGold Refinery',
    specialty: 'Gold Recycling',
    description: 'Advanced chemical processing for maximum gold extraction rates.',
    icon: '💎',
    recyclingCapacity: '550 kg/month'
  }
];

export default function CertifiedPartnersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, partners.length - itemsPerSlide);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const visiblePartners = partners.slice(currentIndex, currentIndex + itemsPerSlide);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Certified Partners
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Trusted gold recycling facilities verified and audited for quality and sustainability
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Cards Grid */}
          <div
            ref={carouselRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500"
          >
            {visiblePartners.map((partner) => (
              <div
                key={partner.id}
                className="group/card relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 border border-emerald-500/30 p-6 hover:border-emerald-500/80 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20"
              >
                {/* Background glow effect */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover/card:from-emerald-500/5 group-hover/card:to-emerald-500/10 transition-all duration-500"></div>

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <div className="text-4xl">{partner.icon}</div>

                  {/* Company Name */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover/card:text-emerald-300 transition-colors">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-emerald-400 font-semibold">
                      {partner.specialty}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-400 group-hover/card:text-neutral-300 transition-colors leading-relaxed">
                    {partner.description}
                  </p>

                  {/* Capacity Badge */}
                  <div className="pt-4 border-t border-emerald-500/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-500">Monthly Capacity</span>
                      <span className="text-sm font-bold text-emerald-400">
                        {partner.recyclingCapacity}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-700/50 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full"
                        style={{
                          width: `${65 + (partner.id * 7) % 25}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Certified Badge */}
                  <div className="pt-2 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50">
                      <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs font-semibold text-emerald-400">Verified</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/80 flex items-center justify-center text-emerald-400 hover:text-emerald-300 transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Previous partners"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/80 flex items-center justify-center text-emerald-400 hover:text-emerald-300 transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Next partners"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: Math.ceil(partners.length / itemsPerSlide) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(Math.min(index * itemsPerSlide, maxIndex))}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === Math.floor(currentIndex / Math.max(1, itemsPerSlide))
                  ? 'bg-emerald-400 w-8'
                  : 'bg-neutral-600 hover:bg-neutral-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
