import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import confetti from "canvas-confetti";
import { Download, Plus, X, Sparkles, Heart, Palette, Type, RefreshCw } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";

interface CardTheme {
  id: string;
  name: string;
  pageBg: string;
  cardBg: string;
  cardBorder: string;
  innerBorder: string;
  topLabelColor: string;
  titleColor: string;
  titleAccentColor: string;
  nameHighlightBg: string;
  nameHighlightText: string;
  messageColor: string;
  senderLabelColor: string;
  senderTagBg: string;
  senderTagBorder: string;
  senderTagText: string;
  dividerColor: string;
  petalColors: string[];
  flowerCenters: string[];
  leafColors: string[];
  floatingPetalColors: string[];
}

const THEMES: CardTheme[] = [
  {
    id: "pink",
    name: "Pink Rose",
    pageBg: "radial-gradient(ellipse at 60% 40%, #fde8d8 0%, #f9d5e0 40%, #fdf0f5 100%)",
    cardBg: "linear-gradient(155deg, #fff8f2 0%, #fff0f5 50%, #fdf5e8 100%)",
    cardBorder: "rgba(155,58,90,0.14)",
    innerBorder: "rgba(200,132,58,0.28)",
    topLabelColor: "#9b3a5a",
    titleColor: "#7a1f3a",
    titleAccentColor: "#9b3a5a",
    nameHighlightBg: "linear-gradient(90deg, #9b3a5a 0%, #c05070 50%, #9b3a5a 100%)",
    nameHighlightText: "#fff8f2",
    messageColor: "#6b3040",
    senderLabelColor: "#8a6050",
    senderTagBg: "rgba(155,58,90,0.08)",
    senderTagBorder: "rgba(155,58,90,0.18)",
    senderTagText: "#7a1f3a",
    dividerColor: "#c8843a",
    petalColors: ["#e8779a", "#f4a0c0", "#c86090", "#f8c0d8"],
    flowerCenters: ["#f5c03a", "#e8a020", "#f5c03a", "#f09030"],
    leafColors: ["#7aad55", "#5a9940", "#6aaa48"],
    floatingPetalColors: ["#e8779a", "#f4a0c0"],
  },
  {
    id: "purple",
    name: "Royal Purple",
    pageBg: "radial-gradient(ellipse at 60% 40%, #1e112a 0%, #0f0516 100%)",
    cardBg: "linear-gradient(155deg, #2d1b3d 0%, #1c0d29 100%)",
    cardBorder: "rgba(212,175,55,0.25)",
    innerBorder: "rgba(212,175,55,0.4)",
    topLabelColor: "#d4af37",
    titleColor: "#f3e8ff",
    titleAccentColor: "#d4af37",
    nameHighlightBg: "linear-gradient(90deg, #d4af37 0%, #f3e5ab 50%, #d4af37 100%)",
    nameHighlightText: "#1c0d29",
    messageColor: "#e9d5ff",
    senderLabelColor: "#b794f4",
    senderTagBg: "rgba(212,175,55,0.1)",
    senderTagBorder: "rgba(212,175,55,0.3)",
    senderTagText: "#f3e8ff",
    dividerColor: "#d4af37",
    petalColors: ["#9333ea", "#c084fc", "#e9d5ff", "#d4af37"],
    flowerCenters: ["#d4af37", "#f3e5ab", "#d4af37", "#f3e5ab"],
    leafColors: ["#8b5cf6", "#a78bfa", "#c084fc"],
    floatingPetalColors: ["#9333ea", "#d4af37"],
  },
  {
    id: "sage",
    name: "Emerald Sage",
    pageBg: "radial-gradient(ellipse at 60% 40%, #e6f4ea 0%, #d2ebd9 40%, #eef7f2 100%)",
    cardBg: "linear-gradient(155deg, #f7fbf8 0%, #edf7f0 50%, #f4fbf6 100%)",
    cardBorder: "rgba(46,125,50,0.14)",
    innerBorder: "rgba(139,195,74,0.3)",
    topLabelColor: "#2e7d32",
    titleColor: "#1b5e20",
    titleAccentColor: "#388e3c",
    nameHighlightBg: "linear-gradient(90deg, #2e7d32 0%, #66bb6a 50%, #2e7d32 100%)",
    nameHighlightText: "#f7fbf8",
    messageColor: "#37474f",
    senderLabelColor: "#558b2f",
    senderTagBg: "rgba(46,125,50,0.08)",
    senderTagBorder: "rgba(46,125,50,0.18)",
    senderTagText: "#1b5e20",
    dividerColor: "#8bc34a",
    petalColors: ["#81c784", "#a5d6a7", "#66bb6a", "#c8e6c9"],
    flowerCenters: ["#ffd54f", "#ffca28", "#ffd54f", "#ffb300"],
    leafColors: ["#4caf50", "#8bc34a", "#689f38"],
    floatingPetalColors: ["#a5d6a7", "#81c784"],
  },
  {
    id: "ocean",
    name: "Ocean Breeze",
    pageBg: "radial-gradient(ellipse at 60% 40%, #e0f2f1 0%, #b2dfdb 40%, #e0f7fa 100%)",
    cardBg: "linear-gradient(155deg, #f5fcfc 0%, #e0f7fa 50%, #e8f5e9 100%)",
    cardBorder: "rgba(0,105,92,0.15)",
    innerBorder: "rgba(0,150,136,0.3)",
    topLabelColor: "#00695c",
    titleColor: "#004d40",
    titleAccentColor: "#00796b",
    nameHighlightBg: "linear-gradient(90deg, #00695c 0%, #26a69a 50%, #00695c 100%)",
    nameHighlightText: "#ffffff",
    messageColor: "#263238",
    senderLabelColor: "#00796b",
    senderTagBg: "rgba(0,121,107,0.08)",
    senderTagBorder: "rgba(0,121,107,0.18)",
    senderTagText: "#004d40",
    dividerColor: "#009688",
    petalColors: ["#4db6ac", "#80cbc4", "#26a69a", "#b2dfdb"],
    flowerCenters: ["#ffb74d", "#ffa726", "#ffb74d", "#ff9800"],
    leafColors: ["#009688", "#4db6ac", "#00897b"],
    floatingPetalColors: ["#4db6ac", "#80cbc4"],
  }
];

