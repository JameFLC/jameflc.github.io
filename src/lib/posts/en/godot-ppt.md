---
title: Transforming the Godot engine into a powerfull 3D Powerpoint
description: How Godot saved my presentation by being a really competent 3D presentation engine and how to animate any property of a scene.
thumbnail: '/images/thumbnails/PowerpointInGodot.webp'
date: '2025-05-10'
type: project
tags:
  - godot
  - animation
  - tool
published: true
---

<script>
	import ImageLine from "../../components/blog/layout/ImageLine.svelte"
	import IslandSlides from "../../components/blog/widgets/proceduralIslands/IslandSlides.svelte"
	import IslandPlacementSlides from "../../components/blog/widgets/proceduralIslands/IslandPlacementSlides.svelte"
	import KeptIslandsOffsets from "../../components/blog/widgets/proceduralIslands/slides/KeptIslandsOffsets.svelte"
	import VoronoiSlider from "../../components/blog/widgets/proceduralIslands/VoronoiSlider.svelte"
	import KeptIslandsNoOffsets from "../../components/blog/widgets/proceduralIslands/slides/KeptIslandsNoOffsets.svelte"
	import SlideShow from "../../components/blog/widgets/SlideShow.svelte"

	const i2 = [ 'https://picsum.photos/id/318/320/200', 'https://picsum.photos/id/620/320/200' ];

	const i3 = ['https://picsum.photos/id/642/320/200', 'https://picsum.photos/id/643/320/200', 'https://picsum.photos/id/802/320/200'];

	const i4 = ['https://picsum.photos/id/731/320/200', 'https://picsum.photos/id/739/320/200', 'https://picsum.photos/id/742/320/200', 'https://picsum.photos/id/779/320/200'];

</script>

One of the most striking features of this problem is that the negative impact of the key factor enforces the overall effect of the corporate asset growth. This seems to be a concurrently obvious step towards the diverse sources of information.

Thus, a number of brand new approaches has been tested during the the improvement of the grand strategy. However, we can also agree that the framework of the comprehensive methods should focus on the primary element. This seems to be a presumably obvious step towards the valuable information.

Having just scratched the surface of what is possible with scroll-driven animations, I knew a blog post was in order to show off some of the incredible features of scroll-driven animations.

## Voronoi

<VoronoiSlider/>

## Flying Island Generator

<IslandSlides/>

# Why make such a thing ?

When you apply animations to elements, they use the document timeline to track the progress of the animation including any delays before starting the animation, and then the duration of the animation itself

