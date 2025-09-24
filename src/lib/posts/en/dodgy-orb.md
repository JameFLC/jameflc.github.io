---
title: Dodgy Orb, bringing back an old board game to the screens
description: Inspired by the board game Screwball Scramble, Dodgy Orb is a recreation of the physics game where you can control obstacles to move a marble
thumbnail: '/images/thumbnails/DodgyOrb.webp'
date: '2025-05-06'
type: project
tags:
  - unity
  - 3d
  - audio
published: true
---

Hello, hi. Today, I will show you the project **Dodgy Orb**.

![Gamplay du jeu](/images/blog/DodgyOrb/DodgyOrbGameplay.mp4)

Dodgy Orb is a 3D puzzle game inspired by a board game called **Screwball Scramble** made by the company [Tomy](https://uk.tomy.com/products/tomy-screwball-scramble). The goal of the player is to get the marble to the end of the course as quickly as possible. The game was developed using _Unity_.

![Dodgy Orb Screenshot](/images/blog/DodgyOrb/Thumbnail.webp)

# Gameplay

To move the ball forward, the game provides various buttons and sliders on the virtual board to control the obstacles. Each obstacle is controlled differently, and it's up to the player to figure out how to control it properly. The game can be controlled using a mouse and a touchscreen.

![Dodgy Orb on a large touchscreen](/images/blog/DodgyOrb/TouchScreen.webp)

There is a _speedrun_ mode in which the course must be completed in one go and a training mode that adds checkpoints.

# The Team

The project was made by me and a friend in our spare time over the course of two months:

- [Pierre Vandel](https://www.linkedin.com/in/pierre-vandel/) : Project management, modeling, aide à la programmation
- Jame Floc'h Le Carour : Programming, audio, 3D modeling, UI

# User Interface

The game's interface is divided into two sections. The first is the _gameplay_ section, like the board buttons. This section is the most used during gameplay. It has the particularity of being totally _diegetic_ (it exists in the universe and the environment of the game). As Dodgy Orb aimed to recreate a physical board game, creating a classic 2D interface would have greatly diminished the experience.

![The board controls with their obstacle](/images/blog/DodgyOrb/Controls.webp)

The second section is for managing settings. It controls the volume of the application as well as the game modes, restart, and exit the game. It is _extra-diegetic_, it is a minimalist *2D* _HUD_ _UI_. It was made to not be distracting.

![2D User Interface](/images/blog/DodgyOrb/UI.webp)

# Audio

I have paid special attention to making the audio immersive. All the game's interactable elements have audio that reacts to the user input. The buttons have tactile sounds. The main wheel and propellers make an electric motor sound. The ball has dynamic sound depending on its speed. You can also hear the sounds of metal pins gripping when rotating the knobs, just like in the original game. All sounds are controlled directly in Unity with dynamic audio sources and the engine's audio mixer.

![Game Audio Sample](/images/blog/DodgyOrb/DodgyOrbAudio.mp4)

# Game Screenshots

![Game board](/images/blog/DodgyOrb/01.webp)

![Topdown view](/images/blog/DodgyOrb/03.webp)

![Gameplay of the game](/images/blog/DodgyOrb/DodgyOrbGameplay.mp4)

# Playing the game

Dodgy Orb and complementary information about this project are available on [itch.io](https://pierrevdl.itch.io/dodgy-orb).

<iframe src="https://itch.io/embed/1811277" width="100%" frameborder="0"><a href="https://pierrevdl.itch.io/dodgy-orb">Dodgy Orb by PierreVdl, JameFLC</a></iframe>
