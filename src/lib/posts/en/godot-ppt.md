---
title: Transforming the Godot engine into a powerfull 3D Powerpoint
description: How Godot saved my presentation by being a really competent 3D presentation engine and how to animate any property of a scene.
thumbnail: '/images/thumbnails/PowerpointInGodot.webp'
date: '2025-08-28'
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

Hello, hi. Today, I'm going to present a project that involved adding **PowerPoint** features to the **Godot** _game engine_. Transforming the engine into a tool for creating interactive 3D presentations.

![Example of a slide with 2D (left) and 3D (right) elements](/images/blog/GodotPPT/2D3DHybrid.webp)

# Why would you do such a thing?

This project is fundamentally linked to my final project for my second year at engineering school at the **Cnam**. I conducted a state-of-the-art review on a topic that I had chosen: **Methods for rendering light in 3D video games and their evolution to the present day**. The subject is very broad and very technical. So I focused on three major aspects of the subject for my research:

- Object surfaces and materials
- Cast shadows
- Bounced light: Global Illumination and Ambient Occlusion

The document I produced was **127** pages long (including the appendix).

I also had the task of presenting my research at the end of the year during a presentation that would last **about twenty minutes**. It therefore had to be as visual as possible to enable the audience to intuitively understand the concepts presented. The most effective way to explain light transport simulation was also to produce a large number of visualizations.

![Example of a slide containing a 3D algorithm visualization](/images/blog/GodotPPT/IntroAnimation.webp)

## The issue with PowerPoint

PowerPoint is a very comprehensive presentation software program. It allows you to easily create slides. It has many animation and transition features. It includes a presenter mode that allows you to view your notes for each slide during presentations. And, **technically**, PowerPoint can import 3D models and animate them in a rudimentary way.

However, the software becomes complex to use when the main content consists of images and videos. It requires a lot of manual work to position images correctly, objects end up being selected accidentally, and transitions between slides that contain videos are often abrupt. Furthermore, it is a pain to synchronize two videos on two different slides.

Given the number of visualizations I was going to have to include in my presentation, the option of using traditional presentation software quickly became unthinkable.

## Alternative approaches

 
There are alternative presentation creation options that work very well for visualization. Some software allows you to create presentations/animations using code, for example:

