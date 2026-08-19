import { useState } from "react";
import {
  Search, Heart, ShoppingCart, Star, Clock, Flame, Plus, Minus,
  Trash2, ChevronLeft, Bell, MapPin, User, Home, Tag, Package,
  Truck, ArrowRight,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import splashFood from "@/imports/image.png";
import bannerFood from "@/imports/image-1.png";
import curriesImg from "@/imports/image-2.png";
import riceImg from "@/imports/image-3.png";
import tiffinsImg from "@/imports/image-4.png";
import dessertsImg from "@/imports/image-5.png";

// ── Types ─────────────────────────────────────────────────────────────────────
type CartItem = { id: number; name: string; price: number; qty: number; img: string };

// ── Design tokens ──────────────────────────────────────────────────────────────
const C = {
  orange: "#FF6B35",
  orangeLight: "#FF8C5A",
  amber: "#FFB84D",
  dark: "#222222",
  bg: "#F8F8F8",
  card: "#FFFFFF",
  success: "#34C759",
  muted: "#888888",
  border: "#EBEBEB",
};

// ── Image catalog ──────────────────────────────────────────────────────────────
const IMG = {
  burger1: "https://images.unsplash.com/photo-1611309454921-16cef3438ee0?w=400&h=400&fit=crop&auto=format",
  burger2: "https://images.unsplash.com/photo-1585238341710-4d3ff484184d?w=400&h=400&fit=crop&auto=format",
  burgerHero: "https://images.unsplash.com/photo-1687764628150-1dc8afa7ba52?w=800&h=700&fit=crop&auto=format",
  pizza1: "https://images.unsplash.com/photo-1593504049359-74330189a345?w=400&h=400&fit=crop&auto=format",
  pizza2: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=400&fit=crop&auto=format",
  pasta1: "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=400&h=400&fit=crop&auto=format",
  dessert1: "https://images.unsplash.com/photo-1508737804141-4c3b688e2546?w=400&h=400&fit=crop&auto=format",
  dessert2: "https://images.unsplash.com/photo-1605807646983-377bc5a76493?w=400&h=400&fit=crop&auto=format",
  drinks1: "https://images.unsplash.com/photo-1781722758475-e90c93edd870?w=400&h=400&fit=crop&auto=format",
  salad1: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop&auto=format",
};

// ── Shared: Status Bar ────────────────────────────────────────────────────────
function StatusBar({ light = false }: { light?: boolean }) {
  const col = light ? "#fff" : C.dark;
  return (
    <div style={{
      height: 56, display: "flex", alignItems: "flex-end",
      paddingBottom: 8, paddingLeft: 24, paddingRight: 20,
      justifyContent: "space-between", flexShrink: 0,
    }}>
      <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 15, color: col }}>9:41</span>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill={col} opacity={0.9}>
          <rect x="0" y="8" width="3" height="4" rx="0.5" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" />
          <rect x="9" y="2" width="3" height="10" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={col}>
          <circle cx="8" cy="10.5" r="1.5" />
          <path d="M5.17 8.17a4 4 0 015.66 0" stroke={col} strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M2.34 5.34a8 8 0 0111.32 0" stroke={col} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke={col} strokeOpacity="0.5" />
          <rect x="2" y="2" width="17" height="9" rx="2" fill={col} />
          <path d="M24.5 4.5v4a2 2 0 000-4z" fill={col} fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

// ── Shared: Bottom Nav ────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { icon: Home, label: "Home", target: 1 },
  { icon: Search, label: "Search", target: 2 },
  { icon: ShoppingCart, label: "Cart", target: 4 },
  { icon: User, label: "Profile", target: 1 },
];

function BottomNav({ active, onNavigate, cartCount = 0 }: { active: number; onNavigate?: (s: number) => void; cartCount?: number }) {
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: 82,
      background: "#fff", borderTop: `1px solid ${C.border}`,
      display: "flex", alignItems: "center", paddingBottom: 14,
      boxShadow: "0 -6px 20px rgba(0,0,0,0.05)",
    }}>
      {NAV_ITEMS.map((item, i) => {
        const Icon = item.icon;
        const on = i === active;
        return (
          <button key={i} onClick={() => onNavigate?.(item.target)} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
            gap: 3, border: "none", background: "none", cursor: "pointer", padding: "6px 0",
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 14,
              background: on ? "#FFF0EB" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}>
              <Icon size={20} color={on ? C.orange : "#C0C0C0"} strokeWidth={on ? 2.5 : 1.8} />
              {item.label === "Orders" && cartCount > 0 && (
                <div style={{
                  position: "absolute", top: 4, right: 4, width: 16, height: 16,
                  borderRadius: "50%", background: C.orange,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 700, color: "#fff",
                }}>{cartCount > 9 ? "9+" : cartCount}</div>
              )}
            </div>
            <span style={{
              fontFamily: "Poppins", fontSize: 10, fontWeight: on ? 600 : 400,
              color: on ? C.orange : "#C0C0C0",
            }}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── SCREEN 1: Splash ──────────────────────────────────────────────────────────
function SplashScreen() {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "linear-gradient(160deg, #FF9A5C 0%, #FF6B35 45%, #E04B18 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "Poppins",
    }}>
      {/* Decorative orbs */}
      <div style={{ position: "absolute", top: -100, right: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
      <div style={{ position: "absolute", bottom: -130, left: -70, width: 380, height: 380, borderRadius: "50%", background: "rgba(0,0,0,0.10)" }} />
      <div style={{ position: "absolute", top: 180, left: -100, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

      {/* Soft radial glow behind burger */}
      <div style={{
        position: "absolute", top: "22%", left: "50%", transform: "translateX(-50%)",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 68%)",
      }} />

      {/* Burger hero circle */}
      <div style={{
        width: 252, height: 252, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
        boxShadow: "0 0 0 6px rgba(255,255,255,0.18), 0 28px 72px rgba(0,0,0,0.32)",
        marginBottom: 36, position: "relative", zIndex: 1,
      }}>
        <ImageWithFallback
          src={splashFood}
          alt="Traditional Godavari banana leaf meal"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Wordmark block */}
      <div style={{ textAlign: "center", zIndex: 1, padding: "0 40px" }}>
        {/* Logo pill */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)",
          borderRadius: 30, padding: "8px 20px", marginBottom: 18,
          border: "1px solid rgba(255,255,255,0.28)",
        }}>
          <span style={{ fontSize: 22 }}>🍔</span>
          <span style={{ fontWeight: 800, fontSize: 14, color: "#FFB84D", letterSpacing: 1.5 }}>GODAVARI RUCHULIU</span>
        </div>

        <h1 style={{
          fontWeight: 800, fontSize: 42, color: "#fff",
          letterSpacing: -1.5, margin: 0, lineHeight: 1.05,
        }}>
          Delicious<br />
          <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 300 }}>Food</span> Fast
        </h1>
        <p style={{
          fontWeight: 400, fontSize: 13, color: "rgba(255,255,255,0.72)",
          marginTop: 12, letterSpacing: 0.3, lineHeight: 1.5,
        }}>
          Your Godavarian
        </p>

        {/* Dots indicator */}
        <div style={{ marginTop: 44, display: "flex", gap: 7, justifyContent: "center" }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: i === 0 ? 28 : 8, height: 8, borderRadius: 4,
              background: i === 0 ? "#fff" : "rgba(255,255,255,0.35)",
              transition: "width 0.3s",
            }} />
          ))}
        </div>
      </div>

      {/* Footer tagline */}
      <p style={{
        position: "absolute", bottom: 44, fontFamily: "Poppins", fontSize: 10,
        color: "rgba(255,255,255,0.45)", letterSpacing: 3, textTransform: "uppercase",
      }}>
        Fresh · Fast · Delicious
      </p>
    </div>
  );
}

