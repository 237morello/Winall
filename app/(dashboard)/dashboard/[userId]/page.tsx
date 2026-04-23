"use client";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { LucideIcon } from "lucide-react";
import {
    AlertCircle,
    ArrowRight,
    Briefcase,
    Calendar,
    CheckCircle2,
    Clock,
    FileText,
    MoreVertical,
    Plus,
    ShieldCheck,
    TrendingDown,
    TrendingUp,
    Zap
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltipContent
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

const chartData = [
  { month: "Jan", projects: 4, revenue: 4500 },
  { month: "Feb", projects: 7, revenue: 5200 },
  { month: "Mar", projects: 5, revenue: 4800 },
  { month: "Apr", projects: 12, revenue: 8900 },
  { month: "May", projects: 10, revenue: 7600 },
  { month: "Jun", projects: 15, revenue: 12000 },
];

const chartConfig = {
  revenue: {
    label: "Revenus (€)",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

type StatsCardColor = "blue" | "amber" | "emerald" | "red";
type ActivityStatus = "primary" | "emerald" | "blue" | "amber";
type ProjectPriority = "high" | "medium";
type TrendDirection = "up" | "down";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend: TrendDirection;
  trendValue: string;
  color: StatsCardColor;
}

interface ActivityItemProps {
  icon: LucideIcon;
  title: string;
  time: string;
  user: string;
  description: string;
  status: ActivityStatus;
}

interface ProjectRowProps {
  name: string;
  client: string;
  progress: number;
  status: string;
  date: string;
  priority: ProjectPriority;
}

import * as React from "react";

export default function DashboardPage({ 
  params 
}: { 
  params: Promise<{ userId: string }> 
}) {
  const { userId } = React.use(params);

  const { data: session, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: async () => authClient.getSession(),
  });

  console.log("Session dashboard pour utilisateur:", userId);

  const currentDate = new Date().toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground animate-pulse">Initialisation du dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pt-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Bonjour, {session?.data?.user?.name?.split(' ')[0] || "Expert"} 👋
          </h1>
          <p className="text-muted-foreground flex items-center gap-2 mt-1">
            <Calendar className="h-4 w-4" />
            {currentDate}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:flex border-border/60 hover:bg-muted/50">
            <FileText className="mr-2 h-4 w-4" />
            Exporter Rapport
          </Button>
          <Button className="shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau Projet
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Projets Actifs" 
          value="12" 
          description="+2 ce mois-ci" 
          icon={Briefcase} 
          trend="up"
          trendValue="12%"
          color="blue"
        />
        <StatsCard 
          title="Devis en Attente" 
          value="8" 
          description="4 nécessitent attention" 
          icon={Clock} 
          trend="up"
          trendValue="5%"
          color="amber"
        />
        <StatsCard 
          title="Installations Terminées" 
          value="142" 
          description="Total 2026" 
          icon={CheckCircle2} 
          trend="up"
          trendValue="24%"
          color="emerald"
        />
        <StatsCard 
          title="Alertes Maintenance" 
          value="2" 
          description="Interventions urgentes" 
          icon={AlertCircle} 
          trend="down"
          trendValue="3%"
          color="red"
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        
        {/* Analytics Chart */}
        <Card className="lg:col-span-4 border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Aperçu de la Croissance</CardTitle>
                <CardDescription>Évolution des revenus et projets sur 6 mois</CardDescription>
              </div>
              <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider bg-primary/5 text-primary border-primary/20">
                Direct Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--color-revenue)" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm border-t border-border/40 pt-4 mt-2">
            <div className="flex gap-2 font-medium leading-none">
              Croissance de 5.2% ce mois-ci <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="leading-none text-muted-foreground">
              Données basées sur les interventions de Winall Tech SARL.
            </div>
          </CardFooter>
        </Card>

        {/* Recent Activity / Tasks */}
        <Card className="lg:col-span-3 border-border/50 bg-card/30 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Flux d&apos;Activite</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-primary">Voir tout</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <ActivityItem 
                icon={Zap} 
                title="Nouvelle installation" 
                time="Il y a 2h" 
                user="Marc D." 
                description="Installation photovoltaïque - Villa Horizon"
                status="primary"
              />
              <ActivityItem 
                icon={FileText} 
                title="Devis approuvé" 
                time="Il y a 5h" 
                user="Julie L." 
                description="Réfection tableau électrique - Immeuble Central"
                status="emerald"
              />
              <ActivityItem 
                icon={ShieldCheck} 
                title="Maintenance effectuée" 
                time="Hier" 
                user="Kevin S." 
                description="Contrôle annuel sécurité incendie - Hôtel Azur"
                status="blue"
              />
              <ActivityItem 
                icon={AlertCircle} 
                title="Ticket support ouvert" 
                time="Hier" 
                user="Client #429" 
                description="Dysfonctionnement domotique"
                status="amber"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Overview Table-like Card */}
      <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-lg font-bold">Projets Prioritaires</CardTitle>
            <CardDescription>Suivi en temps reel de l&apos;avancement des chantiers.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-md px-2 py-0.5 text-[11px]">8 Actifs</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <ProjectRow 
              name="Résidence Les Pins" 
              client="Groupe Immobilier Sud" 
              progress={75} 
              status="En cours" 
              date="15 Mai 2026"
              priority="high"
            />
            <ProjectRow 
              name="Centre Commercial Espace" 
              client="Sogeprom" 
              progress={40} 
              status="Débuté" 
              date="22 Juin 2026"
              priority="medium"
            />
            <ProjectRow 
              name="Éclairage Public Ville de Lyon" 
              client="Mairie de Lyon" 
              progress={92} 
              status="Finalisation" 
              date="12 Avr 2026"
              priority="high"
            />
          </div>
        </CardContent>
        <CardFooter className="justify-center border-t border-border/40 py-3">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary transition-colors">
            Consulter tous les projets <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function StatsCard({ title, value, description, icon: Icon, trend, trendValue, color }: StatsCardProps) {
  const colorMap: Record<StatsCardColor, string> = {
    blue: "bg-blue-500/10 text-blue-600 border-blue-200/50",
    amber: "bg-amber-500/10 text-amber-600 border-amber-200/50",
    emerald: "bg-emerald-500/10 text-emerald-600 border-emerald-200/50",
    red: "bg-red-500/10 text-red-600 border-red-200/50",
  }

  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-sm transition-all hover:shadow-md hover:border-primary/20 group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn("p-2 rounded-xl transition-transform group-hover:scale-110", colorMap[color])}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 mt-1">
          <span className={cn(
            "text-[10px] font-bold flex items-center",
            trend === "up" ? "text-emerald-500" : "text-red-500"
          )}>
            {trend === "up" ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
            {trendValue}
          </span>
          <p className="text-[10px] text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function ActivityItem({ icon: Icon, title, time, user, description, status }: ActivityItemProps) {
  const statusColors: Record<ActivityStatus, string> = {
    primary: "bg-primary text-primary-foreground",
    emerald: "bg-emerald-500 text-white",
    blue: "bg-blue-500 text-white",
    amber: "bg-amber-500 text-white",
  }

  return (
    <div className="flex items-start gap-4 relative group">
      <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-sm z-10 transition-transform group-hover:scale-110", statusColors[status])}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex flex-col gap-0.5 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">{title}</p>
          <span className="text-[10px] text-muted-foreground font-medium">{time}</span>
        </div>
        <p className="text-[11px] text-muted-foreground/80 line-clamp-1">
          <span className="font-bold text-foreground/70">{user}</span> — {description}
        </p>
      </div>
      {/* Connector line for activity feed style */}
      <div className="absolute left-4 top-8 bottom-[-24px] w-[1px] bg-border/40 group-last:hidden" />
    </div>
  )
}

function ProjectRow({ name, client, progress, status, date, priority }: ProjectRowProps) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center justify-between group p-2 rounded-lg hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-3 min-w-[250px]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-bold leading-none">{name}</p>
          <p className="text-[11px] text-muted-foreground mt-1">{client}</p>
        </div>
      </div>
      
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{progress}% Terminée</span>
          <span className="text-[10px] text-muted-foreground">{date}</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex flex-col items-end min-w-[100px]">
          <Badge variant={priority === 'high' ? 'destructive' : 'secondary'} className="text-[10px] py-0 px-2 rounded-full font-bold">
            {priority.toUpperCase()}
          </Badge>
          <span className="text-[10px] text-muted-foreground mt-1">{status}</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
