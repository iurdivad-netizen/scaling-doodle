// Template Definitions
// Global counter for unique card IDs
let cardIdCounter = 0;

const templates = {
    creature: {
        name: 'Creature/Monster',
        fields: ['cardName', 'cardType', 'cardSubtype', 'imageUpload', 'imageUrl', 'ac', 'hp', 'speed', 'str', 'dex', 'con', 'int', 'wis', 'cha', 'additionalStats', 'description'],
        defaults: {
            cardName: 'Ancient Red Dragon',
            cardType: 'Gargantuan Dragon',
            cardSubtype: 'Chaotic Evil',
            ac: '22',
            hp: '546 (28d20 + 252)',
            speed: '40 ft., climb 40 ft., fly 80 ft.',
            str: '30 (+10)',
            dex: '10 (+0)',
            con: '29 (+9)',
            int: '18 (+4)',
            wis: '15 (+2)',
            cha: '23 (+6)',
            additionalStats: 'Saving Throws: Dex +7, Con +16, Wis +9, Cha +13\nSkills: Perception +16, Stealth +7\nDamage Immunities: Fire\nSenses: Blindsight 60 ft., Darkvision 120 ft.\nLanguages: Common, Draconic\nChallenge: 24 (62,000 XP)',
            description: 'Legendary Resistance (3/Day): If the dragon fails a saving throw, it can choose to succeed instead.\n\nFire Aura: At the start of each of the dragon\'s turns, each creature within 10 feet of it takes 14 (4d6) fire damage.\n\nMultiattack: The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.'
        }
    },
    spell: {
        name: 'Spell',
        fields: ['cardName', 'spellLevel', 'spellSchool', 'castingTime', 'spellRange', 'components', 'duration', 'imageUpload', 'imageUrl', 'description'],
        defaults: {
            cardName: 'Fireball',
            spellLevel: '3rd-level',
            spellSchool: 'Evocation',
            castingTime: '1 action',
            spellRange: '150 feet',
            components: 'V, S, M (a tiny ball of bat guano and sulfur)',
            duration: 'Instantaneous',
            description: 'A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one.\n\nThe fire spreads around corners. It ignites flammable objects in the area that aren\'t being worn or carried.\n\nAt Higher Levels: When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.'
        }
    },
    item: {
        name: 'Magic Item',
        fields: ['cardName', 'itemRarity', 'itemType', 'attunement', 'imageUpload', 'imageUrl', 'description'],
        defaults: {
            cardName: 'Ring of Protection',
            itemRarity: 'Rare',
            itemType: 'Ring',
            attunement: 'Requires attunement',
            description: 'You gain a +1 bonus to AC and saving throws while wearing this ring.\n\nThis elegant silver ring is adorned with protective runes that glow faintly when danger is near.'
        }
    },
    ability: {
        name: 'Character Ability',
        fields: ['cardName', 'abilitySource', 'abilityLevel', 'imageUpload', 'imageUrl', 'description'],
        defaults: {
            cardName: 'Rage',
            abilitySource: 'Barbarian Class Feature',
            abilityLevel: '1st level',
            description: 'In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action.\n\nWhile raging, you gain the following benefits if you aren\'t wearing heavy armor:\n\n• You have advantage on Strength checks and Strength saving throws.\n• When you make a melee weapon attack using Strength, you gain a bonus to the damage roll.\n• You have resistance to bludgeoning, piercing, and slashing damage.\n\nYour rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven\'t attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action.'
        }
    },
    equipment: {
        name: 'Equipment',
        fields: ['cardName', 'equipmentType', 'equipmentCost', 'equipmentWeight', 'imageUpload', 'imageUrl', 'description'],
        defaults: {
            cardName: 'Plate Armor',
            equipmentType: 'Heavy Armor',
            equipmentCost: '1,500 gp',
            equipmentWeight: '65 lb.',
            description: 'Plate consists of shaped, interlocking metal plates to cover the entire body. A suit of plate includes gauntlets, heavy leather boots, a visored helmet, and thick layers of padding underneath the armor. Buckles and straps distribute the weight over the body.\n\nArmor Class: 18\nStrength: Str 15\nStealth: Disadvantage'
        }
    }
};

// DOM Elements
const cardTemplateSelect = document.getElementById('cardTemplate');
const cardLayoutSelect = document.getElementById('cardLayout');
const cardNameInput = document.getElementById('cardName');
const cardTypeInput = document.getElementById('cardType');
const imageUploadInput = document.getElementById('imageUpload');
const imageUrlInput = document.getElementById('imageUrl');
const loadImageBtn = document.getElementById('loadImageBtn');
const clearImageBtn = document.getElementById('clearImageBtn');
const imageSourceRadios = document.getElementsByName('imageSource');
const resetBtn = document.getElementById('resetBtn');
const exportBtn = document.getElementById('exportBtn');
const previewImage = document.getElementById('previewImage');
const cardPreview = document.getElementById('cardPreview');

// Import elements
const importTextArea = document.getElementById('importText');
const importBtn = document.getElementById('importBtn');

// Deck management elements
const addToDeckBtn = document.getElementById('addToDeckBtn');
const viewDeckBtn = document.getElementById('viewDeckBtn');
const printPreviewBtn = document.getElementById('printPreviewBtn');
const deckCountSpan = document.getElementById('deckCount');
const deckModal = document.getElementById('deckModal');
const closeDeckModal = document.getElementById('closeDeckModal');
const deckGrid = document.getElementById('deckGrid');
const clearDeckBtn = document.getElementById('clearDeckBtn');
const exportDeckBtn = document.getElementById('exportDeckBtn');
const saveDeckFileBtn = document.getElementById('saveDeckFileBtn');
const loadDeckFileBtn = document.getElementById('loadDeckFileBtn');
const loadDeckFileInput = document.getElementById('loadDeckFileInput');
const printModal = document.getElementById('printModal');
const closePrintModal = document.getElementById('closePrintModal');
const printContent = document.getElementById('printContent');
const printBtn = document.getElementById('printBtn');
const autoSaveNotification = document.getElementById('autoSaveNotification');

// Print alignment controls
const alignLeftBtn = document.getElementById('alignLeft');
const alignRightBtn = document.getElementById('alignRight');
const resetAlignmentBtn = document.getElementById('resetAlignment');
const alignmentValueSpan = document.getElementById('alignmentValue');

// Current template and deck
let currentTemplate = 'creature';
let deck = [];
let printAlignment = -2; // Default alignment in pixels

// Initialize
async function init() {
    loadTemplate(currentTemplate);
    updatePreview();
    attachEventListeners();
    await loadDeck();
    updateDeckCounter();
    loadPrintAlignment();
}

// Load template and show/hide appropriate fields
function loadTemplate(templateId) {
    currentTemplate = templateId;
    const template = templates[templateId];

    // Hide all template-specific form sections
    document.querySelectorAll('[class*="template-"]').forEach(el => {
        el.style.display = 'none';
    });

    // Show form sections for current template
    document.querySelectorAll(`.template-${templateId}`).forEach(el => {
        el.style.display = 'block';
    });

    // Load default values
    Object.keys(template.defaults).forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            element.value = template.defaults[fieldId];
        }
    });

    updatePreview();
}

// Update preview based on current template
function updatePreview() {
    const templateId = currentTemplate;
    const layoutStyle = cardLayoutSelect.value;
    let previewHTML = '';

    // Check if three-column layout is selected
    if (layoutStyle === 'three-column') {
        // For three-column, use the front panel content
        previewHTML = generateThreeColumnFront(templateId);
    }
    // Check if immersive layout is selected
    else if (layoutStyle === 'immersive') {
        switch (templateId) {
            case 'creature':
                previewHTML = generateCreaturePreviewImmersive();
                break;
            case 'spell':
                previewHTML = generateSpellPreviewImmersive();
                break;
            case 'item':
                previewHTML = generateItemPreviewImmersive();
                break;
            case 'ability':
                previewHTML = generateAbilityPreviewImmersive();
                break;
            case 'equipment':
                previewHTML = generateEquipmentPreviewImmersive();
                break;
        }
    } else {
        // Standard layout
        switch (templateId) {
            case 'creature':
                previewHTML = generateCreaturePreview();
                break;
            case 'spell':
                previewHTML = generateSpellPreview();
                break;
            case 'item':
                previewHTML = generateItemPreview();
                break;
            case 'ability':
                previewHTML = generateAbilityPreview();
                break;
            case 'equipment':
                previewHTML = generateEquipmentPreview();
                break;
        }
    }

    // Store whether background image was enabled before updating
    const hadBackgroundImage = cardPreview.classList.contains('image-as-background');
    const root = document.documentElement;
    const savedBackgroundImage = hadBackgroundImage ? root.style.getPropertyValue('--card-background-image') : null;
    const savedContentOpacity = hadBackgroundImage ? root.style.getPropertyValue('--content-opacity') : null;

    // Save the current image src before replacing innerHTML (previewImage reference will become stale)
    const oldPreviewImage = document.getElementById('previewImage');
    const savedImageSrc = oldPreviewImage ? oldPreviewImage.src : '';

    cardPreview.innerHTML = previewHTML;

    // Reattach image if present
    const newPreviewImage = document.getElementById('previewImage');
    if (newPreviewImage && savedImageSrc) {
        newPreviewImage.src = savedImageSrc;
        newPreviewImage.style.display = 'block';
    }

    // Restore background image styling if it was enabled
    if (hadBackgroundImage && savedBackgroundImage) {
        cardPreview.classList.add('image-as-background');
        root.style.setProperty('--card-background-image', savedBackgroundImage);
        if (savedContentOpacity) {
            root.style.setProperty('--content-opacity', savedContentOpacity);
        }
    }

    // Update back card for immersive layout
    updateBackCard();

    // Update cards display layout for three-column view
    updateCardsDisplayLayout();
}

// Generate creature card preview
function generateCreaturePreview() {
    const name = document.getElementById('cardName').value || 'Card Name';
    const type = document.getElementById('cardType').value || 'Type';
    const subtype = document.getElementById('cardSubtype').value || 'Subtype';
    const ac = document.getElementById('ac').value || '-';
    const hp = document.getElementById('hp').value || '-';
    const speed = document.getElementById('speed').value || '-';
    const str = document.getElementById('str').value || '-';
    const dex = document.getElementById('dex').value || '-';
    const con = document.getElementById('con').value || '-';
    const int = document.getElementById('int').value || '-';
    const wis = document.getElementById('wis').value || '-';
    const cha = document.getElementById('cha').value || '-';
    const additionalStats = document.getElementById('additionalStats').value || '';
    const description = document.getElementById('description').value || '';

    return `
        <div class="card-image">
            <img id="previewImage" src="" alt="Card Image">
            <div class="card-name-overlay">
                <h2>${name}</h2>
            </div>
        </div>
        <div class="card-content">
            <div class="card-type">
                <span>${type}</span>
                <span class="separator">•</span>
                <span>${subtype}</span>
            </div>
            <div class="divider"></div>
            <div class="card-stats">
                <div class="stat-row"><strong>AC</strong><span>${ac}</span></div>
                <div class="stat-row"><strong>HP</strong><span>${hp}</span></div>
                <div class="stat-row"><strong>Speed</strong><span>${speed}</span></div>
            </div>
            <div class="divider"></div>
            <div class="ability-scores-display">
                <div class="ability-score"><div class="ability-name">STR</div><div class="ability-value">${str}</div></div>
                <div class="ability-score"><div class="ability-name">DEX</div><div class="ability-value">${dex}</div></div>
                <div class="ability-score"><div class="ability-name">CON</div><div class="ability-value">${con}</div></div>
                <div class="ability-score"><div class="ability-name">INT</div><div class="ability-value">${int}</div></div>
                <div class="ability-score"><div class="ability-name">WIS</div><div class="ability-value">${wis}</div></div>
                <div class="ability-score"><div class="ability-name">CHA</div><div class="ability-value">${cha}</div></div>
            </div>
            <div class="divider"></div>
            <div class="additional-stats"><p>${additionalStats}</p></div>
            <div class="divider"></div>
            <div class="abilities-section"><p>${description}</p></div>
        </div>
    `;
}

// Generate spell card preview
function generateSpellPreview() {
    const name = document.getElementById('cardName').value || 'Spell Name';
    const level = document.getElementById('spellLevel')?.value || 'Level';
    const school = document.getElementById('spellSchool')?.value || 'School';
    const castingTime = document.getElementById('castingTime')?.value || '-';
    const range = document.getElementById('spellRange')?.value || '-';
    const components = document.getElementById('components')?.value || '-';
    const duration = document.getElementById('duration')?.value || '-';
    const description = document.getElementById('description').value || '';

    return `
        <div class="card-image">
            <img id="previewImage" src="" alt="Card Image">
            <div class="card-name-overlay">
                <h2>${name}</h2>
            </div>
        </div>
        <div class="card-content">
            <div class="card-type spell-header">
                <span>${level}</span>
                <span class="separator">•</span>
                <span>${school}</span>
            </div>
            <div class="divider"></div>
            <div class="card-stats">
                <div class="stat-row"><strong>Cast Time</strong><span>${castingTime}</span></div>
                <div class="stat-row"><strong>Range</strong><span>${range}</span></div>
                <div class="stat-row"><strong>Components</strong><span>${components}</span></div>
                <div class="stat-row"><strong>Duration</strong><span>${duration}</span></div>
            </div>
            <div class="divider"></div>
            <div class="spell-description"><p>${description}</p></div>
        </div>
    `;
}

// Generate item card preview
function generateItemPreview() {
    const name = document.getElementById('cardName').value || 'Item Name';
    const rarity = document.getElementById('itemRarity')?.value || 'Rarity';
    const itemType = document.getElementById('itemType')?.value || 'Type';
    const attunement = document.getElementById('attunement')?.value || '';
    const description = document.getElementById('description').value || '';

    return `
        <div class="card-image">
            <img id="previewImage" src="" alt="Card Image">
            <div class="card-name-overlay">
                <h2>${name}</h2>
            </div>
        </div>
        <div class="card-content">
            <div class="card-type item-header">
                <span>${itemType}</span>
                ${rarity ? '<span class="separator">•</span><span class="item-rarity">' + rarity + '</span>' : ''}
            </div>
            ${attunement ? '<div class="item-attunement">' + attunement + '</div>' : ''}
            <div class="divider"></div>
            <div class="item-description"><p>${description}</p></div>
        </div>
    `;
}

// Generate ability card preview
function generateAbilityPreview() {
    const name = document.getElementById('cardName').value || 'Ability Name';
    const source = document.getElementById('abilitySource')?.value || 'Source';
    const level = document.getElementById('abilityLevel')?.value || '';
    const description = document.getElementById('description').value || '';

    return `
        <div class="card-image">
            <img id="previewImage" src="" alt="Card Image">
            <div class="card-name-overlay">
                <h2>${name}</h2>
            </div>
        </div>
        <div class="card-content">
            <div class="card-type ability-header">
                <span>${source}</span>
                ${level ? '<span class="separator">•</span><span>' + level + '</span>' : ''}
            </div>
            <div class="divider"></div>
            <div class="ability-description"><p>${description}</p></div>
        </div>
    `;
}

// Generate equipment card preview
function generateEquipmentPreview() {
    const name = document.getElementById('cardName').value || 'Equipment Name';
    const equipType = document.getElementById('equipmentType')?.value || 'Type';
    const cost = document.getElementById('equipmentCost')?.value || '';
    const weight = document.getElementById('equipmentWeight')?.value || '';
    const description = document.getElementById('description').value || '';

    return `
        <div class="card-image">
            <img id="previewImage" src="" alt="Card Image">
            <div class="card-name-overlay">
                <h2>${name}</h2>
            </div>
        </div>
        <div class="card-content">
            <div class="card-type equipment-header">
                <span>${equipType}</span>
            </div>
            <div class="equipment-details">
                ${cost ? '<div><strong>Cost:</strong> ' + cost + '</div>' : ''}
                ${weight ? '<div><strong>Weight:</strong> ' + weight + '</div>' : ''}
            </div>
            <div class="divider"></div>
            <div class="equipment-description"><p>${description}</p></div>
        </div>
    `;
}

