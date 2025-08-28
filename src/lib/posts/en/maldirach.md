---
title: '"Across the Maldirach" the a11y adventure'
description: Making an accessible collaborative puzzle-adventure game that replace sight with touch and sounds
thumbnail: '/images/thumbnails/Maldirach.webp'
date: '2025-08-02'
type: project
tags:
  - unity
  - electronics
  - accessibility
published: true
---

<script>
  import ImageLine from "../../components/blog/layout/ImageLine.svelte"

  const illustrations1 = [ '/images/blog/Maldirach/Danger_Noodle.webp', '/images/blog/Maldirach/Bridge_white.webp'];

    const illustrations2 = [ '/images/blog/Maldirach/Forteresse_white.webp', '/images/blog/Maldirach/Ghosts_white.webp'];
</script>

# Introduction

Bonjour bonjour. Aujourd'hui je vais vous présenter le projet **À travers le Maldirach**. Il s'agit d'un jeu de plateau d'énigme-aventure collaboratif qui demande à deux joueurs de collaborer pour naviguer dans un monde dangereux.

![Illustrations des marrais du Maldirarch illustré par Baptiste Lalue](/images/blog/Maldirach/Marrais_white.webp)

- Un **voyageur liminal** est perdu dans le **Maldirach**, une terrible forêt entre l'ombre et le rêve que nulle lumière ne peut atteindre ! Il devra utiliser son sens du toucher pour analyser son environnement et déplacer son pion de lieu en lieu pour se sauver de la forêt.
- Son ami, resté dans notre monde, est un **érudit** détenteur d'anciens textes sur le Maldirach. Il doit analyser ces grimoires, échanger avec l'autre joueur et tracer des parallèles entre les textes cryptiques et la géographie de la forêt, à l'aide de son coéquipier perdu !

Ce jeu a été créé dans le contexte d'un projet d'une semaine portant sur les questions d'accessibilité. L'objectif était donc de créer une expérience fonctionnant aussi bien pour une personne non ou malvoyante que pour une personne voyante.

![Photographie du plateau de Maldirach](/images/blog/Maldirach/GameBoard.webp)

# Contexte du projet

Ce jeu a été réalisé dans le cadre du workshop "inclus et connecté" au CNAM-ENJMIN en septembre 2023. Nous sommes 6 à avoir travaillé sur ce projet :

- fae (Game Design, doublage, concept et fabrication de la carte)
- Paul CORET (Sound Design)
- Baptiste LALUE (Graphismes, doublage, concept et fabrication de la carte)
- Jame FLOC'H LE CAROUR (Programmation, montage du circuit, doublage)
- Wilfried FOTSO NDEFO (Programmation, montage du circuit, doublage)
- Eris DESQUILBET (Gestion de projet, concept et fabrication de la carte)

En plus des tâches principales assignées, chaque personne a participé à l'idéation du concept et à la création et aux discussions concernant les problématiques d'accessibilité du projet.

<ImageLine alt="Illustrations du guide du Maldirarch illustré par Baptiste Lalue" images={illustrations1} aspectRatio={16/10}/>

# Fonctionnement technique

Lors d'une partie, la personne aveuglée se déplace sur le plateau de cases en cases à l'aide d'un pion. À chaque nouvelle case, il se passe de nouveaux évènements qui permettent de continuer ou non l'aventure. Ces évènements font changer l'ambiance sonore de la pièce.

Pour gérer ces changements d'état de l'aventure, le jeu comporte deux parties techniques distinctes, le plateau avec la gestion électronique et la partie numérique avec la gestion du jeu et des feedbacks.

![Schéma de communication entre le plateau et le PC](/images/blog/Maldirach/BoardPcCommunication.svg)

## Plateau électronique

Le plateau a été créé en utilisant des planches découpées à la machine _CNC_ et les éléments du décor ont été imprimés en _3D_. Les cases ont été placées sur le terrain et sont reliées par des chemins gravés dans le bois.

Pour la détection de la navigation, chaque case comporte un **interrupteur à effet Hall**. Il s'agit d'une pièce électronique qui peut ouvrir ou fermer un circuit électrique si elle se trouve dans un champ magnétique. Le pion du jeu comporte un aimant à sa base qui permet de déclencher les interrupteurs.

Tous les interrupteurs sont reliés à une carte électronique _ESP32_ qui permet de transformer les différents signaux en un format lisible par un ordinateur. Wilfried et moi avons mis en place un format commun au deux systèmes et il s'est occupé de la programmation de l'_ESP32_ et je me suis occupé des soudures du circuit.

![Schéma du circuit entre les cases et l'ESP32](/images/blog/Maldirach/ESP32Circuit.svg)

## Système numérique

Je me suis occupé du système de gestion du jeu et du _framework_ audio sur le projet. Mon choix de technologie, c'est porté sur _Unity Engine_ et cela pour plusieurs raisons.

- Scripting en _C#_ assez rapide
- Utilisation avec des cartes de type _ESP32_ facile
- Intégration avec FMOD très aisé
- Paramétrage du logiciel étant graphique

Étant dans un contexte de projet en école de jeu vidéo, la majorité de l'équipe avait de l'expérience avec _Unity_. De plus, l'intégration du moteur avec la librairie _FMOD_ a permis à notre _sound designer_ de travailler très efficacement et de créer des ambiances sonores riches sans nécessiter de développement complexe.

Le projet contient trois scripts principaux qui gèrent tous un aspect du système. Le premier _script_ réceptionne les informations de l'_ESP32_ via un _port serial_ sur un _thread_ en _background_ et notifie les informations reçues via des _Events_. Il effectue un _filtrage temporel_ du signal pour empêcher d'avoir des problèmes d'interférences électroniques. Par exemple, le jeu ne va pas changer d'état si une case est activée moins d'un dixième de seconde. Le second _script_ fait la gestion de l'état du jeu. Il gère quelles cases sont mortelles, en combien de temps et comment recommencer la partie. Le dernier script gère la communication de l'état du jeu avec la librairie _FMOD_.

![Schéma de communication du plateau jusqu'à FMOD](/images/blog/Maldirach/DataFlow.svg)

# Résultats

![Playtest du jeu dans un contexte de prototypage](/images/blog/Maldirach/Playtest.webp)

Lors des _PlayTests_, le jeu a été apprécié par les joueurs et joueuses qui ont pu y participer. L'expérience était très instructive sur les moyens de mettre en place des systèmes ludiques et accessibles. Du côté technique, _Unity_ était une solution qui a permis de prototyper très rapidement, même si le résultat est un logiciel plus lourd qu'il ne devrait l'être. Si je devais refaire un projet du genre, je pense que partir sur un programme console simple avec une _dll_ pour _FMOD_ serait amplement suffisant et beaucoup plus léger. Maintenant que le projet est fini je pense qu'il aurait été probablement aussi simple à mettre en place de cette manière.

<ImageLine alt="Illustrations du guide du Maldirarch illustré par Baptiste Lalue" images={illustrations2} aspectRatio={4/3} />

Les informations du projet sont disponible sur le site [itch.io](https://lamaxelle.itch.io/a-travers-le-maldirach).

<iframe src="https://itch.io/embed/2257527" width="100%" frameborder="0"><a href="https://lamaxelle.itch.io/a-travers-le-maldirach">A travers le Maldirach by Eris ✨ - Lamaxelle, Paul Coret, fae.exe, Baptistoux</a></iframe>
