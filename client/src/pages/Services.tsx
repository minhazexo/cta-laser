import { Container, Button } from "@gadget-wallet/ui";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Sparkle,
  Sun,
  CircleDot,
  Eraser,
  Droplets,
  Crosshair,
  Waves,
  Eye,
  ArrowRight,
  Phone,
} from "lucide-react";
import { staggerContainerFast, staggerItem } from "../lib/animations";
import { SERVICES } from "../data/services";

const iconMap: Record<string, any> = {
  Sparkles,
  Sparkle,
  Sun,
  CircleDot,
  Eraser,
  Droplets,
  Crosshair,
  Waves,
  Eye,
};

export default function Services() {
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto pt-4 pb-8">
          <p className="text-gw-red font-semibold text-xs md:text-sm mb-2 tracking-wider uppercase">
            CSA Laser Clinic
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gw-black dark:text-gray-100 mb-3">
            আমাদের সার্ভিসসমূহ
          </h1>
          <p className="text-sm md:text-base text-gw-gray-500">
            Advanced laser & facial treatments — নিরাপদ, অভিজ্ঞ হাতে, যত্নসহ।
            বুকিং করতে কল করুন অথবা Contact পেজে মেসেজ দিন।
          </p>
        </div>

        {/* Services grid */}
        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon] || Sparkles;
            return (
              <motion.div
                key={service.slug}
                variants={staggerItem}
                whileHover={{ y: -5, boxShadow: "0 16px 32px rgba(0,0,0,0.1)" }}
                className="bg-white dark:bg-gray-900 border border-gw-border dark:border-white/10 rounded-card p-5 md:p-6 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-gw-red/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-gw-red" />
                  </div>
                  <span className="text-xs font-bold text-gw-gray-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gw-black dark:text-gray-100 leading-snug">
                  📍 {service.nameBn}
                </h3>
                <p className="text-xs font-semibold text-gw-red mt-0.5 mb-2">{service.nameEn}</p>
                <p className="text-sm text-gw-gray-500 leading-relaxed flex-1">{service.description}</p>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-gw-red hover:gap-2.5 transition-all"
                >
                  Book this service <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gw-black rounded-newsletter p-8 md:p-10 text-center mt-10 mb-4"
        >
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            ফ্রি কনসালটেশনের জন্য আজই যোগাযোগ করুন
          </h2>
          <p className="text-white/60 text-sm md:text-base mb-6 max-w-md mx-auto">
            আপনার ত্বকের জন্য কোন ট্রিটমেন্ট সঠিক — আমাদের এক্সপার্টের পরামর্শ নিন।
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/contact">
              <Button variant="primary" className="rounded-full px-8 h-12 text-sm">
                <Phone className="w-4 h-4" /> Book Appointment
              </Button>
            </Link>
            <Link to="/shop">
              <Button
                variant="outline"
                className="rounded-full px-8 h-12 text-sm border-white/30 text-white hover:bg-white/10"
              >
                Shop Products
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </motion.section>
  );
}
