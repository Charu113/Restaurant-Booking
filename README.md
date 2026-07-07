# 🍽️ Smart Dine — Restaurant Table Booking Website

A modern, fully responsive restaurant website built with **pure HTML5, CSS3,
and Vanilla JavaScript** — no frameworks, no Bootstrap, no build tools.
Guests can browse the menu, filter and search dishes, book a table with
validated form data saved to Local Storage, and get in touch — all wrapped
in a warm "reservation ticket" visual identity.

> Built as a placement-portfolio project to demonstrate clean front-end
> fundamentals: semantic HTML, responsive CSS, DOM manipulation, form
> validation, and browser storage — without relying on any library.

---

## 🔗 Live Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, about, featured dishes, testimonials |
| Menu | `menu.html` | 12 dishes, category filters, live search |
| Book Table | `booking.html` | Validated reservation form + confirmation popup |
| Contact | `contact.html` | Address, map, business hours, contact form |

---

## ✨ Features

**Design & UX**
- Custom "reservation ticket" visual identity — perforated ticket-stub dish
  cards, dashed-border summary tickets, warm espresso/gold/wine palette
- Fully responsive layout (desktop → tablet → mobile)
- Sticky, blurred glassmorphism navbar with scroll shadow
- Animated hamburger menu / mobile slide-in drawer
- Smooth scrolling, scroll-reveal animations on section entry
- Scroll-to-top floating button
- Dark mode toggle with **Local Storage persistence**
- Page-load animation (loading screen)
- Card hover effects, animated buttons with shine sweep

**Menu Page**
- 12 dishes across 4 categories: Veg, Non-Veg, Drinks, Desserts
- Each item shows image, name, description, and price
- Category filter tabs + live text search, combinable together
- "No results" state when a search/filter combination matches nothing

**Booking Page**
- Full reservation form: name, email, phone, date, time, guests, seating
  preference (Indoor/Outdoor pill selector), special requests
- Client-side JavaScript validation for every field (regex for email/phone,
  numeric range for guests, past-date blocking, required seating choice)
- Inline error messages per field, no `alert()` popups
- On success: glassmorphism confirmation modal showing a full booking
  summary ("ticket"), and the booking is saved as a JSON record in
  **Local Storage** (`smartdine_bookings`)

**Contact Page**
- Address, phone, email, business hours
- Embedded Google Map (iframe)
- Contact form with validation and a success status message; messages are
  also saved to Local Storage (`smartdine_messages`)

---

## 🛠️ Technologies Used

- **HTML5** — semantic structure across 4 pages
- **CSS3** — custom properties (design tokens), Grid & Flexbox, animations,
  media queries, glassmorphism (`backdrop-filter`)
- **Vanilla JavaScript (ES6)** — DOM APIs, `IntersectionObserver`,
  `localStorage`, form validation, event delegation
- **Google Fonts** — Fraunces (display) + Manrope (body)
- No frameworks, no Bootstrap, no npm build step — open and run

---

## 📁 Folder Structure

```
Restaurant-Booking/
│
├── index.html
├── menu.html
├── booking.html
├── contact.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── images/
│   ├── hero.jpg            (optional — see note below)
│   ├── logo.png             (optional — see note below)
│   ├── foods/               (optional dish photos + README)
│   └── icons/
│       └── favicon.svg
│
├── README.md
├── LICENSE
└── .gitignore
```

> **Note on images:** every image in this project is a **local SVG file**
> bundled inside `images/` — dish photos, the hero background, the about
> section, the logo, and testimonial avatars are all generated, color-coded
> graphics that ship with the repo. Nothing is fetched from the internet, so
> the site renders correctly offline, on Live Server, or on GitHub Pages with
> zero setup. To swap in your own restaurant photography, drop `.jpg`/`.png`
> files into `images/foods/`, then update the matching `<img src="...">`
> path in the HTML — see `images/foods/README.md` for the exact steps.

---

## 🚀 Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/Restaurant-Booking.git
   cd Restaurant-Booking
   ```
2. **Open it — no build step required**
   - Easiest: double-click `index.html`, or
   - Recommended (for correct relative paths & live reload): use the
     **Live Server** extension in VS Code, right-click `index.html` →
     "Open with Live Server".
3. **Browse** Home → Menu → Book Table → Contact using the navbar.

---

## 📸 Screenshots

> Add screenshots here after running the site locally, e.g.:

```
![Home Page](screenshots/home.png)
![Menu Page](screenshots/menu.png)
![Booking Page](screenshots/booking.png)
![Contact Page](screenshots/contact.png)
```

---

## 🔮 Future Enhancements

- Connect the booking form to a real backend (Node/Express + database) to
  replace Local Storage with persistent server-side reservations
- Add email/SMS confirmation on successful booking
- Admin dashboard to view, approve, or cancel incoming bookings
- Real-time table availability calendar
- Multi-language support (English/Tamil)
- Online payment integration for advance booking deposits
- Automated testing (Jest for JS logic, Playwright for UI flows)

---

## 👩‍💻 Author

**Hasini**
B.Tech Information Technology, Knowledge Institute of Technology
Portfolio project for placement preparation — feedback welcome!

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE)
for details.
