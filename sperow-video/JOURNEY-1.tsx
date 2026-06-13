// sperow-video/JOURNEY-1.tsx
import React, { type CSSProperties } from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from 'remotion';
import consultationImage from './src/remotion/assets/consultation.svg';
import followUpImage from './src/remotion/assets/follow-up.svg';
import recoveryImage from './src/remotion/assets/recovery.svg';
import procedureImage from './src/remotion/assets/surgery-2.png';
import surgeryPlanningImage from './src/remotion/assets/surgery-planning.svg';

// --------------------------------------------
// Design System & Constants
// --------------------------------------------
const colors = {
  background: '#F8F6F1',
  primary: '#124E78',
  secondary: '#1F5E4E',
  teal: '#0E7490',
  gold: '#B99A6C',
  ink: '#14384A',
  muted: '#6F7F80',
  white: '#FFFEFB',
  lightTeal: 'rgba(14, 116, 144, 0.06)',
  lightBlue: 'rgba(18, 78, 120, 0.08)',
  goldGlow: 'rgba(185, 154, 108, 0.25)',
};

// Timeline data with image paths
const timelineSteps = [
  { 
    label: 'Consultation', 
    description: '', 
    delayOffset: 0,
    imagePath: consultationImage,
  },
  { 
    label: 'Surgery Planning', 
    description: '', 
    delayOffset: 15,
    imagePath: surgeryPlanningImage,
  },
  { 
    label: 'Procedure', 
    description: '', 
    delayOffset: 30,
    imagePath: procedureImage,
  },
  { 
    label: 'Recovery', 
    description: '', 
    delayOffset: 45,
    imagePath: recoveryImage,
  },
  { 
    label: 'Follow-Up', 
    description: '', 
    delayOffset: 60,
    imagePath: followUpImage,
  },
];

// Frame ranges (32 seconds @ 30fps = 960 total frames)
const TOTAL_FRAMES = 960;
const HEADER_FADE_IN = 20;
const TIMELINE_START_FRAME = 40;   // First step starts fading in
const STEP_INTERVAL_FRAMES = 45;    // 1.5 seconds per step @ 30fps
const FINAL_START_FRAME = 820;      // Adjusted to accommodate longer timeline
const FOLLOW_UP_STEP_INDEX = timelineSteps.findIndex(
  (step) => step.label === 'Follow-Up',
);
export const FOLLOW_UP_DISPLAY_FRAME =
  TIMELINE_START_FRAME + FOLLOW_UP_STEP_INDEX * STEP_INTERVAL_FRAMES;
export const FOLLOW_UP_HOLD_FRAMES = 90;
export const SURGICAL_JOURNEY_SCENE_DURATION =
  FOLLOW_UP_DISPLAY_FRAME + FOLLOW_UP_HOLD_FRAMES;

