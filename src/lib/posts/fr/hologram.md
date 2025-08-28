---
title: Créer un système de rendu holographique en temps réel pour des évenements en live
description: Comment la capture de mouvement en temps réel, le protocole Art-Net et les astuces de projection ont rendu possible la création d'un système d'hologramme dans Unity
thumbnail: '/images/thumbnails/Hologram.webp'
date: '2025-08-27'
type: project
tags:
  - unity
  - rendering
  - wip
published: true
---

Bonjour, bonjour. Aujourd'hui, nous allons parler de rendu holographique en temps réel. Ce projet a été commandité par la société [Coop'art](https://coopart.fr/), une coopérative artistique et culturelle en Haute-Loire, basée au **Puy en Velay**. Nous avons eu pour mission de créer un logiciel permettant de pouvoir projeter des hologrammes en temps réel, durant des spectacles.

# Cahier des charges

Ce projet avait pour cahier des charges plusieurs fonctionnalités spécifiques :

- Rendu en temps réel
- Projection holographique 
- Capture de mouvements en temps réel
  - Capture d'un stream de données de combinaisons de capture de mouvements [XSens](https://www.reallusion.com/iclone/motion-capture/xsens.html)
  - Animation en temps réel de personnages virtuels dans la scène projetée
- Contrôle possible de l'application via le protocole de contrôle d'éclairage [Art-Net](https://fr.wikipedia.org/wiki/Art-Net)
  - Permet par exemple de programmer des mouvements de caméra en fonction de la musique 
  - Permet de contrôler les hologrammes avec un panneau de contrôle Art-Net/DMX
- Contrôle possible de l'application de projection via une application compagnon simplifiée
  - Utilise le protocole **Art-Net** en interne
- Exportation de prefabs depuis Unity vers le logiciel de projection

![Hologramme capturant les mouvements d'Inès Chtioui en direct](/images/blog/Hologram/RealSize.webp)

# Équipe

Nous étions trois sur le projet :

- Jame Floc'h Le Carour : Programmeur, Designer logiciel
- [Cyrielle Bracher](https://www.linkedin.com/in/cyrielle-bracher/) : Création d'assets, Design de la démo
- [Inès Chtioui](https://www.linkedin.com/in/in%C3%A8s-chtioui/) :  Design de la démo, Performance de la démo (dance)

# Technologie

Je me suis occupé de la création logicielle de la suite logicielle de création d'hologrammes qui comportait le gestionnaire de projection holographique, un plugin Unity d'export de prefabs ainsi que l'application de compagnon de contrôle de la projection.

Le logiciel de projection holographique utilise le moteur de jeu _Unity_ pour son rendu. Cela m'a permis d'ajouter les fonctionnalités requises très rapidement. Par exemple, la correction de perspective de projection ou l'importation de _Prefabs_ ou la connexion aux différents protocoles de communication Art-Net/XSens.

Un des premiers tests de performance de projection holographique utilisant un _mesh_ complexe et un _rig_ non humanoïde.
![Test de projection holographique de crabe](/images/blog/Hologram/HoloCrab.mp4)

Dans un contexte de spectacle, les spectateurs ne seront pas directement en face de l'écran de projection, il faut donc appliquer une correction de perspective en utilisant une caméra virtuelle placée à la position des observateurs qui projette son point de vue sur une surface plane virtuelle qui représente l'écran réelle.

![Rendu de test de correction de perspective](/images/blog/Hologram/PerspectiveCorreciton.mp4)

Le plugin*Unity* permet d'exporter des prefabs depuis le moteur pour les importer dans le logiciel de projection en _runtime_. J'ai utilisé le système d'[Asset Bundles](https://docs.unity3d.com/Manual/AssetBundlesIntro.html) pour ajouter cette fonctionnalité au moteur.

Voici le _workflow_ d'exportation depuis _Unity_ et l'importation dans le logiciel de projection :

![Export d'un Prefab d'Unity au logiciel de projection](/images/blog/Hologram/UnityToHolorgam.mp4)

Oui... L'interface est un peu kitch, mais l'idée  d'un système holographique ayant une interface à la **Matrix** me faisait beaucoup rire et plaisait à l'équipe du client. Et, la voir flotter dans le vide lui donnait un certain style futuriste.

![Interface du logiciel de projection flottant dans le vide](/images/blog/Hologram/FloatingUI.webp)

L'application compagnon contient une version simplifiée de celle présente dans le logiciel de projection. Elle contient des _sliders_ qui permettent de placer les hologrammes dans l'espace et de déplacer la caméra virtuelle simplement. Elle communique avec le logiciel en créant son propre flux Art-Net.

# Démo

Voilà un exemple de la démo réalisée à la fin du projet.

![Démo de la projection holographique avec capture de mouvements](/images/blog/Hologram/HologramDance.mp4)
