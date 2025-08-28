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
export default function rehypeVideoToFigure() {
    return (tree) => {
        visit(tree, 'element', (node, index, parent) => {
            if (node.tagName === 'video' && parent?.type === 'root') {
                const video = node;

                // const text = (node.children || [])
                //     .filter((child) => child.type === 'text')
                //     .map((child) => child.value)
                //     .join('')
                //     .trim()
                const text = video.properties?.title || '';

                // Ensure properties exist
                video.properties = video.properties || {};

                const figureNode = {
                    type: 'element',
                    tagName: 'figure',
                    properties: { className: ['mobile-side-merge'] },
                    children: [
                        video,
                        ...(text
                            ? [{
                                type: 'element',
                                tagName: 'figcaption',
                                properties: {},
                                children: [
                                    { type: 'text', value: text }
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