const Petal = ({ cx, cy, r, color, rotation }: { cx: number; cy: number; r: number; color: string; rotation: number }) => (
  <ellipse
    cx={cx}
    cy={cy}
    rx={r * 0.55}
    ry={r}
    fill={color}
    transform={`rotate(${rotation} ${cx} ${cy})`}
    opacity={0.85}
  />
);

const Flower = ({ x, y, size, petals, petalColor, centerColor }: {
  x: number; y: number; size: number; petals: number; petalColor: string; centerColor: string;
}) => {
  const angles = Array.from({ length: petals }, (_, i) => (360 / petals) * i);
  return (
    <g transform={`translate(${x} ${y})`}>
      {angles.map((angle, i) => (
        <Petal key={i} cx={0} cy={-size * 0.7} r={size * 0.55} color={petalColor} rotation={angle} />
      ))}
      <circle cx={0} cy={0} r={size * 0.32} fill={centerColor} />
      <circle cx={0} cy={0} r={size * 0.18} fill="#fff7e6" opacity={0.7} />
    </g>
  );
};

const Leaf = ({ x, y, size, rotation, color }: { x: number; y: number; size: number; rotation: number; color: string }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
    <ellipse cx={0} cy={-size * 0.5} rx={size * 0.3} ry={size * 0.6} fill={color} opacity={0.75} />
    <line x1={0} y1={0} x2={0} y2={-size} stroke="#5a8a40" strokeWidth={0.8} opacity={0.5} />
  </g>
);

