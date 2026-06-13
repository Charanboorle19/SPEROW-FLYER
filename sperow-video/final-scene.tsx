// sperow-video/final-scene.tsx
import React, {type CSSProperties} from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import sperowQrImage from './src/remotion/assets/sperow-qr (2).png';

const colors = {
  primary: '#124E78',
  teal: '#0E7490',
  gold: '#B99A6C',
  ink: '#14384A',
  muted: '#6F7F80',
  white: '#FFFEFB',
  offWhite: '#F8F6F1',
};

const TOTAL_FRAMES = 300;

const trustStatements = [
  '+91 7893815371',
  'contact@sperow.in',
  'Enquire',
];

export const FinalScene: React.FC = () => {
  const frame = useCurrentFrame();

  const sceneOpacity = interpolate(frame, [0, 18, 286, 300], [0, 1, 1, 0.96], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cameraScale = interpolate(frame, [0, TOTAL_FRAMES], [1, 1.025], {
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
        <ClosingLine frame={frame} />
        <BrandCard frame={frame} />
        <TrustStack frame={frame} />
      </div>
    </AbsoluteFill>
  );
};

const Background: React.FC<{frame: number}> = ({frame}) => {
  const time = frame / 30;
  const orbOneX = Math.sin(time * 0.24) * 52;
  const orbOneY = Math.cos(time * 0.18) * 34;
  const orbTwoX = Math.cos(time * 0.2) * 42;
  const lineShift = interpolate(frame, [0, TOTAL_FRAMES], [0, 42], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={styles.background}>
      <div style={styles.baseGradient} />
      <div
        style={{
          ...styles.primaryOrb,
          transform: `translate(${orbOneX}px, ${orbOneY}px)`,
        }}
      />
      <div
        style={{
          ...styles.goldOrb,
          transform: `translate(${-orbTwoX}px, ${orbOneY * 0.5}px)`,
        }}
      />
      <div
        style={{
          ...styles.lineTexture,
          transform: `translateX(${lineShift}px)`,
        }}
      />
      <div style={styles.vignette} />
    </AbsoluteFill>
  );
};

const ClosingLine: React.FC<{frame: number}> = ({frame}) => {
  const {fps} = useVideoConfig();
  const enter = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: {damping: 28, stiffness: 80, mass: 0.9},
  });
  const brandEnter = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: {damping: 24, stiffness: 72, mass: 1},
  });
  const opacity = interpolate(enter, [0, 0.36], [0, 1]);
  const y = interpolate(enter, [0, 1], [38, 0]);
  const brandOpacity = interpolate(frame, [8, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const brandScale = interpolate(brandEnter, [0, 1], [0.82, 1]);
  const brandSpacing = interpolate(frame, [8, 58], [0.24, 0.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ruleScale = interpolate(frame, [36, 86], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div style={styles.eyebrow}>Interested in Learning More?</div>
      <div
        style={{
          ...styles.wordmarkHero,
          opacity: brandOpacity,
          letterSpacing: `${brandSpacing}em`,
          transform: `scale(${brandScale})`,
        }}
      >
        SPEROW
      </div>
      <h1 style={styles.headline}>Scan to learn more about SPEROW.</h1>
      <div
        style={{
          ...styles.headlineRule,
          transform: `scaleX(${ruleScale})`,
        }}
      />
    </div>
  );
};

const TrustStack: React.FC<{frame: number}> = ({frame}) => {
  return (
    <div style={styles.trustStack}>
      {trustStatements.map((statement, index) => (
        <TrustItem key={statement} frame={frame} index={index} text={statement} />
      ))}
    </div>
  );
};

const TrustItem: React.FC<{
  frame: number;
  index: number;
  text: string;
}> = ({frame, index, text}) => {
  const {fps} = useVideoConfig();
  const age = Math.max(0, frame - (112 + index * 12));
  const enter = spring({
    frame: age,
    fps,
    config: {damping: 25, stiffness: 86, mass: 0.85},
  });
  const opacity = interpolate(enter, [0, 0.35], [0, 1]);
  const y = interpolate(enter, [0, 1], [22, 0]);
  const dotScale = interpolate(age, [0, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        ...styles.trustItem,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          ...styles.trustDot,
          transform: `scale(${dotScale})`,
        }}
      />
      <span>{text}</span>
    </div>
  );
};

const BrandCard: React.FC<{frame: number}> = ({frame}) => {
  const {fps} = useVideoConfig();
  const enter = spring({
    frame: Math.max(0, frame - 56),
    fps,
    config: {damping: 30, stiffness: 78, mass: 1},
  });
  const opacity = interpolate(enter, [0, 0.34], [0, 1]);
  const y = interpolate(enter, [0, 1], [52, 0]);
  const scale = interpolate(enter, [0, 1], [0.9, 1]);
  const glow = interpolate(frame, [108, 188, 300], [0.14, 0.38, 0.24], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scanLine = interpolate(frame, [76, 198], [-22, 178], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ctaOpacity = interpolate(frame, [78, 106], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ctaY = interpolate(frame, [78, 106], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        ...styles.brandCard,
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        filter: `drop-shadow(0 30px 70px rgba(18, 78, 120, ${glow}))`,
      }}
    >
      <div style={styles.scanPanel}>
        <div style={styles.qrMark}>
          <Img src={sperowQrImage} style={styles.qrImage} />
          <div
            style={{
              ...styles.scanLine,
              transform: `translateY(${scanLine}px)`,
            }}
          />
        </div>

        <div
          style={{
            ...styles.ctaBlock,
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px)`,
          }}
        >
          <div style={styles.cardTopline}>Your Surgical Care Partner</div>
          <div style={styles.ctaTitle}>Scan to Enquire</div>
          <div style={styles.ctaSubtitle}>Privacy · Terms</div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  stage: {
    backgroundColor: colors.offWhite,
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
      'linear-gradient(135deg, #FFFFFF 0%, #F8F6F1 48%, #EEF4F2 100%)',
  },
  primaryOrb: {
    position: 'absolute',
    width: 920,
    height: 920,
    borderRadius: 999,
    right: -240,
    top: -260,
    background: 'rgba(18, 78, 120, 0.2)',
    filter: 'blur(120px)',
    willChange: 'transform',
  },
  goldOrb: {
    position: 'absolute',
    width: 660,
    height: 660,
    borderRadius: 999,
    left: -210,
    bottom: -220,
    background: 'rgba(185, 154, 108, 0.16)',
    filter: 'blur(105px)',
    willChange: 'transform',
  },
  lineTexture: {
    position: 'absolute',
    inset: 0,
    opacity: 0.34,
    backgroundImage:
      'repeating-linear-gradient(135deg, rgba(18, 78, 120, 0.07) 0px, rgba(18, 78, 120, 0.07) 1px, transparent 1px, transparent 38px)',
    maskImage: 'radial-gradient(circle at center, black 0%, black 60%, transparent 84%)',
    willChange: 'transform',
  },
  vignette: {
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(circle at center, transparent 46%, rgba(18, 78, 120, 0.07) 100%)',
  },
  scene: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '150px 70px 110px',
    textAlign: 'center',
    willChange: 'transform, opacity',
  },
  leftColumn: {
    maxWidth: 900,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 800,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    marginBottom: 22,
  },
  wordmarkHero: {
    color: colors.primary,
    fontSize: 112,
    fontWeight: 800,
    lineHeight: 0.92,
    marginBottom: 22,
    textShadow: '0 26px 70px rgba(18, 78, 120, 0.12)',
    willChange: 'opacity, transform, letter-spacing',
  },
  headline: {
    margin: 0,
    color: colors.ink,
    width: 820,
    maxWidth: '100%',
    fontSize: 44,
    fontWeight: 750,
    letterSpacing: '-0.015em',
    lineHeight: 1.08,
    textWrap: 'balance',
  },
  headlineAccent: {
    color: colors.primary,
  },
  headlineRule: {
    width: 520,
    height: 2,
    margin: '30px auto 0',
    borderRadius: 999,
    background:
      'linear-gradient(90deg, rgba(185, 154, 108, 0), rgba(18, 78, 120, 0.5), rgba(185, 154, 108, 0.95), rgba(185, 154, 108, 0))',
    transformOrigin: 'center',
  },
  trustStack: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 46,
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    color: colors.ink,
    fontSize: 21,
    fontWeight: 750,
    letterSpacing: '-0.01em',
    padding: '14px 22px',
    borderRadius: 999,
    border: '1px solid rgba(18, 78, 120, 0.12)',
    background: 'rgba(255, 254, 251, 0.52)',
    boxShadow: '0 16px 50px rgba(18, 78, 120, 0.06)',
    willChange: 'transform, opacity',
  },
  trustDot: {
    width: 9,
    height: 9,
    borderRadius: 999,
    background: colors.gold,
    boxShadow: '0 0 0 7px rgba(185, 154, 108, 0.13)',
    transformOrigin: 'center',
  },
  brandCard: {
    position: 'relative',
    width: 820,
    maxWidth: '100%',
    marginTop: 52,
    willChange: 'transform, opacity',
  },
  cardTopline: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: 800,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  wordmark: {
    color: colors.primary,
    fontSize: 78,
    fontWeight: 800,
    letterSpacing: '0.055em',
    lineHeight: 1,
  },
  cardCopy: {
    margin: '18px 0 0',
    color: colors.muted,
    fontSize: 18,
    fontWeight: 650,
    letterSpacing: '-0.025em',
    lineHeight: 1.2,
  },
  scanPanel: {
    display: 'grid',
    gridTemplateColumns: '220px 1fr',
    gap: 34,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '34px',
    borderRadius: 34,
    border: '1px solid rgba(18, 78, 120, 0.12)',
    background:
      'linear-gradient(135deg, rgba(255, 254, 251, 0.68) 0%, rgba(248, 246, 241, 0.48) 100%)',
    backdropFilter: 'blur(8px)',
  },
  qrMark: {
    position: 'relative',
    width: 220,
    height: 220,
    padding: 10,
    borderRadius: 30,
    background: colors.primary,
    overflow: 'hidden',
    boxShadow: '0 28px 70px rgba(18, 78, 120, 0.24)',
  },
  qrImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    display: 'block',
  },
  scanLine: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 0,
    height: 2,
    borderRadius: 999,
    background: colors.gold,
    boxShadow: '0 0 18px rgba(185, 154, 108, 0.8)',
    willChange: 'transform',
  },
  ctaBlock: {
    textAlign: 'left',
    willChange: 'transform, opacity',
  },
  ctaTitle: {
    color: colors.primary,
    fontSize: 44,
    fontWeight: 800,
    letterSpacing: '-0.07em',
    marginBottom: 10,
  },
  ctaSubtitle: {
    color: colors.muted,
    fontSize: 21,
    fontWeight: 700,
    letterSpacing: '-0.025em',
  },
};

export default FinalScene;