// ===== IMMERSIVE LAYOUT RENDERING FUNCTIONS =====

// Generate creature card preview with immersive layout (image as background)
function generateCreaturePreviewImmersive() {
    const name = document.getElementById('cardName').value || 'Card Name';
    const type = document.getElementById('cardType').value || 'Type';
    const subtype = document.getElementById('cardSubtype').value || 'Subtype';
    const ac = document.getElementById('ac').value || '-';
    const hp = document.getElementById('hp').value || '-';
    const speed = document.getElementById('speed').value || '-';
    const str = document.getElementById('str').value || '-';
    const dex = document.getElementById('dex').value || '-';
    const con = document.getElementById('con').value || '-';
    const int = document.getElementById('int').value || '-';
    const wis = document.getElementById('wis').value || '-';
    const cha = document.getElementById('cha').value || '-';

    return `
        <div class="card-image-background">
            <img id="previewImage" src="" alt="Card Image">
        </div>
        <div class="immersive-overlay">
            <div class="immersive-name">
                <h2>${name}</h2>
            </div>
            <div class="immersive-type">
                <span>${type}</span>
                <span class="separator">•</span>
                <span>${subtype}</span>
            </div>
            <div class="immersive-stats">
                <div class="stat-item"><strong>AC</strong><span>${ac}</span></div>
                <div class="stat-item"><strong>HP</strong><span>${hp}</span></div>
                <div class="stat-item"><strong>Speed</strong><span>${speed}</span></div>
            </div>
            <div class="immersive-abilities">
                <div class="ability-score"><div class="ability-name">STR</div><div class="ability-value">${str}</div></div>
                <div class="ability-score"><div class="ability-name">DEX</div><div class="ability-value">${dex}</div></div>
                <div class="ability-score"><div class="ability-name">CON</div><div class="ability-value">${con}</div></div>
                <div class="ability-score"><div class="ability-name">INT</div><div class="ability-value">${int}</div></div>
                <div class="ability-score"><div class="ability-name">WIS</div><div class="ability-value">${wis}</div></div>
                <div class="ability-score"><div class="ability-name">CHA</div><div class="ability-value">${cha}</div></div>
            </div>
        </div>
    `;
}

// Generate spell card preview with immersive layout
function generateSpellPreviewImmersive() {
    const name = document.getElementById('cardName').value || 'Spell Name';
    const level = document.getElementById('spellLevel')?.value || 'Level';
    const school = document.getElementById('spellSchool')?.value || 'School';
    const castingTime = document.getElementById('castingTime')?.value || 'Casting Time';
    const range = document.getElementById('range')?.value || 'Range';

    return `
        <div class="card-image-background">
            <img id="previewImage" src="" alt="Card Image">
        </div>
        <div class="immersive-overlay">
            <div class="immersive-name">
                <h2>${name}</h2>
            </div>
            <div class="immersive-type">
                <span>${level} ${school}</span>
            </div>
            <div class="immersive-spell-info">
                <div><strong>Casting Time:</strong> ${castingTime}</div>
                <div><strong>Range:</strong> ${range}</div>
            </div>
        </div>
    `;
}

// Generate item card preview with immersive layout
function generateItemPreviewImmersive() {
    const name = document.getElementById('cardName').value || 'Item Name';
    const rarity = document.getElementById('itemRarity')?.value || 'Rarity';
    const itemType = document.getElementById('itemType')?.value || 'Type';
    const attunement = document.getElementById('attunement')?.value || '';

    return `
        <div class="card-image-background">
            <img id="previewImage" src="" alt="Card Image">
        </div>
        <div class="immersive-overlay">
            <div class="immersive-name">
                <h2>${name}</h2>
            </div>
            <div class="immersive-type">
                <span>${itemType}</span>
                <span class="separator">•</span>
                <span>${rarity}</span>
            </div>
            ${attunement ? '<div class="immersive-attunement">' + attunement + '</div>' : ''}
        </div>
    `;
}

// Generate ability card preview with immersive layout
function generateAbilityPreviewImmersive() {
    const name = document.getElementById('cardName').value || 'Ability Name';
    const source = document.getElementById('abilitySource')?.value || 'Source';
    const level = document.getElementById('abilityLevel')?.value || 'Level';

    return `
        <div class="card-image-background">
            <img id="previewImage" src="" alt="Card Image">
        </div>
        <div class="immersive-overlay">
            <div class="immersive-name">
                <h2>${name}</h2>
            </div>
            <div class="immersive-type">
                <span>${source}</span>
                ${level ? '<span class="separator">•</span><span>' + level + '</span>' : ''}
            </div>
        </div>
    `;
}

// Generate equipment card preview with immersive layout
function generateEquipmentPreviewImmersive() {
    const name = document.getElementById('cardName').value || 'Equipment Name';
    const equipType = document.getElementById('equipmentType')?.value || 'Type';
    const cost = document.getElementById('equipmentCost')?.value || '';
    const weight = document.getElementById('equipmentWeight')?.value || '';

    return `
        <div class="card-image-background">
            <img id="previewImage" src="" alt="Card Image">
        </div>
        <div class="immersive-overlay">
            <div class="immersive-name">
                <h2>${name}</h2>
            </div>
            <div class="immersive-type">
                <span>${equipType}</span>
            </div>
            <div class="immersive-equipment-details">
                ${cost ? '<div><strong>Cost:</strong> ' + cost + '</div>' : ''}
                ${weight ? '<div><strong>Weight:</strong> ' + weight + '</div>' : ''}
            </div>
        </div>
    `;
}

// Update back card based on layout and template
function updateBackCard() {
    const layoutStyle = cardLayoutSelect.value;
    const backCardContent = document.querySelector('.back-card-content');

    if (!backCardContent) return;

    if (layoutStyle === 'immersive') {
        // For immersive layout, show mirrored background image with additional content
        const additionalStats = document.getElementById('additionalStats')?.value || '';
        const description = document.getElementById('description')?.value || '';

        // Create rich back card content
        backCardContent.innerHTML = `
            <div class="back-card-background">
                <img id="backCardPreviewImage" src="" alt="Back Card Design">
            </div>
            <div class="back-card-overlay">
                ${additionalStats ? '<div class="back-additional-stats"><h3>Additional Stats</h3><p>' + additionalStats + '</p></div>' : ''}
                ${description ? '<div class="back-description"><h3>Description</h3><p>' + description + '</p></div>' : ''}
            </div>
        `;

        // Apply back card image if available
        const newBackImage = document.getElementById('backCardPreviewImage');
        if (newBackImage) {
            // First check if user uploaded a custom back card image
            if (window.backCardImageData) {
                newBackImage.src = window.backCardImageData;
            }
            // Otherwise use the front card image as mirrored background
            else if (previewImage.src) {
                newBackImage.src = previewImage.src;
                newBackImage.style.transform = 'scaleX(-1)'; // Mirror the image
            }
        }
    } else {
        // Standard back card with just the image
        backCardContent.innerHTML = `
            <img id="backCardPreviewImage" src="" alt="Back Card Design">
        `;

        const newBackImage = document.getElementById('backCardPreviewImage');
        if (newBackImage) {
            // First check if user uploaded a custom back card image
            if (window.backCardImageData) {
                newBackImage.src = window.backCardImageData;
            }
            // Otherwise leave it empty (default back card)
        }
    }
}

// Generate three-column trifold panels
function generateThreeColumnPanels() {
    const templateId = currentTemplate;

    // Front panel - image + basic stats
    const frontPanel = generateThreeColumnFront(templateId);

    // Back panel 1 - additional stats
    const back1Panel = generateThreeColumnBack1(templateId);

    // Back panel 2 - description/abilities
    const back2Panel = generateThreeColumnBack2(templateId);

    return { frontPanel, back1Panel, back2Panel };
}

function generateThreeColumnFront(templateId) {
    const name = document.getElementById('cardName').value || 'Card Name';

    if (templateId === 'creature') {
        const type = document.getElementById('cardType').value || 'Type';
        const subtype = document.getElementById('cardSubtype').value || 'Subtype';
        const ac = document.getElementById('ac').value || '-';
        const hp = document.getElementById('hp').value || '-';
        const speed = document.getElementById('speed').value || '-';
        const str = document.getElementById('str').value || '-';
        const dex = document.getElementById('dex').value || '-';
        const con = document.getElementById('con').value || '-';
        const int = document.getElementById('int').value || '-';
        const wis = document.getElementById('wis').value || '-';
        const cha = document.getElementById('cha').value || '-';

        return `
            <div class="card-image">
                <img id="previewImage" src="" alt="Card Image">
                <div class="card-name-overlay">
                    <h2>${name}</h2>
                </div>
            </div>
            <div class="card-content">
                <div class="card-type">
                    <span>${type}</span>
                    <span class="separator">•</span>
                    <span>${subtype}</span>
                </div>
                <div class="divider"></div>
                <div class="card-stats">
                    <div class="stat-row"><strong>AC</strong><span>${ac}</span></div>
                    <div class="stat-row"><strong>HP</strong><span>${hp}</span></div>
                    <div class="stat-row"><strong>Speed</strong><span>${speed}</span></div>
                </div>
                <div class="divider"></div>
                <div class="ability-scores-display">
                    <div class="ability-score"><div class="ability-name">STR</div><div class="ability-value">${str}</div></div>
                    <div class="ability-score"><div class="ability-name">DEX</div><div class="ability-value">${dex}</div></div>
                    <div class="ability-score"><div class="ability-name">CON</div><div class="ability-value">${con}</div></div>
                    <div class="ability-score"><div class="ability-name">INT</div><div class="ability-value">${int}</div></div>
                    <div class="ability-score"><div class="ability-name">WIS</div><div class="ability-value">${wis}</div></div>
                    <div class="ability-score"><div class="ability-name">CHA</div><div class="ability-value">${cha}</div></div>
                </div>
            </div>
        `;
    }

    // For other templates, return basic structure with image and name
    return `
        <div class="card-image">
            <img id="previewImage" src="" alt="Card Image">
            <div class="card-name-overlay">
                <h2>${name}</h2>
            </div>
        </div>
        <div class="card-content">
            <p style="text-align: center; margin-top: 20px;">Front Panel</p>
        </div>
    `;
}

function generateThreeColumnBack1(templateId) {
    const name = document.getElementById('cardName').value || 'Card Name';

    if (templateId === 'creature') {
        const additionalStats = document.getElementById('additionalStats').value || '';

        return `
            <div class="card-content" style="padding: 20px;">
                <div class="card-name-overlay" style="position: relative; background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); padding: 16px; margin: -20px -20px 20px -20px;">
                    <h2 style="margin: 0; text-align: center;">${name}</h2>
                </div>
                <h3 style="text-align: center; color: var(--card-label-color); margin-bottom: 15px;">Additional Stats</h3>
                <div class="divider"></div>
                <div class="additional-stats">
                    <p style="white-space: pre-wrap;">${additionalStats || 'No additional stats'}</p>
                </div>
            </div>
        `;
    }

    return `
        <div class="card-content" style="padding: 20px;">
            <h3 style="text-align: center;">Panel 2</h3>
            <p>Additional information</p>
        </div>
    `;
}

function generateThreeColumnBack2(templateId) {
    const name = document.getElementById('cardName').value || 'Card Name';

    if (templateId === 'creature') {
        const description = document.getElementById('description').value || '';

        return `
            <div class="card-content" style="padding: 20px;">
                <div class="card-name-overlay" style="position: relative; background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); padding: 16px; margin: -20px -20px 20px -20px;">
                    <h2 style="margin: 0; text-align: center;">${name}</h2>
                </div>
                <h3 style="text-align: center; color: var(--card-label-color); margin-bottom: 15px;">Abilities & Actions</h3>
                <div class="divider"></div>
                <div class="abilities-section">
                    <p style="white-space: pre-wrap;">${description || 'No abilities or actions'}</p>
                </div>
            </div>
        `;
    }

    return `
        <div class="card-content" style="padding: 20px;">
            <h3 style="text-align: center;">Panel 3</h3>
            <p>Description</p>
        </div>
    `;
}

// Update cards display layout based on selected layout style
function updateCardsDisplayLayout() {
    const layoutStyle = cardLayoutSelect.value;
    const cardsDisplay = document.querySelector('.cards-display');
    const cardFront = document.getElementById('cardPreview');
    const cardBack = document.querySelector('.card-back');

    if (layoutStyle === 'three-column') {
        // Add three-column class
        cardsDisplay.classList.add('three-column');

        // Remove any existing panel cards
        const existingPanels = cardsDisplay.querySelectorAll('.trifold-panel');
        existingPanels.forEach(panel => panel.remove());

        // Generate three distinct panels
        const { frontPanel, back1Panel, back2Panel } = generateThreeColumnPanels();

        // Create back panel 1
        const panel1 = document.createElement('div');
        panel1.className = 'card card-front trifold-panel';
        panel1.id = 'trifold-panel-1';
        panel1.innerHTML = back1Panel;
        cardsDisplay.insertBefore(panel1, cardBack);

        // Create back panel 2
        const panel2 = document.createElement('div');
        panel2.className = 'card card-front trifold-panel';
        panel2.id = 'trifold-panel-2';
        panel2.innerHTML = back2Panel;
        cardsDisplay.insertBefore(panel2, cardBack);

        // Hide the back card in three-column layout
        if (cardBack) {
            cardBack.style.display = 'none';
        }
    } else {
        // Remove three-column class
        cardsDisplay.classList.remove('three-column');

        // Remove trifold panels
        const existingPanels = cardsDisplay.querySelectorAll('.trifold-panel');
        existingPanels.forEach(panel => panel.remove());

        // Show the back card for other layouts
        if (cardBack) {
            cardBack.style.display = '';
        }
    }
}

