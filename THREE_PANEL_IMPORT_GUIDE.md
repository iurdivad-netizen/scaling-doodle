# Three-Panel Character Card Import Guide

## Overview
This feature allows you to import detailed D&D character cards into the three-panel (trifold) card layout. The parser has been enhanced to handle comprehensive character data including spells, class features, equipment, and more.

## How to Use

1. **Open the D&D Card Builder** in your browser (open `index.html`)
2. Navigate to the **Card Builder** tab
3. Click on the **Import Character** section (or equivalent import button)
4. **Paste your character data** into the text area
5. Click **Import**

The system will automatically:
- Switch to the **Creature template**
- Switch to the **Three-Column layout**
- Parse and populate all character data
- Display a preview of your three-panel card

## Supported Format

The parser recognizes the following sections and data:

### Basic Information
- **Character Name** - First line with name and class (e.g., "ELIAS THORN - GRAVE CLERIC")
- **Level & Race** - Format: "Level X Race Class" (e.g., "Level 4 Human Cleric")
- **Domain/Subclass** - Automatically detected (e.g., "Grave Domain")

### Core Stats
- **AC, HP, Speed** - Format: "AC: X | HP: Y | Speed: Z ft."
- **Initiative & Proficiency** - Format: "Initiative: +X | Proficiency: +Y"
- **Ability Scores** - Format: "STR X (+Y) DEX X (+Y) ..." (can be multi-line)
- **Saving Throws** - Section header "SAVING THROWS" followed by values

### Combat & Spells
- **Combat Stats** - Spell Save DC, Spell Attack, Weapon Attacks
- **Spell Slots** - Cantrips and spell levels
- **Key Cantrips** - Bullet-pointed list with descriptions
- **Domain Spells** - Listed by spell level (1st:, 2nd:, etc.)
- **Prepared Spells** - Listed by spell level

### Character Details
- **Class Features** - Bullet-pointed list (supports nested bullets with "-")
- **Equipment** - Bullet-pointed list
- **Passive Perception** - Format: "PASSIVE PERCEPTION: X"

## Example Character Card

See `test-character-import.txt` for a complete example of the Elias Thorn character card.

## Card Layout

The imported data is distributed across three panels:

### Panel 1 (Front)
- Character image with name overlay
- Type and subtype
- AC, HP, Speed, Initiative, Proficiency
- Ability Scores (all 6)
- Saving Throws

### Panel 2 (Back Left)
- Combat stats (Spell Save DC, Spell Attack, Weapon Attacks)
- Spell Slots breakdown
- Key Cantrips
- Domain Spells (if applicable)

### Panel 3 (Back Right)
- Prepared Spells
- Class Features
- Equipment
- Passive Perception

## Tips

1. **Section Headers** - Use ALL CAPS for section headers (e.g., "ABILITY SCORES", "COMBAT", "CLASS FEATURES")
2. **Bullet Points** - Use `•` or `-` for bullet points in lists
3. **Spell Levels** - Use format "1st:", "2nd:", "3rd:" for spell listings
4. **Box Drawing Characters** - The parser automatically filters out decorative box characters (═, ║, ╔, etc.)
5. **Indentation** - Nested bullet points (for sub-features) are supported using spaces or "-"

## Customization

After importing, you can:
- Add a character image to Panel 1
- Adjust font sizes and colors using the theme customization options
- Export the card as PNG
- Save to your deck for later use

## Troubleshooting

If data doesn't import correctly:
1. Check that section headers match the expected format (ALL CAPS)
2. Ensure ability scores include both the score and modifier: "STR 16 (+3)"
3. Verify that stats use the pipe separator: "AC: 18 | HP: 33 | Speed: 30 ft."
4. Make sure each section has its proper header

## Technical Details

- **Parser Function**: `parseCharacterText()` in `script.js` (lines 970-1221)
- **Layout Generators**: `generateThreeColumnFront()`, `generateThreeColumnBack1()`, `generateThreeColumnBack2()`
- **Import Function**: `importCardData()` in `script.js` (lines 1224-1271)
