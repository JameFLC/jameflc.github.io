import { visit } from 'unist-util-visit';

/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Element} Element
 */

/**
 * A rehype plugin that wraps top-level <img> tags in <figure>,
 * adds a <figcaption> with the alt text, and adds a 'mobile-side-merge' to the image.
 *
 * @returns {(tree: Root) => void}
 */
export default function rehypeImageToFigure() {
    return (tree) => {
        visit(tree, 'element', (node, index, parent) => {
            if (node.tagName === 'img' && parent?.type === 'root') {
                const image = node;

                const altText = node.properties?.alt || '';

                // Ensure properties exist
                image.properties = image.properties || {};

                // // Add 'mobile-side-merge' to the image's className (preserve any existing ones)
                // const existingClass = image.properties.className || [];
                // image.properties.className = Array.isArray(existingClass)
                //     ? [...existingClass, 'mobile-side-merge']
                //     : [existingClass, 'mobile-side-merge'];

                const figureNode = {
                    type: 'element',
                    tagName: 'figure',
                    properties: { className: ['mobile-side-merge'] },
                    children: [
                        image,
                        ...(altText
                            ? [{
                                type: 'element',
                                tagName: 'figcaption',
                                properties: {},
                                children: [
                                    { type: 'text', value: altText }
                                ]
                            }]
                            : [])
                    ]
                };

                parent.children[index] = figureNode;
            }
        });
    };
}