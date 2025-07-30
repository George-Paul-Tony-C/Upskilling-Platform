# AI based Upskilling Platform

An end-to-end demo application that shows how a modern **AI-assisted learning
portal** could work inside an enterprise.

| Stack | Back End | Front End |
|-------|----------|-----------|
| ⚙️ Core | **Node 18 / Express 5** + TypeScript | **Vite** + React 18 + TypeScript |
| 🔒 Auth | JWT (access token only) | Context + React-Query |
| 🎨 UI  | — | Tailwind CSS, lucide-react icons, Framer Motion |
| 📊 Data | In-memory mock repositories | TanStack Query hooks |
| 🧩 Roles | Learner / Admin | Role-aware routing & nav |

---

### Key Features

* **Role-based login** – one `/auth/login` call returns a JWT & role; React
  redirects to `/learner` or `/admin` automatically.
* **Admin dashboard** – agent monitor, system KPIs, department analytics,
  user CRUD (create, edit, delete).
* **Learner dashboard** – skill radar, learning-path progress, latest
  assessment score.
* **Assessment flow** – start ➜ answer ➜ finish; responses stored in memory.
* **Mock data layer** – swap the repositories for a real DB without touching
  routes or hooks.
* **Mobile-friendly UI** – responsive sidebar with slide-in animation.

---

### Project Structure (abridged)
```
backend/
src/
routes/
services/
data/mockData.ts
frontend/
src/
api/ # APIPATH + react-query hooks
components/ # charts, cards, common UI
pages/ # admin/* learner/* public/*
routes/ # role-specific routing
layouts/ # RoleLayout (navbar + sidebar)
```

--

### Running Locally

bash
# 1 – Back-end
```
cd backend
npm install
npm run dev           # http://localhost:4000
```

# 2 – Front-end (in a new terminal)
```
cd ../frontend
npm install
npm run dev           # http://localhost:5173
```

------------
## Default mock users:

### Role Learner	
### Email sarah.chen@company.com	
### Password 123456
------------
### Role Admin
### Email grace.lee@company.com	
### Password 123456
------------

# Sample Output Pictures

### Login Page

<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/d6564850-8e5e-4c14-b977-257ca5e8434b" />


## Role Learner 

### Dashboard
<img width="1919" height="911" alt="image" src="https://github.com/user-attachments/assets/1c2f7b57-b8b8-4fec-8f32-39f234ef4d5b" />
<img width="1902" height="909" alt="image" src="https://github.com/user-attachments/assets/2a9cd6a9-c42a-457d-ad43-9207a10a7c77" />
<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/37e0d494-af77-452b-ba40-ae67c853ae52" />
<img width="1919" height="550" alt="image" src="https://github.com/user-attachments/assets/18007f75-eeb6-4d93-85a7-86982f9efbc2" />

------------

### Profile
<img width="1919" height="911" alt="image" src="https://github.com/user-attachments/assets/4493501c-fd3b-4adf-851a-453e01008109" />
<img width="1918" height="907" alt="image" src="https://github.com/user-attachments/assets/0e31c3d9-98a3-49dd-be8b-34410c4e19cb" />
<img width="1919" height="903" alt="image" src="https://github.com/user-attachments/assets/d8f39780-2981-4a1c-bbdd-654e75ec7ab6" />

------------

### Assessment
<img width="1919" height="904" alt="image" src="https://github.com/user-attachments/assets/ba4f7e78-cae9-409f-8855-3896237245e1" />
<img width="1919" height="392" alt="image" src="https://github.com/user-attachments/assets/872c76fd-53ff-4f3c-96f1-816d8928eb34" />

Assessment start
<img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/aaacf08e-c8bd-4d09-a291-0e1133053aa1" />
<img width="1919" height="904" alt="image" src="https://github.com/user-attachments/assets/e6be39f0-7b83-4c7b-955b-71392d761926" />
<img width="1919" height="902" alt="image" src="https://github.com/user-attachments/assets/419fd98d-0227-4b25-91c6-5a858cd1726b" />
<img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/c0d87a0a-2a0a-410f-88c9-35e2f8f078f7" />


----------------- 
## Role Admin

### Dashboard

<img width="1917" height="911" alt="image" src="https://github.com/user-attachments/assets/9a9e0d04-62b5-4308-886c-67c38ff205d1" />
<img width="1918" height="897" alt="image" src="https://github.com/user-attachments/assets/8d8c98d1-be48-4d42-9976-0de29cf1e021" />
<img width="1901" height="834" alt="image" src="https://github.com/user-attachments/assets/1aa7e7f7-78a5-43a6-8a3f-2b221db0d26e" />

----------------- 
### User Managemnet

<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/5f71969d-e60c-4604-b6b3-7b62286255f8" />
<img width="1919" height="827" alt="image" src="https://github.com/user-attachments/assets/1a3a5e0d-9c98-419f-9810-0c93aeab9dd0" />

Add User Model and Edit User Model

<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/36232309-ebde-4749-bab6-42ca3486eb65" />
<img width="1919" height="905" alt="image" src="https://github.com/user-attachments/assets/12ffe798-e2a0-4d8f-bde5-4a3df1810676" />

-------------


Animated UI with Moving SideBar Open and Close
<img width="1919" height="912" alt="image" src="https://github.com/user-attachments/assets/9780dafd-f8c4-4169-80e8-1300577742ef" />
<img width="1919" height="912" alt="image" src="https://github.com/user-attachments/assets/37ffd829-f63c-4032-aa7d-ae5d2b078f85" />





