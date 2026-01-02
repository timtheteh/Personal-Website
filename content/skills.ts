export interface SkillItem {
  id: string;
  text: string;
  icon: string; // Can be emoji string or image path (e.g., '/assets/skill_icons/python.png')
}

// export const carouselItems: SkillItem[] = [
//   { id: 'react', text: 'React', icon: '⚛️' },
//   { id: 'nextjs', text: 'Next.js', icon: '▲' },
//   { id: 'typescript', text: 'TypeScript', icon: '📘' },
//   { id: 'javascript', text: 'JavaScript', icon: '🟨' },
//   { id: 'html', text: 'HTML', icon: '🔷' },
//   { id: 'css', text: 'CSS', icon: '🎨' },
//   { id: 'tailwind', text: 'Tailwind CSS', icon: '💨' },
//   { id: 'vue', text: 'Vue.js', icon: '🟢' },
// ];

// export const carouselItems2: SkillItem[] = [
//   { id: 'postgresql', text: 'PostgreSQL', icon: '🐘' },
//   { id: 'mongodb', text: 'MongoDB', icon: '🍃' },
//   { id: 'redis', text: 'Redis', icon: '🔴' },
//   { id: 'graphql', text: 'GraphQL', icon: '◈' },
//   { id: 'tailwind', text: 'Tailwind', icon: '🎨' },
//   { id: 'figma', text: 'Figma', icon: '🎯' },
//   { id: 'kubernetes', text: 'K8s', icon: '☸️' },
//   { id: 'terraform', text: 'Terraform', icon: '🏗️' },
// ];

// export const carouselItems3: SkillItem[] = [
//   { id: 'postgresql', text: 'PostgreSQL', icon: '🐘' },
//   { id: 'mongodb', text: 'MongoDB', icon: '🍃' },
//   { id: 'redis', text: 'Redis', icon: '🔴' },
//   { id: 'graphql', text: 'GraphQL', icon: '◈' },
//   { id: 'tailwind', text: 'Tailwind', icon: '🎨' },
//   { id: 'figma', text: 'Figma', icon: '🎯' },
//   { id: 'kubernetes', text: 'K8s', icon: '☸️' },
//   { id: 'terraform', text: 'Terraform', icon: '🏗️' },
// ];


// Languages & Basic Tools
export const carouselItems: SkillItem[] = [
  { id: 'python', text: 'Python', icon: '/assets/skill_icons/python.png' },
  { id: 'java', text: 'Java', icon: '☕' },
  { id: 'javascript', text: 'JavaScript', icon: '🟨' },
  { id: 'typescript', text: 'TypeScript', icon: '📘' },
  { id: 'cpp', text: 'C++', icon: '⚙️' },
  { id: 'go', text: 'Go', icon: '🐹' },
  { id: 'rust', text: 'Rust', icon: '🦀' },
  { id: 'sql', text: 'SQL', icon: '🗄️' },
  { id: 'bash', text: 'Bash/Shell', icon: '💻' },
  { id: 'git', text: 'Git', icon: '📦' },
  { id: 'GitHub', text: 'GitHub', icon: '🤖' },
  { id: 'GitLab', text: 'GitLab', icon: '🤖' },
  { id: 'Bitbucket', text: 'Bitbucket', icon: '🤖' },
  { id: 'Jira', text: 'Jira', icon: '🤖' },
  { id: 'Confluence', text: 'Confluence', icon: '🤖' },
  { id: 'react', text: 'React', icon: '⚛️' },
  { id: 'nextjs', text: 'Next.js', icon: '▲' },
  { id: 'redux', text: 'Redux', icon: '🔄' },
  { id: 'html', text: 'HTML5', icon: '🔷' },
  { id: 'css', text: 'CSS3', icon: '🎨' },
  { id: 'tailwind', text: 'Tailwind CSS', icon: '💨' },
  { id: 'flutter', text: 'Flutter', icon: '🐦' },
  { id: 'androidstudio', text: 'Android Studio', icon: '🔶' },
  { id: 'threejs', text: 'Three.js', icon: '🎨' },
  { id: 'supabase', text: 'Supabase', icon: '🤖' },
  { id: 'firebase', text: 'Firebase', icon: '🤖' },
  { id: 'vercel', text: 'Vercel', icon: '🤖' },
  { id: 'clerk', text: 'Clerk', icon: '🤖' },
  { id: 'expo', text: 'Expo', icon: '🤖' },
];


