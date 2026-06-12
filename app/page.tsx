"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { ExternalLink, Trophy, Target, Gamepad2, Cpu, Code2, Globe2, ChevronLeft, ChevronRight, Search, X, Smartphone, Database } from "lucide-react";
import CyberRPG from "@/components/CyberRPG";

// --- Custom Icons ---
const WAIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

// --- Multi-Image Project Card ---
const ProjectCard = ({ project, index, onImageClick, onProjectClick, demoText }: { project: any, index: number, onImageClick: (img: string) => void, onProjectClick: (p: any) => void, demoText: string }) => {
  const [currentImg, setCurrentImg] = useState(0);
  
  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((p) => (p + 1) % project.images.length);
  };
  
  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((p) => (p - 1 + project.images.length) % project.images.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative rounded-2xl overflow-hidden group bg-[#08080c] border border-white/10 flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.5)] h-full"
    >
      {/* HUD Elements */}
      <div className="absolute top-4 left-4 z-40 bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-space-grotesk text-white px-3 py-1 uppercase tracking-widest rounded">
        PROJECT_{String(index + 1).padStart(2, '0')}
      </div>
      <div className="absolute top-4 right-4 z-40 text-emerald-400 font-space-grotesk text-[10px] tracking-widest uppercase flex items-center gap-2 bg-black/80 px-3 py-1 rounded border border-emerald-500/30">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
        Success
      </div>

      {/* Image Slider Half */}
      <div className="relative w-full h-[240px] sm:h-[280px] shrink-0 overflow-hidden bg-cyan-950/20 group/slider">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImg}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={project.images[currentImg]}
              alt={`${project.title} - Image ${currentImg + 1}`}
              fill
              className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer hover:scale-105"
              onClick={() => onImageClick(project.images[currentImg])}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-transparent to-transparent z-20 pointer-events-none" />

        {/* Slider Controls */}
        {project.images.length > 1 && (
          <>
            <button 
              onClick={prevImg} 
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 border border-white/10 rounded-full text-white/50 hover:text-cyan-400 hover:border-cyan-400 z-30 opacity-0 group-hover/slider:opacity-100 transition-all hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextImg} 
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 border border-white/10 rounded-full text-white/50 hover:text-cyan-400 hover:border-cyan-400 z-30 opacity-0 group-hover/slider:opacity-100 transition-all hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
              {project.images.map((_: string, i: number) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImg ? 'w-4 bg-cyan-400' : 'w-1.5 bg-white/30'}`} 
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* Info Half */}
      <div className="relative w-full p-6 md:p-8 flex flex-col flex-grow justify-between z-20 group-hover:border-t-cyan-500/50 border-t border-transparent transition-colors">
        <div>
          <h4 
            className="text-2xl md:text-3xl font-space-grotesk font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight cursor-pointer"
            onClick={() => onProjectClick(project)}
          >
            {project.title}
          </h4>
          <p 
            className="text-white/50 text-sm line-clamp-2 font-inter leading-relaxed cursor-pointer"
            onClick={() => onProjectClick(project)}
          >
            {project.description}
          </p>
          <button 
            onClick={() => onProjectClick(project)} 
            className="text-cyan-400 text-[10px] font-space-grotesk tracking-widest uppercase hover:text-cyan-300 mt-2 text-left w-fit flex items-center gap-1"
          >
            Read More
          </button>
        </div>
        
        <div className="flex flex-col gap-5 mt-4">
          <div className="flex flex-wrap gap-2 overflow-hidden">
            {project.tech.map((tech: string, i: number) => (
              <span key={i} className="text-[10px] font-space-grotesk uppercase tracking-widest px-2 py-1 bg-white/5 border border-white/10 text-white/70">
                {tech}
              </span>
            ))}
          </div>
          
          {project.links ? (
            <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
              {project.links.map((lnk: any, i: number) => {
                const Icon = lnk.type === 'backend' ? Database : (lnk.type === 'frontend' ? Smartphone : GithubIcon);
                return (
                  <a 
                    key={i}
                    href={lnk.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 py-3 rounded bg-white/5 hover:bg-cyan-500 hover:text-black text-white font-space-grotesk text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 border border-white/10 hover:border-transparent"
                  >
                    <Icon className="w-4 h-4" /> {lnk.label}
                  </a>
                );
              })}
            </div>
          ) : (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noreferrer"
              className="w-full mt-2 py-3 rounded bg-white/5 hover:bg-cyan-500 hover:text-black text-white font-space-grotesk text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 border border-white/10 hover:border-transparent"
            >
              <GithubIcon className="w-4 h-4" /> {demoText}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const { personalInfo, skills, projects, uiTexts } = portfolioData;
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [modalImgIndex, setModalImgIndex] = useState(0);
  const [isGameOpen, setIsGameOpen] = useState(false);

  const handleOpenProject = (project: any) => {
    setSelectedProject(project);
    setModalImgIndex(0);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="bg-[#030508] text-slate-200 font-inter overflow-x-hidden min-h-screen selection:bg-cyan-500/30">
      
      {/* Sci-Fi Ambient Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]"></div>
        <div className="absolute top-0 right-[-10%] w-[50vw] h-[50vw] bg-cyan-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[150px]"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-5 flex justify-between items-center z-50 backdrop-blur-md bg-[#030508]/80 border-b border-cyan-900/30">
        <div className="flex items-center gap-2">
          <div className="text-white font-space-grotesk text-2xl font-bold tracking-widest uppercase">
            {personalInfo.name.split(" ")[0]}
          </div>
          <div className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-[10px] font-space-grotesk tracking-widest uppercase ml-2 animate-pulse hidden sm:block">
            Sys.Active
          </div>
        </div>
        <a 
          href={`https://wa.me/${personalInfo.contact.phone}?text=${encodeURIComponent(personalInfo.contact.message)}`} 
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 px-6 py-2.5 bg-cyan-950/40 hover:bg-cyan-500 hover:text-black border border-cyan-500/50 text-cyan-400 rounded transition-all duration-300"
        >
          <WAIcon className="w-4 h-4" />
          <span className="text-xs font-bold font-space-grotesk tracking-widest uppercase">{uiTexts.heroButton2}</span>
        </a>
      </header>

      <main className="relative z-10 pt-24 pb-20">
        
        {/* CINEMATIC HERO SECTION */}
        <section className="relative min-h-[85vh] flex flex-col justify-center max-w-7xl mx-auto px-6 mb-20 mt-10">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left: Massive Typography and Data */}
            <div className="w-full lg:w-3/5 text-center lg:text-left z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-cyan-950/50 border border-cyan-500/30 rounded-full mb-6">
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-400 text-[10px] font-space-grotesk tracking-[0.2em] uppercase">
                    Level 99 • Grandmaster Class
                  </span>
                </div>
                
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-space-grotesk font-black uppercase tracking-tighter text-white leading-[0.9] mb-4">
                  {personalInfo.name}
                </h1>
                
                <p className="text-xl sm:text-2xl text-cyan-200/50 font-space-grotesk tracking-[0.3em] uppercase mb-10">
                  {personalInfo.role}
                </p>

                {/* Cinematic XP Bar */}
                <div className="w-full max-w-lg mx-auto lg:mx-0 mb-8 p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                  <div className="flex justify-between text-[10px] font-space-grotesk text-white/50 mb-3 uppercase tracking-widest">
                    <span>Rank Progression</span>
                    <span className="text-cyan-400">85,000 / 100,000 XP</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: "85%" }} 
                      transition={{ duration: 2, delay: 0.5, ease: "easeOut" }} 
                      className="h-full bg-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.8)]" 
                    />
                  </div>
                </div>

                <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-light mb-8">
                  {personalInfo.bio}
                </p>

                {/* Quick Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full">
                  <a 
                    href="#projects" 
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-[#030508] font-space-grotesk font-bold uppercase tracking-widest transition-all rounded shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] hover:-translate-y-1"
                  >
                    <Target className="w-5 h-5" /> {uiTexts.heroButton1}
                  </a>
                  <a 
                    href={`https://wa.me/${personalInfo.contact.phone}?text=${encodeURIComponent(personalInfo.contact.message)}`} 
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 bg-transparent border border-white/20 text-white hover:text-cyan-400 hover:border-cyan-400 font-space-grotesk font-bold uppercase tracking-widest transition-all rounded hover:-translate-y-1"
                  >
                    <WAIcon className="w-5 h-5" /> {uiTexts.heroButton2}
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center lg:justify-start gap-4 mt-8">
                  <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="p-3 bg-white/5 border border-white/10 text-white/50 hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 rounded-full transition-all hover:-translate-y-1">
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-white/5 border border-white/10 text-white/50 hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 rounded-full transition-all hover:-translate-y-1">
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                  <a href={personalInfo.socials.instagram} target="_blank" rel="noreferrer" className="p-3 bg-white/5 border border-white/10 text-white/50 hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 rounded-full transition-all hover:-translate-y-1">
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            </div>
            
            {/* Right: Majestic Framed Photo */}
            <div className="w-full lg:w-2/5 flex justify-center lg:justify-end z-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-[260px] h-[340px] sm:w-[300px] sm:h-[400px] md:w-[400px] md:h-[550px] mb-8 lg:mb-0"
              >
                <div className="absolute inset-0 bg-cyan-500/20 blur-[80px] rounded-full" />
                <div className="relative w-full h-full">
                  <Image
                    src={personalInfo.mainPhoto}
                    alt={personalInfo.name}
                    fill
                    className="object-cover rounded-2xl border border-cyan-500/20 shadow-2xl z-10"
                    priority
                  />
                  <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
                  <div className="absolute bottom-6 left-[-2rem] bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 z-30 shadow-xl rounded">
                    <div className="text-[10px] text-cyan-400 font-space-grotesk tracking-widest uppercase mb-1">Status</div>
                    <div className="text-white text-sm font-bold tracking-wider">ONLINE</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Player Global Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-24">
            {portfolioData.stats.map((stat, i) => {
              const icons = [Cpu, Code2, Target, Globe2];
              const Icon = icons[i % icons.length];
              return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + (i * 0.1) }}
                className="p-4 sm:p-6 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col items-center justify-center text-center hover:bg-white/[0.05] hover:border-cyan-500/30 transition-colors"
              >
                <Icon className="w-6 h-6 text-cyan-500/50 mb-2 sm:mb-3" />
                <div className="text-xl sm:text-2xl font-space-grotesk font-bold text-white mb-1">{stat.value}</div>
                <div className="text-[9px] sm:text-[10px] font-space-grotesk text-white/40 tracking-widest uppercase">{stat.label}</div>
              </motion.div>
            )})}
          </div>
        </section>

        {/* ACHIEVEMENTS BOARD */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-space-grotesk font-bold uppercase tracking-tighter text-white flex items-center gap-4">
                <Trophy className="w-8 h-8 md:w-10 md:h-10 text-yellow-500" />
                Unlocked Achievements
              </h2>
            </div>
            <div className="text-xs font-space-grotesk text-cyan-400 tracking-[0.2em] uppercase mt-4 md:mt-0 px-4 py-1 border border-cyan-500/30 rounded-full bg-cyan-500/10">
              {skills.length} Skills Mastered
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex flex-col items-center text-center p-6 rounded-xl border border-white/10 bg-black/40 hover:bg-white/5 hover:border-cyan-500/50 transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-cyan-400 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all mb-4">
                  <span className="text-xl font-black font-space-grotesk opacity-50 group-hover:opacity-100">{index + 1}</span>
                </div>
                <h4 className="font-bold font-inter tracking-wide text-white/90 group-hover:text-white">{skill}</h4>
                <p className="text-[9px] font-space-grotesk uppercase tracking-widest text-cyan-400/50 group-hover:text-cyan-400 mt-2">
                  Unlocked
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MISSION LOGS (Projects Vertical Grid) */}
        <section id="projects" className="bg-black/40 border-y border-white/5 py-24">
          <div className="px-6 max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold uppercase tracking-tighter text-white flex items-center gap-4">
                <Target className="w-10 h-10 text-fuchsia-500" />
                Project Portfolio
              </h2>
              <p className="text-white/40 mt-3 text-sm font-space-grotesk tracking-widest uppercase">Deployed Projects & Case Studies</p>
            </div>
            
            {/* Search Input */}
            <div className="relative w-full md:w-80 lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-cyan-500" />
              </div>
              <input
                type="text"
                placeholder="Search tech stack, title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 border border-white/10 text-white rounded-lg pl-12 pr-4 py-3.5 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all font-space-grotesk tracking-wide placeholder:text-white/30"
              />
            </div>
          </div>

          <div className="px-6 max-w-7xl mx-auto">
            {/* 2-Column Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {projects.filter(project => {
                const query = searchQuery.toLowerCase();
                return (
                  project.title.toLowerCase().includes(query) ||
                  project.description.toLowerCase().includes(query) ||
                  project.tech.some((t: string) => t.toLowerCase().includes(query))
                );
              }).map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onImageClick={setLightboxImg} onProjectClick={handleOpenProject} demoText={uiTexts.projectDemoButton} />
              ))}
            </div>
            
            {projects.filter(project => {
              const query = searchQuery.toLowerCase();
              return (
                project.title.toLowerCase().includes(query) ||
                project.description.toLowerCase().includes(query) ||
                project.tech.some((t: string) => t.toLowerCase().includes(query))
              );
            }).length === 0 && (
              <div className="w-full py-20 text-center flex flex-col items-center justify-center">
                <Search className="w-12 h-12 text-white/20 mb-4" />
                <p className="text-white/50 font-space-grotesk tracking-widest uppercase">No projects found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-10 text-center text-white/20 text-xs font-space-grotesk uppercase tracking-[0.3em] border-t border-white/5">
        <p>TERMINAL ID: {new Date().getFullYear()} © {personalInfo.name} // CONNECTION CLOSED</p>
      </footer>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightboxImg(null)}
          >
            <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center">
              <Image 
                src={lightboxImg} 
                alt="Enlarged Project View" 
                fill
                className="object-contain rounded-xl shadow-2xl"
              />
            </div>
            <button 
              className="absolute top-6 right-6 text-white bg-black/50 border border-white/10 p-3 rounded-full hover:bg-white/20 hover:scale-110 transition-all z-[101]"
              onClick={(e) => { e.stopPropagation(); setLightboxImg(null); }}
            >
               <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] bg-[#08080c] border border-white/10 rounded-2xl overflow-y-auto hide-scrollbar shadow-[0_0_50px_rgba(0,255,255,0.1)] flex flex-col"
            >
              {/* Close button */}
              <button 
                className="absolute top-4 right-4 text-white/50 bg-black/50 border border-white/10 p-2 rounded-full hover:bg-white/10 hover:text-white transition-all z-30"
                onClick={() => setSelectedProject(null)}
              >
                 <X className="w-5 h-5" />
              </button>
              
              {/* Cover Image Slider */}
              <div className="w-full h-[250px] sm:h-[350px] relative shrink-0 overflow-hidden group/modalslider">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={modalImgIndex}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image 
                      src={selectedProject.images[modalImgIndex]} 
                      fill 
                      className="object-cover opacity-50" 
                      alt={`${selectedProject.title} Image ${modalImgIndex + 1}`} 
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Slider Controls */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setModalImgIndex((p) => (p - 1 + selectedProject.images.length) % selectedProject.images.length); }} 
                      className="absolute left-4 top-[40%] -translate-y-1/2 p-2 bg-black/60 border border-white/10 rounded-full text-white/50 hover:text-cyan-400 hover:border-cyan-400 z-30 opacity-0 group-hover/modalslider:opacity-100 transition-all hover:scale-110 active:scale-95"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setModalImgIndex((p) => (p + 1) % selectedProject.images.length); }} 
                      className="absolute right-4 top-[40%] -translate-y-1/2 p-2 bg-black/60 border border-white/10 rounded-full text-white/50 hover:text-cyan-400 hover:border-cyan-400 z-30 opacity-0 group-hover/modalslider:opacity-100 transition-all hover:scale-110 active:scale-95"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    {/* Dots */}
                    <div className="absolute bottom-[90px] left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                      {selectedProject.images.map((_: string, i: number) => (
                        <div 
                          key={i} 
                          className={`h-1.5 rounded-full transition-all duration-300 ${i === modalImgIndex ? 'w-4 bg-cyan-400' : 'w-1.5 bg-white/30'}`} 
                        />
                      ))}
                    </div>
                  </>
                )}

                 <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-[#08080c]/50 to-transparent pointer-events-none" />
              </div>
              
              {/* Content */}
              <div className="p-6 md:p-10 -mt-20 relative z-20 flex-grow">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-[10px] font-space-grotesk tracking-widest uppercase mb-4">
                    MISSION_DETAILS
                 </div>
                 
                 <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold uppercase tracking-tight text-white mb-6 leading-tight">
                    {selectedProject.title}
                 </h2>
                 
                 <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tech.map((tech: string, i: number) => (
                    <span key={i} className="text-[10px] font-space-grotesk uppercase tracking-widest px-3 py-1.5 bg-white/5 border border-white/10 text-white/80 rounded">
                      {tech}
                    </span>
                  ))}
                 </div>
                 
                 <div className="prose prose-invert max-w-none mb-10">
                    <p className="text-white/80 leading-relaxed font-inter text-sm md:text-base whitespace-pre-line">
                      {selectedProject.description}
                    </p>
                 </div>
                 
                 {selectedProject.links ? (
                   <div className="flex flex-col sm:flex-row gap-4 mt-10">
                     {selectedProject.links.map((lnk: any, i: number) => {
                       const Icon = lnk.type === 'backend' ? Database : (lnk.type === 'frontend' ? Smartphone : GithubIcon);
                       return (
                         <a 
                          key={i}
                          href={lnk.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex-1 sm:flex-none inline-flex px-6 py-3.5 rounded bg-cyan-500 hover:bg-cyan-400 text-[#08080c] font-space-grotesk text-xs sm:text-sm font-bold uppercase tracking-widest items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]"
                        >
                          <Icon className="w-5 h-5" /> {lnk.label}
                        </a>
                       );
                     })}
                   </div>
                 ) : (
                   <a 
                    href={selectedProject.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex px-8 py-3.5 rounded bg-cyan-500 hover:bg-cyan-400 text-[#08080c] font-space-grotesk text-sm font-bold uppercase tracking-widest items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]"
                  >
                    <GithubIcon className="w-5 h-5" /> {uiTexts.projectDemoButton}
                  </a>
                 )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Footer / Arcade Section */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20 border-t border-white/10 mt-10 flex flex-col items-center justify-center text-center relative z-20">
        <h3 className="text-2xl font-space-grotesk font-bold text-white mb-4 uppercase tracking-widest">System Override Ready</h3>
        <p className="text-white/50 font-inter max-w-md mb-8">Grab a friend and duel in a 1v1 Turn-Based RPG right on your screen. May the best coder win.</p>
        <button 
          onClick={() => setIsGameOpen(true)}
          className="group flex items-center justify-center gap-3 px-8 py-3.5 bg-[#08080c] border border-cyan-500/50 text-cyan-400 font-space-grotesk font-bold uppercase tracking-widest transition-all rounded hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] hover:-translate-y-1"
        >
          <Gamepad2 className="w-5 h-5" /> Launch Arcade
        </button>
      </footer>

      {/* Game Modal */}
      <AnimatePresence>
        {isGameOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsGameOpen(false)}
          >
            <CyberRPG onClose={() => setIsGameOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
