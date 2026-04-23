# Plan de Construction du Dashboard - Winall

## 📋 Objectif
Construire un dashboard minimaliste et performant avec une sidebar simplifiée (icônes + tooltips uniquement).

---

## 🏗️ Architecture Cible

### Sidebar Simplifiée
- **État collecté** : Icônes uniquement pour économiser l'espace
- **Tooltips** : Affichées au survol avec description, label et raccourci clavier
- **Responsive** : Mode mobile avec menu accordéon
- **Accessibilité** : Aria labels et navigation au clavier

### Layout Hiérarchique
```
Sidebar (Collapsed)
  ├── Header Logo (Icône + tooltip au survol)
  ├── Navigation Items (Icons + Rich Tooltip)
  └── Footer Profile (Avatar + Menu)

Main Content
  ├── TopBar (Navigation, Search, Alerts)
  ├── Breadcrumbs
  └── Page Content
```

---

## 🎯 Composants à Implémenter/Modifier

### 1. **AppSidebar** (`app-sidebar.tsx`)
- ✅ Déjà en place : structure générale bonne
- 🔄 À optimiser :
  - Forcer toujours l'état "collapsed" sauf sur mobile
  - Simplifier le header logo
  - Réduire les espacements

### 2. **Sidebar Items** (`sidebar-items.ts`)
- ✅ Items actuels : OK (8 items)
- Structure correcte avec icon, label, description, shortcut

### 3. **Rich Tooltip** (`rich-tooltip.tsx`)
- ✅ Composant en place
- À vérifier : affichage sur collapsed uniquement

### 4. **Dashboard Navbar** (`dashboard-navbar.tsx`)
- ✅ Implémentation actuelle : complète
- À vérifier : alignement + responsive

### 5. **Dashboard Layout** (`layout.tsx`)
- ✅ Structure correcte
- TooltipProvider déjà en place

---

## 📊 Pages du Dashboard à Créer

| Route | Page | État |
|-------|------|------|
| `/dashboard` | Tableau de bord (Overview) | ✅ Existe |
| `/dashboard/project` | Gestion des projets | ⚠️ À vérifier |
| `/dashboard/chat` | Messagerie | ⚠️ À vérifier |
| `/dashboard/clients` | Gestion clients | ❌ À créer |
| `/dashboard/quotes` | Devis | ❌ À créer |
| `/dashboard/invoices` | Factures | ❌ À créer |
| `/dashboard/notifications` | Notifications | ❌ À créer |
| `/dashboard/settings` | Paramètres | ❌ À créer |

---

## 🎨 Styles & Spacing

### Sidebar
- **Width collapsed** : 80px (4rem × 20)
- **Icon size** : 20px (size-5)
- **Gap between items** : 8px (gap-2)
- **Header height** : 80px (py-6)
- **Footer border** : subtle (border-border/40)

### Colors
- **Active state** : bg-primary/10 + text-primary
- **Hover state** : bg-muted/80 + text-foreground
- **Inactive** : text-muted-foreground

---

## 📱 Responsive Design

### Desktop (≥1024px)
- Sidebar collapsed par défaut
- Icons + tooltips
- Full navbar avec search

### Mobile (<768px)
- Sidebar drawer
- Full labels visibles
- Simplified navbar

---

## ✅ Checklist de Validation

- [ ] Sidebar toujours collapsed (sauf mobile)
- [ ] Tooltips affichées au survol
- [ ] Icons bien dimensionnées (size-5)
- [ ] Pas de text label en desktop collapsed
- [ ] Avatar + dropdown en footer
- [ ] Breadcrumbs dynamiques
- [ ] Search actif
- [ ] Notifications badge
- [ ] Animations fluides (duration-200, duration-300)
- [ ] Build sans erreurs
- [ ] aucun avertissement TypeScript

---

## 🚀 Étapes d'Implémentation

1. ✅ Vérifier `app-sidebar.tsx` : forcer collapsed
2. ✅ Vérifier `rich-tooltip.tsx` : config correcte
3. ✅ Vérifier `dashboard-navbar.tsx` : responsive OK
4. ✅ Vérifier `sidebar-items.ts` : data correctes
5. ✅ Validez le layout principal
6. 🔧 Créer les pages manquantes stubs
7. 🧪 Tester pnpm build
8. ✅ Vérifier absence d'erreurs

---

## 📝 Notes Importantes

- **Tooltips** : Affichées uniquement quand sidebar collapsed AND NOT mobile
- **Performance** : Utiliser React Query pour la data
- **Icons** : Lucide React
- **UI Components** : shadcn/ui (custom sidebar, tooltip)

---

**Créé le** : 15 Avril 2026
**Status** : Prêt pour implémentation
