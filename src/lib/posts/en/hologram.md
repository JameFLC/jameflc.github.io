---
title: Creating realtime holographic displays for live events
description: How realtime motion capture, the Art-Net protocol and projection tricks made making an hologram system in Unity possible
thumbnail: '/images/thumbnails/Hologram.webp'
date: '2025-08-27'
type: project
tags:
  - tag
published: true
---

Hello, hi. Today the subject will be about real-time holographic rendering. This project was commissioned by [Coop'art](https://coopart.fr/), an artistic and cultural cooperative in Haute-Loire, based in **Le Puy en Velay** in France. Our mission was to create an application that would project holograms in real time during shows.

# Specifications

This project had several specific functionalities that would make the app work:

- Real-time 3D rendering
- Holographic projection
- Real-time motion capture
  - Capturing a data stream from [XSens](https://www.reallusion.com/iclone/motion-capture/xsens.html) motion capture suits
  - Real-time animation of virtual characters in the 3D scene
- Possible control of the application via the [Art-Net](https://fr.wikipedia.org/wiki/Art-Net) lighting control protocol
  - For example, allow programming camera movement based on music
  - Allow holograms to be controlled with an Art-Net/DMX control panel
- Creation of a companion app that remotely controls the hologram projection software
  - Using internally the **Art-Net** protocol
- Prefab exports from _Unity_ directly into the running app

![Hologram capturing Inès Chtioui's movements in real-time](/images/blog/Hologram/RealSize.webp)

# The Team

We were 3 on the project:

- Jame Floc'h Le Carour: Programming, software design
- [Cyrielle Bracher](https://www.linkedin.com/in/cyrielle-bracher/): Asset creation, design of the live demo
- [Inès Chtioui](https://www.linkedin.com/in/in%C3%A8s-chtioui/): Design of the live demo, performed the live demo

# Technology

I was responsible for the software creation of the hologram creation software suite, which included the holographic projection development, a Unity plugin for exporting prefabs, and the projection control companion app.

The holographic projection software uses the _Unity_ game engine for its rendering. The engine allowed me to add the required features very quickly. For example, the holographic projection perspective correction or importing _Prefabs_ or connecting to the various Art-Net/XSens communication protocols.

One of the first holographic projection performance tests using a complex _mesh_ and a non-humanoid _rig_.
![Crab Holographic Projection Test](/images/blog/Hologram/HoloCrab.mp4)

In a live event context, the spectators will not be directly in front of the projection screen, so perspective correction must be applied using a virtual camera placed at the observer's position, which projects its point of view onto a virtual flat surface that represents the real screen. This aligns the observer perspective with the virtual one, which makes the flatness of the real screen disappear.

![Perspective correction test rendering](/images/blog/Hologram/PerspectiveCorreciton.mp4)

The _Unity_ plugin allows exporting prefabs from the engine to import them into the projection software at _runtime_. I used the [Asset Bundles](https://docs.unity3d.com/Manual/AssetBundlesIntro.html) system to add this functionality to the engine.

Here is what the export _workflow_ from _Unity_ to the projection software looks like:

![Exporting a Prefab from Unity to projection software](/images/blog/Hologram/UnityToHolorgam.mp4)

Yes... The interface is a bit kitsch, but the idea of ​​a holographic system with a _UI_ that looks like it belongs in the **Matrix** made me smile a lot and appealed to the client's team. And seeing it floating in the void gave it a nice futuristic style.

![Projection software interface floating in the air](/images/blog/Hologram/FloatingUI.webp)

The companion app contains a simplified version of the one found in the projection software. It contains sliders that allow you to position the holograms in space and move the virtual camera easily. It communicates with the software by creating its own Art-Net stream.

# Live Demo

Here is what the demo we made at the end of the project looks like.

![Holographic Projection with Motion Capture Demo](/images/blog/Hologram/HologramDance.mp4)
