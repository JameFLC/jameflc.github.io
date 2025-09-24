---
title: 'Across the Maldirach" the a11y adventure'
description: Making an accessible collaborative puzzle-adventure game that replace sight with touch and sounds
thumbnail: '/images/thumbnails/Maldirach.webp'
date: '2025-05-02'
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

Hello, hi. Today I will show you the project **Across the Maldirach**.
A collaborative puzzle-adventure board game that asks two players to work together to navigate a dangerous world.

![Illustrations of the Maldirarch swamps illustrated by Baptiste Lalue](/images/blog/Maldirach/Marrais_white.webp)

- A **liminal traveler** is lost in the **Maldirach**, a terrible forest between shadow and dream that no light can reach! They must use his sense of touch to analyze his surroundings and move his pawn from place to place to escape the forest.
- Their friend, who remained in our world, is a **bookman** who possesses ancient texts about Maldirach. They must analyze these grimoires, exchange with the other player, and draw parallels between the cryptic texts and the geography of the forest, with the help of their lost teammate!

This game was created as part of a week-long project exploring accessibility issues. The goal was to create an experience that would work equally well for a blind or visually impaired person as it would for a sighted person.

![Photograph of the Maldirach plateau](/images/blog/Maldirach/GameBoard.webp)

# The project

This game was created as part of the "included and connected" workshop at CNAM-ENJMIN in September 2023. We were 6 on this project:

- Fae : Game design, voice acting, concept and construction of the board
- Paul CORET : Sound design
- Baptiste LALUE : Illustrations, voice acting, concept and construction of the board
- Jame FLOC'H LE CAROUR : Programming, electronics, voice acting
- Wilfried FOTSO NDEFO : Programming, electronics, voic acting
- Eris DESQUILBET : Project management, concept and construction of the board

In addition to the main tasks assigned, each person participated in the concept ideation and the creation and discussions regarding the accessibility issues of the project.

<ImageLine alt="Illustrations from the Maldirarch guide illustrated by Baptiste Lalue" images={illustrations1} aspectRatio={16/10}/>

# How it works

During a game, the blindfolded player moves around the board from square to square using a pawn. At each new space, new events occur that determine whether the adventure can continue. These events change the soundscape of the room.

To manage these changes in the state of the adventure, the game has two distinct technical parts, the board with electronic management and the digital part with game management and feedback.

![Schéma de communication entre le plateau et le PC](/images/blog/Maldirach/BoardPcCommunication.svg)

## Electronics in the board

The board was created using _CNC-cut_ planks, and the scenery elements were _3D_ printed. The tiles were placed on the terrain and connected by paths carved into the wood.

To detect navigation, each square has a Hall effect switch. This is an electronic component that can open or close an electrical circuit if it is in a magnetic field. The game pawn has a magnet at its base that triggers the switches.

All switches are connected to an _ESP32_ which allows the various signals to be transformed into a format readable by the computer. Wilfried and I established a standard format for both systems. He handled the programming of the _ESP32_, and I took care of soldering the circuit.

![Circuit diagram between the boxes and the ESP32](/images/blog/Maldirach/ESP32Circuit.svg)

## Digital system

I handled the game management system and the audio _framework_ on the project. My choice of technology was _Unity Engine_ for several reasons.

- Fast _C#_ scripting
- Easy to connect with an _ESP32_
- Very easy integration with _FMOD_
- Easiness for prototyping

Since the project was done in the Enjmin which is a video game development university, all the team had experience with _Unity_. Also, the engine's integration with the _FMOD_ library allowed our _sound designer_ to work very efficiently and create rich soundscapes without requiring complex development.

The project contains three main scripts that each manage one aspect of the system. The first _script_ receives information from the _ESP32_ via a _serial port_ on a _background thread_ and notifies the received information via an*Events*. It performs _temporal filtering_ of the signal to prevent electronic interference problems. For example, the game will not change state if a sensor is activated for less than a tenth of a second. The second _script_ manages the game state. It manages which spaces are fatal, how long it takes, and how to restart the game. The last script manages game state communication with the _FMOD_ library.

![Data flow from the board to FMOD](/images/blog/Maldirach/DataFlow.svg)

# Results

![Playtest of the game during the prototyping phase](/images/blog/Maldirach/Playtest.webp)

During the _playtest_, the players that tried the game enjoyed it a lot.
The experience was very instructive, we learned a lot about the means of implementing playful and accessible systems.

On the technical side, _Unity_ allowed us to prototype very quickly, even if the resulting software is less optimized than it could be. If I were to do a project like this again, I think starting with a simple console program with a DLL for FMOD would be more than enough and much lighter. Now that the project is finished, I think it probably wouldn't have been that much harder to set it up that way.

<ImageLine alt="Illustrations from the Maldirarch guide illustrated by Baptiste Lalue" images={illustrations2} aspectRatio={4/3} />

Complementary information about this project are available on [itch.io](https://lamaxelle.itch.io/a-travers-le-maldirach).

<iframe src="https://itch.io/embed/2257527" width="100%" frameborder="0"><a href="https://lamaxelle.itch.io/a-travers-le-maldirach">Across the maldirach ✨ - Lamaxelle, Paul Coret, fae.exe, Baptistoux</a></iframe>
