export function formatAIResponse(text: string): string {
  // First, split the text into sections
  const sections = text.split(/(?=#{1,3}\s)/);
  
  return sections.map(section => {
    // Format headers with gradients and proper spacing
    section = section
      .replace(/###\s*(.*?)(?:\n|$)/, '<h3 class="text-xl font-semibold mb-4 text-red-500">$1</h3>')
      .replace(/##\s*(.*?)(?:\n|$)/, '<h2 class="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">$1</h2>')
      .replace(/#\s*(.*?)(?:\n|$)/, '<h1 class="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">$1</h1>');

    // Format lists with custom bullets and spacing
    const listItems = section.match(/^[-*]\s+.+$/gm);
    if (listItems) {
      const list = `<ul class="space-y-2 my-4">
        ${listItems.map(item => 
          `<li class="flex items-start space-x-3">
            <span class="w-2 h-2 mt-2 bg-red-500/30 rounded-full flex-shrink-0"></span>
            <span class="text-gray-300">${item.replace(/^[-*]\s+/, '')}</span>
          </li>`
        ).join('')}
      </ul>`;
      section = section.replace(/(?:^[-*]\s+.+$\n?)+/gm, list);
    }

    // Format bold text with red highlight
    section = section.replace(/\*\*(.*?)\*\*/g, '<span class="font-semibold text-red-500">$1</span>');

    // Format paragraphs with proper spacing and text color
    section = section
      .split('\n\n')
      .map(para => {
        if (para.trim() && !para.includes('<h') && !para.includes('<ul')) {
          return `<p class="text-gray-300 leading-relaxed mb-4">${para.trim()}</p>`;
        }
        return para;
      })
      .join('\n');

    // Remove any remaining single newlines
    section = section.replace(/(?<!\>)\n(?!\<)/g, ' ');

    return section;
  }).join('\n');
}