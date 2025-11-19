const TOOLS = [
  "JavaScript",
  "React",
  "Vue",
  "Svelte",
  "Preact",
  "Angular",
  "Astro",
  "Flutter",
  "Solid",
];

const DELAY = 3000;

const getTools = async () => {
  "use server";

  return TOOLS.map((tool) => generateToolsData(tool, DELAY));
};

async function generateToolsData(tool, delay) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * delay));

  return tool;
}

export default getTools;
