import { useState, useEffect, useRef } from "react";
import {
  Eye, EyeOff, Search, Home, Activity, TrendingUp, User,
  ChevronRight, Check, Zap, Heart, Flame, Target, Play,
  ArrowLeft, Bell, Star, Clock, Plus
} from "lucide-react";

// ─── Shared helpers ────────────────────────────────────────────────────────────

const BLUE = "#4F8EF7";
const PURPLE = "#8A5CF6";

function GradientBg({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        background: `linear-gradient(145deg, #3a7bd5 0%, #4F8EF7 30%, #7c6ef7 60%, #8A5CF6 100%)`,
      }}
    />
  );
}

function GlassCard({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-3xl ${className}`}
      style={{
        background: "rgba(255,255,255,0.14)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.28)",
        boxShadow: "0 8px 32px rgba(79,142,247,0.18)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  className = "",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4 rounded-2xl font-semibold text-white text-base tracking-wide transition-all active:scale-[0.98] ${className}`}
      style={{
        background: disabled
          ? "rgba(79,142,247,0.4)"
          : `linear-gradient(135deg, ${BLUE} 0%, ${PURPLE} 100%)`,
        boxShadow: disabled ? "none" : "0 8px 24px rgba(79,142,247,0.4)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-4 rounded-2xl font-medium text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2.5 ${className}`}
      style={{
        background: "rgba(255,255,255,0.95)",
        border: "1.5px solid rgba(79,142,247,0.2)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        color: "#1a1a2e",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {children}
    </button>
  );
}

function InputField({
  label,
  placeholder,
  type = "text",
  rightIcon,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  rightIcon?: React.ReactNode;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: "#7b7d9a", fontFamily: "Inter, sans-serif" }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none transition-all"
          style={{
            background: "#f5f6fc",
            border: "1.5px solid rgba(79,142,247,0.15)",
            color: "#0f0f1a",
            fontFamily: "Inter, sans-serif",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = BLUE;
            e.target.style.boxShadow = "0 0 0 4px rgba(79,142,247,0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(79,142,247,0.15)";
            e.target.style.boxShadow = "none";
          }}
        />
        {rightIcon && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Screen 1: Splash ──────────────────────────────────────────────────────────

function SplashScreen({ onNext }: { onNext: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    const t2 = setTimeout(() => onNext(), 2600);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [onNext]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <GradientBg />

      {/* Decorative orbs */}
      <div
        className="absolute top-[-80px] left-[-60px] w-64 h-64 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-60px] right-[-40px] w-56 h-56 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)" }}
      />

      <div
        className="relative flex flex-col items-center gap-8 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
      >
        {/* Logo mark */}
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(20px)",
            border: "1.5px solid rgba(255,255,255,0.4)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
          }}
        >
          <Zap className="w-12 h-12 text-white" strokeWidth={2.5} />
        </div>

        {/* Fitness illustration placeholder */}
        <div className="relative w-64 h-52">
          {/* Simplified SVG fitness illustration */}
          <svg viewBox="0 0 256 208" className="w-full h-full" fill="none">
            {/* Background glow */}
            <ellipse cx="128" cy="160" rx="90" ry="28" fill="rgba(255,255,255,0.1)" />

            {/* Running figure */}
            <circle cx="128" cy="48" r="18" fill="rgba(255,255,255,0.9)" />
            {/* Body */}
            <path d="M120 66 C116 80 112 96 114 112" stroke="rgba(255,255,255,0.9)" strokeWidth="6" strokeLinecap="round" />
            <path d="M128 66 C130 80 134 96 136 112" stroke="rgba(255,255,255,0.9)" strokeWidth="6" strokeLinecap="round" />
            {/* Arms */}
            <path d="M120 78 C110 72 102 74 96 80" stroke="rgba(255,255,255,0.8)" strokeWidth="5" strokeLinecap="round" />
            <path d="M128 78 C138 70 146 68 154 72" stroke="rgba(255,255,255,0.8)" strokeWidth="5" strokeLinecap="round" />
            {/* Legs */}
            <path d="M114 112 C108 126 104 140 100 155" stroke="rgba(255,255,255,0.9)" strokeWidth="6" strokeLinecap="round" />
            <path d="M136 112 C140 126 146 138 152 150" stroke="rgba(255,255,255,0.9)" strokeWidth="6" strokeLinecap="round" />

            {/* Decorative rings */}
            <circle cx="52" cy="96" r="20" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
            <circle cx="52" cy="96" r="12" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
            <circle cx="204" cy="80" r="16" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
            <circle cx="204" cy="80" r="8" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />

            {/* Heartbeat line */}
            <polyline
              points="30,150 55,150 65,130 75,170 90,140 100,150 200,150"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* App name + tagline */}
        <div className="flex flex-col items-center gap-2">
          <h1
            className="text-4xl font-black text-white tracking-tight"
            style={{ fontFamily: "Inter, sans-serif", letterSpacing: "-0.02em" }}
          >
            FitPulse
          </h1>
          <p
            className="text-base font-medium text-white/70 tracking-wide"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Your Health, Your Journey
          </p>
        </div>
      </div>

      {/* Loading indicator */}
      <div
        className="absolute bottom-14 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1.5 rounded-full"
              style={{
                width: i === 0 ? "24px" : "8px",
                background: i === 0 ? "white" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 2: Welcome ────────────────────────────────────────────────────────

function WelcomeScreen({ onNext, onLogin }: { onNext: () => void; onLogin: () => void }) {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      {/* Top gradient hero */}
      <div className="relative flex-shrink-0" style={{ height: "52%" }}>
        <GradientBg />

        {/* Decorative shapes */}
        <div
          className="absolute top-[-40px] right-[-30px] w-48 h-48 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-20 left-[-20px] w-32 h-32 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
        />

        {/* Illustration */}
        <div className="absolute inset-0 flex items-center justify-center pt-8">
          <svg viewBox="0 0 300 240" className="w-72 h-56" fill="none">
            {/* Workout scene */}
            <rect x="60" y="160" width="180" height="8" rx="4" fill="rgba(255,255,255,0.2)" />

            {/* Person doing yoga/stretch */}
            <circle cx="150" cy="58" r="22" fill="rgba(255,255,255,0.92)" />
            {/* Body */}
            <path d="M138 80 Q134 100 130 120" stroke="rgba(255,255,255,0.92)" strokeWidth="8" strokeLinecap="round" />
            <path d="M162 80 Q166 100 170 120" stroke="rgba(255,255,255,0.92)" strokeWidth="8" strokeLinecap="round" />
            {/* Arms raised */}
            <path d="M140 88 Q120 68 100 56" stroke="rgba(255,255,255,0.85)" strokeWidth="7" strokeLinecap="round" />
            <path d="M160 88 Q180 68 200 56" stroke="rgba(255,255,255,0.85)" strokeWidth="7" strokeLinecap="round" />
            {/* Legs */}
            <path d="M130 120 Q124 140 118 160" stroke="rgba(255,255,255,0.92)" strokeWidth="8" strokeLinecap="round" />
            <path d="M170 120 Q176 140 182 160" stroke="rgba(255,255,infinity,0.92)" strokeWidth="8" strokeLinecap="round" />

            {/* Floating stats cards */}
            <rect x="20" y="110" width="72" height="36" rx="10" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
            <text x="56" y="124" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="Inter">CALORIES</text>
            <text x="56" y="138" textAnchor="middle" fill="white" fontSize="14" fontWeight="800" fontFamily="Inter">842</text>

            <rect x="208" y="100" width="72" height="36" rx="10" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
            <text x="244" y="114" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="Inter">STREAK</text>
            <text x="244" y="128" textAnchor="middle" fill="white" fontSize="14" fontWeight="800" fontFamily="Inter">21 days</text>
          </svg>
        </div>

        {/* Curved bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 393 60"
          preserveAspectRatio="none"
          style={{ height: 60 }}
        >
          <path d="M0 60 Q196 0 393 60 L393 60 L0 60Z" fill="#f0f2f8" />
        </svg>
      </div>

      {/* Bottom content */}
      <div className="flex-1 bg-[#f0f2f8] flex flex-col justify-between px-6 pb-10 pt-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 mt-2">
            <h2
              className="text-3xl font-black text-[#0f0f1a] leading-tight"
              style={{ fontFamily: "Inter, sans-serif", letterSpacing: "-0.02em" }}
            >
              Train Smarter,{"\n"}Live Better
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#7b7d9a", fontFamily: "Inter, sans-serif" }}
            >
              Join 2M+ people who transformed their health with personalized workouts, smart nutrition, and real-time progress tracking.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex gap-2 flex-wrap mt-1">
            {["AI Workouts", "Nutrition Tracking", "Live Classes"].map((f) => (
              <div
                key={f}
                className="px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(79,142,247,0.1)",
                  color: BLUE,
                  border: "1px solid rgba(79,142,247,0.2)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {f}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <PrimaryButton onClick={onNext}>Get Started</PrimaryButton>
          <button
            onClick={onLogin}
            className="text-sm font-medium py-2 text-center transition-opacity"
            style={{ color: "#7b7d9a", fontFamily: "Inter, sans-serif" }}
          >
            Already have an account?{" "}
            <span style={{ color: BLUE, fontWeight: 600 }}>Log In</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 3: Sign Up ────────────────────────────────────────────────────────

function SignUpScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div className="w-full h-full bg-[#f0f2f8] flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-12 pb-6">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: "#0f0f1a" }} />
        </button>
        <h1
          className="text-2xl font-black text-[#0f0f1a]"
          style={{ fontFamily: "Inter, sans-serif", letterSpacing: "-0.02em" }}
        >
          Create Account
        </h1>
        <p className="text-sm mt-1" style={{ color: "#7b7d9a", fontFamily: "Inter, sans-serif" }}>
          Start your fitness journey today
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-5 flex flex-col gap-4">
        <InputField label="Full Name" placeholder="Alex Johnson" value={name} onChange={setName} />
        <InputField label="Email" placeholder="alex@email.com" type="email" value={email} onChange={setEmail} />
        <InputField
          label="Password"
          placeholder="Min. 8 characters"
          type={showPw ? "text" : "password"}
          value={pw}
          onChange={setPw}
          rightIcon={
            <button onClick={() => setShowPw(!showPw)} className="p-0.5">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />
        <InputField
          label="Confirm Password"
          placeholder="Repeat password"
          type={showConfirm ? "text" : "password"}
          value={confirm}
          onChange={setConfirm}
          rightIcon={
            <button onClick={() => setShowConfirm(!showConfirm)} className="p-0.5">
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />

        {/* Terms */}
        <button
          onClick={() => setAgreed(!agreed)}
          className="flex items-start gap-3 mt-1"
        >
          <div
            className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center transition-all mt-0.5"
            style={{
              background: agreed ? `linear-gradient(135deg, ${BLUE}, ${PURPLE})` : "white",
              border: agreed ? "none" : "1.5px solid rgba(79,142,247,0.3)",
              boxShadow: agreed ? "0 2px 8px rgba(79,142,247,0.4)" : "none",
            }}
          >
            {agreed && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
          </div>
          <span className="text-xs leading-relaxed text-left" style={{ color: "#7b7d9a", fontFamily: "Inter, sans-serif" }}>
            I agree to the{" "}
            <span style={{ color: BLUE, fontWeight: 600 }}>Terms of Service</span>
            {" "}and{" "}
            <span style={{ color: BLUE, fontWeight: 600 }}>Privacy Policy</span>
          </span>
        </button>

        <PrimaryButton onClick={onNext} disabled={!agreed} className="mt-2">
          Create Account
        </PrimaryButton>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.1)" }} />
          <span className="text-xs font-medium" style={{ color: "#7b7d9a" }}>OR</span>
          <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.1)" }} />
        </div>

        {/* Social buttons */}
        <SecondaryButton>
          <svg viewBox="0 0 24 24" className="w-5 h-5" aria-label="Google">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </SecondaryButton>

        <SecondaryButton className="mb-6">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#000000" aria-label="Apple">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          Continue with Apple
        </SecondaryButton>
      </div>
    </div>
  );
}

// ─── Screen 4: OTP Verification ───────────────────────────────────────────────

function OTPScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const id = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  function handleChange(i: number, v: string) {
    if (!/^\d?$/.test(v)) return;
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs.current[i - 1]?.focus();
  }

  const filled = otp.every((d) => d !== "");

  return (
    <div className="w-full h-full bg-[#f0f2f8] flex flex-col">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex-shrink-0">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: "#0f0f1a" }} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center px-6">
        {/* Illustration */}
        <div
          className="w-32 h-32 rounded-3xl flex items-center justify-center mb-6"
          style={{
            background: `linear-gradient(135deg, ${BLUE}20, ${PURPLE}20)`,
            border: `2px solid ${BLUE}25`,
          }}
        >
          <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none">
            <rect x="12" y="24" width="56" height="40" rx="8" fill={BLUE} fillOpacity="0.15" stroke={BLUE} strokeWidth="2" />
            <path d="M12 34 L40 50 L68 34" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
            <circle cx="58" cy="22" r="10" fill={PURPLE} />
            <path d="M53 22 L57 26 L64 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1
          className="text-2xl font-black text-[#0f0f1a] text-center mb-2"
          style={{ fontFamily: "Inter, sans-serif", letterSpacing: "-0.02em" }}
        >
          Verify Your Account
        </h1>
        <p
          className="text-sm text-center leading-relaxed mb-8"
          style={{ color: "#7b7d9a", fontFamily: "Inter, sans-serif" }}
        >
          We sent a 6-digit code to{" "}
          <span style={{ color: "#0f0f1a", fontWeight: 600 }}>alex@email.com</span>
        </p>

        {/* OTP boxes */}
        <div className="flex gap-3 mb-8">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 text-center text-xl font-bold rounded-2xl outline-none transition-all"
              style={{
                fontFamily: "Inter, sans-serif",
                background: digit ? `linear-gradient(135deg, ${BLUE}15, ${PURPLE}15)` : "white",
                border: digit ? `2px solid ${BLUE}` : "1.5px solid rgba(79,142,247,0.2)",
                color: "#0f0f1a",
                boxShadow: digit ? `0 4px 16px rgba(79,142,247,0.2)` : "0 2px 8px rgba(0,0,0,0.06)",
              }}
            />
          ))}
        </div>

        {/* Timer & resend */}
        <div className="flex items-center gap-1 mb-8">
          {timer > 0 ? (
            <p className="text-sm" style={{ color: "#7b7d9a", fontFamily: "Inter, sans-serif" }}>
              Resend code in{" "}
              <span style={{ color: BLUE, fontWeight: 600 }}>
                0:{String(timer).padStart(2, "0")}
              </span>
            </p>
          ) : (
            <button
              onClick={() => setTimer(59)}
              className="text-sm font-semibold"
              style={{ color: BLUE, fontFamily: "Inter, sans-serif" }}
            >
              Resend OTP
            </button>
          )}
        </div>

        <PrimaryButton onClick={onNext} disabled={!filled} className="w-full">
          Verify Account
        </PrimaryButton>

        {/* Progress indicator */}
        <div className="flex gap-2 mt-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all"
              style={{
                width: i === 2 ? "24px" : "8px",
                background: i === 2 ? BLUE : "rgba(79,142,247,0.25)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 5: Success ────────────────────────────────────────────────────────

function SuccessScreen({ onNext }: { onNext: () => void }) {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setScale(1), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-between overflow-hidden" style={{ background: "#f0f2f8" }}>
      {/* Top gradient accent */}
      <div
        className="absolute top-0 left-0 right-0 h-80"
        style={{
          background: "linear-gradient(180deg, rgba(79,142,247,0.08) 0%, transparent 100%)",
        }}
      />

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8 relative">
        {/* Success animation */}
        <div
          className="relative transition-all duration-700"
          style={{
            transform: `scale(${scale})`,
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Outer ring */}
          <div
            className="w-52 h-52 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(79,142,247,0.12), rgba(138,92,246,0.12))",
              border: "2px solid rgba(79,142,247,0.2)",
            }}
          >
            {/* Middle ring */}
            <div
              className="w-40 h-40 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(79,142,247,0.18), rgba(138,92,246,0.18))",
                border: "2px solid rgba(79,142,247,0.3)",
              }}
            >
              {/* Core */}
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${BLUE}, ${PURPLE})`,
                  boxShadow: "0 16px 48px rgba(79,142,247,0.45)",
                }}
              >
                <Check className="w-14 h-14 text-white" strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Floating sparkles */}
          {[
            { top: "0%", left: "15%", size: 12 },
            { top: "10%", right: "8%", size: 8 },
            { bottom: "8%", left: "8%", size: 8 },
            { bottom: "15%", right: "12%", size: 12 },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                ...pos,
                width: pos.size,
                height: pos.size,
                background: i % 2 === 0 ? BLUE : PURPLE,
                opacity: 0.7,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <h1
            className="text-3xl font-black text-[#0f0f1a]"
            style={{ fontFamily: "Inter, sans-serif", letterSpacing: "-0.02em" }}
          >
            Account Created!
          </h1>
          <p
            className="text-base"
            style={{ color: "#7b7d9a", fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}
          >
            Welcome to FitPulse, Alex! Your personalized fitness journey starts now.
          </p>
        </div>

        {/* Achievement badges */}
        <div className="flex gap-3">
          {[
            { icon: "🔥", label: "Day 1" },
            { icon: "⚡", label: "Active" },
            { icon: "🎯", label: "Goals Set" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 px-4 py-3 rounded-2xl"
              style={{
                background: "white",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                border: "1px solid rgba(79,142,247,0.1)",
              }}
            >
              <span className="text-2xl">{icon}</span>
              <span className="text-xs font-semibold" style={{ color: "#7b7d9a" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full px-6 pb-10">
        <PrimaryButton onClick={onNext}>Start Your Journey</PrimaryButton>
      </div>
    </div>
  );
}

// ─── Screen 6: Home Preview ───────────────────────────────────────────────────

const WORKOUTS = [
  { name: "HIIT Cardio", duration: "30 min", cal: "320 kcal", level: "High", color: `linear-gradient(135deg, ${BLUE}, #3a6fd8)`, emoji: "⚡" },
  { name: "Yoga Flow", duration: "45 min", cal: "180 kcal", level: "Low", color: `linear-gradient(135deg, ${PURPLE}, #6b3fa8)`, emoji: "🧘" },
  { name: "Strength", duration: "50 min", cal: "410 kcal", level: "Med", color: "linear-gradient(135deg, #f59e0b, #d97706)", emoji: "💪" },
];

const CATEGORIES = [
  { name: "Cardio", icon: "🏃", active: true },
  { name: "Strength", icon: "💪", active: false },
  { name: "Yoga", icon: "🧘", active: false },
  { name: "HIIT", icon: "⚡", active: false },
  { name: "Swim", icon: "🏊", active: false },
];

function HomeScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);

  const NAV_TABS = [
    { icon: Home, label: "Home" },
    { icon: Activity, label: "Activity" },
    { icon: TrendingUp, label: "Progress" },
    { icon: User, label: "Profile" },
  ];

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: "#f0f2f8" }}>
      {/* Status bar */}
      <div className="flex-shrink-0 flex justify-between items-center px-6 pt-12 pb-4">
        <div>
          <p className="text-xs font-medium" style={{ color: "#7b7d9a", fontFamily: "Inter, sans-serif" }}>
            Good Morning 👋
          </p>
          <h1
            className="text-xl font-black text-[#0f0f1a]"
            style={{ fontFamily: "Inter, sans-serif", letterSpacing: "-0.02em" }}
          >
            Alex Johnson
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
          >
            <Bell className="w-5 h-5" style={{ color: "#0f0f1a" }} />
          </button>
          <div
            className="w-10 h-10 rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 2px 12px rgba(79,142,247,0.25)" }}
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format"
              alt="Alex Johnson profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex-shrink-0 px-5 mb-4">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
        >
          <Search className="w-4 h-4" style={{ color: "#7b7d9a" }} />
          <span className="text-sm" style={{ color: "#7b7d9a", fontFamily: "Inter, sans-serif" }}>
            Search workouts, exercises...
          </span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 pb-4" style={{ scrollbarWidth: "none" }}>
        {/* Daily Goals Card */}
        <div
          className="rounded-3xl p-5 mb-5 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${BLUE} 0%, ${PURPLE} 100%)`,
            boxShadow: "0 12px 32px rgba(79,142,247,0.35)",
          }}
        >
          <div
            className="absolute top-[-20px] right-[-20px] w-40 h-40 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
          />
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">Daily Goals</p>
              <p className="text-xl font-black text-white">68% Complete</p>
            </div>
            <div
              className="px-2.5 py-1 rounded-xl text-xs font-semibold"
              style={{ background: "rgba(255,255,255,0.2)", color: "white" }}
            >
              Day 1 🔥
            </div>
          </div>

          {/* Progress metrics */}
          <div className="flex gap-4 mb-4">
            {[
              { icon: Flame, label: "Calories", val: "842", max: "1200", pct: 70 },
              { icon: Heart, label: "BPM", val: "72", max: "100", pct: 72 },
              { icon: Target, label: "Steps", val: "6.2k", max: "10k", pct: 62 },
            ].map(({ icon: Icon, label, val, pct }) => (
              <div key={label} className="flex-1 flex flex-col gap-1.5">
                <div className="flex items-center gap-1">
                  <Icon className="w-3 h-3 text-white/80" />
                  <span className="text-xs text-white/70 font-medium">{label}</span>
                </div>
                <p className="text-base font-black text-white">{val}</p>
                <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.25)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: "rgba(255,255,255,0.85)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="flex justify-between items-center mb-3">
          <h2
            className="text-base font-black text-[#0f0f1a]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Categories
          </h2>
          <button className="text-xs font-semibold" style={{ color: BLUE }}>See all</button>
        </div>

        <div className="flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map(({ name, icon }, i) => (
            <button
              key={name}
              onClick={() => setActiveCategory(i)}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-semibold transition-all"
              style={{
                background: activeCategory === i
                  ? `linear-gradient(135deg, ${BLUE}, ${PURPLE})`
                  : "white",
                color: activeCategory === i ? "white" : "#0f0f1a",
                boxShadow: activeCategory === i
                  ? "0 4px 16px rgba(79,142,247,0.35)"
                  : "0 2px 8px rgba(0,0,0,0.06)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <span>{icon}</span>
              {name}
            </button>
          ))}
        </div>

        {/* Featured Workouts */}
        <div className="flex justify-between items-center mb-3">
          <h2
            className="text-base font-black text-[#0f0f1a]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Featured Workouts
          </h2>
          <button className="text-xs font-semibold" style={{ color: BLUE }}>See all</button>
        </div>

        <div className="flex flex-col gap-3">
          {WORKOUTS.map(({ name, duration, cal, level, color, emoji }) => (
            <div
              key={name}
              className="flex items-center gap-4 p-4 rounded-3xl"
              style={{
                background: "white",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl"
                style={{ background: color, boxShadow: "0 4px 12px rgba(79,142,247,0.25)" }}
              >
                {emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-[#0f0f1a] truncate" style={{ fontFamily: "Inter, sans-serif" }}>
                  {name}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs" style={{ color: "#7b7d9a" }}>
                    <Clock className="w-3 h-3" /> {duration}
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: "#7b7d9a" }}>
                    <Flame className="w-3 h-3" /> {cal}
                  </span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-lg"
                    style={{
                      background: `rgba(79,142,247,0.1)`,
                      color: BLUE,
                    }}
                  >
                    {level}
                  </span>
                </div>
              </div>
              <button
                className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${BLUE}, ${PURPLE})`, boxShadow: "0 4px 12px rgba(79,142,247,0.35)" }}
              >
                <Play className="w-4 h-4 text-white" fill="white" />
              </button>
            </div>
          ))}

          {/* Trainer card */}
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
          >
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=393&h=180&fit=crop&auto=format"
              alt="Featured trainer workout session"
              className="w-full h-36 object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(15,15,26,0.8) 0%, transparent 60%)" }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
              <div>
                <p className="text-white text-xs font-medium mb-0.5 opacity-80">FEATURED CLASS</p>
                <p className="text-white text-sm font-black">Full Body Transformation</p>
              </div>
              <div
                className="w-9 h-9 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
              >
                <Star className="w-4 h-4 text-yellow-300" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>

        <div className="h-4" />
      </div>

      {/* Bottom Navigation */}
      <div
        className="flex-shrink-0 px-4 pt-3 pb-6"
        style={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(79,142,247,0.1)",
        }}
      >
        <div className="flex justify-around items-center">
          {NAV_TABS.map(({ icon: Icon, label }, i) => (
            <button
              key={label}
              onClick={() => setActiveTab(i)}
              className="flex flex-col items-center gap-1 py-1 px-4 rounded-2xl transition-all"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: activeTab === i ? `linear-gradient(135deg, ${BLUE}, ${PURPLE})` : "transparent",
                  boxShadow: activeTab === i ? "0 4px 12px rgba(79,142,247,0.35)" : "none",
                }}
              >
                <Icon
                  className="w-4 h-4"
                  style={{ color: activeTab === i ? "white" : "#7b7d9a" }}
                />
              </div>
              <span
                className="text-[10px] font-semibold"
                style={{
                  color: activeTab === i ? BLUE : "#7b7d9a",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

const SCREENS = ["splash", "welcome", "signup", "otp", "success", "home"] as const;
type Screen = typeof SCREENS[number];

const SCREEN_LABELS: Record<Screen, string> = {
  splash: "Splash",
  welcome: "Welcome",
  signup: "Sign Up",
  otp: "Verify OTP",
  success: "Success",
  home: "Home",
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const idx = SCREENS.indexOf(screen);

  function go(s: Screen) { setScreen(s); }
  function next() { if (idx < SCREENS.length - 1) go(SCREENS[idx + 1]); }
  function back() { if (idx > 0) go(SCREENS[idx - 1]); }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center py-8 px-4"
      style={{
        background: "linear-gradient(135deg, #e8ecf8 0%, #dde3f5 50%, #e4e0f7 100%)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Outer frame — desktop gallery */}
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-2xl font-black text-[#0f0f1a]"
              style={{ letterSpacing: "-0.02em" }}
            >
              FitPulse
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "#7b7d9a" }}>
              Mobile App — iPhone 16 Pro · 6 Screens
            </p>
          </div>
          <div
            className="px-4 py-2 rounded-2xl text-xs font-semibold"
            style={{
              background: `linear-gradient(135deg, ${BLUE}20, ${PURPLE}20)`,
              color: BLUE,
              border: `1px solid ${BLUE}30`,
            }}
          >
            Signup Flow
          </div>
        </div>

        {/* All 6 screens gallery (desktop) */}
        <div className="hidden lg:grid grid-cols-6 gap-4 mb-8">
          {SCREENS.map((s) => (
            <button
              key={s}
              onClick={() => go(s)}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className="w-full aspect-[393/852] rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  boxShadow: screen === s
                    ? `0 0 0 3px ${BLUE}, 0 12px 32px rgba(79,142,247,0.3)`
                    : "0 4px 20px rgba(0,0,0,0.12)",
                  transform: screen === s ? "translateY(-4px)" : "none",
                }}
              >
                <ScreenThumbnail screenId={s} />
              </div>
              <span
                className="text-xs font-semibold transition-colors"
                style={{ color: screen === s ? BLUE : "#7b7d9a" }}
              >
                {SCREEN_LABELS[s]}
              </span>
            </button>
          ))}
        </div>

        {/* Phone frame — active screen */}
        <div className="flex flex-col items-center">
          {/* Screen selector pills (mobile) */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1 lg:hidden" style={{ scrollbarWidth: "none" }}>
            {SCREENS.map((s) => (
              <button
                key={s}
                onClick={() => go(s)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: screen === s ? `linear-gradient(135deg, ${BLUE}, ${PURPLE})` : "rgba(255,255,255,0.8)",
                  color: screen === s ? "white" : "#7b7d9a",
                  boxShadow: screen === s ? "0 4px 12px rgba(79,142,247,0.4)" : "none",
                }}
              >
                {SCREEN_LABELS[s]}
              </button>
            ))}
          </div>

          {/* iPhone frame */}
          <div
            className="relative"
            style={{ width: 393, maxWidth: "100%" }}
          >
            {/* Phone bezel */}
            <div
              className="relative rounded-[48px] overflow-hidden"
              style={{
                width: 393,
                height: 852,
                maxWidth: "100vw",
                background: "#1a1a2e",
                boxShadow: "0 32px 80px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,255,255,0.1), inset 0 0 0 2px rgba(255,255,255,0.05)",
              }}
            >
              {/* Dynamic island */}
              <div
                className="absolute top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full"
                style={{ width: 126, height: 37, background: "#0a0a14", zIndex: 100 }}
              />

              {/* Screen content */}
              <div className="absolute inset-0 overflow-hidden rounded-[46px]">
                <ActiveScreen screen={screen} next={next} back={back} go={go} />
              </div>

              {/* Side buttons */}
              <div
                className="absolute left-[-3px] rounded-l-sm"
                style={{ top: 120, width: 3, height: 36, background: "#2a2a3e" }}
              />
              <div
                className="absolute left-[-3px] rounded-l-sm"
                style={{ top: 168, width: 3, height: 64, background: "#2a2a3e" }}
              />
              <div
                className="absolute left-[-3px] rounded-l-sm"
                style={{ top: 244, width: 3, height: 64, background: "#2a2a3e" }}
              />
              <div
                className="absolute right-[-3px] rounded-r-sm"
                style={{ top: 176, width: 3, height: 96, background: "#2a2a3e" }}
              />
            </div>

            {/* Navigation arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-14 -right-14 flex justify-between pointer-events-none">
              <button
                onClick={back}
                disabled={idx === 0}
                className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all pointer-events-auto"
                style={{
                  background: idx === 0 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.9)",
                  boxShadow: idx === 0 ? "none" : "0 4px 16px rgba(0,0,0,0.12)",
                  opacity: idx === 0 ? 0.4 : 1,
                }}
              >
                <ArrowLeft className="w-5 h-5" style={{ color: "#0f0f1a" }} />
              </button>
              <button
                onClick={next}
                disabled={idx === SCREENS.length - 1}
                className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all pointer-events-auto"
                style={{
                  background: idx === SCREENS.length - 1 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.9)",
                  boxShadow: idx === SCREENS.length - 1 ? "none" : "0 4px 16px rgba(0,0,0,0.12)",
                  opacity: idx === SCREENS.length - 1 ? 0.4 : 1,
                }}
              >
                <ChevronRight className="w-5 h-5" style={{ color: "#0f0f1a" }} />
              </button>
            </div>
          </div>

          {/* Screen counter */}
          <div className="flex items-center gap-2 mt-6">
            {SCREENS.map((_, i) => (
              <button
                key={i}
                onClick={() => go(SCREENS[i])}
                className="rounded-full transition-all"
                style={{
                  width: i === idx ? 24 : 8,
                  height: 8,
                  background: i === idx
                    ? `linear-gradient(90deg, ${BLUE}, ${PURPLE})`
                    : "rgba(79,142,247,0.25)",
                }}
              />
            ))}
          </div>

          <p className="mt-3 text-xs" style={{ color: "#7b7d9a" }}>
            {idx + 1} / {SCREENS.length} — {SCREEN_LABELS[screen]}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Active screen router ─────────────────────────────────────────────────────

function ActiveScreen({
  screen,
  next,
  back,
  go,
}: {
  screen: Screen;
  next: () => void;
  back: () => void;
  go: (s: Screen) => void;
}) {
  switch (screen) {
    case "splash":   return <SplashScreen onNext={next} />;
    case "welcome":  return <WelcomeScreen onNext={next} onLogin={() => go("otp")} />;
    case "signup":   return <SignUpScreen onNext={next} onBack={back} />;
    case "otp":      return <OTPScreen onNext={next} onBack={back} />;
    case "success":  return <SuccessScreen onNext={next} />;
    case "home":     return <HomeScreen />;
    default:         return null;
  }
}

// ─── Thumbnail previews for the gallery ──────────────────────────────────────

function ScreenThumbnail({ screenId }: { screenId: Screen }) {
  const colors: Record<Screen, string> = {
    splash: `linear-gradient(145deg, #3a7bd5 0%, #4F8EF7 40%, #8A5CF6 100%)`,
    welcome: `linear-gradient(145deg, #4F8EF7 0%, #8A5CF6 60%, #f0f2f8 100%)`,
    signup: "#f0f2f8",
    otp: "#f0f2f8",
    success: "#f0f2f8",
    home: "#f0f2f8",
  };

  const icons: Record<Screen, React.ReactNode> = {
    splash: <div className="flex flex-col items-center gap-2"><Zap className="w-8 h-8 text-white" /><span className="text-white text-xs font-black">FitPulse</span></div>,
    welcome: <div className="flex flex-col items-center gap-2"><Heart className="w-8 h-8 text-white" /><span className="text-white text-xs font-bold">Welcome</span></div>,
    signup: <div className="flex flex-col items-center gap-2 opacity-70"><Plus className="w-7 h-7" style={{ color: BLUE }} /><span className="text-xs font-bold" style={{ color: "#0f0f1a" }}>Sign Up</span></div>,
    otp: <div className="flex flex-col items-center gap-2 opacity-70"><div className="flex gap-1">{[0,1,2,3,4,5].map(i => <div key={i} className="w-2 h-3 rounded-sm" style={{ background: BLUE }} />)}</div><span className="text-xs font-bold" style={{ color: "#0f0f1a" }}>OTP</span></div>,
    success: <div className="flex flex-col items-center gap-2"><div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${BLUE}, ${PURPLE})` }}><Check className="w-5 h-5 text-white" strokeWidth={3} /></div><span className="text-xs font-bold" style={{ color: "#0f0f1a" }}>Success</span></div>,
    home: <div className="flex flex-col items-center gap-2 opacity-70"><Home className="w-7 h-7" style={{ color: BLUE }} /><span className="text-xs font-bold" style={{ color: "#0f0f1a" }}>Home</span></div>,
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: colors[screenId] }}
    >
      {icons[screenId]}
    </div>
  );
}
