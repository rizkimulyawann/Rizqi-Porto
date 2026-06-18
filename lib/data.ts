import { projects } from "./projects";

export const portfolioData = {
  personalInfo: {
    name: "Rizqi Mulyawan",
    role: "Full Stack Developer & Mobile Developer",
    bio: "I create secure and user-friendly web and mobile applications using modern technologies.",
    mainPhoto: "/profil/profil.png",
    contact: {
      phone: "6285658059136", // Ubah dengan nomor WhatsApp yang benar (awali dengan 62)
      message: "Halo Rizqi, saya melihat portfolio Anda dan ingin berdiskusi lebih lanjut!" // Pesan default WA
    },
    socials: {
      github: "https://github.com/rizkimulyawann",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    }
  },
  uiTexts: {
    heroButton1: "View Projects",
    heroButton2: "Contact Me",
    projectDemoButton: "Source Code",
    projectSourceButton: "Source Code"
  },
  skills: [
    "PHP", "Laravel", "Flutter", "HTML & CSS", "JavaScript", "Next.js", "Dart", "API", "Backend", "Frontend"
  ],
  stats: [
    { label: "Tech Stack", value: "8+", icon: "Cpu" },
    { label: "Lines Coded", value: "250K+", icon: "Code2" },
    { label: "Projects", value: "20+", icon: "Target" },
    { label: "Network", value: "Global", icon: "Globe2" }
  ],
  projects: projects
};