// Backend Development
export const carouselItems2: SkillItem[] = [
  { id: 'nodejs', text: 'Node.js', icon: '⚛️' },
  { id: 'expressjs', text: 'Express.js', icon: '▲' },
  { id: 'django', text: 'Django', icon: '🔄' },
  { id: 'flask', text: 'Flask', icon: '🔷' },
  { id: 'springboot', text: 'Spring Boot', icon: '🎨' },
  { id: 'fastapi', text: 'FastAPI', icon: '💨' },
  { id: 'graphql', text: 'GraphQL', icon: '📱' },
  { id: 'postman', text: 'Postman', icon: '🐦' },
  { id: 'openAPI', text: 'OpenAPI', icon: '🔶' },
  { id: 'postgreSQL', text: 'PostgreSQL', icon: '🤖' },
  { id: 'mySQL', text: 'MySQL', icon: '🤖' },
  { id: 'mongoDB', text: 'MongoDB', icon: '🤖' },
  { id: 'redis', text: 'Redis', icon: '🤖' },
  { id: "flyway", text: 'Flyway', icon: '🤖' },
  { id: 'TypeORM', text: 'TypeORM', icon: '🤖' },
  { id: 'pgAdmin', text: 'pgAdmin', icon: '🤖' },
  { id: 'JWT', text: 'JWT', icon: '🤖' },
  { id: 'OAuth2', text: 'OAuth2', icon: '🤖' },
  { id: 'REST', text: 'REST', icon: '🤖' },
  { id: 'NestJS', text: 'NestJS', icon: '🤖' },
];

// Backend Development
export const carouselItems3: SkillItem[] = [
  { id: 'Docker', text: 'Docker', icon: '🤖' },
  { id: 'Kubernetes', text: 'Kubernetes', icon: '🤖' },
  { id: 'Terraform', text: 'Terraform', icon: '🤖' },
  { id: 'AWS', text: 'AWS', icon: '🤖' },
  { id: 'GCP', text: 'GCP', icon: '🤖' },
  { id: 'Azure', text: 'Azure', icon: '🤖' },
  { id: 'AWS Lambda', text: 'AWS Lambda', icon: '🤖' },
  { id: 'Datadog', text: 'Datadog', icon: '🤖' },
  { id: 'Prometheus', text: 'Prometheus', icon: '🤖' },
  { id: 'Ngix', text: 'Ngix', icon: '🤖' },
  { id: 'RabbitMQ', text: 'RabbitMQ', icon: '🤖' },
  { id: 'Cloudfront', text: 'Cloudfront', icon: '🤖' },
  { id: 'Kafka', text: 'Kafka', icon: '🤖' },
  { id: 'Elasticsearch', text: 'Elasticsearch', icon: '🤖' },
  { id: 'Grafana', text: 'Grafana', icon: '🤖' },
  { id: 'Vault', text: 'Vault', icon: '🤖' },
  { id: 'Jest', text: 'Jest', icon: '🤖' },
  { id: 'ESLint', text: 'ESLint', icon: '🤖' },
  { id: 'GitHub Actions', text: 'GitHub Actions', icon: '🤖' },
  { id: 'Jenkins', text: 'Jenkins', icon: '🤖' },
  { id: 'Ansible', text: 'Ansible', icon: '🤖' },
  { id: 'Kong', text: 'Kong', icon: '🤖' },
  { id: 'Snowflake', text: 'Snowflake', icon: '🤖' },
  { id: 'Airflow', text: 'Airflow', icon: '🤖' },
]