// Parse D&D character text and extract card data
function parseCharacterText(text) {
    const lines = text.trim().split('\n').filter(line => line.trim());

    const parsedData = {
        cardName: '',
        cardType: '',
        cardSubtype: '',
        ac: '',
        hp: '',
        speed: '',
        str: '',
        dex: '',
        con: '',
        int: '',
        wis: '',
        cha: '',
        additionalStats: '',
        description: ''
    };

    if (lines.length === 0) return parsedData;

    // Parse first line: "Name – Type/Class"
    const firstLine = lines[0];
    if (firstLine.includes('–') || firstLine.includes('-')) {
        const separator = firstLine.includes('–') ? '–' : '-';
        const parts = firstLine.split(separator);
        parsedData.cardName = parts[0].trim();
        if (parts[1]) {
            const typeInfo = parts[1].trim();
            // Try to separate race and class
            const typeParts = typeInfo.split(' ');
            if (typeParts.length >= 2) {
                parsedData.cardType = typeParts[0]; // First word (e.g., "Human")
                parsedData.cardSubtype = typeParts.slice(1).join(' '); // Rest (e.g., "Grave Cleric")
            } else {
                parsedData.cardType = typeInfo;
            }
        }
    } else {
        parsedData.cardName = firstLine;
    }

    // Parse stats line: "AC: X | HP: Y | Speed: Z"
    const statsLine = lines.find(line => /AC:/i.test(line) && /HP:/i.test(line));
    if (statsLine) {
        const acMatch = statsLine.match(/AC:\s*(\d+[^|]*)/i);
        const hpMatch = statsLine.match(/HP:\s*([^|]*)/i);
        const speedMatch = statsLine.match(/Speed:\s*(.*?)$/i);

        if (acMatch) parsedData.ac = acMatch[1].trim();
        if (hpMatch) parsedData.hp = hpMatch[1].trim();
        if (speedMatch) parsedData.speed = speedMatch[1].trim();
    }

    // Parse ability scores line: "STR X (+Y) DEX X (+Y) ..."
    const abilityLine = lines.find(line => /STR\s+\d+/.test(line));
    if (abilityLine) {
        const strMatch = abilityLine.match(/STR\s+(\d+\s*\([^)]+\))/);
        const dexMatch = abilityLine.match(/DEX\s+(\d+\s*\([^)]+\))/);
        const conMatch = abilityLine.match(/CON\s+(\d+\s*\([^)]+\))/);
        const intMatch = abilityLine.match(/INT\s+(\d+\s*\([^)]+\))/);
        const wisMatch = abilityLine.match(/WIS\s+(\d+\s*\([^)]+\))/);
        const chaMatch = abilityLine.match(/CHA\s+(\d+\s*\([^)]+\))/);

        if (strMatch) parsedData.str = strMatch[1].trim();
        if (dexMatch) parsedData.dex = dexMatch[1].trim();
        if (conMatch) parsedData.con = conMatch[1].trim();
        if (intMatch) parsedData.int = intMatch[1].trim();
        if (wisMatch) parsedData.wis = wisMatch[1].trim();
        if (chaMatch) parsedData.cha = chaMatch[1].trim();
    }

    // Collect remaining lines for additional stats and description
    const additionalLines = [];
    const descriptionLines = [];
    let inDescription = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Skip lines we've already processed
        if (line === firstLine || line === statsLine || line === abilityLine) {
            continue;
        }

        // Check if this looks like a feature/ability (contains colons, starts with capital, etc.)
        if (line.includes(':') || /^[A-Z]/.test(line)) {
            if (line.toLowerCase().includes('feature') ||
                line.toLowerCase().includes('equipment') ||
                line.toLowerCase().includes('spell') ||
                line.toLowerCase().includes('saving throw') ||
                line.toLowerCase().includes('skill')) {
                additionalLines.push(line);
            } else {
                descriptionLines.push(line);
            }
        } else if (line.trim()) {
            descriptionLines.push(line);
        }
    }

    // Populate additional stats and description
    parsedData.additionalStats = additionalLines.join('\n').trim();
    parsedData.description = descriptionLines.join('\n\n').trim();

    return parsedData;
}

// Import and auto-fill card data from text
function importCardData() {
    const text = importTextArea.value;
    if (!text.trim()) {
        alert('Please paste character data to import.');
        return;
    }

    // Parse the text
    const data = parseCharacterText(text);

    // Switch to creature template if not already
    if (currentTemplate !== 'creature') {
        loadTemplate('creature');
        cardTemplateSelect.value = 'creature';
    }

    // Fill in the form fields
    if (data.cardName) document.getElementById('cardName').value = data.cardName;
    if (data.cardType) document.getElementById('cardType').value = data.cardType;
    if (data.cardSubtype) document.getElementById('cardSubtype').value = data.cardSubtype;
    if (data.ac) document.getElementById('ac').value = data.ac;
    if (data.hp) document.getElementById('hp').value = data.hp;
    if (data.speed) document.getElementById('speed').value = data.speed;
    if (data.str) document.getElementById('str').value = data.str;
    if (data.dex) document.getElementById('dex').value = data.dex;
    if (data.con) document.getElementById('con').value = data.con;
    if (data.int) document.getElementById('int').value = data.int;
    if (data.wis) document.getElementById('wis').value = data.wis;
    if (data.cha) document.getElementById('cha').value = data.cha;
    if (data.additionalStats) document.getElementById('additionalStats').value = data.additionalStats;
    if (data.description) document.getElementById('description').value = data.description;

    // Update the preview
    updatePreview();

    // Clear the import text area
    importTextArea.value = '';

    // Show success message
    alert('Card data imported successfully!');
}

// Attach event listeners
function attachEventListeners() {
    // Template change
    cardTemplateSelect.addEventListener('change', function() {
        loadTemplate(this.value);
    });

    // Layout style change
    cardLayoutSelect.addEventListener('change', function() {
        updatePreview();
        updateCardsDisplayLayout();
    });

    // Image upload handler
    imageUploadInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = document.getElementById('previewImage');
                if (img) {
                    img.src = event.target.result;
                    img.style.display = 'block';

                    // Auto-adjust image height based on image dimensions
                    const tempImg = new Image();
                    tempImg.onload = function() {
                        const cardWidth = 750; // CSS variable --card-width
                        const aspectRatio = tempImg.naturalHeight / tempImg.naturalWidth;
                        let calculatedHeight = Math.round(cardWidth * aspectRatio);

                        // Clamp between 150 and 600
                        calculatedHeight = Math.max(150, Math.min(600, calculatedHeight));

                        // Update the slider and value display
                        const heightSlider = document.getElementById('cardImageHeight');
                        const heightValue = document.getElementById('cardImageHeightValue');
                        if (heightSlider && heightValue) {
                            heightSlider.value = calculatedHeight;
                            heightValue.textContent = calculatedHeight;

                            // Apply the theme with new height
                            const theme = getCurrentTheme();
                            applyTheme(theme);
                        }
                    };
                    tempImg.src = event.target.result;

                    // Update background image if feature is enabled
                    const useImageAsBackground = document.getElementById('useImageAsBackground');
                    if (useImageAsBackground && useImageAsBackground.checked) {
                        document.documentElement.style.setProperty('--card-background-image', `url('${event.target.result}')`);
                    }

                    // Update back card to reflect new front card image
                    updateBackCard();
                }
            };
            reader.readAsDataURL(file);
        }
    });

    // Image source toggle
    imageSourceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'upload') {
                imageUploadInput.style.display = 'block';
                imageUrlInput.style.display = 'none';
                loadImageBtn.style.display = 'none';
            } else {
                imageUploadInput.style.display = 'none';
                imageUrlInput.style.display = 'block';
                loadImageBtn.style.display = 'block';
            }
        });
    });

    // Load image from URL
    loadImageBtn.addEventListener('click', function() {
        const url = imageUrlInput.value.trim();
        if (url) {
            const img = document.getElementById('previewImage');
            if (img) {
                img.src = url;
                img.style.display = 'block';
                img.onerror = function() {
                    alert('Failed to load image from URL. Please check the URL and try again.');
                };
                img.onload = function() {
                    // Auto-adjust image height based on image dimensions
                    const cardWidth = 750; // CSS variable --card-width
                    const aspectRatio = img.naturalHeight / img.naturalWidth;
                    let calculatedHeight = Math.round(cardWidth * aspectRatio);

                    // Clamp between 150 and 600
                    calculatedHeight = Math.max(150, Math.min(600, calculatedHeight));

                    // Update the slider and value display
                    const heightSlider = document.getElementById('cardImageHeight');
                    const heightValue = document.getElementById('cardImageHeightValue');
                    if (heightSlider && heightValue) {
                        heightSlider.value = calculatedHeight;
                        heightValue.textContent = calculatedHeight;

                        // Apply the theme with new height
                        const theme = getCurrentTheme();
                        applyTheme(theme);
                    }

                    // Update background image if feature is enabled
                    const useImageAsBackground = document.getElementById('useImageAsBackground');
                    if (useImageAsBackground && useImageAsBackground.checked) {
                        document.documentElement.style.setProperty('--card-background-image', `url('${url}')`);
                    }

                    // Update back card to reflect new front card image
                    updateBackCard();
                };
            }
        } else {
            alert('Please enter an image URL');
        }
    });

    // Clear image button
    clearImageBtn.addEventListener('click', function() {
        // Clear the preview image
        const img = document.getElementById('previewImage');
        if (img) {
            img.src = '';
            img.style.display = 'none';
        }

        // Clear the file input
        imageUploadInput.value = '';

        // Clear the URL input
        imageUrlInput.value = '';

        // Clear background image if it was set
        const root = document.documentElement;
        root.style.setProperty('--card-background-image', 'none');
        cardPreview.classList.remove('image-as-background');

        // Update back card to reflect removal
        updateBackCard();

        // Show confirmation
        const originalText = clearImageBtn.textContent;
        clearImageBtn.textContent = 'Cleared!';
        setTimeout(() => {
            clearImageBtn.textContent = originalText;
        }, 1000);
    });

    // Import button
    importBtn.addEventListener('click', importCardData);

    // Reset button
    resetBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to reset all fields to default values?')) {
            loadTemplate(currentTemplate);
            const img = document.getElementById('previewImage');
            if (img) {
                img.src = '';
            }
            imageUploadInput.value = '';
            imageUrlInput.value = '';
        }
    });

    // Export button
    exportBtn.addEventListener('click', async function() {
        const cardElement = document.getElementById('cardPreview');
        const cardName = document.getElementById('cardName').value || 'dnd_card';

        try {
            if (typeof html2canvas !== 'undefined') {
                const canvas = await html2canvas(cardElement, {
                    scale: 4, // High resolution for print (300 DPI equivalent)
                    backgroundColor: '#f9f6f0',
                    logging: false,
                    width: 750, // 2.5" at 300 DPI
                    height: 1050 // 3.5" at 300 DPI
                });

                canvas.toBlob(function(blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.download = `${cardName.replace(/\s+/g, '_')}.png`;
                    link.href = url;
                    link.click();
                    URL.revokeObjectURL(url);
                });
            } else {
                alert('Export library not loaded. Please refresh the page and try again.');
            }
        } catch (error) {
            console.error('Export failed:', error);
            alert('Export failed. Please try again.');
        }
    });

    // Add input listeners for live preview
    document.querySelectorAll('input, textarea, select').forEach(element => {
        if (element.type !== 'file' && element.type !== 'radio') {
            element.addEventListener('input', updatePreview);
        }
    });

    // Deck management event listeners
    addToDeckBtn.addEventListener('click', addCardToDeck);
    viewDeckBtn.addEventListener('click', showDeckModal);
    printPreviewBtn.addEventListener('click', showPrintPreview);
    clearDeckBtn.addEventListener('click', clearDeck);
    exportDeckBtn.addEventListener('click', exportAllCards);
    saveDeckFileBtn.addEventListener('click', saveDeckToFile);
    loadDeckFileBtn.addEventListener('click', () => loadDeckFileInput.click());
    loadDeckFileInput.addEventListener('change', loadDeckFromFile);
    closeDeckModal.addEventListener('click', () => deckModal.classList.remove('active'));
    closePrintModal.addEventListener('click', () => printModal.classList.remove('active'));
    printBtn.addEventListener('click', () => window.print());

    // Print alignment controls
    alignLeftBtn.addEventListener('click', adjustAlignmentLeft);
    alignRightBtn.addEventListener('click', adjustAlignmentRight);
    resetAlignmentBtn.addEventListener('click', resetPrintAlignment);

    // Close modals on outside click
    deckModal.addEventListener('click', (e) => {
        if (e.target === deckModal) {
            deckModal.classList.remove('active');
        }
    });
    printModal.addEventListener('click', (e) => {
        if (e.target === printModal) {
            printModal.classList.remove('active');
        }
    });
}

// Deck Management Functions

// IndexedDB wrapper for larger storage capacity
const DeckDB = {
    dbName: 'CardDeckDB',
    dbVersion: 1,
    storeName: 'decks',
    db: null,

    // Initialize IndexedDB
    init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => {
                console.error('IndexedDB error:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create object store if it doesn't exist
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'id' });
                }
            };
        });
    },

    // Save deck to IndexedDB
    saveDeck(deckData) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const objectStore = transaction.objectStore(this.storeName);
            const request = objectStore.put({ id: 'mainDeck', data: deckData, timestamp: Date.now() });

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    },

    // Load deck from IndexedDB
    loadDeck() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const transaction = this.db.transaction([this.storeName], 'readonly');
            const objectStore = transaction.objectStore(this.storeName);
            const request = objectStore.get('mainDeck');

            request.onsuccess = () => {
                if (request.result && request.result.data) {
                    resolve(request.result.data);
                } else {
                    resolve([]);
                }
            };
            request.onerror = () => reject(request.error);
        });
    },

    // Migrate data from localStorage to IndexedDB
    async migrateFromLocalStorage() {
        const savedDeck = localStorage.getItem('cardDeck');
        if (savedDeck) {
            try {
                const deckData = JSON.parse(savedDeck);
                await this.saveDeck(deckData);
                console.log('Migrated deck from localStorage to IndexedDB');
                // Keep localStorage as backup for now
                // localStorage.removeItem('cardDeck');
            } catch (e) {
                console.error('Migration error:', e);
            }
        }
    }
};

// Load deck from IndexedDB
async function loadDeck() {
    try {
        // Initialize IndexedDB
        await DeckDB.init();

        // Check if we need to migrate from localStorage
        const hasLocalStorage = localStorage.getItem('cardDeck');
        if (hasLocalStorage) {
            await DeckDB.migrateFromLocalStorage();
        }

        // Load from IndexedDB
        deck = await DeckDB.loadDeck();
    } catch (e) {
        console.error('Failed to load deck from IndexedDB:', e);

        // Fallback to localStorage
        const savedDeck = localStorage.getItem('cardDeck');
        if (savedDeck) {
            try {
                deck = JSON.parse(savedDeck);
            } catch (err) {
                deck = [];
            }
        } else {
            deck = [];
        }
    }

    // Ensure all cards have unique IDs
    await ensureAllCardsHaveIDs();
}

// Helper function to ensure all cards in deck have unique IDs
async function ensureAllCardsHaveIDs() {
    let needsSave = false;

    // First, find the highest counter value in existing IDs to avoid conflicts
    let maxCounter = 0;
    deck.forEach(card => {
        if (card.id) {
            const match = card.id.match(/^card_(\d+)_/);
            if (match) {
                const counter = parseInt(match[1]);
                if (counter > maxCounter) {
                    maxCounter = counter;
                }
            }
        }
    });

    // Set the global counter to be higher than any existing
    if (maxCounter > cardIdCounter) {
        cardIdCounter = maxCounter;
    }

    // Assign IDs to cards that don't have them
    deck.forEach((card, index) => {
        if (!card.id) {
            cardIdCounter++;
            card.id = 'card_' + cardIdCounter + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            needsSave = true;
            console.log('Assigned ID to card:', card.name, 'ID:', card.id);
        }
    });

    console.log('Deck processed. Card ID counter:', cardIdCounter);
    console.log('Total cards with IDs:', deck.filter(c => c.id).length, '/', deck.length);

    // Save if we added IDs
    if (needsSave) {
        await saveDeck();
        console.log('Deck saved after ID assignment');
    }
}

// Save deck to IndexedDB
async function saveDeck() {
    try {
        // Save to IndexedDB (much larger capacity than localStorage)
        await DeckDB.saveDeck(deck);

        // Also try to save to localStorage as backup (if it fits)
        try {
            localStorage.setItem('cardDeck', JSON.stringify(deck));
        } catch (localStorageError) {
            // Ignore localStorage quota errors - IndexedDB is our primary storage now
            console.log('localStorage quota exceeded, using IndexedDB only');
        }

        // Show auto-save notification
        showAutoSaveNotification();
    } catch (e) {
        // IndexedDB errors are rare but handle them gracefully
        console.error('Failed to save deck:', e);
        alert('Failed to save deck: ' + e.message + '\n\nTry exporting your deck to a file as a backup.');
    }
}

// Show auto-save notification
function showAutoSaveNotification() {
    if (!autoSaveNotification) return;

    autoSaveNotification.classList.add('show');

    // Hide after 2 seconds
    setTimeout(() => {
        autoSaveNotification.classList.remove('show');
    }, 2000);
}

// Update deck counter
function updateDeckCounter() {
    deckCountSpan.textContent = deck.length;
}

