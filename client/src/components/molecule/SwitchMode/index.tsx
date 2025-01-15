"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useState } from "react";

export default function DarkModeSwitch() {
  const { setTheme, themes, systemTheme } = useTheme();

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <div
      onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
      className={`flex-start flex items-center h-[30px] w-[70px] rounded-[50px] bg-zinc-100 p-[5px] shadow-inner hover:cursor-pointer dark:bg-zinc-700 place-content-end`}
    >
      <motion.div
        className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-black/90"
        layout
        transition={spring}
      >
        <motion.div whileTap={{ rotate: 360 }}>
          { ? <Moon size={20} /> : <Sun size={20} />}
        </motion.div>
      </motion.div>
    </div>
  );
}
