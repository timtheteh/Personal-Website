export const comingSoonTitles = [
  'Coming Soon',
  'Launching Soon',
  'Arriving Shortly',
  'In the Works',
  'Almost Ready',
  'Publishing Soon',
  'To Be Released',
  'Draft in Progress',
  'Currently Writing',
  'Work in Progress',
  'Pending Publication',
  'Soon',
  'On the Way',
  'In Draft',
  'Updating Soon',
  'Preparing Content',
  'Article Forthcoming',
  'Not Yet Published',
  'Stay Tuned',
];

export const comingSoonDescriptions = [
  'Under Construction. Over Delivering Soon.',
  'Compiling Greatness…',
  'Initializing Launch Sequence',
  'Beta Drops Soon',
  'Deploying Shortly',
  'Building in Public. Publishing Soon.',
  'Drafting Something Powerful…',
  'Shipping Soon™',
  'Code Is Cooking…',
  'This Post Is in Development',
  'Feature Article: Loading…',
  'Writing at 88mph',
  'Pushing to Production Soon',
  'Hotfixing This Article',
  'Article Compiling…',
  'Content in Beta',
  'Version 0.1 Coming Soon',
  'Markdown in Progress',
  'Syncing Thoughts…',
  'Release Notes Incoming',
  'Under Active Development',
  'Spinning Up Content',
  'Authoring Mode: ON',
  'ETA: Soon',
  'Patch Notes to Follow',
];

// Helper function to get a random title
export const getRandomTitle = () => {
  return comingSoonTitles[Math.floor(Math.random() * comingSoonTitles.length)];
};

// Helper function to get a random description
export const getRandomDescription = () => {
  return comingSoonDescriptions[Math.floor(Math.random() * comingSoonDescriptions.length)];
};

// Helper function to get a title by index (loops if out of bounds)
export const getTitleByIndex = (index: number) => {
  return comingSoonTitles[index % comingSoonTitles.length];
};

// Helper function to get a description by index (loops if out of bounds)
export const getDescriptionByIndex = (index: number) => {
  return comingSoonDescriptions[index % comingSoonDescriptions.length];
};
