---
title: Dodgy Orb, le retour d'un vieux jeu de société sur vos écrans
description: Inspiré du jeu de société Tricky Bille, Dodgy Orb est une recréation du jeu de puzzle physique où vous pouvez contrôler des obstacles pour déplacer une bille.
thumbnail: '/images/thumbnails/DodgyOrb.webp'
date: '2025-05-06'
type: project
tags:
  - tag
published: true
---

![Gamplay du jeu](/images/blog/DodgyOrb/DodgyOrbGameplay.mp4)

Bonjour, bonjour. Aujourd'hui, je vais vous présenter le projet **Dodgy Orb**.

Dodgy Orb est un jeu de puzzle inspiré du jeu de plateau **Tricky Bille** par la société [Tomy](https://fr.tomy.com/jouets/tomy-jeux). Le but du jeu est d'emmener la bille jusqu'à la fin du parcours le plus rapidement possible. Le jeu a été développé sur _Unity_.

![Capture d'écran de Dodgy Orb](/images/blog/DodgyOrb/Thumbnail.webp)

# Gameplay

Pour faire avancer la bille, le jeu met à disposition différents _boutons_ et _sliders_ sur le plateau virtuel pour contrôler les obstacles. Chaque obstacle se contrôle différemment et c'est au joueur de trouver comment le contrôler correctement. Le jeu est contrôlable à la souris et en utilisant un écran tactile. 

![Dodgy Orb sur un écran tactile de grande taille](/images/blog/DodgyOrb/TouchScreen.webp)

Il y a un mode _Speedrun_ dans lequel le parcours doit être effectué d'une traite et un mode d'entrainement qui contient des _checkpoints_. 

# Équipe

Le projet a été réalisé sur du temps libre en l'espace de deux mois. Nous étions deux sur le projet :

- [Pierre Vandel](https://www.linkedin.com/in/pierre-vandel/) : Gestion de projet, modélisation, aide à la programmation
- Jame Floc'h Le Carour : Programmation, audio, aide à la modélisation, UI

# Interface

L'interface du jeu est séparée en deux sections. La première est celle du _gameplay_ comme les boutons du plateau. C'est cette section qui va être la plus interagie. Elle a la particularité d'être totalement _diégétique_, elle est présente dans l'univers et la spatialité du jeu. Comme Dodgy Orb avait pour but de recréer un jeu de plateau physique, créer une interface classique en _2D_ aurait grandement amoindri l'expérience. 

![Boutons du jeu et leur obstacle respectif](/images/blog/DodgyOrb/Controls.webp)

La seconde section, elle, est pour la gestion des paramètres. Elle contrôle le volume de l'application ainsi que les modes de jeu, _restart_ et pour quitter le jeu. Elle est quant à elle _extra diégétique_, il s'agit d'une interface _2D_ de type _HUD_ qui est dans un style minimaliste pour ne pas détourner l'attention.

![Boutons du jeu et leur obstacle respectif](/images/blog/DodgyOrb/UI.webp)

# Audio

Tous les éléments physiques du jeu ont eu une attention particulière au niveau de l'audio. Les boutons ont un bruit tactile. La roue principale et les hélices font un bruit de moteur électrique. La bille a un son dynamique en fontion de sa vitesse. On peut également entendre des bruits de broches métalliques qui grippent, comme dans le jeu original. Tous les sons sont contrôlés directement dans _Unity_ avec des sources audio dynamiques.

![Audio du jeu](/images/blog/DodgyOrb/DodgyOrbAudio.mp4)

# Captures du jeu

![Plateau du jeu](/images/blog/DodgyOrb/01.webp)

![Vue du dessus du jeu](/images/blog/DodgyOrb/03.webp)

![Gamplay du jeu](/images/blog/DodgyOrb/DodgyOrbGameplay.mp4)

# Jouer au jeu

Le jeu ainsi que les informations du projet sont disponibles sur le site [itch.io](https://pierrevdl.itch.io/dodgy-orb).

<iframe src="https://itch.io/embed/1811277" width="100%" frameborder="0"><a href="https://pierrevdl.itch.io/dodgy-orb">Dodgy Orb by PierreVdl, JameFLC</a></iframe>
