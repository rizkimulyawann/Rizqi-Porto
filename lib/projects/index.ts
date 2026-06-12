import { sistemPengaduanProject } from "./sistem-pengaduan";
import { edusafeProject } from "./edusafe";
import { legislatorMonitoringProject } from "./perindo";
import { liberkinProject } from "./liberkin";
import { rekomendasiUkm } from "./rekomendasi-ukm";

// Export all projects as an array to be consumed by the UI
export const projects = [
  sistemPengaduanProject,
  edusafeProject,
  legislatorMonitoringProject,
  liberkinProject,
  rekomendasiUkm,
];