// --------------------------------------------
// Main Scene Component
// --------------------------------------------
export const SurgicalJourneyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Header Animations ---
  const headingOpacity = interpolate(frame, [0, HEADER_FADE_IN], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const headingY = interpolate(frame, [0, HEADER_FADE_IN], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const captionOpacity = interpolate(frame, [10, 30], [0, 0.75], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sceneOpacity = interpolate(
    frame,
    [
      0,
      HEADER_FADE_IN,
      SURGICAL_JOURNEY_SCENE_DURATION - 30,
      SURGICAL_JOURNEY_SCENE_DURATION,
    ],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  // Track which timeline step is currently active for background images
  const getActiveStepIndex = () => {
    for (let i = timelineSteps.length - 1; i >= 0; i--) {
      const stepStartFrame = TIMELINE_START_FRAME + i * STEP_INTERVAL_FRAMES;
      if (frame >= stepStartFrame) {
        return i;
      }
    }
    return -1;
  };

  const activeStepIndex = getActiveStepIndex();
  const currentImagePath = activeStepIndex >= 0 ? timelineSteps[activeStepIndex].imagePath : null;

  return (
    <AbsoluteFill style={{...styles.container, opacity: sceneOpacity}}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');`}
      </style>

      {/* Promo-style White Background with subtle gradient */}
      <div style={styles.baseGradient} />
      <div style={styles.gridPattern} />
      <div style={styles.softGrid} />
      
      {/* Moving blur elements for dynamism */}
      <BackgroundMotion frame={frame} />
      
      {/* Full Page Background Images - Smooth fade only */}
      {currentImagePath && (
        <TimelineImageBackground 
          imagePath={currentImagePath} 
          frame={frame}
          stepIndex={activeStepIndex}
        />
      )}
      
      <Particles frame={frame} />

      {/* Very subtle overlay for better text readability */}
      <div style={styles.overlay} />

      {/* Header Section */}
      <div
        style={{
          ...styles.header,
          opacity: headingOpacity,
          transform: `translateY(${headingY}px)`,
        }}
      >
        <h1 style={styles.mainHeading}>
          Strengthening Patient Engagement
        </h1>
        <p style={{ ...styles.caption, opacity: captionOpacity }}>
          We ensure every interaction is coordinated from initial consultation to final recovery.
        </p>
      </div>

      {/* Vertical Timeline List */}
      <div style={styles.timelineWrapper}>
        <div style={styles.timelineList}>
          {timelineSteps.map((step, idx) => (
            <TimelineStep
              key={step.label}
              label={step.label}
              description={step.description}
              index={idx}
              isLast={idx === timelineSteps.length - 1}
              isActive={idx === activeStepIndex}
            />
          ))}
        </div>
      </div>

      {/* Final Message Sequence */}
      <FinalMessageSequence frame={frame} />
    </AbsoluteFill>
  );
};

// --------------------------------------------
// Background Motion Component - Moving blur elements
// --------------------------------------------
const BackgroundMotion: React.FC<{ frame: number }> = ({ frame }) => {
  const progress = frame / 750;
  const wave = Math.sin(progress * Math.PI * 6);
  const counterWave = Math.cos(progress * Math.PI * 5);
  const slowWave = Math.sin(progress * Math.PI * 3);

  return (
    <AbsoluteFill style={styles.motionContainer}>
      <div
        style={{
          ...styles.blurOne,
          transform: `translate(${wave * 260}px, ${counterWave * 120}px) scale(${1 + wave * 0.08})`,
        }}
      />
      <div
        style={{
          ...styles.blurTwo,
          transform: `translate(${counterWave * -220}px, ${wave * 180}px) scale(${1 - counterWave * 0.07})`,
        }}
      />
      <div
        style={{
          ...styles.blurThree,
          transform: `translate(${slowWave * 190}px, ${counterWave * -150}px) scale(${1 + slowWave * 0.06})`,
        }}
      />
    </AbsoluteFill>
  );
};

// --------------------------------------------
// Timeline Background Image Component - Reduced Opacity
// --------------------------------------------
const TimelineImageBackground: React.FC<{
  imagePath: string;
  frame: number;
  stepIndex: number;
}> = ({ imagePath, frame, stepIndex }) => {
  const { fps } = useVideoConfig();
  
  // Calculate when this specific image should appear
  const imageStartFrame = TIMELINE_START_FRAME + stepIndex * STEP_INTERVAL_FRAMES;
  const imageAge = Math.max(0, frame - imageStartFrame);
  
  // Ultra smooth fade-in using spring for natural easing
  const fadeOpacity = spring({
    frame: imageAge,
    fps,
    config: { damping: 30, stiffness: 120, mass: 0.8 },
  });
  
  // Apply reduced opacity - max opacity is now 0.22 (22%) instead of 0.35
  const opacity = fadeOpacity * 0.22;
  
  return (
    <AbsoluteFill style={styles.fullImageContainer}>
      <div
        style={{
          ...styles.fullImageWrapper,
          opacity,
          willChange: 'opacity',
        }}
      >
        <Img
          src={imagePath}
          style={styles.fullPageImage}
          alt={`${timelineSteps[stepIndex].label} illustration`}
        />
      </div>
    </AbsoluteFill>
  );
};

// --------------------------------------------
// Floating Particles
// --------------------------------------------
const Particles: React.FC<{ frame: number }> = ({ frame }) => {
  const particles = Array.from({ length: 24 }, (_, i) => {
    const speed = 0.15 + (i % 7) * 0.04;
    const yOffset = ((frame * speed) % 220) - 100;
    const opacity = 0.1 + Math.sin(frame * 0.008 + i) * 0.06;
    const size = i % 4 === 0 ? 2.5 : 1.8;
    const color = i % 3 === 0 ? colors.gold : colors.teal;

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${5 + (i * 7) % 90}%`,
          top: `${10 + yOffset}%`,
          width: size,
          height: size,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}, transparent)`,
          opacity,
          filter: 'blur(1px)',
        }}
      />
    );
  });
  return <>{particles}</>;
};