Because [scroll-driven animations](https://jame.works/unityanimationsystem) are based on scroll progress **and** not _time_ durations, the document `timeline` doesn’t make sense when starting to think about <u>animating elements</u> based on scroll position.

This is why scroll-driven ~~animations introduced~~ the animation-timeline <mark>property which</mark> allows us to target two new types of animation timelines that will be used to create scroll-driven animations.

As you can imagine writing js is quite simple for basic things like printing to the console, you can just type `console.log('hello world')` and your good to go !

Just in case you can improve you pc performances by using the power increase shortcut: <kbd>alt</kbd>+<kbd>f4</kbd>

If you find this site too boring then you can press <kbd>ctrl</kbd>+<kbd>w</kbd>

Does this looks ok ? <kbd>ctrl</kbd>+<kbd>alt</kbd>+<kbd>shift</kbd>+<kbd>win</kbd>+<kbd>l</kbd>

# Here is a table

| Comparison | Unreal 5                 | Unity                           |
| :--------- | ------------------------ | ------------------------------- |
| Language   | C++ / Blueprint          | C#                              |
| Groups     | Blueprints               | Prefabs                         |
| Rendering  | Classic / Lumen + Nanite | SPR URP HDRP CustomRP UnifiedRP |

| Comparison | Unreal 5                 | Unity                           |
| :--------- | ------------------------ | ------------------------------- |
| Language   | C++ / Blueprint          | C#                              |
| Groups     | Blueprints               | Prefabs                         |
| Rendering  | Classic / Lumen + Nanite | SPR URP HDRP CustomRP UnifiedRP |
| Hello      | Worldd                   | bhbbash                         |

Here is some text

# Here is some H1

Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni molestias natus dolorem iusto beatae voluptates corporis amet, dolor atque repellat sit tempore!

![What a nice gif](https://www.jame.works/images/jpcoffe-jeanpierrecoffe.gif)

## Here is some H2

Dicta eius odit omnis excepturi error, repudiandae corrupti perspiciatis doloremque placeat quia quae recusandae quibusdam debitis nam nihil animi delectus similique est molestiae consectetur eos sit, expedita aperiam.

<ImageLine alt="Here is two pretty images" images={i2}/>

### Here is some H3

Dicta eius odit omnis excepturi error, repudiandae corrupti perspiciatis doloremque placeat quia quae recusandae quibusdam debitis nam nihil animi delectus similique est molestiae consectetur eos sit, expedita aperiam.
<ImageLine alt="Look ! There is now three images !" images={i3}/>

#### Here is some H4

Dicta eius odit omnis excepturi error, repudiandae corrupti perspiciatis doloremque placeat quia quae recusandae quibusdam debitis nam nihil animi delectus similique est molestiae consectetur eos sit, expedita aperiam.

<ImageLine alt="Event foor at the same time ? Yep !" images={i4}/>

Dicta eius odit omnis excepturi error, repudiandae corrupti perspiciatis doloremque placeat quia quae recusandae quibusdam debitis nam nihil animi delectus similique est molestiae consectetur eos sit, expedita aperiam.

##### Here is some H5

Dicta eius odit omnis excepturi error, repudiandae corrupti perspiciatis doloremque placeat quia quae recusandae quibusdam debitis nam nihil animi delectus similique est molestiae consectetur eos sit, expedita aperiam.

###### For some reason html has a H6

Why not after all ??? I think...

### GDScript

```gdscript
extends Node3D

@export var color: Color = Color.BLACK:
	set(new_value):
		color = new_value
		$Drawer.color = color
	get:
		return color
@export var thickness: float = 4:
	set(new_value):
		thickness = new_value
		$Drawer.thickness = thickness
	get:
		return thickness

func _ready() -> void:
	$Drawer.color = color
	$Drawer.thickness = thickness
```

### C#

```csharp
// Start is called before the first frame update
void Start()
{
	if (prefab is null)
	{
		Debug.LogError("Missing prefab");
		Destroy(this);
	}

	FirstPass();
}
```

```csharp
namespace AIDevGallery.Controls;
internal partial class AnimatedImage : UserControl
{
    public static readonly DependencyProperty ImageUrlProperty = DependencyProperty.Register(
        nameof(ImageUrl),
        typeof(Uri),
        typeof(AnimatedImage),
        new PropertyMetadata(defaultValue: null, (d, e) => ((AnimatedImage)d).IsImageChanged((Uri)e.OldValue, (Uri)e.NewValue)));

    public Uri ImageUrl
    {
        get => (Uri)GetValue(ImageUrlProperty);
        set => SetValue(ImageUrlProperty, value);
    }

    public AnimatedImage()
    {
        this.InitializeComponent();
    }
```

## Slides

<IslandSlides/>

Here's a small demo showing how the algorithm works... Imagine a cool slider that lets you peek behind the scenes of creating an awesome procedural island! As you drag the slider, you'll see the magic happen step by step. Start at the beginning, and watch a blank canvas transform into a totally unique island. First, it's just random bumps and noise.

![Image of the islands in game](/images/gallery/ProceduralGen.webp)

Then, boom – erosion kicks in, and suddenly the terrain looks super realistic, with valleys and mountains taking shape. Slide a bit more, and watch colors pop up representing different biomes – maybe some lush green forests, rocky highlands, or sandy beaches. Keep going, and you'll see tiny details emerge like rivers cutting through the landscape, beaches forming along the coastline, and vegetation sprouting up. It's like watching an entire world come to life right before your eyes, with each movement of the slider revealing another layer of complexity. Pretty neat, right?

## Slides min 4

<IslandSlides rangeMin={4}/>

## Slides max 4

<IslandSlides rangeMax={4}/>

## Slides 4 to 8

<IslandSlides rangeMin={4} rangeMax={8}/>

## Slide 4

<IslandSlides rangeMin={4} rangeMax={4}/>

## Empty slide

<SlideShow slides={[]}/>

## Manual slide

<IslandPlacementSlides/>

### Wasm

```wasm
(module
	;; add the $even_check function to the top of the module
	(func $even_check (param $n i32) (result i32)
		local.get $n
		i32.const 2
		i32.rem_u ;; if you take the remainder of a division by 2
		i32.const 0 ;; even numbers will have a remainder 0
		i32.eq ;; $n % 2 == 0
	)
	;; add the $eq_2 function after $even_check
	(func $eq_2 (param $n i32) (result i32)
		local.get $n
		i32.const 2
		i32.eq ;; returns 1 if $n == 2
	)

	;; add $multiple_check after $eq_2
	(func $multiple_check (param $n i32) (param $m i32) (result i32)
		local.get $n
		local.get $m
		i32.rem_u ;; get the remainder of $n / $m
		i32.const 0 ;; I want to know if the remainder is 0
		i32.eq ;; that will tell us if $n is a multiple of $m
	)

	;; add the is_prime exported function after $multiple_check
	(func (export "is_prime") (param $n i32) (result i32)
		(local $i i32)
		(if (i32.eq (local.get $n) (i32.const 1)) ;; 1 is not prime
		(then
			i32.const 0
			return
		))
		(if (call $eq_2 (local.get $n)) ;; check to see if $n is 2
		(then
			i32.const 1 ;; 2 is prime
			return
		)
	)
	(block $not_prime
		(call $even_check (local.get $n))
		br_if $not_prime ;; even numbers are not prime (except 2)

		(local.set $i (i32.const 1))
		(loop $prime_test_loop

			(local.tee $i (i32.add (local.get $i) (i32.const 2) ) ) ;; $i += 2
			local.get $n ;; stack = [$n, $i]

			i32.ge_u ;; $i >= $n
			if ;; if $i >= $n, $n is prime
				i32.const 1
			return
			end
			(call $multiple_check (local.get $n) (local.get $i))
			br_if $not_prime ;; if $n is a multiple of $i this is not prime
			br $prime_test_loop ;; branch back to top of loop
			) ;; end of $prime_test_loop loop
		) ;; end of $not_prime block

i32.const 0 ;; return false
 )
) ;; end of module
```
