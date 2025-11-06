# D&D Card Builder

A web-based application for creating custom Dungeons & Dragons character and monster cards with images and stats.

## Features

- **Interactive Card Editor**: Easily input card details including name, type, alignment, and stats
- **Image Support**: Upload images from your device or load them from URLs
- **Real-time Preview**: See your card update as you type
- **D&D Stats**: Full support for standard D&D 5e stats including:
  - Armor Class (AC)
  - Hit Points (HP)
  - Speed
  - Ability Scores (STR, DEX, CON, INT, WIS, CHA)
  - Additional stats (saving throws, skills, immunities, etc.)
  - Abilities and actions
- **Export Functionality**: Export your cards as PNG images or JSON data
- **Responsive Design**: Works on desktop and mobile devices
- **Beautiful Card Design**: Styled to look like official D&D cards with parchment background and medieval aesthetic

## Deployment

This app is deployed using **GitHub Pages**. You can access the live version at:
`https://[your-username].github.io/scaling-doodle/`

### Deploy Your Own

To deploy your own version:

1. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Source", select the branch: `claude/dnd-card-builder-011CUrNzPiunL6W9Q6x1zYBz` (or merge to `main` first)
   - Select `/ (root)` as the folder
   - Click **Save**

2. **Wait for deployment:**
   - GitHub will automatically build and deploy your site
   - It usually takes 1-2 minutes
   - You'll see a green checkmark when it's ready

3. **Access your site:**
   - Your app will be available at: `https://[your-username].github.io/[repository-name]/`

### Alternative Deployment Options

This static web app can also be deployed to:
- **Netlify**: Drag and drop the folder to Netlify
- **Vercel**: Connect your GitHub repo for automatic deployments
- **Cloudflare Pages**: Connect repository for edge deployment
- **Any static hosting**: Upload files to any web server

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!

### Local Usage

1. Open `index.html` in your web browser
2. Fill in the card details in the editor panel on the left:
   - Enter the creature/character name
   - Specify the type (e.g., Dragon, Humanoid)
   - Add alignment (e.g., Chaotic Evil)
   - Upload an image or provide an image URL
   - Fill in combat stats (AC, HP, Speed)
   - Enter ability scores
   - Add additional stats and abilities
3. Watch your card update in real-time in the preview panel on the right
4. Click "Export Card" to download your card as a PNG image
5. Click "Reset" to return to the default example values

## File Structure

```
scaling-doodle/
├── index.html          # Main HTML file with card builder interface
├── styles.css          # CSS styling for the UI and cards
├── script.js           # JavaScript for interactivity and functionality
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Technologies Used

- **HTML5**: Structure and layout
- **CSS3**: Styling with gradients, flexbox, and grid
- **JavaScript (ES6+)**: Interactive functionality
- **html2canvas**: Library for converting HTML elements to PNG images

## Features in Detail

### Image Handling
- **Upload**: Select an image file from your device
- **URL**: Paste a URL to load an image from the web
- **Preview**: Image displays immediately in the card preview

### Card Customization
Every aspect of the card can be customized:
- Card name appears as an overlay on the image
- Type and alignment displayed below the image
- All standard D&D 5e stats supported
- Ability scores displayed in a grid format
- Text areas for complex stats and abilities

### Export Options
- **PNG Export**: Uses html2canvas to convert the card preview to a downloadable PNG image
- **JSON Fallback**: If PNG export fails, card data is saved as JSON
- High-resolution output (2x scale) for printing

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Responsive design supports mobile devices

## Example Use Cases

- Create custom monster cards for your D&D campaign
- Design character cards for players
- Generate NPC cards for quick reference
- Build a collection of homebrew creatures
- Create cards for educational purposes

## Future Enhancements

Potential features for future versions:
- Multiple card templates (player characters, spells, items)
- Save/load functionality with localStorage
- Gallery view for multiple cards
- Batch export
- Custom backgrounds and themes
- Integration with D&D APIs for official monster stats

## Contributing

Feel free to fork this project and submit pull requests with improvements!

## License

This project is open source and available for personal and educational use.

## Credits

Created with love for the D&D community.

---

**Note**: This application runs entirely in the browser and does not require a server or backend. All data is processed locally on your device.
