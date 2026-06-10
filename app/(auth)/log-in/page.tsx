"use client";

import { motion } from "motion/react";
import { AuthForm } from "../_components/auth-form";

export default function LogInPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <AuthForm intent="login" />
    </motion.div>
  );
}
