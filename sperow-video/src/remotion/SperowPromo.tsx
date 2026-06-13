import React, {type CSSProperties, type ReactNode} from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {Journey} from '../../Journey';
import {
  SURGICAL_JOURNEY_SCENE_DURATION,
  SurgicalJourneyScene,
} from '../../JOURNEY-1';
import {SupportingBetterSurgicalCare} from '../../Supporting Better Surgical Care';
import {FinalScene} from '../../final-scene';
import doctorsImage from './assets/Doctors-bro (2).png';
import hospitalsImage from './assets/hospitals.svg';
import surgeryImage from './assets/SURGERY.svg';

const colors = {
  background: '#F8F6F1',
  primary: '#124E78',
  secondary: '#1F5E4E',
  ink: '#14384A',
  muted: '#6F7F80',
  gold: '#B99A6C',
  white: '#FFFEFB',
  gradientStart: '#E8E4DC',
  gradientMid: '#F2EFE8',
  gradientEnd: '#F8F6F1',
};

const manropeFont = 'Manrope';
const statementDuration = 75;
const expansionStatementDuration = 105;
const growthStatementDuration = 150;
const growthSceneGap = 15;
const statementGap = 0;
const statementStep = statementDuration + statementGap;
const expansionSceneStart = statementStep * 2;
const growthSceneStart = expansionSceneStart + expansionStatementDuration + growthSceneGap;
const journeyStart = growthSceneStart + growthStatementDuration;
const journeyDuration = 150;
const surgicalJourneyStart = journeyStart + journeyDuration;
const surgicalJourneyDuration = SURGICAL_JOURNEY_SCENE_DURATION;
const supportingCareStart = surgicalJourneyStart + surgicalJourneyDuration;
const supportingCareDuration = 240;
const finalSceneStart = supportingCareStart + supportingCareDuration;
const finalSceneDuration = 300;
const fadeRange: [number, number] = [0, 15];
const holdFadeRange: [number, number] = [60, 75];

const growthPoints = [
  'Improved patient engagement',
  'Stronger follow-up continuity',
  'Greater visibility across facilities',
];

export const SperowPromo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={styles.stage}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap');`}
      </style>

      <Background frame={frame} />

      <Sequence from={0} durationInFrames={statementDuration}>
        <StatementScene>
          <BrandIntro />
        </StatementScene>
      </Sequence>

      <Sequence from={statementStep} durationInFrames={statementDuration}>
        <SurgeonPlatformIntro />
      </Sequence>

      <Sequence from={expansionSceneStart} durationInFrames={expansionStatementDuration}>
        <PracticeExpansionIntro />
      </Sequence>

      <Sequence from={growthSceneStart} durationInFrames={growthStatementDuration}>
        <StatementScene exitRange={[138, 150]}>
          <GrowthPoints />
        </StatementScene>
      </Sequence>

      <Sequence from={journeyStart} durationInFrames={journeyDuration}>
        <Journey />
      </Sequence>

      <Sequence from={surgicalJourneyStart} durationInFrames={surgicalJourneyDuration}>
        <SurgicalJourneyScene />
      </Sequence>

      <Sequence from={supportingCareStart} durationInFrames={supportingCareDuration}>
        <SupportingBetterSurgicalCare />
      </Sequence>

      <Sequence from={finalSceneStart} durationInFrames={finalSceneDuration}>
        <FinalScene />
      </Sequence>
    </AbsoluteFill>
  );
};

const Background = ({frame}: {frame: number}) => {
  const progress = frame / 750;
  const wave = Math.sin(progress * Math.PI * 6);
  const counterWave = Math.cos(progress * Math.PI * 5);
  const slowWave = Math.sin(progress * Math.PI * 3);

  return (
    <AbsoluteFill style={styles.background}>
      <div style={styles.baseGradient} />
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
      <div style={styles.gridPattern} />
      <div style={styles.softGrid} />
    </AbsoluteFill>
  );
};

