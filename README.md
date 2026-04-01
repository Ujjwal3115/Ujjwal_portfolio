## Project Structure

```
app/
├── layout.jsx          # Root layout (Navbar, Chat, Analytics, JSON-LD)
├── globals.css         # Global styles and Tailwind
├── (root)/             # Home page with fullpage sections
│   ├── layout.jsx      # FullPageProvider + Sidebar
│   └── page.jsx        # Hero, About, Projects, Contact sections
├── about/              # About page
│   └── components/     # Skills, Experience, Education, Quote, Spotify
├── projects/           # Projects listing with filtering
│   ├── [slug]/         # Dynamic project detail pages
│   └── archive/        # Full project archive
components/             # Shared UI (Navbar, Sidebar, Footer, Button, etc.)
json/data.json          # Project data source
public/image/           # Static images
```