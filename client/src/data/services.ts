/**
 * CSA Laser clinic services — storefront data.
 * Mirrors packages/db/src/services-csa.ts (Bengali-first, with English).
 * Icons are lucide-react names resolved in pages/Services.tsx and Home.tsx.
 */
export interface ClinicService {
  slug: string;
  nameBn: string;
  nameEn: string;
  description: string;
  icon: string;
}

export const SERVICES: ClinicService[] = [
  {
    slug: "hair-removal",
    nameBn: "হেয়ার রিমুভ",
    nameEn: "Laser Hair Removal",
    description: "অনাকাঙ্ক্ষিত লোম স্থায়ীভাবে রিমুভ — নিরাপদ লেজার ট্রিটমেন্ট।",
    icon: "Sparkles",
  },
  {
    slug: "melasma-removal",
    nameBn: "মেসতা রিমুভ",
    nameEn: "Melasma (Mesta) Removal",
    description: "মুখের মেসতা ও গভীর দাগ হালকা করে উজ্জ্বল ত্বক ফিরিয়ে আনে।",
    icon: "Sun",
  },
  {
    slug: "dark-spot-removal",
    nameBn: "কালো তিল, বাদামী তিল রিমুভ",
    nameEn: "Black / Brown Spot Removal",
    description: "কালো ও বাদামী তিল এবং দাগ নিরাপদে রিমুভ করা হয়।",
    icon: "CircleDot",
  },
  {
    slug: "tattoo-removal",
    nameBn: "ট্যাটু রিমুভ",
    nameEn: "Tattoo Removal",
    description: "পুরনো বা অনাকাঙ্ক্ষিত ট্যাটু লেজারে ধীরে ধীরে মুছে ফেলা হয়।",
    icon: "Eraser",
  },
  {
    slug: "carbon-facial",
    nameBn: "কার্বন ফেসিয়াল",
    nameEn: "Carbon Facial",
    description: "ডিপ ক্লিনজিং ও গ্লোয়িং স্কিনের জন্য জনপ্রিয় কার্বন ফেসিয়াল।",
    icon: "Sparkle",
  },
  {
    slug: "hydra-facial",
    nameBn: "হাইড্রা ফেসিয়াল",
    nameEn: "Hydra Facial",
    description: "ত্বকের গভীর হাইড্রেশন, ব্ল্যাকহেডস পরিষ্কার ও ইনস্ট্যান্ট গ্লো।",
    icon: "Droplets",
  },
  {
    slug: "mole-removal",
    nameBn: "মোল রিমুভ",
    nameEn: "Mole Removal",
    description: "অনাকাঙ্ক্ষিত মোল / আঁচিল অভিজ্ঞ হাতে নিরাপদে রিমুভ।",
    icon: "Crosshair",
  },
  {
    slug: "stretch-mark-removal",
    nameBn: "স্ট্রেচ মার্ক রিমুভ",
    nameEn: "Stretch Mark Removal",
    description: "শরীরের স্ট্রেচ মার্ক হালকা করে ত্বক মসৃণ করা হয়।",
    icon: "Waves",
  },
  {
    slug: "under-eye-dark-circle-removal",
    nameBn: "চোখের কালো দাগ রিমুভ",
    nameEn: "Under-Eye Dark Circle Removal",
    description: "চোখের নিচের কালো দাগ দূর করে ফ্রেশ ও উজ্জ্বল লুক।",
    icon: "Eye",
  },
];
