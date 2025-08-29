---
title: Transformer un escalier en un piano public
description: Un projet en collaboration avec le festival Spawn! dans le but d'animer l'événement et de transformer les visiteurs en musiciens !
thumbnail: '/images/thumbnails/Escalarmony.webp'
date: '2025-05-08'
type: project
tags:
  - tag
published: true
---

<script>
  import ImageLine from "../../components/blog/layout/ImageLine.svelte"
  import EscalarmonieUISwitch from "../../components/blog/widgets/escalarmonie/EscalarmonieUISwitch.svelte"
  import EscalarmonieDistanceSlider from "../../components/blog/widgets/escalarmonie/EscalarmonieDistanceSlider.svelte"
  import EscalarmonieHueSlider from "../../components/blog/widgets/escalarmonie/EscalarmonieHueSlider.svelte"
  import EscalarmonieKeySlider from "../../components/blog/widgets/escalarmonie/EscalarmonieKeySlider.svelte"

  const projects = [ '/images/blog/Escalarmonie/PianoStairsMetroRennes.webp', '/images/blog/Escalarmonie/PianoStairsRolighetsteorin.webp'];
  const sensors = [ '/images/blog/Escalarmonie/Sensor2.webp', '/images/blog/Escalarmonie/Sensor1.webp', '/images/blog/Escalarmonie/Sensor3.webp'];
</script>

Bonjour, bonjour. Aujourd'hui, je vais vous présenter le projet **Escalarmonie**. Il s'agit d'un projet réalisé en collaboration avec le festival [Spawn!](https://spawngamesfestival.org/) d'Angoulême. Cet événement qui est organisé au Cnam-Enjmin est dédié au développement de la filière image en Charente.

Pour l'occasion, mon équipe et moi avons conçu, fabriqué et mis en place une installation interactive permettant aux visiteurs du festival d'utiliser un des escaliers comme un instrument de musique.

![Installation d'Escalarmonie dans le bâtiment de l'Enjmin](/images/blog/Escalarmonie/Result.webp)

# Contexte

Le projet a été réalisé en plusieurs à temps partiel entre octobre 2023 et avril 2024. Nous étions 4 à avoir travaillé sur le projet.

