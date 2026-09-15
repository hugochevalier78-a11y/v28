
VestiairePro v24.1 Reset
- Base reprise depuis la v24, sans les gros ajouts SaaS/Pro avancés.
- Landing page affichée dès l’ouverture, avant la connexion.
- Page de connexion séparée.
- Abonnements Starter 4,99€ et Pro 9,99€.
- Gérer/annuler l’abonnement via portail Stripe si configuré.
- Admin utilisateurs rechargé de façon plus robuste (plus de chargement infini côté front).
- Depuis les paramètres, “Gérer l’abonnement” et “Admin utilisateurs” s’ouvrent sans fermer manuellement les paramètres.

Variables Netlify :
- SUPABASE_URL
- SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- STRIPE_PAYMENT_LINK_STARTER
- STRIPE_PAYMENT_LINK_PRO
- STRIPE_CUSTOMER_PORTAL_LINK
- SUPPORT_EMAIL

VestiairePro v24.3
- Landing page gardée depuis la v24.2
- Ajout de l’offre Pro dans la section Offres

VestiairePro v24.4
- Boucle landing/reconnexion corrigée
- Bouton admin utilisateur en double supprimé
- Admin utilisateurs stabilisé (plus de chargement infini)
- Boutons depuis paramètres ouvrent directement admin et abonnement

VestiairePro v24.5
- Ajout du système CSV Vinted update
- Fusion intelligente sans doublons
- Dernier import affiché
- Bouton "Mettre à jour avec un nouveau CSV"
- Alerte si les données datent de plus de 7 jours

VestiairePro v25 Beta Pro
- Base v24.5 conservée
- Landing/page connexion masquées au démarrage
- Arrivée directe sur l’accueil
- Ajout outils Pro beta : graphes, courbes, Profit Center, scores annonces, opportunités, historique avancé
