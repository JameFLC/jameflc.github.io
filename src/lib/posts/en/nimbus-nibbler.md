---
title: Generating procedural islands
description: How the game Nimbus Nibbler uses different procedural generation algorithms to create an organic world.
date: '2025-08-01'
thumbnail: '/images/thumbnails/Islands.webp'
type: project
tags:
  - unity
  - 3d
  - génération
published: true
---

<script>
	import AStarIslandsSlides from "../../components/blog/widgets/proceduralIslands/AStarIslandsSlides.svelte"
	import ImageLine from "../../components/blog/layout/ImageLine.svelte"
	import IslandPlacementSlides from "../../components/blog/widgets/proceduralIslands/IslandPlacementSlides.svelte"
	import IslandSlides from "../../components/blog/widgets/proceduralIslands/IslandSlides.svelte"
	import KeptIslandsNoOffsets from "../../components/blog/widgets/proceduralIslands/slides/KeptIslandsNoOffsets.svelte"
	import VoronoiSlider from "../../components/blog/widgets/proceduralIslands/VoronoiSlider.svelte"
  import IslandSlotAnim from "../../components/blog/widgets/proceduralIslands/IslandSlotAnim.svelte"


  const noiseLine = [ '/images/blog/ProceduralIslands/PerlinNoise.webp', '/images/blog/ProceduralIslands/BlueNoise.webp', "/images/blog/ProceduralIslands/VoronoiNoise.webp" ];

  const islandsGroupsLine = [ '/images/blog/ProceduralIslands/SmallIslandsFormation.webp', '/images/blog/ProceduralIslands/BigIslandsFormation.webp' ]; 
  
  const imageTilingSlide = [ '/images/blog/ProceduralIslands/RepeatingTexture.webp', '/images/blog/ProceduralIslands/UnRepeatingTexture.webp' ]; 


</script>

Hello, hi. Today's subject will be about procedural generation, in particular generating flying islands. This is a common problem with a plethora of solutions, all of which have their pros and cons.
Il s'agit d'un problème ayant un très grand nombre de solutions qui ont toutes leurs avantages et leurs inconvénients. I would like to discuss the one I used to create the game **Nimbus Nibbler**.

Don't worry, although the system is based on standard methods, I'm sure you'll find something useful here. My goal was to create a system that was easy to control, with simple algorithms, and that produced an organic look and feel.

![Image of flying islands in Nimbus Nibbler](/images/blog/ProceduralIslands/FlyingIslands.webp)

## How does it work?

Well, broadly speaking, the system displays various flying islands on a grid, then generates suspension bridges to connect them. So far, nothing special, there are many generators that do this, particularly in roguelike games.

### The popular algorithm

These systems generally operate in two main stages:

1. Place islands randomly on a grid
2. Generate paths connecting them using an algorithm such as _A\*_

Here is what it looks like generally:

<AStarIslandsSlides/>

However, these systems can be complex to use to get specific looks:

- Controlling the generation can require advanced tools and/or algorithms.
- Creating organic, non-repetitive distribution can be complicated.
- The grid effect is often very visible.
- Path generation requires pathfinding algorithms such as _A\*_.
- Preventing paths from overlapping requires special attention.

### A straightforward method

In the context of a small project, rather than starting with a complex system that requires a lot of work to remove edge cases, would it be possible to bypass certain issues entirely by using a much simpler system?

Well, yes! That's why this article exists.

If we make the problem simpler by adding restrictions, there is a lot of complexity that can be discarded completely.

For example, if we consider that each island can only be connected to an adjacent island, we greatly reduce the problems associated with path generation. We can guarantee that there will be no islands with overlapping bridges. There is no risk of having bridges that are too long for gameplay. We can reduce the number of cells in the grid and increase the density of the islands to reduce the number of squares and therefore the number of calculations and their complexity.

### The procedural textures approach

I was inspired by the methods used to create procedural textures, using noise and filters. This is also how terrain is generated using tools such as _World Builder_ or _Gaia_, and even directly in games such as _Minecraft_.

I represented the generation grid as a 2D image containing pixels with values ranging from `0.0` to `1.0`, and applied modifications to define the appearance of the islands. This allowed me to visually prototype the generator in an image editor called _Affinity Photo_. I could add noise and filters visually to see the result in real-time.

I already had a fairly clear idea of the specifications I wanted for the generator:

1. Have islands that appear organic.

2. Have a higher density of islands in the center of the play area.

3. Avoid having very dense blocks of islands (e.g., 2x2) that are all connected.

4. Always have an island in the center of the grid to spawn the player controller.

5. Keep the number of orphan islands fairly low.

And, as luck would have it, this hierarchy of requirements can easily map to a series of layers in an image and, by extension, into stages of generation.

#### Organic spawn

The generator starts by creating a grid/image of the desired size and applies a noise filter to it. To do this, I created a small utility that uses _Unity_'s math library to sample _Perlin noise_, _blue noise_, or _cellular noise_. The user can choose the type of noise to experiment with.

<ImageLine alt="Noise textures: Perlin noise, blue noise, cellular noise" images={noiseLine}/>

Voici ce que cela donne dans le jeu.

<IslandSlides rangeMin={1} rangeMax={2}/>

At the end of the generation, cells with a value greater than `0.5` will cause islands to appear.

#### Variable density

To have a higher density of islands in the center of the grid, I create a circular gradient centered on the grid that has a value of `1.0` in the center and a value of `0.0` on the outside. Then, I simply multiply the noise by the gradient to have a higher density in the center of the level.

<IslandSlides rangeMin={2} rangeMax={4}/>

Internally, the gradient is generated using a Gaussian distribution function. Its size and whether it is smooth or abrupt can be controlled to regulate the density of the islands.

