// sperow-video/Journey.tsx
import React, {type CSSProperties} from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import surgeryIllustration from './src/remotion/assets/SURGERY.svg';
import journeyIllustration from './src/remotion/assets/journey.svg';

const colors = {
  background: '#F8F6F1',
  primary: '#124E78',
  ink: '#14384A',
};

const manropeFont = 'Manrope';

export const Journey: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const sceneEnter = spring({
    frame,
    fps,
    config: {damping: 26, stiffness: 78, mass: 0.95},
  });
  const focusSpring = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: {damping: 22, stiffness: 92, mass: 0.82},
  });
  const supportSpring = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: {damping: 24, stiffness: 86, mass: 0.88},
  });

  const sceneOpacity = interpolate(frame, [0, 16, 120, 150], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sceneScale = interpolate(sceneEnter, [0, 1], [0.965, 1]);
  const cameraPush = interpolate(frame, [0, 150], [1.025, 1]);

  const focusOpacity = interpolate(frame, [8, 24, 122, 150], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const focusY = interpolate(focusSpring, [0, 1], [42, 0]);
  const focusScale = interpolate(focusSpring, [0, 1], [0.92, 1]);
  const focusSpacing = interpolate(frame, [8, 46], [-0.02, -0.075], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const supportOpacity = interpolate(frame, [12, 30, 122, 150], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const supportY = interpolate(supportSpring, [0, 1], [46, 0]);
  const supportX = interpolate(supportSpring, [0, 1], [52, 0]);
  const supportScale = interpolate(supportSpring, [0, 1], [0.94, 1]);
  const supportSpacing = interpolate(frame, [12, 54], [-0.015, -0.07], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const connectorScale = interpolate(frame, [18, 62], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lineOpacity = interpolate(frame, [18, 30, 64, 76], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const accentSweep = interpolate(frame, [22, 64], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const accentOpacity = interpolate(frame, [18, 30, 64, 76], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const surgeryOpacity = interpolate(frame, [0, 18, 92, 132], [0, 0.42, 0.2, 0.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const journeyOpacity = interpolate(frame, [16, 48, 132], [0, 0.34, 0.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const imageScale = interpolate(frame, [0, 150], [1.08, 1.02]);
  const imageY = interpolate(frame, [0, 150], [28, -10]);

  return (
    <AbsoluteFill
      style={{
        ...styles.container,
        opacity: sceneOpacity,
        transform: `scale(${sceneScale})`,
      }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');`}
      </style>

      <Background
        surgeryOpacity={surgeryOpacity}
        journeyOpacity={journeyOpacity}
        frame={frame}
        imageScale={imageScale}
        imageY={imageY}
        cameraPush={cameraPush}
      />

      <div style={styles.sceneShell}>
        <div style={styles.heroStack}>
          <div
            style={{
              ...styles.focusLine,
              opacity: focusOpacity,
              letterSpacing: `${focusSpacing}em`,
              transform: `translateY(${focusY}px) scale(${focusScale})`,
            }}
          >
            Focus on <span style={styles.surgeryAccent}>Surgery.</span>
          </div>
        </div>

        <div style={styles.connectorWrap}>
          <div
            style={{
              ...styles.connectorLine,
              opacity: lineOpacity,
              transform: `scaleX(${connectorScale})`,
            }}
          />
          <div
            style={{
              ...styles.connectorDot,
              opacity: connectorScale * lineOpacity,
              transform: `translateX(${interpolate(connectorScale, [0, 1], [-280, 280])}px) scale(${connectorScale})`,
            }}
          />
        </div>

        <div
          style={{
            ...styles.supportBlock,
            opacity: supportOpacity,
            transform: `translate(${supportX}px, ${supportY}px) scale(${supportScale})`,
          }}
        >
          <div
            style={{
              ...styles.supportLine,
              letterSpacing: `${supportSpacing}em`,
            }}
          >
            We&apos;ll Support the <span style={styles.journeyAccent}>Journey.</span>
          </div>
          <div style={{...styles.cardRule, opacity: accentOpacity}}>
            <div
              style={{
                ...styles.cardRuleFill,
                transform: `scaleX(${accentSweep})`,
              }}
            />
          </div>
        </div>

        <div
          style={{
            ...styles.microCopy,
            opacity: interpolate(frame, [86, 108, 132, 150], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: `translateY(${interpolate(frame, [86, 108], [18, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}px)`,
          }}
        >
          Clinical focus stays with you. Coordination moves with SPEROW.
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Background: React.FC<{
  surgeryOpacity: number;
  journeyOpacity: number;
  frame: number;
  imageScale: number;
  imageY: number;
  cameraPush: number;
}> = ({surgeryOpacity, journeyOpacity, frame, imageScale, imageY, cameraPush}) => {
  const drift = interpolate(frame, [0, 300], [0, 1]);
  return (
    <AbsoluteFill
      style={{
        ...styles.background,
        transform: `scale(${cameraPush})`,
      }}
    >
      <Img
        src={surgeryIllustration}
        style={{
          ...styles.bgImage,
          opacity: surgeryOpacity,
          transform: `translateY(${imageY}px) scale(${imageScale})`,
        }}
      />
      <Img
        src={journeyIllustration}
        style={{
          ...styles.bgImage,
          opacity: journeyOpacity,
          transform: `translateY(${-imageY * 0.4}px) scale(${imageScale})`,
        }}
      />
      <div style={styles.gradientOverlay} />
      <div style={styles.diagonalGrid} />
      <div
        style={{
          ...styles.glowOrb,
          transform: `translate(${drift * 30}px, ${drift * 20}px)`,
        }}
      />
      <div
        style={{
          ...styles.glowOrbTwo,
          transform: `translate(${-drift * 24}px, ${drift * 18}px)`,
        }}
      />
    </AbsoluteFill>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    fontFamily: manropeFont,
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  background: {
    overflow: 'hidden',
    willChange: 'transform',
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.98) contrast(1.02) saturate(0.9)',
    willChange: 'opacity, transform',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background:
      'linear-gradient(90deg, rgba(248,246,241,0.93) 0%, rgba(248,246,241,0.72) 46%, rgba(248,246,241,0.94) 100%)',
    pointerEvents: 'none',
  },
  diagonalGrid: {
    position: 'absolute',
    inset: 64,
    border: '1px solid rgba(18, 78, 120, 0.1)',
    borderRadius: 44,
    backgroundImage:
      'repeating-linear-gradient(135deg, rgba(18, 78, 120, 0.055) 0px, rgba(18, 78, 120, 0.055) 1px, transparent 1px, transparent 32px)',
    opacity: 0.7,
  },
  glowOrb: {
    position: 'absolute',
    width: 720,
    height: 720,
    borderRadius: '50%',
    top: -240,
    right: -160,
    background: 'radial-gradient(circle, rgba(18,78,120,0.18), transparent 68%)',
    filter: 'blur(95px)',
    pointerEvents: 'none',
  },
  glowOrbTwo: {
    position: 'absolute',
    width: 620,
    height: 620,
    borderRadius: '50%',
    left: -180,
    bottom: -190,
    background: 'radial-gradient(circle, rgba(31,94,78,0.16), transparent 70%)',
    filter: 'blur(100px)',
    pointerEvents: 'none',
  },
  sceneShell: {
    position: 'absolute',
    inset: 0,
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 70px',
    textAlign: 'center',
  },
  heroStack: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  eyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    padding: '9px 22px',
    borderRadius: 999,
    border: '1px solid rgba(18, 78, 120, 0.14)',
    background: 'rgba(255, 254, 251, 0.38)',
    color: colors.primary,
    fontSize: 19,
    fontWeight: 800,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  },
  focusLine: {
    fontSize: 78,
    fontWeight: 800,
    color: colors.ink,
    lineHeight: 0.9,
    textShadow: '0 16px 36px rgba(18, 78, 120, 0.08)',
    whiteSpace: 'nowrap',
    willChange: 'opacity, transform, letter-spacing',
  },
  surgeryAccent: {
    color: colors.primary,
    fontWeight: 800,
  },
  microCopy: {
    position: 'absolute',
    bottom: 210,
    left: 0,
    right: 0,
    color: 'rgba(20, 56, 74, 0.64)',
    fontSize: 25,
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.045em',
    willChange: 'opacity, transform',
  },
  connectorWrap: {
    position: 'relative',
    width: 560,
    height: 92,
    margin: '22px 0 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectorLine: {
    width: 520,
    height: 2,
    borderRadius: 999,
    background:
      'linear-gradient(90deg, rgba(18, 78, 120, 0.04) 0%, rgba(18, 78, 120, 0.45) 48%, rgba(31, 94, 78, 0.05) 100%)',
    transformOrigin: 'left center',
    willChange: 'transform',
  },
  connectorDot: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 999,
    background: colors.primary,
    boxShadow: '0 0 0 9px rgba(18, 78, 120, 0.08), 0 0 30px rgba(18, 78, 120, 0.25)',
    willChange: 'opacity, transform',
  },
  supportBlock: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    willChange: 'opacity, transform',
  },
  cardTopline: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: 800,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  },
  supportLine: {
    color: colors.ink,
    fontSize: 66,
    fontWeight: 800,
    lineHeight: 0.92,
    textShadow: '0 18px 44px rgba(31, 94, 78, 0.1)',
    whiteSpace: 'nowrap',
  },
  journeyAccent: {
    color: '#1F5E4E',
    fontWeight: 800,
  },
  cardRule: {
    width: 560,
    height: 2,
    marginTop: 30,
    overflow: 'hidden',
    borderRadius: 999,
    background: 'rgba(18, 78, 120, 0.08)',
  },
  cardRuleFill: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    background: 'linear-gradient(270deg, rgba(18, 78, 120, 0.12), rgba(31, 94, 78, 0.72))',
    transformOrigin: 'right center',
  },
  cardFooter: {
    marginTop: 22,
    color: 'rgba(20, 56, 74, 0.58)',
    fontSize: 22,
    fontWeight: 600,
    lineHeight: 1.35,
    letterSpacing: '-0.035em',
  },
};