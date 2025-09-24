---
title: Transforming a startcase into a public piano
description: A project made in collaboration with the Spawn festival to add life to the event by transforming visitors into musicians !
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

Hello, hi. Today, today let me share with you the project **Escalarmonie**. This project was made in collaboration with the [Spawn!](https://spawngamesfestival.org/) Festival in the city of Angoulême. This event organized by the [Cnam-Enjmin](https://enjmin-en.cnam.fr/welcome-to-cnam-enjmin-website--1511545.kjsp) is dedicated to the development of the video game industry.

For the occasion, my team and I designed, built, and installed an interactive installation allowing festival visitors to use one of the staircases as a musical instrument.

![The project installed in the Enjmin building ](/images/blog/Escalarmonie/Result.webp)

# Context

The project was made in several sessions between October 2023 and April 2024. We were 4 developers working on this project.

- [Pierre Vandel](https://www.linkedin.com/in/pierre-vandel/): Project management, budget
- [Lucas Le Dudal](https://www.linkedin.com/in/lucas-le-dudal/):  Hardware research, prototyping
- [Colin Bernard](https://www.linkedin.com/in/colin-bernard-75686557/): IOT programming
- Jame Floc'h Le Carour: Audio Programming, UI, 3D modeling 

Our aim was to create a fun installation before the launch of the 2024 *Spawn!* Festival. The idea was inspired by a similar project made inside [the Rennes subway](https://www.youtube.com/watch?v=cHN6I3kV8-U). We had a budget of approximately **630 €**.

- 440 € of electronics
- 100 € of audio gear
- 80 € of decorations

![Area initially planned for the installation of the staircase](/images/blog/Escalarmonie/StairZone.webp)

Originally, half of the staircase was planned to be transformed into an instrument. To fit into the project's budget, eight steps of the staircase were transformed into piano keys. This still allowed for the equivalent of a scale of white piano keys and also allowed for the creation of relatively complex soundscapes.

![Testing the eight keyboard keys before the Spawn festival!](/images/blog/Escalarmonie/TestEscalarmonie.mp4)

# A project with two poles

Just like the game [Across the Maldirach](/blog/maldirach), the _Escalarmonie_ project contains two technical poles. The first pole focuses on the electronics parts controlled by an _ESP32_. The second pole is a _Unity_ application that runs an audio system with an additional user interface that allows the audience to control the types of sounds played by the installation.

![System data flow](/images/blog/Escalarmonie/DataFlow.svg)

# Stairs

For the design of the staircase, we looked at the various existing installations.

- [In Rennes Subway](https://www.youtube.com/watch?v=cHN6I3kV8-U)
- [Piano stairs - TheFunTheory.com - Rolighetsteorin.se](https://www.youtube.com/watch?v=2lXh2n0aPyw)

<ImageLine alt="Piano staircase projects in Rennes and by The Fun Theory" images={projects} aspectRatio={16/9}/>

These solutions used pressure sensors and required a lot of hardware that was beyond the project's reach with our funding. Next, we looked at other presence detection methods.

The first option was to use conventional _ultrasonic_ distance sensors. While testing, we noticed that their detection radius was too high and the sensors tended to detect the floor and other steps as obstacles.

![Ultrasonic sensor tested for the project](/images/blog/Escalarmonie/UltrasoundSensor.webp)

After further research, we decided to use time-of-flight laser distance sensors. The selected sensor could pick up an obstacle six meters away, and because the detection cone was so narrow, it didn't have the problem of interference that ultrasonic systems do.

![Adafruit VL53L4CX sensor used in the project](/images/blog/Escalarmonie/AdafruitTOF.webp)

All sensors were controlled by an _ESP32_ which was programmed by Colin Bernard. He also built the enclosure that contained the microcontroller and sensor hub.

![Electronics Hub with the ESP32 and the Adafruit controller](/images/blog/Escalarmonie/Hub.webp)

To make installing the sensors easier, I modeled rotating mounts in **Blender**. These mounts allowed us to individually adjust the sensors to avoid interference while protecting the _PCBs_.

![3D render of the possible positions of the mounts](/images/blog/Escalarmonie/RotationRender.webp)

<ImageLine alt="Sensors in different positions" images={sensors} aspectRatio={4/3}/>

# Unity

I was responsible for the programming on the audio and UI side. I chose to use the _Unity_ game engine for this purpose. Having worked on the [Maldirach](/blog/maldirach) project, I had experience controlling an audio system via an _ESP32_ with this engine.
In addition, \_Unity\*'s _mastering_ system allows for relatively complex effects without the need for external audio libraries. Lastly, the engine allows for the creation of advanced user interfaces. This was very useful during the project.

## _ESP32_ to _Unity_ pipeline

Communication with the _ESP32_ is quite simple. As with the **Maldirach** project, a first _script_ receives information from the _ESP32_ via a _serial port_ on a _background thread_ and notifies the system of the received information via _events_. The _ESP32_ also informs the _engine_ of the amount of available keys and each key that is currently pressed.

This data is then filtered by a second _script_ to prevent electrical interference and sensor issues from impacting the sounds played by the system. It also allows the user to set the minimum and maximum obstacle detection distance to work in multiple configurations. For example, the system can be configured to detect footsteps across a quarter, half, or full width of a staircase.

<EscalarmonieDistanceSlider/>

<br>
<br>

To help with prototyping, I created a script that emulated the behavior of the _ESP32_. This detected PC keyboard presses and sent piano key pressed _events_, this allowed me to prototype the sound system and _UI_ while the electronics were being developed.

![Audio control using the ](/images/blog/Escalarmonie/ESP23Emulator.svg)

## Managing audio playlists

The system can play multiple instruments and soundscapes that are stored in `Playlists`. These are imported from a folder near the executable when the software is launched.

Each playlist is a folder that includes a chosen number `n` of playable "notes" (can be one note or ambient noise) and each note is numbered from `1` to `n`.  

Here is a look at the Escalarmonie file hierarchy for a project with two playlists:

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

Playlists also contain thumbnail images that are displayed in the UI. Each playlist's settings are stored in a settings.json file. They contain several settings that allow you to modify the behavior and sound of the keys:

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

For example, `AudioIsLooping` is used mainly to set up _soundscapes_ that have looping sounds like a forest or a beach.

`AttackDuration`, `RealeaseDuration` and`IsAudioLooping` control audio sources directly, while`HighpassCutoff`, `LowpassCurtoff` and `Distortion` control the _audio mixing_ of _Unity_.

![Audio filtering effect in a Unity mixer](/images/blog/Escalarmonie/Mixer.webp)

All these effects allow you to create complex soundscapes and adjust audio tracks without having to re-export audio samples.

![A test with multiple instruments](/images/blog/Escalarmonie/MultpleInstruments.mp4)

![Forest soundscape](/images/blog/Escalarmonie/ForestSounds.mp4)

## User Interface

I designed the user interface with the goal of making visitors want to change their playlists. The goal was to have a simple and welcoming interface for novices. A second goal was to display information about the operation of the installation for verification / debugging purposes.

I divided the interface into two sections:

- Upper section (main) for playlist selection
- Lower section (secondary) that displays debug info

<EscalarmonieUISwitch/>

The main section can be interacted with on a touchscreen (or with a mouse) and allows you to change playlists instantly. In the second part, there is information about the connection and a list of the currently detected and pressed keys.

To add some life to the _IU_, I added a feature that makes the app take the color of the selected playlist thumbnail as its theme. When the current playlist changes, the accent colors and background gradient also change color.

I used [ColorThief for Unity](https://github.com/chiutse/ColorThief) to extract the main color of the thumbnails of the playlists. I then used this color to change the overall tint of the app elements.

Example of changing the interface's color based on a hue:
<EscalarmonieHueSlider/>

I used various _ShaderGraphs_ to modify the colors of the interfaces and images. They allowed me to change them dynamically and filter the images. I used _URP_ as the rendering engine to make this possible. For the animations I used [DoTween](https://dotween.demigiant.com/) which allowed me to animate changes in interface state, such as changes in accent colors or the state of interface elements.

![ShaderGraph controlling the appearance of playlist thumbnails](/images/blog/Escalarmonie/ShaderGraph.webp)

The app interface is highly adaptive, allowing for the display of a variable number of _playlists_ and available keys. The display and management of the application states are directed by a few _manager scripts_ that control the communication between the user interface and the internal state of the audio system.

<EscalarmonieKeySlider/>

# Spawn! Festival

The installation was installed in the Enjmin building for the **Spawn!** festival. It remained installed throughout the festival and behaved as intended. We were very pleasantly surprised by the public's enthusiasm for the installation and the creative uses that were made of it.

![Escalarmonie installation during the Spawn! festival](/images/blog/Escalarmonie/DemoSpawn.mp4)

The project was very interesting from both a technical and project management perspective. Budget requirements led us to find alternative solutions for our issues, such as visitor detection and audio management. The source code of the project is available on [Github](https://github.com/Escalharmonie).

This project would not have been possible without the financial support of **Enjmin** and the **Spawn!** festival, and we are truly grateful for their help.
