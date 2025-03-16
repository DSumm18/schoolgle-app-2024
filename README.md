# Schoolgle - AI-Powered Tools for Educators

Schoolgle helps teachers save time, reduce stress, and focus on what matters most—their students and their wellbeing.

## 🌟 Features

- 🧠 **AI-Powered Tools**: Lesson planning, grading assistance, and more
- 🏫 **School Management**: Tools for administrators and business managers
- 📊 **Data Insights**: Analytics to track student progress and teacher wellbeing
- 🌙 **Dark Mode**: Easy on the eyes during late-night planning sessions

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/DSumm18/schoolgle-app-2024.git
   ```

2. Navigate to the project directory:
   ```bash
   cd schoolgle-app-2024
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Create a `.env.local` file in the root directory with the following environment variables:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   
   # Supabase credentials
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # Email provider (optional)
   EMAIL_SERVER=smtp://username:password@smtp.example.com:587
   EMAIL_FROM=noreply@schoolgle.app
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💻 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: Supabase
- **Animations**: Framer Motion
- **Deployment**: Vercel

## 📱 Responsive Design

Schoolgle is designed to work beautifully on all devices:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Authentication

We use NextAuth.js integrated with Supabase for secure authentication:
- Email/password login
- Magic link authentication (passwordless)
- OAuth providers (Google, Microsoft)

## 📁 Project Structure

```
schoolgle-app-2024/
├── public/                 # Static files
├── src/
│   ├── app/                # Next.js App Router pages
│   ├── components/         # React components
│   ├── lib/                # Utilities and helpers
│   └── types/              # TypeScript type definitions
├── .env.local.example      # Example environment variables
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── postcss.config.js       # PostCSS configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 About Us

Schoolgle is built by educators for educators. Our mission is to reduce teacher workload and improve wellbeing across the education sector.

---

🌐 [Visit our website](https://schoolgle.app) | 📧 [Contact us](mailto:hello@schoolgle.app)