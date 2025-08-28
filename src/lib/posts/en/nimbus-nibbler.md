---
title: Generating procedural islands
description: How the game Nimbus Nibbler uses different procedural generation algorithms to create an organic world.
date: '2025-08-01'
thumbnail: '/images/thumbnails/Islands.webp'
type: project
tags:
  - unity
  - 3d
  - génération
published: true
---

<script>
	import AStarIslandsSlides from "../../components/blog/widgets/proceduralIslands/AStarIslandsSlides.svelte"
	import ImageLine from "../../components/blog/layout/ImageLine.svelte"
	import IslandPlacementSlides from "../../components/blog/widgets/proceduralIslands/IslandPlacementSlides.svelte"
	import IslandSlides from "../../components/blog/widgets/proceduralIslands/IslandSlides.svelte"
	import KeptIslandsNoOffsets from "../../components/blog/widgets/proceduralIslands/slides/KeptIslandsNoOffsets.svelte"
	import VoronoiSlider from "../../components/blog/widgets/proceduralIslands/VoronoiSlider.svelte"
  import IslandSlotAnim from "../../components/blog/widgets/proceduralIslands/IslandSlotAnim.svelte"


  const noiseLine = [ '/images/blog/ProceduralIslands/PerlinNoise.webp', '/images/blog/ProceduralIslands/BlueNoise.webp', "/images/blog/ProceduralIslands/VoronoiNoise.webp" ];

  const islandsGroupsLine = [ '/images/blog/ProceduralIslands/SmallIslandsFormation.webp', '/images/blog/ProceduralIslands/BigIslandsFormation.webp' ]; 
  
  const imageTilingSlide = [ '/images/blog/ProceduralIslands/RepeatingTexture.webp', '/images/blog/ProceduralIslands/UnRepeatingTexture.webp' ]; 


</script>

# Introduction

Bonjour bonjour. Aujourd'hui, nous allons parler de la génération procédurale, plus particulièrement des îles volantes. Il s'agit d'un problème ayant un très grand nombre de solutions qui ont toutes leurs avantages et leurs inconvénients. J'aimerais aborder celle que j'ai utilisée pour la création du jeu **Nimbus Nibbler**.

Pas d'inquiétude, bien que le système se base sur des méthodes classiques, vous trouverez surement quelque chose d'utile ici. Mon objectif était de créer un système facile à contrôler, utilisant des algorithmes simples et ayant un rendu organique.

![Image des îles volantes dans Nimbus Nibbler](/images/blog/ProceduralIslands/FlyingIslands.webp)

## Comment ça marche ?

Eh bien, dans les grandes lignes, le système fait apparaitre diverses îles volantes sur une grille, puis fait apparaitre des ponts suspendus pour les relier. Jusque-là, rien de bien spécial, on retrouve un grand nombre de générateurs qui font ça, particulièrement dans les _rogue-like_.

### La méthode classique

Ces systèmes fonctionnent en général en deux grandes étapes :

1. Placer des cellules sur la grille de manière aléatoire
2. Générer les chemins qui les relient à l'aide d'un algorithme comme _A\*_

Voilà à quoi cela peux ressembler :

<AStarIslandsSlides/>

Cependant, ces systèmes ont une mise en place complexe :

- Avoir le contrôle sur la génération demande des outils et/ou des algorithmes avancés.
- Créer une distribution organique et non répétitive peut s'avérer compliqué.
- L'effet de grille est souvent très visible.
- La génération des chemins nécessite des algorithmes de _path finding_ comme _A\*_
- Empêcher les chemins de se chevaucher demande une attention particulière.

### La méthode simplifiée

Dans le cadre d'un petit projet, plutôt que de partir sur un système complexe qui sollicite beaucoup de travail pour enlever des _edge cases_. Est-ce qu'on pourrait passer outre certaines problématiques entièrement en utilisant un système beaucoup plus simple ?

Eh bien oui !

Si on considère que chaque île ne peut être connectée à une île adjacente, on réduit grandement les problématiques liées à la génération des chemins. On peut garantir de ne pas avoir d'iles avec des ponts qui se chevauchent. On ne risque pas d'avoir des ponts trop longs pour le _gameplay_. On peut réduire la taille de la grille et augmenter la densité des îles pour réduire le nombre de cases et donc le nombre de calculs et leurs complexités.

### L'approche des textures procédurales

Je me suis inspiré des méthodes utilisées pour créer des textures procédurales, utiliser du _bruit_ et des filtres. C'est également comme ça qu'on génère les terrains via des outils comme _World Builder_ ou _Gaia_ et même directement dans les jeux comme _Minecraft_.

J'ai donc considéré la grille de génération comme une image 2D contenant des pixels d'une valeur de `0.0` à `1.0` et dans laquelle j'ai appliqué des modifications pour définir l'apparition des îles. Cela m'a permis de prototyper le générateur visuellement dans un éditeur d'images _Affinity Photo_.