- [Manim](https://www.manim.community/)
- [React Flow](https://reactflow.dev/)
- [Motion Canvas](https://motioncanvas.io/)

<ImageLine alt="Manim, React Flow and MotionCanvas" images={codeAnimators} aspectRatio={16/9}/>

These libraries allow for advanced visualizations with a high degree of control. Manim, for example, has basic 3D rendering capabilities. However, none of these libraries contain a realistic 3D rendering engine with _drop shadows_, _PBR materials_, or _global illumination_. I would have had to have developed an advanced rendering system using _OpenGL_, _WebGL_ or _ThreeJS_, which would have required more work than I could provide in the time available before the presentation.

So I turned to more classic _game engines_ that gave me access to their _renderers_, _3D_ scene editing, _2D_ scene editing and _user interface_ creation:

- **Unreal Engine**
- **Unity Engine**
- **Godot Engine**

I had experience with all three engines, and after some testing, I settled on **Godot**. The engine had all the feature combinations I needed to build a presentation engine:

- Quite advanced and dynamically flexible rendering engine
  - Ability to change rendering settings very easily
- Property reflection system
  - The engine allows access to each property of each _node_ without the need to create specific interfaces
- Advanced _tweening_ system
  - Ability to animate almost all properties of scene nodes using the reflection system
- Drag-and-drop interface creation system for making text slides
  - Very handy for replacing the _workflow_ of classic presentation software

![Godot editor in a scene using the slides system](/images/blog/GodotPPT/GodotEditor.webp)

# Developement

I started creating the library on **February 5, 2024** for a presentation scheduled for **April 25, 2024**. I developed the project entirely in my spare time during those **two months**. To test how my library worked, I also planned to use it for a brief presentation on my career path at the University Institute of Technology in Le Puy-en-Velay on **February 22, 2024**.

![Project plan for the two months](/images/blog/GodotPPT/Planning.svg)

For the February presentation, the library was quite rudimentary. It includes the important basics for presentation software: _keyframe_ system, transitions, _slides_ and presentation control interfaces.
I blended both _2D_ and _3D_ elements to test the engine's behavior, and the results were very promising.

![Slide using the MVP version of the library](/images/blog/GodotPPT/OldVersion.webp)

I then continued developing the library to add the missing features for the April presentation and did a lot of work refactoring existing features.

# The lib features

The _slides_ system incorporates many of the features of presentation software while being designed to maintain the greatest flexibility in the engine.

- _Keyframes_ system that can animate properties present in the engine
  - Object property _tweening_
    - Position, rotation, scale, color, brightness, materials, _post-processing_
  - Controlling the _timelines_ of `AnimationPlayers`
- Template scenes for text slides with automations
  - Introduction, bullet points, text, etc.
- Slide control via keyboard or mouse
  - Custom _UI_
- Presenter mode in a second window containing notes and a preview
  - Can be displayed on a second screen
- System for displaying 2D shapes in 3D space
  - Arrows, lines, polygons, wireframes, etc.

## Keyframe animation system

The animation system is based on a hierarchy of _nodes_ placed in the scene. The main _node_ is the Timeline _node_, it runs the animation system. It has keyframe _nodes_ as children. To animate several properties simultaneously, keyframe _nodes_ can contain other Keyframe _nodes_ that play simultaneously with their parent.

Hierarchy of a timeline inside a scene:

```
 ○ Root
 └── ○ Timeline
     ├── ○ Keyframe 1
     │   ├── ○ SubKeyframe 1.1
     │   ├── ○ SubKeyframe 1.2
     │   ├── ○ SubKeyframe 1.3
     │   └── ○ SubKeyframe 1.4
     ├── ○ Keyframe 2
     │   ├── ○ SubKeyframe 2.1
     │   ├── ○ SubKeyframe 2.2
     │   └── ○ SubKeyframe 2.3
     ├── ○ Keyframe 3
     │   └── ○ SubKeyframe 3.1
     └── ○ Keyframe 4
```

This hierarchy corresponds to a presentation with 4 slides with transitions of varying complexity.

![Example of keyframe hierarchy for a Longer Presentation in the Godot Editor](/images/blog/GodotPPT/Outliner.webp)

Keyframes are _nodes_ that have a _script_ attached that inherits from the `PropertyKeyframe` class. This _class_ contains the basic data needed to perform a transition:

- Reference to the _node_ and its _property_ that should be animated
- Inherits from a _tweening_ management _class_
- Reference to the previous and next _Keyframe_ if they exist

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

To animate specific properties, I have implemented specialized _classes_ that have specific parameters: `ColorPropertyKeyframe`, `Vector3PropertyKeyframe`, `Vector2PropertyKeyframe`, `BoolPropertyKeyframe`.

Exemple with a `ColorPropertyKeyframe` :

```gdscript
extends PropertyKeyframe

@export var end_value : Color = Color.WHITE

func _ready() -> void:
_end_value = end_value
super()
```

![Vector 3 keyframe example in the godot editor](/images/blog/GodotPPT/Vector3Editor.webp)

`Keyframes` are controlled by the `Timeline` _script_. This _script_ controls the execution of animations and the management of keyframes:

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

## Slides templates

To make the library easier to use, I created a few _UI_ scenes that I use as slide templates. These templates serve as a basis for standard slides: introduction, summary, bullet points, etc. These scenes have properties that can be modified from the _details panel_ inside the editor.

![Section title template scene](/images/blog/GodotPPT/SlideTemplate.webp)

I added `@tool` _scripts_ that allow me to update these templates when their properties are changed. For example, modifying the title, the number of bullet points, or the section number updates the scene in the editor.

![Diagram of the connection made by scripts for slide templates](/images/blog/GodotPPT/SlideTemplateConnection.webp)

## Navigation

Navigation is done using the keyboard and mouse. The library includes a navigation widget that contains a back button, a slide selection, and a forward button.
Keyboard navigation is done using the standard keys.

![Navigation widget usable with mouse and keyboard](/images/blog/GodotPPT/NavigatorInputs.webp)

The navigation widget communicates with the rest of the system via Godot's _signals_.

## Presentation mode

I added a presenter mode to the library. This allows you to have a second window that can be placed on a second screen if needed. It displays notes for the current slide as well as a preview of the presentation. To help with time management, the window also displays the current duration of the presentation and the number of the current slide.

<ImageLine alt="Presentation on the left and notes window on the right" images={noteMode} aspectRatio={16/9}/>

Here is a demo of presenter mode:

![Presentation mode](/images/blog/GodotPPT/PresentationMode.mp4)

## 2D Shapes Overlay

To assist with the visualization, I developed a system that allows me to display 2D shapes in 3D space. This system displays lines with a constant thickness regardless of their position in the environment. By using multiple lines, it is possible to display more complex shapes such as _arrows_, _outlines_, or _wireframes_.

![Outline the shaded area of ​​a sphere](/images/blog/GodotPPT/Outline.webp)

To do this, the system uses a _node2D_ and uses the `draw_line()` functions. It references points in _3D_ space and projects them into the camera space.

2D Overlay test scene:
![2D overlay test scene](/images/blog/GodotPPT/LineSystem.mp4)

For example, in this clip, we go from a view inside a _3D_ room to a schematic _2D_ view. The scene remains in _3D_, but the system animates the camera's _FOV_ and the scene's _post-processing_ to give it a _2D_ appearance.

Transition from a 3D environment to a 2D view using the line display system:
![Transition from a 3D environment to a 2D view](/images/blog/GodotPPT/3DTo2DTransition.mp4)

# Demo

This is what the system can do for a complex presentation:

Introductory slide on light in video games:
![Introductory slide on light in video games](/images/blog/GodotPPT/Intro.mp4)

![Introductory slide on 3D rendering methods](/images/blog/GodotPPT/IntroAnimation.webp)

Introductory slide on global illumination with activation in the engine:
![Introductory slide on global illumination with activation in the engine](/images/blog/GodotPPT/GlobalIllumination.mp4)

![Presentation conclusion](/images/blog/GodotPPT/Outro.webp)

After making a few minor changes, I was able to add web export for presentations. Here is one made specifically for this article (it is in French, but the text does not really matter).

The library was designed to be used in a native desktop application context. It is therefore possible that the demo may have performance issues that are not present in the full version. _Shader_ compilation causes freezes when displaying new _materials_, but it happens only once per new _material_, after that, it should be smooth. This is because Godot 4.3's web export is mono-threaded by default for compatibility reasons.

Press the button to start the presentation:

<Presentation3D/>

# Conclusion

This project was very intense and very interesting. I learned a lot about the internal specifics of Godot and the issues involved in animation systems. I was able to give my presentation on the state of the art on time. I also presented it at work and received very positive feedback.

The library is not final, it was made mainly as a proof of concept, it contains a few bugs and could use some work in terms of usability. I would very much like to revisit this project and fix these remaining bugs and issues so that it can become a truly useful library for others. If anyone is interested in the library in its current state, I am open to making it available.
