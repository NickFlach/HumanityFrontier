// Animation color and theme constants
// (keyframes are handled through Tailwind CSS)

export const float = {
  "0%, 100%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-10px)" }
};

export const pulseSlow = {
  "0%, 100%": { opacity: "0.7" },
  "50%": { opacity: "1" }
};

export const spinSlow = {
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" }
};

export const quantum = {
  deep: "#1a1a2e",
  blue: "#4cc9f0",
  purple: "#7b2cbf",
  slate: "#2d3748",
  black: "#0f0f1a",
  emerald: "#10b981",
  amber: "#f59e0b"
};