J'avais déjà une idée assez précise des spécifications que je voulais pour le générateur :

1. Avoir des îles dont l'apparition semble organique.
2. Avoir une plus grande densité d'îles au centre de l'aire de jeu.
3. Ne pas avoir de blocs très denses d'îles (par exemple `2x2`) toutes connectées.
4. Avoir toujours une île au centre de la grille pour _spawner_ le _player controller_.
5. Avoir un nombre d'îles orphelines assez réduit\*.

Et comme par hasard, cette hiérarchie de besoins s'adapte facilement en une suite de _layers_ dans une image et donc par extension d'étapes de générations.

#### Apparition organique

Le générateur commence par créer une grille/image de taille voulue et applique un filtre de _bruit_ dessus. Pour cela, j'ai créé un petit utilitaire qui utilise la librairie mathématique d'_Unity_ pour échantillonner du _bruit de perlin_, du _bruit bleu_ ou du _bruit cellulaire_. Le choix du type de _bruit_ est donné à l'utilisateur pour expérimenter.

<ImageLine alt="Textures de bruit : perlin noise, blue noise, celular noise" images={noiseLine}/>

Voici ce que cela donne dans le jeu.

<IslandSlides rangeMin={1} rangeMax={2}/>

À la fin de la génération, les cases ayant une valeur de plus de `0.5` feront apparaitre des îles.

#### Densité variable

Pour avoir une densité d'îles supérieures au centre de la grille. Je crée un gradient circulaire centré sur la grille qui est à une valeur de `1.0` au centre et une valeur de `0.0` à l'extérieur. Il suffit ensuite de multiplier le bruit par le gradient pour avoir une densité plus forte au centre du niveau.

<IslandSlides rangeMin={2} rangeMax={4}/>

En interne, le gradient est généré en utilisant une fonction de distribution gaussienne. On peut contrôler sa taille et si elle est douce ou abrupte pour contrôler la densité des îles.

#### Pas de zones trop denses

Le centre de la grille a une grande chance de faire apparaitre des îles. Pour éviter d'avoir des zones pleines, j'ai utilisé un masque qui fait des "trous" dans la grille. Le masque en lui-même est une forme hexagonale qui permet de réduire l'effet de grille en plus de régler les problèmes de densité.

<IslandSlides rangeMin={4} rangeMax={6}/>

#### Île au centre

`image[centre][centre] = 1.0f;` 👀

_Bon, pas grand chose à dire là dessus..._

#### Seuil d'apparition des îles

Maintenant que la _texture_ d'apparition des îles a été créée et filtrée, il ne reste plus qu'à effectuer un seuillage. Toutes les cellules ayant une valeur supérieure ou égale à `0.5` vont faire apparaitre une île volante.

<IslandSlides rangeMin={7} rangeMax={9}/>

#### Réduire le nombre d'îles orphelines

Avec la méthode actuelle et la taille des grilles en jeu, je n'ai pas eux, de problème d'un grand nombre d'îles orphelines (qui ne sont pas raccordées au centre). J'ai testé avec des grilles très larges et dans ces situation le problème arrive plus souvent.

Dans le cas où j'aurais eu besoin d'utiliser des grilles très larges. J'aurais eu plusieurs approches possibles pour régler ce problème, par exemple :

- Garder uniquement le groupement d'îles central à l'aide d'un algorithme de type _flood fill_
- Forcer l'apparition de nouvelles îles dans les zones vides qui peuvent reconnecter plusieurs groupes d'îles.
- Forcer la génération de ponts entre deux groupes d'îles.

# Génération et placement de chaque île

C'est bon, le système a choisi quelles cases de la grille va faire apparaitre des îles. Il reste maintenant à gérer l'apparition de ces îles.

Les _spawners_ de groupes d'îles ont une liste pondérée des types d'îles à faire apparaitre et tire au sort le type pour chaque case de la grille.

## Îles semi-procédurales

Pour ajouter de la variété dans la génération, chaque île contient elle-même des _spawners_ de décorations. Chaque _spawner_ à une liste pondérée de _prefabs_ qu'il peut faire apparaitre

Ici, un _spawner_ contient trois décorations différentes. En appuyant sur le bouton, vous pouvez lancer et relancer un processus de génération.
<IslandSlotAnim/>

Chaque décoration peut contenir d'autres spawners. Par exemple une colone peut faire apparaitre un toit, un toit peut faire apparaitre une tour, une tour peut faire apparaitre une hélice.
Quand un _spawner_ fait apparaitre une décoration il vas vérifier si elle contient d'autres _spawners_ et les activer. Le système continue jusqu'à ce que touts les _spawners_ aient été activés.

==widget slider avec un spawn récursif==

