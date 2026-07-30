-- Ajoute les 6 nouveaux domaines (services courant fort / courant faible)
-- à l'enum ProjectDomaine. Ajout pur (aucune valeur existante renommée ou
-- supprimée), donc un simple ALTER TYPE ... ADD VALUE suffit ici.

ALTER TYPE "ProjectDomaine" ADD VALUE 'INSTALLATION_ELECTRIQUE';
ALTER TYPE "ProjectDomaine" ADD VALUE 'SOLAIRE';
ALTER TYPE "ProjectDomaine" ADD VALUE 'CONTROLE_ACCES';
ALTER TYPE "ProjectDomaine" ADD VALUE 'SONORISATION';
ALTER TYPE "ProjectDomaine" ADD VALUE 'DOMOTIQUE';
ALTER TYPE "ProjectDomaine" ADD VALUE 'SYSTEME_INTELLIGENT';
