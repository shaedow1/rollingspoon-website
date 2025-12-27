import React, { useState, useEffect } from 'react';

// --- 이미지 Import (1~11) ---
import img1 from './menu/icecream_1.png';
import img2 from './menu/icecream_2.png';
import img3 from './menu/icecream_3.png';
import img4 from './menu/icecream_4.png';
import img5 from './menu/icecream_5.png';
import img6 from './menu/icecream_6.png';
import img7 from './menu/icecream_7.png';
import img8 from './menu/icecream_8.png';
import img9 from './menu/icecream_9.png';
import img10 from './menu/icecream_10.png';
import img11 from './menu/icecream_11.png';

// 화면 크기 변경 감지 훅
const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 960);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

const App = () => {
  const isMobile = useResponsive();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // [NEW] 선택된 상품 상태 (팝업용)
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 스크롤 감지 및 네비게이션 활성화
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'story', 'menu', 'locations', 'franchise'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // [NEW] 팝업 열기/닫기 시 백그라운드 스크롤 제어
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProduct]);

  const colors = {
    bg: '#F2EBD9',
    primary: '#D43F5E',
    text: '#2A2A2A',
    accent: '#C49A6C',
    white: '#FFFFFF',
    surface: 'rgba(255, 255, 255, 0.6)',
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Story', id: 'story' },
    { name: 'Menu', id: 'menu' },
    { name: 'Space', id: 'locations' },
    { name: 'Partner', id: 'franchise' },
  ];

  // 메뉴 데이터
  const allProducts = [
    { 
      name: '로얄 바닐라 빈', 
      desc: '타히티 바닐라빈의 깊은 풍미, 설탕 없이 완성한 순수한 달콤함', 
      detail: '최상급 타히티 바닐라빈을 아낌없이 넣어 만든 시그니처 메뉴입니다. 인공향료 없이 천연 바닐라의 묵직하고 우아한 향을 느껴보세요.',
      tag: 'Best', 
      color: '#F3E5AB', 
      image: img1 
    },
    { 
      name: '딥 카카오', 
      desc: '벨기에 다크 초콜릿의 진한 여운, 죄책감 없이 즐기는 카카오의 깊이', 
      detail: '카카오 함량 72%의 벨기에 초콜릿을 사용하여 쌉싸름하면서도 고급스러운 단맛을 냅니다. 초콜릿 덕후를 위한 완벽한 선택.',
      tag: 'New', 
      color: '#5D4037', 
      image: img2 
    },
    { 
      name: '김해 평화 쌀', 
      desc: '햇살 담은 김해 평화쌀의 고소함, 씹을수록 은은하게 퍼지는 곡물의 단맛', 
      detail: '김해 평야에서 자란 쌀알이 젤라또 속에 콕콕 박혀있어 씹는 식감이 일품입니다. 담백하고 고소한 한국적인 맛.',
      tag: 'Signature', 
      color: '#FAFAFA', 
      isDark: false,    
      image: img3 
    },
    { 
      name: '제주 말차 숲', 
      desc: '제주 다원의 푸르름을 그대로, 쌉싸름한 유기농 말차와 우유의 조화', 
      detail: '제주 유기농 말차의 진한 풍미가 우유와 부드럽게 어우러집니다. 많이 달지 않고 깔끔한 뒷맛이 특징입니다.',
      tag: 'Premium', 
      color: '#88B04B', 
      isDark: true, 
      image: img4 
    },
    { 
      name: '뉴욕 치즈 케이크', 
      desc: '꾸덕한 크림치즈의 진한 풍미, 설탕 걱정 없이 떠나는 뉴욕 디저트 여행', 
      detail: '필라델피아 크림치즈를 베이스로 하여 진하고 꾸덕한 식감을 자랑합니다. 치즈 케이크 한 조각을 통째로 먹는 듯한 풍성함.',
      tag: '', 
      color: '#F3E5AB', 
      image: img5 
    },
    { 
      name: '얼그레이 리저브', 
      desc: '향긋한 베르가못 향이 감도는, 오후의 티타임 같은 우아한 휴식', 
      detail: '프리미엄 얼그레이 잎차를 직접 우려내어 향긋함이 입안 가득 퍼집니다. 홍차를 좋아하는 분들에게 강력 추천합니다.',
      tag: 'Best', 
      color: '#BCAAA4', 
      image: img6 
    },
    { 
      name: '아몬드 크런치', 
      desc: '오독오독 씹히는 구운 아몬드, 입안 가득 채우는 견과류의 건강한 고소함', 
      detail: '직접 로스팅한 아몬드를 카라멜 라이징하여 바삭한 식감을 살렸습니다. 고소함의 끝판왕.',
      tag: '', 
      color: '#FFCC80', 
      image: img7 
    },
    { 
      name: '리얼 바나나', 
      desc: '잘 익은 바나나 본연의 크리미함, 자연이 선물한 달콤한 위로', 
      detail: '인공 시럽 대신 실제 숙성 바나나를 듬뿍 갈아 넣었습니다. 아이들이 가장 좋아하는 부드럽고 달콤한 메뉴.',
      tag: '', 
      color: '#FFF59D', 
      image: img8 
    },
    { 
      name: '체리체리', 
      desc: '붉은 체리의 상큼한 과즙미, 설탕 없이도 기분 좋게 차오르는 생기', 
      detail: '상큼한 체리 과육이 씹히는 셔벗 스타일의 젤라또입니다. 식사 후 입가심으로 완벽합니다.',
      tag: '', 
      color: '#EF5350', 
      isDark: true,
      image: img9 
    },
    { 
      name: '제로 쿠키 마운틴', 
      desc: '바삭한 블랙 쿠키가 산처럼, 끝까지 달콤해도 당류 걱정 없는 즐거움', 
      detail: '무설탕 블랙 쿠키를 큼직하게 부셔 넣었습니다. 바삭한 식감과 우유 젤라또의 조화는 언제나 옳습니다.',
      tag: 'Mania', 
      color: '#E0E0E0', 
      image: img10 
    },
    { 
      name: '솔티드 카라멜', 
      desc: '히말라야 핑크솔트와 무설탕 카라멜의 완벽한 단짠, 녹아내리는 우아한 밸런스', 
      detail: '직접 끓인 무설탕 카라멜 소스에 히말라야 핑크 솔트를 더해 고급스러운 단짠의 조화를 이끌어냈습니다.',
      tag: 'Limited', 
      color: '#D7CCC8', 
      image: img11 
    } 
  ];

  const handleNavClick = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // 팝업 닫기 핸들러
  const closeModal = (e) => {
    if (e) e.stopPropagation();
    setSelectedProduct(null);
  };

  const styles = {
    container: {
      backgroundColor: colors.bg,
      color: colors.text,
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", Roboto, sans-serif',
      overflowX: 'hidden'
    },
    // ... (기존 스타일 유지)
    nav: {
      position: 'fixed',
      top: isScrolled ? (isMobile ? '10px' : '20px') : '0',
      left: isScrolled ? '50%' : '0',
      transform: isScrolled ? 'translateX(-50%)' : 'none',
      width: isScrolled ? (isMobile ? '95%' : '90%') : '100%',
      maxWidth: isScrolled ? '1000px' : 'none',
      zIndex: 100,
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      borderRadius: isScrolled ? '50px' : '0',
      padding: isScrolled ? '12px 24px' : (isMobile ? '20px' : '30px 40px'),
      boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
      border: isScrolled ? '1px solid rgba(255,255,255,0.5)' : 'none'
    },
    navInner: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logoText: {
      fontSize: '22px',
      fontWeight: '800',
      color: colors.primary,
      fontFamily: '"Playfair Display", serif',
      letterSpacing: '-0.5px'
    },
    menuDesktop: {
      display: isMobile ? 'none' : 'flex',
      gap: '40px',
      alignItems: 'center'
    },
    menuLink: {
      fontSize: '15px',
      fontWeight: '600',
      color: colors.text,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      position: 'relative',
      transition: 'color 0.2s',
      padding: '5px 0'
    },
    mobileMenuOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      backgroundColor: colors.bg,
      zIndex: 99,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '30px',
      transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'transform 0.4s ease-in-out',
      opacity: isMobileMenuOpen ? 1 : 0
    },
    section: {
      padding: isMobile ? '80px 20px' : '140px 20px',
      maxWidth: '1280px',
      margin: '0 auto',
      scrollMarginTop: '80px'
    },
    hero: {
      paddingTop: isMobile ? '160px' : '220px',
      paddingBottom: isMobile ? '80px' : '140px',
      textAlign: 'center',
      position: 'relative',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    heroTitle: {
      fontSize: isMobile ? '48px' : 'clamp(60px, 8vw, 100px)',
      fontWeight: '900',
      lineHeight: '1.05',
      marginBottom: '30px',
      color: colors.text,
      letterSpacing: '-2px',
      fontFamily: '"Playfair Display", serif'
    },
    btn: {
      padding: '12px 32px',
      borderRadius: '100px',
      fontWeight: '700',
      backgroundColor: colors.primary,
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'transform 0.2s',
      boxShadow: '0 4px 12px rgba(212, 63, 94, 0.3)'
    },
    bentoGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '20px',
      marginTop: '60px'
    },
    bentoCard: {
      backgroundColor: colors.surface,
      borderRadius: '32px',
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      border: '1px solid rgba(255,255,255,0.4)',
      minHeight: '280px'
    },
    productCard: {
      backgroundColor: 'white',
      borderRadius: '32px',
      overflow: 'hidden',
      transition: 'transform 0.3s ease',
      border: '1px solid rgba(0,0,0,0.03)',
      position: 'relative',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      height: '500px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
    },
    input: {
      width: '100%',
      padding: '16px',
      borderRadius: '12px',
      border: '1px solid #ddd',
      backgroundColor: '#fdfdfd',
      marginTop: '8px',
      fontSize: '15px',
      outline: 'none',
      boxSizing: 'border-box'
    },
    locationGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr',
      gap: '50px',
      alignItems: 'center',
      marginTop: '40px'
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr',
      gap: isMobile ? '40px' : '60px',
      marginBottom: '80px'
    },

    // [NEW] Modal Styles
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      // 감성적인 블러 효과: 강한 블러 + 아주 옅은 딤 처리
      backdropFilter: 'blur(15px)', 
      backgroundColor: 'rgba(242, 235, 217, 0.3)', // 배경색 톤의 옅은 오버레이
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      animation: 'fadeIn 0.3s ease-out'
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '32px',
      maxWidth: '900px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      boxShadow: '0 25px 100px rgba(212, 63, 94, 0.15)', // 부드러운 컬러 그림자
      position: 'relative',
      animation: 'modalPop 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      border: '1px solid rgba(255,255,255,0.8)'
    },
    modalImageWrapper: {
      flex: isMobile ? 'none' : '1',
      height: isMobile ? '300px' : 'auto',
      minHeight: '400px',
      position: 'relative',
      overflow: 'hidden'
    },
    modalTextWrapper: {
      flex: '1',
      padding: isMobile ? '30px 25px' : '60px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative'
    },
    closeBtn: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'none',
      border: 'none',
      fontSize: '28px',
      cursor: 'pointer',
      zIndex: 10,
      color: colors.text,
      opacity: 0.5,
      transition: 'opacity 0.2s',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.5)'
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');
        body { margin: 0; }
        .hover-lift:hover { transform: translateY(-8px); box-shadow: 0 25px 50px rgba(0,0,0,0.08) !important; }
        .hover-lift-img:hover .bg-img { transform: scale(1.1); }
        .hover-lift-img { transition: box-shadow 0.3s ease; }
        .hover-lift-img:hover { box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
        
        .marquee-container { overflow: hidden; white-space: nowrap; padding: 20px 0; background: ${colors.primary}; color: white; transform: rotate(-2deg) scale(1.05); margin: 40px 0; }
        .marquee-content { display: inline-block; animation: marquee 20s linear infinite; font-size: 24px; font-weight: bold; }
        
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .fade-in { animation: fadeIn 0.8s ease-out forwards; opacity: 0; transform: translateY(20px); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; transform: translateY(0); } }
        
        @keyframes modalPop {
           from { opacity: 0; transform: scale(0.95) translateY(20px); }
           to { opacity: 1; transform: scale(1) translateY(0); }
        }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${colors.bg}; }
        ::-webkit-scrollbar-thumb { background: #dcdcdc; border-radius: 4px; }
      `}</style>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', zIndex: 101}} onClick={() => handleNavClick('home')}>
             <div style={{width: '12px', height: '12px', borderRadius: '50%', background: colors.primary}}></div>
             <span style={styles.logoText}>Rolling Spoon</span>
          </div>

          <div style={styles.menuDesktop}>
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.id)}
                style={{ 
                  ...styles.menuLink, 
                  color: activeSection === link.id ? colors.primary : colors.text,
                  fontWeight: activeSection === link.id ? '800' : '500',
                  borderBottom: activeSection === link.id ? `2px solid ${colors.primary}` : 'none'
                }}
              >
                {link.name}
              </button>
            ))}
          </div>

          <button 
            style={{ 
              display: isMobile ? 'block' : 'none', 
              background: 'none', 
              border: 'none', 
              fontSize: '24px', 
              cursor: 'pointer', 
              padding: '5px',
              zIndex: 101,
              color: colors.text
            }} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      <div style={styles.mobileMenuOverlay}>
         {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.id)} 
              style={{...styles.menuLink, fontSize: '24px', fontWeight: 'bold'}}
            >
              {link.name}
            </button>
          ))}
      </div>

      <main>
        {/* --- SECTION: HERO --- */}
        <section id="home" style={styles.hero}>
          <div className="fade-in" style={{ animationDelay: '0.1s' }}>
            <span style={{ display: 'inline-block', padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: '700', border: `1px solid ${colors.primary}`, color: colors.primary, marginBottom: '25px', backgroundColor: 'rgba(212, 63, 94, 0.05)' }}>
              Start 2025 Sugar-Free
            </span>
            <h1 style={styles.heroTitle}>
              Sweetness, <br/>
              <span style={{ fontStyle: 'italic', color: colors.primary }}>Reimagined.</span>
            </h1>
            <p style={{ fontSize: isMobile ? '16px' : '20px', opacity: 0.7, marginBottom: '50px', maxWidth: '600px', margin: '0 auto 50px', lineHeight: '1.6' }}>
              0g Sugar, 100% Delight. <br/>
              우리는 디저트의 새로운 기준을 만듭니다. 죄책감 없이 즐기세요.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button onClick={() => handleNavClick('menu')} style={styles.btn}>Explore Menu</button>
            </div>
          </div>
          <div style={{ position: 'absolute', top: '50%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, #D43F5E 0%, transparent 70%)', opacity: 0.15, filter: 'blur(60px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '20%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, #C49A6C 0%, transparent 70%)', opacity: 0.2, filter: 'blur(80px)', pointerEvents: 'none' }} />
        </section>

        <div className="marquee-container">
          <div className="marquee-content">
            ROLLING SPOON • ZERO SUGAR • PREMIUM GELATO • NATURAL INGREDIENTS • ROLLING SPOON • ZERO SUGAR • PREMIUM GELATO • NATURAL INGREDIENTS •
          </div>
        </div>

        {/* --- SECTION: STORY --- */}
        <section id="story" style={styles.section}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', marginBottom: '40px', gap: '10px' }}>
            <div>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: colors.primary, letterSpacing: '2px', display: 'block', marginBottom: '10px' }}>OUR PHILOSOPHY</span>
              <h2 style={{ fontSize: isMobile ? '36px' : '52px', fontFamily: '"Playfair Display", serif', fontWeight: 'bold', lineHeight: '1.1' }}>
                Sweetness, <br/> but <span style={{fontStyle:'italic', color: colors.primary}}>Better.</span>
              </h2>
            </div>
            <p style={{ maxWidth: '400px', fontSize: '15px', lineHeight: '1.7', opacity: 0.7, marginBottom: isMobile ? '0' : '10px' }}>
              우리는 단순한 디저트가 아닌, <br/>
              당신의 건강한 일상을 위한 달콤한 휴식을 연구합니다.
            </p>
          </div>
          
          <div style={styles.bentoGrid}>
            
            {/* Card 1: 0% Sugar */}
            <div className="hover-lift-img" style={{ 
              ...styles.bentoCard, 
              gridColumn: isMobile ? 'span 1' : 'span 2', 
              padding: '0', 
              border: 'none',
              overflow: 'hidden',
              position: 'relative',
              color: 'white'
            }}>
              <div className="bg-img" style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: 'url(https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=1000)',
                backgroundSize: 'cover', backgroundPosition: 'center',
                transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }} />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
              
              <div style={{ position: 'relative', zIndex: 2, padding: '40px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#88B04B', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🌿</span> 100% NATURAL
                </div>
                <h3 style={{ fontSize: '32px', fontFamily: '"Playfair Display", serif', marginBottom: '15px' }}>No Sugar Added, Pure Sweetness</h3>
                <p style={{ opacity: 0.9, lineHeight: '1.6', maxWidth: '90%', fontSize: '16px', fontWeight: '300' }}>
                  설탕은 단 한 톨도 허락하지 않았습니다.<br/>
                  자연이 선물한 <strong>알룰로스</strong>와 <strong>스테비아</strong>로, <br/>
                  몸이 좋아하는 가장 순수한 달콤함을 완성했습니다.
                </p>
              </div>
            </div>

            {/* Card 2: Lab */}
            <div className="hover-lift-img" style={{ ...styles.bentoCard, padding: '0', border: 'none', overflow: 'hidden', position: 'relative', color: 'white' }}>
               <div className="bg-img" style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: 'url(https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=600)',
                backgroundSize: 'cover', backgroundPosition: 'center',
                transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }} />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)' }} />
              
              <div style={{ position: 'relative', zIndex: 2, padding: '30px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                 <div style={{ fontSize: '40px', marginBottom: '20px' }}>👨‍🔬</div>
                 <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>730 Days</h3>
                 <p style={{ opacity: 0.9, fontSize: '14px', lineHeight: '1.6' }}>
                   아이스크림 전문가의 오랜 연구끝에.<br/>
                   완벽한 밸런스를 잡았습니다.
                 </p>
              </div>
            </div>

            {/* Card 3: Taste */}
            <div className="hover-lift-img" style={{ ...styles.bentoCard, padding: '0', border: 'none', overflow: 'hidden', position: 'relative', color: 'white' }}>
               <div className="bg-img" style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: 'url(https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=600)',
                backgroundSize: 'cover', backgroundPosition: 'center',
                transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }} />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
              
              <div style={{ position: 'relative', zIndex: 2, padding: '30px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                 <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>Rich Flavor</h3>
                 <p style={{ opacity: 0.9, fontSize: '14px', lineHeight: '1.6' }}>
                   압도적인 풍미.<br/>
                   더 진하고 쫀득합니다.
                 </p>
              </div>
            </div>

            {/* Card 4: Guilt-Free */}
            <div className="hover-lift-img" style={{ ...styles.bentoCard, padding: '0', border: 'none', overflow: 'hidden', position: 'relative', color: '#2A2A2A' }}>
               <div className="bg-img" style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundColor: '#F7F2E8',
                transition: 'transform 0.7s'
              }} />
              
              <div style={{ position: 'relative', zIndex: 2, padding: '30px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                 <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px', fontFamily: '"Playfair Display", serif', color: colors.primary }}>Guilt-Free</h3>
                 <p style={{ fontSize: '15px', lineHeight: '1.6' }}>
                   칼로리는 덜어내고<br/>
                   행복만 남겼습니다.
                 </p>
              </div>
            </div>

             {/* Card 5: Slogan */}
             <div className="hover-lift-img" style={{ 
               ...styles.bentoCard, 
               backgroundImage: 'url(https://images.unsplash.com/photo-1516559828984-fb3b99548b21?auto=format&fit=crop&q=80&w=600)',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               justifyContent: 'center', 
               alignItems: 'center',
               position: 'relative',
               overflow: 'hidden',
               border: 'none'
             }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(212, 63, 94, 0.85)', mixBlendMode: 'multiply' }} />
                <span style={{ 
                  position: 'relative', 
                  zIndex: 2,
                  fontFamily: '"Playfair Display"', 
                  fontSize: isMobile ? '28px' : '32px', 
                  fontStyle: 'italic', 
                  color: 'white', 
                  textAlign: 'center',
                  padding: '20px',
                  border: '1px solid rgba(255,255,255,0.4)'
                }}>
                  "Sweetness<br/>you can trust."
                </span>
             </div>
          </div>
        </section>

        {/* --- SECTION: MENU (Images 1-11) --- */}
        <section id="menu" style={styles.section}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: isMobile ? '40px' : '60px', fontFamily: '"Playfair Display", serif', fontWeight: '900', color: colors.primary, marginBottom: '20px' }}>Menu Collection</h2>
            <p style={{ fontSize: '18px', opacity: 0.7 }}>매일 아침 만드는 신선한 11가지 플레이버</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '40px' }}>
            {allProducts.map((product, idx) => (
              <div 
                key={idx} 
                className="hover-lift" 
                style={styles.productCard}
                onClick={() => setSelectedProduct(product)} // 클릭 시 팝업 오픈
              >
                <div style={{ 
                    flex: '1.5',
                    backgroundColor: product.color, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                  {product.tag && (
                    <span style={{ position: 'absolute', top: '20px', left: '20px', padding: '8px 16px', backgroundColor: 'white', borderRadius: '20px', fontSize: '12px', fontWeight: '800', letterSpacing: '0.5px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', zIndex: 10 }}>
                      {product.tag.toUpperCase()}
                    </span>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <div style={{ flex: '1', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>{product.name}</h3>
                  <p style={{ fontSize: '16px', opacity: 0.6, marginBottom: '0' }}>{product.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION: LOCATIONS --- */}
        <section id="locations" style={styles.section}>
          <div style={styles.locationGrid}>
             <div>
                <div style={{ display: 'inline-block', width: '60px', height: '4px', backgroundColor: colors.primary, marginBottom: '30px' }}></div>
                <h2 style={{ fontSize: isMobile ? '40px' : '50px', fontFamily: '"Playfair Display", serif', fontWeight: 'bold', marginBottom: '30px', lineHeight: '1.2' }}>
                  Rolling Spoon <br/> Songjeong
                </h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', opacity: 0.8, marginBottom: '40px' }}>
                  부산 송정의 푸른 바다 앞에 위치한 롤링스푼 본점입니다.<br/>
                  파도 소리와 함께 가장 신선한 젤라또를 즐겨보세요.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginBottom: isMobile ? '40px' : '0' }}>
                  {[
                    { l: 'Address', v: '부산시 해운대구 송정광어골로 15-1' },
                    { l: 'Time', v: 'Daily 11:00 - 22:00 (Last Order 21:30)' },
                    { l: 'Contact', v: '051-123-4567' }
                  ].map((item, i) => (
                    <div key={i}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: colors.accent, letterSpacing: '1px' }}>{item.l.toUpperCase()}</span>
                      <div style={{ fontSize: '16px', fontWeight: '500', marginTop: '5px' }}>{item.v}</div>
                    </div>
                  ))}
                </div>
             </div>
             <div style={{ 
               height: isMobile ? '400px' : '600px', 
               backgroundColor: '#E5DCCB', 
               borderRadius: isMobile ? '40px' : '200px 200px 20px 20px',
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center',
               position: 'relative',
               overflow: 'hidden',
               boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
             }}>
                <div style={{ textAlign: 'center', zIndex: 10 }}>
                  <div style={{ fontSize: '60px', color: colors.primary, marginBottom: '20px', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.2))' }}>📍</div>
                  <button style={{ padding: '15px 30px', backgroundColor: 'white', borderRadius: '100px', border: 'none', fontWeight: 'bold', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                    Open Google Maps
                  </button>
                </div>
                <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '300px', height: '300px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)' }} />
                <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '400px', height: '400px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)' }} />
             </div>
          </div>
        </section>

        {/* --- SECTION: PARTNER (Franchise) --- */}
        <section id="franchise" style={{ ...styles.section, marginTop: '50px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '40px', padding: isMobile ? '40px 20px' : '80px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <h2 style={{ fontSize: isMobile ? '32px' : '40px', fontFamily: '"Playfair Display", serif', fontWeight: 'bold', marginBottom: '20px' }}>Business Partnership</h2>

            <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: colors.text, display: 'block', marginBottom: '8px' }}>Name</label>
                <input type="text" style={styles.input} placeholder="성함을 입력해주세요" />
              </div>
              <div style={{ marginBottom: '30px' }}>
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: colors.text, display: 'block', marginBottom: '8px' }}>Phone</label>
                <input type="tel" style={styles.input} placeholder="연락처를 입력해주세요" />
              </div>
              <button style={{ ...styles.btn, width: '100%', fontSize: '16px', padding: '16px' }}>비지니스 문의하기</button>
            </div>
          </div>
        </section>
      </main>

      {/* --- POPUP MODAL --- */}
      {selectedProduct && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={closeModal}>✕</button>
            
            {/* Image Side */}
            <div style={{...styles.modalImageWrapper, backgroundColor: selectedProduct.color}}>
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            
            {/* Text Side */}
            <div style={styles.modalTextWrapper}>
              {selectedProduct.tag && (
                <span style={{ 
                  display: 'inline-block', 
                  padding: '6px 14px', 
                  backgroundColor: colors.primary, 
                  color: 'white', 
                  borderRadius: '20px', 
                  fontSize: '12px', 
                  fontWeight: '800', 
                  marginBottom: '20px',
                  alignSelf: 'flex-start'
                }}>
                  {selectedProduct.tag.toUpperCase()}
                </span>
              )}
              <h3 style={{ fontSize: '32px', fontFamily: '"Playfair Display", serif', fontWeight: 'bold', marginBottom: '15px' }}>
                {selectedProduct.name}
              </h3>
              <p style={{ fontSize: '18px', fontWeight: '500', opacity: 0.6, marginBottom: '30px' }}>
                {selectedProduct.desc}
              </p>
              
              <div style={{ width: '100%', height: '1px', backgroundColor: '#eee', marginBottom: '30px' }}></div>
              
              <p style={{ fontSize: '16px', lineHeight: '1.8', opacity: 0.8, color: '#444' }}>
                {selectedProduct.detail || "천연 재료 본연의 맛을 살린 롤링스푼만의 프리미엄 젤라또입니다. 설탕 없이도 완벽한 달콤함을 즐겨보세요."}
              </p>

              <div style={{ marginTop: '40px', display: 'flex', gap: '15px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', opacity: 0.6 }}>
                    <span>🥚 Free-Range Egg</span>
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', opacity: 0.6 }}>
                    <span>🥛 Organic Milk</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ backgroundColor: '#2A2A2A', color: 'white', padding: '80px 20px', marginTop: '100px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={styles.footerGrid}>
            <div>
               <h3 style={{ fontSize: '32px', fontFamily: '"Playfair Display", serif', marginBottom: '20px', color: colors.bg }}>Rolling Spoon</h3>
               <p style={{ opacity: 0.6, lineHeight: '1.6', maxWidth: '400px' }}>
                 Healthy sweetness for your daily life.<br/>
                 We research natural ingredients for better dessert culture.
               </p>
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '20px', color: colors.accent }}>EXPLORE</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px', opacity: 0.8, cursor: 'pointer' }}>
                <li onClick={() => handleNavClick('menu')}>Menu</li>
                <li onClick={() => handleNavClick('locations')}>Locations</li>
                <li onClick={() => handleNavClick('story')}>Brand Story</li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '20px', color: colors.accent }}>LEGAL</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px', opacity: 0.8 }}>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Business License</li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', opacity: 0.4, fontSize: '13px', gap: '10px' }}>
            <span>© 2025 Rolling Spoon Inc.</span>
            <span>Made in Busan, Korea</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;