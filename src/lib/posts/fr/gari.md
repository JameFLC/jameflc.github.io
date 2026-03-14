---
title: Gari, l'assistant vocal moustachu
description: Un projet de création d'un miroir connecté avec son propre assistant vocal fonctionnel, créé de toutes pièce.
date: '2026-02-18'
thumbnail: '/images/thumbnails/Gari.webp'
type: project
tags:
  - godot
  - sdf
  - iot
published: true
---

<script>

  import ImageLine from "../../components/blog/layout/ImageLine.svelte"
  const gariVersions = [ '/images/blog/Gari/Gari_V1.webp', '/images/blog/Gari/Gari_V2.webp'];
  const godotApps = [ '/images/blog/Gari/MaterialMaker.webp', '/images/blog/Gari/Pixelorama.webp'];
</script>

Bonjour, bonjour. Aujourd'hui, je vais vous présenter le projet **Gari**. Gari est un miroir connecté pas tout à fait comme les autres...

![Gari, le miroir connecté - Jame derrière l'appareil et Lucas derrière le miroir](/images/blog/Gari/Gari_Built.webp)

En effet peu, de miroirs peuvent émerveiller avec leur sublime moustache ! Une vraie tragédie à mon humble avis.

J'ai fabriqué Gari entre décembre 2024 et janvier 25 dans le contexte d'une introduction à la création d'application cloud / de domotique à l'Enjmin. Ce projet était une occasion de réaliser l'envie de créer mon propre assistant après avoir suivi de loin l'avancée de [Léon](https://getleon.ai/) un assistant vocal open source. 

L'objectif était de réaliser un miroir de domotique qui ne se basait sur aucune des solutions existantes comme [Magic Mirror](https://magicmirror.builders/) ou autre.
Toutes les fonctionnalités du miroir ont donc été créées de toutes pièces:
- Interface client
	- Godot
- Infrastructure Cloud
	- Azure
	- OpenAI
	- OpenWeather
	- Alpha Vantage
- Construction physique
	- Du brique à braque et des vis

J'ai réalisé ce projet avec l'aide de [Lucas Le Dudal](https://github.com/Cava3/) qui m'a aidé pour les différentes étapes de construction.

# Features de Gari

Gari est un assistant vocal intégré à un miroir. Il supporte la communication vocale générale ainsi que l'affichage de données visuelles pour certains sujets. Il permet de répondre à toutes sortes de questions, d'afficher la météo, de suivre la bourse et même de refléter les objets et les gens !

![Gari, le miroir connecté - Jame derrière l'appareil et Lucas derrière le miroir](/images/blog/Gari/WeatherQuestion.webm)

![Gari, le miroir connecté - Jame derrière l'appareil et Lucas derrière le miroir](/images/blog/Gari/StockQuestion.webm)

J'ai utilisé les API d'**OpenAI** pour donner à Gari la possibilité de répondre naturellement à la majorité des questions. J'ai également ajouté le support d'intégration avec des services de données externes pour les données météo et de bourses.

Comme on peut le voir dans cette vidéo les réponses issues de **Chat GPT** en début 2025 n'étaient pas toujours les plus fiables...
![Gari, le miroir connecté - Jame derrière l'appareil et Lucas derrière le miroir](/images/blog/Gari/Gari_Question_Cropped.webm)

Maintenant qu'on connaît les capacités de notre assistant moustachu préféré (excusez-moi Alfred) nous allons pouvoir rentrer un peu plus dans les détails.

# Application Locale

Gari est composé de deux parties : un service cloud d'analyse de question et une application locale. Cette partie locale a pour but de détecter les requêtes, de les transférer à un service de traitement dans le cloud, puis de communiquer les informations reçues à la personne qui a fait la requête.

Cette application a été développée avec le moteur **Godot**. Ça peut paraitre étrange pour ce genre d'application mais il existe en réalité plusieurs logiciels classiques qui l'utilisent. Et, j'avais envie de continuer à expérimenter avec le moteur.

<ImageLine alt="Material Maker et Pixelorama" images={godotApps} aspectRatio={16/9}/>

En plus, **Godot** contient une suite de fonctionnalités très utiles pour les fonctionnalités que j'avais en tête:
- Système de création d'**UI** graphique
- Système de shaders pour du rendu custom
- Système d'animation avancé
- Gestion du son
- Intégration avec **NuGet**
## Pipeline de data

Pour la détection de commandes et l'envoi de l'audio, j'ai utilisé la librairie [Vosk](https://alphacephei.com/vosk/). Un **toolkit** de reconnaissance vocale local qui me permettait de chercher des mots **tags** pour lancer l'enregistrement. J'ai également utilisé [NAudio](https://github.com/naudio/NAudio) pour la gestion des flux audio plutôt que de passer directement par **Godot** pour pouvoir tester mon système sans avoir le moteur lancé.

Le système recherche continuellement différents **tags** `["Gary", "Gari", "Carrie"]` et lance l'enregistrement audio des qu'un **tag** est reconnu. Au moment où **Vosk** détecte que la phrase est finie, alors l'enregistrement est terminé et le blob/buffer audio est envoyé à mon service de reconnaissance hébergé chez **Azure**. 

Une fois que la demande est traitée, le service renvoie une réponse **HTTP** `multipart/mixed` qui contient deux parties. La première partie est un objet **JSON** contenant la version texte de l'audio généré, des informations du type de la réponse et des information  additionnelles optionnelles. La seconde partie de la réponse **HTML** est un **blob binaire** qui contient le flux audio généré.

Schéma* du type de réponse pour les requettes:
```json
{
	"type" : Enum[Regular | Weather | Stocks],
	"response": String,
	"audioTag": Enum[Speech | Quiet],
	"additional": Object[Null | WeatherObject | StockObject]
}
```

Les données additionnelles dépendent des types de réponses et sont utilisées pour créer des affichages supplémentaires pour les requêtes météos et boursières:
```json
WeatherObject
{
	"cityName": String,
	"weatherData": Array[WeatherData]
}

WeatherData
{
	"temp": Number,
	"weatherType": Number
}

StockObject
{
	"companyName": String,
	"companyCode": String,
	"stockData": Array[Number]
}

```


La réponse **HTML** est convertie, et les données sont ensuite transmises aux systèmes d'UI et au système audio pour pouvoir les passer à la personne qui a posé la question.

![Pipeline de data du système](/images/blog/Gari/Pipeline.svg)

## Interface Graphique

**Godot** contient un système d'**UI** complet qui s'intègre très bien avec le reste du moteur. Cela rend la création d'éléments non standards très simple. Par exemple, il est possible de créer des "widgets" avec un affichage géré par des **shaders**, qui ont des animations complexes ou qui affichent des éléments en **3D** sans avoir à intégrer des librairies externes. 

![Concept de l'interface de Gari](/images/blog/Gari/Gari_V2_Physical_Concept.webp)

Chaque élément de l'interface est créé dans une scène **UI** avec un script à sa **root** qui permet de communiquer avec. 

### Horloge

Commençons par l'élément le plus simple de l'interface, l'horloge. Il s'agit d'une scène simple qui contient plusieurs **labels** qui sont mis à jour chaque seconde avec l'heure interne du système.

![Horloge](/images/blog/Gari/Clock.webp)

⚠️**Warning**⚠️
À la base j'avais prévu d'animer la **weight** de la police pour signifier l'activation de la commande vocale.
Par exemple avoir le texte de l'heure qui devienne gras durant l'activation.

![Animation de la weight de l'horloge](/images/blog/Gari/ClockFontWeight.webp)

Il est techniquement possible de le faire dans **Godot** en utilisant une **police variable** et en changeant les paramètres durant une animation, mais cela crée une fuite mémoire très rapidement !

Godot crée une **texture atlas** de la police pour chaque changement de paramètre. Donc, pour une animation à 60fps, **Godot** va créer une soixantaine de textures par seconde. En plus de ça, l'ancien **atlas** n'est pas supprimé automatiquement, normalement les ressources sont gérées par le **Garbage Collector** mais pas dans ce cas précis, il s'agit probablement d'un problème avec le cache interne.

Finalement, l'horloge a une police statique et d'autres éléments d'interface font le job d'indiquer l'activation.

### Météo

Le **widget** de météo permet d'afficher la météo pour les 5 prochaines heures.

![Animation de la météo](/images/blog/Gari/WeatherTransition.webp)

J'ai créé une librairie d'icônes compatible avec les icônes **OpenWeather**. Chacun d'entre eux est animé à la main et a une variation jour/nuit si applicable. Chaque icône est ensuite suite mise dans une scène séparée qui est instanciée par le **widget** météo. 

![Icones animées](/images/blog/Gari/WeatherAnimation.webp)

### Bourse

Le **widget** d'affichage des informations boursières est plus complexe que celui de la météo.
Le graphique de l'évolution boursière entièrement géré par un **shader**. Il est représenté par une fonction/courbe en **2D** qui est calculée à partir d'une **texture de gradient** générée **procéduralement**. La position dans le gradient représente l'axe X de la fonction tandis que la valeur de luminosité représente l'axe Y de la fonction.

```glsl
void fragment() {
	float gradient = texture(TEXTURE, UV * vec2(1, 0)).x;
	float y = (1.0f - UV.y * 1.02);
	float smoothness = length(SCREEN_PIXEL_SIZE);

	float is_good_stock = (sign(texture(TEXTURE, vec2(0, 0)).x - texture(TEXTURE, vec2(1, 0)).x) + 1.0f) * 0.5f;

	vec4 fill_color = mix(vec4(0.26, 0.94, 0.32, 1), vec4(0.97, 0.27, 0.37, 1), is_good_stock);

	vec4 line_color = mix(vec4(0.15, 0.94, 0.22, 1), vec4(00.97, 0.15, 0.29, 1), is_good_stock);

	float dist = y - gradient;
	float inside_mask = insideSmooth(dist, smoothness);

	float inner_line = mod((UV.x * 2.0 + UV.y)*20.0, 1.0) * inside_mask;
	inner_line = insideSmooth(-(inner_line - 0.8), smoothness);

	vec4 inner_line_color = floatToColor(inner_line) * 0.04 * line_color;

	vec4 inside = floatToColor(insideSmooth(dist, smoothness) * y * 0.5) * fill_color + inner_line_color;

	vec4 line = floatToColor(insideSmooth(dist, smoothness * 3.0)) * floatToColor(insideSmooth( -.02f - dist, smoothness * 3.0)) * line_color;

	vec4 ycolor = floatToColor(y);
	COLOR = max(inside, line) ;
	//COLOR = inner_line_color;
}
```

Édition du gradient:
![Édition du gradient](/images/blog/Gari/GraphEdition.webm)

Une des fonctionnalités qui rend **Godot** très agréable à utiliser et qui est rarement mise en avant est la facilité de <u>créer des ressources dynamiquement</u>. Cela rend le moteur très facile à utiliser pour la génération procédurale. Par exemple, j'ai utilisé cette capacité pour générer un gradient à partir des données de bourses et convertir ce gradient en une texture pour l'utiliser dans un shader.

```csharp
public Texture GenerateGraphTexture(float[] values)
    {
        Gradient gradient = new Gradient();

        float gap = 1.0f / (values.Length - 1);

        int i = 0;
        foreach (float value in values)
        {
            gradient.AddPoint(i * gap, new Color(value, 0, 0, 0));
            gradient.InterpolationMode = Gradient.InterpolationModeEnum.Linear;
            i++;
        }

        GradientTexture1D gradientTexture = new GradientTexture1D();
        gradientTexture.Gradient = gradient;
        gradientTexture.Width = 1024;

        Texture = gradientTexture;
    }

```

Et, voilà le résultat :

![Animation du graphique de bourse](/images/blog/Gari/StockAnim.webp)

### Gari en shader et en os

Le **widget** de loin le plus complexe reste **Gari** lui-même. Il s'agit de la mascotte du système qui est composée de plusieurs éléments qui représentent un visage avec une moustache. Son design était à la base une expérience de créer un visage géométrique qui utiliserait des spinners comme des yeux pour indiquer des informations pratiques (status, loading) ainsi que des émotions. La moustache, elle, permet d'indiquer si **Gari** parle tout en gardant la forme très simple, et puis les moustaches c'est plutôt cool.

Voici une suite d'animations que peut faire **Gari** :
![Différentes animations de Gari](/images/blog/Gari/Gari_Emotions.webm)

Son design a évolué au long de plusieurs projets antérieurs, mais toujours en gardant l'idée des yeux circulaires.

![Concepts de la V2 du design de Gari](/images/blog/Gari/Gari_V2_Concept.webp)

<ImageLine alt="Les différences de design entre le concept originel de Gari et la verstion réelle" images={gariVersions} aspectRatio={16/9}/>

Pour pouvoir afficher le panel d'émotions, d'états et d'animations de **Gari**, j'ai créé un **shader** basé sur les **signed distance functions (SDF)**. Ce shader comporte un certain nombre de paramètres pour contrôler le visage de **Gari**.
- `Eye Rotation` : Rotation symétrique des yeux
- `Eye Amount` : À quel point les yeux sont remplis, 0 vide, 1 cercle complet
- `Mustash Amount` : Angle de la moustache pour la discutions et l'inertie
- `Scale` : Facteur de zoom

Édition du shader de Gari:
![Édition du shader de Gari](/images/blog/Gari/SDF_Editing.webm)

Le **shader** utilise les paramètres pour générer les **SDF** qui permettent d'afficher le visage. Les éléments de la moustache sont des rectangles avec des coins avec des rayons variables. Les yeux sont des rings ayant des coins arrondis. Toutes les formules sont basées sur les travaux d'[Inigo Quilez](https://iquilezles.org/) le créateur de [Shadertoy](https://shadertoy.com). 

![Visualisation SDF de Gari](/images/blog/Gari/GariSDF.webp)

Pour gérer les transitions entre tous les états, j'ai créé plusieurs animations distinctes pour la moustache et les yeux que je contrôle à l'aide d'un `Animation Tree`. Il me permet de fusionner les différentes animations et d'effectuer des transitions entre les différentes expressions faciales.

![Graph de blend d'animation](/images/blog/Gari/AnimationGraph.webp)

Blend state des émotions:
![Blend state des émotions](/images/blog/Gari/BlendState.webm)

# Conclusion

La fabrication de **Gari** aura été l'aboutissement de plusieurs années d'idée. L'origine de ce projet remonte 3 ans avant la construction réelle du projet. Avec un groupe d'amis, nous avions commencé à réfléchir à quoi pourrait ressembler un miroir connecté personnalisé. Cette idée s'est ensuite transformée en une vidéo concept que j'avais réalisé en janvier 2022, dans laquelle les bases du projet ont été imaginées.

C'est là que l'idée de **Gari** est réellement née.

Concepts originel de Gari:
![Concepts originel de Gari](/images/blog/Gari/GariAndYou.webm)

J'ai toujours gardé en tête l'envie de construire réellement ce projet et c'est en 2025 que j'ai eu cette opportunité. C'est  un projet qui m'a permis d'expérimenter sur beaucoup de sujets: le character design, la création d'interfaces animées, l'infrastructure cloud et même la fabrication **DIY**. 

Je pense que je reviendrai sur ce projet un moment ou un autre pour le rendre plus stable, plus performant et plus utile. Et comme les **API** **Azure** ne sont plus supportées, je vais devoir faire une migration tôt ou tard.

Un grand merci au Fab Lab de l'**Enjmin** pour le prêt de matériel de découpe et à Lucas qui a sacrifié quelques week-ends et sa table à manger durant la construction du miroir.