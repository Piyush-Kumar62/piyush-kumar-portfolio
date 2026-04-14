const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env file if it exists (for local dev)
dotenv.config();

const dirPath = './src/environments';
const targetPath = `${dirPath}/environment.ts`;
const targetProdPath = `${dirPath}/environment.prod.ts`;

// Ensure the environments directory exists
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// Function to generate content for environment files
const generateContent = (isProd) => `export const environment = {
  production: ${isProd},
  emailJs: {
    serviceId: '${process.env.EMAILJS_SERVICE_ID || ''}',
    templateId: '${process.env.EMAILJS_TEMPLATE_ID || ''}',
    publicKey: '${process.env.EMAILJS_PUBLIC_KEY || ''}',
  },
  portfolio: {
    name: 'Piyush Kumar',
    role: 'Java Full Stack Developer',
    email: 'piyushkumar30066@gmail.com',
    phone: '+91 6202079747',
    location: 'Bihar, India',
    github: 'https://github.com/Piyush-Kumar62',
    linkedin: 'https://www.linkedin.com/in/piyush-kumar62/',
    resumeUrl: '/assets/resume.pdf',
  }
};
`;

// Write variables to environment files
try {
  fs.writeFileSync(targetPath, generateContent(false));
  console.log(`Successfully generated environment.ts`);
  
  fs.writeFileSync(targetProdPath, generateContent(true));
  console.log(`Successfully generated environment.prod.ts`);
} catch (error) {
  console.error('Error generating environment files', error);
  process.exit(1);
}
