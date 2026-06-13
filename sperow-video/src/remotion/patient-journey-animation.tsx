import React, {type CSSProperties, memo} from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from 'remotion';
import surgeryIllustration from './assets/SURGERY.svg';
import healthInsuranceImage from './assets/journey.svg';
import consultationImage from './assets/consultation.svg';
import surgeryPlanningImage from './assets/surgery-planning.svg';
import recoveryImage from './assets/recovery.svg';
import followUpImage from './assets/follow-up.svg';

const colors = {
  background: '#F8F6F1',
  primary: '#124E78',
  teal: '#0E7490',
  gold: '#B99A6C',
  ink: '#14384A',
  muted: '#6F7F80',
  white: '#FFFEFB',
  lightBlue: 'rgba(18, 78, 120, 0.08)',
  lightTeal: 'rgba(14, 116, 144, 0.06)',
};

const timelineSteps = [
  { label: 'Consultation Tracking', description: '', delay: 0, bgImage: consultationImage },
  { label: 'Surgery Scheduling', description: '', delay: 40, bgImage: surgeryPlanningImage },
  { label: 'Recovery Communication', description: '', delay: 80, bgImage: recoveryImage },
  { label: 'Follow-Up Management', description: '', delay: 120, bgImage: followUpImage },
];

const nodePositions = [180, 330, 480, 630];
const SCENE_2_DURATION = 180;
const TIMELINE_START_FRAME = SCENE_2_DURATION + 10;
const TIMELINE_DURATION = 300;
const MESSAGE_START_FRAME = TIMELINE_START_FRAME + TIMELINE_DURATION + 10;

export const PatientJourney: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const timelineOpacity = spring({
    frame: frame - TIMELINE_START_FRAME,
    fps,
    config: {damping: 30, stiffness: 70},
  });

  return (
    <AbsoluteFill style={styles.container}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');`}</style>
      <Background frame={frame} />
      <Particles frame={frame} />

      <Sequence from={0} durationInFrames={SCENE_2_DURATION}>
        <SurgeonHeroScene />
      </Sequence>

      <Sequence from={TIMELINE_START_FRAME} durationInFrames={TIMELINE_DURATION}>
        <TimelineSection />
      </Sequence>

      <Sequence from={MESSAGE_START_FRAME}>
        <MessageSequence />
      </Sequence>
    </AbsoluteFill>
  );
};

