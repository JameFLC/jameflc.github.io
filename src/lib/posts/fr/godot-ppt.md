---
title: Transformer le moteur Godot en un Powerpoint en 3D
description: Comment Godot a sauvé ma présentation en le transformant en outil de présentation 3D et comment animer n'importe quelle propriété d'une scène.
date: '2025-08-28'
thumbnail: '/images/thumbnails/PowerpointInGodot.webp'
type: project
tags:
  - godot
  - animation
  - tool
published: true
---

<script lang="ts">
import Link from "$lib/components/Link.svelte";
import Presentation3D from "$lib/components/blog/widgets/godotppt/Presentation3D.svelte";
import ImageLine from "../../components/blog/layout/ImageLine.svelte"

const codeAnimators = [ '/images/blog/GodotPPT/Manim.webp', '/images/blog/GodotPPT/ReactFlow.webp', '/images/blog/GodotPPT/MotionCanvas.webp'];
const noteMode = [ '/images/blog/GodotPPT/Reflexion.webp', '/images/blog/GodotPPT/ReflexionNotes.webp'];

</script>

Bonjour, bonjour. Aujourd'hui, je vais vous présenter un projet qui a consisté à ajouter les fonctionnalités de **PowerPoint** dans le moteur de jeu **Godot**. Transformant ainsi ce moteur de jeu en un outil de création de présentations _3D_ interactif.

![Exemple de diapositive comportant des éléments 2D (à gauche) et 3D (à droite)](/images/blog/GodotPPT/2D3DHybrid.webp)

# Mais pourquoi faire une chose pareille ?

Ce projet est fondamentalement relié à mon projet de fin d'année de deuxième année d'école d'ingénieur au **Cnam**. J'ai réalisé un _état de l'art_ sur un sujet que j'avais choisi : **Les techniques de rendu des aspects de la lumière dans le jeu vidéo 3D et leurs évolutions jusqu’à nos jours**. Le sujet est très vaste, très technique. Je me suis concentré sur 3 aspects majeurs du sujet pour mes recherches :

- La surface des objets et les matériaux
- Les ombres portées
- La lumière environnementale (illumination globale/ occlusion ambiante)

Le document que j'ai réalisé faisait une longueur de **177** pages (annexe comprise).

J'avais également pour objectif de présenter mes recherches à la fin de l'année durant une présentation qui allait durer une **vingtaine de minutes**. Il fallait donc qu'elle soit la plus imagée possible pour permettre au public présent de comprendre intuitivement les concepts présentés. La manière la plus efficace de vulgariser la simulation de lumière était donc d'effectuer beaucoup de visualisations.