Ce système permet d'obtenir un grand nombre de variations par type d'îles tout en gardant un nombre limité de décorations de bases.

## Déplacement des îles dans leurs cellules

Maintenant que l'on a un grand nombre d'îles différentes, la problématique de répétition est presque réglée. Néanmoins, il reste le problème du placement des îles. Comme chaque île est placée sur les cases d'une grille carrée, il est très simple de voir cette structure.

<IslandSlides rangeMin={9} rangeMax={9}/>

On retrouve cette problématique dans la création de textures répétitives. Le cerveau humain est très bon pour discerner les _patterns_ répétitif, si on applique une texture en boucle, il est très facile de repérer la répétition.
Et on peut utiliser une des solutions qui marche pour les textures : ajouter un décalage à chaque répétition.

<ImageLine alt="Une image est répétée simplement et une avec de la variation de rotation dans chaque répétition" images={imageTilingSlide}/>

Dans notre cas, en déplacent chaque île dans sa case de grille ainsi que verticalement, on peut faire disparaitre presque complètement la structure de la grille.

<IslandSlides rangeMin={9} rangeMax={11}/>

Voilà ce que cela donne en jeu :

<ImageLine alt="Deux groupements d'îles générés de tailles différentes" images={islandsGroupsLine}/>

### Algorithme

En regardant cette technique de plus près, on peut se rendre compte qu'elle ressemble beaucoup à un algorithme utilisé pour créer des textures de bruit. Le _bruit cellulaire_ ou _voronoi noise_. Cet algorithme choisit des points aléatoirement placés dans chaque cellule d'une grille et calcule pour chaque pixel la distance au point le plus proche.

<VoronoiSlider/>

Oui on peut faire de cellules de voronoi nativement en _HTML_ et _CSS_. C'est fou ce qu'on peut faire avec des gradients et des _blend modes_.

# Génération des ponts

On à maintenant plusieurs îles qui apparaissent dans le vide, il ne reste plus qu'à les connecter entre elles !
La première étape est de choisir quels ponts vont apparaitre.

## Choix des ponts

Pour avoir un nombre de ponts correct par île, j'ai mis en place un choix en deux étapes :

1. En premier, chaque île vérifie si elle est voisine à une autre île dans les directions cardinales
2. Si ce n'est pas le cas, elle vérifie si elle est voisine d'autres îles dans les diagonales.
   Cela permet d'avoir un nombre de ponts pas trop élevé tout en réduisant grandement le nombre d'îles orphelines.

![Les deux étapes de vérification des îles voisines](/images/blog/ProceduralIslands/IslandsChose.svg)

À noter qu'en réalité, les îles ne sont responsables de leur connections que pour la moitié des directions, par exemple, **Nord**, **Nord-Est**, **Est** et **Sud-Est**. Et cela, pour la détection d'îles et pour la génération des ponts. Les connexions dans les autres directions sont gérées par les îles voisines.

![Exemple de gestion des connections dans un groupe d'îles, les flêches foncées font spawner un pont](/images/blog/ProceduralIslands/IslandsConnections.svg)

## Génération des ponts

### Système de points de connexions

Chaque île contient 8 points de connexions possibles prédéfinie. Ces points de connexion sont un _prefab_ qui a deux modes :

- Mode barrière : Il fait apparaitre un obstacle pour ne pas tomber de l'île comme une barrière ou un mur.
- Mode connexion : Il fait apparaitre un point de passage pour le pont qui peut être orienté dans la direction du point de connexion de l'autre île.

==schéma cool==

### Génération de chemins

Pour la génération des ponts suspendus, j'ai utilisé le _package Splines_ d'_Unity_. Il permet de générer des courbes _2D_ ou _3D_ dans l'espace d'une scène et de faire apparaitre des objets le long de ces courbes.

Pour garder la génération des ponts la plus simple, j'ai effectué la majorité des calculs de courbe en _2D_. Je projette d'abord les points de connexion des ponts sur un plan _2D_. Je génère ensuite une _courbe 2D_ qui ressemble à un pont suspendu. Puis j'oriente cette courbe dans la direction de l'autre île.
Enfin, il faut faire apparaitre des modules de ponts le long de la courbe, ce qui est géré directement par le _package_.

# Résultats

Voici un dernier widget pour faire le topo des étapes de création des îles.

<IslandSlides/>

Ce projet de génération procédural était pour moi un bon moyen d'expérimenter avec différentes méthodes d'effectuer de la génération procédurale. L'objectif était de réaliser rapidement un générateur d'îles volantes en utilisant des méthodes inspirées de la génération de textures.

Si jouer au jeu vous intéresse, vous pouvez retrouver **Nimbus Nibler** sur itch.io

Merci d'avoir lu jusqu'ici, j'espère que cet article a été intéressant à lire, s'il vous à plus n'hésitez pas à le partager ou me le faire savoir ce que vous en pensez !