- [Pierre Vandel](https://www.linkedin.com/in/pierre-vandel/) : Gestion de projet, Gestion du Budget
- [Lucas Le Dudal](https://www.linkedin.com/in/lucas-le-dudal/) :  Recherche hardware, prototypage
- [Colin Bernard](https://www.linkedin.com/in/colin-bernard-75686557/) : Programmation Électronique
- Jame Floc'h Le Carour : Programmation Audio / UI, Modélisation 3D 

L'objectif était de réaliser une installation ludique avant le lancement du festival _Spawn!_ 2024. L'idée était inspirée d'un projet similaire réalisé [dans le métro de Rennes](https://www.youtube.com/watch?v=cHN6I3kV8-U). Le budget du projet était d'environ **630 €**.

- 440 € d'électronique
- 100 € de matériel audio
- 80 € de décoration

![Zone initialement prévue pour l'installation de l'escalier](/images/blog/Escalarmonie/StairZone.webp)

À l'origine, la moitié complète de l'escalier était prévue d'être transformée en instrument. Pour rentrer dans le budget du projet, huit marches de l'escalier ont été transformées en touches de piano. Cela permettait de quand même correspondre à une gamme de touches blanches de piano et permettait également de créer des ambiances sonores relativement complexes.

![Test des huit touches de clavier avant le festival Spawn!](/images/blog/Escalarmonie/TestEscalarmonie.mp4)

# Projet en deux parties

Tout comme le jeu [À travers le Maldirach](/blog/maldirach) le projet _Escalarmonie_ contient deux pôles techniques. Le premier pôle est une partie électronique contrôlée par un _ESP32_. Le second pôle est une application _Unity_ qui régit un système audio avec en plus une interface utilisateur qui permet au public de contrôler les types de sons joués par l'installation.

![Flow d'information du système](/images/blog/Escalarmonie/DataFlow.svg)

# Escalier

Pour la conception de l'escalier, nous avons fait un état de l'art des différentes installations existantes.

- [Dans le métro de Rennes](https://www.youtube.com/watch?v=cHN6I3kV8-U)
- [Piano stairs - TheFunTheory.com - Rolighetsteorin.se](https://www.youtube.com/watch?v=2lXh2n0aPyw)

<ImageLine alt="Projets d'escalier piano à Rennes et par The Fun Theory" images={projects} aspectRatio={16/9}/>

Ces solutions utilisaient des capteurs de pression et demandaient beaucoup de matériel qui n'était pas à la portée du projet avec nos financements. Nous nous sommes alors tournés vers des solutions alternatives de détection de présence. 

La première option était d'utiliser des capteurs de distance _ultrason_ classiques. En effectuant des tests, nous avons remarqué que leur rayon de détection était trop élevé et les capteurs avaient tendance à détecter le sol et les autres marches comme un obstacle.

![Capteur Ultrason testé pour le projet](/images/blog/Escalarmonie/UltrasoundSensor.webp)

Après d'autres recherches, nous avons choisi d'utiliser des capteurs de distance laser de type _time of flight_. Le capteur choisi permettait de détecter un obstacle sur une distance de six mètres et n'avait pas le problème d'interférence des systèmes à _ultrason_, car le cône de détection était très étroit.  

![Capteur Adafruit VL53L4CX utilisé dans le projet](/images/blog/Escalarmonie/AdafruitTOF.webp)

Tous les détecteurs étaient contrôlés par un _ESP32_ qui a été programmé par **Colin Bernard**. Il a également construit le boitier qui contenait le _microcontrôleur_ et le _hub_ des capteurs.

![Boitier électronique du projet](/images/blog/Escalarmonie/Hub.webp)

Pour faciliter l'installation des capteurs, j'ai modélisé des supports articulés dans **Blender**. Ces supports nous ont permis de pouvoir régler individuellement les capteurs pour éviter les interférences tout en protégeant les _PCB_.

![Rendu des articulations possibles des supports](/images/blog/Escalarmonie/RotationRender.webp)

<ImageLine alt="Capteurs dans différentes positions" images={sensors} aspectRatio={4/3}/>

# Système numérique

Je me suis occupé de la programmation du système numérique du projet. Pour cela, j'ai choisi d'utiliser le moteur de jeu _Unity_.  Grâce au projet [Maldirach](/blog/maldirach), j'avais l'expérience de contrôler un système audio via un _ESP32_ avec ce moteur. De plus, le système de _Mastering audio_ du moteur permet d'obtenir des effets relativement complexes sans avoir besoin de librairies audio externes. Enfin, le moteur permet de créer des interfaces utilisateurs avancées. Cela a été très utile durant le projet.

## Communication avec l'_ESP32_

La communication avec l'_ESP32_ est assez simple. Comme pour le projet **Maldirach**, le premier _script_ réceptionne les informations de l'_ESP32_ via un _port serial_ sur un _thread_ en _background_ et notifie les informations reçues via des _Events_. L'_ESP32_ informe au système le nombre de touches disponibles et chaque touche qui est actuellement pressée.

Ces informations sont ensuite filtrées par un second script qui empêche les interférences électriques et les problèmes des capteurs d'avoir un impact sur les sons joués par le système. Il permet également de paramétrer la distance minimum et maximum de détection d'obstacles pour pouvoir fonctionner dans plusieurs configurations. Par exemple, on peut configurer le système pour détecter les pas sur un quart, la moitié ou toute la largeur d'un escalier.

<EscalarmonieDistanceSlider/>

<br>
<br>
Pour aider au prototypage, j'ai créé un script qui émule le comportement de l'_ESP32_. Celui-ci détectait les appuis sur les touches du clavier et envoyait des _events_ similaire, cela m'a permis de prototyper le système de son et d'_UI_ pendant le développement de la partie électronique.

![Contrôle des touches de clavier via un ESP32 et un script simulant des touches](/images/blog/Escalarmonie/ESP23Emulator.svg)

## Gestion des playlists audio

Le système peut jouer plusieurs instruments et des ambiances sonores qui sont stockées dans des `Playlists`. Celles-ci sont importées au lancement du logiciel depuis un dossier proche de l'exécutable.

Chaque playlist est un dossier qui comprend un nombre choisi  `n`  de "notes" jouables (peut être une note ou un bruit d'ambiance) et chaque note est numérotée de `1` à `n`.  

Voici à quoi ressemble la hiérarchie des fichiers d'Escalarmonie pour un projet avec deux playlists :

```
.
├── Escalarmonie.exe
└── Playlists
    ├── Piano
    │   ├── 1.wav
    │   ├── 2.wav
    │   ├── 3.wav
    │   ├── ...
    │   ├── [n].wav
    │   ├── thumbnail.png
    │   └── settings.json
    └── Forest
        ├── 1.wav
        ├── 2.wav
        ├── 3.wav
        ├── ...
        ├── [n].wav
        ├── thumbnail.png
        └── settings.json
```

Les playlists contiennent également une image `thumbnail` qui est affichée dans l'interface du logiciel. Enfin, les paramètres de la playlist sont stockés dans un fichier `settings.json`. Il contient plusieurs paramètres qui permettent de modifier le comportement et le son des touches :

```json
{
	"AttackDuration": 1, // ..... Durée fade in
	"ReleaseDuration": 2, // .... Durée fade out
	"AudioIsLooping": true, // .. Boucle audio si la touche reste appuyée
	"HighpassCutoff": 22000.0, // Filtrage hautes fréquences
	"LowpassCutoff": 10.0, // ... Filtrage basses fréquences
	"Distortion": 0.0 // ........ Distortion audio
}
```

Par exemple, `AudioIsLooping` est principalement utilisée pour les ambiances sonores qui se répètent dans le temps.

`AttackDuration`, `RealeaseDuration` et `IsAudioLooping` contrôlent les sources sonores individuellement, tandis que `HighpassCutoff`, `LowpassCurtoff` et `Distortion` influent sur le système de _mixage audio_ d'_Unity_.

![Effet de filtrage audio dans un mixeur Unity](/images/blog/Escalarmonie/Mixer.webp)

Tous ces effets permettent de créer des ambiances sonores complexes et d'effectuer des modifications sur les pistes audio sans devoir réexporter les samples audio.

![Test effectué avec plusieurs instruments](/images/blog/Escalarmonie/MultpleInstruments.mp4)

![Ambiance sonore de forêt dans](/images/blog/Escalarmonie/ForestSounds.mp4)

## Interface Utilisateur

J'ai conçu l'interface utilisateur dans le but de donner envie aux visiteurs de changer les _playlists_ de son. L'objectif était donc d'avoir une interface simple et accueillante pour des personnes novices. Un second objectif était d'afficher des informations sur le fonctionnement de l'installation dans un but de vérification / _debug_.

J'ai donc séparé l'interface en deux sections :

- Section supérieure (principale) de sélection de _playlists_
- Section inférieure (secondaire) d'affichage d'informations

<EscalarmonieUISwitch/>

La section principale peut être utilisée sur un écran tactile et permet de changer les playlists instantanément. La section secondaire, quant à elle, contient des informations de connexions ainsi qu'un affichage des touches actuellement détectées et préssée.

Pour donner vie à l'application, j'ai ajouté le fait qu'elle prenne pour thème la couleur de la _playlist_ sélectionnée. Quand la _playlist_ jouée change, les couleurs d'accentuations et le gradient de fond changent également de couleur. J'ai utilisé la librairie [ColorThief for Unity](https://github.com/chiutse/ColorThief) pour récupérer la couleur principale des _miniatures_ des _playlists_. J'ai ensuite utilisé cette couleur pour changer la teinte globale des éléments de l'application.

Exemple de changement de teinte de l'interface en fonction d'une valeur de teinte :
<EscalarmonieHueSlider/>

 J'ai utilisé plusieurs _ShaderGraphs_ pour modifier les couleurs des interfaces et des images. Ils m'ont permis de les changer dynamiquement et de filtrer les images. Le projet utilise _URP_ comme _backend_ de rendu. Concernant les animations, j'ai utilisé la librairie [DoTween](https://dotween.demigiant.com/) qui m'a permis d'animer les changements d'état des interfaces, comme les changements de couleurs d'accentuation ou l'état des éléments d'interface.

![Shadergraph contrôlant l'apparence des miniatures des playlists](/images/blog/Escalarmonie/ShaderGraph.webp)

L'interface du logiciel est très dynamique, elle peut afficher un nombre de _playlists_ et de touches disponibles variable. L'affichage et la gestion des états de l'application sont dirigés par quelques _scripts managers_ qui contrôlent la communication entre l'interface utilisateur et l'état interne du système audio.

<EscalarmonieKeySlider/>

# Festival Spawn!

L'installation a été faite dans le bâtiment de l'Enjmin pour le festival **Spawn!**. Elle est restée installée toute la durée du festival et a fonctionné comme prévu. Nous avons été très agréablement surpris de l'engouement du public pour l'installation et des utilisations créatives qui en ont été faites.

![Installation d'Escalarmonie durant le festival Spawn!](/images/blog/Escalarmonie/DemoSpawn.mp4)

Le projet a été très intéressant d'un point de vue technique comme de gestion de projet. Les questions de budget nous ont conduits à trouver des solutions alternatives pour nos problématiques comme la détection de présences et la gestion audio. Le code source du projet est disponible sur [Github](https://github.com/Escalharmonie).

Ce projet n'aurait pas pu être réalisé sans le soutien financier de l'**Enjmin** et du festival **Spawn!** et nous en sommes très reconnaissants.
