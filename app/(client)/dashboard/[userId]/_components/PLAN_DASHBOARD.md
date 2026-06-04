# Plan d'action Dashboard

## Objectif
Rendre le dashboard stable, cohérent sur toutes les routes, puis avancer vers des pages métier réellement exploitables.

## 1) Correctifs bloquants (immédiat)
- [x] Corriger l'import manquant de `cn` dans `app/(main)/dashboard/page.tsx`.
- [x] Corriger la hauteur loader (`h-[calc(100vh-4rem)]`) dans `app/(main)/dashboard/page.tsx`.
- [x] Aligner les breadcrumbs sur la route réelle `project` (et non `projects`).
- [x] Étendre les mappings breadcrumbs pour `clients`, `quotes`, `invoices`.
- [x] Vérifier l'import `Typography` dans `chat/page.tsx` et `project/page.tsx`.

## 2) Cohérence de navigation
- [ ] Vérifier la navigation sidebar sur toutes les routes `dashboard/*`.
- [ ] Vérifier l'état actif (highlight) pour chaque item.
- [ ] Vérifier le comportement mobile vs desktop (sidebar collapsed/drawer).

## 3) Finalisation des pages métier
- [ ] `clients`: liste + recherche + filtres + pagination.
- [ ] `quotes`: statuts devis + actions rapides.
- [ ] `invoices`: suivi des factures + échéances + état de paiement.
- [ ] `notifications`: tri + marquage lu/non lu.
- [ ] `settings`: sections profil, sécurité, préférences.
- [ ] `chat` et `project`: homogénéiser le style avec les autres pages.

## 4) Qualité et validation
- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] Corriger les éventuelles erreurs TypeScript.
- [ ] Vérifier visuellement le dashboard (desktop/mobile).

## Priorité recommandée
1. Stabilité technique
2. Cohérence UX/navigation
3. Implémentation métier progressive par page