// Capture current card state
function captureCardState() {
    const template = templates[currentTemplate];
    const formFields = {};

    // Save all form field values for the current template
    template.fields.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            if (element.type === 'file') {
                // Don't save file input value, we'll use the image data instead
                return;
            }
            formFields[fieldId] = element.value;
        }
    });

    // Get current theme settings from CSS variables
    const root = document.documentElement;
    const currentTheme = {
        fontFamily: root.style.getPropertyValue('--card-font-family') || defaultTheme.fontFamily,
        cardNameSize: parseFloat(root.style.getPropertyValue('--card-name-size')) || defaultTheme.cardNameSize,
        cardHeaderSize: parseFloat(root.style.getPropertyValue('--card-header-size')) || defaultTheme.cardHeaderSize,
        cardDescriptionSize: parseFloat(root.style.getPropertyValue('--card-description-size')) || defaultTheme.cardDescriptionSize,
        cardStatLabelSize: parseFloat(root.style.getPropertyValue('--card-stat-label-size')) || defaultTheme.cardStatLabelSize,
        cardImageHeight: parseFloat(root.style.getPropertyValue('--card-image-height')) || defaultTheme.cardImageHeight,
        sectionSpacing: parseFloat(root.style.getPropertyValue('--section-spacing')) || defaultTheme.sectionSpacing,
        cardBgColor: root.style.getPropertyValue('--card-bg-color') || defaultTheme.cardBgColor,
        cardBorderColor: root.style.getPropertyValue('--card-border-color') || defaultTheme.cardBorderColor,
        cardTextColor: root.style.getPropertyValue('--card-text-color') || defaultTheme.cardTextColor,
        cardLabelColor: root.style.getPropertyValue('--card-label-color') || defaultTheme.cardLabelColor,
        cardNameColor: root.style.getPropertyValue('--card-name-color') || defaultTheme.cardNameColor,
        useImageAsBackground: cardPreview.classList.contains('image-as-background'),
        contentOpacity: parseFloat(root.style.getPropertyValue('--content-opacity')) || defaultTheme.contentOpacity,
        backCardBgColor: root.style.getPropertyValue('--back-card-bg-color') || defaultTheme.backCardBgColor
    };

    // Generate truly unique ID with counter
    cardIdCounter++;
    const uniqueId = 'card_' + cardIdCounter + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    const cardData = {
        id: uniqueId,
        template: currentTemplate,
        layout: cardLayoutSelect.value,
        html: cardPreview.innerHTML,
        timestamp: Date.now(),
        name: document.getElementById('cardName').value || 'Unnamed Card',
        formFields: formFields,
        theme: currentTheme,
        hasBackgroundImage: cardPreview.classList.contains('image-as-background'),
        backgroundImage: cardPreview.classList.contains('image-as-background')
            ? getComputedStyle(document.documentElement).getPropertyValue('--card-background-image')
            : null,
        contentOpacity: cardPreview.classList.contains('image-as-background')
            ? getComputedStyle(document.documentElement).getPropertyValue('--content-opacity')
            : null,
        backCardImage: window.backCardImageData || '',
        backCardBgColor: document.getElementById('backCardBgColor').value || '#2c3e50',
        // Save additional content for back card
        additionalStats: document.getElementById('additionalStats')?.value || '',
        description: document.getElementById('description')?.value || '',
        // Save front card image for back card mirroring
        frontCardImage: document.getElementById('previewImage')?.src || ''
    };
    return cardData;
}

// Load card state into editor for editing
function loadCardIntoEditor(cardData) {
    // Load the template first
    currentTemplate = cardData.template;
    cardTemplateSelect.value = cardData.template;
    loadTemplate(cardData.template);

    // Set the layout
    cardLayoutSelect.value = cardData.layout || 'immersive';

    // Restore all form field values
    if (cardData.formFields) {
        Object.keys(cardData.formFields).forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (element && element.type !== 'file') {
                element.value = cardData.formFields[fieldId];
            }
        });
    }

    // Restore image if present
    if (cardData.frontCardImage) {
        previewImage.src = cardData.frontCardImage;
        previewImage.style.display = 'block';
        document.querySelector('input[name="imageSource"][value="url"]').checked = true;
    }

    // Restore back card image if present
    if (cardData.backCardImage) {
        window.backCardImageData = cardData.backCardImage;
    }

    // Restore theme settings
    if (cardData.theme) {
        applyTheme(cardData.theme);

        // Update theme input fields
        document.getElementById('fontFamily').value = cardData.theme.fontFamily;
        document.getElementById('cardNameSize').value = cardData.theme.cardNameSize;
        document.getElementById('cardHeaderSize').value = cardData.theme.cardHeaderSize;
        document.getElementById('cardDescriptionSize').value = cardData.theme.cardDescriptionSize;
        document.getElementById('cardStatLabelSize').value = cardData.theme.cardStatLabelSize;
        document.getElementById('cardImageHeight').value = cardData.theme.cardImageHeight;
        document.getElementById('sectionSpacing').value = cardData.theme.sectionSpacing;
        document.getElementById('cardBgColor').value = cardData.theme.cardBgColor;
        document.getElementById('cardBorderColor').value = cardData.theme.cardBorderColor;
        document.getElementById('cardTextColor').value = cardData.theme.cardTextColor;
        document.getElementById('cardLabelColor').value = cardData.theme.cardLabelColor;
        document.getElementById('cardNameColor').value = cardData.theme.cardNameColor;
        document.getElementById('backCardBgColor').value = cardData.theme.backCardBgColor;

        // Handle image as background setting
        const useImageBgCheckbox = document.getElementById('useImageAsBackground');
        if (useImageBgCheckbox) {
            useImageBgCheckbox.checked = cardData.theme.useImageAsBackground || false;
        }

        const contentOpacityInput = document.getElementById('contentOpacity');
        if (contentOpacityInput) {
            contentOpacityInput.value = cardData.theme.contentOpacity || 0.3;
        }
    }

    // Update the preview
    updatePreview();

    // Restore background image styling if it was saved (for immersive layout)
    if (cardData.hasBackgroundImage && cardData.backgroundImage) {
        const card = document.getElementById('cardPreview');
        const root = document.documentElement;
        card.classList.add('image-as-background');
        root.style.setProperty('--card-background-image', cardData.backgroundImage);
        if (cardData.contentOpacity) {
            root.style.setProperty('--content-opacity', cardData.contentOpacity);
        }
    }

    // Close the deck modal
    deckModal.classList.remove('active');

    // Scroll to top of page to show the editor
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add card to deck
async function addCardToDeck() {
    const cardData = captureCardState();
    deck.push(cardData);
    await saveDeck();
    updateDeckCounter();

    // Show confirmation
    const originalText = addToDeckBtn.textContent;
    addToDeckBtn.textContent = 'Added!';
    addToDeckBtn.style.background = '#218838';
    setTimeout(() => {
        addToDeckBtn.textContent = originalText;
        addToDeckBtn.style.background = '';
    }, 1000);
}

// Show deck modal
function showDeckModal() {
    if (deck.length === 0) {
        deckGrid.innerHTML = '<div class="deck-empty">No cards in deck yet. Create a card and click "Add to Deck".</div>';
    } else {
        deckGrid.innerHTML = '';
        deck.forEach((cardData, index) => {
            const cardContainer = document.createElement('div');
            cardContainer.className = 'deck-card-container';

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-card-btn';
            removeBtn.innerHTML = '&times;';
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card selection when clicking remove
                removeCardFromDeck(index);
            });

            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.innerHTML = cardData.html;
            cardDiv.style.cursor = 'pointer'; // Show it's clickable
            cardDiv.title = 'Click to edit this card';

            // Restore the front card image if it was saved
            if (cardData.frontCardImage) {
                const imgElement = cardDiv.querySelector('#previewImage');
                if (imgElement) {
                    imgElement.src = cardData.frontCardImage;
                }
            }

            // Add click handler to load card into editor
            cardDiv.addEventListener('click', () => {
                loadCardIntoEditor(cardData);
            });

            // Apply background image styling if it was saved (for old "image-as-background" feature)
            if (cardData.hasBackgroundImage && cardData.backgroundImage) {
                cardDiv.classList.add('image-as-background');
                cardDiv.style.setProperty('--card-background-image', cardData.backgroundImage);
                cardDiv.style.setProperty('--content-opacity', cardData.contentOpacity || '0.3');
                cardDiv.style.background = 'none';
            }

            cardContainer.appendChild(removeBtn);
            cardContainer.appendChild(cardDiv);
            deckGrid.appendChild(cardContainer);
        });
    }
    deckModal.classList.add('active');
}

// Remove card from deck
async function removeCardFromDeck(index) {
    if (confirm('Remove this card from the deck?')) {
        deck.splice(index, 1);
        await saveDeck();
        updateDeckCounter();
        showDeckModal(); // Refresh the modal
    }
}

// Clear entire deck
async function clearDeck() {
    if (confirm('Are you sure you want to clear the entire deck? This cannot be undone.')) {
        deck = [];
        await saveDeck();
        updateDeckCounter();
        showDeckModal(); // Refresh the modal
    }
}

// Save deck to JSON file
function saveDeckToFile() {
    if (deck.length === 0) {
        alert('No cards in deck to save.');
        return;
    }

    const dataStr = JSON.stringify(deck, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dnd-card-deck-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Visual feedback
    const originalText = saveDeckFileBtn.textContent;
    saveDeckFileBtn.textContent = 'Saved!';
    saveDeckFileBtn.style.background = '#218838';
    setTimeout(() => {
        saveDeckFileBtn.textContent = originalText;
        saveDeckFileBtn.style.background = '';
    }, 2000);
}

// Load deck from JSON file
function loadDeckFromFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            const loadedDeck = JSON.parse(e.target.result);

            // Validate that it's an array
            if (!Array.isArray(loadedDeck)) {
                alert('Invalid deck file format.');
                return;
            }

            // Validate each card has required properties
            const validatedDeck = loadedDeck.filter(card => {
                return card && card.template && card.layout && card.html && card.name;
            });

            // Warn if some cards were invalid
            if (validatedDeck.length < loadedDeck.length) {
                alert(`Warning: ${loadedDeck.length - validatedDeck.length} invalid card(s) were skipped during import.`);
            }

            if (validatedDeck.length === 0) {
                alert('No valid cards found in the deck file.');
                return;
            }

            // Ask user if they want to replace or append
            let shouldReplace = true;
            if (deck.length > 0) {
                shouldReplace = confirm(
                    `You have ${deck.length} card(s) in your current deck.\n\n` +
                    `Click OK to REPLACE your current deck with ${validatedDeck.length} card(s) from the file.\n` +
                    `Click Cancel to ADD the ${validatedDeck.length} card(s) to your current deck.`
                );
            }

            if (shouldReplace) {
                deck = validatedDeck;
            } else {
                deck = deck.concat(validatedDeck);
            }

            // Ensure all imported cards have unique IDs
            console.log('Ensuring all imported cards have IDs...');
            await ensureAllCardsHaveIDs();

            updateDeckCounter();
            showDeckModal(); // Refresh the modal

            // Visual feedback
            const originalText = loadDeckFileBtn.textContent;
            loadDeckFileBtn.textContent = 'Loaded!';
            loadDeckFileBtn.style.background = '#218838';
            setTimeout(() => {
                loadDeckFileBtn.textContent = originalText;
                loadDeckFileBtn.style.background = '';
            }, 2000);

        } catch (error) {
            alert('Error loading deck file. Please make sure it is a valid JSON file.');
            console.error('Error loading deck:', error);
        }
    };
    reader.readAsText(file);

    // Reset the input so the same file can be loaded again if needed
    event.target.value = '';
}

// Export all cards
async function exportAllCards() {
    if (deck.length === 0) {
        alert('No cards in deck to export.');
        return;
    }

    if (typeof html2canvas === 'undefined') {
        alert('Export library not loaded. Please refresh the page and try again.');
        return;
    }

    exportDeckBtn.textContent = 'Exporting...';
    exportDeckBtn.disabled = true;

    try {
        for (let i = 0; i < deck.length; i++) {
            const cardData = deck[i];

            // Create temporary card element
            const tempCard = document.createElement('div');
            tempCard.className = 'card';
            tempCard.style.position = 'absolute';
            tempCard.style.left = '-9999px';
            tempCard.innerHTML = cardData.html;

            // Restore the front card image if it was saved
            if (cardData.frontCardImage) {
                const imgElement = tempCard.querySelector('#previewImage');
                if (imgElement) {
                    imgElement.src = cardData.frontCardImage;
                }
            }

            // Apply background image styling if it was saved (for old "image-as-background" feature)
            if (cardData.hasBackgroundImage && cardData.backgroundImage) {
                tempCard.classList.add('image-as-background');
                tempCard.style.setProperty('--card-background-image', cardData.backgroundImage);
                tempCard.style.setProperty('--content-opacity', cardData.contentOpacity || '0.3');
            }

            document.body.appendChild(tempCard);

            const canvas = await html2canvas(tempCard, {
                scale: 4,
                backgroundColor: '#f9f6f0',
                logging: false,
                width: 750,
                height: 1050
            });

            // Convert to blob and download
            await new Promise((resolve) => {
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    const fileName = `${cardData.name.replace(/\s+/g, '_')}_${i + 1}.png`;
                    link.download = fileName;
                    link.href = url;
                    link.click();
                    URL.revokeObjectURL(url);
                    resolve();
                });
            });

            document.body.removeChild(tempCard);

            // Small delay between downloads
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        alert(`Successfully exported ${deck.length} cards!`);
    } catch (error) {
        console.error('Export failed:', error);
        alert('Export failed. Please try again.');
    } finally {
        exportDeckBtn.textContent = 'Export All Cards';
        exportDeckBtn.disabled = false;
    }
}

// Generate three-column panel HTML for printing (back panel 1)
function generatePrintThreeColumnBack1(cardData) {
    const name = cardData.name || 'Card Name';
    const additionalStats = cardData.additionalStats || '';

    return `
        <div class="card-content" style="padding: 20px;">
            <div class="card-name-overlay" style="position: relative; background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); padding: 16px; margin: -20px -20px 20px -20px;">
                <h2 style="margin: 0; text-align: center; color: #fff;">${name}</h2>
            </div>
            <h3 style="text-align: center; color: var(--card-label-color); margin-bottom: 15px;">Additional Stats</h3>
            <div class="divider"></div>
            <div class="additional-stats">
                <p style="white-space: pre-wrap;">${additionalStats || 'No additional stats'}</p>
            </div>
        </div>
    `;
}

// Generate three-column panel HTML for printing (back panel 2)
function generatePrintThreeColumnBack2(cardData) {
    const name = cardData.name || 'Card Name';
    const description = cardData.description || '';

    return `
        <div class="card-content" style="padding: 20px;">
            <div class="card-name-overlay" style="position: relative; background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); padding: 16px; margin: -20px -20px 20px -20px;">
                <h2 style="margin: 0; text-align: center; color: #fff;">${name}</h2>
            </div>
            <h3 style="text-align: center; color: var(--card-label-color); margin-bottom: 15px;">Abilities & Actions</h3>
            <div class="divider"></div>
            <div class="abilities-section">
                <p style="white-space: pre-wrap;">${description || 'No abilities or actions'}</p>
            </div>
        </div>
    `;
}