#### Preventing having all cells with an island

The center of the grid has a high probability of spawning islands. To avoid having areas full of islands, I used a mask that creates “holes” in the grid. The mask itself is a hexagonal shape that reduces the grid effect and solves density issues.

<IslandSlides rangeMin={4} rangeMax={6}/>

#### Center Island

`image[center][center] = 1.0f;` 👀

_Well, not much to say about that..._

#### Island spawn threshold

Now that the spawn _texture_ of the islands has been created and filtered, all that remains is to perform _thresholding_. All cells with a value greater than or equal to `0.5` will spawn a flying island. This generates a _binary mask_ to spawn the islands.

<IslandSlides rangeMin={7} rangeMax={9}/>

#### Reducing the number of orphan islands

This technique has one issue that could be important for some. Since it generates islandes based on masks, it can generate multiple groups of connected islands and even islands that are not connected to any other one, i will call them **orphan islands**.

With the current method and grid size, I haven't had many orphan islands, so it was not really an issue for me. I tested with very large grids, and in these situations the problem occurs more often.

In the event that I needed to use very large grids, I would have had several possible approaches to solve this problem, for example:

- Keep only the central group of islands using a flood fill algorithm.

- Force the appearance of new islands in empty areas that can reconnect several groups of islands.

- Force the generation of bridges between two groups of islands.

# Generation and placement of each island

Ok, we are getting somewhere, the system has chosen which cells on the grid will spawn islands. Now we just need to manage the appearance of these islands.

Island spawners have a weighted list of island types to spawn and randomly select the type for each grid cell.

## Semi procedural islands

There are 4 types of islands, 2 natural islands and 2 fortified islands. To add variety to the generation, each island itself contains decoration _spawners_. Each _spawner_ has a weighted list of prefabs that it can spawn.

Here, a _spawner_ contains three different decorations. By pressing the button, you can start and restart a generation process.
<IslandSlotAnim/>

Each decoration can contain other _spawners_. For example, a column can spawn a roof -> a roof can spawn a tower -> a tower can spawn a propeller.
When a spawner spawns a decoration, it checks whether it contains other spawners and activates them. The system continues until all spawners have been activated.

This system allows for a large number of variations per island type while keeping the number of bespoke assets limited.

## Shifting islands in their cells

Now that we have a large number of different islands, the issue of repetition is almost resolved. However, the problem of island placement remains. Since each island is placed on the squares of a grid, it is very easy to see this structure.

<IslandSlides rangeMin={9} rangeMax={9}/>

This problem also arises when creating tilling textures. The human brain is very good at recognizing repetitive patterns, so if you apply a tilling texture, it is very easy to spot the repetition : One solution that works for textures is to **shift it** each repetition.

<ImageLine alt="One image that is repeated simply and one with rotation variation for each repetition." images={imageTilingSlide}/>

In our case, by moving randomly each island within its grid cell as well as vertically, we can make the grid structure disappear almost completely.

<IslandSlides rangeMin={9} rangeMax={11}/>

Here's how it looks in the game:

<ImageLine alt="Deux groupements d'îles générés de tailles différentes" images={islandsGroupsLine}/>

### Algorithme

If you look at this technique more closely, you will see that it is very similar to an algorithm used to create noise textures: _cellular noise_ or _Voronoi noise_. This algorithm randomly selects points placed in each cell of a grid and calculates the distance to the nearest point for each pixel.

<VoronoiSlider/>

Yes, you can create _Voronoi_ noise natively in _HTML_ and _CSS_ (no canvas or shader trickery). It's wonderful what you can do with gradients and blend modes.

# Bridge generation

We now have several islands appearing in the void, all that remains is to connect them together!
The first step is to choose which bridges will appear.

## Bridges spawn selection

To ensure an appropriate number of bridges per island, I implemented a two-step selection process:

1. First, each island checks whether it is adjacent to another island in the cardinal directions.
2. If this is not the case, it checks whether it is adjacent to other islands in the diagonals.

This allows for a reasonable number of bridges while greatly reducing the number of orphan islands.

![Diagram of the two stages of verification for neighboring islands](/images/blog/ProceduralIslands/IslandsChose.svg)

Note that in reality, islands are only responsible for their connections in half of the directions, for example, **North**, **Northeast**, **East**, and **Southeast**. This applies to island detection and bridge generation. Connections in other directions are managed by neighboring islands.

![Example of connection management in a group of islands; the dark arrows represent a spawned bridge.](/images/blog/ProceduralIslands/IslandsConnections.svg)

## Bridges spawn

### Handling bridges and islandṡ connections

Each island contains 8 predefined possible connection points. These connection points are a prefab that has two modes:

- Wall mode: It spawns an obstacle to prevent falling off the island, such as a barrier or wall.
- Connection mode: It spawns a transition point for the bridge, which can be oriented in the direction of the connection point on the other island.

### Path generation

To generate the suspension bridges, I used _Unity_'s _spline package_. It allows you to generate 2D or 3D curves the scene and to spawn objects along these curves.

To keep the bridge generation as simple as possible, I performed most of the curve calculations in 2D. First, I project the bridge connection points onto a 2D plane. I then generate a 2D curve that resembles a suspension bridge. Next, I rotate this curve in the direction of the other island.
Finally, bridge modules are spawned along the curve, which is handled directly by the package.

# Results

Here is one last widget to summarize the steps involved in creating islands.

<IslandSlides/>

This project was a good way for me to experiment with different methods of procedural generation. The goal was to quickly create a flying island generator using methods inspired by texture generation. I was pleasantly surprised by the result of these simple steps.

If you want to try **Nimbus Nibler** you can find it on itch.io