const TimelineSection: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const headingSpring = spring({ frame, fps, config: { damping: 28, stiffness: 65, mass: 1.2 } });
  const headingOpacity = interpolate(headingSpring, [0, 0.4, 1], [0, 0.8, 1], { easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  const headingY = interpolate(headingSpring, [0, 1], [50, 0], { easing: Easing.bezier(0.25, 0.1, 0.25, 1) });

  const captionSpring = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 28, stiffness: 65, mass: 1.1 } });
  const captionOpacity = interpolate(captionSpring, [0, 0.5, 1], [0, 0.5, 0.7], { easing: Easing.bezier(0.25, 0.1, 0.25, 1) });

  const lineProgress = interpolate(frame, [20, 280], [0, 100], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.bezier(0.33, 0.66, 0.66, 1),
  });

  // Optimized crossfade - use direct index without nested conditions
  const currentIndex = lineProgress < 25 ? 0 : lineProgress < 50 ? 1 : lineProgress < 75 ? 2 : 3;
  const nextIndex = Math.min(currentIndex + 1, timelineSteps.length - 1);
  let crossfadeProgress = 0;
  const mod = lineProgress % 20;
  if (mod >= 18 && mod < 22) crossfadeProgress = (mod - 18) / 4;
  crossfadeProgress = Math.min(Math.max(crossfadeProgress, 0), 1);
  const smoothCrossfade = Easing.bezier(0.25, 0.1, 0.25, 1)(crossfadeProgress);

  const baseBgOpacity = interpolate(frame, [20, 60, 260, 290], [0, 0.38, 0.38, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.bezier(0.33, 0.66, 0.66, 1),
  });

  return (
    <AbsoluteFill style={styles.timelineSection}>
      <Img src={timelineSteps[currentIndex].bgImage} style={{ ...styles.timelineBgImage, opacity: baseBgOpacity * (1 - smoothCrossfade) }} />
      {smoothCrossfade > 0.01 && currentIndex !== nextIndex && (
        <Img src={timelineSteps[nextIndex].bgImage} style={{ ...styles.timelineBgImage, opacity: baseBgOpacity * smoothCrossfade }} />
      )}
      <div style={styles.timelineOverlay} />

      <div style={{ ...styles.headingContainer, opacity: headingOpacity, transform: `translateY(${headingY}px)` }}>
        <h1 style={styles.mainHeading}>Strengthening Patient Engagement</h1>
        <p style={{ ...styles.caption, opacity: captionOpacity }}>We ensure every interaction is coordinated from initial consultation to final recovery.</p>
      </div>

      <div style={styles.timelineWrapper}>
        <div style={styles.timelineInner}>
          <div style={styles.lineOuter}>
            <div style={styles.lineBase} />
            <div style={{ ...styles.lineProgress, height: `${lineProgress}%` }} />
            <div style={{ ...styles.lineGlow, opacity: interpolate(lineProgress, [0, 15, 85, 100], [0, 0.6, 0.6, 0], { easing: Easing.bezier(0.25, 0.1, 0.25, 1) }) }} />
          </div>
          {timelineSteps.map((step, index) => (
            <TimelineNodeMemoized
              key={step.label}
              label={step.label}
              description={step.description}
              index={index}
              delay={step.delay}
              isLast={index === timelineSteps.length - 1}
              lineProgress={lineProgress}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Memoized node to prevent unnecessary re-renders
const TimelineNode: React.FC<{
  label: string; description: string; index: number; delay: number; isLast: boolean; lineProgress: number;
}> = ({ label, description, index, delay, isLast, lineProgress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nodeProgressThreshold = (index + 1) * 20;
  const shouldShow = lineProgress >= nodeProgressThreshold - 10;
  const appearFrame = shouldShow ? Math.max(0, frame - delay) : 0;

  const appearProgress = spring({ frame: appearFrame, fps, config: { damping: 26, stiffness: 80, mass: 1.1 } });
  const textProgress = spring({ frame: Math.max(0, appearFrame - 5), fps, config: { damping: 28, stiffness: 75, mass: 1 } });
  const descProgress = spring({ frame: Math.max(0, appearFrame - 12), fps, config: { damping: 28, stiffness: 75, mass: 1 } });
  const glowProgress = spring({ frame: Math.max(0, appearFrame - 8), fps, config: { damping: 22, stiffness: 65, mass: 1.2 } });
  const connectorProgress = spring({ frame: Math.max(0, appearFrame - 10), fps, config: { damping: 24, stiffness: 70, mass: 1.1 } });

  const nodeScale = appearProgress;
  const labelOpacity = textProgress;
  const labelX = 25 - textProgress * 25;
  const descOpacity = descProgress * 0.65;
  const glowOpacity = glowProgress * 0.5;

  // Subtle pulse only when fully visible
  const pulseScale = 1 + Math.sin(frame * 0.08) * (appearProgress > 0.9 ? 0.03 : 0);

  return (
    <div style={{ ...styles.nodeWrapper, top: nodePositions[index] }}>
      <div style={styles.nodeContainer}>
        <div style={{ ...styles.nodeOuter, transform: `scale(${shouldShow ? nodeScale * pulseScale : 0})` }}>
          <div style={{ ...styles.nodeGlow, opacity: shouldShow ? glowOpacity : 0 }} />
          <div style={{ ...styles.nodeInner, transform: `scale(${shouldShow ? 0.7 + nodeScale * 0.3 : 0})` }} />
        </div>
      </div>
      <div style={{ ...styles.nodeLabelContainer, opacity: shouldShow ? labelOpacity : 0, transform: `translateX(${shouldShow ? labelX : 25}px)` }}>
        <div style={styles.nodeLabel}>{label}</div>
        <div style={{ ...styles.nodeDescription, opacity: shouldShow ? descOpacity : 0 }}>{description}</div>
      </div>
      {!isLast && shouldShow && connectorProgress > 0.05 && (
        <div style={{ ...styles.verticalConnector, height: (nodePositions[index + 1] - nodePositions[index] - 30) * connectorProgress, opacity: labelOpacity * 0.35 }} />
      )}
    </div>
  );
};
const TimelineNodeMemoized = memo(TimelineNode);

const MessageSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phase1Spring = spring({ frame, fps, config: { damping: 28, stiffness: 65, mass: 1.2 } });
  const phase1Opacity = interpolate(phase1Spring, [0, 0.3, 0.7, 1], [0, 1, 1, 0], { easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  const phase1Y = interpolate(phase1Spring, [0, 0.35], [50, 0], { easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  const wordmarkGlow = interpolate(phase1Spring, [0.1, 0.35, 0.65], [0, 1, 0.4], { easing: Easing.bezier(0.25, 0.1, 0.25, 1) });

  const phase2Spring = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 28, stiffness: 65, mass: 1.2 } });
  const phase2Opacity = interpolate(phase2Spring, [0, 0.3, 0.7, 1], [0, 1, 1, 0], { easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  const phase2Y = interpolate(phase2Spring, [0, 0.35], [50, 0], { easing: Easing.bezier(0.25, 0.1, 0.25, 1) });

  const phase3Spring = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 28, stiffness: 65, mass: 1.2 } });
  const phase3Opacity = interpolate(phase3Spring, [0, 0.35, 1], [0, 1, 1], { easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  const phase3Y = interpolate(phase3Spring, [0, 0.35], [50, 0], { easing: Easing.bezier(0.25, 0.1, 0.25, 1) });

  return (
    <AbsoluteFill style={styles.messageContainer}>
      <div style={{ ...styles.messageWrapper, opacity: phase1Opacity, transform: `translateY(${phase1Y}px)` }}>
        <div style={styles.supportingText}>SPEROW</div>
        <div style={{ ...styles.wordmark, textShadow: wordmarkGlow > 0.05 ? `0 0 ${wordmarkGlow * 30}px ${colors.gold}` : 'none' }}>SPEROW</div>
      </div>
      <div style={{ ...styles.messageWrapper, opacity: phase2Opacity, transform: `translateY(${phase2Y}px)` }}>
        <div style={styles.tagline}>Focus on Surgery. <span style={styles.taglineAccent}>We&apos;ll Support the Journey.</span></div>
      </div>
      <div style={{ ...styles.messageWrapper, opacity: phase3Opacity, transform: `translateY(${phase3Y}px)` }}>
        <div style={styles.finalMessage}>Interested in Learning More?</div>
      </div>
    </AbsoluteFill>
  );
};

const SurgeonHeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const surgerySpring = spring({ frame, fps, config: { damping: 26, stiffness: 70, mass: 1.1 } });
  const surgeryOpacity = interpolate(surgerySpring, [0, 0.25, 0.55, 0.75], [0, 0.42, 0.45, 0], { easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  const healthSpring = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 26, stiffness: 70, mass: 1.1 } });
  const healthOpacity = interpolate(healthSpring, [0, 0.25, 0.9], [0, 0.42, 0.42], { easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  const svgScale = interpolate(surgerySpring, [0, 0.35], [1.1, 1], { easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  const healthScale = interpolate(healthSpring, [0, 0.35], [1.1, 1], { easing: Easing.bezier(0.25, 0.1, 0.25, 1) });

  const line1Spring = spring({ frame, fps, config: { damping: 28, stiffness: 80, mass: 1 } });
  const line1Opacity = interpolate(line1Spring, [0, 0.2, 0.65, 0.85], [0, 1, 1, 0], { easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  const line1Y = interpolate(line1Spring, [0, 0.25], [60, 0], { easing: Easing.bezier(0.25, 0.1, 0.25, 1) });

  const line2Spring = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 28, stiffness: 80, mass: 1 } });
  const line2Opacity = interpolate(line2Spring, [0, 0.25, 0.9], [0, 1, 0], { easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  const line2Y = interpolate(line2Spring, [0, 0.25], [60, 0], { easing: Easing.bezier(0.25, 0.1, 0.25, 1) });

  return (
    <AbsoluteFill style={styles.surgeonContainer}>
      <Img src={surgeryIllustration} style={{ ...styles.fullPageImage, opacity: surgeryOpacity, transform: `scale(${svgScale})` }} />
      <Img src={healthInsuranceImage} style={{ ...styles.fullPageImage, opacity: healthOpacity, transform: `scale(${healthScale})` }} />
      <div style={styles.overlayLighter} />
      <div style={{ ...styles.surgeonTextWrapper, opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}>
        <div style={styles.surgeonLine1}>Focus on <span style={styles.surgeonAccent}>Surgery.</span></div>
      </div>
      <div style={{ ...styles.surgeonTextWrapper, opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}>
        <div style={styles.surgeonLine2}>We&apos;ll Support the <span style={styles.surgeonAccent}>Journey.</span></div>
      </div>
    </AbsoluteFill>
  );
};

const Background: React.FC<{frame: number}> = ({frame}) => {
  const drift = interpolate(frame, [0, 300], [0, 1]);
  const gradientRotate = interpolate(frame, [0, 300], [0, 180]);
  return (
    <AbsoluteFill style={styles.background}>
      <div style={styles.baseGradient} />
      <div style={{ ...styles.animatedGradient, transform: `rotate(${gradientRotate}deg) translate(${drift * 20}px, ${drift * 15}px)` }} />
      <div style={{ ...styles.glowOrb1, transform: `translate(${drift * 40}px, ${drift * 30}px)` }} />
      <div style={{ ...styles.glowOrb2, transform: `translate(${-drift * 30}px, ${drift * 20}px)` }} />
      <div style={styles.vignette} />
    </AbsoluteFill>
  );
};

const Particles: React.FC<{frame: number}> = ({frame}) => {
  // Reduced particle count to 15 for better performance
  const particles = Array.from({length: 15}, (_, i) => {
    const speed = 0.15 + i * 0.04;
    const yOffset = ((frame * speed) % 300) - 150;
    const opacity = 0.12 + Math.sin(frame * 0.008 + i) * 0.08;
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${5 + (i * 12) % 90}%`,
          top: `${10 + yOffset}%`,
          width: i % 3 === 0 ? 2 : 1.5,
          height: i % 3 === 0 ? 2 : 1.5,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${i % 3 === 0 ? colors.gold : colors.teal}, transparent)`,
          opacity,
          filter: 'blur(0.8px)',
        }}
      />
    );
  });
  return <>{particles}</>;
};

// All CSS transitions removed - Remotion handles frame updates
const styles: Record<string, CSSProperties> = {
  container: { fontFamily: 'Manrope, sans-serif', overflow: 'hidden' },
  background: { overflow: 'hidden' },
  baseGradient: { position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 40%, #F2EFE8, #F8F6F1 70%)' },
  animatedGradient: { position: 'absolute', width: '150%', height: '150%', top: '-25%', left: '-25%', background: 'linear-gradient(135deg, rgba(14, 116, 144, 0.04), rgba(18, 78, 120, 0.06), rgba(185, 154, 108, 0.03))', filter: 'blur(60px)' },
  glowOrb1: { position: 'absolute', width: 600, height: 600, borderRadius: '50%', top: -200, right: -200, background: `radial-gradient(circle, ${colors.lightTeal}, transparent)`, filter: 'blur(80px)' },
  glowOrb2: { position: 'absolute', width: 500, height: 500, borderRadius: '50%', bottom: -150, left: -150, background: `radial-gradient(circle, ${colors.lightBlue}, transparent)`, filter: 'blur(70px)' },
  vignette: { position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.04) 100%)', pointerEvents: 'none' },
  timelineSection: { justifyContent: 'flex-start', alignItems: 'center', paddingTop: 60 },
  timelineBgImage: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.95) contrast(1.02)', willChange: 'opacity' },
  timelineOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(248,246,241,0.68) 0%, rgba(248,246,241,0.72) 100%)', pointerEvents: 'none' },
  headingContainer: { textAlign: 'center', marginBottom: 60, maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto', zIndex: 10 },
  mainHeading: { fontSize: 56, fontWeight: 700, fontFamily: 'Manrope, sans-serif', color: colors.ink, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 20 },
  caption: { fontSize: 22, fontWeight: 500, fontFamily: 'Manrope, sans-serif', color: colors.muted, letterSpacing: '-0.01em' },
  timelineWrapper: { justifyContent: 'center', alignItems: 'center', width: '100%', zIndex: 10 },
  timelineInner: { position: 'relative', width: 800, height: 850 },
  lineOuter: { position: 'absolute', left: 120, top: 30, width: 3, height: 760 },
  lineBase: { position: 'absolute', width: '100%', height: '100%', background: `linear-gradient(180deg, ${colors.primary}12, ${colors.teal}12, ${colors.gold}12)`, borderRadius: 3 },
  lineProgress: { position: 'absolute', width: '100%', top: 0, background: `linear-gradient(180deg, ${colors.primary}, ${colors.teal}, ${colors.gold})`, borderRadius: 3, boxShadow: '0 0 6px rgba(185,154,108,0.4)' },
  lineGlow: { position: 'absolute', width: '100%', height: '100%', background: `linear-gradient(180deg, ${colors.primary}50, ${colors.gold}30)`, borderRadius: 3, filter: 'blur(8px)', pointerEvents: 'none' },
  nodeWrapper: { position: 'absolute', left: 100, display: 'flex', alignItems: 'center' },
  nodeContainer: { position: 'relative', width: 40, height: 40, zIndex: 10 },
  nodeOuter: { position: 'absolute', width: 40, height: 40, borderRadius: '50%', background: colors.white, border: `3px solid ${colors.primary}`, boxShadow: `0 0 0 3px ${colors.white}`, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  nodeGlow: { position: 'absolute', width: 70, height: 70, borderRadius: '50%', top: -15, left: -15, background: `radial-gradient(circle, ${colors.gold}45, transparent)`, filter: 'blur(10px)', pointerEvents: 'none' },
  nodeInner: { width: 16, height: 16, borderRadius: '50%', background: `radial-gradient(circle, ${colors.teal}, ${colors.primary})` },
  nodeLabelContainer: { position: 'absolute', left: 60, whiteSpace: 'nowrap' },
  nodeLabel: { fontSize: 28, fontWeight: 700, fontFamily: 'Manrope, sans-serif', color: colors.ink, letterSpacing: '-0.02em', marginBottom: 6 },
  nodeDescription: { fontSize: 18, fontWeight: 500, fontFamily: 'Manrope, sans-serif', color: colors.muted, letterSpacing: '-0.01em', whiteSpace: 'nowrap' },
  verticalConnector: { position: 'absolute', left: 19, width: 3, background: `linear-gradient(180deg, ${colors.teal}, ${colors.gold})`, borderRadius: 1.5, bottom: '100%', transformOrigin: 'top' },
  messageContainer: { justifyContent: 'center', alignItems: 'center', textAlign: 'center', pointerEvents: 'none' },
  messageWrapper: { position: 'absolute', textAlign: 'center' },
  supportingText: { fontSize: 20, fontWeight: 500, fontFamily: 'Manrope, sans-serif', color: colors.muted, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 },
  wordmark: { fontSize: 86, fontWeight: 800, fontFamily: 'Manrope, sans-serif', color: colors.primary, letterSpacing: '0.05em' },
  tagline: { fontSize: 42, fontWeight: 600, fontFamily: 'Manrope, sans-serif', color: colors.ink, letterSpacing: '-0.02em' },
  taglineAccent: { color: colors.teal, fontWeight: 700 },
  finalMessage: { fontSize: 58, fontWeight: 700, fontFamily: 'Manrope, sans-serif', color: colors.primary, letterSpacing: '-0.02em' },
  finalMessageLight: { fontWeight: 600, color: colors.ink },
  surgeonContainer: { justifyContent: 'center', alignItems: 'center', textAlign: 'center', pointerEvents: 'none' },
  fullPageImage: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.95) contrast(1.02)', willChange: 'opacity, transform' },
  overlayLighter: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(248,246,241,0.28) 0%, rgba(248,246,241,0.35) 100%)', pointerEvents: 'none' },
  surgeonTextWrapper: { position: 'absolute', left: 0, right: 0, textAlign: 'center', zIndex: 10, top: '50%', transform: 'translateY(-50%)' },
  surgeonLine1: { fontSize: 86, fontWeight: 700, fontFamily: 'Manrope, sans-serif', color: colors.ink, lineHeight: 0.98, letterSpacing: '-0.03em', textShadow: '0 2px 12px rgba(0,0,0,0.06)' },
  surgeonLine2: { fontSize: 86, fontWeight: 700, fontFamily: 'Manrope, sans-serif', color: colors.ink, lineHeight: 0.98, letterSpacing: '-0.03em', textShadow: '0 2px 12px rgba(0,0,0,0.06)' },
  surgeonAccent: { color: colors.primary, fontWeight: 800 },
};