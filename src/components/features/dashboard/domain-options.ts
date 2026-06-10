import {
  Cctv,
  HardHat,
  Lock,
  Network,
  Radio,
  Server,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

export const PROJECT_DOMAIN_OPTIONS = [
  {
    value: "BTP",
    label: "BTP",
    description: "Infrastructures et genie civil",
    icon: HardHat,
    iconClassName: "text-amber-500 bg-amber-500/10",
  },
  {
    value: "RESEAU",
    label: "Reseau",
    description: "Fibre, Wi-Fi pro et telecoms",
    icon: Network,
    iconClassName: "text-emerald-500 bg-emerald-500/10",
  },
  {
    value: "VIDEOSURVEILLANCE",
    label: "Videosurveillance",
    description: "Cameras IP et supervision",
    icon: Cctv,
    iconClassName: "text-blue-500 bg-blue-500/10",
  },
  {
    value: "CONTROLE_ACCES",
    label: "Controle d'acces",
    description: "Biometrie, badges et securite",
    icon: Lock,
    iconClassName: "text-cyan-500 bg-cyan-500/10",
  },
  {
    value: "SECURITE_INCENDIE",
    label: "Securite incendie",
    description: "Detection et alarme incendie",
    icon: ShieldAlert,
    iconClassName: "text-red-500 bg-red-500/10",
  },
  {
    value: "TELEPHONIE_IP",
    label: "Telephonie IP",
    description: "Standard PABX/IP et communications",
    icon: Radio,
    iconClassName: "text-indigo-500 bg-indigo-500/10",
  },
  {
    value: "IT",
    label: "IT",
    description: "Maintenance et solutions informatiques",
    icon: Server,
    iconClassName: "text-slate-500 bg-slate-500/10",
  },
] as const satisfies ReadonlyArray<{
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
}>;

export type ProjectDomainValue = (typeof PROJECT_DOMAIN_OPTIONS)[number]["value"];

export function isProjectDomainValue(value: unknown): value is ProjectDomainValue {
  return PROJECT_DOMAIN_OPTIONS.some((domain) => domain.value === value);
}

export function getProjectDomainLabel(value?: string | null) {
  return PROJECT_DOMAIN_OPTIONS.find((domain) => domain.value === value)?.label ?? null;
}
