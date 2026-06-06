import React from 'react';
import { 
  Building2, 
  Eye, 
  ClipboardList, 
  CalendarCheck, 
  HeartPulse, 
  Phone, 
  Mail, 
  Users, 
  Sparkles, 
  Check
} from 'lucide-react';

const benefits = [
  { icon: ClipboardList, label: 'Access to Surgical Cases' },
  { icon: Building2, label: 'Expand Across Multiple Hospitals' },
  { icon: Eye, label: 'Professional Visibility & Patient Reach' },
  { icon: Users, label: 'Dedicated Patient Coordination' },
  { icon: CalendarCheck, label: 'Follow-Up & Consultation Tracking' },
  { icon: HeartPulse, label: 'Post-Surgery Patient Support' },
];

const engagementPoints = [
  { label: 'Consultation Tracking' },
  { label: 'Follow-Up Management' },
  { label: 'Surgery Scheduling' },
  { label: 'Recovery Communication' },
];

function QRCodePlaceholder() {
  const size = 9;
  const rows = Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => {
      if (i < 3 && j < 3) return true;
      if (i < 3 && j > size - 4) return true;
      if (j < 3 && i > size - 4) return true;
      if ((i + j) % 3 === 0) return true;
      if ((i * j) % 5 === 1) return true;
      return false;
    })
  );
  return (
    <div className="w-[70px] h-[70px] border-[2px] border-[#095941] rounded-lg p-1.5 bg-white flex-shrink-0">
      <div className="w-full h-full grid grid-cols-9 grid-rows-9 gap-[1px]">
        {rows.flat().map((filled, idx) => (
          <div
            key={idx}
            className={`rounded-[1px] ${filled ? 'bg-[#095941]' : 'bg-[#095941]/10'}`}
          />
        ))}
      </div>
    </div>
  );
}