// Show print preview
function showPrintPreview() {
    if (deck.length === 0) {
        alert('No cards in deck to print. Add cards to your deck first.');
        return;
    }

    printContent.innerHTML = '';

    // Separate three-column cards from regular cards
    const regularCards = [];
    const threeColumnCards = [];

    deck.forEach(card => {
        if (card.layout === 'three-column') {
            threeColumnCards.push(card);
        } else {
            regularCards.push(card);
        }
    });

    // Process three-column cards first (one per page, 3 distinct panels side by side)
    threeColumnCards.forEach(card => {
        const printPage = document.createElement('div');
        printPage.className = 'print-page print-page-trifold';

        // Generate the three distinct panels
        const panels = [
            card.html, // Front panel (already contains image + basic stats)
            generatePrintThreeColumnBack1(card), // Panel 1 - additional stats
            generatePrintThreeColumnBack2(card)  // Panel 2 - abilities/description
        ];

        // Create 3 distinct panels side by side
        panels.forEach((panelHTML, index) => {
            const printCard = document.createElement('div');
            printCard.className = 'print-card print-card-trifold';

            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.innerHTML = panelHTML;

            // Apply background image styling if it was saved (only for front panel)
            if (index === 0 && card.hasBackgroundImage && card.backgroundImage) {
                cardDiv.classList.add('image-as-background');
                cardDiv.style.setProperty('--card-background-image', card.backgroundImage);
                cardDiv.style.setProperty('--content-opacity', card.contentOpacity || '0.3');
                cardDiv.style.background = 'none';
            }

            printCard.appendChild(cardDiv);
            printPage.appendChild(printCard);
        });

        printContent.appendChild(printPage);
    });

    // Process regular cards (3x3 grid)
    const cardsPerPage = 9; // 3x3 grid
    const totalPages = Math.ceil(regularCards.length / cardsPerPage);

    // Generate front pages for regular cards
    for (let page = 0; page < totalPages; page++) {
        const printPage = document.createElement('div');
        printPage.className = 'print-page';

        const startIdx = page * cardsPerPage;
        const endIdx = Math.min(startIdx + cardsPerPage, regularCards.length);

        for (let i = startIdx; i < endIdx; i++) {
            const printCard = document.createElement('div');
            printCard.className = 'print-card';

            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.innerHTML = regularCards[i].html;

            // Apply background image styling if it was saved
            if (regularCards[i].hasBackgroundImage && regularCards[i].backgroundImage) {
                cardDiv.classList.add('image-as-background');
                cardDiv.style.setProperty('--card-background-image', regularCards[i].backgroundImage);
                cardDiv.style.setProperty('--content-opacity', regularCards[i].contentOpacity || '0.3');
                cardDiv.style.background = 'none';
            }

            printCard.appendChild(cardDiv);
            printPage.appendChild(printCard);
        }

        printContent.appendChild(printPage);
    }

    // Generate back pages with matching placement (only for regular cards)
    for (let page = 0; page < totalPages; page++) {
        const printPage = document.createElement('div');
        printPage.className = 'print-page';

        const startIdx = page * cardsPerPage;
        const endIdx = Math.min(startIdx + cardsPerPage, regularCards.length);

        for (let i = startIdx; i < endIdx; i++) {
            const printCard = document.createElement('div');
            printCard.className = 'print-card';

            const backCardDiv = document.createElement('div');
            backCardDiv.className = 'card card-back';

            // Get back card data for this card
            const backImage = regularCards[i].backCardImage || '';
            const backBgColor = regularCards[i].backCardBgColor || '#2c3e50';
            const layoutStyle = regularCards[i].layout || 'standard';
            const additionalStats = regularCards[i].additionalStats || '';
            const description = regularCards[i].description || '';
            const frontCardImage = regularCards[i].frontCardImage || '';

            // Apply background color
            backCardDiv.style.backgroundColor = backBgColor;

            // Create back card content container
            const backCardContent = document.createElement('div');
            backCardContent.className = 'back-card-content';

            // Generate back card to match preview behavior exactly
            if (layoutStyle === 'immersive') {
                // For immersive layout, show mirrored background image with additional content
                // Create rich back card content (matches updateBackCard function)
                const backCardHTML = `
                    <div class="back-card-background">
                        <img class="back-card-print-image" alt="Back Card Design">
                    </div>
                    <div class="back-card-overlay">
                        ${additionalStats ? '<div class="back-additional-stats"><h3>Additional Stats</h3><p>' + additionalStats + '</p></div>' : ''}
                        ${description ? '<div class="back-description"><h3>Description</h3><p>' + description + '</p></div>' : ''}
                    </div>
                `;
                backCardContent.innerHTML = backCardHTML;

                // Apply back card image if available
                const backImgElement = backCardContent.querySelector('.back-card-print-image');
                if (backImgElement) {
                    // First check if user uploaded a custom back card image
                    if (backImage) {
                        backImgElement.src = backImage;
                    }
                    // Otherwise use the front card image as mirrored background
                    else if (frontCardImage) {
                        backImgElement.src = frontCardImage;
                        backImgElement.style.transform = 'scaleX(-1)'; // Mirror the image
                    }
                }
            } else {
                // Standard back card with just the image (matches updateBackCard function)
                const imgElement = document.createElement('img');
                imgElement.alt = 'Back Card Design';

                // First check if user uploaded a custom back card image
                if (backImage) {
                    imgElement.src = backImage;
                }
                // Otherwise leave it empty (default back card)

                backCardContent.appendChild(imgElement);
            }

            backCardDiv.appendChild(backCardContent);
            printCard.appendChild(backCardDiv);
            printPage.appendChild(printCard);
        }

        printContent.appendChild(printPage);
    }

    // Apply current alignment to all print cards
    applyPrintAlignment();

    printModal.classList.add('active');
}

// Print Alignment Functions

// Load saved alignment from localStorage
function loadPrintAlignment() {
    const saved = localStorage.getItem('printAlignment');
    if (saved !== null) {
        printAlignment = parseInt(saved);
    }
    updateAlignmentDisplay();
}

// Save alignment to localStorage
function savePrintAlignment() {
    localStorage.setItem('printAlignment', printAlignment.toString());
}

// Update alignment display
function updateAlignmentDisplay() {
    alignmentValueSpan.textContent = printAlignment + 'px';
}

// Apply alignment to all print cards
function applyPrintAlignment() {
    // Set the CSS variable on the root element
    // This applies to both preview and actual print output
    document.documentElement.style.setProperty('--print-alignment', printAlignment + 'px');
}

// Adjust alignment left (more negative)
function adjustAlignmentLeft() {
    printAlignment -= 1;
    updateAlignmentDisplay();
    applyPrintAlignment();
    savePrintAlignment();
}

// Adjust alignment right (more positive)
function adjustAlignmentRight() {
    printAlignment += 1;
    updateAlignmentDisplay();
    applyPrintAlignment();
    savePrintAlignment();
}

// Reset alignment to default
function resetPrintAlignment() {
    printAlignment = -2;
    updateAlignmentDisplay();
    applyPrintAlignment();
    savePrintAlignment();
}

// Card Customization System

// Default theme settings
const defaultTheme = {
    fontFamily: "'Georgia', serif",
    cardNameSize: 1.8,
    cardHeaderSize: 0.95,
    cardDescriptionSize: 0.9,
    cardStatLabelSize: 0.95,
    cardAbilityNameSize: 0.85,
    cardAbilityValueSize: 0.8,
    cardImageHeight: 240,
    sectionSpacing: 12,
    cardBgColor: '#f9f6f0',
    cardBorderColor: '#8b4513',
    cardTextColor: '#333333',
    cardLabelColor: '#8b4513',
    cardNameColor: '#f4e4c1',
    useImageAsBackground: false,
    contentOpacity: 0.3,
    backCardImage: '',
    backCardBgColor: '#2c3e50'
};

// Apply theme to CSS variables
function applyTheme(theme) {
    const root = document.documentElement;

    root.style.setProperty('--card-font-family', theme.fontFamily);
    root.style.setProperty('--card-name-font-family', theme.fontFamily);
    root.style.setProperty('--card-header-font-family', theme.fontFamily);
    root.style.setProperty('--card-content-font-family', theme.fontFamily);

    root.style.setProperty('--card-name-size', theme.cardNameSize + 'em');
    root.style.setProperty('--card-header-size', theme.cardHeaderSize + 'em');
    root.style.setProperty('--card-description-size', theme.cardDescriptionSize + 'em');
    root.style.setProperty('--card-stat-label-size', theme.cardStatLabelSize + 'em');
    root.style.setProperty('--card-stat-value-size', theme.cardStatLabelSize + 'em');
    root.style.setProperty('--card-ability-name-size', (theme.cardAbilityNameSize || 0.85) + 'em');
    root.style.setProperty('--card-ability-value-size', (theme.cardAbilityValueSize || 0.8) + 'em');

    root.style.setProperty('--card-image-height', theme.cardImageHeight + 'px');
    root.style.setProperty('--section-spacing', theme.sectionSpacing + 'px');

    root.style.setProperty('--card-bg-color', theme.cardBgColor);
    root.style.setProperty('--card-border-color', theme.cardBorderColor);
    root.style.setProperty('--card-text-color', theme.cardTextColor);
    root.style.setProperty('--card-label-color', theme.cardLabelColor);
    root.style.setProperty('--card-name-color', theme.cardNameColor);
    root.style.setProperty('--content-opacity', theme.contentOpacity !== undefined ? theme.contentOpacity : 0.3);
    root.style.setProperty('--back-card-bg-color', theme.backCardBgColor || '#2c3e50');

    // Apply image as background setting
    const card = document.getElementById('cardPreview');
    const cardImageSection = card.querySelector('.card-image') || card.querySelector('.card-image-background');

    if (theme.useImageAsBackground) {
        // Lock the current height before applying background mode
        if (cardImageSection) {
            const currentHeight = cardImageSection.offsetHeight;
            cardImageSection.style.height = currentHeight + 'px';
            cardImageSection.style.minHeight = currentHeight + 'px';
        }

        card.classList.add('image-as-background');
        // Set the background image from the current card image
        const cardImage = document.getElementById('previewImage');
        if (cardImage && cardImage.src) {
            root.style.setProperty('--card-background-image', `url('${cardImage.src}')`);
        }
    } else {
        // Remove inline height styles when disabling background mode
        if (cardImageSection) {
            cardImageSection.style.height = '';
            cardImageSection.style.minHeight = '';
        }

        card.classList.remove('image-as-background');
        root.style.setProperty('--card-background-image', 'none');
    }
}

// Update UI controls to reflect current theme
function updateCustomizationUI(theme) {
    document.getElementById('fontFamily').value = theme.fontFamily;

    document.getElementById('cardNameSize').value = theme.cardNameSize;
    document.getElementById('cardNameSizeValue').textContent = theme.cardNameSize;

    document.getElementById('cardHeaderSize').value = theme.cardHeaderSize;
    document.getElementById('cardHeaderSizeValue').textContent = theme.cardHeaderSize;

    document.getElementById('cardDescriptionSize').value = theme.cardDescriptionSize;
    document.getElementById('cardDescriptionSizeValue').textContent = theme.cardDescriptionSize;

    document.getElementById('cardStatLabelSize').value = theme.cardStatLabelSize;
    document.getElementById('cardStatLabelSizeValue').textContent = theme.cardStatLabelSize;

    document.getElementById('cardAbilityNameSize').value = theme.cardAbilityNameSize || 0.85;
    document.getElementById('cardAbilityNameSizeValue').textContent = theme.cardAbilityNameSize || 0.85;

    document.getElementById('cardAbilityValueSize').value = theme.cardAbilityValueSize || 0.8;
    document.getElementById('cardAbilityValueSizeValue').textContent = theme.cardAbilityValueSize || 0.8;

    document.getElementById('cardImageHeight').value = theme.cardImageHeight;
    document.getElementById('cardImageHeightValue').textContent = theme.cardImageHeight;

    document.getElementById('sectionSpacing').value = theme.sectionSpacing;
    document.getElementById('sectionSpacingValue').textContent = theme.sectionSpacing;

    document.getElementById('cardBgColor').value = theme.cardBgColor;
    document.getElementById('cardBorderColor').value = theme.cardBorderColor;
    document.getElementById('cardTextColor').value = theme.cardTextColor;
    document.getElementById('cardLabelColor').value = theme.cardLabelColor;
    document.getElementById('cardNameColor').value = theme.cardNameColor;

    document.getElementById('useImageAsBackground').checked = theme.useImageAsBackground || false;
    const opacity = theme.contentOpacity !== undefined ? theme.contentOpacity : 0.3;
    document.getElementById('contentOpacity').value = opacity;
    document.getElementById('contentOpacityValue').textContent = opacity.toFixed(2);
    document.getElementById('backCardBgColor').value = theme.backCardBgColor || '#2c3e50';
}

// Get current theme from UI controls
function getCurrentTheme() {
    return {
        fontFamily: document.getElementById('fontFamily').value,
        cardNameSize: parseFloat(document.getElementById('cardNameSize').value),
        cardHeaderSize: parseFloat(document.getElementById('cardHeaderSize').value),
        cardDescriptionSize: parseFloat(document.getElementById('cardDescriptionSize').value),
        cardStatLabelSize: parseFloat(document.getElementById('cardStatLabelSize').value),
        cardAbilityNameSize: parseFloat(document.getElementById('cardAbilityNameSize').value),
        cardAbilityValueSize: parseFloat(document.getElementById('cardAbilityValueSize').value),
        cardImageHeight: parseInt(document.getElementById('cardImageHeight').value),
        sectionSpacing: parseInt(document.getElementById('sectionSpacing').value),
        cardBgColor: document.getElementById('cardBgColor').value,
        cardBorderColor: document.getElementById('cardBorderColor').value,
        cardTextColor: document.getElementById('cardTextColor').value,
        cardLabelColor: document.getElementById('cardLabelColor').value,
        cardNameColor: document.getElementById('cardNameColor').value,
        useImageAsBackground: document.getElementById('useImageAsBackground').checked,
        contentOpacity: parseFloat(document.getElementById('contentOpacity').value),
        backCardImage: window.backCardImageData || '',
        backCardBgColor: document.getElementById('backCardBgColor').value
    };
}

// Save theme to localStorage
function saveTheme() {
    const theme = getCurrentTheme();
    localStorage.setItem('cardTheme', JSON.stringify(theme));

    // Show confirmation
    const btn = document.getElementById('saveThemeBtn');
    const originalText = btn.textContent;
    btn.textContent = 'Theme Saved!';
    btn.style.background = '#28a745';
    btn.style.color = 'white';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
    }, 1500);
}

// Load theme from localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem('cardTheme');
    if (savedTheme) {
        try {
            const theme = JSON.parse(savedTheme);
            applyTheme(theme);
            updateCustomizationUI(theme);

            // Show confirmation
            const btn = document.getElementById('loadThemeBtn');
            const originalText = btn.textContent;
            btn.textContent = 'Theme Loaded!';
            btn.style.background = '#28a745';
            btn.style.color = 'white';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.color = '';
            }, 1500);
        } catch (e) {
            alert('Failed to load theme. Using default settings.');
            resetTheme();
        }
    } else {
        alert('No saved theme found. Using default settings.');
    }
}

// Reset to default theme
function resetTheme() {
    applyTheme(defaultTheme);
    updateCustomizationUI(defaultTheme);

    // Show confirmation
    const btn = document.getElementById('resetThemeBtn');
    const originalText = btn.textContent;
    btn.textContent = 'Reset Complete!';
    btn.style.background = '#28a745';
    btn.style.color = 'white';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
    }, 1500);
}