const FloralCorner = ({ flip, petalColors, flowerCenters, leafColors }: {
  flip: boolean;
  petalColors: string[];
  flowerCenters: string[];
  leafColors: string[];
}) => (
  <svg
    viewBox="0 0 180 180"
    className="absolute w-40 h-40 md:w-52 md:h-52"
    style={{
      top: flip ? "auto" : 0,
      bottom: flip ? 0 : "auto",
      left: flip ? "auto" : 0,
      right: flip ? 0 : "auto",
      transform: flip ? "rotate(180deg)" : "none",
      pointerEvents: "none",
      zIndex: 5,
    }}
  >
    {/* Stems */}
    <path d="M10 170 Q50 130 80 90" stroke={leafColors[0]} strokeWidth="2.5" fill="none" opacity="0.6" />
    <path d="M10 170 Q30 110 60 60" stroke={leafColors[1] || leafColors[0]} strokeWidth="2" fill="none" opacity="0.5" />
    <path d="M10 170 Q70 150 120 140" stroke={leafColors[2] || leafColors[0]} strokeWidth="2" fill="none" opacity="0.5" />

    {/* Leaves */}
    <Leaf x={45} y={130} size={22} rotation={-40} color={leafColors[0]} />
    <Leaf x={65} y={100} size={18} rotation={20} color={leafColors[1] || leafColors[0]} />
    <Leaf x={90} y={145} size={16} rotation={-70} color={leafColors[2] || leafColors[0]} />

    {/* Flowers */}
    <Flower x={80} y={88} size={20} petals={6} petalColor={petalColors[0]} centerColor={flowerCenters[0]} />
    <Flower x={50} y={52} size={16} petals={5} petalColor={petalColors[1] || petalColors[0]} centerColor={flowerCenters[1] || flowerCenters[0]} />
    <Flower x={120} y={135} size={14} petals={5} petalColor={petalColors[2] || petalColors[0]} centerColor={flowerCenters[2] || flowerCenters[0]} />
    <Flower x={100} y={70} size={12} petals={6} petalColor={petalColors[3] || petalColors[0]} centerColor={flowerCenters[3] || flowerCenters[0]} />

    {/* Small buds */}
    <circle cx={65} cy={78} r={5} fill={petalColors[1] || petalColors[0]} opacity="0.8" />
    <circle cx={110} cy={110} r={4} fill={petalColors[0]} opacity="0.7" />
  </svg>
);

const SparkleRow = ({ color }: { color: string }) => (
  <div className="flex items-center justify-center gap-3 my-2">
    {["✦", "✧", "✦", "✧", "✦"].map((s, i) => (
      <motion.span
        key={i}
        className="text-xs"
        style={{ color }}
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
      >
        {s}
      </motion.span>
    ))}
  </div>
);

interface PDFSizeOption {
  id: string;
  name: string;
  desc: string;
  widthMm: number;  // Portrait width
  heightMm: number; // Portrait height
}

const PDF_SIZES: PDFSizeOption[] = [
  { id: "original", name: "Rasio Asli (Default)", desc: "Sesuai tampilan layar asli", widthMm: 0, heightMm: 0 },
  { id: "10x7", name: "Mini (10x7 cm)", desc: "Ukuran kartu ucapan kecil", widthMm: 70, heightMm: 100 },
  { id: "a6", name: "A6 (Postcard)", desc: "Ukuran standar kartu pos (10.5x14.8 cm)", widthMm: 105, heightMm: 148 },
  { id: "a5", name: "A5 (Sedang)", desc: "Ukuran setengah A4 (14.8x21 cm)", widthMm: 148, heightMm: 210 },
  { id: "a4", name: "A4 (Besar/Standar)", desc: "Ukuran kertas dokumen (21x29.7 cm)", widthMm: 210, heightMm: 297 },
];

