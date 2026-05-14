/**
 * MISSION : Composant Dashboard — SettingsList gère les préférences utilisateur.
 */
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon } from "lucide-react";
import type { DashboardSetting } from "@/types/dashboard.types";

interface SettingsListProps {
  initialSettings: DashboardSetting[];
}

export function SettingsList({ initialSettings }: SettingsListProps) {
  const [settings, setSettings] = useState(initialSettings);

  function toggleSetting(settingId: string, enabled: boolean) {
    setSettings((current) =>
      current.map((item) => (item.id === settingId ? { ...item, enabled } : item))
    );
    // Ici on appellerait une Server Action pour sauvegarder en DB
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
      <CardHeader className="border-b border-border/20 py-6">
        <CardTitle className="flex items-center gap-3 text-xl font-bold">
          <SettingsIcon className="h-6 w-6 text-p" />
          Préférences du compte
        </CardTitle>
        <CardDescription>
          Gérez vos notifications et la sécurité de votre espace Winall Tech.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/20">
          {settings.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center justify-between gap-6 p-6 transition-colors hover:bg-p/5"
            >
              <div className="space-y-1">
                <p className="text-sm font-bold text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
                  {item.description}
                </p>
              </div>
              <Switch
                checked={item.enabled}
                onCheckedChange={(checked) => toggleSetting(item.id, checked)}
                className="data-[state=checked]:bg-p"
                aria-label={`Activer ${item.title}`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
