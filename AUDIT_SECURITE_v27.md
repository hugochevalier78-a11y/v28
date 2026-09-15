# Audit VestiairePro (v26 → patch v27) — 15 septembre 2026

Version auditée : `vestiairepro-v26-direct-app.zip` (celle qui correspond au site en ligne).

## 🔴 CRITIQUE — corrigé dans ce patch

**Faille : élévation de privilèges via l'API Supabase**

La policy RLS `"Modifier son profil" on profiles for update using (auth.uid() = id)` ne limitait que la ligne modifiable, pas les colonnes. N'importe quel utilisateur inscrit (même en essai gratuit) pouvait, en appelant directement l'API REST Supabase avec son propre jeton (sans même passer par ton site — un simple `curl` suffit), s'auto-attribuer :
- `status: "paid"` → accès payant gratuit, sans passer par Stripe
- `is_admin: true` → accès au panel admin, à la liste de tous les emails/statuts, et au blocage/déblocage des comptes

**Correctif appliqué :** `supabase_patch_v27_SECURITY_CRITIQUE.sql` — retire le droit `UPDATE` sur `profiles` pour le rôle `authenticated`. Vérifié que le front-end n'en a pas besoin (toutes les écritures passent déjà par tes fonctions Netlify avec la clé `service_role`).

**⚠️ Action requise de ta part : exécute ce script SQL dans Supabase > SQL Editor le plus vite possible.** C'est la seule étape que je ne peux pas faire à ta place.

## 🟠 IMPORTANT — à traiter

1. **Pas de webhook Stripe.** Aucune fonction ne reçoit les événements Stripe (`checkout.session.completed`). Aujourd'hui, un client qui paie ne passe en `status: paid` que si tu le fais manuellement dans l'admin. Ça ne tient pas à l'échelle et ça peut te faire perdre des clients (accès pas activé après paiement). Je peux te coder cette fonction si tu veux (nécessite ta clé secrète Stripe en variable d'env Netlify + le secret de signature du webhook).
2. **Aucune page légale.** Pas de mentions légales, CGU/CGV, ni politique de confidentialité (RGPD) — obligatoire dès lors que tu collectes des comptes utilisateurs et prends des paiements en France/UE. Je peux les rédiger dès que tu me donnes : statut (auto-entrepreneur/société), nom, SIRET, adresse, email de contact.

## 🟡 MOYEN — corrigé dans ce patch

- **En-têtes de sécurité absents** (`netlify.toml`) : ajout de CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`.
  ⚠️ Note : le CSP autorise `'unsafe-inline'` pour les scripts car toute la logique est dans un `<script>` inline géant dans `index.html`. Un durcissement complet (retirer `unsafe-inline`) demanderait de sortir le JS dans un fichier externe — je peux le faire si tu veux aller plus loin.
- **CORS grand ouvert (`Access-Control-Allow-Origin: *`)** sur les fonctions sensibles (`admin-users`, `update-user-status`, `check-access`) : restreint à `https://vestiaire.pro`. Si tu testes sur des URLs de preview Netlify (`deploy-preview-xxx--....netlify.app`), ajoute une variable d'env `ALLOWED_ORIGIN` dans Netlify avec cette URL le temps du test.
- **Librairie Supabase non figée** (`@supabase/supabase-js@2`, un tag flottant) : épinglée à la version exacte `2.116.0` pour éviter qu'une mise à jour amont ne casse ou ne compromette le site sans prévenir.

## ⚪ Signalé, non corrigé (mineur / nécessite ton avis)

- **Pas de SRI (Subresource Integrity)** sur les scripts chargés depuis jsdelivr. Je n'ai pas pu générer les empreintes ici (pas d'accès réseau dans cet environnement). Tu peux les générer via `https://www.srihash.org/` en collant l'URL de chaque script, ou je peux te montrer comment auto-héberger ces deux librairies dans ton repo (plus robuste que le CDN).
- **Beaucoup de code mort** : `renderAnnonces` et `renderVentes` sont redéfinis 3 fois chacune dans `index.html`. Sans conséquence fonctionnelle (seule la dernière définition s'exécute en JS), mais ça complique la maintenance et les futurs audits. À nettoyer quand tu auras du temps.
- **Pas de webhook/vérification de paiement automatisée** → cf. point Stripe ci-dessus.

## Fichiers modifiés dans ce zip
- `supabase_patch_v27_SECURITY_CRITIQUE.sql` (nouveau — à exécuter dans Supabase)
- `netlify.toml` (en-têtes de sécurité ajoutés)
- `netlify/functions/admin-users.js`, `update-user-status.js`, `check-access.js` (CORS restreint)
- `index.html` (version supabase-js épinglée)

## Prochaine étape que je te propose
Dis-moi si tu veux que je : (1) code le webhook Stripe, (2) rédige les pages légales (donne-moi tes infos), et/ou (3) nettoie le code mort.
