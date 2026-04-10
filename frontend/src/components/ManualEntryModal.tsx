'use client';

import { useState } from 'react';

interface ManualEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (result: any) => void;
}

export default function ManualEntryModal({ isOpen, onClose, onSubmit }: ManualEntryModalProps) {
  const [step, setStep] = useState(1);
  const [brandName, setBrandName] = useState('');
  const [modelNo, setModelNo] = useState('');
  const [weight, setWeight] = useState('');
  const [ram, setRam] = useState('');
  const [rom, setRom] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const ramOptions = ['2GB', '3GB', '4GB', '6GB', '8GB', '12GB', '16GB'];
  const romOptions = ['32GB', '64GB', '128GB', '256GB', '512GB', '1TB'];

  const handleNext = () => {
    if (step === 1 && brandName.trim()) {
      setStep(2);
    } else if (step === 2 && modelNo.trim()) {
      setStep(3);
    } else if (step === 3 && weight.trim()) {
      setStep(4);
    } else if (step === 4) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call and generate mock results
    setTimeout(() => {
      // Generate realistic material data based on device type
      const mockResult = {
        device_model: `${brandName} ${modelNo}`,
        specs: {
          weight: `${weight}g`,
          ram: ram,
          rom: rom
        },
        materials: {
          "Gold (g)": (Math.random() * 0.08 + 0.02).toFixed(3),
          "Copper (g)": (Math.random() * 18 + 8).toFixed(2),
          "Lithium (g)": (Math.random() * 4 + 2).toFixed(2)
        },
        eco_reward: (Math.random() * 12 + 4).toFixed(2),
        confidence: (Math.random() * 15 + 85).toFixed(1),
        entry_method: "manual"
      };

      setIsLoading(false);
      
      // Call parent's onSubmit handler if provided
      if (onSubmit) {
        onSubmit(mockResult);
      }
      
      resetForm();
      onClose();
    }, 1500);
  };

  const resetForm = () => {
    setStep(1);
    setBrandName('');
    setModelNo('');
    setWeight('');
    setRam('');
    setRom('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-8 border-b border-neutral-800">
          <h2 className="text-3xl font-bold text-white mb-2">
            Enter Device Details
          </h2>
          <p className="text-neutral-400">
            {step === 1
              ? 'What brand is your device?'
              : step === 2
              ? 'What is the model number?'
              : step === 3
              ? 'What is the device weight?'
              : 'Select RAM and ROM specifications'}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="px-8 pt-6 flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-1">
              <div
                className={`h-1 rounded-full transition-all duration-300 ${
                  i <= step
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500'
                    : 'bg-neutral-700'
                }`}
              ></div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Step 1: Brand Name */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-300">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                  placeholder="e.g., Apple, Samsung, Dell..."
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200"
                  autoFocus
                />
              </div>

              {/* Suggested brands */}
              <div className="space-y-2">
                <p className="text-xs text-neutral-500 uppercase tracking-wide">Popular Brands</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['Apple', 'Samsung', 'Xiaomi', 'OnePlus', 'Motorola', 'Google', 'Sony', 'LG', 'Nokia', 'Asus', 'Lenovo', 'OPPO', 'Vivo', 'Realme', 'POCO', 'Infinix', 'Tecno', 'iQOO', 'Honor', 'Nothing'].map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setBrandName(brand)}
                      className={`px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-medium ${
                        brandName === brand
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                          : 'bg-neutral-800/50 border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Model Number */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-300">
                  Model Number
                </label>
                <input
                  type="text"
                  value={modelNo}
                  onChange={(e) => setModelNo(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                  placeholder={`e.g., iPhone 14 Pro, Galaxy S23...`}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200"
                  autoFocus
                />
              </div>

              {/* Device info card */}
              <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wide">selected brand</p>
                    <p className="text-white font-semibold">{brandName}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Device Weight */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-300">
                  Device Weight (in grams)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                  placeholder="e.g., 170 (for 170g)"
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200"
                  autoFocus
                />
              </div>

              {/* Device info card */}
              <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wide">Specified Device</p>
                    <p className="text-white font-semibold">{brandName} {modelNo}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: RAM and ROM Selection */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* RAM Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-neutral-300">
                  Select RAM
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {ramOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setRam(option)}
                      className={`px-3 py-3 rounded-lg border transition-all duration-200 text-sm font-medium ${
                        ram === option
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                          : 'bg-neutral-800/50 border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* ROM Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-neutral-300">
                  Select ROM
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {romOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setRom(option)}
                      className={`px-3 py-3 rounded-lg border transition-all duration-200 text-sm font-medium ${
                        rom === option
                          ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                          : 'bg-neutral-800/50 border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Device info summary */}
              <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400">Brand:</span>
                  <span className="text-white font-semibold">{brandName}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400">Model:</span>
                  <span className="text-white font-semibold">{modelNo}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400">Weight:</span>
                  <span className="text-white font-semibold">{weight}g</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-neutral-800 flex gap-3">
          <button
            onClick={() => {
              if (step > 1) {
                setStep(step - 1);
              } else {
                handleClose();
              }
            }}
            className="flex-1 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-xl transition-colors duration-200"
          >
            {step > 1 ? 'Back' : 'Cancel'}
          </button>
          <button
            onClick={handleNext}
            disabled={
              isLoading ||
              (step === 1 && !brandName.trim()) ||
              (step === 2 && !modelNo.trim()) ||
              (step === 3 && !weight.trim()) ||
              (step === 4 && (!ram || !rom))
            }
            className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 disabled:from-neutral-700 disabled:to-neutral-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Processing...
              </>
            ) : (
              <>
                {step < 4 ? 'Next' : 'Submit'}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
