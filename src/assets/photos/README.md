# Photographies

Toutes les images du site vivent ici.

Elles sont aujourd'hui de deux natures, et la distinction est visible depuis
`src/data/photo-credits.json` :

- **Les images d'emprunt**, récupérées par `npm run photos` depuis Wikimedia
  Commons et la bibliothèque libre Burst. Elles ont une ligne dans le fichier de
  crédits, et cette ligne les fait apparaître sur `/credits-photos` avec leur
  auteur et leur licence. Elles illustrent une ville ou un type de séance ; elles
  ne sont présentées nulle part comme notre travail.
- **Les nôtres**, déposées à la main. Elles n'ont pas de ligne de crédit, et
  c'est ainsi qu'on les reconnaît.

Remplacer une image d'emprunt : déposer la nôtre au même chemin, retirer sa
ligne de `src/data/photo-credits.json`, et retirer son entrée de
`scripts/photo-manifest.json` pour qu'une prochaine exécution ne la réécrive
pas.

Une galerie vide s'affiche toujours comme vide : aucune image de remplacement
n'est inventée à la volée.

## Convention

```
src/assets/photos/home/<nom>.jpg              # accueil : hero, mosaïque
src/assets/photos/villes/<ville>/01..03.jpg   # 01 sert de carte et d'ouverture
src/assets/photos/lieux/<region>--<lieu>.jpg
src/assets/photos/services/<prestation>.jpg
```

`01.jpg` d'une ville n'est pas un numéro d'ordre arbitraire : c'est la première
entrée de sa galerie, donc l'image de la carte sur l'accueil, le fond du hero de
la page, et la vignette partagée sur les réseaux. Les suivantes ne sont vues que
dans la galerie et sur les pages prestation × ville.

Puis, dans le frontmatter de la page :

```yaml
gallery:
  - src: villes/bordeaux/01.jpg
    alt: "Le miroir d'eau devant la façade de la place de la Bourse"
    caption: "Place de la Bourse"
```

Le `src` est relatif à ce dossier. Le fichier est optimisé à la compilation
(AVIF, `srcset`, `width`/`height` explicites) : déposez l'original, ne
redimensionnez rien à la main — `npm run photos` recadre et plafonne le grand
côté à 1600 px, ce qui est ce qui fait tenir chaque dérivée sous les 250 Ko que
`check:images` impose.

## Ce que le dépôt de photographies débloque

Le seuil « au moins six photographies » du profil d'indexation `full` est
aujourd'hui abaissé à zéro dans le profil `launch`, faute de production. Dès que
les galeries sont remplies :

```bash
INDEXING_PROFILE=full npm run report:gate   # ce qui manque encore, page par page
INDEXING_PROFILE=full npm run build
```

`alt` est obligatoire et doit décrire l'image, pas répéter le mot-clé de la page.
