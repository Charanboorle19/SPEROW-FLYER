// sperow-video/Supporting Better Surgical Care.tsx
import React, {type CSSProperties} from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const colors = {
  background: '#F8F6F1',
  primary: '#124E78',
  teal: '#0E7490',
  gold: '#B99A6C',
  ink: '#14384A',
  muted: '#6F7F80',
  white: '#FFFEFB',
};

const TOTAL_FRAMES = 240;
const outcomes = [
  {
    title: 'Access to Surgical Cases',
    caption: '',
  },
  {
    title: 'Expand Across Multiple Hospitals',
    caption: '',
  },
  {
    title: 'Professional Visibility & Patient Reach',
    caption: '',
  },
  {
    title: 'Dedicated Patient Coordination',
    caption: '',
  },
  {
    title: 'Follow-Up & Consultation Tracking',
    caption: '',
  },
  {
    title: 'Post-Surgery Patient Support',
    caption: '',
  },
];

export const SupportingBetterSurgicalCare: React.FC = () => {
  const frame = useCurrentFrame();

  const sceneOpacity = interpolate(frame, [0, 18, 220, 240], [0, 1, 1, 0.92], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cameraScale = interpolate(frame, [0, TOTAL_FRAMES], [1, 1.018], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={styles.stage}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');`}
      </style>

      <Background frame={frame} />

      <div
        style={{
          ...styles.scene,
          opacity: sceneOpacity,
          transform: `scale(${cameraScale})`,
        }}
      >
        <div style={styles.leftPanel}>
          <Eyebrow frame={frame} />
          <Headline frame={frame} />
          <FinalStatement frame={frame} />
        </div>

        <div style={styles.rightPanel}>
          {outcomes.map((outcome, index) => (
            <OutcomeCard
              key={outcome.title}
              title={outcome.title}
              caption={outcome.caption}
              index={index}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Background: React.FC<{frame: number}> = ({frame}) => {
  const time = frame / 30;
  const orbX = Math.sin(time * 0.26) * 42;
  const orbY = Math.cos(time * 0.22) * 30;
  const lineShift = interpolate(frame, [0, TOTAL_FRAMES], [0, 34], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={styles.background}>
      <div style={styles.baseGradient} />
      <div
        style={{
          ...styles.softOrbPrimary,
          transform: `translate(${orbX}px, ${orbY}px)`,
        }}
      />
      <div
        style={{
          ...styles.softOrbGold,
          transform: `translate(${-orbX * 0.6}px, ${orbY * 0.7}px)`,
        }}
      />
      <div
        style={{
          ...styles.linePattern,
          transform: `translateX(${lineShift}px)`,
        }}
      />
    </AbsoluteFill>
  );
};

const Eyebrow: React.FC<{frame: number}> = ({frame}) => {
  const opacity = interpolate(frame, [6, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame, [6, 24], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        ...styles.eyebrow,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      How SPEROW Supports Your Practice
    </div>
  );
};

const Headline: React.FC<{frame: number}> = ({frame}) => {
  const {fps} = useVideoConfig();
  const enter = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: {damping: 26, stiffness: 78, mass: 0.9},
  });
  const opacity = interpolate(enter, [0, 0.45], [0, 1]);
  const y = interpolate(enter, [0, 1], [36, 0]);

  return (
    <h1
      style={{
        ...styles.headline,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      Built Around Continuity of Care
    </h1>
  );
};

const OutcomeCard: React.FC<{
  title: string;
  caption: string;
  index: number;
}> = ({title, caption, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const start = 42 + index * 22;
  const age = Math.max(0, frame - start);
  const enter = spring({
    frame: age,
    fps,
    config: {damping: 25, stiffness: 86, mass: 0.85},
  });
  const opacity = interpolate(enter, [0, 0.35], [0, 1]);
  const y = interpolate(enter, [0, 1], [28, 0]);
  const accentScale = interpolate(age, [0, 34], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        ...styles.card,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div style={styles.cardIndex}>0{index + 1}</div>
      <div style={styles.cardBody}>
        <div style={styles.cardTitle}>{title}</div>
        {caption ? <div style={styles.cardCaption}>{caption}</div> : null}
      </div>
      <div
        style={{
          ...styles.cardAccent,
          transform: `scaleY(${accentScale})`,
        }}
      />
    </div>
  );
};

const FinalStatement: React.FC<{frame: number}> = ({frame}) => {
  const {fps} = useVideoConfig();
  const enter = spring({
    frame: Math.max(0, frame - 154),
    fps,
    config: {damping: 28, stiffness: 82, mass: 1},
  });
  const lineEnter = spring({
    frame: Math.max(0, frame - 148),
    fps,
    config: {damping: 24, stiffness: 74, mass: 0.9},
  });
  const opacity = interpolate(enter, [0, 0.35], [0, 1]);
  const y = interpolate(enter, [0, 1], [24, 0]);
  const lineOpacity = interpolate(frame, [148, 164], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lineScale = interpolate(lineEnter, [0, 1], [0, 1]);
  const lineY = interpolate(lineEnter, [0, 1], [10, 0]);

  return (
    <div
      style={{
        ...styles.finalBlock,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          ...styles.finalRule,
          opacity: lineOpacity,
          transform: `translateY(${lineY}px) scaleX(${lineScale})`,
        }}
      />
      <p style={styles.finalText}>
        <span style={{color: colors.gold}}>Focus on Surgery.</span>{' '}
        <span style={{color: colors.teal}}>We&apos;ll Support the Journey.</span>
      </p>
      <p style={styles.ctaText}>
        SPEROW manages patient coordination and tracking — allowing you to prioritize clinical excellence while we handle the operational continuity.
      </p>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  stage: {
    backgroundColor: colors.background,
    color: colors.ink,
    fontFamily: 'Manrope, sans-serif',
    overflow: 'hidden',
  },
  background: {
    overflow: 'hidden',
  },
  baseGradient: {
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(circle at 28% 32%, #FFFFFF 0%, #F8F6F1 54%, #EEF4F2 100%)',
  },
  softOrbPrimary: {
    position: 'absolute',
    width: 760,
    height: 760,
    borderRadius: 999,
    right: -160,
    top: -220,
    background: 'rgba(18, 78, 120, 0.16)',
    filter: 'blur(110px)',
    willChange: 'transform',
  },
  softOrbGold: {
    position: 'absolute',
    width: 620,
    height: 620,
    borderRadius: 999,
    left: -180,
    bottom: -220,
    background: 'rgba(185, 154, 108, 0.13)',
    filter: 'blur(100px)',
    willChange: 'transform',
  },
  linePattern: {
    position: 'absolute',
    inset: 0,
    opacity: 0.38,
    backgroundImage:
      'repeating-linear-gradient(135deg, rgba(18, 78, 120, 0.055) 0px, rgba(18, 78, 120, 0.055) 1px, transparent 1px, transparent 36px)',
    maskImage: 'radial-gradient(circle at center, black 0%, black 58%, transparent 82%)',
    willChange: 'transform',
  },
  scene: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 54,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '120px 78px',
    willChange: 'transform, opacity',
  },
  leftPanel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  rightPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: '100%',
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    marginBottom: 28,
  },
  headline: {
    margin: 0,
    maxWidth: 820,
    color: colors.ink,
    fontSize: 62,
    fontWeight: 700,
    letterSpacing: '-0.075em',
    lineHeight: 0.94,
  },
  card: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '72px 1fr',
    gap: 24,
    alignItems: 'center',
    minHeight: 104,
    padding: '22px 30px 22px 28px',
    borderRadius: 24,
    background: 'rgba(255, 254, 251, 0.78)',
    border: '1px solid rgba(18, 78, 120, 0.11)',
    boxShadow: '0 18px 54px rgba(18, 78, 120, 0.075)',
    overflow: 'hidden',
    willChange: 'transform, opacity',
  },
  cardIndex: {
    color: colors.gold,
    fontSize: 24,
    fontWeight: 800,
    letterSpacing: '-0.04em',
  },
  cardBody: {
    minWidth: 0,
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 27,
    fontWeight: 700,
    letterSpacing: '-0.045em',
    lineHeight: 1.08,
    marginBottom: 8,
  },
  cardCaption: {
    color: colors.muted,
    fontSize: 17,
    fontWeight: 500,
    letterSpacing: '-0.015em',
    lineHeight: 1.35,
  },
  cardAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    background: `linear-gradient(180deg, ${colors.primary}, ${colors.teal}, ${colors.gold})`,
    transformOrigin: 'top center',
  },
  finalBlock: {
    marginTop: 64,
    maxWidth: 820,
    willChange: 'transform, opacity',
  },
  finalRule: {
    width: 300,
    height: 3,
    borderRadius: 999,
    background:
      'linear-gradient(90deg, rgba(185, 154, 108, 0), rgba(185, 154, 108, 0.95), rgba(18, 78, 120, 0.42), rgba(185, 154, 108, 0))',
    boxShadow: '0 0 22px rgba(185, 154, 108, 0.22)',
    transformOrigin: 'center',
    margin: '0 auto 28px',
    willChange: 'transform, opacity',
  },
  finalText: {
    margin: 0,
    fontSize: 40,
    fontWeight: 800,
    letterSpacing: '-0.055em',
    lineHeight: 1.12,
  },
  ctaText: {
    margin: '24px 0 0',
    color: colors.muted,
    fontSize: 25,
    fontWeight: 650,
    letterSpacing: '-0.03em',
    lineHeight: 1.34,
  },
};

export default SupportingBetterSurgicalCare;
