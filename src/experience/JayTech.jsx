import ExperienceDetail from './ExperienceDetail'

const imageModules = import.meta.glob('./images/JayTech*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})
const images = Object.keys(imageModules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((k) => imageModules[k])

const data = {
  company: 'JayTech Elite Firm',
  link: 'https://smokescreenapp.com/',
  meta: [
    { label: 'Period', value: 'Sept 2026 - Present' },
    { label: 'Role', value: 'Full-Stack Developer' },
    { label: 'Stack', value: 'JavaScript · Node.js · WebSockets · Flutterwave · OBS' },
    { label: 'Deployed', value: 'Hostinger · Railway' },
  ],
  about:
    "Full-Stack Developer on SmokeScreen, a live AI video streaming SaaS operated by JayTech Elite Firm. SmokeScreen transforms a creator's live webcam feed with AI and lets them broadcast it into WhatsApp, Zoom and Meet through OBS window capture, with credit-based billing and tiered licenses. I work alongside the company's Lead Developer on both the live V1 product and the V2 rebuild, using a pull-request based Git workflow. The V2 frontend is complete, and the backend, database and deployment are being built next together with the Lead Developer.",
  features: [
    {
      icon: '📱',
      title: 'Portrait Mode (V1)',
      desc: 'Shipped a portrait-mode dashboard that runs alongside landscape, using a hybrid of responsive breakpoints and an explicit toggle, with an OBS / theatre capture mode and true 9:16 PNG snapshot export.',
    },
    {
      icon: '🛠️',
      title: 'Production Bug Fixes',
      desc: 'Diagnosed and fixed a recurring WebSocket / Node.js server crash and a stretched-face rendering bug in the live camera pipeline.',
    },
    {
      icon: '💳',
      title: 'Payment Sync Fix',
      desc: "Fixed a Flutterwave bug where successful payments were not upgrading the user's plan tier (for example Creator to Pro) by correcting the sync between payment confirmation and account state.",
    },
    {
      icon: '🚀',
      title: 'Deployment',
      desc: 'Uploaded builds to Hostinger and worked with the Railway deployment, delivering changes through feature branches and pull requests.',
    },
    {
      icon: '🎨',
      title: 'V2 Redesign and Frontend',
      desc: 'Designed the full UI and design system (a dark, professional creative-software direction approved by the client) and built the complete frontend: 35+ responsive pages including dashboard, onboarding, plans, credits and the new photo editing, photo to video and voice cloning screens.',
    },
    {
      icon: '🔜',
      title: "What's Next",
      desc: 'Backend, database (connecting V1 data to V2) and deployment, built jointly with the Lead Developer.',
    },
  ],
}

const JayTech = () => <ExperienceDetail {...data} images={images} />

export default JayTech
