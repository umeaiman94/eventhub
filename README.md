# EventHub 🎯

A full stack event management platform for discovering, attending, and hosting events.

🌐 **Live Demo:** [eventhub-juru.vercel.app](https://eventhub-juru.vercel.app)

---

## Features

**For Attendees**
- Browse and search events by category or location
- Register for events with custom forms
- Download ticket after registration
- Receive confirmation email instantly
- View post-event photo gallery
- Like gallery photos

**For Organizers**
- Create and publish events
- View and manage attendee registrations
- Upload post-event photos to gallery
- Access organizer dashboard with stats
- Receive subscription confirmation email

**General**
- JWT authentication with role based access
- Dark and light theme toggle
- Animated splash screen
- Mobile responsive with hamburger navigation
- Interactive map view for event locations
- Share event links
- Browser push notifications
- Settings, Help and FAQ pages

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JWT, bcryptjs |
| Image Upload | Cloudinary |
| Email | Nodemailer, Gmail |
| Maps | Leaflet.js |
| Deployment | Vercel (frontend), Railway (backend) |

---

## Getting Started Locally

### Prerequisites
- Node.js installed
- MongoDB Atlas account
- Cloudinary account
- Gmail app password

### Clone the repo
```bash
git clone https://github.com/umeaiman94/eventhub.git
cd eventhub
```

### Frontend Setup
```bash
npm install
npm start
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Environment Variables
Create `backend/.env`: