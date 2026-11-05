# Glisse sur verre

- Donner au défilement une inertie douce, avec des changements de direction progressifs et un arrêt naturel.
- Faire apparaître les textes et les éléments avec un mouvement léger, plus ample et sans flou.
- Conserver les images fixes, la navigation tactile naturelle et le respect du réglage « réduire les animations ».
- Vérifier la descente, la remontée et les liens du menu sur ordinateur et téléphone.

## Détails techniques
Régler Lenis pour une interpolation continue plutôt qu’une durée fixe, et centraliser les courbes et durées des apparitions dans les variables CSS existantes. Éviter les lectures de mise en page à chaque image et les effets coûteux.