// ── SCREEN 2: Home ────────────────────────────────────────────────────────────
function HomeScreen({ onNavigate, addToCart, cartCount }: { onNavigate?: (s: number) => void; addToCart?: (item: CartItem) => void; cartCount?: number }) {
  const [favs, setFavs] = useState<Set<number>>(new Set([1]));

  const categories = [
    { label: "Gutti Vankaya", img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=120&h=120&fit=crop&auto=format" },
    { label: "Chicken Biryani", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=120&h=120&fit=crop&auto=format" },
    { label: "Masala Dosa", img: "https://images.unsplash.com/photo-1743615467204-8fdaa85ff2db?w=120&h=120&fit=crop&auto=format" },
    { label: "Filter Coffee", img: "https://images.unsplash.com/photo-1758387941825-a6ecaec9c14d?w=120&h=120&fit=crop&auto=format" },
    { label: "Payasam", img: "https://images.unsplash.com/photo-1592909572567-9b6d34170971?w=120&h=120&fit=crop&auto=format" },
    { label: "Pesarattu", img: "https://images.unsplash.com/photo-1708146464361-5c5ce4f9abb6?w=120&h=120&fit=crop&auto=format" },
  ];

  const foods = [
    { id: 0, name: "Gutti Vankaya Curry", desc: "Stuffed brinjal in spicy masala", rating: 4.9, price: 190, img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=400&fit=crop&auto=format" },
    { id: 1, name: "Andhra Chicken Curry", desc: "Fiery Andhra-style chicken gravy", rating: 4.8, price: 260, img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=400&fit=crop&auto=format" },
    { id: 2, name: "Chicken Biryani", desc: "Aromatic basmati with spiced chicken", rating: 4.9, price: 260, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=400&fit=crop&auto=format" },
    { id: 3, name: "Ghee Rice", desc: "Fragrant rice with pure desi ghee", rating: 4.7, price: 140, img: "https://images.unsplash.com/photo-1653849942524-ef2c6882d70d?w=400&h=400&fit=crop&auto=format" },
    { id: 4, name: "Filter Coffee", desc: "Traditional South Indian decoction", rating: 4.9, price: 50, img: "https://images.unsplash.com/photo-1758387941825-a6ecaec9c14d?w=400&h=400&fit=crop&auto=format" },
    { id: 5, name: "Mango Shake", desc: "Thick creamy Alphonso mango blend", rating: 4.8, price: 120, img: "https://images.unsplash.com/photo-1619898804188-e7bad4bd2127?w=400&h=400&fit=crop&auto=format" },
    { id: 6, name: "Masala Dosa", desc: "Crispy dosa with spiced potato filling", rating: 4.9, price: 100, img: "https://images.unsplash.com/photo-1743615467204-8fdaa85ff2db?w=400&h=400&fit=crop&auto=format" },
    { id: 7, name: "Pesarattu", desc: "Green moong dal crispy crepe", rating: 4.7, price: 110, img: "https://images.unsplash.com/photo-1708146464361-5c5ce4f9abb6?w=400&h=400&fit=crop&auto=format" },
    { id: 8, name: "Payasam", desc: "Creamy milk & vermicelli sweet", rating: 4.9, price: 90, img: "https://images.unsplash.com/photo-1592909572567-9b6d34170971?w=400&h=400&fit=crop&auto=format" },
    { id: 9, name: "Bobbatlu", desc: "Sweet lentil stuffed flatbread", rating: 4.8, price: 70, img: "https://images.unsplash.com/photo-1591353692625-9b49f8fac18d?w=400&h=400&fit=crop&auto=format" },
  ];

  const toggle = (id: number) => setFavs(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  return (
    <div style={{ width: "100%", height: "100%", background: C.bg, display: "flex", flexDirection: "column", position: "relative", fontFamily: "Poppins" }}>
      <StatusBar />

      {/* Location + Bell */}
      <div style={{ padding: "0 20px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
            <MapPin size={13} color={C.orange} />
            <span style={{ fontSize: 10, color: C.muted, fontWeight: 500, letterSpacing: 0.5 }}>DELIVER TO</span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>Bhimavaram, India ▾</span>
        </div>
        <div style={{
          width: 42, height: 42, borderRadius: 14, background: C.card,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        }}>
          <Bell size={18} color={C.dark} />
        </div>
      </div>

      {/* Greeting */}
      <div style={{ padding: "0 20px 16px" }}>
        <h2 style={{ fontWeight: 700, fontSize: 22, color: C.dark, margin: 0 }}>Hello, Rahul 👋</h2>
        <p style={{ fontWeight: 400, fontSize: 13, color: C.muted, margin: "4px 0 0" }}>What would you like today?</p>
      </div>

      {/* Search */}
      <div style={{ padding: "0 20px 20px" }}>
        <div style={{
          background: C.card, borderRadius: 16, padding: "0 14px",
          display: "flex", alignItems: "center", gap: 10, height: 50,
          boxShadow: "0 2px 14px rgba(0,0,0,0.06)",
        }}>
          <Search size={17} color="#C8C8C8" />
          <span style={{ fontSize: 13, color: "#C8C8C8", flex: 1 }}>Search for food...</span>
          <div style={{
            width: 34, height: 34, borderRadius: 11, background: C.orange,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="15" height="13" viewBox="0 0 15 13" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
              <line x1="1" y1="2" x2="14" y2="2" />
              <line x1="1" y1="6.5" x2="10" y2="6.5" />
              <line x1="1" y1="11" x2="7" y2="11" />
            </svg>
          </div>
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 90, scrollbarWidth: "none" }}>

        {/* Promo Banner */}
        <div style={{ padding: "0 20px 22px" }}>
          <div style={{
            borderRadius: 22, overflow: "hidden", height: 148, position: "relative",
            background: "linear-gradient(125deg, #FF6B35 0%, #FF8C5A 55%, #FFB84D 100%)",
          }}>
            {/* Decorative circles */}
            <div style={{ position: "absolute", right: -34, top: -34, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.10)" }} />
            <div style={{ position: "absolute", right: 18, bottom: -44, width: 130, height: 130, borderRadius: "50%", background: "rgba(0,0,0,0.07)" }} />
            {/* Emoji */}
            <div style={{ position: "absolute", right: 18, top: 12, fontSize: 72, lineHeight: 1, opacity: 0.92 }}>🍔</div>

            {/* Text */}
            <div style={{ position: "absolute", inset: 0, padding: "18px 22px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              {/* Left: text content */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)",
                  borderRadius: 20, padding: "3px 11px", marginBottom: 9, width: "fit-content",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}>
                  <Tag size={10} color="#fff" />
                  <span style={{ fontSize: 9, fontWeight: 700, color: "#fff", letterSpacing: 1 }}>WEEKEND SPECIAL</span>
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 30, color: "#fff", margin: 0, lineHeight: 1 }}>
                  40% <span style={{ fontWeight: 400, fontSize: 18 }}>OFF</span>
                </h3>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", margin: "5px 0 10px" }}>On orders above ₹499</p>
                <button style={{
                  background: "#fff", border: "none", borderRadius: 10,
                  padding: "5px 14px", fontSize: 11, fontWeight: 700,
                  color: C.orange, cursor: "pointer", width: "fit-content", fontFamily: "Poppins",
                }}>Order Now →</button>
              </div>
              {/* Right: food image */}
              <div style={{
                width: 118, height: 112, borderRadius: 16, overflow: "hidden", flexShrink: 0,
                boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                border: "2px solid rgba(255,255,255,0.2)",
              }}>
                <ImageWithFallback
                  src={bannerFood}
                  alt="Godavari banana leaf spread"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: C.dark, margin: 0 }}>Categories</h3>
            <button onClick={() => onNavigate?.(2)} style={{
              background: "none", border: "none", fontSize: 12, color: C.orange, fontWeight: 600, cursor: "pointer", fontFamily: "Poppins",
            }}>See All</button>
          </div>
          <div style={{ display: "flex", gap: 14, paddingLeft: 20, overflowX: "auto", paddingRight: 8, scrollbarWidth: "none" }}>
            {categories.map((cat, i) => (
              <div key={i} onClick={() => onNavigate?.(3)} style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 7, cursor: "pointer" }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 20, overflow: "hidden",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.13)",
                  border: `2.5px solid ${C.orange}`,
                }}>
                  <img src={cat.img} alt={cat.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: C.dark, textAlign: "center", maxWidth: 68, lineHeight: 1.3 }}>{cat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Items */}
        <div>
          <div style={{ padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: C.dark, margin: 0 }}>Popular Items</h3>
            <button style={{ background: "none", border: "none", fontSize: 12, color: C.orange, fontWeight: 600, cursor: "pointer", fontFamily: "Poppins" }}>See All</button>
          </div>
          <div style={{ display: "flex", gap: 14, paddingLeft: 20, overflowX: "auto", paddingRight: 8, scrollbarWidth: "none" }}>
            {foods.map(food => (
              <div key={food.id} onClick={() => onNavigate?.(3)} style={{
                flexShrink: 0, width: 168, background: C.card, borderRadius: 22,
                overflow: "hidden", boxShadow: "0 4px 22px rgba(0,0,0,0.09)", cursor: "pointer",
              }}>
                <div style={{ height: 138, position: "relative", background: "#F2F2F2", overflow: "hidden" }}>
                  <img src={food.img} alt={food.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <button onClick={e => { e.stopPropagation(); toggle(food.id); }} style={{
                    position: "absolute", top: 10, right: 10, width: 32, height: 32,
                    borderRadius: 10, background: "rgba(255,255,255,0.92)", border: "none",
                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                  }}>
                    <Heart size={14} fill={favs.has(food.id) ? C.orange : "none"} color={favs.has(food.id) ? C.orange : "#AAA"} />
                  </button>
                </div>
                <div style={{ padding: "12px 13px 14px" }}>
                  <h4 style={{ fontWeight: 700, fontSize: 13, color: C.dark, margin: "0 0 3px" }}>{food.name}</h4>
                  <p style={{ fontSize: 10, color: C.muted, margin: "0 0 9px", lineHeight: 1.4 }}>{food.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 10 }}>
                    <Star size={11} fill={C.amber} color={C.amber} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: C.dark }}>{food.rating}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 800, fontSize: 15, color: C.dark }}>₹{food.price.toLocaleString()}</span>
                    <div onClick={e => { e.stopPropagation(); addToCart?.({ id: food.id, name: food.name, price: food.price, qty: 1, img: food.img }); }} style={{
                      width: 30, height: 30, borderRadius: 10, background: C.orange,
                      display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                    }}>
                      <Plus size={15} color="#fff" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active={0} onNavigate={onNavigate} cartCount={cartCount} />
    </div>
  );
}

// ── SCREEN 3: Categories ──────────────────────────────────────────────────────
const CURRY_VEG = [
  { name: "Gutti Vankaya Curry",   price: 190 },
  { name: "Bendakaya Fry",         price: 170 },
  { name: "Dosakaya Pappu",        price: 170 },
  { name: "Tomato Pappu",          price: 160 },
  { name: "Gongura Pappu",         price: 170 },
  { name: "Beerakaya Curry",       price: 170 },
  { name: "Sorakaya Curry",        price: 160 },
  { name: "Chikkudukaya Curry",    price: 180 },
  { name: "Aratikaya Fry",         price: 170 },
  { name: "Vankaya Pakodi Curry",  price: 190 },
  { name: "Cabbage Curry",         price: 160 },
  { name: "Mixed Vegetable Curry", price: 180 },
];

const CURRY_NONVEG = [
  { name: "Andhra Chicken Curry",  price: 260 },
  { name: "Natukodi Pulusu",       price: 340 },
  { name: "Chicken Fry",           price: 280 },
  { name: "Kodi Vepudu",           price: 290 },
  { name: "Mutton Curry",          price: 380 },
  { name: "Mutton Keema Curry",    price: 360 },
  { name: "Chepala Pulusu",        price: 340 },
  { name: "Fish Fry",              price: 300 },
  { name: "Royyala Iguru",         price: 390 },
  { name: "Royyala Vepudu",        price: 400 },
  { name: "Crab Curry",            price: 420 },
  { name: "Crab Fry",              price: 440 },
];

const DRINKS_ITEMS = [
  { name: "Buttermilk",          price: 50  },
  { name: "Fresh Lime Soda",     price: 60  },
  { name: "Lemon Juice",         price: 50  },
  { name: "Watermelon Juice",    price: 90  },
  { name: "Sweet Lime Juice",    price: 80  },
  { name: "Mango Shake",         price: 120 },
  { name: "Banana Shake",        price: 110 },
  { name: "Fresh Coconut Water", price: 60  },
  { name: "Filter Coffee",       price: 50  },
  { name: "Tea",                 price: 30  },
  { name: "Badam Milk",          price: 90  },
  { name: "Mineral Water (1 L)", price: 30  },
];

const DESSERT_ITEMS = [
  { name: "Pootharekulu",   price: 80  },
  { name: "Bobbatlu",       price: 70  },
  { name: "Ariselu",        price: 60  },
  { name: "Sunnundalu",     price: 80  },
  { name: "Boorelu",        price: 80  },
  { name: "Paramannam",     price: 100 },
  { name: "Payasam",        price: 90  },
  { name: "Bellam Gavvalu", price: 70  },
  { name: "Palakova",       price: 120 },
  { name: "Kobbari Louz",   price: 90  },
];

const TIFFIN_ITEMS = [
  { name: "Idli (2 pcs)",   price: 50  },
  { name: "Ghee Idli",      price: 90  },
  { name: "Mini Idli",      price: 80  },
  { name: "Plain Dosa",     price: 70  },
  { name: "Masala Dosa",    price: 100 },
  { name: "Onion Dosa",     price: 110 },
  { name: "Pesarattu",      price: 110 },
  { name: "Upma Pesarattu", price: 140 },
  { name: "Rava Dosa",      price: 120 },
  { name: "Uttapam",        price: 120 },
  { name: "Vada (2 pcs)",   price: 60  },
  { name: "Punugulu",       price: 90  },
  { name: "Upma",           price: 70  },
  { name: "Pongal",         price: 90  },
  { name: "Poori (2 pcs)",  price: 90  },
];

const RICE_ITEMS = [
  { name: "Plain Rice",              price: 60,  veg: true  },
  { name: "Ghee Rice",               price: 140, veg: true  },
  { name: "Pappu Annam",             price: 120, veg: true  },
  { name: "Pulihora",                price: 90,  veg: true  },
  { name: "Coconut Rice",            price: 100, veg: true  },
  { name: "Tomato Rice",             price: 100, veg: true  },
  { name: "Lemon Rice",              price: 90,  veg: true  },
  { name: "Curd Rice",               price: 80,  veg: true  },
  { name: "Sambar Rice",             price: 110, veg: true  },
  { name: "Avakaya Rice",            price: 120, veg: true  },
  { name: "Gongura Rice",            price: 140, veg: true  },
  { name: "Royyala Biryani (Prawn)", price: 340, veg: false },
  { name: "Chicken Biryani",         price: 260, veg: false },
  { name: "Mutton Biryani",          price: 340, veg: false },
  { name: "Veg Meals",               price: 180, veg: true  },
  { name: "Chicken Meals",           price: 320, veg: false },
];

function CategoriesScreen({ onNavigate }: { onNavigate?: (s: number) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [curryTab, setCurryTab] = useState<"veg" | "nonveg">("veg");

  const cats = [
    { label: "Curries",  emoji: "🍲", count: 24, img: curriesImg   },
    { label: "Rice",     emoji: "🍱", count: 16, img: riceImg      },
    { label: "Drinks",   emoji: "🥛", count: 32, img: "https://images.unsplash.com/photo-1781961323179-8fa4fc7f204e?w=400&h=400&fit=crop&auto=format"  },
    { label: "Tiffins",  emoji: "🥞", count: 15, img: tiffinsImg   },
    { label: "Desserts", emoji: "🍯", count: 20, img: dessertsImg  },
  ];

  const handleCatTap = (label: string) => {
    if (["Rice", "Curries", "Tiffins", "Desserts", "Drinks"].includes(label)) setSelected(label);
    else onNavigate?.(3);
  };

  // ── Curries drill-down ──
  if (selected === "Curries") {
    const items = curryTab === "veg" ? CURRY_VEG : CURRY_NONVEG;
    const dotColor = curryTab === "veg" ? C.success : "#FF4B4B";
    return (
      <div style={{ width: "100%", height: "100%", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "Poppins" }}>
        <StatusBar />
        <div style={{ padding: "0 20px 14px", display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => setSelected(null)} style={{
            width: 40, height: 40, borderRadius: 14, background: C.card, border: "none",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
          }}>
            <ChevronLeft size={20} color={C.dark} />
          </button>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: 20, color: C.dark, margin: 0 }}>🍲 Curries</h2>
            <p style={{ fontSize: 11, color: C.muted, margin: "2px 0 0" }}>{items.length} dishes available</p>
          </div>
        </div>

        {/* Veg / Non-Veg tabs */}
        <div style={{ padding: "0 20px 14px", display: "flex", gap: 10 }}>
          {(["veg", "nonveg"] as const).map(tab => {
            const active = curryTab === tab;
            const label = tab === "veg" ? "🟢 Veg" : "🔴 Non-Veg";
            return (
              <button key={tab} onClick={() => setCurryTab(tab)} style={{
                flex: 1, height: 40, borderRadius: 14, border: "none", cursor: "pointer",
                fontFamily: "Poppins", fontSize: 13, fontWeight: 700,
                background: active ? (tab === "veg" ? C.success : "#FF4B4B") : C.card,
                color: active ? "#fff" : C.muted,
                boxShadow: active ? `0 4px 14px ${tab === "veg" ? "rgba(52,199,89,0.35)" : "rgba(255,75,75,0.35)"}` : "0 2px 8px rgba(0,0,0,0.06)",
              }}>
                {label}
              </button>
            );
          })}
        </div>

        {/* Items list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px", scrollbarWidth: "none" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {items.map((item, i) => (
              <div key={i} style={{
                background: C.card, borderRadius: 16, padding: "13px 16px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 14, height: 14, borderRadius: 3, flexShrink: 0,
                    border: `2px solid ${dotColor}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: dotColor }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: C.dark }}>{item.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: C.orange }}>₹{item.price}</span>
                  <div style={{
                    width: 28, height: 28, borderRadius: 9, background: C.orange,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Plus size={14} color="#fff" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Drinks drill-down ──
  if (selected === "Drinks") {
    return (
      <div style={{ width: "100%", height: "100%", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "Poppins" }}>
        <StatusBar />
        <div style={{ padding: "0 20px 14px", display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => setSelected(null)} style={{
            width: 40, height: 40, borderRadius: 14, background: C.card, border: "none",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
          }}>
            <ChevronLeft size={20} color={C.dark} />
          </button>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: 20, color: C.dark, margin: 0 }}>🥛 Drinks</h2>
            <p style={{ fontSize: 11, color: C.muted, margin: "2px 0 0" }}>{DRINKS_ITEMS.length} items available</p>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px", scrollbarWidth: "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 14px", marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: 0.8 }}>Item</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: 0.8 }}>Price</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {DRINKS_ITEMS.map((item, i) => (
              <div key={i} style={{
                background: C.card, borderRadius: 16, padding: "13px 16px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 14, height: 14, borderRadius: 3, flexShrink: 0,
                    border: `2px solid #4A9EFF`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4A9EFF" }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: C.dark }}>{item.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: C.orange }}>₹{item.price}</span>
                  <div style={{
                    width: 28, height: 28, borderRadius: 9, background: C.orange,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Plus size={14} color="#fff" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Desserts drill-down ──
  if (selected === "Desserts") {
    return (
      <div style={{ width: "100%", height: "100%", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "Poppins" }}>
        <StatusBar />
        <div style={{ padding: "0 20px 14px", display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => setSelected(null)} style={{
            width: 40, height: 40, borderRadius: 14, background: C.card, border: "none",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
          }}>
            <ChevronLeft size={20} color={C.dark} />
          </button>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: 20, color: C.dark, margin: 0 }}>🍯 Desserts</h2>
            <p style={{ fontSize: 11, color: C.muted, margin: "2px 0 0" }}>{DESSERT_ITEMS.length} dishes available</p>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px", scrollbarWidth: "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 14px", marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: 0.8 }}>Item</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: 0.8 }}>Price</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {DESSERT_ITEMS.map((item, i) => (
              <div key={i} style={{
                background: C.card, borderRadius: 16, padding: "13px 16px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 14, height: 14, borderRadius: 3, flexShrink: 0,
                    border: `2px solid ${C.success}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.success }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: C.dark }}>{item.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: C.orange }}>₹{item.price}</span>
                  <div style={{
                    width: 28, height: 28, borderRadius: 9, background: C.orange,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Plus size={14} color="#fff" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Tiffins drill-down ──
  if (selected === "Tiffins") {
    return (
      <div style={{ width: "100%", height: "100%", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "Poppins" }}>
        <StatusBar />
        <div style={{ padding: "0 20px 14px", display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => setSelected(null)} style={{
            width: 40, height: 40, borderRadius: 14, background: C.card, border: "none",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
          }}>
            <ChevronLeft size={20} color={C.dark} />
          </button>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: 20, color: C.dark, margin: 0 }}>🥞 Tiffins</h2>
            <p style={{ fontSize: 11, color: C.muted, margin: "2px 0 0" }}>{TIFFIN_ITEMS.length} dishes available</p>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px", scrollbarWidth: "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 14px", marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: 0.8 }}>Item</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: 0.8 }}>Price</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {TIFFIN_ITEMS.map((item, i) => (
              <div key={i} style={{
                background: C.card, borderRadius: 16, padding: "13px 16px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 14, height: 14, borderRadius: 3, flexShrink: 0,
                    border: `2px solid ${C.success}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.success }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: C.dark }}>{item.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: C.orange }}>₹{item.price}</span>
                  <div style={{
                    width: 28, height: 28, borderRadius: 9, background: C.orange,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Plus size={14} color="#fff" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Rice items drill-down ──
  if (selected === "Rice") {
    return (
      <div style={{ width: "100%", height: "100%", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "Poppins" }}>
        <StatusBar />
        <div style={{ padding: "0 20px 14px", display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => setSelected(null)} style={{
            width: 40, height: 40, borderRadius: 14, background: C.card, border: "none",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
          }}>
            <ChevronLeft size={20} color={C.dark} />
          </button>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: 20, color: C.dark, margin: 0 }}>🍱 Rice</h2>
            <p style={{ fontSize: 11, color: C.muted, margin: "2px 0 0" }}>{RICE_ITEMS.length} dishes available</p>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px", scrollbarWidth: "none" }}>
          {/* Header row */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            padding: "8px 14px", marginBottom: 6,
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: 0.8 }}>Item</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: 0.8 }}>Price</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {RICE_ITEMS.map((item, i) => (
              <div key={i} style={{
                background: C.card, borderRadius: 16,
                padding: "13px 16px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {/* Veg / Non-veg indicator */}
                  <div style={{
                    width: 14, height: 14, borderRadius: 3, flexShrink: 0,
                    border: `2px solid ${item.veg ? C.success : "#FF4B4B"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: item.veg ? C.success : "#FF4B4B",
                    }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: C.dark }}>{item.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: C.orange }}>₹{item.price}</span>
                  <div style={{
                    width: 28, height: 28, borderRadius: 9, background: C.orange,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Plus size={14} color="#fff" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Default grid ──
  return (
    <div style={{ width: "100%", height: "100%", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "Poppins" }}>
      <StatusBar />

      <div style={{ padding: "0 20px 18px", display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={() => onNavigate?.(1)} style={{
          width: 40, height: 40, borderRadius: 14, background: C.card, border: "none",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
        }}>
          <ChevronLeft size={20} color={C.dark} />
        </button>
        <h2 style={{ fontWeight: 700, fontSize: 20, color: C.dark, margin: 0 }}>All Categories</h2>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px", scrollbarWidth: "none" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {cats.map((cat, i) => (
            <div key={i} onClick={() => handleCatTap(cat.label)} style={{
              borderRadius: 22, overflow: "hidden", cursor: "pointer",
              height: 162, position: "relative", boxShadow: "0 6px 24px rgba(0,0,0,0.11)",
            }}>
              <img src={cat.img} alt={cat.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.76) 0%, rgba(0,0,0,0.08) 58%, transparent 100%)",
              }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 14px" }}>
                <h4 style={{ fontWeight: 700, fontSize: 14, color: "#fff", margin: 0 }}>{cat.label}</h4>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", margin: "2px 0 0" }}>{cat.count} dishes</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 4: Food Details ────────────────────────────────────────────────────
function FoodDetailsScreen({ onNavigate, addToCart }: { onNavigate?: (s: number) => void; addToCart?: (item: CartItem) => void }) {
  const [qty, setQty] = useState(1);
  const [loved, setLoved] = useState(false);

  const ingredients = [
    { emoji: "🍚", name: "Basmati" }, { emoji: "🍗", name: "Chicken" },
    { emoji: "🧅", name: "Onion" }, { emoji: "🌿", name: "Mint" },
    { emoji: "🌶️", name: "Spices" }, { emoji: "🫙", name: "Ghee" },
  ];

  const basePrice = 260;

  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", position: "relative", overflow: "hidden", fontFamily: "Poppins" }}>

      {/* Hero Image */}
      <div style={{ height: 340, position: "relative", background: "#E8E8E8" }}>
        <img
          src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&h=700&fit=crop&auto=format"
          alt="Chicken Biryani"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 38%, rgba(0,0,0,0.12) 100%)",
        }} />

        {/* Controls overlay */}
        <div style={{ position: "absolute", top: 54, left: 0, right: 0, padding: "0 20px", display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => onNavigate?.(1)} style={{
            width: 40, height: 40, borderRadius: 14,
            background: "rgba(255,255,255,0.22)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.28)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}>
            <ChevronLeft size={20} color="#fff" />
          </button>
          <button onClick={() => setLoved(!loved)} style={{
            width: 40, height: 40, borderRadius: 14,
            background: "rgba(255,255,255,0.22)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.28)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}>
            <Heart size={18} fill={loved ? C.orange : "none"} color={loved ? C.orange : "#fff"} />
          </button>
        </div>

        {/* Best Seller tag */}
        <div style={{
          position: "absolute", bottom: 20, left: 20,
          background: "rgba(0,0,0,0.35)", backdropFilter: "blur(14px)",
          borderRadius: 20, padding: "6px 14px",
          border: "1px solid rgba(255,255,255,0.18)",
        }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>🔥 Best Seller</span>
        </div>
      </div>

      {/* Detail card */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "#fff", borderRadius: "28px 28px 0 0",
        height: 540, overflowY: "auto", scrollbarWidth: "none",
        padding: "20px 20px 20px",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.10)",
      }}>
        {/* Handle */}
        <div style={{ width: 40, height: 4, borderRadius: 2, background: "#E4E4E4", margin: "0 auto 18px" }} />

        {/* Title + rating */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <h2 style={{ fontWeight: 800, fontSize: 21, color: C.dark, margin: 0, flex: 1, lineHeight: 1.2 }}>Chicken<br />Biryani</h2>
          <div style={{
            display: "flex", alignItems: "center", gap: 4,
            background: "#FFF8E8", borderRadius: 12, padding: "6px 12px", flexShrink: 0, marginLeft: 10,
          }}>
            <Star size={13} fill={C.amber} color={C.amber} />
            <span style={{ fontWeight: 700, fontSize: 13, color: C.dark }}>4.9</span>
            <span style={{ fontSize: 10, color: C.muted }}>(842)</span>
          </div>
        </div>

        {/* Stats chips */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          {[
            { icon: Clock, val: "25 min", col: "#FF6B35" },
            { icon: Flame, val: "520 kcal", col: "#FF4B4B" },
          ].map(({ icon: Icon, val, col }, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 7,
              background: "#F8F8F8", borderRadius: 14, padding: "8px 14px",
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10, background: `${col}18`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon size={15} color={col} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12, color: C.dark }}>{val}</div>
              </div>
            </div>
          ))}
          <div style={{
            display: "flex", alignItems: "center", gap: 7,
            background: "#F8F8F8", borderRadius: 14, padding: "8px 14px",
          }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "#34C75918", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 15 }}>🛵</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: 12, color: C.dark }}>Free</div>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.75, margin: "0 0 18px" }}>
          Slow-cooked tender chicken pieces layered with aromatic basmati rice, caramelized onions, fresh mint leaves, saffron, and whole spices — dum-cooked to lock in every bit of flavour.
        </p>

        {/* Ingredients */}
        <div style={{ marginBottom: 22 }}>
          <h4 style={{ fontWeight: 700, fontSize: 14, color: C.dark, margin: "0 0 13px" }}>Ingredients</h4>
          <div style={{ display: "flex", gap: 10 }}>
            {ingredients.map((ing, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 15, background: "#F5F5F5",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                  border: "1.5px solid #EFEFEF",
                }}>
                  {ing.emoji}
                </div>
                <span style={{ fontSize: 9, color: C.muted, textAlign: "center" }}>{ing.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price + qty */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>Total Price</div>
            <div style={{ fontWeight: 800, fontSize: 24, color: C.dark }}>₹{(basePrice * qty).toLocaleString()}</div>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            background: "#F5F5F5", borderRadius: 16, padding: "8px 14px",
          }}>
            <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{
              width: 30, height: 30, borderRadius: 10,
              background: qty === 1 ? "#E8E8E8" : C.orange, border: "none",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}>
              <Minus size={14} color={qty === 1 ? "#AAA" : "#fff"} />
            </button>
            <span style={{ fontWeight: 800, fontSize: 18, color: C.dark, minWidth: 18, textAlign: "center" }}>{qty}</span>
            <button onClick={() => setQty(q => q + 1)} style={{
              width: 30, height: 30, borderRadius: 10, background: C.orange, border: "none",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}>
              <Plus size={14} color="#fff" />
            </button>
          </div>
        </div>

        {/* CTA */}
        <button onClick={() => {
          addToCart?.({ id: 99, name: "Chicken Biryani", price: basePrice, qty, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=400&fit=crop&auto=format" });
          onNavigate?.(4);
        }} style={{
          width: "100%", height: 54, borderRadius: 18, background: C.orange, border: "none",
          fontFamily: "Poppins", fontWeight: 700, fontSize: 16, color: "#fff", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
          boxShadow: "0 10px 28px rgba(255,107,53,0.38)",
        }}>
          <ShoppingCart size={19} color="#fff" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// ── SCREEN 5: Cart ────────────────────────────────────────────────────────────
function CartScreen({ onNavigate, items, setItems }: {
  onNavigate?: (s: number) => void;
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}) {
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const changeQty = (id: number, d: number) =>
    setItems(prev => prev.map(it => it.id === id ? { ...it, qty: Math.max(1, it.qty + d) } : it));
  const remove = (id: number) => setItems(prev => prev.filter(it => it.id !== id));

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const delivery = 49;
  const tax = Math.round(subtotal * 0.05);
  const discount = couponApplied ? Math.round(subtotal * 0.15) : 0;
  const total = subtotal + delivery + tax - discount;

  return (
    <div style={{ width: "100%", height: "100%", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "Poppins" }}>
      <StatusBar />

      {/* Header */}
      <div style={{ padding: "0 20px 16px", display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={() => onNavigate?.(3)} style={{
          width: 40, height: 40, borderRadius: 14, background: C.card, border: "none",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
        }}>
          <ChevronLeft size={20} color={C.dark} />
        </button>
        <h2 style={{ fontWeight: 700, fontSize: 20, color: C.dark, margin: 0, flex: 1 }}>My Cart</h2>
        <div style={{
          background: C.orange, color: "#fff", borderRadius: 10, padding: "3px 11px",
          fontSize: 12, fontWeight: 700,
        }}>{items.length} items</div>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 40px", fontFamily: "Poppins" }}>
          <div style={{
            width: 140, height: 140, borderRadius: "50%", background: "#FFF3EE",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 64, marginBottom: 24,
            boxShadow: "0 16px 48px rgba(255,107,53,0.15)",
          }}>🛒</div>
          <h3 style={{ fontWeight: 700, fontSize: 20, color: C.dark, margin: "0 0 10px", textAlign: "center" }}>Your cart is empty</h3>
          <p style={{ fontSize: 13, color: C.muted, textAlign: "center", lineHeight: 1.6, margin: "0 0 28px" }}>
            Add items from the menu to start your order
          </p>
          <button onClick={() => onNavigate?.(2)} style={{
            background: C.orange, border: "none", borderRadius: 16,
            padding: "14px 32px", fontFamily: "Poppins", fontWeight: 700,
            fontSize: 14, color: "#fff", cursor: "pointer",
            boxShadow: "0 8px 24px rgba(255,107,53,0.35)",
          }}>Browse Menu</button>
        </div>
      )}

      {/* Scrollable body */}
      {items.length > 0 && <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", paddingBottom: 6 }}>

        {/* Cart items */}
        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 12, marginBottom: 18 }}>
          {items.map(item => (
            <div key={item.id} style={{
              background: C.card, borderRadius: 20, padding: 14,
              display: "flex", gap: 12, alignItems: "center",
              boxShadow: "0 3px 14px rgba(0,0,0,0.07)",
            }}>
              <div style={{ width: 70, height: 70, borderRadius: 14, overflow: "hidden", background: "#F0F0F0", flexShrink: 0 }}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontWeight: 700, fontSize: 13, color: C.dark, margin: "0 0 3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</h4>
                <p style={{ fontWeight: 800, fontSize: 14, color: C.orange, margin: "0 0 9px" }}>₹{(item.price * item.qty).toLocaleString()}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button onClick={() => changeQty(item.id, -1)} style={{
                    width: 26, height: 26, borderRadius: 8, border: `1.5px solid ${C.border}`,
                    background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                  }}>
                    <Minus size={12} color={C.dark} />
                  </button>
                  <span style={{ fontWeight: 700, fontSize: 14, color: C.dark, minWidth: 16, textAlign: "center" }}>{item.qty}</span>
                  <button onClick={() => changeQty(item.id, 1)} style={{
                    width: 26, height: 26, borderRadius: 8, background: C.orange, border: "none",
                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                  }}>
                    <Plus size={12} color="#fff" />
                  </button>
                </div>
              </div>
              <button onClick={() => remove(item.id)} style={{
                width: 34, height: 34, borderRadius: 11, background: "#FFF0F0", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}>
                <Trash2 size={14} color="#FF4B4B" />
              </button>
            </div>
          ))}
        </div>

        {/* Coupon */}
        <div style={{ padding: "0 20px", marginBottom: 18 }}>
          <div style={{
            background: C.card, borderRadius: 16, padding: "11px 16px",
            display: "flex", gap: 10, alignItems: "center",
            boxShadow: "0 3px 14px rgba(0,0,0,0.06)",
            border: couponApplied ? `2px solid ${C.success}` : `1.5px solid transparent`,
          }}>
            <Tag size={16} color={couponApplied ? C.success : C.orange} />
            <input
              value={coupon}
              onChange={e => setCoupon(e.target.value)}
              placeholder="Enter coupon code..."
              style={{
                flex: 1, border: "none", outline: "none", fontFamily: "Poppins",
                fontSize: 12, color: C.dark, background: "transparent",
              }}
            />
            <button
              onClick={() => { if (coupon.trim().toUpperCase() === "URBANBITES") setCouponApplied(true); }}
              style={{
                background: couponApplied ? C.success : C.orange, border: "none", borderRadius: 10,
                padding: "7px 14px", fontFamily: "Poppins", fontSize: 11, fontWeight: 700,
                color: "#fff", cursor: "pointer",
              }}
            >
              {couponApplied ? "✓ Applied" : "Apply"}
            </button>
          </div>
          {couponApplied && (
            <p style={{ fontSize: 10, color: C.success, margin: "6px 0 0 2px" }}>🎉 15% discount applied! Try code: URBANBITES</p>
          )}
          {!couponApplied && <p style={{ fontSize: 10, color: C.muted, margin: "5px 0 0 2px" }}>Try: URBANBITES for 15% off</p>}
        </div>

        {/* Order Summary */}
        <div style={{ padding: "0 20px" }}>
          <div style={{
            background: C.card, borderRadius: 22, padding: "20px",
            boxShadow: "0 3px 14px rgba(0,0,0,0.07)",
          }}>
            <h4 style={{ fontWeight: 700, fontSize: 14, color: C.dark, margin: "0 0 16px" }}>Order Summary</h4>
            {[
              { label: "Subtotal", val: `₹${subtotal.toLocaleString()}`, color: C.dark },
              { label: "Delivery Fee", val: `₹${delivery}`, color: C.dark },
              { label: "Tax (5%)", val: `₹${tax}`, color: C.dark },
              ...(discount > 0 ? [{ label: "Discount (15%)", val: `-₹${discount.toLocaleString()}`, color: C.success }] : []),
            ].map(row => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: C.muted }}>{row.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: row.color }}>{row.val}</span>
              </div>
            ))}
            <div style={{ height: 1, background: C.border, margin: "14px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: C.dark }}>Grand Total</span>
              <span style={{ fontWeight: 800, fontSize: 22, color: C.orange }}>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>}

      {/* Checkout — only shown when cart has items */}
      {items.length > 0 && (
        <div style={{ padding: "14px 20px 20px", background: C.bg, borderTop: `1px solid ${C.border}` }}>
          <button onClick={() => onNavigate?.(5)} style={{
            width: "100%", height: 54, borderRadius: 18, background: C.orange, border: "none",
            fontFamily: "Poppins", fontWeight: 700, fontSize: 16, color: "#fff",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            boxShadow: "0 10px 28px rgba(255,107,53,0.38)",
          }}>
            Checkout · ₹{total.toLocaleString()}
            <ArrowRight size={18} color="#fff" />
          </button>
        </div>
      )}
    </div>
  );
}

// ── SCREEN 6: Order Success ───────────────────────────────────────────────────
function OrderSuccessScreen({ onNavigate }: { onNavigate?: (s: number) => void }) {
  return (
    <div style={{
      width: "100%", height: "100%", background: "#fff", display: "flex",
      flexDirection: "column", alignItems: "center", fontFamily: "Poppins",
      padding: "0 24px", overflowY: "auto", scrollbarWidth: "none",
    }}>
      <StatusBar />

      {/* Confetti dots */}
      {[
        { top: "12%", left: "12%", size: 12, col: C.orange },
        { top: "18%", right: "14%", size: 8, col: C.amber },
        { top: "26%", left: "22%", size: 6, col: C.success },
        { top: "10%", right: "22%", size: 10, col: "#FF8C5A" },
        { top: "30%", right: "10%", size: 7, col: C.orange },
      ].map((dot, i) => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%", background: dot.col,
          opacity: 0.5, width: dot.size, height: dot.size,
          top: dot.top, left: (dot as any).left, right: (dot as any).right,
        }} />
      ))}

      {/* Success illustration */}
      <div style={{ marginTop: 20, marginBottom: 28 }}>
        <div style={{
          width: 168, height: 168, borderRadius: "50%",
          background: "linear-gradient(145deg, #EDFFF4, #D0F7E0)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 24px 64px rgba(52,199,89,0.22)",
        }}>
          <div style={{
            width: 112, height: 112, borderRadius: "50%",
            background: "linear-gradient(145deg, #4CD964, #34C759)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 10px 30px rgba(52,199,89,0.45)",
          }}>
            <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
              <path d="M13 27L22 36L41 17" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Heading */}
      <h1 style={{
        fontWeight: 800, fontSize: 24, color: C.dark,
        textAlign: "center", margin: "0 0 10px", lineHeight: 1.25,
      }}>
        Order Placed<br />Successfully!
      </h1>
      <p style={{
        fontSize: 13, color: C.muted, textAlign: "center", lineHeight: 1.65,
        margin: "0 0 24px", maxWidth: 268,
      }}>
        Your order has been confirmed and our kitchen is already getting to work!
      </p>

      {/* Order ID chip */}
      <div style={{
        background: "#F5F5F5", borderRadius: 14, padding: "10px 20px",
        marginBottom: 22, display: "flex", gap: 8, alignItems: "center",
      }}>
        <Package size={15} color={C.muted} />
        <span style={{ fontSize: 12, color: C.muted }}>Order ID:</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>#UB-2025-8842</span>
      </div>

      {/* Delivery ETA card */}
      <div style={{
        width: "100%", background: "linear-gradient(135deg, #FFF8F2, #FFF0E6)",
        borderRadius: 22, padding: "20px 22px", marginBottom: 22,
        border: `1.5px solid #FFE4D0`,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <p style={{ fontSize: 11, color: C.muted, margin: "0 0 4px" }}>Estimated Delivery</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
              <span style={{ fontWeight: 800, fontSize: 36, color: C.orange, lineHeight: 1 }}>25</span>
              <span style={{ fontWeight: 500, fontSize: 15, color: C.dark }}>Minutes</span>
            </div>
          </div>
          <div style={{
            width: 66, height: 66, borderRadius: 20, background: C.orange,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32,
            boxShadow: "0 8px 22px rgba(255,107,53,0.32)",
          }}>🛵</div>
        </div>

        {/* Progress track */}
        <div>
          <div style={{ height: 5, background: "#FFE4D0", borderRadius: 3, overflow: "hidden", marginBottom: 7 }}>
            <div style={{ width: "32%", height: "100%", background: C.orange, borderRadius: 3 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {["Confirmed", "Preparing", "On the way", "Delivered"].map((step, i) => (
              <span key={i} style={{
                fontSize: 8, color: i === 0 ? C.orange : C.muted, fontWeight: i === 0 ? 700 : 400,
              }}>{step}</span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA buttons */}
      <button style={{
        width: "100%", height: 52, borderRadius: 16, background: C.orange, border: "none",
        fontFamily: "Poppins", fontWeight: 700, fontSize: 15, color: "#fff",
        cursor: "pointer", marginBottom: 12,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
        boxShadow: "0 10px 28px rgba(255,107,53,0.3)",
      }}>
        <Truck size={18} color="#fff" />
        Track Order
      </button>
      <button onClick={() => onNavigate?.(1)} style={{
        width: "100%", height: 52, borderRadius: 16, background: "#F5F5F5",
        border: `1.5px solid ${C.border}`, fontFamily: "Poppins", fontWeight: 600,
        fontSize: 15, color: C.dark, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
      }}>
        <Home size={18} color={C.dark} />
        Back to Home
      </button>
      <div style={{ height: 28 }} />
    </div>
  );
}

// ── Phone Frame ───────────────────────────────────────────────────────────────
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", width: 393, height: 852, flexShrink: 0 }}>
      {/* Side buttons (volume up / down) */}
      <div style={{ position: "absolute", left: -4, top: 158, width: 4, height: 34, background: "#3C3C3E", borderRadius: "2px 0 0 2px" }} />
      <div style={{ position: "absolute", left: -4, top: 210, width: 4, height: 62, background: "#3C3C3E", borderRadius: "2px 0 0 2px" }} />
      <div style={{ position: "absolute", left: -4, top: 286, width: 4, height: 62, background: "#3C3C3E", borderRadius: "2px 0 0 2px" }} />
      {/* Power button */}
      <div style={{ position: "absolute", right: -4, top: 216, width: 4, height: 92, background: "#3C3C3E", borderRadius: "0 2px 2px 0" }} />

      {/* Screen */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 54, overflow: "hidden",
        background: "#1C1C1E",
        boxShadow: [
          "0 0 0 1.5px #3C3C3E",
          "0 0 0 10px #1C1C1E",
          "0 0 0 11.5px #404042",
          "0 40px 110px rgba(0,0,0,0.85)",
          "0 10px 40px rgba(0,0,0,0.5)",
        ].join(", "),
      }}>
        {/* Screen content */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 52, overflow: "hidden" }}>
          {children}
        </div>
        {/* Dynamic Island */}
        <div style={{
          position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
          width: 120, height: 35, background: "#000", borderRadius: 22, zIndex: 60,
          boxShadow: "0 2px 10px rgba(0,0,0,0.6)",
        }} />
      </div>
    </div>
  );
}

// ── Screen registry ───────────────────────────────────────────────────────────
const SCREENS = [
  { label: "Splash", emoji: "✨" },
  { label: "Home", emoji: "🏠" },
  { label: "Categories", emoji: "🗂️" },
  { label: "Details", emoji: "🍔" },
  { label: "Cart", emoji: "🛒" },
  { label: "Success", emoji: "✅" },
];

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const navigate = (s: number) => {
    if (s >= 0 && s < SCREENS.length) setActive(s);
  };

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + item.qty } : i);
      return [...prev, item];
    });
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const renderScreen = () => {
    switch (active) {
      case 0: return <SplashScreen />;
      case 1: return <HomeScreen onNavigate={navigate} addToCart={addToCart} cartCount={cartCount} />;
      case 2: return <CategoriesScreen onNavigate={navigate} />;
      case 3: return <FoodDetailsScreen onNavigate={navigate} addToCart={addToCart} />;
      case 4: return <CartScreen onNavigate={navigate} items={cartItems} setItems={setCartItems} />;
      case 5: return <OrderSuccessScreen onNavigate={navigate} />;
      default: return <SplashScreen />;
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 60% 20%, #1A0E0A 0%, #0D0D0D 50%, #080808 100%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      fontFamily: "Poppins, sans-serif",
    }}>
      {/* Header */}
      <div style={{ paddingTop: 36, paddingBottom: 28, textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11, justifyContent: "center", marginBottom: 8 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 13, background: C.orange,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
            boxShadow: "0 4px 16px rgba(255,107,53,0.45)",
          }}>🍔</div>
          <span style={{ fontWeight: 800, fontSize: 26, color: "#E0E0E0", letterSpacing: -0.8 }}>Godavari Ruchuliu</span>
        </div>
        <p style={{ fontSize: 12, color: "#555", margin: 0, letterSpacing: 0.4 }}>
          Mobile App Design &nbsp;·&nbsp; iPhone 16 Pro &nbsp;·&nbsp; 393 × 852 px
        </p>
      </div>

      {/* Phone */}
      <PhoneFrame>{renderScreen()}</PhoneFrame>

      {/* Screen selector */}
      <div style={{
        display: "flex", gap: 8, marginTop: 34, flexWrap: "wrap",
        justifyContent: "center", maxWidth: 520, padding: "0 20px",
      }}>
        {SCREENS.map((scr, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 16px", borderRadius: 22,
            background: i === active ? C.orange : "#161616",
            border: i === active ? "none" : "1px solid #2A2A2A",
            fontFamily: "Poppins", fontSize: 12,
            fontWeight: i === active ? 700 : 400,
            color: i === active ? "#fff" : "#555",
            cursor: "pointer",
            boxShadow: i === active ? "0 4px 16px rgba(255,107,53,0.35)" : "none",
            transition: "all 0.18s ease",
          }}>
            <span style={{ fontSize: 14 }}>{scr.emoji}</span>
            {scr.label}
          </button>
        ))}
      </div>

      {/* Footer */}
      <p style={{ fontSize: 11, color: "#333", marginTop: 28, marginBottom: 32, letterSpacing: 0.5 }}>
        Click any screen name above to navigate · Tap within the app to interact
      </p>
    </div>
  );
}
