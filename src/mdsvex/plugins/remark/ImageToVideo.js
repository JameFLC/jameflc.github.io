import { visit } from 'unist-util-visit';


export default function remarkImageToVideo() {
    return (tree) => {
        visit(tree, 'image', (node) => {

            const videoExtensions = ["mp4", "webm", "ogg"];
            const matchingExtension = videoExtensions.find(extension => node.url.toLowerCase().endsWith(extension));
            //   if (node.url.endsWith('.mp4')) {
            if (matchingExtension) {
                node.type = 'html';

                node.value = `<video controls><source src="${node.url}" type="video/${matchingExtension}">${node.alt}</video>`;
            }
        });
    };
}
