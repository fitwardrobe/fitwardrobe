import React from "react";
import { Sequence, Series, AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, spring } from "remotion";
import { COLOR_PALETTE, FONT_FAMILY, BRAND } from "./DesignSystem";

const SceneContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLOR_PALETTE.background, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {children}
    </AbsoluteFill>
  );
};

const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const text = "Still wasting time deciding what to wear?";
  const words = text.split(" ");
  
  return (
    <SceneContainer>
      <div style={{ padding: '0 80px', textAlign: 'center' }}>
        {words.map((word, i) => {
          const delay = i * 4;
          const opacity = interpolate(frame - delay, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
          return (
            <span key={i} style={{ 
              opacity, 
              display: 'inline-block', 
              fontSize: '110px', 
              fontFamily: FONT_FAMILY.heading, 
              color: COLOR_PALETTE.primary,
              margin: '0 15px'
            }}>
              {word}
            </span>
          );
        })}
      </div>
    </SceneContainer>
  );
};

const Scene2: React.FC = () => {
  const { width } = useVideoConfig();
  const frame = useCurrentFrame();
  const slide = spring({ frame, fps: 30, config: { damping: 200 } });
  
  return (
    <AbsoluteFill style={{ overflow: 'hidden', display: 'flex', flexDirection: 'row' }}>
      {/* Left side: Competitors */}
      <div style={{ 
        flex: 1, 
        backgroundColor: COLOR_PALETTE.white, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        transform: `translateX(${(1 - slide) * -width / 2}px)`
      }}>
        <div style={{ fontSize: '150px' }}>❌</div>
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '60px', fontFamily: FONT_FAMILY.body, fontWeight: 'bold' }}>Other apps:</div>
          <div style={{ fontSize: '50px', fontFamily: FONT_FAMILY.body, marginTop: '20px', color: COLOR_PALETTE.red }}>Cloud Upload • Ads • Data Mining</div>
        </div>
      </div>
      
      {/* Right side: FitWardrobe */}
      <div style={{ 
        flex: 1, 
        backgroundColor: COLOR_PALETTE.accent, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        transform: `translateX(${(1 - slide) * width / 2}px)`
      }}>
        <div style={{ fontSize: '150px' }}>✅</div>
        <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '60px', fontFamily: FONT_FAMILY.body, fontWeight: 'bold' }}>FitWardrobe:</div>
          <div style={{ fontSize: '50px', fontFamily: FONT_FAMILY.body, marginTop: '20px' }}>On-Device • Zero Tracking • 100% Free</div>
        </div>
      </div>
      
      {/* Overlay Text */}
      <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
        <div style={{ 
          backgroundColor: COLOR_PALETTE.primary, 
          color: 'white', 
          padding: '20px 40px', 
          fontSize: '40px', 
          fontFamily: FONT_FAMILY.body,
          borderRadius: '50px',
          marginTop: '600px',
          opacity: spring({ frame: frame - 20, fps: 30 })
        }}>
          "Other apps sell your data. FitWardrobe doesn't."
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const phoneRise = spring({ frame, fps: 30, config: { stiffness: 100 } });
  
  return (
    <SceneContainer>
      <div style={{ textAlign: 'center', marginBottom: '800px' }}>
        <div style={{ fontSize: '90px', fontFamily: FONT_FAMILY.heading, color: COLOR_PALETTE.primary }}>📸 Snap.</div>
        <div style={{ fontSize: '50px', fontFamily: FONT_FAMILY.body, color: COLOR_PALETTE.primary, marginTop: '20px' }}>Our AI recognises your clothes instantly.</div>
      </div>
      
      {/* Phone Mockup Simulation */}
      <div style={{ 
        position: 'absolute', 
        bottom: 0, 
        width: '700px', 
        height: '1200px', 
        backgroundColor: '#eee', 
        border: '15px solid #222', 
        borderRadius: '80px 80px 0 0',
        transform: `translateY(${(1 - phoneRise) * 1200}px)`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{ flex: 1, backgroundColor: '#fff', position: 'relative' }}>
          {/* Mock Camera View */}
          <div style={{ width: '100%', height: '100%', backgroundColor: '#333' }}></div>
          {/* Animated labels */}
          {frame > 30 && (
             <div style={{ 
               position: 'absolute', top: '20%', left: '10%', 
               backgroundColor: COLOR_PALETTE.accent, color: 'white', 
               padding: '15px 30px', borderRadius: '40px', fontSize: '30px', fontFamily: FONT_FAMILY.body,
               opacity: spring({ frame: frame - 30, fps: 30 })
             }}>
               Cotton Fabric
             </div>
          )}
          {frame > 45 && (
             <div style={{ 
               position: 'absolute', top: '35%', right: '10%', 
               backgroundColor: COLOR_PALETTE.accent, color: 'white', 
               padding: '15px 30px', borderRadius: '40px', fontSize: '30px', fontFamily: FONT_FAMILY.body,
               opacity: spring({ frame: frame - 45, fps: 30 })
             }}>
               Sage Green
             </div>
          )}
        </div>
      </div>
      
      <div style={{ position: 'absolute', bottom: '50px', fontSize: '30px', fontFamily: FONT_FAMILY.body, color: '#888' }}>
        Powered by Google Gemini — no manual tagging
      </div>
    </SceneContainer>
  );
};

