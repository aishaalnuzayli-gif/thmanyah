import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  BarChart3,
  CalendarDays,
  Eye,
  Globe2,
  Heart,
  MessageCircle,
  Play,
  Radio,
  Search,
  Star,
  Target,
  Trophy,
  Users,
} from 'lucide-react';
import './styles.css';

const sections = [
  { id: 'overview', number: '01', label: 'نظرة عامة', theme: 'light' },
  { id: 'numbers', number: '02', label: 'الأرقام', theme: 'light' },
  { id: 'audience', number: '03', label: 'الجمهور', theme: 'light' },
  { id: 'interaction', number: '04', label: 'التفاعل', theme: 'light' },
  { id: 'moments', number: '05', label: 'اللحظات', theme: 'light' },
  { id: 'ending', number: '06', label: 'الخلاصة', theme: 'light' },
];

const kpis = [
  { label: 'وصول المحتوى المباشر', value: 26.7, suffix: 'M+', growth: '35%' },
  { label: 'إجمالي التفاعلات', value: 30.6, suffix: 'M+', growth: '41%' },
  { label: 'مشاهدات الفيديو', value: 556.3, suffix: 'M+', growth: '32%' },
];

const overviewMetrics = [
  { label: 'مرات الظهور', value: 750.4, suffix: 'M+', icon: Eye },
  { label: 'مشاهدات الفيديو', value: 556.3, suffix: 'M+', icon: Play },
  { label: 'إجمالي التفاعلات', value: 30.6, suffix: 'M+', icon: Heart },
  { label: 'وصول المحتوى المباشر', value: 26.7, suffix: 'M+', icon: Radio },
  { label: 'وصول المحتوى غير المباشر', value: 5.1, suffix: 'M+', icon: Globe2 },
  { label: 'وصول دوري روشن', value: 3.7, suffix: 'M+', icon: Star },
];

const overviewSummary = [
  { label: 'فترة التقرير', value: '12 أغسطس 2025 — 22 فبراير 2026', icon: CalendarDays },
  { label: 'مباراة', value: '306', icon: Trophy },
  { label: 'مستهدف', value: '117', icon: Target },
  { label: 'فعلي', value: '189', icon: BarChart3 },
];

const reachMix = [
  { name: 'المحتوى المباشر', value: 26.7, display: '26.7M+', color: '#d5c17f' },
  { name: 'المحتوى غير المباشر', value: 5.1, display: '5.1M+', color: '#8f9367' },
  { name: 'دوري روشن', value: 3.7, display: '3.7M+', color: '#5f6251' },
];

const appearanceSeries = [
  { month: 'أغسطس', value: 118.2, score: 20, growth: '8%' },
  { month: 'سبتمبر', value: 176.4, score: 28, growth: '14%' },
  { month: 'أكتوبر', value: 322.8, score: 45, growth: '19%' },
  { month: 'نوفمبر', value: 368.9, score: 50, growth: '23%' },
  { month: 'ديسمبر', value: 556.3, score: 68, growth: '28%' },
  { month: 'يناير', value: 689.7, score: 86, growth: '31%' },
  { month: 'فبراير', value: 750.4, score: 104, growth: '28%' },
];

const timeline = [
  { date: 'أغسطس 2025', title: 'انطلاقة الموسم', text: 'بداية موسم جديد وآمال تتجدد. ومحتوى يواكب الشغف منذ اليوم الأول.' },
  { date: 'أكتوبر 2025', title: 'الكلاسيكو', text: 'أكبر مواجهات الموسم تفتح أبواب التفاعل على مصراعيها.' },
  { date: 'نوفمبر 2025', title: 'ديربي الرياض', text: 'قمة العاصمة التي أشعلت المنصات وأثارت النقاشات الجماهيرية.' },
  { date: 'ديسمبر 2025', title: 'نهائي كأس الملك', text: 'الحدث الأعلى الذي جمع الجماهير على المدرجات والشاشات.' },
  { date: 'فبراير 2026', title: 'ختام الموسم', text: 'مع صافرة النهاية، يبقى أثر الموسم حيًا في ذاكرة الجمهور والمنصات.' },
];