const UnderlineShootingStar = ({frame}: {frame: number}) => {
  const opacity = interpolate(frame, [8, 16, 66, 75], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lineScale = interpolate(frame, [12, 34], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const starX = interpolate(frame, [12, 75], [-82, 650], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{...styles.underlineWrap, opacity}}>
      <div
        style={{
          ...styles.underlineBase,
          transform: `scaleX(${lineScale})`,
        }}
      />
      <div
        style={{
          ...styles.underlineStar,
          transform: `translateX(${starX}px)`,
        }}
      >
        <div style={styles.underlineStarTail} />
        <div style={styles.underlineStarCore} />
      </div>
    </div>
  );
};

const StatementScene = ({
  children,
  exitRange = holdFadeRange,
  showUnderline = false,
}: {
  children: ReactNode;
  exitRange?: [number, number];
  showUnderline?: boolean;
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({
    frame,
    fps,
    config: {damping: 24, stiffness: 92, mass: 0.85},
  });
  const opacityIn = interpolate(frame, fadeRange, [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacityOut = interpolate(frame, exitRange, [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(enter, [0, 1], [34, 0]);

  return (
    <AbsoluteFill style={styles.centerScene}>
      <div style={{...styles.statementWrap, opacity: opacityIn * opacityOut, transform: `translateY(${y}px)`}}>
        <div style={styles.statement}>{children}</div>
        {showUnderline ? <UnderlineShootingStar frame={frame} /> : null}
      </div>
    </AbsoluteFill>
  );
};

const BrandIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const wordmarkSpring = spring({
    frame,
    fps,
    config: {damping: 24, stiffness: 76, mass: 1},
  });
  const wordmarkOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const wordmarkY = interpolate(wordmarkSpring, [0, 1], [42, 0]);
  const wordmarkScale = interpolate(wordmarkSpring, [0, 1], [0.76, 1]);
  const wordmarkSpacing = interpolate(frame, [0, 38], [0.28, 0.075], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const taglineSpring = spring({
    frame: Math.max(0, frame - 22),
    fps,
    config: {damping: 26, stiffness: 88, mass: 0.9},
  });
  const taglineOpacity = interpolate(frame, [22, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const taglineY = interpolate(taglineSpring, [0, 1], [24, 0]);
  const ruleScale = interpolate(frame, [32, 62], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const glowOpacity = interpolate(frame, [0, 28, 75], [0, 0.42, 0.18], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={styles.brandIntroWrap}>
      <div style={{...styles.brandIntroGlow, opacity: glowOpacity}} />
      <div
        style={{
          ...styles.brandIntroWordmark,
          opacity: wordmarkOpacity,
          letterSpacing: `${wordmarkSpacing}em`,
          transform: `translateY(${wordmarkY}px) scale(${wordmarkScale})`,
        }}
      >
        SPEROW
      </div>
      <div
        style={{
          ...styles.brandIntroRule,
          transform: `scaleX(${ruleScale})`,
        }}
      />
      <div
        style={{
          ...styles.brandIntroTagline,
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
        }}
      >
        Your Surgical Care Partner
      </div>
    </div>
  );
};

const SurgeonPlatformIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const badgeSpring = spring({
    frame,
    fps,
    config: {damping: 24, stiffness: 96, mass: 0.8},
  });
  const badgeOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const badgeY = interpolate(badgeSpring, [0, 1], [28, 0]);
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.92, 1]);

  const titleSpring = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: {damping: 26, stiffness: 82, mass: 0.9},
  });
  const titleOpacity = interpolate(frame, [12, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(titleSpring, [0, 1], [56, 0]);
  const titleScale = interpolate(titleSpring, [0, 1], [0.9, 1]);
  const titleSpacing = interpolate(frame, [12, 42], [-0.025, -0.075], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const accentScale = interpolate(frame, [30, 58], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const glowOpacity = interpolate(frame, [10, 36, 70], [0, 0.5, 0.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const imageOpacity = interpolate(frame, [0, 22, 62, 75], [0, 0.22, 0.22, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const imageScale = interpolate(frame, [0, 75], [1.08, 1.02], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const imageY = interpolate(frame, [0, 75], [28, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={styles.platformWrap}>
      <Img
        src={doctorsImage}
        style={{
          ...styles.platformBgImage,
          opacity: imageOpacity,
          transform: `translateY(${imageY}px) scale(${imageScale})`,
        }}
      />
      <div style={{...styles.platformImageVeil, opacity: imageOpacity > 0 ? 1 : 0}} />
      <div
        style={{
          ...styles.platformGlow,
          opacity: glowOpacity,
        }}
      />
      <div
        style={{
          ...styles.surgeonBadge,
          opacity: badgeOpacity,
          transform: `translateY(${badgeY}px) scale(${badgeScale})`,
        }}
      >
        <span style={styles.badgeDot} />
        For Surgeons
      </div>

      <div
        style={{
          ...styles.platformTitle,
          opacity: titleOpacity,
          letterSpacing: `${titleSpacing}em`,
          transform: `translateY(${titleY}px) scale(${titleScale})`,
        }}
      >
        Practice Growth <span style={styles.platformTitleAccent}>Platform</span>
      </div>

      <div
        style={{
          ...styles.platformUnderline,
          transform: `scaleX(${accentScale})`,
        }}
      />
    </div>
  );
};

const PracticeExpansionIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const extend = useWordReveal(frame, 0);
  const practice = useWordReveal(frame, 12);
  const hospitalsStart = 38;
  const hospitals = useWordReveal(frame, hospitalsStart);
  const sweepScale = interpolate(frame, [hospitalsStart + 8, hospitalsStart + 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitOpacity = interpolate(frame, [90, 105], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitY = interpolate(frame, [90, 105], [0, -24], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const glowOpacity = interpolate(frame, [0, 24, 105], [0, 0.42, 0.16], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const surgeryImageOpacity = interpolate(frame, [12, 26, hospitalsStart + 12, hospitalsStart + 26], [0, 0.38, 0.14, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const surgeryImageScale = interpolate(frame, [12, 105], [1.08, 1.02], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const surgeryImageY = interpolate(frame, [12, 105], [34, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const hospitalsImageOpacity = interpolate(frame, [hospitalsStart, hospitalsStart + 14, 90, 105], [0, 0.42, 0.42, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const hospitalsImageScale = interpolate(frame, [hospitalsStart, 105], [1.08, 1.02], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const hospitalsImageY = interpolate(frame, [hospitalsStart, 105], [34, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={styles.expansionWrap}>
      <Img
        src={surgeryImage}
        style={{
          ...styles.expansionBgImage,
          opacity: surgeryImageOpacity,
          transform: `translateY(${surgeryImageY}px) scale(${surgeryImageScale})`,
        }}
      />
      <Img
        src={hospitalsImage}
        style={{
          ...styles.expansionBgImage,
          opacity: hospitalsImageOpacity,
          transform: `translateY(${hospitalsImageY}px) scale(${hospitalsImageScale})`,
        }}
      />
      <div style={{...styles.expansionImageVeil, opacity: Math.max(surgeryImageOpacity, hospitalsImageOpacity) > 0 ? 1 : 0}} />
      <div style={{...styles.expansionGlow, opacity: glowOpacity}} />
      <div
        style={{
          ...styles.expansionLine,
          opacity: exitOpacity,
          transform: `translateY(${exitY}px)`,
        }}
      >
        <div style={styles.expansionTopLine}>
          <span
            style={{
              ...styles.extendWord,
              opacity: extend.opacity,
              letterSpacing: `${extend.letterSpacing}em`,
              transform: `translateY(${extend.y}px) scale(${extend.scale})`,
            }}
          >
            Extend
          </span>

          <span
            style={{
              ...styles.practiceWords,
              opacity: practice.opacity,
              letterSpacing: `${practice.letterSpacing}em`,
              transform: `translateY(${practice.y}px) scale(${practice.scale})`,
            }}
          >
            Your Surgical Practice
          </span>
        </div>

        <span
          style={{
            ...styles.hospitalsWord,
            opacity: hospitals.opacity,
            letterSpacing: `${hospitals.letterSpacing}em`,
            transform: `translateY(${hospitals.y}px) scale(${hospitals.scale})`,
          }}
        >
          Across Hospitals
        </span>
      </div>

      <div
        style={{
          ...styles.expansionSweep,
          opacity: exitOpacity,
          transform: `scaleX(${sweepScale})`,
        }}
      />
    </div>
  );
};

const useWordReveal = (frame: number, start: number) => {
  const {fps} = useVideoConfig();
  const age = Math.max(0, frame - start);
  const enter = spring({
    frame: age,
    fps,
    config: {damping: 20, stiffness: 108, mass: 0.78},
  });

  return {
    opacity: interpolate(age, [0, 8], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    y: interpolate(enter, [0, 1], [44, 0]),
    scale: interpolate(enter, [0, 1], [0.9, 1]),
    letterSpacing: interpolate(age, [0, 20], [-0.025, -0.075], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  };
};

const GrowthPoints: React.FC = () => {
  const frame = useCurrentFrame();
  const grow = useWordReveal(frame, 0);
  const surgicalPractice = useWordReveal(frame, 10);
  const withWord = useWordReveal(frame, 22);
  const exitOpacity = interpolate(frame, [132, 148], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitY = interpolate(frame, [132, 148], [0, -24], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        ...styles.growthWrap,
        opacity: exitOpacity,
        transform: `translateY(${exitY}px)`,
      }}
    >
      <div style={styles.growthHeadlineLine}>
        <span
          style={{
            ...styles.growthHeadlineWord,
            opacity: grow.opacity,
            letterSpacing: `${grow.letterSpacing}em`,
            transform: `translateY(${grow.y}px) scale(${grow.scale})`,
          }}
        >
          Grow
        </span>
        <span
          style={{
            ...styles.growthHeadlinePractice,
            opacity: surgicalPractice.opacity,
            letterSpacing: `${surgicalPractice.letterSpacing}em`,
            transform: `translateY(${surgicalPractice.y}px) scale(${surgicalPractice.scale})`,
          }}
        >
          your surgical practice
        </span>
        <span
          style={{
            ...styles.growthHeadlineWord,
            opacity: withWord.opacity,
            letterSpacing: `${withWord.letterSpacing}em`,
            transform: `translateY(${withWord.y}px) scale(${withWord.scale})`,
          }}
        >
          with
        </span>
      </div>

      <div style={styles.growthPointList}>
        {growthPoints.map((point, index) => (
          <GrowthPoint key={point} point={point} index={index} />
        ))}
      </div>
    </div>
  );
};

const GrowthPoint: React.FC<{point: string; index: number}> = ({point, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const start = 52 + index * 24;
  const age = Math.max(0, frame - start);
  const enter = spring({
    frame: age,
    fps,
    config: {damping: 22, stiffness: 92, mass: 0.85},
  });
  const opacity = interpolate(age, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(enter, [0, 1], [34, 0]);
  const scale = interpolate(enter, [0, 1], [0.96, 1]);
  const lineScale = interpolate(age, [8, 26], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        ...styles.growthPoint,
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
      }}
    >
      <span style={styles.growthNumber}>{String(index + 1).padStart(2, '0')}</span>
      <span style={styles.growthText}>{point}</span>
      <span
        style={{
          ...styles.growthLine,
          transform: `scaleX(${lineScale})`,
        }}
      />
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  stage: {
    backgroundColor: colors.background,
    color: colors.ink,
    fontFamily: manropeFont,
    overflow: 'hidden',
  },
  background: {
    overflow: 'hidden',
  },
  baseGradient: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(135deg, #FFFFFF 0%, #F8F6F1 46%, #EEF4F2 100%)',
  },
  gridPattern: {
    position: 'absolute',
    inset: 0,
    opacity: 0.46,
    backgroundImage:
      'repeating-linear-gradient(135deg, rgba(18, 78, 120, 0.08) 0px, rgba(18, 78, 120, 0.08) 1px, transparent 1px, transparent 34px)',
    maskImage: 'radial-gradient(circle at center, black 0%, black 62%, transparent 86%)',
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
  softGrid: {
    position: 'absolute',
    inset: 70,
    border: '1px solid rgba(18, 78, 120, 0.12)',
    borderRadius: 44,
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.7)',
  },
  underlineWrap: {
    position: 'relative',
    width: 650,
    height: 22,
    marginTop: 26,
    overflow: 'visible',
    pointerEvents: 'none',
  },
  underlineBase: {
    position: 'absolute',
    left: 0,
    top: 10,
    width: 650,
    height: 3,
    borderRadius: 999,
    background:
      'linear-gradient(90deg, rgba(18, 78, 120, 0.08) 0%, rgba(18, 78, 120, 0.5) 52%, rgba(18, 78, 120, 0.08) 100%)',
    transformOrigin: 'left center',
  },
  underlineStar: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 82,
    height: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    filter: 'drop-shadow(0 0 14px rgba(18, 78, 120, 0.22))',
    willChange: 'transform',
  },
  underlineStarTail: {
    width: 72,
    height: 2,
    borderRadius: 999,
    background:
      'linear-gradient(90deg, transparent 0%, rgba(18, 78, 120, 0.2) 28%, rgba(18, 78, 120, 0.72) 100%)',
  },
  underlineStarCore: {
    width: 9,
    height: 9,
    marginLeft: -1,
    borderRadius: 999,
    background: colors.primary,
    boxShadow:
      '0 0 0 5px rgba(18, 78, 120, 0.08), 0 0 24px rgba(18, 78, 120, 0.32)',
  },
  centerScene: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 84,
    paddingRight: 84,
    textAlign: 'center',
  },
  statementWrap: {
    width: '100%',
    maxWidth: 1320,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statement: {
    margin: 0,
    color: colors.ink,
    fontSize: 116,
    lineHeight: 0.98,
    letterSpacing: '-0.075em',
    fontWeight: 500,
    whiteSpace: 'nowrap', // ✅ ensures every statement stays on one line
  },
  brandIntroWrap: {
    position: 'relative',
    width: 1120,
    maxWidth: '100%',
    minHeight: 360,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandIntroGlow: {
    position: 'absolute',
    width: 760,
    height: 320,
    borderRadius: 999,
    background:
      'radial-gradient(circle at center, rgba(18, 78, 120, 0.22), rgba(185, 154, 108, 0.10), transparent 70%)',
    filter: 'blur(70px)',
    pointerEvents: 'none',
  },
  brandIntroWordmark: {
    position: 'relative',
    zIndex: 1,
    color: colors.primary,
    fontSize: 128,
    fontWeight: 850,
    lineHeight: 0.86,
    textShadow: '0 28px 80px rgba(18, 78, 120, 0.18)',
    willChange: 'transform, opacity, letter-spacing',
  },
  brandIntroRule: {
    position: 'relative',
    zIndex: 1,
    width: 420,
    height: 3,
    marginTop: 32,
    borderRadius: 999,
    background:
      'linear-gradient(90deg, transparent, rgba(185, 154, 108, 0.92), rgba(18, 78, 120, 0.35), transparent)',
    transformOrigin: 'center',
  },
  brandIntroTagline: {
    position: 'relative',
    zIndex: 1,
    marginTop: 28,
    color: colors.ink,
    fontSize: 44,
    fontWeight: 650,
    lineHeight: 1,
    letterSpacing: '-0.04em',
    willChange: 'transform, opacity',
  },
  platformWrap: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  platformBgImage: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'saturate(0.88) contrast(0.94)',
    willChange: 'transform, opacity',
    pointerEvents: 'none',
  },
  platformImageVeil: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(180deg, rgba(248, 246, 241, 0.86) 0%, rgba(248, 246, 241, 0.62) 45%, rgba(248, 246, 241, 0.9) 100%)',
    pointerEvents: 'none',
  },
  platformGlow: {
    position: 'absolute',
    width: 720,
    height: 300,
    borderRadius: 999,
    background:
      'radial-gradient(circle at center, rgba(18, 78, 120, 0.18), rgba(14, 116, 144, 0.08), transparent 70%)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  surgeonBadge: {
    position: 'relative',
    zIndex: 1,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 13,
    padding: '14px 24px',
    borderRadius: 999,
    background: 'rgba(255, 254, 251, 0.78)',
    border: '1px solid rgba(18, 78, 120, 0.14)',
    boxShadow: '0 18px 50px rgba(18, 78, 120, 0.08)',
    color: colors.primary,
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: '0.11em',
    textTransform: 'uppercase',
    willChange: 'transform, opacity',
  },
  badgeDot: {
    width: 9,
    height: 9,
    borderRadius: 999,
    background: colors.gold,
    boxShadow: '0 0 0 7px rgba(185, 154, 108, 0.12)',
  },
  platformTitle: {
    position: 'relative',
    zIndex: 1,
    marginTop: 34,
    color: colors.ink,
    fontSize: 76,
    fontWeight: 780,
    lineHeight: 0.9,
    whiteSpace: 'nowrap',
    textShadow: '0 20px 70px rgba(18, 78, 120, 0.10)',
    willChange: 'transform, opacity, letter-spacing',
  },
  platformTitleAccent: {
    color: colors.primary,
  },
  platformUnderline: {
    position: 'relative',
    zIndex: 1,
    width: 420,
    height: 3,
    marginTop: 32,
    borderRadius: 999,
    background:
      'linear-gradient(90deg, transparent, rgba(185, 154, 108, 0.9), rgba(18, 78, 120, 0.32), transparent)',
    transformOrigin: 'center',
  },
  expansionWrap: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  expansionBgImage: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'saturate(0.88) contrast(0.94)',
    willChange: 'transform, opacity',
    pointerEvents: 'none',
  },
  expansionImageVeil: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(180deg, rgba(248, 246, 241, 0.88) 0%, rgba(248, 246, 241, 0.62) 46%, rgba(248, 246, 241, 0.9) 100%)',
    pointerEvents: 'none',
  },
  expansionLine: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 72,
    width: '100%',
    padding: '0 70px',
    whiteSpace: 'normal',
  },
  expansionGlow: {
    position: 'absolute',
    width: 840,
    height: 340,
    borderRadius: 999,
    background:
      'radial-gradient(circle at center, rgba(31, 94, 78, 0.18), rgba(18, 78, 120, 0.10), transparent 72%)',
    filter: 'blur(70px)',
    pointerEvents: 'none',
  },
  extendWord: {
    position: 'relative',
    zIndex: 1,
    color: colors.ink,
    fontSize: 72,
    fontWeight: 800,
    lineHeight: 0.9,
    whiteSpace: 'nowrap',
    textShadow: '0 20px 70px rgba(18, 78, 120, 0.10)',
    willChange: 'transform, opacity, letter-spacing',
  },
  practiceWords: {
    position: 'relative',
    zIndex: 1,
    color: colors.ink,
    fontSize: 72,
    fontWeight: 800,
    lineHeight: 0.9,
    whiteSpace: 'nowrap',
    textShadow: '0 20px 70px rgba(18, 78, 120, 0.10)',
    willChange: 'transform, opacity, letter-spacing',
  },
  hospitalsWord: {
    position: 'relative',
    zIndex: 1,
    color: colors.secondary,
    fontSize: 72,
    fontWeight: 800,
    lineHeight: 0.9,
    whiteSpace: 'nowrap',
    willChange: 'transform, opacity, letter-spacing',
  },
  expansionSweep: {
    position: 'relative',
    zIndex: 1,
    width: 560,
    height: 2,
    marginTop: -52,
    borderRadius: 999,
    background:
      'linear-gradient(90deg, transparent, rgba(185, 154, 108, 0.9), rgba(31, 94, 78, 0.38), transparent)',
    transformOrigin: 'center',
  },
  expansionTopLine: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
    whiteSpace: 'nowrap',
  },
  growthWrap: {
    width: 960,
    maxWidth: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  growthHeadlineLine: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 16,
    width: '100%',
    marginBottom: 46,
    whiteSpace: 'nowrap',
  },
  growthHeadlineWord: {
    color: colors.ink,
    fontSize: 46,
    fontWeight: 820,
    lineHeight: 1,
    textShadow: '0 18px 60px rgba(18, 78, 120, 0.08)',
    willChange: 'transform, opacity, letter-spacing',
  },
  growthHeadlinePractice: {
    color: colors.primary,
    fontSize: 46,
    fontWeight: 840,
    lineHeight: 1,
    textShadow: '0 18px 60px rgba(18, 78, 120, 0.10)',
    willChange: 'transform, opacity, letter-spacing',
  },
  growthPointList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  growthPoint: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '100px 1fr',
    alignItems: 'center',
    gap: 22,
    padding: '22px 0 26px',
    textAlign: 'left',
    willChange: 'transform, opacity',
  },
  growthNumber: {
    color: colors.gold,
    fontSize: 34,
    fontWeight: 800,
    letterSpacing: '-0.04em',
    fontVariantNumeric: 'tabular-nums',
  },
  growthText: {
    color: colors.primary,
    fontSize: 46,
    fontWeight: 820,
    letterSpacing: '-0.055em',
    lineHeight: 1.02,
  },
  growthLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    borderRadius: 999,
    background:
      'linear-gradient(90deg, rgba(185, 154, 108, 0.78), rgba(18, 78, 120, 0.18), transparent)',
    transformOrigin: 'left center',
  },
};