export default function App() {
  const [topLabel, setTopLabel] = useState("with love & warmth");
  const [title, setTitle] = useState("Selamat");
  const [titleAccent, setTitleAccent] = useState("Hari Jadi");
  const [pdfSize, setPdfSize] = useState("original");
  const [recipient, setRecipient] = useState("Nenek Nini");
  const [message, setMessage] = useState("Semoga nenek selalu diberikan kesehatan, kebahagiaan, dan kasih sayang yang berlimpah.");
  const [senderLabel, setSenderLabel] = useState("Dari Cucunda");
  const [senders, setSenders] = useState<string[]>(["Dipta", "Dias", "Ditri"]);
  const [newSender, setNewSender] = useState("");
  const [themeId, setThemeId] = useState("pink");
  const [isDownloading, setIsDownloading] = useState(false);

  const currentTheme = THEMES.find((t) => t.id === themeId) || THEMES[0];

  const handleAddSender = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSender.trim() && !senders.includes(newSender.trim())) {
      setSenders([...senders, newSender.trim()]);
      setNewSender("");
    }
  };

  const handleRemoveSender = (index: number) => {
    setSenders(senders.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setTopLabel("with love & warmth");
    setTitle("Selamat");
    setTitleAccent("Hari Jadi");
    setRecipient("Nenek Nini");
    setMessage("Semoga nenek selalu diberikan kesehatan, kebahagiaan, dan kasih sayang yang berlimpah.");
    setSenderLabel("Dari Cucunda");
    setSenders(["Dipta", "Dias", "Ditri"]);
    setThemeId("pink");
    setPdfSize("original");
  };

  const downloadPDF = async () => {
    setIsDownloading(true);
    const element = document.getElementById("card-to-print");
    if (!element) {
      setIsDownloading(false);
      return;
    }

    try {
      // Small timeout to ensure styling is settled
      await new Promise((resolve) => setTimeout(resolve, 200));

      const canvas = await html2canvas(element, {
        scale: 3, // Crisp resolution
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = element.offsetWidth;
      const imgHeight = element.offsetHeight;

      // Convert dimensions to mm for PDF
      const isLandscape = imgWidth > imgHeight;
      const selectedSize = PDF_SIZES.find((opt) => opt.id === pdfSize) || PDF_SIZES[0];

      let pdfWidth = imgWidth * 0.264583;
      let pdfHeight = imgHeight * 0.264583;

      if (selectedSize.id !== "original") {
        pdfWidth = isLandscape ? selectedSize.heightMm : selectedSize.widthMm;
        pdfHeight = isLandscape ? selectedSize.widthMm : selectedSize.heightMm;
      }

      const pdf = new jsPDF(
        isLandscape ? "landscape" : "portrait",
        "mm",
        [pdfWidth, pdfHeight]
      );

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`kartu-ucapan-${recipient.toLowerCase().replace(/[^a-z0-9]/g, "-")}.pdf`);

      // Trigger celebration confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: currentTheme.petalColors,
      });
    } catch (err: any) {
      console.error("PDF generation failed:", err);
      alert("Gagal mengunduh PDF. Detail error: " + (err.message || err));
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-stretch" style={{ fontFamily: "'Lato', sans-serif" }}>
      {/* Editor Panel */}
      <div className="w-full lg:w-[450px] xl:w-[500px] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-zinc-200/50 dark:border-zinc-800/50 p-6 md:p-8 flex flex-col justify-between overflow-y-auto shrink-0 shadow-2xl z-20">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-200/50 dark:border-zinc-800/50 pb-4">
            <div>
              <h1 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                Editor Kartu Ucapan
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Kustomisasi kartu sesuai keinginan Anda</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="text-xs flex items-center gap-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset
            </Button>
          </div>

          <div className="space-y-4">
            {/* Theme Selector */}
            <div className="space-y-2">
              <Label className="text-zinc-700 dark:text-zinc-300 font-semibold flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-zinc-500" />
                Tema Warna
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setThemeId(theme.id)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm transition-all text-left ${
                      themeId === theme.id
                        ? "border-rose-500 bg-rose-500/5 dark:bg-rose-500/10 font-medium text-rose-600 dark:text-rose-400"
                        : "border-zinc-200 dark:border-zinc-850 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                      style={{ background: theme.petalColors[0] }}
                    />
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <Label className="text-zinc-700 dark:text-zinc-300 font-semibold flex items-center gap-1.5">
                <Type className="w-4 h-4 text-zinc-500" />
                Kustomisasi Teks
              </Label>

              <div className="space-y-2.5">
                <div>
                  <label className="text-[11px] font-medium tracking-wider uppercase text-zinc-500 dark:text-zinc-400 block mb-1">
                    Label Atas
                  </label>
                  <Input
                    value={topLabel}
                    onChange={(e) => setTopLabel(e.target.value)}
                    placeholder="Contoh: with love & warmth"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-medium tracking-wider uppercase text-zinc-500 dark:text-zinc-400 block mb-1">
                      Ucapan Utama
                    </label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Contoh: Selamat"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium tracking-wider uppercase text-zinc-500 dark:text-zinc-400 block mb-1">
                      Penekanan Miring
                    </label>
                    <Input
                      value={titleAccent}
                      onChange={(e) => setTitleAccent(e.target.value)}
                      placeholder="Contoh: Hari Jadi"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium tracking-wider uppercase text-zinc-500 dark:text-zinc-400 block mb-1">
                    Nama Penerima
                  </label>
                  <Input
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Contoh: Nenek Nini"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium tracking-wider uppercase text-zinc-500 dark:text-zinc-400 block mb-1">
                    Pesan Hangat
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tuliskan pesan doa dan harapan..."
                    className="min-h-[80px]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium tracking-wider uppercase text-zinc-500 dark:text-zinc-400 block mb-1">
                    Label Pengirim
                  </label>
                  <Input
                    value={senderLabel}
                    onChange={(e) => setSenderLabel(e.target.value)}
                    placeholder="Contoh: Dari Cucunda"
                  />
                </div>

                {/* Senders List */}
                <div>
                  <label className="text-[11px] font-medium tracking-wider uppercase text-zinc-500 dark:text-zinc-400 block mb-1">
                    Nama Pengirim
                  </label>
                  <form onSubmit={handleAddSender} className="flex gap-2 mb-2">
                    <Input
                      value={newSender}
                      onChange={(e) => setNewSender(e.target.value)}
                      placeholder="Masukkan nama pengirim..."
                      className="flex-1"
                    />
                    <Button type="submit" size="sm" variant="outline" className="px-3">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </form>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
                    {senders.length === 0 ? (
                      <span className="text-xs text-zinc-400 italic px-2 py-1">Belum ada nama pengirim</span>
                    ) : (
                      senders.map((sender, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                          style={{
                            background: currentTheme.senderTagBg,
                            border: `1px solid ${currentTheme.senderTagBorder}`,
                            color: currentTheme.senderTagText,
                          }}
                        >
                          <span>{sender}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSender(index)}
                            className="hover:bg-black/5 dark:hover:bg-white/10 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-200/50 dark:border-zinc-800/50 pt-4 space-y-4">
          {/* PDF Size Selector */}
          <div className="space-y-2">
            <Label className="text-zinc-700 dark:text-zinc-300 font-semibold flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
              Ukuran Kertas Ekspor PDF
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {PDF_SIZES.map((opt, idx) => (
                <button
                  key={opt.id}
                  onClick={() => setPdfSize(opt.id)}
                  className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all duration-200 ${
                    idx === 0 ? "col-span-2" : ""
                  } ${
                    pdfSize === opt.id
                      ? "border-zinc-800 dark:border-zinc-200 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-50 font-semibold shadow-sm"
                      : "border-zinc-200 dark:border-zinc-800/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 text-zinc-500 dark:text-zinc-400"
                  }`}
                  style={
                    pdfSize === opt.id
                      ? {
                          borderColor: currentTheme.topLabelColor,
                          background: `${currentTheme.topLabelColor}08`,
                        }
                      : {}
                  }
                >
                  <span
                    className="font-bold text-xs"
                    style={pdfSize === opt.id ? { color: currentTheme.titleColor } : {}}
                  >
                    {opt.name}
                  </span>
                  <span className="text-[10px] opacity-70 mt-0.5">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={downloadPDF}
            disabled={isDownloading}
            className="w-full py-6 rounded-2xl font-bold flex items-center justify-center gap-2 text-base transition-all duration-300 shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.topLabelColor} 0%, ${currentTheme.titleColor} 100%)`,
              color: "#ffffff",
              boxShadow: `0 8px 30px ${currentTheme.cardBorder}`,
            }}
          >
            {isDownloading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Membuat PDF...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Unduh PDF Kartu
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Card Preview Screen */}
      <div
        className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-hidden transition-all duration-1000 select-none min-h-[600px] lg:min-h-0"
        style={{ background: currentTheme.pageBg }}
      >
        {/* Floating petals animation */}
        <AnimatePresence>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-20 pointer-events-none"
              style={{
                width: `${10 + (i % 3) * 8}px`,
                height: `${14 + (i % 3) * 10}px`,
                background: i % 2 === 0 ? currentTheme.floatingPetalColors[0] : currentTheme.floatingPetalColors[1],
                left: `${8 + i * 8.5}%`,
                top: `${5 + ((i * 23) % 85)}%`,
                borderRadius: "50% 20% 50% 20%",
                zIndex: 1,
              }}
              animate={{
                y: [0, -25, 0],
                rotate: [0, 30, -20, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 5 + i * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </AnimatePresence>

        {/* Card Component */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          id="card-to-print"
          className="relative w-full max-w-md md:max-w-lg overflow-hidden transition-all duration-500 shadow-2xl flex flex-col justify-between"
          style={{
            background: currentTheme.cardBg,
            borderRadius: "2rem",
            border: `1.5px solid ${currentTheme.cardBorder}`,
            boxShadow: "0 20px 80px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.04)",
            zIndex: 10,
          }}
        >
          {/* Floral Corners */}
          <FloralCorner
            flip={false}
            petalColors={currentTheme.petalColors}
            flowerCenters={currentTheme.flowerCenters}
            leafColors={currentTheme.leafColors}
          />
          <FloralCorner
            flip={true}
            petalColors={currentTheme.petalColors}
            flowerCenters={currentTheme.flowerCenters}
            leafColors={currentTheme.leafColors}
          />

          {/* Inner Decorative Frame Border */}
          <div
            className="absolute inset-4 pointer-events-none"
            style={{
              border: `1px solid ${currentTheme.innerBorder}`,
              borderRadius: "1.5rem",
              zIndex: 3,
            }}
          />

          {/* Main Card Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-8 md:px-14 py-16 md:py-20 flex-1 justify-center">
            {/* Top Tagline */}
            {topLabel && (
              <motion.p
                key={topLabel}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] tracking-[0.3em] uppercase mb-2 font-medium"
                style={{ color: currentTheme.topLabelColor }}
              >
                {topLabel}
              </motion.p>
            )}

            <SparkleRow color={currentTheme.dividerColor} />

            {/* Main Greeting Heading */}
            <h1
              className="mt-3 leading-tight font-bold tracking-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 5.5vw, 2.5rem)",
                color: currentTheme.titleColor,
                lineHeight: 1.2,
              }}
            >
              {title}
              {titleAccent && (
                <>
                  <br />
                  <span style={{ fontStyle: "italic", color: currentTheme.titleAccentColor }}>{titleAccent}</span>
                </>
              )}
            </h1>

            {/* Recipient's Name Highlight */}
            {recipient && (
              <motion.div
                key={recipient}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-5 mb-2 px-8 py-2.5 rounded-full"
                style={{
                  background: currentTheme.nameHighlightBg,
                  boxShadow: `0 4px 20px ${currentTheme.cardBorder}`,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "clamp(1.4rem, 4.5vw, 2rem)",
                    fontWeight: 700,
                    color: currentTheme.nameHighlightText,
                    letterSpacing: "0.02em",
                  }}
                >
                  {recipient}
                </p>
              </motion.div>
            )}

            {/* Elegance Decorative Divider */}
            <div className="flex items-center gap-3 my-4 w-full justify-center opacity-85">
              <div
                className="h-px flex-1 max-w-[50px]"
                style={{ background: `linear-gradient(90deg, transparent, ${currentTheme.dividerColor})` }}
              />
              <svg width="16" height="16" viewBox="0 0 20 20">
                <path d="M10 2 L11.5 8.5 L18 10 L11.5 11.5 L10 18 L8.5 11.5 L2 10 L8.5 8.5 Z" fill={currentTheme.dividerColor} />
              </svg>
              <div
                className="h-px flex-1 max-w-[50px]"
                style={{ background: `linear-gradient(90deg, ${currentTheme.dividerColor}, transparent)` }}
              />
            </div>

            {/* Heartfelt message */}
            {message && (
              <p
                key={message}
                className="text-xs md:text-sm leading-relaxed max-w-xs px-2 font-light"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  color: currentTheme.messageColor,
                  letterSpacing: "0.01em",
                }}
              >
                {message}
              </p>
            )}

            {/* Flower elements divider */}
            <div className="flex items-center gap-2 my-4">
              {["❀", "❁", "❀"].map((f, i) => (
                <span key={i} style={{ color: currentTheme.petalColors[0], fontSize: "0.75rem" }}>
                  {f}
                </span>
              ))}
            </div>

            {/* From section */}
            <div className="flex flex-col items-center gap-2 mt-2">
              {senderLabel && (
                <p
                  className="text-xs tracking-[0.2em] uppercase font-semibold"
                  style={{ color: currentTheme.senderLabelColor }}
                >
                  {senderLabel}
                </p>
              )}
              <div className="flex flex-wrap items-center justify-center gap-3 max-w-sm">
                {senders.map((name, i) => (
                  <span key={name} className="flex items-center">
                    <span
                      className="inline-block px-5 py-2 rounded-full text-base font-bold shadow-sm"
                      style={{
                        fontFamily: "'Dancing Script', cursive",
                        fontSize: "1.75rem",
                        color: currentTheme.senderTagText,
                        background: currentTheme.senderTagBg,
                        border: `1.5px solid ${currentTheme.senderTagBorder}`,
                      }}
                    >
                      {name}
                    </span>
                    {i < senders.length - 1 && (
                      <span className="ml-3 text-rose-400 dark:text-rose-600 text-sm">✦</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Sparkles row */}
            <div className="mt-5 opacity-70">
              <SparkleRow color={currentTheme.dividerColor} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
