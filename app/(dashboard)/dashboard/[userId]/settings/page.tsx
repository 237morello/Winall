"use client"

import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Settings } from "lucide-react"
import { SETTINGS_DATA } from "../_components/model/mock-data"

export default function SettingsPage() {
  const [settings, setSettings] = useState(SETTINGS_DATA)

  function toggleSetting(settingId: string, enabled: boolean) {
    // Contexte sensible: update immutable pour ne pas muter l'etat precedent.
    // Cette approche evite des comportements UI non deterministes avec React.
    setSettings((current) =>
      current.map((item) => (item.id === settingId ? { ...item, enabled } : item)),
    )
  }

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Paramètres</h1>
        <p className="text-muted-foreground">Configuration de votre compte</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Préférences
          </CardTitle>
          <CardDescription>
            Gérez vos paramètres
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {settings.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-4 border-b border-border/50 pb-4 last:border-b-0">
              <div className="space-y-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <Switch
                checked={item.enabled}
                onCheckedChange={(checked) => toggleSetting(item.id, checked)}
                aria-label={`Activer ${item.title}`}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
