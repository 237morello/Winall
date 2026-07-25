import type {
  ActivityItem,
  ExternalServiceStatus,
  StorageUsage,
  SystemInfoItem,
  TableCounts,
} from "@/lib/system-stats";

export interface SystemResourcesProps {
  dbSizeBytes: number;
  counts: TableCounts;
  storage: StorageUsage;
  systemInfo: SystemInfoItem[];
  services: ExternalServiceStatus[];
  activity: ActivityItem[];
}
