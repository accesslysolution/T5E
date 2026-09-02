import "server-only";
import fs from "node:fs";
import path from "node:path";

export type ComplianceDoc = {
  id: string;
  title: string;
  period: string;
  authority: string;
  status: string;
  statusColor: string;
  size: string;
  url: string;
  description: string;
};

/** Files we look for inside /public/<folder>/. Add more entries as needed. */
const DOC_MANIFEST = [
  {
    file: "compliance-report.pdf",
    id: "post-ec",
    title: "Post EC Compliance Report",
    period: "October 2025 – March 2026",
    authority: "MOEFCC / MPCB Maharashtra",
    status: "Verified & Active",
    statusColor: "#10B981",
    description:
      "Comprehensive bi-annual environmental clearance compliance audit detailing on-site air quality monitoring, noise abatement measures, and groundwater preservation indices.",
  },
  {
    file: "ec-letter.pdf",
    id: "ec-letter",
    title: "Environmental Clearance (EC) Letter",
    period: "Project Grant Letter",
    authority: "SEIAA Maharashtra",
    status: "Granted & Certified",
    statusColor: "#C9A84C",
    description:
      "Official statutory clearance granted by the State Level Environment Impact Assessment Authority (SEIAA) approving architectural blueprints and sustainable site infrastructure.",
  },
];

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Returns only the compliance PDFs that actually exist in /public/<folder>/.
 * Empty array = folder missing, or no PDFs in it. Never throws.
 */
export function getComplianceDocs(folder?: string | null): ComplianceDoc[] {
  if (!folder) return [];

  // Guard against path traversal from data entries
  const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, "");
  if (!safeFolder) return [];

  const dir = path.join(process.cwd(), "public", safeFolder);

  try {
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return [];
  } catch {
    return [];
  }

  const docs: ComplianceDoc[] = [];

  for (const entry of DOC_MANIFEST) {
    const filePath = path.join(dir, entry.file);
    try {
      const stat = fs.statSync(filePath);
      if (!stat.isFile() || stat.size === 0) continue;

      docs.push({
        id: `${safeFolder}-${entry.id}`,
        title: entry.title,
        period: entry.period,
        authority: entry.authority,
        status: entry.status,
        statusColor: entry.statusColor,
        size: formatBytes(stat.size),
        url: `/${safeFolder}/${entry.file}`,
        description: entry.description,
      });
    } catch {
      // File not present — skip silently
    }
  }

  return docs;
}