const interactionCards = [
  { title: 'الكلاسيكو', value: '120M+', text: 'ليلة تجاوز فيها التفاعل حدود المباراة، وتحولت النقاشات إلى موجات مستمرة من المشاركة والنقاش.', tone: 'classic' },
  { title: 'ديربي الرياض', value: '85M+', text: 'تسعون دقيقة كانت كافية لتشعل المنصات بالمقاطع والتحليلات وردود الفعل المتلاحقة.', tone: 'derby' },
  { title: 'نهائي كأس الملك', value: '95M+', text: 'لحظة امتزج فيها التوتر بالاحتفال، وسط حضور جماهيري وصناعة محتوى لحظية.', tone: 'final' },
  { title: 'ختام الموسم', value: '30M+', text: 'مع صافرة النهاية، يبقى أثر الموسم حيًا في ذاكرة الجمهور والمنصات.', tone: 'closing' },
];

const gallery = [
  { title: 'صافرة البداية', date: 'فبراير 2025', text: 'ختام لا يُنسى', tone: 'start' },
  { title: 'اللقطة الحاسمة', date: 'ديسمبر 2025', text: 'لحظة تتوج موسمًا كبيرًا', tone: 'city' },
  { title: 'المدرج يتكلم', date: 'يناير 2026', text: 'نجم عالمي وجمهور استثنائي', tone: 'trophy' },
  { title: 'بعد النهاية', date: 'أغسطس 2025', text: 'أجواء لا تُنسى', tone: 'after' },
];

const socialLinks = [
  { label: 'يوتيوب', href: 'https://www.youtube.com/@thmanyah', mark: '▶', text: 'محتوى غني ومتنوع للجمهور' },
  { label: 'إكس', href: 'https://x.com/thmanyah', mark: '𝕏', text: 'تفاعل لحظي ومحادثات مستمرة' },
  { label: 'تيك توك', href: 'https://www.tiktok.com/@thmanyah', mark: '♪', text: 'محتوى إبداعي يصل للشباب' },
  { label: 'إنستغرام', href: 'https://www.instagram.com/thmanyah', mark: 'instagram', text: 'لحظات بصرية وقصص ملهمة' },
  { label: 'فيسبوك', href: 'https://www.facebook.com/thmanyah', mark: 'f', text: 'مجتمع متفاعل من مختلف الفئات' },
];

const audienceInsights = [
  { title: 'جمهور واسع ومتنوع', text: 'من مختلف الفئات العمرية والمناطق.', icon: Users },
  { title: 'تفاعل كبير ومستمر', text: 'حضور قوي طوال الموسم وفي كل المنصات.', icon: BarChart3 },
  { title: 'شغف يجمع الملايين', text: 'ارتباط عاطفي عميق يعكس حب اللعبة.', icon: Heart },
  { title: 'انتشار جغرافي واسع', text: 'حضور جماهيري من جميع أنحاء المملكة.', icon: Globe2 },
];

const audienceSegments = [
  { label: 'شباب', value: 46 },
  { label: 'عائلات', value: 28 },
  { label: 'مشجعون دائمون', value: 18 },
  { label: 'جمهور جديد', value: 8 },
];

const audienceRegions = [
  { label: 'الرياض', value: 38 },
  { label: 'مكة المكرمة', value: 24 },
  { label: 'المنطقة الشرقية', value: 15 },
  { label: 'باقي المناطق', value: 13 },
  { label: 'عسير', value: 10 },
];
const regionSpots = [
  { id: 'riyadh', label: 'الرياض' },
  { id: 'makkah', label: 'مكة المكرمة' },
  { id: 'eastern', label: 'المنطقة الشرقية' },
  { id: 'aseer', label: 'عسير' },
  { id: 'north', label: 'باقي المناطق' },
];

