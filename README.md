# Piyush Kumar | Personal Portfolio

A modern, responsive personal portfolio website built with **Angular 21**. Showcasing my projects, skills, and professional experience as a Java Full Stack Developer.

Live Site: [piyush-kumar.dev](https://piyush-kumar.dev) *(Configure your domain in Vercel)*

## 🚀 Tech Stack

- **Framework:** Angular 21
- **Language:** TypeScript
- **Styling:** SCSS (Custom Glassmorphism and theme toggles)
- **Email Delivery:** EmailJS (Client-side contact form)
- **Deployment:** Vercel

## ⚙️ Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm start
   ```
   *Navigate to `http://localhost:4200/`.*

## 🔒 Security & EmailJS Setup

EmailJS public keys are intended to be exposed in the frontend. However, to prevent anyone from using your keys on a different website:

1. Go to your [EmailJS Dashboard](https://dashboard.emailjs.com/).
2. Navigate to **Account -> Security**.
3. Under **Allowed Domains**, enter your live domain: `piyush-kumar.dev` and `localhost`.
4. Now, update `src/environments/environment.ts` and `environment.prod.ts` with your IDs. It is completely safe to push these to GitHub once the domains are locked.

## 🌐 Automatic Deployment

This project is configured perfectly for **Vercel**. 

- Vercel automatically deploys every time you push to the `main` branch.
- It will run `npm run build` and only publish if the build succeeds. 
- You do **not** need a "keep-awake bot". This is a static Angular app hosted on Vercel's global Edge network, meaning it never sleeps and is available 24/7 with zero cold start time.
