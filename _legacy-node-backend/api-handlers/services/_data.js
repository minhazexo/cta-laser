/**
 * Static fallback for /api/services — mirrors packages/db/src/services-csa.ts
 * so the endpoint works even before the `services` table migration runs.
 */
export const SERVICES = [
  { nameBn: "হেয়ার রিমুভ", nameEn: "Laser Hair Removal", slug: "hair-removal", description: "অনাকাঙ্ক্ষিত লোম স্থায়ীভাবে রিমুভ — নিরাপদ লেজার ট্রিটমেন্ট।", icon: "Sparkles" },
  { nameBn: "মেসতা রিমুভ", nameEn: "Melasma (Mesta) Removal", slug: "melasma-removal", description: "মুখের মেসতা ও গভীর দাগ হালকা করে উজ্জ্বল ত্বক ফিরিয়ে আনে।", icon: "Sun" },
  { nameBn: "কালো তিল, বাদামী তিল রিমুভ", nameEn: "Black / Brown Spot Removal", slug: "dark-spot-removal", description: "কালো ও বাদামী তিল এবং দাগ নিরাপদে রিমুভ করা হয়।", icon: "CircleDot" },
  { nameBn: "ট্যাটু রিমুভ", nameEn: "Tattoo Removal", slug: "tattoo-removal", description: "পুরনো বা অনাকাঙ্ক্ষিত ট্যাটু লেজারে ধীরে ধীরে মুছে ফেলা হয়।", icon: "Eraser" },
  { nameBn: "কার্বন ফেসিয়াল", nameEn: "Carbon Facial", slug: "carbon-facial", description: "ডিপ ক্লিনজিং ও গ্লোয়িং স্কিনের জন্য জনপ্রিয় কার্বন ফেসিয়াল।", icon: "Sparkle" },
  { nameBn: "হাইড্রা ফেসিয়াল", nameEn: "Hydra Facial", slug: "hydra-facial", description: "ত্বকের গভীর হাইড্রেশন, ব্ল্যাকহেডস পরিষ্কার ও ইনস্ট্যান্ট গ্লো।", icon: "Droplets" },
  { nameBn: "মোল রিমুভ", nameEn: "Mole Removal", slug: "mole-removal", description: "অনাকাঙ্ক্ষিত মোল / আঁচিল অভিজ্ঞ হাতে নিরাপদে রিমুভ।", icon: "Crosshair" },
  { nameBn: "স্ট্রেচ মার্ক রিমুভ", nameEn: "Stretch Mark Removal", slug: "stretch-mark-removal", description: "শরীরের স্ট্রেচ মার্ক হালকা করে ত্বক মসৃণ করা হয়।", icon: "Waves" },
  { nameBn: "চোখের কালো দাগ রিমুভ", nameEn: "Under-Eye Dark Circle Removal", slug: "under-eye-dark-circle-removal", description: "চোখের নিচের কালো দাগ দূর করে ফ্রেশ ও উজ্জ্বল লুক।", icon: "Eye" },
];