function SocialMark({ mark }) {
  if (mark === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="instagram-icon">
        <rect x="4.2" y="4.2" width="15.6" height="15.6" rx="4.6" />
        <circle cx="12" cy="12" r="3.45" />
        <circle cx="16.55" cy="7.45" r="1.05" />
      </svg>
    );
  } 

  return mark;

}

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const active = sections[activeIndex];
  const reducedMotion = useReducedMotion();

  const goTo = (index) => {
    const next = Math.max(0, Math.min(sections.length - 1, index));
    if (next === activeIndex) return;
    setDirection(next > activeIndex ? 1 : -1);
    setActiveIndex(next);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (['ArrowDown', 'PageDown'].includes(event.key)) goTo(activeIndex + 1);
      if (['ArrowUp', 'PageUp'].includes(event.key)) goTo(activeIndex - 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex]);

  useEffect(() => {
    let locked = false;
    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < 28 || locked) return;
      locked = true;
      goTo(activeIndex + (event.deltaY > 0 ? 1 : -1));
      window.setTimeout(() => {
        locked = false;
      }, 850);
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [activeIndex]);

  const pageVariants = {
    enter: (dir) => ({ opacity: 0, y: reducedMotion ? 0 : dir * 34, filter: 'blur(8px)' }),
    center: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: (dir) => ({ opacity: 0, y: reducedMotion ? 0 : dir * -34, filter: 'blur(8px)' }),
  };

  return (
    <main className={`app-shell theme-${active.theme} active-${active.id}`} dir="rtl">
      <Navigation activeIndex={activeIndex} goTo={goTo} />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.section
          key={active.id}
          id={active.id}
          className={`report-page ${active.id}-page ${active.theme === 'dark' ? 'dark-page' : 'light-page'}`}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: reducedMotion ? 0.1 : 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          {!['overview', 'numbers', 'audience', 'interaction', 'moments', 'ending'].includes(active.id) && <PageNumber section={active} />}
          {active.id === 'overview' && <Overview onNext={() => goTo(1)} />}
          {active.id === 'numbers' && <Numbers />}
          {active.id === 'audience' && <Audience />}
          {active.id === 'interaction' && <Interaction />}
          {active.id === 'moments' && <Moments />}
          {active.id === 'ending' && <Ending />}
        </motion.section>
      </AnimatePresence>
    </main>
  );
}

function Navigation({ activeIndex, goTo }) {
  return (
    <nav className="nav" aria-label="أقسام التقرير">
      <button className="brand-mark" onClick={() => goTo(0)} aria-label="العودة إلى البداية">
        <img src="/thmanyah-logo-transparent.png" alt="ثمانية" />
      </button>
      <div className="nav-links">
        {sections.map((section, index) => (
          <button
            key={section.id}
            className={index === activeIndex ? 'active' : ''}
            onClick={() => goTo(index)}
          >
            <span>{section.number}</span>
            {section.label}
          </button>
        ))}
      </div>
      <button className="search-button" type="button" aria-label="بحث">
        <Search size={30} strokeWidth={1.8} />
      </button>
    </nav>
  );
}


function PageNumber({ section }) {
  return (
    <div className="page-number" aria-hidden="true">
      <span>{section.number}</span>
      <small>{section.label}</small>
    </div>
  );
}


function Overview({ onNext }) {
  return (
    <div className="page-inner overview-grid">
      <motion.figure className="vintage-frame" initial={{ opacity: 0, x: -26 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
        <img src="/overview-camera.png" alt="كاميرا تصوير في ملعب كرة قدم" />
      </motion.figure>

      <div className="hero-copy">
        <h1>بين الملعب<br />والجمهور</h1>
        <div className="gold-divider" aria-hidden="true"><span /></div>
        <p className="lead">
          لم يكن الموسم مجرد حدث رياضي،<br />
          بل تجربة جماهيرية امتدت من المدرجات<br />
          إلى الشاشات.
        </p>
      </div>

      <div className="black-strip" aria-label="مؤشرات النظرة العامة">
        {overviewMetrics.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label}>
              <strong><Counter value={item.value} suffix={item.suffix} /></strong>
              <Icon size={18} strokeWidth={1.5} />
              <span>{item.label}</span>
            </article>
          );
        })}
      </div>

      <div className="summary-strip" aria-label="ملخص التقرير">
        {overviewSummary.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label}>
              <Icon size={36} strokeWidth={1.7} />
              <div>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Numbers() {
  const total = useMemo(() => reachMix.reduce((sum, item) => sum + item.value, 0), []);
  const [activePoint, setActivePoint] = useState(appearanceSeries.length - 1);
  const selected = appearanceSeries[activePoint];

  return (
    <div className="page-inner numbers-grid">
      <div className="data-stage numbers-main-card">
        <div className="chart-head">
          <span>مرات الظهور</span>
          <strong><Counter value={selected.value} suffix="M+" /></strong>
          <b>↑ {selected.growth}</b>
          <em>{selected.month}</em>
        </div>
        <HeroChart activeIndex={activePoint} onSelect={setActivePoint} />
      </div>

      <aside className="numbers-copy">
        <h2>الأرقام<br />تحكي القصة</h2>
        <p>
          أكثر من نصف مليار ظهور، بيانات تعكس حجم التفاعل ووصول المحتوى إلى أبعد مدى.
        </p>
      </aside>

      <div className="kpi-stack">
        {kpis.map((item) => (
          <KpiCard key={item.label} item={item} />
        ))}
      </div>

      <div className="reach-lab">
        <DonutChart total={total} />
        <BarChart />
      </div>
    </div>
  );
}

