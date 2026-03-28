/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { 
  Calendar, FileText, Activity, Package, DollarSign, Users, Smartphone, BarChart, 
  CheckCircle2, ArrowRight, ChevronDown, Phone, Mail, Star, ShieldCheck, Clock, 
  Wrench, TrendingUp, Heart, Sparkles, Zap, LayoutGrid, ArrowUpRight, Gift
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
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1920" 
            alt="Modern Clinic" 
            className="w-full h-full object-cover opacity-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream via-transparent to-cream" />
        </div>

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
      <section className="section-padding bg-gray-50/50 relative z-20 rounded-t-[3.5rem] -mt-12 shadow-[0_-20px_60px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1551076805-e18690c5e531?auto=format&fit=crop&q=80&w=1920" 
            alt="Clinic Chaos" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-20">
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
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:border-red-100 hover:shadow-[0_30px_60px_-15px_rgba(239,68,68,0.1)] hover:-translate-y-2 transition-all duration-500 group h-full relative overflow-hidden">
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
              { icon: Calendar, title: 'Đặt lịch & Điều phối', desc: 'Kanban Board trực quan, kéo thả cập nhật trạng thái lịch hẹn real-time.', span: 'lg:col-span-2', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800' },
              { icon: FileText, title: 'Hồ sơ bệnh án EHR', desc: 'Phác đồ điều trị, ảnh trước/sau, xét nghiệm — vĩnh viễn không thất lạc.', span: 'lg:col-span-1', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800' },
              { icon: Activity, title: 'Workflow tự động', desc: 'Check-in → Khám → Điều trị → Thanh toán. Chuẩn hóa, không phụ thuộc người.', span: 'lg:col-span-1', img: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800' },
              { icon: Package, title: 'Kho dược & Vật tư', desc: 'Nhập/Xuất/Tồn real-time. Tự động trừ kho chính xác theo liệu trình.', span: 'lg:col-span-1', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800' },
              { icon: DollarSign, title: 'Thu ngân & Tài chính', desc: 'Hóa đơn, thanh toán QR Code, theo dõi công nợ. Minh bạch 100%.', span: 'lg:col-span-1', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800' },
              { icon: Users, title: 'Nhân sự & Hoa hồng', desc: 'Chấm công, tính lương, hoa hồng BS/KTV tự động theo từng dịch vụ.', span: 'lg:col-span-1', img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800' },
              { icon: Smartphone, title: 'App khách hàng', desc: 'Đặt lịch online, xem hồ sơ cá nhân, nhận nhắc hẹn tái khám tự động.', span: 'lg:col-span-2', img: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} className={`h-full ${item.span || ''}`}>
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] transition-all duration-500 h-full group relative overflow-hidden flex flex-col">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  </div>
                  <div className="p-10 relative z-10 flex-grow">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                        <item.icon className="w-7 h-7 text-gray-900 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-2xl font-serif text-gray-900 mb-4 tracking-tight">{item.title}</h3>
                      <p className="text-gray-500 text-base leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: WORKFLOW */}
      <section id="workflow" className="section-padding bg-[#001a33] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1586222258102-17180424578b?auto=format&fit=crop&q=80&w=1920" 
            alt="Medical Workflow" 
            className="w-full h-full object-cover opacity-[0.05]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px] -z-10" />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-20">
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

        </div>
      </section>

      {/* SECTION 5: ROI & COMMITMENT */}
      <section id="stats" className="section-padding bg-gray-50/30 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-20">
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
                <div className="bg-white p-8 rounded-[2rem] text-center h-full border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-all duration-300">
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

      {/* SECTION 6: PRICING - DARK LUXURY */}
      <section id="pricing" className="py-32 bg-[#050505] text-white relative overflow-hidden">
        {/* Immersive Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=1920" 
            alt="Luxury Spa Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505]" />
        </div>
        
        <div className="max-w-[1200px] mx-auto relative z-10 px-6">
          <div className="mb-24 text-center md:text-left">
            <FadeIn>
              <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                <div className="w-12 h-px bg-secondary/50" />
                <span className="text-secondary font-mono text-xs tracking-[0.2em] uppercase">Bảng giá & Đầu tư</span>
                <div className="w-12 h-px bg-secondary/50 md:hidden" />
              </div>
              <h2 className="text-5xl md:text-7xl font-serif mb-8 tracking-tighter leading-[1.1] font-light">
                Đầu tư cho sự <span className="italic text-secondary">hoàn mỹ</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-xl font-light leading-relaxed mx-auto md:mx-0">
                Lựa chọn nền tảng quản lý xứng tầm với đẳng cấp dịch vụ của bạn. Thiết kế riêng cho các không gian làm đẹp và chăm sóc sức khỏe cao cấp.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Starter - Minimalist (4 cols) */}
            <div className="md:col-span-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group hover:bg-black/60 transition-all duration-500 flex flex-col">
              <FadeIn className="relative z-10 h-full flex flex-col">
                <div className="mb-8">
                  <h3 className="text-2xl font-serif tracking-tight mb-2 text-white/90">Starter</h3>
                  <p className="text-gray-500 text-[10px] font-medium uppercase tracking-[0.2em]">Nền tảng khởi đầu</p>
                </div>
                
                <div className="mb-10">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl md:text-5xl font-serif tracking-tighter text-white">2.990k</span>
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">/tháng • Tối đa 5 user</p>
                </div>

                <div className="space-y-5 mb-10 flex-grow">
                  {['CRM & Lịch hẹn cơ bản', 'Quản lý hồ sơ khách hàng', 'Thanh toán & Hóa đơn', 'Báo cáo doanh thu ngày'].map((f, i) => (
                    <div key={i} className="flex items-start text-sm text-gray-400 font-light">
                      <div className="w-1 h-1 rounded-full bg-secondary/50 mt-2 mr-4 flex-shrink-0" />
                      <span className="leading-relaxed">{f}</span>
                    </div>
                  ))}
                </div>

                <MagneticButton 
                  href="#demo" 
                  className="w-full py-4 border border-white/10 rounded-full text-xs uppercase tracking-[0.15em] font-medium hover:bg-white hover:text-black transition-colors text-center mt-auto"
                >
                  Bắt đầu ngay
                </MagneticButton>
              </FadeIn>
            </div>

            {/* Standard - The Hero Tier (8 cols) */}
            <div className="md:col-span-8 bg-[#0a0a0a] border border-secondary/30 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group">
              {/* Clinic Image Background for Standard */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200" 
                  alt="Modern Clinic" 
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
              </div>
              
              <div className="absolute top-8 right-8 bg-secondary/10 backdrop-blur-md border border-secondary/20 text-secondary text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-[0.2em] z-10">
                Khuyên dùng
              </div>

              <FadeIn delay={0.1} className="relative z-10 h-full flex flex-col w-full md:w-2/3">
                <div className="mb-8">
                  <h3 className="text-3xl md:text-4xl font-serif tracking-tight mb-2 text-white">Standard</h3>
                  <p className="text-secondary text-[10px] font-medium uppercase tracking-[0.2em]">Tối ưu vận hành chuyên nghiệp</p>
                </div>
                
                <div className="mb-10">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl md:text-6xl font-serif tracking-tighter text-white">6.490k</span>
                  </div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">/tháng • 10-15 nhân sự</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mb-12 flex-grow">
                  {['CRM & Lịch hẹn chuyên sâu', 'Quản lý kho/vật tư tự động', 'Hỗ trợ đa chi nhánh', 'Báo cáo BI nâng cao', 'Phân quyền chi tiết', 'App Khách hàng (Cơ bản)'].map((f, i) => (
                    <div key={i} className="flex items-start text-sm text-gray-300 font-light">
                      <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                      <span className="leading-relaxed">{f}</span>
                    </div>
                  ))}
                </div>

                <MagneticButton 
                  href="#demo" 
                  className="w-full sm:w-max inline-flex justify-center items-center px-10 py-4 bg-secondary text-black rounded-full text-xs uppercase tracking-[0.15em] font-bold hover:bg-white transition-colors"
                >
                  Chọn Standard
                </MagneticButton>
              </FadeIn>
            </div>

            {/* Premium Enterprise (12 cols) */}
            <div className="md:col-span-12 bg-black border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group mt-2">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1920" 
                  alt="Luxury Spa Treatment" 
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-700 mix-blend-luminosity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
              </div>

              <FadeIn delay={0.2} className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-10 mt-24 md:mt-32">
                <div className="max-w-2xl">
                  <h3 className="text-3xl md:text-5xl font-serif tracking-tight text-white mb-4">Premium Enterprise</h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light mb-8 max-w-xl">
                    Giải pháp toàn diện dành cho chuỗi hệ thống lớn. Bao gồm tất cả tính năng Standard, cộng thêm AI phân tích hình ảnh, tích hợp IoT, App khách hàng Custom và SLA 99.9%.
                  </p>
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl md:text-5xl font-serif tracking-tighter text-white">11.900k</span>
                    <span className="text-gray-500 text-xs uppercase tracking-widest">/tháng • Tối đa 25 user</span>
                  </div>
                </div>

                <div className="flex-shrink-0 w-full md:w-auto">
                  <MagneticButton 
                    href="#demo" 
                    className="w-full md:w-auto px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs uppercase tracking-[0.15em] font-bold hover:bg-white hover:text-black transition-colors text-center"
                  >
                    Liên hệ tư vấn
                  </MagneticButton>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Add-ons & Extras - Minimalist List */}
          <div className="mt-24 border-t border-white/10 pt-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
              <h4 className="text-3xl font-serif tracking-tight text-white">Tiện ích mở rộng</h4>
              <p className="text-xs text-secondary font-mono uppercase tracking-[0.2em]">Add-on Modules</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              {[
                { label: 'Thêm người dùng', val: '250k', unit: '/người/tháng', desc: 'Mở rộng linh hoạt theo quy mô.' },
                { label: 'Phí setup & Đào tạo', val: '5-10tr', unit: 'VNĐ', desc: 'Triển khai tận nơi, đảm bảo vận hành.' },
                { label: 'AI Chẩn đoán hình ảnh', val: '+2tr', unit: '/tháng', desc: 'Phân tích da/răng thông minh.' },
                { label: 'Marketing Automation', val: '+1.5tr', unit: '/tháng', desc: 'Kịch bản CSKH tự động qua Zalo/SMS.' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-end pb-6 border-b border-white/10 group hover:border-secondary/50 transition-colors">
                  <div>
                    <h5 className="text-lg font-serif text-white/90 mb-2">{item.label}</h5>
                    <p className="text-sm text-gray-500 font-light">{item.desc}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-serif text-white mb-1">{item.val}</div>
                    <div className="text-[10px] text-gray-600 uppercase tracking-[0.15em] font-mono">{item.unit}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: DEMO FORM */}
      <section id="demo" className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl -z-10" />
        
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <FadeIn>
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
              <div className="relative">
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
                <div className="bg-white p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative z-10">
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
                          <option value="Thẩm mỹ viện / Clinic thẩm mỹ">Thẩm mỹ viện / Clinic thẩm mỹ</option>
                          <option value="Phòng khám nha khoa">Phòng khám nha khoa</option>
                          <option value="Spa trị liệu">Spa trị liệu</option>
                          <option value="Phòng khám đa khoa">Phòng khám đa khoa</option>
                          <option value="Chuỗi phòng khám / Bệnh viện">Chuỗi phòng khám / Bệnh viện</option>
                          <option value="Khác">Khác</option>
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
              </div>
              <div className="mt-12 rounded-[2rem] overflow-hidden border border-gray-100 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200" 
                  alt="TekCare on Tablet" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
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