![Exemple de diapositive de visualisation d'algorithmes en 3D](/images/blog/GodotPPT/IntroAnimation.webp)

## Le problème de PowerPoint

PowerPoint est un logiciel de présentation très complet. Il permet de créer des diapositives aisément. Il a beaucoup de fonctionnalités d'animation et de transitions. Il contient un mode présentateur qui permet de voir ses notes de chaque diapositive durrant les présentations. Et, techniquement, PowerPoint peut importer des _modèles 3D_ et les animer de manière rudimentaire.

Mais, le logiciel devient complexe à utiliser quand le contenu principal est composé d'images et de vidéos. Il demande beaucoup de travail manuel pour placer correctement les images, les objets finissent par être sélectionnés par accident et les transitions entre _slides_ qui comportent des vidéos sont souvent abruptes. De plus, il est quasiment impossible de synchroniser deux vidéos sur deux _slides_ différentes.

Étant donné la quantité de visualisations que j'allais devoir intégrer dans ma présentation, l'option d'utiliser un logiciel de présentation classique est vite devenue impensable.

## Les approches alternatives

Il existe des options alternatives de création de présentation qui fonctionnent très bien pour la visualisation. Certains logiciels permettent de créer des présentations / animations en utilisant du code, par exemple :

- [Manim](https://www.manim.community/)
- [React Flow](https://reactflow.dev/)
- [Motion Canvas](https://motioncanvas.io/)

<ImageLine alt="Librairies Manim, React Flow et MotionCanvas" images={codeAnimators} aspectRatio={16/9}/>

Ces deux librairies permettent d'effectuer des visualisations avancées avec un grand contrôle. Manim a par exemple des fonctionnalités de rendu _3D_ de base. Mais, aucune de ces librairies ne contient un moteur de rendu _3D_ réaliste avec des ombres portées, des matériaux _PBR_ ou de l'_illumination globale_. J'aurais donc dû développer un système de _rendu_ avancé en utilisant _WebGL_ ou _ThreeJS_ ce qui aurait demandé plus de travail que je ne pouvais fournir dans la durée avant la présentation.

Je me suis donc tourné vers des _moteurs de jeux_ plus classiques qui me donnaient accès à leurs _renderer_, à l'édition de scènes _3D_, à l'édition de scènes _2D_ et à la création d'_interface utilisateur_ :

- **Unreal Engine**
- **Unity Engine**
- **Godot Engine**

J'avais de l'expérience sur ces trois moteurs et après quelques tests, je me suis tourné vers **Godot**. Le moteur comportait toutes les combinaisons de fonctionnalités dont j'avais besoin pour faire un moteur de présentations :

- Moteur de rendu assez avancé et dynamiquement modifiable
      - Possibilité de changer les paramètres de rendu très facilement
- Système de réflexion
      - Le moteur permet d'accéder à chaque propriété de chaque _node_ sans besoin de créer des interfaces spécifiques
- Système de _tweening_ flexible
      - Possibilité d'animer presque toutes les propriétés des _nodes_ des scènes grâce au système de réflexion
- Système de création d'interface drag and drop pour la gestion du texte
      - Très pratique pour remplacer le _workflow_ des logiciels classiques

![Éditeur de Godot dans une scène utilisant le sytème de slides](/images/blog/GodotPPT/GodotEditor.webp)

# Développement du projet

J'ai commencé la création de la librairie le **5 février 2024** pour une présentation prévue le **25 avril 2024**. J'ai développé le projet entièrement sur mon temps libre durant ces **deux mois**. Pour tester le fonctionnement de ma librairie, j'avais également prévu de l'utiliser pour une petite présentation sur mon parcours à l'IUT du Puy-en-Velay le **22 février 2024**.

![Organisation du projet dans le temps](/images/blog/GodotPPT/Planning.svg)

Pour la présentation de février, la librairie était assez rudimentaire. Elle comprenait les bases importantes pour un logiciel de présentation : système de _keyframes_, de transitions et des interfaces de _slides_ et de contrôle de la présentation.

J'ai incorporé des éléments _2D_ et _3D_ pour tester le fonctionnement du moteur et les résultats étaient très prometteurs.

![Slide utilisant la version MVP de la librairie](/images/blog/GodotPPT/OldVersion.webp)

J'ai ensuite continué le développement de la librairie pour ajouter les fonctionnalités manquantes pour la présentation d'avril et faire un gros travail de _refactor_ des fonctionnalités existantes.

# Fonctionnalités de la librairie

Le système de _slides_ reprend beaucoup de fonctionnalités de logiciels de présentations tout en étant fait pour garder la plus grande flexibilité dans le moteur :

- Système de _keyframes_ qui peut animer les propriétés présentes dans le moteur
    - Tweening des propriétés des objets de la scène
      - Position, rotation, échelle, couleur, luminosité, matériaux, _post-processing_
    - Contrôle des _timelines_ des `AnimationPlayers`
- Scène templates de texte de diapositives avec des automatisations
    - Introduction, bullet points, texte, etc.
- Contrôle des slides via le clavier ou la souris
    - Interface spécifique
- Mode présentateur avec une seconde fenêtre contenant des notes et une _preview_
    - Possibilité de l'afficher sur un second écran
- Système d'affichages de formes _2D_ dans l'espace _3D_
    - Flèches, lignes, polygones, _wireframes_, etc.

## Système d'animation en _keyframes_

Le système d'animation est basé sur une hiérarchie de _nodes_ placés dans la scène. La plus importante est la _node_ `Timeline` qui contrôle le système d'animation. Elle contient des _nodes_ `Keyframe`. Pour pouvoir animer plusieurs propriétés simultanément, les _nodes_ `Keyframe` peuvent contenir elles-mêmes d'autres _nodes_ `Keyframes` qui sont jouées simultanément que leures parent.

Hiérarchie d'une timeline dans une scène :

```
 ○ Root
 └── ○ Timeline
     ├── ○ Keyframe 1
     │   ├── ○ SubKeyframe 1.1
     │   ├── ○ SubKeyframe 1.2
     │   ├── ○ SubKeyframe 1.3
     │   └── ○ SubKeyframe 1.4
     ├── ○ Keyframe 2
     │   ├── ○ SubKeyframe 2.1
     │   ├── ○ SubKeyframe 2.2
     │   └── ○ SubKeyframe 2.3
     ├── ○ Keyframe 3
     │   └── ○ SubKeyframe 3.1
     └── ○ Keyframe 4
```

Cette hiérarchie correspond à une présentation avec 4 _slides_ avec des transitions plus ou moins complexes.

![Exemple de hiérarchie de Keyframes pour une présentation plus longue dans l'éditeur Godot](/images/blog/GodotPPT/Outliner.webp)

Les `keyframes` sont des nodes qui ont un _script_ attaché qui hérite de la _classe_ ` PropertyKeyframe`. Cette _classe_ contient les données de base pour effectuer une transition :

- Référence à la node et à la propriété à modifier
- Hérite d'une classe de gestion de `tweening`
- Référence à l'ancienne et la prochaine `Keyframe` si elles existent

```gdscript
class_name PropertyKeyframe
extends Keyframe

@export_category("Reference")
@export var node : Node
@export var property : String

@export_category("Tweening")
@export var duration: float = .5
@export var delay: float = 0
@export var transition = Tween.TRANS_SINE
@export var ease = Tween.EASE_IN_OUT

@export_category("Misc")
@export var make_visible_at_launch: bool = true

@onready var _default_value
@onready var _end_value

var _is_valid = true
var _is_previous_enabled = true

var _previous_keyframe: PropertyKeyframe
var _next_keyframe: PropertyKeyframe

# Region functions
...
```

Pour animer des propriétés spécifiques, j'ai mis en place des _classes_ spécialisées qui ont des paramètres spécifiques : `ColorPropertyKeyframe`, `Vector3PropertyKeyframe`, `Vector2PropertyKeyframe`, `BoolPropertyKeyframe`

Exemple de `ColorPropertyKeyframe` :

```gdscript
extends PropertyKeyframe

@export var end_value : Color = Color.WHITE

func _ready() -> void:
_end_value = end_value
super()
```

![Keyframe de vector 3 dans l'inspecteur de Godot](/images/blog/GodotPPT/Vector3Editor.webp)

Les `Keyframes` sont contrôlées par le _script_ `Timeline`. Ce _script_ contrôle l'exécution des animations et la gestion des keyframes :

```gdscript
extends Node

signal frame_changed(new_frame: int, frame_count: int)

var _frames: Array[KeyframeCollection]
var _current_frame: int = 0

# Setup
func _ready() -> void:
  _frames = get_all_keyframes(self)
  setup_property_keyframes(_frames)
  ...

func _process(_delta: float) -> void:
  handle_input()
  ...

# Get all main keyframes in hierachy
func get_all_keyframes(node) -> Array[KeyframeCollection]:
  ...

# Get all sub frames for a given keyframe
func get_all_subkeyframes(node) -> Array[Keyframe]:
  ...

# Setup each keyframe behaviors and link them to their previous and next keyframes
func setup_property_keyframes() -> void:
  ...

func handle_input() -> void:
  ...

func go_to_next_frame() -> void:
  ...

func go_to_previous_frame() -> void:
  ...

# Go to a specified frame by going previous/next iteratively
func go_to_frame(new_frame: int) -> void:
  ...
```

## Templates de diapositives

Pour faciliter l'utilisation de la librairie, j'ai créé quelques scènes d'_UI_ qui me servent de templates de diapositives. Ces templates me servent de base pour les diapositives classiques : introduction, résumé, bullet points, etc. Ces scènes ont leurs propriétés modifiables depuis le _details panel_ de _Godot_.

![Scène de template d'un titre de section](/images/blog/GodotPPT/SlideTemplate.webp)

J'ai ajouté des scripts `@tool`qui me permettent de mettre à jour ces templates quand on change leurs propriétés. Par exemple, modifier le titre, le nombre de bullet points ou le numéro de section actualise la scène dans l'éditeur.

![Schéma de la connexion effectuée par les scripts pour les templates de slides](/images/blog/GodotPPT/SlideTemplateConnection.webp)

## Navigation

La navigation se fait au clavier et à la souris. La librairie comporte un _widget_ de contrôle qui contient un bouton _retour_, une sélection de _slide_ et un bouton _avancer_.
La navigation au clavier se fait avec les touches classiques.

![Widget de navigation utilisable à la souris et au clavier](/images/blog/GodotPPT/NavigatorInputs.webp)

Le _widget_ de navigation communique au reste du système via le système de _signaux_ de _Godot_.

## Mode présentateur

J'ai ajouté un mode présentateur à la librairie. Celui-ci permet d'avoir une seconde fenêtre qui peut être placée sur un second écran si besoin. Il permet d'afficher les notes de la _slide_ actuelle ainsi qu'une _preview_ du rendu de la présentation. Pour aider à la gestion du temps, la fenêtre affiche également la durée actuelle de la présentation et le numéro de la slide actuelle.

<ImageLine alt="Présentation à gauche et fenêtre de notes à droite" images={noteMode} aspectRatio={16/9}/>

Voici une démo du mode présentateur :

![Widget de navigation utilisable à la souris et au clavier](/images/blog/GodotPPT/PresentationMode.mp4)

## Overlay de formes en 2D

Pour aider à la visualisation, j'ai développé un système me permettant d'afficher des formes _2D_ dans l'espace _3D_. Ce système permet d'afficher des lignes ayant une épaisseur constante où qu'elles soient dans l'environnement. En utilisant plusieurs ligne il est possible d'afficher des formes plus complexes comme des flèches, des _outlines_ ou des _wireframes_.

![Outline le la zone ombragée d'une sphère](/images/blog/GodotPPT/Outline.webp)

Pour cela, le système utilise une _node2D_ et utilise les fonctions `draw_line()` . Il référence des points dans l'espace _3D_ et les projette dans l'espace de la caméra.

Scène de test du système d'affichage :
![Scène de test du système d'affichage](/images/blog/GodotPPT/LineSystem.mp4)

Comme le système fonctionne sur un modèle hybride, il permet d'effectuer la transition entre un contexte _3D_ et un contexte _2D_ isométrique. Par exemple, dans cet extrait, on passe d'une vue à l'intérieur d'une pièce _3D classique à une vue \_2D_ schématique. La scène reste en _2D_, mais le système anime le _FOV_ de la caméra et le _post-processing_ de la scène pour donner une apparence _2D_.

Transition d'un environement 3D à une vue 2D qui utilise le système d'affichage de lignes:
![Transition d'un environement 3D à une vue 2D qui utilise le système](/images/blog/GodotPPT/3DTo2DTransition.mp4)

# Démos

Voici à quoi ressemble le système pour une présentation complexe :

Slide d'introduction sur la lumière dans le jeu vidéo :
![Slide d'introduction sur la lumière dans le jeu vidéo](/images/blog/GodotPPT/Intro.mp4)

![Slide d'introduction sur les méthodes de rendu 3D](/images/blog/GodotPPT/IntroAnimation.webp)

Slide d'introduction de l'illumination globale avec activation dans le moteur :
![Slide d'introduction de l'illumination globale avec activation dans le moteur](/images/blog/GodotPPT/GlobalIllumination.mp4)

![Conclusion de ma présentation](/images/blog/GodotPPT/Outro.webp)

Après avoir effectué quelques petites modifications, j'ai pu ajouter l'export web des présentations. En voilà une faite spécifiquement pour cet article.

La librairie a été conçue pour être utilisée dans un contexte d'application native sur desktop. Il est donc possible que la démo ait des problèmes de fonctionnement qui sont absents sur la version complète. J'ai pu constater que le chargement des _Shaders_ fasse des petits _freezes_ à l'affichage des nouveaux modèles. Cela vient du fait que l'export web de _Godot 4.3_ soit _mono-thread_ par défaut pour des questions de compatibilité.

Appuyez sur le bouton pour lancer la présentation :

<Presentation3D/>

# Conclusion

Ce projet a été très intense et très intéressant. J'ai beaucoup appris sur les spécificités internes de _Godot_ et sur les problématiques des systèmes d'animations. J'ai pu faire ma présentation pour mon état de l'art en temps et en heure. Je l'ai également présentée au bureau et ai eu des retours très positifs.

La librairie n'est pas finale, elle contient quelques bugs et elle mériterait d'avoir une nouvelle passe pour son ergonomie et sa stabilité. J'aimerais beaucoup revenir sur ce projet et régler ces derniers bugs et problèmes pour pouvoir en faire une vraie librairie utile pour d'autres personnes. Si la librairie intéresse quelqu'un dans son état actuel, il est possible que je la rende disponible.