function Audience() {
  return (
    <div className="page-inner audience-grid">
      <div className="audience-copy audience-hero-copy">
        <h2>الجمهور في قلب الموسم</h2>
        <div className="gold-divider" aria-hidden="true"><span /></div>
        <p>
          من كل مكان ومن كل فئة عمرية، الجمهور هو المحرك الحقيقي للبطولة وصانع كل لحظة جميلة لا تُنسى.
        </p>
      </div>

      <div className="audience-card audience-insights">
        <h3>جمهور متنوع</h3>
        <div className="audience-segment-chart">
          {audienceSegments.map((segment) => (
            <article key={segment.label} style={{ '--segment': `${segment.value}%` }}>
              <div className="segment-top">
                <strong>{segment.label}</strong>
                <b>{segment.value}%</b>
              </div>
              <span><i /></span>
            </article>
          ))}
        </div>
        <div className="audience-mini-notes">
          {audienceInsights.slice(1, 3).map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title}>
                <Icon size={18} strokeWidth={1.7} />
                <p>{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="audience-card audience-map-card">
        <h3>تنوع جغرافي في الوصول</h3>
        <div className="geo-distribution-chart" aria-label="توزيع الوصول جغرافيًا">
          {audienceRegions.map((region, index) => (
            <article
              key={region.label}
              style={{ '--geo-value': `${region.value}%`, '--geo-index': index }}
            >
              <div>
                <strong>{region.label}</strong>
                <b>{region.value}%</b>
              </div>
              <span><i /></span>
            </article>
          ))}
        </div>
      </div>

      <div className="audience-card audience-social-card">
        <h3>حضور قوي عبر المنصات</h3>
        <div className="social-list">
          {socialLinks.map((item) => {
            return (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                <span className="social-mark"><SocialMark mark={item.mark} /></span>
                <div>
                  <strong>{item.label}</strong>
                  <small>{item.text}</small>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <blockquote className="audience-quote">
        <span>“</span>
        <p>لم يعد الجمهور مجرد متابع،<br />بل أصبح جزءًا من صناعة اللحظة.</p>
      </blockquote>
      </div>
  );
} 

function Interaction() {
  return (
    <div className="page-inner interaction-grid">
      <section className="interaction-intro">
        <h2>لحظات صنعت<br /><span>التفاعل</span></h2>
        <p>تجربة رياضية لا تُشاهد فقط... بل تُعاش وتُشارك.</p>
        <div className="gold-divider" aria-hidden="true"><span /></div>
        <div className="interaction-notes">
          <p>لم تعد المباريات تُستهلك داخل التسعين دقيقة فقط، بل أصبحت تمتد إلى الشاشات والمحادثات والمقاطع القصيرة التي يعيد الجمهور تداولها لساعات طويلة.</p>
          <p>تنجح ثمانية في تحويل اللحظة الرياضية إلى تجربة مستمرة: تبدأ من صافرة البداية، وتمتد إلى التحليل، والكواليس، وردود الفعل، والمحتوى المصاحب.</p>
          <p>لم يكن التفاعل مجرد أرقام مرتفعة، بل انعكاسًا لعلاقة جماهيرية حية مع المحتوى الرياضي الجديد الذي قدمته ثمانية.</p>
        </div>
      </section>

      <div className="timeline-panel">
        {timeline.map((item, index) => (
          <article key={item.title} className="timeline-item">
            <div>
              <small>{item.date}</small>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="interaction-moment-stack" aria-label="أبرز لحظات التفاعل">
        {interactionCards.map((card) => (
          <article key={card.title} className={`interaction-moment-card ${card.tone}`}>
            <div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <small>↗ إجمالي التفاعلات</small>
            </div>
            <strong>{card.value}</strong>
            </article>
        ))}
      </div>
    </div>
  );
}


function Moments() {
  return (
    <div className="page-inner moments-layout">
      <div className="moments-title">
        <h2>أرشيف اللحظات</h2>
        <p>لحظات لا تُنسى صنعت تاريخ الموسم<br />ولمست ذاكرة الجمهور.</p>
      </div>

      <div className="moments-gallery-shell">
        <div className="gallery-row">
          {gallery.map((item) => (
            <article key={item.title} className={`gallery-card ${item.tone}`}>
              <div className="gallery-image" aria-hidden="true" />
              <div>
                <h3>{item.title}</h3>
                <small>{item.date}</small>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <blockquote className="moments-quote">
        <span>”</span>
        <p>بعض اللحظات لا تُقاس بالأرقام،<br />بل تُحفر في الذاكرة.</p>
      </blockquote>
    </div>
  );
}

function Ending() {
  return (
    <div className="ending-scene">
      <div className="ending-content">
        <h2>لحظات صنعت التفاعل</h2>
        <div className="gold-divider" aria-hidden="true"><span /></div>
        <p>
          تجربة رياضية لا تُشاهد فقط...<br />
          بل تُعاش وتُشارك.
        </p>
        <p>
          لم يكن الموسم مجرد منافسة في الملعب،<br />
          بل مشهدًا متكاملًا صنعه الجمهور،<br />
          وتكاملت فيه اللحظة مع الحكاية،<br />
          داخل الملعب وخارجه،<br />
          على الشاشة وفي القلب.
        </p>
        <p className="ending-last">هذا الموسم... كان أكثر من لعبة.</p>
      </div>
    </div>
  );
}

function Counter({ value, suffix = '', decimals = 1 }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let frame;
    let start;
    const duration = 1150;
    const tick = (time) => {
      start ||= time;
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setShown(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <span dir="ltr">{shown.toFixed(decimals)}{suffix}</span>;
}

function KpiCard({ item }) {
  return (
    <article className="kpi-card">
      <strong><Counter value={item.value} suffix={item.suffix} /></strong>
      <span>{item.label}</span>
      <b>↑ {item.growth}</b>
    </article>
  );
}

function HeroChart({ activeIndex, onSelect }) {
  const coords = appearanceSeries.map((point, index) => [index * 86 + 44, 132 - point.score]);
  const polyline = coords.map(([x, y]) => `${x},${y}`).join(' ');
  const area = `42,132 ${polyline} ${coords.at(-1)[0]},132`;

  return (
    <svg className="hero-chart" viewBox="0 0 640 178" role="img" aria-label="رسم خطي لنمو مرات الظهور">
      <defs>
        <linearGradient id="heroArea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f0b94f" stopOpacity="0.52" />
          <stop offset="100%" stopColor="#f0b94f" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {[28, 62, 96, 132].map((y) => <line key={y} x1="74" x2="614" y1={y} y2={y} />)}
      {['1B', '750M', '250M', '0'].map((label, index) => (
        <text key={label} x="18" y={33 + index * 34}>{label}</text>
      ))}
      <polygon points={area} fill="url(#heroArea)" />
      <motion.polyline
        points={polyline}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.3, ease: 'easeOut' }}
      />
      {appearanceSeries.map((point, index) => (
        <g key={point.month}>
          <motion.circle
            className={activeIndex === index ? 'active-dot' : ''}
            cx={coords[index][0]}
            cy={coords[index][1]}
            r="6"
            initial={{ scale: 0 }}
            animate={{ scale: activeIndex === index ? 1.35 : 1 }}
            transition={{ delay: 0.2 + index * 0.04 }}
          />
          <circle
            className="hit-zone"
            cx={coords[index][0]}
            cy={coords[index][1]}
            r="18" 
            role="button" 
            tabIndex="0"
            aria-label={`عرض ${point.month}`}
            onClick={() => onSelect(index)}
            onMouseEnter={() => onSelect(index)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') onSelect(index);
            }}
          />
        </g>
      ))}
      {appearanceSeries.map((point, index) => (
        <text key={`${point.month}-${index}`} className="month-label" x={coords[index][0]} y="166">{point.month}</text>
      ))}
    </svg>
  );
}

function DonutChart({ total }) {
  const [activeReach, setActiveReach] = useState(0);
  const radius = 43;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <article className="donut-card">
      <h3>توزيع الوصول</h3>
      <div className="donut-wrap">
        <svg className="donut-svg" viewBox="0 0 120 120" aria-label="توزيع الوصول">
          <circle className="donut-track" cx="60" cy="60" r={radius} />
          {reachMix.map((item, index) => {
            const length = (item.value / total) * circumference;
            const dashOffset = -offset;
            offset += length;
            return (
              <circle
                key={item.name}
                className={activeReach === index ? 'active' : ''}
                cx="60"
                cy="60"
                r={radius}
                stroke={item.color}
                strokeDasharray={`${length} ${circumference - length}`}
                strokeDashoffset={dashOffset}
                onClick={() => setActiveReach(index)}
                onMouseEnter={() => setActiveReach(index)}
              />
            );
          })}
          <text x="60" y="56">{Math.round((reachMix[activeReach].value / total) * 100)}%</text>
          <text x="60" y="74">{reachMix[activeReach].display}</text>
        </svg>
        <div className="legend">
          {reachMix.map((item, index) => (
            <button
              key={item.name}
              className={activeReach === index ? 'active' : ''}
              onClick={() => setActiveReach(index)}
              onMouseEnter={() => setActiveReach(index)}
              type="button"
            >
              <i style={{ background: item.color }} />
              <span>{item.name}</span>
              <b>{Math.round((item.value / total) * 100)}%</b>
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

function BarChart() {
  const months = [
    ['أغسطس', 16],
    ['سبتمبر', 22],
    ['أكتوبر', 26],
    ['نوفمبر', 30],
    ['ديسمبر', 31],
    ['يناير', 37],
    ['فبراير', 43],
  ];
  const [activeMonth, setActiveMonth] = useState(months.length - 1);

  return (
    <article className="bar-card monthly-card">
      <h3>إجمالي التفاعلات عبر الأشهر <span>{months[activeMonth][0]} · {months[activeMonth][1]}M</span></h3>
      <div className="monthly-chart" aria-label="إجمالي التفاعلات عبر الأشهر">
        <div className="monthly-axis">
          <span>40M</span>
          <span>30M</span>
          <span>20M</span>
          <span>10M</span>
          <span>0</span>
        </div>
        <div className="monthly-bars">
          {months.map(([month, value], index) => (
            <button
              className={`monthly-bar ${activeMonth === index ? 'active' : ''}`}
              key={month}
              onClick={() => setActiveMonth(index)}
              onMouseEnter={() => setActiveMonth(index)}
              type="button"
            >
              <i style={{ height: `${(value / 43) * 100}%` }} />
              <span>{month}</span>
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

function LineChart() {
  const points = [22, 36, 31, 52, 67, 60, 79, 91];
  const polyline = points.map((point, index) => `${index * 72 + 10},${118 - point}`).join(' ');

  return (
    <svg className="interaction-chart" viewBox="0 0 520 128" role="img" aria-label="رسم خطي للتفاعل">
      {[26, 62, 98].map((y) => <line key={y} x1="0" x2="520" y1={y} y2={y} />)}
      <motion.polyline points={polyline} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }} />
    </svg>
  );
}

createRoot(document.getElementById('root')).render(<App />);
