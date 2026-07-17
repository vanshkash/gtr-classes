"use client";

import { motion } from "framer-motion";

export default function Animate({
  children,
  className,
  initial = { opacity: 0, y: 20 },
  whileInView = { opacity: 1, y: 0 },
  transition = { duration: 0.5 },
  ...props
}) {
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true }}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
}