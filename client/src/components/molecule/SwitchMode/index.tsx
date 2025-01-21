"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useCallback, useMemo } from "react";

export default function DarkModeSwitch() {
  const { setTheme, theme, systemTheme } = useTheme();

  const spring = useMemo(
    () => ({
      type: "spring",
      stiffness: 700,
      damping: 30,
    }),
    []
  );

  const currentTheme = theme === "system" ? systemTheme : theme;
  const modeIcon = useMemo(() => {
    return currentTheme === "dark" ? (
      <Moon size={20} />
    ) : (
      <Sun size={20} className="text-[#FFC529]" />
    );
  }, [currentTheme]);

  const toggleTheme = useCallback(() => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  }, [currentTheme, setTheme]);

  return (
    <div
      onClick={toggleTheme}
      className={`flex-start flex items-center h-[30px] w-[70px] rounded-[50px]  p-[5px] shadow-inner hover:cursor-pointer bg-destructive ${
        currentTheme === "dark" && "place-content-end"
      }`}
    >
      <motion.div
        className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-background"
        layout
        transition={spring}
      >
        <motion.div whileTap={{ rotate: 360 }}>{modeIcon}</motion.div>
      </motion.div>
    </div>
  );
}