export const A4Flyer: React.FC = () => {
  return (
    <div className="flyer-container a4-shadow mx-auto print:my-0 text-[#095941] font-sans">
      {/* Top Accent */}
      <div className="absolute top-0 left-0 h-1.5 w-full bg-[#095941] z-20" />

      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Repeating Dot Pattern - Dark Green with low opacity */}
        <div 
          className="absolute inset-0 opacity-[0.08]" 
          style={{ 
            backgroundImage: 'radial-gradient(#095941 1.5px, transparent 0)', 
            backgroundSize: '20px 20px' 
          }} 
        />
        
        {/* Subtle Radial Gradients for texture */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#095941]/5 blur-[120px]" />
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-white/40 blur-[100px]" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-[100%] bg-[#095941]/5 blur-[100px]" />
        
        {/* Subtle Circles */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-[#095941]/10 rounded-full" />
        <div className="absolute top-20 right-20 w-48 h-48 border border-[#095941]/5 rounded-full" />
        
        {/* ECG Line Decor */}
        <svg
          className="absolute bottom-60 left-0 w-full h-16 text-[#095941]/10"
          viewBox="0 0 800 60"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 30 H180 l14 -22 l18 44 l16 -52 l14 30 H520 l12 -16 l14 32 l12 -16 H800"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col h-full gap-6">
        {/* Header */}
        <header className="flex items-center justify-between shrink-0 pt-2">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-[#095941] leading-none mb-0.5">
              SPEROW
            </h1>
            <p className="text-[9px] font-bold tracking-[0.3em] text-[#095941]/60 uppercase">
              Your Surgical Care Partner
            </p>
          </div>
          <span className="px-4 py-1.5 bg-[#095941]/10 rounded-full border border-[#095941]/20 text-[10px] font-bold text-[#095941] tracking-wider uppercase">
            For Surgeons
          </span>
        </header>

        {/* Hero Section */}
        <section className="shrink-0 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-[9px] font-black tracking-widest uppercase text-[#095941] bg-[#095941]/5 px-3 py-1 rounded-full border border-[#095941]/10">
            <Sparkles size={11} className="text-[#095941]" />
            Practice Growth Platform
          </div>
          <h2 className="text-[38px] font-extrabold leading-[1.1] tracking-tighter text-[#095941] max-w-[650px]">
            Extend Your Surgical Practice <br />
            <span className="underline decoration-4 underline-offset-8 decoration-[#095941]/30">Across Hospitals</span>
          </h2>
          <p className="text-[15px] text-[#095941]/80 leading-snug max-w-[580px] font-medium">
            Grow your surgical practice with improved patient engagement, stronger follow-up continuity, and greater visibility across facilities.
          </p>
        </section>

        {/* Benefits Section */}
        <section className="shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-4 rounded-full bg-[#095941]" />
            <h3 className="text-base font-bold text-[#095941] tracking-tight">
              How SPEROW Empowers You
            </h3>
          </div>
          <div className="rounded-2xl border border-[#095941]/15 bg-white/40 p-4 backdrop-blur-sm shadow-sm">
            <p className="text-[9px] font-black tracking-[0.25em] text-[#095941]/50 uppercase mb-3">
              Core Capabilities
            </p>
            <ul className="grid grid-cols-1 gap-1">
              {benefits.map((b, i) => (
                <li
                  key={b.label}
                  className={`flex items-center gap-4 py-2 ${i !== benefits.length - 1 ? 'border-b border-[#095941]/5' : ''}`}
                >
                  <div className="w-7 h-7 rounded-lg bg-[#095941] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Check size={16} className="text-[#CCFFF0]" strokeWidth={3.5} />
                  </div>
                  <span className="flex-1 text-[14px] font-bold text-[#095941] leading-tight">
                    {b.label}
                  </span>
                  <span className="text-[12px] font-black text-[#095941]/20 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Value Statement */}
        <section className="bg-[#095941]/5 border border-[#095941]/15 p-5 rounded-2xl shadow-sm">
          <h3 className="text-[17px] font-black text-[#095941] leading-tight mb-1.5 tracking-tight">
            Focus on Surgery. <span className="opacity-70">We'll Support the Journey.</span>
          </h3>
          <p className="text-[12px] text-[#095941]/80 leading-relaxed font-medium">
            SPEROW manages patient coordination and tracking — allowing you to prioritize clinical excellence while we handle the operational continuity.
          </p>
        </section>

        {/* Engagement Section */}
        <section className="shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-4 rounded-full bg-[#095941]" />
            <h3 className="text-base font-bold text-[#095941] tracking-tight">
              Strengthening Patient Engagement
            </h3>
          </div>
          <div className="bg-white/40 border border-[#095941]/15 p-4 rounded-2xl shadow-sm">
            <p className="text-[12px] text-[#095941]/80 leading-relaxed mb-3 font-bold">
              We ensure every interaction is coordinated from initial consultation to final recovery.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {engagementPoints.map((point) => (
                <div
                  key={point.label}
                  className="flex items-center gap-2.5 bg-[#095941]/5 border border-[#095941]/15 px-4 py-1.5 rounded-full"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#095941] shrink-0" />
                  <span className="text-[9px] font-black text-[#095941] uppercase tracking-widest">
                    {point.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & QR Section - Removed mt-auto for consistent spacing */}
        <section className="shrink-0">
          <div className="rounded-2xl p-5 flex items-center justify-between border border-[#095941]/25 bg-white/50 backdrop-blur-md gap-6 shadow-md">
            <div className="flex-1">
              <h3 className="text-lg font-black text-[#095941] mb-1 tracking-tighter">
                Interested in Learning More?
              </h3>
              <p className="text-[10px] text-[#095941]/60 leading-snug mb-3 font-bold max-w-[360px]">
                Scan the QR code or reach out to discover how SPEROW can transform your surgical practice.
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-[12px] text-[#095941] font-bold">
                  <div className="w-6 h-6 rounded-md bg-[#095941] flex items-center justify-center shadow-sm">
                    <Phone size={14} className="text-[#CCFFF0]" strokeWidth={2.5} />
                  </div>
                  <span>+91 XXXXX XXXXX</span>
                </div>
                <div className="flex items-center gap-3 text-[12px] text-[#095941] font-bold">
                  <div className="w-6 h-6 rounded-md bg-[#095941] flex items-center justify-center shadow-sm">
                    <Mail size={14} className="text-[#CCFFF0]" strokeWidth={2.5} />
                  </div>
                  <span>surgeons@sperow.com</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-1.5">
              <QRCodePlaceholder />
              <p className="text-[9px] font-black text-[#095941] tracking-[0.2em] uppercase">
                Enquire
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto pt-4 pb-2 border-t border-[#095941]/10 flex items-center justify-between shrink-0">
          <span className="text-sm font-black text-[#095941] tracking-tighter uppercase">
            SPEROW
          </span>
          <p className="text-[10px] text-[#095941]/40 font-bold uppercase tracking-[0.1em]">
            &copy; {new Date().getFullYear()} SPEROW Medical Partners
          </p>
          <div className="flex gap-4">
             <span className="text-[9px] font-bold text-[#095941]/30 uppercase tracking-widest">Privacy</span>
             <span className="text-[9px] font-bold text-[#095941]/30 uppercase tracking-widest">Terms</span>
          </div>
        </footer>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 h-1.5 w-full bg-[#095941] z-20" />
    </div>
  );
};