// Initialize customization system
function initCustomization() {
    // Load saved theme or use default
    const savedTheme = localStorage.getItem('cardTheme');
    if (savedTheme) {
        try {
            const theme = JSON.parse(savedTheme);
            applyTheme(theme);
            updateCustomizationUI(theme);
        } catch (e) {
            applyTheme(defaultTheme);
            updateCustomizationUI(defaultTheme);
        }
    } else {
        applyTheme(defaultTheme);
        updateCustomizationUI(defaultTheme);
    }

    // Toggle customization panel
    document.getElementById('toggleCustomization').addEventListener('click', function() {
        const panel = document.getElementById('customizationPanel');
        if (panel.style.display === 'none') {
            panel.style.display = 'block';
            this.textContent = 'Hide';
        } else {
            panel.style.display = 'none';
            this.textContent = 'Show';
        }
    });

    // Font family change
    document.getElementById('fontFamily').addEventListener('change', function() {
        const theme = getCurrentTheme();
        applyTheme(theme);
    });

    // Font size sliders
    const fontSizeInputs = [
        { id: 'cardNameSize', valueId: 'cardNameSizeValue' },
        { id: 'cardHeaderSize', valueId: 'cardHeaderSizeValue' },
        { id: 'cardDescriptionSize', valueId: 'cardDescriptionSizeValue' },
        { id: 'cardStatLabelSize', valueId: 'cardStatLabelSizeValue' },
        { id: 'cardAbilityNameSize', valueId: 'cardAbilityNameSizeValue' },
        { id: 'cardAbilityValueSize', valueId: 'cardAbilityValueSizeValue' }
    ];

    fontSizeInputs.forEach(input => {
        const element = document.getElementById(input.id);
        element.addEventListener('input', function() {
            document.getElementById(input.valueId).textContent = this.value;
            const theme = getCurrentTheme();
            applyTheme(theme);
        });
    });

    // Section size sliders
    const sectionSizeInputs = [
        { id: 'cardImageHeight', valueId: 'cardImageHeightValue' },
        { id: 'sectionSpacing', valueId: 'sectionSpacingValue' }
    ];

    sectionSizeInputs.forEach(input => {
        const element = document.getElementById(input.id);
        element.addEventListener('input', function() {
            document.getElementById(input.valueId).textContent = this.value;
            const theme = getCurrentTheme();
            applyTheme(theme);
        });
    });

    // Color pickers
    const colorInputs = ['cardBgColor', 'cardBorderColor', 'cardTextColor', 'cardLabelColor', 'cardNameColor', 'backCardBgColor'];
    colorInputs.forEach(id => {
        document.getElementById(id).addEventListener('input', function() {
            const theme = getCurrentTheme();
            applyTheme(theme);
        });
    });

    // Image as background checkbox
    document.getElementById('useImageAsBackground').addEventListener('change', function() {
        const theme = getCurrentTheme();
        applyTheme(theme);
    });

    // Content opacity slider
    document.getElementById('contentOpacity').addEventListener('input', function() {
        document.getElementById('contentOpacityValue').textContent = parseFloat(this.value).toFixed(2);
        const theme = getCurrentTheme();
        applyTheme(theme);
    });

    // Back card image upload
    document.getElementById('backCardImageUpload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                window.backCardImageData = event.target.result;
                document.getElementById('backCardPreviewImage').src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Theme management buttons
    document.getElementById('saveThemeBtn').addEventListener('click', saveTheme);
    document.getElementById('loadThemeBtn').addEventListener('click', loadTheme);
    document.getElementById('resetThemeBtn').addEventListener('click', resetTheme);
}

// ===== Tab Switching Functionality =====
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

            // Add active class to clicked button and corresponding tab
            this.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');

            // If switching to adventure tracker, refresh character list
            if (targetTab === 'adventure-tracker') {
                loadCharacterList();
            }

            // If switching to encounters/combat, load combatants
            if (targetTab === 'encounters-combat') {
                loadPartyCombatants();
                loadEnemyCombatants();
            }
        });
    });
}

// ===== Adventure Tracker State =====
// Adventure party tracking - array of characters with their states
let adventureParty = [];

// Load character list from deck
async function loadCharacterList() {
    const characterList = document.getElementById('characterList');

    if (!deck || deck.length === 0) {
        console.log('Deck is empty or not loaded');
        characterList.innerHTML = '<p class="no-characters">No characters in deck. Add characters in the Card Builder tab.</p>';
        return;
    }

    console.log('Loading character list from deck with', deck.length, 'cards');

    // Ensure all cards have IDs before rendering (safety check)
    await ensureAllCardsHaveIDs();

    // Filter to only show creature cards (characters/monsters)
    const creatureCards = deck.filter(card => card.template === 'creature');

    console.log('Found', creatureCards.length, 'creature cards');
    console.log('All creature card IDs:', creatureCards.map(c => ({ name: c.formFields?.cardName, id: c.id })));

    if (creatureCards.length === 0) {
        characterList.innerHTML = '<p class="no-characters">No creature cards in deck. Add creature cards in the Card Builder tab.</p>';
        return;
    }

    characterList.innerHTML = '';

    creatureCards.forEach((card, index) => {
        // Verify card has ID before proceeding
        if (!card.id) {
            console.error('Card has no ID even after ensureAllCardsHaveIDs()!', card);
            return;
        }

        const isInParty = adventureParty.some(p => p.cardId === card.id);

        const listItem = document.createElement('div');
        listItem.className = 'character-list-item' + (isInParty ? ' in-party' : '');
        listItem.innerHTML = `
            <input type="checkbox" class="char-checkbox" ${isInParty ? 'checked' : ''} data-card-id="${card.id}">
            <div class="char-details">
                <div class="char-name">${card.formFields.cardName || 'Unnamed Character'}</div>
                <div class="char-info">AC: ${card.formFields.ac || '--'} | HP: ${card.formFields.hp || '--'}</div>
            </div>
        `;

        // Use the card directly from closure - no need to look it up
        const checkbox = listItem.querySelector('.char-checkbox');
        checkbox.addEventListener('change', function(e) {
            e.stopPropagation();

            console.log('=== Checkbox changed ===');
            console.log('Card:', card.formFields?.cardName, 'ID:', card.id);

            // Use the card directly from the closure
            if (this.checked) {
                console.log('Adding character to party...');
                addCharacterToParty(card);
            } else {
                console.log('Removing character from party...');
                removeCharacterFromParty(card.id);
            }
        });

        characterList.appendChild(listItem);
    });
}

// Add character to adventure party
function addCharacterToParty(card) {
    console.log('=== addCharacterToParty called ===');
    console.log('Card:', card.formFields?.cardName, 'ID:', card.id);
    console.log('Current party size:', adventureParty.length);
    console.log('Current party IDs:', adventureParty.map(p => ({ name: p.card.formFields.cardName, id: p.cardId })));

    // Check if already in party
    if (adventureParty.some(p => p.cardId === card.id)) {
        console.log('Character already in party:', card.formFields?.cardName || card.name);
        return;
    }

    // Verify card has necessary fields
    if (!card.formFields) {
        console.error('Card missing formFields:', card);
        alert('Error: Card data is corrupted. Please try refreshing the character list.');
        return;
    }

    // Parse max HP from card
    const hpText = card.formFields.hp || '0';
    const hpMatch = hpText.match(/^(\d+)/);
    const maxHP = hpMatch ? parseInt(hpMatch[1]) : 0;

    // Add to party with initial state
    const partyMember = {
        cardId: card.id,
        card: card,
        currentHP: maxHP,
        maxHP: maxHP,
        notes: ''
    };

    adventureParty.push(partyMember);

    console.log('Successfully added:', card.formFields.cardName);
    console.log('New party size:', adventureParty.length);
    console.log('Full adventure party:', adventureParty);

    // Update the checkbox visual state
    const checkbox = document.querySelector(`.char-checkbox[data-card-id="${card.id}"]`);
    if (checkbox) {
        checkbox.closest('.character-list-item').classList.add('in-party');
    }

    updateAdventurePartyDisplay();
}

// Remove character from adventure party
function removeCharacterFromParty(cardId) {
    const index = adventureParty.findIndex(p => p.cardId === cardId);
    if (index !== -1) {
        console.log('Removed character from party:', adventureParty[index].card.formFields.cardName, 'Remaining:', adventureParty.length - 1);
        adventureParty.splice(index, 1);

        // Clean up combat state for this character
        delete combatState.openActionPanels[cardId];
        delete combatState.selectedTargets[cardId];

        // Update the checkbox visual state
        const checkbox = document.querySelector(`.char-checkbox[data-card-id="${cardId}"]`);
        if (checkbox) {
            checkbox.closest('.character-list-item').classList.remove('in-party');
        }

        updateAdventurePartyDisplay();
    }
}

// Update adventure party display
function updateAdventurePartyDisplay() {
    console.log('updateAdventurePartyDisplay called, party size:', adventureParty.length);
    const container = document.getElementById('adventurePartyContainer');

    if (!container) {
        console.error('Adventure party container not found!');
        return;
    }

    if (adventureParty.length === 0) {
        container.innerHTML = '<p class="no-characters">No characters selected for this adventure. Select characters from the list on the right.</p>';
        return;
    }

    container.innerHTML = '';

    adventureParty.forEach((member, index) => {
        console.log('Rendering party member:', index, member);
        const card = member.card;

        if (!card || !card.formFields) {
            console.error('Invalid party member card data:', member);
            return;
        }

        const charCard = document.createElement('div');
        charCard.className = 'party-character-card';
        charCard.innerHTML = `
            <div class="party-char-header">
                <div>
                    <h3 class="party-char-name">${card.formFields.cardName || 'Unnamed Character'}</h3>
                    <div class="party-char-type">${card.formFields.cardType || ''} ${card.formFields.cardSubtype ? '• ' + card.formFields.cardSubtype : ''}</div>
                </div>
                <button class="remove-from-party-btn" data-index="${index}" title="Remove from party">✕</button>
            </div>

            <div class="party-char-stats">
                <div class="party-stat">
                    <span class="stat-label">AC:</span>
                    <span class="stat-value">${card.formFields.ac || '--'}</span>
                </div>
                <div class="party-stat">
                    <span class="stat-label">Speed:</span>
                    <span class="stat-value">${card.formFields.speed || '--'}</span>
                </div>
            </div>

            <div class="party-abilities">
                <div class="party-ability"><span>STR</span> ${card.formFields.str || '--'}</div>
                <div class="party-ability"><span>DEX</span> ${card.formFields.dex || '--'}</div>
                <div class="party-ability"><span>CON</span> ${card.formFields.con || '--'}</div>
                <div class="party-ability"><span>INT</span> ${card.formFields.int || '--'}</div>
                <div class="party-ability"><span>WIS</span> ${card.formFields.wis || '--'}</div>
                <div class="party-ability"><span>CHA</span> ${card.formFields.cha || '--'}</div>
            </div>

            <div class="party-hp-section">
                <h4>Hit Points</h4>
                <div class="party-hp-controls">
                    <button class="hp-btn decrease" data-index="${index}">−</button>
                    <input type="number" class="party-hp-input" value="${member.currentHP}" data-index="${index}">
                    <span class="hp-divider">/</span>
                    <span class="party-max-hp">${member.maxHP}</span>
                    <button class="hp-btn increase" data-index="${index}">+</button>
                </div>
                <div class="party-hp-bar-container">
                    <div class="party-hp-bar">
                        <div class="party-hp-bar-fill" data-index="${index}"></div>
                    </div>
                </div>
                <div class="party-hp-quick">
                    <button class="quick-hp-btn" data-index="${index}" data-amount="-10">-10</button>
                    <button class="quick-hp-btn" data-index="${index}" data-amount="-5">-5</button>
                    <button class="quick-hp-btn" data-index="${index}" data-amount="5">+5</button>
                    <button class="quick-hp-btn" data-index="${index}" data-amount="10">+10</button>
                    <button class="full-heal-btn" data-index="${index}">Full Heal</button>
                </div>
            </div>

            <div class="party-notes-section">
                <h4>Notes</h4>
                <textarea class="party-notes" data-index="${index}" rows="3" placeholder="Conditions, buffs, debuffs...">${member.notes}</textarea>
            </div>
        `;

        container.appendChild(charCard);
    });

    console.log('Rendered', adventureParty.length, 'party character cards');

    // Add event listeners after rendering
    attachPartyEventListeners();
    updateAllHPBars();
}

// Update HP bar for a specific party member
function updatePartyMemberHPBar(index) {
    const member = adventureParty[index];
    if (!member) return;

    const percentage = Math.max(0, Math.min(100, (member.currentHP / member.maxHP) * 100));
    const hpBarFill = document.querySelector(`.party-hp-bar-fill[data-index="${index}"]`);

    if (hpBarFill) {
        hpBarFill.style.width = percentage + '%';

        // Update color based on HP percentage
        if (percentage <= 25) {
            hpBarFill.style.background = '#dc3545'; // Red
        } else if (percentage <= 50) {
            hpBarFill.style.background = '#ffc107'; // Yellow
        } else {
            hpBarFill.style.background = '#28a745'; // Green
        }
    }
}

// Update all HP bars
function updateAllHPBars() {
    adventureParty.forEach((member, index) => {
        updatePartyMemberHPBar(index);
    });
}

// Update party member HP
function updatePartyMemberHP(index, amount) {
    const member = adventureParty[index];
    if (!member) return;

    const newHP = Math.max(0, Math.min(member.maxHP, member.currentHP + amount));
    member.currentHP = newHP;

    const hpInput = document.querySelector(`.party-hp-input[data-index="${index}"]`);
    if (hpInput) {
        hpInput.value = newHP;
    }

    updatePartyMemberHPBar(index);
}

// Attach event listeners to party controls
function attachPartyEventListeners() {
    // Remove from party buttons
    document.querySelectorAll('.remove-from-party-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const member = adventureParty[index];
            if (member) {
                removeCharacterFromParty(member.cardId);
            }
        });
    });

    // HP increase buttons
    document.querySelectorAll('.hp-btn.increase').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            updatePartyMemberHP(index, 1);
        });
    });

    // HP decrease buttons
    document.querySelectorAll('.hp-btn.decrease').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            updatePartyMemberHP(index, -1);
        });
    });

    // HP input changes
    document.querySelectorAll('.party-hp-input').forEach(input => {
        input.addEventListener('input', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const member = adventureParty[index];
            if (member) {
                let value = parseInt(this.value) || 0;
                value = Math.max(0, Math.min(member.maxHP, value));
                member.currentHP = value;
                this.value = value;
                updatePartyMemberHPBar(index);
            }
        });
    });

    // Quick HP buttons
    document.querySelectorAll('.quick-hp-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const amount = parseInt(this.getAttribute('data-amount'));
            updatePartyMemberHP(index, amount);
        });
    });

    // Full heal buttons
    document.querySelectorAll('.full-heal-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const member = adventureParty[index];
            if (member) {
                member.currentHP = member.maxHP;
                const hpInput = document.querySelector(`.party-hp-input[data-index="${index}"]`);
                if (hpInput) {
                    hpInput.value = member.maxHP;
                }
                updatePartyMemberHPBar(index);
            }
        });
    });

    // Notes textareas
    document.querySelectorAll('.party-notes').forEach(textarea => {
        textarea.addEventListener('input', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const member = adventureParty[index];
            if (member) {
                member.notes = this.value;
            }
        });
    });
}