const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  
  return (
    <SceneContainer>
       <div style={{ textAlign: 'center', marginBottom: '1000px' }}>
        <div style={{ fontSize: '80px', fontFamily: FONT_FAMILY.heading, color: COLOR_PALETTE.primary }}>✨ Smart Outfit Suggestions</div>
        <div style={{ fontSize: '45px', fontFamily: FONT_FAMILY.body, color: COLOR_PALETTE.primary, marginTop: '20px' }}>Tell us the occasion, we build the look.</div>
      </div>
      
      <div style={{ display: 'flex', gap: '40px', position: 'absolute', top: '50%', transform: `translateX(${(frame * -5)}px)` }}>
        {['Work Meeting', 'Weekend Brunch', 'Date Night', 'Travel'].map((label, i) => (
          <div key={i} style={{ 
            width: '600px', height: '800px', backgroundColor: 'white', borderRadius: '40px', 
            padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column'
          }}>
            <div style={{ fontSize: '40px', fontWeight: 'bold', fontFamily: FONT_FAMILY.body, marginBottom: '20px' }}>{label}</div>
            <div style={{ flex: 1, backgroundColor: '#f9f9f9', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '100px' }}>
              👔
            </div>
          </div>
        ))}
      </div>
    </SceneContainer>
  );
};

const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const shieldScale = spring({ frame, fps: 30, config: { damping: 10 } });
  
  return (
    <SceneContainer>
      <div style={{ 
        fontSize: '300px', 
        transform: `scale(${shieldScale})`,
        opacity: shieldScale 
      }}>
        🛡️
      </div>
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <div style={{ fontSize: '80px', fontFamily: FONT_FAMILY.heading, color: COLOR_PALETTE.primary }}>Your photos never leave your phone.</div>
        <div style={{ fontSize: '45px', fontFamily: FONT_FAMILY.body, color: COLOR_PALETTE.primary, marginTop: '40px' }}>No cloud. No profiles. No compromises.</div>
      </div>
    </SceneContainer>
  );
};

const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const bounce = spring({ frame, fps: 30, config: { stiffness: 100 } });
  
  return (
    <SceneContainer>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '120px', fontFamily: FONT_FAMILY.heading, color: COLOR_PALETTE.primary, marginBottom: '20px' }}>{BRAND.name}</div>
        <div style={{ fontSize: '50px', fontFamily: FONT_FAMILY.body, color: COLOR_PALETTE.accent, marginBottom: '100px' }}>{BRAND.tagline}</div>
        
        <div style={{ 
          backgroundColor: COLOR_PALETTE.primary, color: 'white', padding: '30px 60px', borderRadius: '15px', 
          fontSize: '40px', display: 'inline-block', transform: `scale(${bounce})`, marginBottom: '40px'
        }}>
          Free Beta — Android Available Now
        </div>
        
        <div style={{ fontSize: '35px', fontFamily: FONT_FAMILY.body, color: '#888', marginBottom: '80px' }}>iOS coming March 2026</div>
        
        <div style={{ fontSize: '60px', fontFamily: FONT_FAMILY.heading, borderBottom: `4px solid ${COLOR_PALETTE.accent}` }}>
          fitwardrobe.me
        </div>
        
        <div style={{ fontSize: '40px', marginTop: '100px', fontFamily: FONT_FAMILY.body }}>Dress better. Stay private. 🔒</div>
      </div>
    </SceneContainer>
  );
};

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence durationInFrames={3 * 30}>
          <Scene1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={5 * 30}>
          <Scene2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={8 * 30}>
          <Scene3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={8 * 30}>
          <Scene4 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={5 * 30}>
          <Scene5 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={9 * 30}>
          <Scene6 />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