// --------------------------------------------
// Individual Timeline Step (with arrow connector)
// --------------------------------------------
const TimelineStep: React.FC<{
  label: string;
  description: string;
  index: number;
  isLast: boolean;
  isActive: boolean;
}> = ({ label, description, index, isLast, isActive }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Each step appears with a spring delay - slower appearance
  const stepStartFrame = TIMELINE_START_FRAME + index * STEP_INTERVAL_FRAMES;
  const appearFrames = Math.max(0, frame - stepStartFrame);
  
  // Smoother, slower appearance animation
  const opacity = spring({
    frame: appearFrames,
    fps,
    config: { damping: 28, stiffness: 65, mass: 0.9 },
  });
  
  const translateY = interpolate(appearFrames, [0, 35], [40, 0], {
    extrapolateRight: 'clamp',
  });
  
  // Smoother text fade-in
  const textOpacity = interpolate(appearFrames, [0, 15, 30], [0, 0.3, 1], {
    extrapolateRight: 'clamp',
  });
  
  // Active step highlighting with glow effect
  const activeGlow = isActive ? {
    textShadow: `0 0 30px ${colors.goldGlow}`,
    color: colors.primary,
  } : {};

  return (
    <div
      style={{
        ...styles.stepContainer,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {/* Left side: node circle */}
      <div style={styles.stepNode}>
        <div style={{
          ...styles.nodeCircle,
          ...(isActive && {
            boxShadow: `0 0 0 2px ${colors.primary}, 0 0 0 8px ${colors.goldGlow}`,
            transform: 'scale(1.2)',
            background: `radial-gradient(circle, ${colors.gold}, ${colors.primary})`,
          })
        }} />
      </div>

      {/* Right side: text with smooth fade-in */}
      <div style={{ ...styles.stepText, opacity: textOpacity }}>
        <div style={{ ...styles.stepLabel, ...activeGlow }}>{label}</div>
        <div style={{ ...styles.stepDescription, ...(isActive && { color: colors.primary, opacity: 0.9 }) }}>
          {description}
        </div>
      </div>

      {/* Downward arrow (except last) - smooth animation */}
      {!isLast && (
        <div style={{
          ...styles.arrowContainer,
          opacity: interpolate(appearFrames, [0, 20, 40], [0, 0.3, 1]),
        }}>
          <div style={styles.arrowLine} />
          <div style={styles.arrowHead} />
        </div>
      )}
    </div>
  );
};

// --------------------------------------------
// Final Message Sequence
// --------------------------------------------
const FinalMessageSequence: React.FC<{ frame: number }> = ({ frame }) => {
  const ctaFrame = Math.max(0, frame - FINAL_START_FRAME);
  const ctaOpacity = interpolate(ctaFrame, [0, 20, 40], [0, 0.8, 0.8], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={styles.messageContainer}>
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: ctaOpacity,
        }}
      >
        <div style={styles.ctaText}>Learn how at sperow.com</div>
      </div>
    </AbsoluteFill>
  );
};