// Save adventure state to JSON file
function saveAdventure() {
    if (adventureParty.length === 0) {
        alert('No characters in the adventure party to save.');
        return;
    }

    // Create save data with only necessary information
    const saveData = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        party: adventureParty.map(member => ({
            cardId: member.cardId,
            currentHP: member.currentHP,
            maxHP: member.maxHP,
            notes: member.notes,
            // Store card data for reference
            cardName: member.card.formFields.cardName
        })),
        combatLog: combatLog, // Save the combat log
        combatCounter: combatCounter, // Save combat counter
        actionSequence: actionSequence // Save action sequence
    };

    // Create and download JSON file
    const dataStr = JSON.stringify(saveData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `adventure_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log('Adventure saved:', saveData);
}

// Load adventure state from JSON file
async function loadAdventure(fileData) {
    try {
        const saveData = JSON.parse(fileData);

        if (!saveData.party || !Array.isArray(saveData.party)) {
            alert('Invalid adventure file format.');
            return;
        }

        // Ensure all cards in deck have IDs before matching
        await ensureAllCardsHaveIDs();

        console.log('Loading adventure with', saveData.party.length, 'saved characters');
        console.log('Current deck has', deck.length, 'cards');
        console.log('Deck IDs:', deck.map(c => ({ name: c.formFields?.cardName, id: c.id })));
        console.log('Saved party IDs:', saveData.party.map(p => ({ name: p.cardName, id: p.cardId })));

        // Clear current party
        adventureParty = [];

        // Restore party members
        saveData.party.forEach(savedMember => {
            // Try to find the card in the deck by ID first
            let card = deck.find(c => c.id === savedMember.cardId);

            // If not found by ID, try to match by name (fallback for when IDs change)
            if (!card && savedMember.cardName) {
                card = deck.find(c =>
                    c.formFields?.cardName === savedMember.cardName &&
                    c.template === 'creature'
                );
                if (card) {
                    console.log(`Matched card by name: ${savedMember.cardName} (old ID: ${savedMember.cardId}, new ID: ${card.id})`);
                }
            }

            if (card) {
                adventureParty.push({
                    cardId: card.id, // Use the current card's ID, not the saved one
                    card: card,
                    currentHP: savedMember.currentHP,
                    maxHP: savedMember.maxHP,
                    notes: savedMember.notes || ''
                });
            } else {
                console.warn(`Card not found in deck: ${savedMember.cardName} (ID: ${savedMember.cardId})`);
            }
        });

        updateAdventurePartyDisplay();

        // Update checkbox states for loaded characters
        document.querySelectorAll('.char-checkbox').forEach(checkbox => {
            const cardId = checkbox.getAttribute('data-card-id');
            const isInParty = adventureParty.some(p => p.cardId === cardId);
            checkbox.checked = isInParty;
            if (isInParty) {
                checkbox.closest('.character-list-item').classList.add('in-party');
            } else {
                checkbox.closest('.character-list-item').classList.remove('in-party');
            }
        });

        // Restore combat log if it exists in save data
        if (saveData.combatLog && Array.isArray(saveData.combatLog)) {
            combatLog = saveData.combatLog;
            // Restore combat counter and action sequence
            combatCounter = saveData.combatCounter || 0;
            actionSequence = saveData.actionSequence || 0;
            displayCombatLog();
            console.log('Combat log restored:', combatLog.length, 'entries, combat:', combatCounter, 'action:', actionSequence);
        } else {
            // Clear combat log if none was saved
            clearCombatLog();
            console.log('No combat log found in save data');
        }

        const foundCount = adventureParty.length;
        const totalCount = saveData.party.length;
        if (foundCount < totalCount) {
            alert(`Adventure loaded! ${foundCount}/${totalCount} characters found in your deck. Some characters may be missing.`);
        } else {
            alert(`Adventure loaded successfully! ${foundCount} characters restored.`);
        }

        console.log('Adventure loaded:', saveData);
    } catch (error) {
        console.error('Error loading adventure:', error);
        alert('Failed to load adventure file. Please make sure the file is valid.');
    }
}

// ===================================
// ENCOUNTERS & COMBAT SYSTEM
// ===================================

let combatState = {
    active: false,
    round: 0,
    currentTurnIndex: 0,
    enemies: [],
    initiativeOrder: [],
    openActionPanels: {}, // Track which combat action panels are open (combatantId: true/false)
    selectedTargets: {} // Track selected targets for each combatant (combatantId: targetValue)
};

let enemyIdCounter = 0;

function loadPartyCombatants() {
    const container = document.getElementById('partyCombatants');

    if (adventureParty.length === 0) {
        container.innerHTML = '<p class="no-combatants">No party members. Add characters in the Adventure Tracker tab.</p>';
        return;
    }

    container.innerHTML = '';
    adventureParty.forEach(member => {
        const combatantCard = createCombatantCard(member, 'party');
        container.appendChild(combatantCard);
    });

    // Highlight active turn after loading
    highlightActiveTurn();
}

function loadEnemyCombatants() {
    const container = document.getElementById('enemyCombatants');

    if (combatState.enemies.length === 0) {
        container.innerHTML = '<p class="no-combatants">No enemies added yet.</p>';
        return;
    }

    container.innerHTML = '';
    combatState.enemies.forEach(enemy => {
        const combatantCard = createCombatantCard(enemy, 'enemy');
        container.appendChild(combatantCard);
    });

    // Highlight active turn after loading
    highlightActiveTurn();
}

function highlightActiveTurn() {
    console.log('highlightActiveTurn called, combat active:', combatState.active);

    // Remove active-turn class from all combatant cards
    document.querySelectorAll('.combatant-card').forEach(card => {
        card.classList.remove('active-turn');
    });

    // Only highlight if combat is active
    if (!combatState.active || combatState.initiativeOrder.length === 0) {
        console.log('Combat not active or no initiative order');
        return;
    }

    // Get current turn's combatant
    const currentCombatant = combatState.initiativeOrder[combatState.currentTurnIndex];
    console.log('Current turn index:', combatState.currentTurnIndex, 'Current combatant:', currentCombatant);

    if (!currentCombatant) {
        console.log('No current combatant found');
        return;
    }

    // Find and highlight the matching card
    const selector = `.combatant-card[data-combatant-id="${currentCombatant.id}"][data-combatant-type="${currentCombatant.type}"]`;
    console.log('Looking for card with selector:', selector);

    const activeCard = document.querySelector(selector);
    console.log('Found card:', activeCard);

    if (activeCard) {
        activeCard.classList.add('active-turn');
        console.log('Added active-turn class to:', currentCombatant.name);
    } else {
        console.warn('Could not find card for combatant:', currentCombatant.name, 'with id:', currentCombatant.id, 'type:', currentCombatant.type);
    }
}

function createCombatantCard(combatant, type) {
    const card = document.createElement('div');
    card.className = 'combatant-card';
    const combatantId = combatant.id || combatant.cardId;
    card.dataset.combatantId = combatantId;
    card.dataset.combatantType = type;

    const isEnemy = type === 'enemy';
    const cardData = isEnemy ? combatant : combatant.card;
    const name = isEnemy ? combatant.name : cardData.formFields.cardName;
    const ac = isEnemy ? combatant.ac : cardData.formFields.ac;
    const currentHP = combatant.currentHP;
    const maxHP = combatant.maxHP;
    const initiative = combatant.initiative || 0;

    // Check if this combatant's action panel should be open
    const isPanelOpen = combatState.openActionPanels[combatantId] || false;
    const panelDisplay = isPanelOpen ? 'block' : 'none';
    const toggleArrow = isPanelOpen ? '▲' : '▼';

    // Create target options for attacks
    const targetOptions = createTargetOptions(combatantId, type);

    card.innerHTML = `
        <div class="combatant-header">
            <h4 class="combatant-name">${name}</h4>
            ${isEnemy ? `<button class="remove-enemy-btn" data-enemy-id="${combatant.id}">✕</button>` : ''}
        </div>
        <div class="combatant-stats">
            <span class="combatant-stat">AC: ${ac}</span>
            <span class="combatant-stat">Initiative: <input type="number" class="initiative-input" value="${initiative}" data-id="${combatantId}" data-type="${type}"></span>
        </div>
        <div class="combatant-hp">
            <div class="hp-controls">
                <button class="hp-btn-combat decrease" data-id="${combatantId}" data-type="${type}">−</button>
                <input type="number" class="combat-hp-input" value="${currentHP}" data-id="${combatantId}" data-type="${type}">
                <span class="hp-divider">/</span>
                <span class="combat-max-hp">${maxHP}</span>
                <button class="hp-btn-combat increase" data-id="${combatantId}" data-type="${type}">+</button>
            </div>
            <div class="combat-hp-bar-container">
                <div class="combat-hp-bar">
                    <div class="combat-hp-bar-fill" style="width: ${(currentHP/maxHP)*100}%"></div>
                </div>
            </div>
        </div>
        <div class="combat-actions">
            <div class="combat-action-header">
                <strong>⚔️ Combat Actions</strong>
                <button class="toggle-actions-btn" data-id="${combatantId}">${toggleArrow}</button>
            </div>
            <div class="combat-action-panel" style="display: ${panelDisplay};">
                <div class="attack-controls">
                    <div class="attack-row">
                        <label>Target:</label>
                        <select class="attack-target-select" data-attacker-id="${combatantId}" data-attacker-type="${type}" data-attacker-name="${name}">
                            ${targetOptions}
                        </select>
                    </div>
                    <div class="attack-row">
                        <label>Attack Bonus:</label>
                        <input type="number" class="attack-bonus-input" value="0" placeholder="+0">
                    </div>
                    <div class="attack-row">
                        <button class="btn-roll-attack" data-attacker-id="${combatantId}" data-attacker-type="${type}" data-attacker-name="${name}">🎲 Roll Attack</button>
                    </div>
                    <div class="attack-row">
                        <label>Damage Dice:</label>
                        <input type="text" class="damage-dice-input" value="1d8" placeholder="1d8+3">
                    </div>
                    <div class="attack-row">
                        <button class="btn-roll-damage" data-attacker-id="${combatantId}" data-attacker-type="${type}" data-attacker-name="${name}">💥 Roll Damage</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Restore selected target if one exists
    const savedTarget = combatState.selectedTargets[combatantId];
    if (savedTarget) {
        const targetSelect = card.querySelector('.attack-target-select');
        targetSelect.value = savedTarget;
    }

    return card;
}

function createTargetOptions(selfId, selfType) {
    let options = '<option value="">Select Target...</option>';

    // If this is a party member, add enemies as targets
    if (selfType === 'party') {
        combatState.enemies.forEach(enemy => {
            if (enemy.currentHP > 0) {
                options += `<option value="${enemy.id}|enemy|${enemy.name}|${enemy.ac}">${enemy.name} (AC ${enemy.ac})</option>`;
            }
        });
    } else {
        // If this is an enemy, add party members as targets
        adventureParty.forEach(member => {
            if (member.currentHP > 0) {
                const ac = member.card.formFields.ac;
                const name = member.card.formFields.cardName;
                options += `<option value="${member.cardId}|party|${name}|${ac}">${name} (AC ${ac})</option>`;
            }
        });
    }

    return options;
}

function showAddEnemyModal() {
    const modal = document.getElementById('addEnemyModal');
    const deckList = document.getElementById('enemyDeckList');

    // Populate deck list
    deckList.innerHTML = '';
    if (deck.length === 0) {
        deckList.innerHTML = '<p class="no-enemies">No creatures in deck</p>';
    } else {
        deck.forEach(card => {
            const item = document.createElement('div');
            item.className = 'enemy-deck-item';
            item.innerHTML = `
                <span class="enemy-name">${card.formFields.cardName}</span>
                <span class="enemy-stats">AC: ${card.formFields.ac} | HP: ${card.formFields.hp}</span>
                <button class="btn-add-this-enemy" data-card-id="${card.id}">Add</button>
            `;
            deckList.appendChild(item);
        });
    }

    modal.style.display = 'block';
}

function addEnemyFromDeck(cardId) {
    const card = deck.find(c => c.id === cardId);
    if (!card) return;

    // Parse HP (handle formats like "546 (28d20 + 252)" or just "50")
    const hpText = card.formFields.hp;
    let maxHP = 0;
    const hpMatch = hpText.match(/^(\d+)/);
    if (hpMatch) {
        maxHP = parseInt(hpMatch[1]);
    }

    const enemy = {
        id: `enemy-${++enemyIdCounter}`,
        cardId: card.id,
        card: card,
        name: card.formFields.cardName,
        ac: card.formFields.ac,
        currentHP: maxHP,
        maxHP: maxHP,
        initiative: 0,
        dexMod: parseDexMod(card.formFields.dex)
    };

    combatState.enemies.push(enemy);
    loadEnemyCombatants();
    closeAddEnemyModal();
}

function addQuickEnemy() {
    const name = document.getElementById('quickEnemyName').value.trim();
    const ac = document.getElementById('quickEnemyAC').value;
    const hp = parseInt(document.getElementById('quickEnemyHP').value);
    const dexMod = parseInt(document.getElementById('quickEnemyDex').value) || 0;

    if (!name || !ac || !hp) {
        alert('Please fill in all enemy fields');
        return;
    }

    const enemy = {
        id: `enemy-${++enemyIdCounter}`,
        name: name,
        ac: ac,
        currentHP: hp,
        maxHP: hp,
        initiative: 0,
        dexMod: dexMod
    };

    combatState.enemies.push(enemy);
    loadEnemyCombatants();

    // Clear form
    document.getElementById('quickEnemyName').value = '';
    document.getElementById('quickEnemyAC').value = '';
    document.getElementById('quickEnemyHP').value = '';
    document.getElementById('quickEnemyDex').value = '0';

    closeAddEnemyModal();
}

function parseDexMod(dexString) {
    // Parse strings like "10 (+0)" or "14 (+2)"
    const match = dexString.match(/\(([+-]?\d+)\)/);
    return match ? parseInt(match[1]) : 0;
}

function removeEnemy(enemyId) {
    combatState.enemies = combatState.enemies.filter(e => e.id !== enemyId);

    // Clean up state for this enemy
    delete combatState.openActionPanels[enemyId];
    delete combatState.selectedTargets[enemyId];

    loadEnemyCombatants();

    // If combat is active, update initiative order
    if (combatState.active) {
        updateInitiativeOrder();
    }
}

function closeAddEnemyModal() {
    document.getElementById('addEnemyModal').style.display = 'none';
}

function updateCombatantHP(id, type, newHP) {
    if (type === 'party') {
        const member = adventureParty.find(m => m.cardId === id);
        if (member) {
            member.currentHP = Math.max(0, Math.min(newHP, member.maxHP));
            updateAdventurePartyDisplay();
        }
    } else {
        const enemy = combatState.enemies.find(e => e.id === id);
        if (enemy) {
            enemy.currentHP = Math.max(0, Math.min(newHP, enemy.maxHP));
        }
    }

    loadPartyCombatants();
    loadEnemyCombatants();

    if (combatState.active) {
        updateInitiativeOrder();
    }
}

function updateInitiative(id, type, initiative) {
    if (type === 'party') {
        const member = adventureParty.find(m => m.cardId === id);
        if (member) {
            member.initiative = parseInt(initiative) || 0;
        }
    } else {
        const enemy = combatState.enemies.find(e => e.id === id);
        if (enemy) {
            enemy.initiative = parseInt(initiative) || 0;
        }
    }
}

function startCombat() {
    if (adventureParty.length === 0 && combatState.enemies.length === 0) {
        alert('Add party members and/or enemies before starting combat!');
        return;
    }

    // Start new combat session: increment combat counter and reset action sequence
    combatCounter++;
    actionSequence = 0;

    // Roll initiative for everyone who doesn't have one
    adventureParty.forEach(member => {
        if (!member.initiative || member.initiative === 0) {
            const dexMod = parseDexMod(member.card.formFields.dex);
            member.initiative = rollD20() + dexMod;
        }
    });

    combatState.enemies.forEach(enemy => {
        if (!enemy.initiative || enemy.initiative === 0) {
            enemy.initiative = rollD20() + (enemy.dexMod || 0);
        }
    });

    combatState.active = true;
    combatState.round = 1;
    combatState.currentTurnIndex = 0;

    updateInitiativeOrder();
    updateCombatControls();
    loadPartyCombatants();
    loadEnemyCombatants();

    // Log combat start and first turn
    addCombatLog(`⚔️ <strong>Combat ${combatCounter} has begun!</strong> Round 1 starts.`, 'info');

    const firstCombatant = combatState.initiativeOrder[0];
    if (firstCombatant) {
        addCombatLog(`🎯 It's <strong>${firstCombatant.name}</strong>'s turn.`, 'info');
    }
}

