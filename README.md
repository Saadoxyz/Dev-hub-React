# ⚛️ React Portfolio Suite

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/saadoxyz/dev-hub-react?style=for-the-badge)](https://github.com/saadoxyz/dev-hub-react/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/saadoxyz/dev-hub-react?style=for-the-badge)](https://github.com/saadoxyz/dev-hub-react/network)
[![GitHub issues](https://img.shields.io/github/issues/saadoxyz/dev-hub-react?style=for-the-badge)](https://github.com/saadoxyz/dev-hub-react/issues)

**A comprehensive React project containing three complete frontend applications showcasing modern development practices**

[🚀 Live Demo](#) • [📖 Documentation](#-included-tasks) • [🐛 Report Bug](https://github.com/saadoxyz/dev-hub-react/issues) • [✨ Request Feature](https://github.com/saadoxyz/dev-hub-react/issues)

</div>

---

## 🎯 About The Project

<div align="center">
  <img src="https://via.placeholder.com/800x400/1a1a1a/ffffff?text=React+Portfolio+Suite" alt="Project Banner" style="border-radius: 10px; margin: 20px 0;">
</div>

This React project combines **three real-world frontend tasks** into a single unified codebase, offering a complete hands-on demonstration of modern React development. Perfect for developers looking to showcase their skills or learn advanced React concepts.

### ✨ What's Inside

<table>
<tr>
<td align="center" style="border: none;">
<img width="60" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="Blog">
<br><strong>Personal Blog</strong>
<br><sub>Responsive blog interface</sub>
</td>
<td align="center" style="border: none;">
<img width="60" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="Dashboard">
<br><strong>Freelance Dashboard</strong>
<br><sub>Multi-page admin panel</sub>
</td>
<td align="center" style="border: none;">
<img width="60" src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Job Tracker">
<br><strong>Job Tracker</strong>
<br><sub>Full CRUD application</sub>
</td>
</tr>
</table>

---

## 🚀 Quick Start

<details>
<summary><b>📋 Prerequisites</b></summary>

Before you begin, ensure you have the following installed:
- Node.js (v16.0 or higher)
- npm or yarn package manager
- Git

</details>

### 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/saadoxyz/dev-hub-react.git

# Navigate to project directory
cd dev-hub-react

# Install dependencies
npm install

# Start development server
npm run dev
```

<div align="center">

**🎉 That's it! Open [http://localhost:5173](http://localhost:5173) to view the project.**

</div>

---

## 🎨 Features Overview

<details>
<summary><b>📝 Personal Blog Homepage</b></summary>

<br>

- ✅ **Responsive Design** - Works on all device sizes
- 🔍 **Search Functionality** - Filter posts by title
- 🏷️ **Category Filters** - Tech, Travel, Food categories
- 🎨 **Card Layout** - Beautiful post cards with images
- 📄 **Pagination** - Navigate through multiple pages
- ⚡ **Fast Loading** - Optimized performance

```javascript
// Example blog post structure
{
  id: 1,
  title: "Getting Started with React",
  category: "Tech",
  date: "2024-01-15",
  image: "/blog-image.jpg",
  excerpt: "Learn the fundamentals of React..."
}
```

</details>

<details>
<summary><b>📊 Freelance Dashboard</b></summary>

<br>

- 🧭 **React Router Navigation** - Seamless page transitions
- 📱 **Responsive Sidebar** - Collapsible mobile menu
- 📈 **Interactive Charts** - Bar & Pie charts with Recharts
- 📋 **Project Management** - Client project tracking
- 👤 **Profile Settings** - Editable user information
- 🔔 **Notifications** - Real-time activity updates

| Page | Features |
|------|----------|
| 🏠 Overview | Stats cards, activity feed, charts |
| 📁 Projects | Data table, search, filtering |
| ⚙️ Settings | Profile form, preferences |

</details>

<details>
<summary><b>💼 Job Application Tracker</b></summary>

<br>

- 🔄 **Full CRUD Operations** - Create, Read, Update, Delete
- 🌐 **Context API** - Global state management
- 💾 **LocalStorage** - Data persistence
- 📤 **Import/Export** - JSON data handling
- 📱 **Mobile Responsive** - Works on all devices
- 🎯 **Status Tracking** - Applied, Interview, Rejected, Offer

```javascript
// Job application data structure
{
  id: "uuid",
  company: "Tech Corp",
  position: "Frontend Developer",
  status: "Interview",
  appliedDate: "2024-01-15",
  notes: "Completed technical assessment"
}
```

</details>

---

## 🏗️ Project Structure

```
📦 dev-hub-react/
├── 📁 public/
│   ├── 🖼️ favicon.ico
│   └── 📄 index.html
├── 📁 src/
│   ├── 📄 App.jsx                 # Main router & navigation
│   ├── 📄 Blog.jsx               # Personal blog homepage
│   ├── 📄 Freelance.jsx          # Freelance dashboard
│   ├── 📄 JobTrackerApp.jsx      # Job application tracker
│   ├── 📁 components/            # Reusable components
│   │   ├── 📄 Header.jsx
│   │   ├── 📄 Sidebar.jsx
│   │   └── 📄 Footer.jsx
│   ├── 📁 context/               # Context providers
│   │   └── 📄 JobContext.jsx
│   ├── 📁 data/                  # Mock data & constants
│   │   ├── 📄 blogPosts.js
│   │   ├── 📄 projects.js
│   │   └── 📄 activities.js
│   ├── 📁 utils/                 # Helper functions
│   │   └── 📄 storage.js
│   └── 📄 main.jsx
├── 📄 package.json
├── 📄 vite.config.js
├── 📄 tailwind.config.js
└── 📄 README.md
```

---

## 🛠️ Built With

<div align="center">

| Technology | Purpose | Version |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=white) | UI Framework | ^18.0.0 |
| ![React Router](https://img.shields.io/badge/-React%20Router-CA4245?style=flat-square&logo=react-router&logoColor=white) | Navigation | ^6.0.0 |
| ![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | Styling | ^3.0.0 |
| ![Recharts](https://img.shields.io/badge/-Recharts-8884D8?style=flat-square&logo=recharts&logoColor=white) | Charts | ^2.5.0 |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Build Tool | ^4.0.0 |

</div>

---

## 📸 Screenshots

<div align="center">

### 📝 Personal Blog
<img src="https://via.placeholder.com/600x300/3B82F6/ffffff?text=Personal+Blog+Homepage" alt="Blog Screenshot" style="border-radius: 8px; margin: 10px;">

### 📊 Freelance Dashboard
<img src="https://via.placeholder.com/600x300/10B981/ffffff?text=Freelance+Dashboard" alt="Dashboard Screenshot" style="border-radius: 8px; margin: 10px;">

### 💼 Job Tracker
<img src="https://via.placeholder.com/600x300/8B5CF6/ffffff?text=Job+Application+Tracker" alt="Job Tracker Screenshot" style="border-radius: 8px; margin: 10px;">

</div>

---

## 🎯 Learning Objectives

<div align="center">

```mermaid
graph TD
    A[React Portfolio Suite] --> B[Component Architecture]
    A --> C[State Management]
    A --> D[Routing & Navigation]
    A --> E[Data Visualization]
    
    B --> B1[Functional Components]
    B --> B2[Custom Hooks]
    B --> B3[Component Composition]
    
    C --> C1[useState & useEffect]
    C --> C2[Context API]
    C --> C3[LocalStorage Integration]
    
    D --> D1[React Router]
    D --> D2[Protected Routes]
    D --> D3[Dynamic Navigation]
    
    E --> E1[Recharts Integration]
    E --> E2[Interactive Charts]
    E --> E3[Data Filtering]
```

</div>

---

## 🤝 Contributing

<div align="center">

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

</div>

<details>
<summary><b>🔧 Development Setup</b></summary>

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

</details>

### 📝 Code Style

- Use ESLint and Prettier for code formatting
- Follow React best practices and hooks guidelines
- Write meaningful commit messages
- Add comments for complex logic

---

## 📊 Project Stats

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/saadoxyz/dev-hub-react?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/saadoxyz/dev-hub-react?style=for-the-badge)
![GitHub top language](https://img.shields.io/github/languages/top/saadoxyz/dev-hub-react?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/saadoxyz/dev-hub-react?style=for-the-badge)

</div>

---

## 📞 Contact & Support

<div align="center">

**Saad Khan** - Full Stack Developer

[![Email](https://img.shields.io/badge/Email-saadok652004@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:saadok652004@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-saadoxyz-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/saadoxyz)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/saadoxyz)

**Project Link:** [https://github.com/saadoxyz/dev-hub-react](https://github.com/saadoxyz/dev-hub-react)

</div>

---

## 🙏 Acknowledgments

<div align="center">

- [React Documentation](https://reactjs.org/) for excellent guides
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS framework
- [Recharts](https://recharts.org/) for beautiful React charts
- [Shields.io](https://shields.io/) for awesome badges
- [Choose an Open Source License](https://choosealicense.com) for license guidance

</div>

---

<div align="center">

### ⭐ Star this repository if it helped you!

[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)](https://github.com/saadoxyz)
[![Powered by React](https://img.shields.io/badge/Powered%20by-React-blue?style=for-the-badge&logo=react)](https://reactjs.org/)

**Don't forget to give this project a star! ⭐**

</div>
