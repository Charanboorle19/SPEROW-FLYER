import React from 'react';
import { Phone, Mail, Sparkles } from 'lucide-react';

const benefits = [
  { label: 'Access to Surgical Cases' },
  { label: 'Expand Across Multiple Hospitals' },
  { label: 'Professional Visibility & Patient Reach' },
  { label: 'Dedicated Patient Coordination' },
  { label: 'Follow-Up & Consultation Tracking' },
  { label: 'Post-Surgery Patient Support' },
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
    <div className="w-[92px] h-[92px] border-[3px] border-white rounded-xl p-2 bg-white flex-shrink-0 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
      <div className="w-full h-full grid grid-cols-9 grid-rows-9 gap-[1px]">
        {rows.flat().map((filled, idx) => (
          <div
            key={idx}
            className={`rounded-[1px] ${filled ? 'bg-[#124E78]' : 'bg-[#124E78]/[0.08]'}`}
          />
        ))}
      </div>
    </div>
  );
}

export const A4Flyer: React.FC = () => {
  return (
    <div className="flyer-container a4-shadow mx-auto print:my-0 text-[#123F5C] font-sans">
      {/* Top Accent */}
      <div className="absolute top-0 left-0 h-1 w-full bg-[#124E78] z-20" />

      {/* Subtle Background Elements */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-48 -right-52 w-[620px] h-[620px] rounded-full bg-[#7DB9C8]/[0.18] blur-[140px]" />
        <div className="absolute top-[34%] -left-56 w-[520px] h-[520px] rounded-full bg-[#D7B98E]/[0.12] blur-[150px]" />
        <div className="absolute -bottom-44 right-10 w-[620px] h-[360px] rounded-full bg-[#124E78]/10 blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col h-full gap-5">
        {/* Header */}
        <header className="flex items-center justify-between shrink-0 pt-3 pb-2">
          <div>
            <h1 className="text-[38px] font-black tracking-[-0.07em] text-[#124E78] leading-none mb-1">
              SPEROW
            </h1>
            <p className="text-[9px] font-extrabold tracking-[0.34em] text-[#6A7D86] uppercase">
              Your Surgical Care Partner
            </p>
          </div>
          <span className="px-5 py-2 bg-white/80 rounded-full border border-[#124E78]/[0.12] text-[10px] font-extrabold text-[#124E78] tracking-[0.18em] uppercase shadow-[0_10px_30px_rgba(18,78,120,0.08)]">
            For Surgeons
          </span>
        </header>

        {/* Hero Section */}
        <section className="shrink-0 space-y-4 pt-1">
          <div className="inline-flex items-center gap-2 text-[9px] font-black tracking-[0.26em] uppercase text-[#124E78] bg-white/80 px-3.5 py-1.5 rounded-full border border-[#124E78]/10 shadow-[0_10px_26px_rgba(18,78,120,0.07)]">
            <Sparkles size={11} className="text-[#0E7490]" />
            Practice Growth Platform
          </div>
          <h2 className="text-[48px] font-black leading-[0.98] tracking-[-0.055em] text-[#123F5C] max-w-[690px]">
            Extend Your Surgical Practice <br />
            <span className="text-[#0E7490]">Across Hospitals</span>
          </h2>
          <p className="text-[16px] text-[#425D67] leading-[1.45] max-w-[610px] font-semibold">
            Grow your surgical practice with improved patient engagement, stronger follow-up continuity, and greater visibility across facilities.
          </p>
        </section>

        {/* Benefits Section */}
        <section className="shrink-0">
          <div className="flex items-center gap-3 mb-3.5">
            <div className="w-8 h-px bg-[#B99A6C]" />
            <h3 className="text-[17px] font-black text-[#123F5C] tracking-[-0.025em]">
              How SPEROW Empowers You
            </h3>
          </div>
          <div className="rounded-[24px] border border-white/80 bg-white/[0.72] p-[18px] backdrop-blur-sm shadow-[0_22px_60px_rgba(18,78,120,0.09)]">
            <p className="text-[9px] font-black tracking-[0.28em] text-[#6B858E] uppercase mb-3.5">
              Core Capabilities
            </p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-0 border-t border-[#DDE9EA]">
              {benefits.map((b, i) => (
                <li
                  key={b.label}
                  className="flex items-center gap-3.5 py-3.5 border-b border-[#DDE9EA]"
                >
                  <span className="block w-7 text-[9px] font-black text-[#B99A6C]/70 tabular-nums tracking-[0.18em]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="block flex-1 text-[12.5px] font-extrabold text-[#123F5C] leading-snug">
                    {b.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Value Statement */}
        <section className="bg-[#124E78] border border-[#124E78] p-7 rounded-[28px] shadow-[0_26px_70px_rgba(18,78,120,0.28)]">
          <h3 className="text-[25px] font-black text-white leading-[1.05] mb-3 tracking-[-0.045em]">
            Focus on Surgery. <span className="text-white/[0.72]">We'll Support the Journey.</span>
          </h3>
          <p className="text-[13.5px] text-white/[0.82] leading-[1.55] font-semibold max-w-[620px]">
            SPEROW manages patient coordination and tracking — allowing you to prioritize clinical excellence while we handle the operational continuity.
          </p>
        </section>

        {/* Engagement Section */}
        <section className="shrink-0">
          <div className="flex items-center gap-3 mb-3.5">
            <div className="w-8 h-px bg-[#B99A6C]" />
            <h3 className="text-[17px] font-black text-[#123F5C] tracking-[-0.025em]">
              Strengthening Patient Engagement
            </h3>
          </div>
          <div className="bg-white/[0.72] border border-white/80 p-5 rounded-[24px] shadow-[0_18px_48px_rgba(18,78,120,0.08)]">
            <p className="text-[13px] text-[#425D67] leading-relaxed mb-4 font-bold">
              We ensure every interaction is coordinated from initial consultation to final recovery.
            </p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-0 border-t border-[#DDE9EA]">
              {engagementPoints.map((point, i) => (
                <li
                  key={point.label}
                  className="flex items-center gap-3.5 py-3.5 border-b border-[#DDE9EA]"
                >
                  <span className="block w-7 text-[9px] font-black text-[#B99A6C]/70 tabular-nums tracking-[0.18em]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="block flex-1 text-[12.5px] font-extrabold text-[#123F5C] leading-snug">
                    {point.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contact & QR Section - Removed mt-auto for consistent spacing */}
        <section className="shrink-0">
          <div className="rounded-[28px] p-6 flex items-center justify-between border border-[#E7D7BF] bg-[#FFFEFB] backdrop-blur-md gap-7 shadow-[0_30px_80px_rgba(18,78,120,0.18)]">
            <div className="flex-1">
              <h3 className="text-[23px] font-black text-[#123F5C] mb-2 tracking-[-0.045em]">
                Interested in Learning More?
              </h3>
              <p className="text-[12px] text-[#516A73] leading-relaxed mb-4 font-bold max-w-[390px]">
                Scan the QR code or reach out to discover how SPEROW can transform your surgical practice.
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-[12px] text-[#123F5C] font-extrabold">
                  <div className="w-7 h-7 rounded-lg bg-[#E7F2F3] border border-[#C7DDDF] flex items-center justify-center shadow-sm">
                    <Phone size={14} className="text-[#124E78]" strokeWidth={2.5} />
                  </div>
                  <span>+91 XXXXX XXXXX</span>
                </div>
                <div className="flex items-center gap-3 text-[12px] text-[#123F5C] font-extrabold">
                  <div className="w-7 h-7 rounded-lg bg-[#E7F2F3] border border-[#C7DDDF] flex items-center justify-center shadow-sm">
                    <Mail size={14} className="text-[#124E78]" strokeWidth={2.5} />
                  </div>
                  <span>surgeons@sperow.com</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2.5 rounded-2xl bg-[#124E78] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
              <QRCodePlaceholder />
              <p className="text-[9px] font-black text-white tracking-[0.22em] uppercase">
                Enquire
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto pt-4 pb-2 border-t border-[#D8E0DE] flex items-center justify-between shrink-0">
          <span className="text-[13px] font-black text-[#124E78] tracking-[-0.04em] uppercase">
            SPEROW
          </span>
          <p className="text-[9px] text-[#70858A]/[0.65] font-bold uppercase tracking-[0.12em]">
            &copy; {new Date().getFullYear()} SPEROW Medical Partners
          </p>
          <div className="flex gap-4">
             <span className="text-[8.5px] font-bold text-[#70858A]/[0.55] uppercase tracking-widest">Privacy</span>
             <span className="text-[8.5px] font-bold text-[#70858A]/[0.55] uppercase tracking-widest">Terms</span>
          </div>
        </footer>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-[#124E78] z-20" />
    </div>
  );
};
