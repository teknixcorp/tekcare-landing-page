/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { 
  Calendar, FileText, Activity, Package, DollarSign, Users, Smartphone, BarChart, 
  CheckCircle2, ArrowRight, ChevronDown, Phone, Mail, Star, ShieldCheck, Clock, 
  Wrench, TrendingUp, Heart, Sparkles, Zap, LayoutGrid, ArrowUpRight
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Giải pháp', 'Quy trình', 'Hiệu quả', 'Gói đầu tư'];
  const navIds = ['features', 'workflow', 'stats', 'pricing'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-white/20 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <div className="text-2xl font-serif font-bold tracking-tight text-gray-900 cursor-pointer">
          <span className="tracking-tighter">Tek<span className="text-primary">Care</span><span className="text-primary">.</span></span>
        </div>
        
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((item, idx) => (
            <a 
              key={idx} 
              href={`#${navIds[idx]}`}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="#demo"
            className="hidden md:inline-flex px-6 py-2.5 rounded-full text-sm font-medium transition-all bg-primary-dark text-white hover:bg-primary hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            Nhận Demo
          </a>
          
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col space-y-4">
              {navLinks.map((item, idx) => (
                <a 
                  key={idx} 
                  href={`#${navIds[idx]}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-gray-800 hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
              <a 
                href="#demo"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex justify-center px-6 py-3 mt-4 rounded-full text-base font-medium transition-all bg-primary-dark text-white hover:bg-primary"
              >
                Nhận Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionTag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider mb-6 bg-primary-light/50 text-primary border border-primary/10">
    <Zap className="w-3 h-3" />
    {children}
  </span>
);

const FadeIn: React.FC<{ children: React.ReactNode, delay?: number, className?: string }> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, type: "spring", stiffness: 100, damping: 20 }}
    className={className}
  >
    {children}
  </motion.div>
);

const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const MagneticButton = ({ children, className = "", href = "#" }: { children: React.ReactNode, className?: string, href?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const dx = useSpring(x, springConfig);
  const dy = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: dx, y: dy }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

// --- Main App ---

export default function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    clinicName: '',
    clinicType: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    if (!formData.fullName) newErrors.fullName = true;
    if (!formData.phone) newErrors.phone = true;
    if (!formData.email || !formData.email.includes('@')) newErrors.email = true;
    if (!formData.clinicName) newErrors.clinicName = true;
    if (!formData.clinicType) newErrors.clinicType = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://n8n-hub.teknix.services/webhook/devose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('devose:Wqtvvybvo4YdywsI3yfDmmyZI2CYXJYSIFWhyI3Ulhqb9lCKJCMX90tOOEZxsQc2')
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phoneNumber: formData.phone,
          email: formData.email,
          clinicName: formData.clinicName,
          type: formData.clinicType,
          note: formData.note,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert('Có lỗi xảy ra, vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Không thể kết nối tới máy chủ. Vui lòng kiểm tra lại mạng.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream selection:bg-primary/20 selection:text-primary-dark">
      <div className="noise" />
      <Navbar />

       {/* SECTION 1: HERO */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
        {/* Vibrant Background Blobs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-[100px] animate-blob" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-300/30 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-10 left-1/3 w-96 h-96 bg-purple-400/30 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000" />
        <div className="absolute bottom-20 right-1/3 w-80 h-80 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob" />

        <div className="max-w-[1200px] mx-auto px-6 w-full relative z-10 flex flex-col items-center text-center">
          <FadeIn className="flex flex-col items-center w-full">
            <h1 className="text-4xl md:text-7xl font-serif font-medium text-gray-900 mb-6 leading-[1.1] tracking-tight max-w-4xl">
              Kỷ nguyên mới trong quản lý <br />
              <span className="text-gradient font-serif italic">Phòng Khám & Spa</span>
            </h1>
            <p className="text-base md:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed font-light">
              Chuyển đổi số toàn diện: Tối ưu vận hành, kiểm soát rủi ro, nâng tầm trải nghiệm khách hàng trên một nền tảng duy nhất.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#demo" 
                className="px-8 py-4 bg-gradient-primary text-white rounded-full font-medium hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center"
              >
                Nhận tài khoản Demo <ArrowRight className="ml-2 w-5 h-5" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255, 255, 255, 1)" }}
                whileTap={{ scale: 0.95 }}
                href="#features" 
                className="px-8 py-4 bg-white/60 backdrop-blur-md border border-gray-200 text-gray-900 rounded-full font-medium transition-all flex items-center"
              >
                Khám phá <ChevronDown className="ml-2 w-5 h-5" />
              </motion.a>
            </div>
          </FadeIn>

          {/* Floating Dashboard Mockup */}
          <FadeIn delay={0.2} className="w-full max-w-5xl relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-secondary/20 to-accent/20 rounded-[2rem] blur-2xl -z-10 transform translate-y-4" />
            <div className="glass rounded-[2rem] border border-white/60 shadow-2xl overflow-hidden flex flex-col bg-white/40 backdrop-blur-2xl">
              {/* Mac-like Header */}
              <div className="h-12 border-b border-white/40 flex items-center px-4 gap-2 bg-white/30">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="mx-auto px-4 py-1 rounded-md bg-white/50 text-[10px] font-mono text-gray-500 flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3" /> tekcare.vn/dashboard
                </div>
              </div>
              {/* Dashboard Body */}
              <div className="flex h-[400px]">
                {/* Sidebar */}
                <div className="w-48 border-r border-white/40 p-4 flex flex-col gap-2 bg-white/20">
                  <div className="h-8 rounded-md bg-primary/10 mb-4 flex items-center px-2 gap-2">
                    <div className="w-4 h-4 rounded bg-primary/40" />
                    <div className="h-2 w-16 bg-primary/40 rounded" />
                  </div>
                  <div className="h-6 rounded-md bg-white/50" />
                  <div className="h-6 rounded-md bg-white/50" />
                  <div className="h-6 rounded-md bg-white/50" />
                  <div className="h-6 rounded-md bg-white/50" />
                </div>
                {/* Main Content */}
                <div className="flex-1 p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-6 w-32 rounded-md bg-gray-200/80" />
                    <div className="h-8 w-24 rounded-full bg-primary/10" />
                  </div>
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 rounded-xl bg-white/60 border border-white/40 p-4 flex flex-col justify-between">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><Users className="w-4 h-4 text-blue-600"/></div>
                      <div className="h-4 w-16 bg-gray-200/80 rounded" />
                    </div>
                    <div className="h-24 rounded-xl bg-white/60 border border-white/40 p-4 flex flex-col justify-between">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><DollarSign className="w-4 h-4 text-green-600"/></div>
                      <div className="h-4 w-16 bg-gray-200/80 rounded" />
                    </div>
                    <div className="h-24 rounded-xl bg-white/60 border border-white/40 p-4 flex flex-col justify-between">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center"><Calendar className="w-4 h-4 text-purple-600"/></div>
                      <div className="h-4 w-16 bg-gray-200/80 rounded" />
                    </div>
                  </div>
                  {/* Chart Area */}
                  <div className="flex-1 rounded-xl bg-white/60 border border-white/40 p-4 flex items-end gap-2">
                     <div className="w-full h-[40%] bg-primary/20 rounded-t-md" />
                     <div className="w-full h-[70%] bg-primary/40 rounded-t-md" />
                     <div className="w-full h-[50%] bg-primary/30 rounded-t-md" />
                     <div className="w-full h-[90%] bg-primary/60 rounded-t-md" />
                     <div className="w-full h-[60%] bg-primary/40 rounded-t-md" />
                     <div className="w-full h-[80%] bg-primary/50 rounded-t-md" />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 2: PAIN POINTS */}
      <section className="section-padding bg-white relative z-20 rounded-t-[3.5rem] -mt-12 shadow-[0_-20px_60px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <SectionTag>VẤN ĐỀ</SectionTag>
            <h2 className="text-4xl md:text-6xl font-serif text-gray-900 mb-6 tracking-tight leading-tight">Bạn đang gặp <span className="text-red-500 italic">khó khăn?</span></h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium">Những điểm nghẽn khiến phòng khám của bạn không thể mở rộng và tối ưu lợi nhuận.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
            {[
              { title: 'Lịch hẹn rời rạc', desc: 'Quản lý bằng Excel, Zalo, sổ tay — trùng lịch, quên lịch liên tục.' },
              { title: 'Hồ sơ phân tán', desc: 'Mỗi lần khách đến phải hỏi lại thông tin. Dữ liệu rải rác, dễ thất lạc.' },
              { title: 'Mất dấu khách hàng', desc: 'Không biết khách đang chờ, đang khám hay đã xong. Ùn ứ phòng chờ.' },
              { title: 'Thất thoát vật tư', desc: 'Kiểm kê thủ công, không kiểm soát tiêu hao. Hoa hồng tính sai.' },
              { title: 'Rủi ro y khoa', desc: 'KTV gặp sự cố không báo kịp bác sĩ. Không có hệ thống cảnh báo.' },
              { title: 'Phụ thuộc IT', desc: 'Sửa nội dung App/Web đều phải chờ lập trình viên. Chậm và tốn kém.' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} className="h-full">
                <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 hover:border-red-100 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(239,68,68,0.1)] hover:-translate-y-2 transition-all duration-500 group h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:text-white transition-all duration-500">
                      <span className="text-xl font-black text-red-500 group-hover:text-white">✕</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: ECOSYSTEM */}
      <section id="features" className="section-padding bg-cream relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <SectionTag>HỆ SINH THÁI</SectionTag>
              <h2 className="text-4xl md:text-6xl font-serif text-gray-900 mb-6 tracking-tight leading-tight">Số hóa toàn diện <br/>quy trình y tế</h2>
              <p className="text-lg md:text-xl text-gray-500 font-medium">Một nền tảng duy nhất giải quyết đồng thời: Trải nghiệm khách hàng, Kiểm soát chủ cơ sở, và Vận hành pháp lý.</p>
            </div>
            <motion.a 
              whileHover={{ x: 5 }}
              href="#demo" 
              className="inline-flex items-center font-medium text-primary hover:text-primary-dark transition-all text-lg"
            >
              Khám phá tất cả tính năng <ArrowUpRight className="ml-2 w-6 h-6" />
            </motion.a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
            {[
              { icon: Calendar, title: 'Đặt lịch & Điều phối', desc: 'Kanban Board trực quan, kéo thả cập nhật trạng thái lịch hẹn real-time.', span: 'lg:col-span-2' },
              { icon: FileText, title: 'Hồ sơ bệnh án EHR', desc: 'Phác đồ điều trị, ảnh trước/sau, xét nghiệm — vĩnh viễn không thất lạc.', span: 'lg:col-span-1' },
              { icon: Activity, title: 'Workflow tự động', desc: 'Check-in → Khám → Điều trị → Thanh toán. Chuẩn hóa, không phụ thuộc người.', span: 'lg:col-span-1' },
              { icon: Package, title: 'Kho dược & Vật tư', desc: 'Nhập/Xuất/Tồn real-time. Tự động trừ kho chính xác theo liệu trình.', span: 'lg:col-span-1' },
              { icon: DollarSign, title: 'Thu ngân & Tài chính', desc: 'Hóa đơn, thanh toán QR Code, theo dõi công nợ. Minh bạch 100%.', span: 'lg:col-span-1' },
              { icon: Users, title: 'Nhân sự & Hoa hồng', desc: 'Chấm công, tính lương, hoa hồng BS/KTV tự động theo từng dịch vụ.', span: 'lg:col-span-1' },
              { icon: Smartphone, title: 'App khách hàng', desc: 'Đặt lịch online, xem hồ sơ cá nhân, nhận nhắc hẹn tái khám tự động.', span: 'lg:col-span-2' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} className={`h-full ${item.span || ''}`}>
                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] transition-all duration-500 h-full group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                      <item.icon className="w-7 h-7 text-gray-900 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-serif text-gray-900 mb-4 tracking-tight">{item.title}</h3>
                    <p className="text-gray-500 text-base leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: WORKFLOW */}
      <section id="workflow" className="section-padding bg-[#001a33] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px] -z-10" />

        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider mb-6 bg-white/10 text-white border border-white/20">
              <Activity className="w-3 h-3" />
              QUY TRÌNH
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6 tracking-tight">Luồng vận hành tự động</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-medium text-lg">Từ khi khách đặt lịch đến khi hoàn tất dịch vụ. Mọi bước đều được số hóa và giám sát real-time.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 pb-8">
            {[
              { id: '01', title: 'Check-in', tag: 'Lễ tân', desc: 'Tự động nhận diện hồ sơ & đẩy lịch vào phòng khám' },
              { id: '02', title: 'Tư vấn', tag: 'Tư vấn viên', desc: 'Nhập Intake Form, tạo/cập nhật hồ sơ khách tập trung' },
              { id: '03', title: 'Thăm khám', tag: 'Bác sĩ', desc: 'Khám, chẩn đoán, lưu EHR & đồng bộ phác đồ điều trị' },
              { id: '04', title: 'Điều trị', tag: 'KTV', desc: 'Thực hiện liệu trình, auto-deduct vật tư & tính hoa hồng' },
              { id: '05', title: 'Thanh toán', tag: 'Thu ngân', desc: 'Xuất hóa đơn QR Code, cập nhật công nợ tự động' },
              { id: '06', title: 'Chăm sóc', tag: 'Hệ thống', desc: 'Nhắc tái khám, tích điểm, gửi CSKH cá nhân hóa' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} className="h-full">
                <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 relative overflow-hidden group h-full hover:bg-white/10 transition-colors">
                  <span className="absolute -top-4 -right-4 text-8xl font-serif text-white/5 group-hover:text-primary/10 transition-colors z-0">
                    {item.id}
                  </span>
                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-white/10 text-white text-[10px] font-semibold rounded-full mb-6 uppercase tracking-wider">
                      {item.tag}
                    </span>
                    <h3 className="text-2xl font-serif mb-3">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="bg-gradient-primary p-1 rounded-2xl">
            <div className="bg-gray-900 p-6 rounded-xl flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
              <Activity className="w-8 h-8 text-primary animate-pulse" />
              <p className="font-medium text-lg">
                Giám sát Real-time: Cập nhật tức thì khách ở phòng nào, bác sĩ nào đang phục vụ, phòng nào đang trống.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: ROI & COMMITMENT */}
      <section id="stats" className="section-padding bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <SectionTag>HIỆU QUẢ</SectionTag>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6 tracking-tight">Phương trình lợi nhuận</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">Những con số thực tế khi triển khai TekCare cho phòng khám và thẩm mỹ viện.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 pb-8">
            {[
              { icon: TrendingUp, val: 40, prefix: '⬆ ', suffix: '%', label: 'Tăng hiệu suất vận hành', desc: 'Loại bỏ nhập liệu thủ công, tối ưu thời gian phục vụ', color: 'text-primary' },
              { icon: FileText, val: 70, prefix: '⬇ ', suffix: '%', label: 'Giảm thời gian giấy tờ', desc: '100% hồ sơ số, PDF trả kết quả tự động', color: 'text-blue-500' },
              { icon: ShieldCheck, val: 20, prefix: '⬇ ', suffix: '%', label: 'Giảm thất thoát vật tư', desc: 'Auto-deduct chính xác theo định mức liệu trình', color: 'text-orange-500' },
              { icon: Heart, val: 35, prefix: '⬆ ', suffix: '%', label: 'Tăng khách hàng quay lại', desc: 'Nhắc lịch, chăm sóc, tích điểm tự động', color: 'text-purple-500' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} className="h-full">
                <div className="bg-cream p-8 rounded-[2rem] text-center h-full border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                  <div className={`text-5xl font-extrabold mb-4 ${item.color} tracking-tighter`}>
                    {item.prefix}
                    <Counter value={item.val} suffix={item.suffix} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{item.label}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: 'Bảo mật kép', desc: 'Tuân thủ Luật An ninh mạng & tiêu chuẩn mã hóa y tế quốc tế' },
              { icon: Clock, title: 'Đúng hẹn', desc: 'Cam kết go-live chuẩn xác theo lộ trình 22 tuần' },
              { icon: Wrench, title: 'Bảo hành vận hành', desc: 'Miễn phí 3–6 tháng xử lý lỗi & cập nhật sau bàn giao' },
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-[1.5rem] border border-gray-100">
                <div className="bg-white p-2 rounded-xl shadow-sm">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-1">{item.title}</h5>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: PRICING */}
      <section id="pricing" className="section-padding bg-cream relative overflow-hidden">
        {/* Advanced Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,76,158,0.05)_0%,transparent_70%)] pointer-events-none" />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" 
        />
        
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <SectionTag>ĐẦU TƯ</SectionTag>
            <h2 className="text-4xl md:text-7xl font-serif text-gray-900 mb-6 tracking-tight leading-tight">
              Giải pháp <span className="text-secondary italic">tối ưu</span> <br className="hidden md:block" /> cho mọi quy mô
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-light">Lựa chọn gói dịch vụ phù hợp để bắt đầu hành trình số hóa ngay hôm nay.</p>
          </div>

          {/* Main Pricing Tiers */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 pb-8">
              {/* Starter */}
              <div className="h-full">
                <FadeIn className="h-full">
                  <motion.div 
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-xl p-8 lg:p-10 rounded-[3rem] border border-white/50 h-full flex flex-col transition-all group relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]"
                  >
                    <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50/50 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    </div>
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="mb-8">
                        <motion.div 
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                          className="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-teal-500/30"
                        >
                          <Zap className="w-8 h-8" />
                        </motion.div>
                        <h3 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-2 tracking-tight">Starter</h3>
                        <p className="text-sm text-teal-600 font-medium uppercase tracking-widest">Mức: Cơ bản</p>
                      </div>
                      
                      <div className="mb-10">
                        <div className="flex items-baseline gap-1">
                          <span className="text-5xl font-serif text-gray-900 tracking-tight">2.990k</span>
                          <span className="text-gray-400 font-light text-sm uppercase tracking-widest">/tháng</span>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                          <Users className="w-5 h-5 text-teal-500" />
                          <span className="text-xs font-medium text-teal-700 uppercase tracking-wider bg-teal-100/50 px-3 py-1.5 rounded-full">Tối đa 5 người dùng</span>
                        </div>
                      </div>

                      <div className="space-y-6 flex-grow mb-12">
                        <div className="mb-6">
                          <h4 className="text-xs font-semibold text-gray-400 mb-4 uppercase tracking-widest">Tính năng:</h4>
                          <ul className="space-y-4">
                            {[
                              'CRM & Lịch hẹn',
                              'Hồ sơ cơ bản và thanh toán'
                            ].map((f, i) => (
                              <li key={i} className="flex items-start text-base text-gray-700 font-light group/item">
                                <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 group-hover/item:bg-teal-500 group-hover/item:text-white transition-colors">
                                  <CheckCircle2 className="w-4 h-4 text-teal-600 group-hover/item:text-white" />
                                </div>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-gray-400 mb-4 uppercase tracking-widest">Đối tượng:</h4>
                          <ul className="space-y-4">
                            {[
                              'Phòng khám nhỏ',
                              'Spa mini',
                              'Startup Clinic'
                            ].map((f, i) => (
                              <li key={i} className="flex items-start text-base text-gray-700 font-light group/item">
                                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 group-hover/item:bg-gray-200 transition-colors">
                                  <Star className="w-3.5 h-3.5 text-gray-500" />
                                </div>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-8 mt-auto">
                        <MagneticButton 
                          href="#demo" 
                          className="block w-full py-5 bg-white text-teal-700 rounded-[2rem] font-medium text-center hover:bg-teal-50 transition-all border-2 border-teal-100 shadow-sm"
                        >
                          Bắt đầu ngay
                        </MagneticButton>
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>
              </div>

              {/* Standard - Best Choice */}
              <div className="h-full">
                <FadeIn delay={0.1} className="h-full">
                  <motion.div 
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-8 lg:p-10 rounded-[3rem] relative h-full flex flex-col shadow-[0_0_40px_rgba(20,184,166,0.15)] z-10 group text-white border border-secondary/30"
                  >
                    <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
                      {/* Animated background glow */}
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 right-0 w-64 h-64 bg-secondary blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"
                      />
                    </div>

                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-primary-dark text-[11px] font-semibold px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl z-20">
                      Best Choice
                    </div>
                    
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="mb-8">
                        <motion.div 
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          className="w-16 h-16 bg-white/20 backdrop-blur-md text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl border border-white/30"
                        >
                          <TrendingUp className="w-8 h-8" />
                        </motion.div>
                        <h3 className="text-3xl lg:text-4xl font-serif mb-2 tracking-tight text-secondary">Standard</h3>
                        <p className="text-sm text-white/80 font-medium uppercase tracking-widest">Mức: Nâng cao</p>
                      </div>
                      
                      <div className="mb-10">
                        <div className="flex items-baseline gap-1">
                          <span className="text-5xl font-serif tracking-tight">6.490k</span>
                          <span className="text-white/70 font-light text-sm uppercase tracking-widest">/tháng</span>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                          <Users className="w-5 h-5 text-secondary" />
                          <span className="text-xs font-medium text-primary-dark uppercase tracking-wider bg-secondary px-3 py-1.5 rounded-full shadow-sm">10–15 người dùng</span>
                        </div>
                      </div>

                      <div className="space-y-6 flex-grow mb-12">
                        <div className="mb-6">
                          <h4 className="text-xs font-semibold text-white/60 mb-4 uppercase tracking-widest">Tính năng:</h4>
                          <ul className="space-y-4">
                            {[
                              'CRM & Lịch hẹn',
                              'Quản lý kho/vật tư',
                              'Hỗ trợ đa chi nhánh mức độ cơ bản',
                              'Phân quyền chi tiết, báo cáo nâng cao'
                            ].map((f, i) => (
                              <li key={i} className="flex items-start text-base text-white font-light group/item">
                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 group-hover/item:bg-secondary transition-colors">
                                  <CheckCircle2 className="w-4 h-4 text-white group-hover/item:text-primary-dark" />
                                </div>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-white/60 mb-4 uppercase tracking-widest">Đối tượng:</h4>
                          <ul className="space-y-4">
                            {[
                              'Đơn vị đang mở rộng'
                            ].map((f, i) => (
                              <li key={i} className="flex items-start text-base text-white font-light group/item">
                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 group-hover/item:bg-white/30 transition-colors">
                                  <Star className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-8 mt-auto">
                        <MagneticButton 
                          href="#demo" 
                          className="block w-full py-5 bg-secondary text-primary-dark rounded-[2rem] font-medium text-center hover:bg-white transition-all shadow-xl"
                        >
                          Chọn Standard
                        </MagneticButton>
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>
              </div>

              {/* Premium */}
              <div className="h-full">
                <FadeIn delay={0.2} className="h-full">
                  <motion.div 
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-[#0a0a0a] p-8 lg:p-10 rounded-[3rem] border border-gray-800 h-full flex flex-col text-white transition-all group relative shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                  >
                    <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
                      {/* Gold accents */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                    </div>
                    
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="mb-8">
                        <motion.div 
                          animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                          className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-secondary/20"
                        >
                          <ShieldCheck className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-3xl lg:text-4xl font-serif mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#f9d423] to-[#ff4e50]">Premium</h3>
                        <p className="text-sm text-secondary/80 font-medium uppercase tracking-widest">Mức: Toàn diện</p>
                      </div>
                      
                      <div className="mb-10">
                        <div className="flex items-baseline gap-1">
                          <span className="text-5xl font-serif tracking-tight text-white">11.900k</span>
                          <span className="text-gray-500 font-light text-sm uppercase tracking-widest">/tháng</span>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                          <Users className="w-5 h-5 text-secondary" />
                          <span className="text-xs font-medium text-secondary uppercase tracking-wider bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">Tối đa 25 người dùng</span>
                        </div>
                      </div>

                      <div className="space-y-6 flex-grow mb-12">
                        <div className="mb-6">
                          <h4 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-widest">Tính năng:</h4>
                          <ul className="space-y-4">
                            {[
                              'Tất cả tính năng Standard',
                              'Đa chi nhánh toàn diện',
                              'AI phân tích & Dashboard',
                              'Tích hợp thiết bị IoT',
                              'SLA & Backup cao cấp'
                            ].map((f, i) => (
                              <li key={i} className="flex items-start text-base text-gray-300 font-light group/item">
                                <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 group-hover/item:bg-secondary transition-colors">
                                  <CheckCircle2 className="w-4 h-4 text-gray-400 group-hover/item:text-white" />
                                </div>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-widest">Đối tượng:</h4>
                          <ul className="space-y-4">
                            {[
                              'Chuỗi phòng khám lớn',
                              'Bệnh viện thẩm mỹ'
                            ].map((f, i) => (
                              <li key={i} className="flex items-start text-base text-gray-300 font-light group/item">
                                <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 group-hover/item:bg-gray-700 transition-colors">
                                  <Star className="w-3.5 h-3.5 text-gray-400" />
                                </div>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-8 mt-auto">
                        <MagneticButton 
                          href="#demo" 
                          className="block w-full py-5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-[2rem] font-medium text-center hover:from-gray-700 hover:to-gray-800 hover:text-secondary transition-all border border-gray-700 shadow-lg"
                        >
                          Liên hệ tư vấn
                        </MagneticButton>
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>
              </div>
            </div>

            {/* Mobile Swipe Indicator */}
            <div className="flex lg:hidden justify-center gap-2 mt-2 mb-12">
              <div className="w-8 h-1.5 bg-secondary rounded-full" />
              <div className="w-2 h-1.5 bg-gray-300 rounded-full" />
              <div className="w-2 h-1.5 bg-gray-300 rounded-full" />
            </div>
          </div>

          {/* Bento Grid for Extras */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 pb-8">
            {/* Additional Users */}
            <FadeIn className="md:col-span-4">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] border border-gray-200/50 h-full flex flex-col justify-between group hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Users className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-serif text-gray-900 tracking-tight">Thêm người dùng</h4>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-serif text-primary tracking-tight">250k</span>
                      <span className="text-gray-400 text-xs font-semibold uppercase tracking-widest">/người/tháng</span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">Linh hoạt mở rộng quy mô nhân sự bất cứ lúc nào khi phòng khám phát triển.</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>

            {/* Setup Fee */}
            <FadeIn delay={0.1} className="md:col-span-4">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] border border-gray-200/50 h-full flex flex-col justify-between group hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-all">
                      <Wrench className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-serif text-gray-900 tracking-tight">Phí setup ban đầu</h4>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-serif text-gray-900 tracking-tight">5 – 10tr</span>
                      <span className="text-gray-400 text-xs font-semibold uppercase tracking-widest">VNĐ (tùy quy mô)</span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">Triển khai chuyên nghiệp, đào tạo nhân sự & đảm bảo hệ thống vận hành ổn định.</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>

            {/* Add-ons List */}
            <FadeIn delay={0.2} className="md:col-span-4">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-[#001226]/90 backdrop-blur-xl p-10 rounded-[3rem] text-white h-full flex flex-col justify-between relative overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] transition-all duration-500"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                  <h4 className="text-xl font-serif mb-8 flex items-center gap-3 tracking-tight">
                    <LayoutGrid className="w-6 h-6 text-primary" /> Module nâng cao
                  </h4>
                  <div className="space-y-4">
                    {[
                      { n: 'AI Chẩn đoán hình ảnh', p: '2tr' },
                      { n: 'Marketing Automation', p: '1.5tr' },
                      { n: 'Telemedicine (Video)', p: '1tr' }
                    ].map((a, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all group/item">
                        <span className="text-sm font-medium text-gray-300 group-hover/item:text-white transition-colors">{a.n}</span>
                        <span className="text-sm font-medium text-primary">+{a.p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          </div>

          {/* Offers & Trial - High Impact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 pb-8">
            <FadeIn className="bg-gradient-primary p-12 rounded-[3.5rem] text-white relative overflow-hidden group shadow-2xl shadow-primary/20">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-[120px] pointer-events-none" 
              />
              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
                    <TrendingUp className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-serif tracking-tight">Ưu đãi thanh toán năm</h3>
                </div>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-7xl md:text-8xl font-serif tracking-tight">Giảm 15%</span>
                </div>
                <p className="text-lg text-white/80 font-medium leading-relaxed max-w-md">
                  Tiết kiệm chi phí tối đa hoặc nhận ngay 2 tháng sử dụng miễn phí khi thanh toán gói 12 tháng.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.08)] relative overflow-hidden group">
              <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-3xl font-serif tracking-tight text-gray-900">Trải nghiệm Freemium</h3>
                </div>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-7xl md:text-8xl font-serif tracking-tight text-primary">14 ngày</span>
                </div>
                <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-md">
                  Dùng thử đầy đủ tính năng trong 14 ngày hoặc giới hạn 50 hồ sơ khách hàng đầu tiên. Không rủi ro.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SECTION 7: DEMO FORM */}
      <section id="demo" className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl -z-10" />
        
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <FadeIn>
              <SectionTag>DÙNG THỬ</SectionTag>
              <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6 tracking-tight">Nhận tài khoản <br/>Demo miễn phí</h2>
              <p className="text-lg text-gray-500 mb-12 font-medium">Điền thông tin bên dưới để nhận ngay tài khoản Demo miễn phí, trải nghiệm toàn bộ hệ sinh thái TekCare trên thiết bị của bạn.</p>
              
              <div className="space-y-8">
                {[
                  { icon: Activity, title: 'Thiết lập trong 24 giờ', desc: 'Không cần cài đặt phức tạp, sẵn sàng trải nghiệm ngay.' },
                  { icon: Smartphone, title: 'Trải nghiệm đa nền tảng', desc: 'Sử dụng mượt mà trên iPad, Desktop và Mobile.' },
                  { icon: ShieldCheck, title: 'Dữ liệu demo riêng biệt', desc: 'Bảo mật hoàn toàn, không lo lộ thông tin thật.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-5">
                    <div className="bg-cream p-4 rounded-2xl border border-gray-100">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="pt-2">
                      <h4 className="font-semibold text-gray-900 mb-1 text-lg">{item.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onSubmit={handleSubmit} 
                      className="space-y-4 md:space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Họ và tên *</label>
                          <input 
                            type="text" 
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Nguyễn Văn A"
                            className={`w-full px-4 py-3 md:px-5 md:py-4 rounded-xl md:rounded-2xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${errors.fullName ? 'border-red-500' : 'border-gray-200'}`}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Số điện thoại *</label>
                          <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="0912 345 678"
                            className={`w-full px-4 py-3 md:px-5 md:py-4 rounded-xl md:rounded-2xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Email *</label>
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="email@phongkham.vn"
                            className={`w-full px-4 py-3 md:px-5 md:py-4 rounded-xl md:rounded-2xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Tên phòng khám / TMV *</label>
                          <input 
                            type="text" 
                            name="clinicName"
                            value={formData.clinicName}
                            onChange={handleInputChange}
                            placeholder="VD: Thẩm mỹ viện Sao Hàn"
                            className={`w-full px-4 py-3 md:px-5 md:py-4 rounded-xl md:rounded-2xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${errors.clinicName ? 'border-red-500' : 'border-gray-200'}`}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Loại hình cơ sở *</label>
                        <select 
                          name="clinicType"
                          value={formData.clinicType}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 md:px-5 md:py-4 rounded-xl md:rounded-2xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none ${errors.clinicType ? 'border-red-500' : 'border-gray-200'}`}
                        >
                          <option value="">— Chọn loại hình —</option>
                          <option value="tmv">Thẩm mỹ viện / Clinic thẩm mỹ</option>
                          <option value="nhakhoa">Phòng khám nha khoa</option>
                          <option value="spa">Spa trị liệu</option>
                          <option value="dakhoa">Phòng khám đa khoa</option>
                          <option value="chuoi">Chuỗi phòng khám / Bệnh viện</option>
                          <option value="khac">Khác</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Ghi chú (tùy chọn)</label>
                        <textarea 
                          name="note"
                          value={formData.note}
                          onChange={handleInputChange}
                          placeholder="VD: Tôi quan tâm module EHR và Kho vật tư..."
                          rows={3}
                          className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl md:rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                        />
                      </div>

                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 md:py-5 bg-primary-dark text-white rounded-xl md:rounded-2xl font-medium text-base md:text-lg hover:bg-primary transition-all shadow-lg flex items-center justify-center disabled:opacity-70 mt-4"
                      >
                        {isSubmitting ? 'Đang xử lý...' : 'Nhận tài khoản Demo miễn phí'}
                      </button>

                      <p className="text-xs text-gray-400 text-center leading-relaxed font-medium">
                        Đội ngũ TekCare sẽ liên hệ trong vòng 24 giờ để thiết lập tài khoản.<br />Không ràng buộc hợp đồng. Hủy bất cứ lúc nào.
                      </p>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16"
                    >
                      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                      </div>
                      <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">Đăng ký thành công!</h3>
                      <p className="text-gray-500 leading-relaxed text-lg mb-8">
                        Cảm ơn <span className="font-semibold text-gray-900">{formData.fullName}</span> từ <span className="font-semibold text-gray-900">{formData.clinicName}</span>. Đội ngũ TekCare sẽ liên hệ bạn trong vòng 24 giờ để thiết lập tài khoản Demo miễn phí.
                      </p>
                      <button 
                        onClick={() => setIsSuccess(false)}
                        className="px-8 py-3 bg-gray-100 text-gray-900 rounded-full font-medium hover:bg-gray-200 transition-colors"
                      >
                        Quay lại form
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SECTION 8: FOOTER */}
      <footer className="bg-[#001a33] pt-24 pb-12 text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="text-3xl font-serif font-bold mb-6 cursor-pointer">
                <span className="tracking-tighter text-white">Tek<span className="text-secondary">Care</span><span className="text-secondary">.</span></span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm font-medium">
                Giải pháp công nghệ toàn diện: Tối ưu vận hành, nâng tầm trải nghiệm khách hàng cho phòng khám và thẩm mỹ viện.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm text-gray-300 font-medium">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+84 28 6275 0668</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-300 font-medium">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>newfactorjsc@gmail.com</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-8 text-gray-500">Giải pháp</h4>
              <ul className="space-y-4 text-sm text-gray-300 font-medium">
                {['Đặt lịch & Điều phối', 'Hồ sơ bệnh án EHR', 'Workflow tự động', 'Kho dược & Vật tư', 'BI Dashboard'].map((item, i) => (
                  <li key={i} className="hover:text-primary transition-colors cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-8 text-gray-500">Phù hợp cho</h4>
              <ul className="space-y-4 text-sm text-gray-300 font-medium">
                {['Clinic Thẩm mỹ', 'Phòng khám Nha khoa', 'Spa Trị liệu', 'Phòng khám đa khoa', 'Chuỗi bệnh viện'].map((item, i) => (
                  <li key={i} className="hover:text-primary transition-colors cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-medium">
            <p>© 2026 TekCare. All rights reserved.</p>
            <p className="mt-4 md:mt-0">IMAPS 2026 — A Decade of Academic Excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