// --------------------------------------------
// Enhanced Styles - WITH PROMO-STYLE BACKGROUND
// --------------------------------------------
const styles: Record<string, CSSProperties> = {
  container: {
    fontFamily: 'Manrope, sans-serif',
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  baseGradient: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6F1 46%, #EEF4F2 100%)',
    zIndex: 0,
  },
  gridPattern: {
    position: 'absolute',
    inset: 0,
    opacity: 0.46,
    backgroundImage: 'repeating-linear-gradient(135deg, rgba(18, 78, 120, 0.08) 0px, rgba(18, 78, 120, 0.08) 1px, transparent 1px, transparent 34px)',
    maskImage: 'radial-gradient(circle at center, black 0%, black 62%, transparent 86%)',
    zIndex: 0,
  },
  softGrid: {
    position: 'absolute',
    inset: 70,
    border: '1px solid rgba(18, 78, 120, 0.12)',
    borderRadius: 44,
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.7)',
    zIndex: 0,
  },
  motionContainer: {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    overflow: 'hidden',
  },
  blurOne: {
    position: 'absolute',
    width: 900,
    height: 900,
    borderRadius: 999,
    right: -80,
    top: -240,
    background: 'rgba(18, 78, 120, 0.24)',
    filter: 'blur(115px)',
    willChange: 'transform',
  },
  blurTwo: {
    position: 'absolute',
    width: 840,
    height: 840,
    borderRadius: 999,
    left: -180,
    bottom: -120,
    background: 'rgba(31, 94, 78, 0.22)',
    filter: 'blur(120px)',
    willChange: 'transform',
  },
  blurThree: {
    position: 'absolute',
    width: 640,
    height: 640,
    borderRadius: 999,
    right: 430,
    top: 240,
    background: 'rgba(185, 154, 108, 0.18)',
    filter: 'blur(130px)',
    willChange: 'transform',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.04) 100%)',
    zIndex: 1,
    pointerEvents: 'none',
  },
  fullImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    overflow: 'hidden',
  },
  fullImageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  fullPageImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  header: {
    textAlign: 'center',
    marginTop: 190,
    padding: '0 68px',
    zIndex: 20,
    position: 'relative',
  },
  mainHeading: {
    fontSize: 54,
    fontWeight: 800,
    color: colors.ink,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    marginBottom: 20,
    textShadow: '0 2px 20px rgba(255,255,255,0.3)',
  },
  caption: {
    fontSize: 28,
    fontWeight: 650,
    color: colors.muted,
    letterSpacing: '-0.01em',
    opacity: 0.9,
  },
  timelineWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 90,
    marginLeft: 0,
    zIndex: 20,
    position: 'relative',
  },
  timelineList: {
    width: 760,
    display: 'flex',
    flexDirection: 'column',
    gap: 54,
    position: 'relative',
  },
  stepContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative',
    gap: 28,
  },
  stepNode: {
    flexShrink: 0,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 5,
  },
  nodeCircle: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    background: `radial-gradient(circle, ${colors.teal}, ${colors.primary})`,
    border: `3px solid ${colors.white}`,
    boxShadow: `0 0 0 2px ${colors.primary}, 0 4px 10px rgba(0,0,0,0.1)`,
    transition: 'all 0.4s ease',
  },
  stepText: {
    flex: 1,
    paddingBottom: 12,
  },
  stepLabel: {
    fontSize: 50,
    fontWeight: 700,
    color: colors.ink,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    marginBottom: 10,
    transition: 'all 0.4s ease',
  },
  stepDescription: {
    fontSize: 20,
    fontWeight: 500,
    color: colors.muted,
    letterSpacing: '-0.01em',
    lineHeight: 1.3,
    opacity: 0.85,
  },
  arrowContainer: {
    position: 'absolute',
    left: 30,
    top: 78,
    bottom: -58,
    width: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  arrowLine: {
    width: 2,
    flex: 1,
    background: `linear-gradient(180deg, ${colors.teal}80, ${colors.gold}80)`,
    borderRadius: 1,
  },
  arrowHead: {
    width: 0,
    height: 0,
    borderLeft: '7px solid transparent',
    borderRight: '7px solid transparent',
    borderTop: `10px solid ${colors.gold}`,
    marginTop: -2,
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    pointerEvents: 'none',
    zIndex: 30,
    position: 'relative',
  },
  messageWrapper: {
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
  },
  supportingText: {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: colors.muted,
    marginBottom: 16,
  },
  wordmark: {
    fontSize: 76,
    fontWeight: 800,
    color: colors.primary,
    letterSpacing: '0.06em',
    textShadow: '0 2px 20px rgba(18,78,120,0.2)',
  },
  tagline: {
    fontSize: 40,
    fontWeight: 600,
    color: colors.ink,
    letterSpacing: '-0.02em',
  },
  taglineAccent: {
    color: colors.teal,
    fontWeight: 700,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: 500,
    color: colors.gold,
    letterSpacing: '0.02em',
    borderTop: `1px solid ${colors.gold}50`,
    display: 'inline-block',
    paddingTop: 12,
    paddingLeft: 24,
    paddingRight: 24,
  },
};

export default SurgicalJourneyScene;