function rollD20() {
    return Math.floor(Math.random() * 20) + 1;
}

// Comprehensive dice rolling functions
function rollDie(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function rollDice(count, sides) {
    let total = 0;
    const rolls = [];
    for (let i = 0; i < count; i++) {
        const roll = rollDie(sides);
        rolls.push(roll);
        total += roll;
    }
    return { total, rolls };
}

// Parse and roll dice notation (e.g., "2d6+3", "1d20", "3d8-2")
function parseDiceNotation(notation) {
    const match = notation.trim().match(/^(\d+)d(\d+)([+-]\d+)?$/i);
    if (!match) {
        return null;
    }

    const count = parseInt(match[1]);
    const sides = parseInt(match[2]);
    const modifier = match[3] ? parseInt(match[3]) : 0;

    const diceResult = rollDice(count, sides);
    const total = diceResult.total + modifier;

    return {
        count,
        sides,
        modifier,
        rolls: diceResult.rolls,
        total,
        notation
    };
}

// Combat log storage
let combatLog = [];
let combatCounter = 0; // Tracks which combat session (1, 2, 3, etc.)
let actionSequence = 0; // Tracks actions within current combat (1, 2, 3, etc.)

function addCombatLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    actionSequence++;
    const sequenceNumber = `${combatCounter}.${actionSequence}`;
    combatLog.push({
        sequence: sequenceNumber,
        combatNumber: combatCounter,
        actionNumber: actionSequence,
        timestamp,
        message,
        type // 'info', 'hit', 'miss', 'damage', 'critical'
    });
    displayCombatLog();
}

function displayCombatLog() {
    const container = document.getElementById('combatLog');
    if (!container) return;

    // Show last 20 entries
    const recentLogs = combatLog.slice(-20).reverse();

    container.innerHTML = recentLogs.map(log => `
        <div class="combat-log-entry combat-log-${log.type}">
            <span class="log-sequence">#${log.sequence}</span>
            <span class="log-time">[${log.timestamp}]</span>
            <span class="log-message">${log.message}</span>
        </div>
    `).join('');

    // Auto-scroll to top (since we reversed)
    container.scrollTop = 0;
}

function clearCombatLog() {
    combatLog = [];
    combatCounter = 0;
    actionSequence = 0;
    const container = document.getElementById('combatLog');
    if (container) {
        container.innerHTML = '<p class="no-log">Combat log will appear here...</p>';
    }
}

// Attack roll function
function performAttack(attackerId, attackerType, attackerName, targetId, targetType, targetName, attackBonus, targetAC) {
    const roll = rollD20();
    const total = roll + attackBonus;
    const isCritical = roll === 20;
    const isCriticalMiss = roll === 1;
    const isHit = isCritical || (total >= targetAC && !isCriticalMiss);

    let logMessage = `<strong>${attackerName}</strong> attacks <strong>${targetName}</strong>: `;
    logMessage += `rolled ${roll} + ${attackBonus} = ${total} vs AC ${targetAC}`;

    if (isCritical) {
        addCombatLog(logMessage + ' - <strong>CRITICAL HIT!</strong>', 'critical');
        return { hit: true, critical: true, roll, total, targetId, targetType };
    } else if (isCriticalMiss) {
        addCombatLog(logMessage + ' - <strong>Critical Miss!</strong>', 'miss');
        return { hit: false, critical: false, roll, total, targetId, targetType };
    } else if (isHit) {
        addCombatLog(logMessage + ' - <strong>Hit!</strong>', 'hit');
        return { hit: true, critical: false, roll, total, targetId, targetType };
    } else {
        addCombatLog(logMessage + ' - Miss', 'miss');
        return { hit: false, critical: false, roll, total, targetId, targetType };
    }
}

// Damage roll function
function rollDamage(attackerName, targetId, targetType, targetName, diceNotation, isCritical = false) {
    let result = parseDiceNotation(diceNotation);

    if (!result) {
        alert('Invalid dice notation. Use format like "1d8+3"');
        return;
    }

    // Double dice on critical hit
    if (isCritical) {
        const critResult = rollDice(result.count * 2, result.sides);
        result.rolls = critResult.rolls;
        result.total = critResult.total + result.modifier;
    }

    const rollsText = result.rolls.join(' + ');
    const modText = result.modifier !== 0 ? ` ${result.modifier >= 0 ? '+' : ''}${result.modifier}` : '';

    let logMessage = `<strong>${attackerName}</strong> deals ${result.total} damage to <strong>${targetName}</strong>`;
    logMessage += ` (${rollsText}${modText})`;
    if (isCritical) {
        logMessage += ' <strong>[CRITICAL]</strong>';
    }

    addCombatLog(logMessage, 'damage');

    // Apply damage
    applyDamage(targetId, targetType, result.total);

    return result;
}

function applyDamage(targetId, targetType, damage) {
    if (targetType === 'party') {
        const member = adventureParty.find(m => m.cardId === targetId);
        if (member) {
            const newHP = Math.max(0, member.currentHP - damage);
            updateCombatantHP(targetId, targetType, newHP);

            if (newHP === 0) {
                addCombatLog(`<strong>${member.card.formFields.cardName}</strong> is down!`, 'info');
            }
        }
    } else {
        const enemy = combatState.enemies.find(e => e.id === targetId);
        if (enemy) {
            const newHP = Math.max(0, enemy.currentHP - damage);
            updateCombatantHP(targetId, targetType, newHP);

            if (newHP === 0) {
                addCombatLog(`<strong>${enemy.name}</strong> is defeated!`, 'info');
            }
        }
    }
}

function updateInitiativeOrder() {
    const allCombatants = [];

    // Add party members
    adventureParty.forEach(member => {
        allCombatants.push({
            id: member.cardId,
            name: member.card.formFields.cardName,
            initiative: member.initiative || 0,
            currentHP: member.currentHP,
            maxHP: member.maxHP,
            type: 'party'
        });
    });

    // Add enemies
    combatState.enemies.forEach(enemy => {
        allCombatants.push({
            id: enemy.id,
            name: enemy.name,
            initiative: enemy.initiative || 0,
            currentHP: enemy.currentHP,
            maxHP: enemy.maxHP,
            type: 'enemy'
        });
    });

    // Sort by initiative (highest first), then by dex mod as tiebreaker
    allCombatants.sort((a, b) => b.initiative - a.initiative);

    combatState.initiativeOrder = allCombatants;
    displayInitiativeOrder();
}

function displayInitiativeOrder() {
    const container = document.getElementById('initiativeOrder');

    if (!combatState.active || combatState.initiativeOrder.length === 0) {
        container.innerHTML = '<p class="no-initiative">Start combat to roll initiative</p>';
        return;
    }

    container.innerHTML = '';
    combatState.initiativeOrder.forEach((combatant, index) => {
        const item = document.createElement('div');
        item.className = 'initiative-item';
        if (index === combatState.currentTurnIndex) {
            item.classList.add('current-turn');
        }
        if (combatant.currentHP <= 0) {
            item.classList.add('defeated');
        }

        const hpPercent = (combatant.currentHP / combatant.maxHP) * 100;
        const hpClass = hpPercent > 50 ? 'hp-good' : hpPercent > 25 ? 'hp-warning' : 'hp-danger';

        item.innerHTML = `
            <div class="initiative-info">
                <span class="initiative-number">${combatant.initiative}</span>
                <span class="initiative-name ${combatant.type === 'enemy' ? 'enemy-name' : 'party-name'}">${combatant.name}</span>
            </div>
            <div class="initiative-hp ${hpClass}">${combatant.currentHP}/${combatant.maxHP}</div>
        `;

        container.appendChild(item);
    });

    updateCurrentTurnDisplay();
}

function updateCurrentTurnDisplay() {
    if (!combatState.active || combatState.initiativeOrder.length === 0) {
        document.getElementById('currentRound').textContent = '-';
        document.getElementById('currentTurnName').textContent = '-';
        return;
    }

    const currentCombatant = combatState.initiativeOrder[combatState.currentTurnIndex];
    document.getElementById('currentRound').textContent = combatState.round;
    document.getElementById('currentTurnName').textContent = currentCombatant ? currentCombatant.name : '-';
}

function nextTurn() {
    if (!combatState.active) return;

    combatState.currentTurnIndex++;

    // If we've gone through everyone, start a new round
    if (combatState.currentTurnIndex >= combatState.initiativeOrder.length) {
        combatState.currentTurnIndex = 0;
        combatState.round++;
        addCombatLog(`📜 <strong>Round ${combatState.round} begins!</strong>`, 'info');
    }

    displayInitiativeOrder();

    // Highlight the active turn
    highlightActiveTurn();

    // Log whose turn it is
    const currentCombatant = combatState.initiativeOrder[combatState.currentTurnIndex];
    if (currentCombatant) {
        addCombatLog(`🎯 It's <strong>${currentCombatant.name}</strong>'s turn.`, 'info');
    }
}

function endCombat() {
    if (!confirm('End combat? All initiative and combat state will be reset.')) {
        return;
    }

    addCombatLog('🏁 <strong>Combat has ended!</strong>', 'info');

    combatState.active = false;
    combatState.round = 0;
    combatState.currentTurnIndex = 0;

    // Reset initiatives
    adventureParty.forEach(member => member.initiative = 0);
    combatState.enemies.forEach(enemy => enemy.initiative = 0);

    updateCombatControls();
    loadPartyCombatants();
    loadEnemyCombatants();
    displayInitiativeOrder();
}

function updateCombatControls() {
    const startBtn = document.getElementById('startCombatBtn');
    const nextBtn = document.getElementById('nextTurnBtn');
    const endBtn = document.getElementById('endCombatBtn');

    if (combatState.active) {
        startBtn.disabled = true;
        nextBtn.disabled = false;
        endBtn.disabled = false;
    } else {
        startBtn.disabled = false;
        nextBtn.disabled = true;
        endBtn.disabled = true;
    }
}

function attachCombatEventListeners() {
    // HP controls
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('hp-btn-combat')) {
            const id = e.target.dataset.id;
            const type = e.target.dataset.type;
            const isIncrease = e.target.classList.contains('increase');

            if (type === 'party') {
                const member = adventureParty.find(m => m.cardId === id);
                if (member) {
                    const newHP = member.currentHP + (isIncrease ? 1 : -1);
                    updateCombatantHP(id, type, newHP);
                }
            } else {
                const enemy = combatState.enemies.find(e => e.id === id);
                if (enemy) {
                    const newHP = enemy.currentHP + (isIncrease ? 1 : -1);
                    updateCombatantHP(id, type, newHP);
                }
            }
        }

        if (e.target.classList.contains('remove-enemy-btn')) {
            const enemyId = e.target.dataset.enemyId;
            removeEnemy(enemyId);
        }

        if (e.target.classList.contains('btn-add-this-enemy')) {
            const cardId = e.target.dataset.cardId;
            addEnemyFromDeck(cardId);
        }

        // Toggle combat actions panel
        if (e.target.classList.contains('toggle-actions-btn')) {
            const card = e.target.closest('.combatant-card');
            const panel = card.querySelector('.combat-action-panel');
            const combatantId = e.target.dataset.id;

            if (panel.style.display === 'none') {
                panel.style.display = 'block';
                e.target.textContent = '▲';
                combatState.openActionPanels[combatantId] = true;
            } else {
                panel.style.display = 'none';
                e.target.textContent = '▼';
                combatState.openActionPanels[combatantId] = false;
            }
        }

        // Roll attack
        if (e.target.classList.contains('btn-roll-attack')) {
            const attackerId = e.target.dataset.attackerId;
            const attackerType = e.target.dataset.attackerType;
            const attackerName = e.target.dataset.attackerName;

            const card = e.target.closest('.combatant-card');
            const targetSelect = card.querySelector('.attack-target-select');
            const attackBonusInput = card.querySelector('.attack-bonus-input');

            const targetValue = targetSelect.value;
            if (!targetValue) {
                alert('Please select a target!');
                return;
            }

            const [targetId, targetType, targetName, targetAC] = targetValue.split('|');
            const attackBonus = parseInt(attackBonusInput.value) || 0;

            const result = performAttack(attackerId, attackerType, attackerName, targetId, targetType, targetName, attackBonus, parseInt(targetAC));

            // Store attack result for damage roll
            card.dataset.lastAttackResult = JSON.stringify(result);
        }

        // Roll damage
        if (e.target.classList.contains('btn-roll-damage')) {
            const attackerName = e.target.dataset.attackerName;

            const card = e.target.closest('.combatant-card');
            const targetSelect = card.querySelector('.attack-target-select');
            const damageDiceInput = card.querySelector('.damage-dice-input');

            const targetValue = targetSelect.value;
            if (!targetValue) {
                alert('Please select a target!');
                return;
            }

            const [targetId, targetType, targetName] = targetValue.split('|');
            const diceNotation = damageDiceInput.value.trim();

            if (!diceNotation) {
                alert('Please enter damage dice (e.g., "1d8+3")');
                return;
            }

            // Check if there was a recent attack and if it was critical
            let isCritical = false;
            if (card.dataset.lastAttackResult) {
                try {
                    const lastAttack = JSON.parse(card.dataset.lastAttackResult);
                    isCritical = lastAttack.critical;
                } catch (e) {
                    // Ignore parse errors
                }
            }

            rollDamage(attackerName, targetId, targetType, targetName, diceNotation, isCritical);

            // Clear last attack result
            delete card.dataset.lastAttackResult;
        }
    });

    // HP input changes
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('combat-hp-input')) {
            const id = e.target.dataset.id;
            const type = e.target.dataset.type;
            const newHP = parseInt(e.target.value) || 0;
            updateCombatantHP(id, type, newHP);
        }

        if (e.target.classList.contains('initiative-input')) {
            const id = e.target.dataset.id;
            const type = e.target.dataset.type;
            const initiative = e.target.value;
            updateInitiative(id, type, initiative);
        }

        // Save selected target when it changes
        if (e.target.classList.contains('attack-target-select')) {
            const attackerId = e.target.dataset.attackerId;
            const targetValue = e.target.value;
            combatState.selectedTargets[attackerId] = targetValue;
        }
    });
}

function initCombat() {
    // Add enemy button
    document.getElementById('addEnemyBtn').addEventListener('click', showAddEnemyModal);

    // Close enemy modal
    document.getElementById('closeEnemyModal').addEventListener('click', closeAddEnemyModal);

    // Quick add enemy
    document.getElementById('addQuickEnemyBtn').addEventListener('click', addQuickEnemy);

    // Combat controls
    document.getElementById('startCombatBtn').addEventListener('click', startCombat);
    document.getElementById('nextTurnBtn').addEventListener('click', nextTurn);
    document.getElementById('endCombatBtn').addEventListener('click', endCombat);

    // Clear combat log
    document.getElementById('clearCombatLogBtn').addEventListener('click', clearCombatLog);

    // Attach combat event listeners
    attachCombatEventListeners();

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('addEnemyModal');
        if (e.target === modal) {
            closeAddEnemyModal();
        }
    });
}

function initAdventureTracker() {
    // Refresh character list button
    document.getElementById('refreshCharactersBtn').addEventListener('click', loadCharacterList);

    // Save adventure button
    document.getElementById('saveAdventureBtn').addEventListener('click', saveAdventure);

    // Load adventure button
    document.getElementById('loadAdventureBtn').addEventListener('click', function() {
        document.getElementById('loadAdventureFile').click();
    });

    // File input for loading
    document.getElementById('loadAdventureFile').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async function(event) {
                await loadAdventure(event.target.result);
            };
            reader.readAsText(file);
        }
        // Reset the input so the same file can be loaded again
        this.value = '';
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    await init();
    initCustomization();
    initTabs();
    initAdventureTracker();
    initCombat();
});
