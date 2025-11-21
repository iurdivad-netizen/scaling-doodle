// Template Definitions
// Global counter for unique card IDs
let cardIdCounter = 0;

const templates = {
    creature: {
        name: 'Creature/Monster',
        fields: ['cardName', 'cardType', 'cardSubtype', 'imageUpload', 'imageUrl', 'ac', 'hp', 'speed', 'str', 'dex', 'con', 'int', 'wis', 'cha', 'initiative', 'proficiency', 'savingThrows', 'spellCombat', 'spellSlots', 'keyCantrips', 'domainSpells', 'preparedSpells', 'classFeatures', 'equipment', 'passivePerception', 'additionalStats', 'description'],
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
const imageBgColorInput = document.getElementById('imageBgColor');
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
const stickyPreviewToggle = document.getElementById('stickyPreviewToggle');
const previewPanel = document.querySelector('.preview-panel');

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

    // Update back card
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
            ${additionalStats ? '<div class="divider"></div><div class="additional-stats"><p>' + additionalStats + '</p></div>' : ''}
            ${description ? '<div class="divider"></div><div class="abilities-section"><p>' + description + '</p></div>' : ''}
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
            ${additionalStats ? '<div class="divider"></div><div class="additional-stats"><p>' + additionalStats + '</p></div>' : ''}
            ${description ? '<div class="divider"></div><div class="spell-description"><p>' + description + '</p></div>' : ''}
        </div>
    `;
}

// Generate item card preview
function generateItemPreview() {
    const name = document.getElementById('cardName').value || 'Item Name';
    const rarity = document.getElementById('itemRarity')?.value || 'Rarity';
    const itemType = document.getElementById('itemType')?.value || 'Type';
    const attunement = document.getElementById('attunement')?.value || '';
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
            <div class="card-type item-header">
                <span>${itemType}</span>
                ${rarity ? '<span class="separator">•</span><span class="item-rarity">' + rarity + '</span>' : ''}
            </div>
            ${attunement ? '<div class="item-attunement">' + attunement + '</div>' : ''}
            ${additionalStats ? '<div class="divider"></div><div class="additional-stats"><p>' + additionalStats + '</p></div>' : ''}
            ${description ? '<div class="divider"></div><div class="item-description"><p>' + description + '</p></div>' : ''}
        </div>
    `;
}

// Generate ability card preview
function generateAbilityPreview() {
    const name = document.getElementById('cardName').value || 'Ability Name';
    const source = document.getElementById('abilitySource')?.value || 'Source';
    const level = document.getElementById('abilityLevel')?.value || '';
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
            <div class="card-type ability-header">
                <span>${source}</span>
                ${level ? '<span class="separator">•</span><span>' + level + '</span>' : ''}
            </div>
            ${additionalStats ? '<div class="divider"></div><div class="additional-stats"><p>' + additionalStats + '</p></div>' : ''}
            ${description ? '<div class="divider"></div><div class="ability-description"><p>' + description + '</p></div>' : ''}
        </div>
    `;
}

// Generate equipment card preview
function generateEquipmentPreview() {
    const name = document.getElementById('cardName').value || 'Equipment Name';
    const equipType = document.getElementById('equipmentType')?.value || 'Type';
    const cost = document.getElementById('equipmentCost')?.value || '';
    const weight = document.getElementById('equipmentWeight')?.value || '';
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
            <div class="card-type equipment-header">
                <span>${equipType}</span>
            </div>
            <div class="equipment-details">
                ${cost ? '<div><strong>Cost:</strong> ' + cost + '</div>' : ''}
                ${weight ? '<div><strong>Weight:</strong> ' + weight + '</div>' : ''}
            </div>
            ${additionalStats ? '<div class="divider"></div><div class="additional-stats"><p>' + additionalStats + '</p></div>' : ''}
            ${description ? '<div class="divider"></div><div class="equipment-description"><p>' + description + '</p></div>' : ''}
        </div>
    `;
}

// Update back card based on layout and template
function updateBackCard() {
    const backCardContent = document.querySelector('.back-card-content');

    if (!backCardContent) return;

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

// Generate three-column trifold panels
function generateThreeColumnPanels() {
    const templateId = currentTemplate;

    // Front panel - image + basic stats
    const frontPanel = generateThreeColumnFront(templateId);

    // Back panel 1 - spells
    const back1Panel = generateThreeColumnBack1(templateId);

    // Back panel 2 - features & equipment
    const back2Panel = generateThreeColumnBack2(templateId);

    // Back panel 3 - additional stats & description
    const back3Panel = generateThreeColumnBack3(templateId);

    return { frontPanel, back1Panel, back2Panel, back3Panel };
}

function generateSavingThrowsBoxes(savingThrowsText) {
    if (!savingThrowsText) return '';

    // Parse saving throws text to extract abilities
    // Expected format: "STR +5, DEX +3" or similar
    const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
    const savingThrowsMap = {};

    // Parse the text for each ability
    abilities.forEach(ability => {
        const regex = new RegExp(ability + '\\s*([+-]?\\d+)', 'i');
        const match = savingThrowsText.match(regex);
        if (match) {
            savingThrowsMap[ability] = match[1];
        }
    });

    // Generate boxes for abilities with saving throws
    return abilities
        .filter(ability => savingThrowsMap[ability])
        .map(ability => `
            <div class="ability-score">
                <div class="ability-name">${ability}</div>
                <div class="ability-value">${savingThrowsMap[ability]}</div>
            </div>
        `).join('');
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

        // Get initiative, proficiency, passive perception, and saving throws from dedicated fields
        const initiative = document.getElementById('initiative')?.value || '+0';
        const proficiency = document.getElementById('proficiency')?.value || '+2';
        const passivePerception = document.getElementById('passivePerception')?.value || '';
        const savingThrows = document.getElementById('savingThrows')?.value || '';

        return `
            <div class="card-image">
                <img id="previewImage" src="" alt="Card Image">
                <div class="card-name-overlay">
                    <h2>${name}</h2>
                </div>
            </div>
            <div class="card-content trifold-front">
                <div class="card-type">
                    <div class="card-type-main">${type}</div>
                    <div class="card-type-sub">${subtype}</div>
                </div>
                <div class="divider"></div>
                <div class="stat-list">
                    <div class="stat-row">
                        <strong>AC:</strong><span>${ac}</span>
                    </div>
                    <div class="stat-row">
                        <strong>HP:</strong><span>${hp}</span>
                    </div>
                    <div class="stat-row">
                        <strong>Speed:</strong><span>${speed}</span>
                    </div>
                    <div class="stat-row">
                        <strong>Init:</strong><span>${initiative}</span>
                    </div>
                    <div class="stat-row">
                        <strong>Prof:</strong><span>${proficiency}</span>
                    </div>
                    ${passivePerception ? `
                    <div class="stat-row">
                        <strong>PP:</strong><span>${passivePerception}</span>
                    </div>
                    ` : ''}
                </div>
                <div class="divider"></div>
                <div class="ability-scores-section">
                    <div class="ability-scores-section-title">ABILITY SCORES</div>
                    <div class="ability-scores-display">
                        <div class="ability-score">
                            <div class="ability-name">STR</div>
                            <div class="ability-value">${str}</div>
                        </div>
                        <div class="ability-score">
                            <div class="ability-name">DEX</div>
                            <div class="ability-value">${dex}</div>
                        </div>
                        <div class="ability-score">
                            <div class="ability-name">CON</div>
                            <div class="ability-value">${con}</div>
                        </div>
                        <div class="ability-score">
                            <div class="ability-name">INT</div>
                            <div class="ability-value">${int}</div>
                        </div>
                        <div class="ability-score">
                            <div class="ability-name">WIS</div>
                            <div class="ability-value">${wis}</div>
                        </div>
                        <div class="ability-score">
                            <div class="ability-name">CHA</div>
                            <div class="ability-value">${cha}</div>
                        </div>
                    </div>
                </div>
                ${savingThrows ? `
                <div class="divider"></div>
                <div class="ability-scores-section">
                    <div class="ability-scores-section-title">SAVING THROWS</div>
                    <div class="ability-scores-display">
                        ${generateSavingThrowsBoxes(savingThrows)}
                    </div>
                </div>
                ` : ''}
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
        <div class="card-content trifold-front">
            <p style="text-align: center;">Front Panel</p>
        </div>
    `;
}

function generateThreeColumnBack1(templateId) {
    const name = document.getElementById('cardName').value || 'Card Name';

    if (templateId === 'creature') {
        // Get spell combat from dedicated field
        const spellCombat = document.getElementById('spellCombat')?.value || '';

        // Get spell slots from dedicated field
        const spellSlots = document.getElementById('spellSlots')?.value || '';

        // Get key cantrips from dedicated field
        const keyCantrips = document.getElementById('keyCantrips')?.value || '';

        // Get domain spells from dedicated field
        const domainSpells = document.getElementById('domainSpells')?.value || '';

        // Get prepared spells from dedicated field
        const preparedSpells = document.getElementById('preparedSpells')?.value || '';

        return `
            <div class="card-content trifold-content">
                <div class="trifold-header">
                    <h2>${name}</h2>
                </div>

                ${spellCombat ? `
                <div class="trifold-section">
                    <div class="trifold-section-title">SPELL COMBAT</div>
                    <div class="divider"></div>
                    <div class="trifold-text-tiny">${spellCombat}</div>
                </div>
                ` : ''}

                ${spellSlots ? `
                <div class="trifold-section">
                    <div class="trifold-section-title">SPELL SLOTS</div>
                    <div class="divider"></div>
                    <div class="trifold-text-tiny">${spellSlots}</div>
                </div>
                ` : ''}

                ${keyCantrips ? `
                <div class="trifold-section">
                    <div class="trifold-section-title">KEY CANTRIPS</div>
                    <div class="divider"></div>
                    <div class="trifold-text-tiny">${keyCantrips}</div>
                </div>
                ` : ''}

                ${domainSpells ? `
                <div class="trifold-section">
                    <div class="trifold-section-title">DOMAIN SPELLS (always prep)</div>
                    <div class="divider"></div>
                    <div class="trifold-text-tiny">${domainSpells}</div>
                </div>
                ` : ''}

                ${preparedSpells ? `
                <div class="trifold-section">
                    <div class="trifold-section-title">PREPARED SPELLS</div>
                    <div class="divider"></div>
                    <div class="trifold-text-tiny">${preparedSpells}</div>
                </div>
                ` : ''}
            </div>
        `;
    }

    return `
        <div class="card-content trifold-content">
            <div class="trifold-header">
                <h2>Panel 2</h2>
            </div>
            <p>Additional information</p>
        </div>
    `;
}

function generateThreeColumnBack2(templateId) {
    const name = document.getElementById('cardName').value || 'Card Name';

    if (templateId === 'creature') {
        // Get data from dedicated fields
        const classFeaturesText = document.getElementById('classFeatures')?.value || '';
        const equipmentText = document.getElementById('equipment')?.value || '';
        const passivePerception = document.getElementById('passivePerception')?.value || '';

        // Format class features
        const classFeatures = classFeaturesText;

        // Format equipment
        const equipment = equipmentText;

        return `
            <div class="card-content trifold-content">
                <div class="trifold-header">
                    <h2>${name}</h2>
                </div>

                ${classFeatures ? `
                <div class="trifold-section">
                    <div class="trifold-section-title">CLASS FEATURES</div>
                    <div class="divider"></div>
                    <div class="trifold-text-tiny">${classFeatures}</div>
                </div>
                ` : ''}

                ${equipment ? `
                <div class="trifold-section">
                    <div class="trifold-section-title">EQUIPMENT</div>
                    <div class="divider"></div>
                    <div class="trifold-text-tiny">${equipment}</div>
                </div>
                ` : ''}

            </div>
        `;
    }

    return `
        <div class="card-content trifold-content">
            <div class="trifold-header">
                <h2>Panel 3</h2>
            </div>
            <p>Description</p>
        </div>
    `;
}

// Generate Panel 4: Back Far Right (Stats & Description)
function generateThreeColumnBack3(templateId) {
    const name = document.getElementById('cardName').value || 'Card Name';
    const descriptionText = document.getElementById('description')?.value || '';

    if (templateId === 'creature') {
        // Get data from dedicated fields
        const additionalStatsText = document.getElementById('additionalStats')?.value || '';

        // Format additional stats
        const additionalStats = additionalStatsText;

        // Format description
        const description = descriptionText;

        return `
            <div class="card-content trifold-content">
                <div class="trifold-header">
                    <h2>${name}</h2>
                </div>

                ${additionalStats ? `
                <div class="trifold-section">
                    <div class="trifold-section-title">ADDITIONAL STATS</div>
                    <div class="divider"></div>
                    <div class="trifold-text-tiny">${additionalStats}</div>
                </div>
                ` : ''}

                ${description ? `
                <div class="trifold-section">
                    <div class="trifold-section-title">DESCRIPTION</div>
                    <div class="divider"></div>
                    <div class="trifold-text-tiny">${description}</div>
                </div>
                ` : ''}

            </div>
        `;
    }

    // All other templates show description on Panel 4
    return `
        <div class="card-content trifold-content">
            <div class="trifold-header">
                <h2>${name}</h2>
            </div>

            ${descriptionText ? `
            <div class="trifold-section">
                <div class="trifold-section-title">DESCRIPTION</div>
                <div class="divider"></div>
                <div class="trifold-text-normal">${descriptionText}</div>
            </div>
            ` : ''}
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

        // Generate four distinct panels
        const { frontPanel, back1Panel, back2Panel, back3Panel } = generateThreeColumnPanels();

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

        // Create back panel 3
        const panel3 = document.createElement('div');
        panel3.className = 'card card-front trifold-panel';
        panel3.id = 'trifold-panel-3';
        panel3.innerHTML = back3Panel;
        cardsDisplay.insertBefore(panel3, cardBack);

        // Apply horizontal stats layout if enabled
        const useHorizontalStatsLayout = document.getElementById('useHorizontalStatsLayout');
        if (useHorizontalStatsLayout && useHorizontalStatsLayout.checked) {
            panel1.classList.add('horizontal-stats');
            panel2.classList.add('horizontal-stats');
            panel3.classList.add('horizontal-stats');
        }

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
    const lines = text.trim().split('\n')
        .map(line => line.trim().replace(/^[║│┃╏╎┆┇┊┋]+\s*/, '').replace(/\s*[║│┃╏╎┆┇┊┋]+$/, '').trim())
        .filter(line => line && !line.match(/^[═─━┈┉┊┋╌╍╎╏]+$/));

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
        initiative: '',
        proficiency: '',
        savingThrows: '',
        spellCombat: '',
        spellSlots: '',
        keyCantrips: '',
        domainSpells: '',
        preparedSpells: '',
        classFeatures: '',
        equipment: '',
        passivePerception: '',
        additionalStats: '',
        description: ''
    };

    if (lines.length === 0) return parsedData;

    // Parse first line: "Name – Type/Class" or "ELIAS THORN - GRAVE CLERIC"
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

    // Check for "Level X Race Class" format (e.g., "Level 4 Human Cleric")
    const levelLine = lines.find(line => /^Level\s+\d+/i.test(line));
    if (levelLine) {
        const levelMatch = levelLine.match(/Level\s+(\d+)\s+(.+)/i);
        if (levelMatch) {
            const typeInfo = levelMatch[2].trim();
            const typeParts = typeInfo.split(' ');
            if (typeParts.length >= 2) {
                parsedData.cardType = typeParts[0]; // Race (e.g., "Human")
                parsedData.cardSubtype = `Level ${levelMatch[1]} ${typeParts.slice(1).join(' ')}`; // e.g., "Level 4 Cleric"
            } else {
                parsedData.cardSubtype = `Level ${levelMatch[1]} ${typeInfo}`;
            }
        }
    }

    // Parse domain/archetype line if present (e.g., "Grave Domain")
    const domainLine = lines.find(line => /Domain|Circle|Path|Way|Tradition/i.test(line) && !line.includes(':'));
    if (domainLine && domainLine !== levelLine && domainLine !== firstLine) {
        if (parsedData.cardSubtype) {
            parsedData.cardSubtype += ` (${domainLine.trim()})`;
        } else {
            parsedData.cardSubtype = domainLine.trim();
        }
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

    // Parse ability scores - handle multi-line format
    const abilityScoresIndex = lines.findIndex(line => /ABILITY SCORES/i.test(line));
    let abilityLine = '';

    if (abilityScoresIndex >= 0) {
        // Collect lines after ABILITY SCORES header until we hit another section
        const abilityLines = [];
        for (let i = abilityScoresIndex + 1; i < lines.length; i++) {
            if (lines[i].match(/^[A-Z\s]+$/) && lines[i].length > 15) {
                // Hit another section header
                break;
            }
            if (lines[i].includes('STR') || lines[i].includes('DEX') || lines[i].includes('CON') ||
                lines[i].includes('INT') || lines[i].includes('WIS') || lines[i].includes('CHA')) {
                abilityLines.push(lines[i]);
            }
        }
        abilityLine = abilityLines.join(' ');
    } else {
        // Fallback: find single line with STR
        abilityLine = lines.find(line => /STR\s+\d+/.test(line)) || '';
    }

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

    // Build additionalStats from remaining sections (skills, immunities, senses, etc.)
    const additionalStatsParts = [];

    // Parse Initiative and Proficiency
    const initProfLine = lines.find(line => /Initiative:/i.test(line) && /Proficiency:/i.test(line));
    if (initProfLine) {
        const initMatch = initProfLine.match(/Initiative:\s*([+\-]?\d+)/i);
        const profMatch = initProfLine.match(/Proficiency:\s*([+\-]?\d+)/i);
        if (initMatch) parsedData.initiative = initMatch[1];
        if (profMatch) parsedData.proficiency = profMatch[1];
    }

    // Parse Saving Throws section
    const savingThrowsIndex = lines.findIndex(line => /^SAVING THROWS$/i.test(line));
    if (savingThrowsIndex >= 0 && savingThrowsIndex + 1 < lines.length) {
        parsedData.savingThrows = lines[savingThrowsIndex + 1];
    }

    // Parse Combat section
    const combatIndex = lines.findIndex(line => /^COMBAT$/i.test(line));
    if (combatIndex >= 0) {
        for (let i = combatIndex + 1; i < lines.length; i++) {
            const line = lines[i];
            if (line.match(/^[A-Z\s]+$/) && line.length > 10) break; // Hit next section

            if (/Spell Save DC:/i.test(line)) {
                const match = line.match(/Spell Save DC:\s*(\d+)/i);
                if (match) parsedData.spellSaveDC = match[1];
            }
            if (/Spell Attack:/i.test(line)) {
                const match = line.match(/Spell Attack:\s*([+\-]?\d+)/i);
                if (match) parsedData.spellAttack = match[1];
            }
            if (/Attack:/i.test(line) && !/Spell Attack/i.test(line)) {
                additionalStatsParts.push(line);
            }
        }
    }

    // Parse Spell Slots
    const spellSlotsIndex = lines.findIndex(line => /^SPELL SLOTS$/i.test(line));
    if (spellSlotsIndex >= 0 && spellSlotsIndex + 1 < lines.length) {
        const slotsLine = lines[spellSlotsIndex + 1];

        const cantripsMatch = slotsLine.match(/Cantrips:\s*(\d+)/i);
        const level1Match = slotsLine.match(/1st Level:\s*(\d+)/i);
        const level2Match = slotsLine.match(/2nd Level:\s*(\d+)/i);
        const level3Match = slotsLine.match(/3rd Level:\s*(\d+)/i);

        if (cantripsMatch) parsedData.cantrips = cantripsMatch[1];
        if (level1Match) parsedData.level1Slots = level1Match[1];
        if (level2Match) parsedData.level2Slots = level2Match[1];
        if (level3Match) parsedData.level3Slots = level3Match[1];
    }

    // Parse Key Cantrips
    const cantripsIndex = lines.findIndex(line => /^KEY CANTRIPS$/i.test(line));
    if (cantripsIndex >= 0) {
        const cantripLines = [];
        for (let i = cantripsIndex + 1; i < lines.length; i++) {
            const line = lines[i];
            if (line.match(/^[A-Z\s]+$/) && line.length > 10) break; // Hit next section
            if (line.startsWith('•') || line.trim()) {
                cantripLines.push(line);
            }
        }
        parsedData.keyCantrips = cantripLines.join('\n');
    }

    // Parse Domain Spells
    const domainSpellsIndex = lines.findIndex(line => /^DOMAIN SPELLS/i.test(line));
    if (domainSpellsIndex >= 0) {
        const domainLines = [];
        for (let i = domainSpellsIndex + 1; i < lines.length; i++) {
            const line = lines[i];
            if (line.match(/^[A-Z\s]+$/) && line.length > 10) break; // Hit next section
            if (/^\d+\w+:/.test(line)) {
                domainLines.push(line);
            }
        }
        parsedData.domainSpells = domainLines.join('\n');
    }

    // Parse Passive Perception
    const passivePercLine = lines.find(line => /PASSIVE PERCEPTION:/i.test(line));
    if (passivePercLine) {
        const match = passivePercLine.match(/PASSIVE PERCEPTION:\s*(\d+)/i);
        if (match) parsedData.passivePerception = match[1];
    }

    // Parse Prepared Spells
    const preparedSpellsIndex = lines.findIndex(line => /^PREPARED SPELLS/i.test(line));
    if (preparedSpellsIndex >= 0) {
        const preparedLines = [];
        for (let i = preparedSpellsIndex + 1; i < lines.length; i++) {
            const line = lines[i];
            if (line.match(/^[A-Z\s]+$/) && line.length > 10 && !line.match(/^\d+\w+:/)) break;
            if (/^\d+\w+:/.test(line) || line.includes(',')) {
                preparedLines.push(line);
            }
        }
        parsedData.preparedSpells = preparedLines.join('\n');
    }

    // Parse Class Features
    const classFeaturesIndex = lines.findIndex(line => /^CLASS FEATURES$/i.test(line));
    if (classFeaturesIndex >= 0) {
        const featureLines = [];
        for (let i = classFeaturesIndex + 1; i < lines.length; i++) {
            const line = lines[i];
            if (line.match(/^[A-Z\s]+$/) && line.length > 10 && !line.startsWith('•') && !line.startsWith('-')) break;
            if (line.startsWith('•') || line.startsWith('-') || line.startsWith(' ')) {
                featureLines.push(line);
            }
        }
        parsedData.classFeatures = featureLines.join('\n');
    }

    // Parse Equipment
    const equipmentIndex = lines.findIndex(line => /^EQUIPMENT$/i.test(line));
    if (equipmentIndex >= 0) {
        const equipmentLines = [];
        let inEquipmentSection = false;
        for (let i = equipmentIndex + 1; i < lines.length; i++) {
            const line = lines[i];
            // Break if we hit another section header
            if (line.match(/^[A-Z\s]+$/) && line.length > 10) break;
            // Include lines that start with • or ×, or continuation lines (non-empty)
            if (line.startsWith('•') || line.includes('×')) {
                equipmentLines.push(line);
                inEquipmentSection = true;
            } else if (inEquipmentSection && line.length > 0 && !line.match(/^[A-Z\s]+$/)) {
                // Continuation line - append to last equipment line
                if (equipmentLines.length > 0) {
                    equipmentLines[equipmentLines.length - 1] += ' ' + line;
                }
            }
        }
        parsedData.equipment = equipmentLines.join('\n');
    }

    parsedData.additionalStats = additionalStatsParts.join('\n');

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

    // Switch to three-column layout for comprehensive character cards
    const layoutSelect = document.getElementById('cardLayout');
    if (layoutSelect && layoutSelect.value !== 'three-column') {
        layoutSelect.value = 'three-column';
        updateCardsDisplayLayout();
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

    // Fill in new dedicated fields
    if (data.initiative) document.getElementById('initiative').value = data.initiative;
    if (data.proficiency) document.getElementById('proficiency').value = data.proficiency;
    if (data.savingThrows) document.getElementById('savingThrows').value = data.savingThrows;
    if (data.spellSaveDC) document.getElementById('spellSaveDC').value = data.spellSaveDC;
    if (data.spellAttack) document.getElementById('spellAttack').value = data.spellAttack;
    if (data.cantrips) document.getElementById('cantrips').value = data.cantrips;
    if (data.level1Slots) document.getElementById('level1Slots').value = data.level1Slots;
    if (data.level2Slots) document.getElementById('level2Slots').value = data.level2Slots;
    if (data.level3Slots) document.getElementById('level3Slots').value = data.level3Slots;
    if (data.keyCantrips) document.getElementById('keyCantrips').value = data.keyCantrips;
    if (data.domainSpells) document.getElementById('domainSpells').value = data.domainSpells;
    if (data.preparedSpells) document.getElementById('preparedSpells').value = data.preparedSpells;
    if (data.classFeatures) document.getElementById('classFeatures').value = data.classFeatures;
    if (data.equipment) document.getElementById('equipment').value = data.equipment;
    if (data.passivePerception) document.getElementById('passivePerception').value = data.passivePerception;

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

                    // Update preview to ensure image displays on front panel
                    updatePreview();

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

    // Image background color picker
    imageBgColorInput.addEventListener('input', function(e) {
        const color = e.target.value;
        cardPreview.style.setProperty('--card-image-bg-color', color);
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

                    // Update preview to ensure image displays on front panel
                    updatePreview();

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

    // Sticky preview toggle
    stickyPreviewToggle.addEventListener('change', function() {
        if (this.checked) {
            previewPanel.classList.add('sticky');
            localStorage.setItem('stickyPreview', 'true');
        } else {
            previewPanel.classList.remove('sticky');
            localStorage.setItem('stickyPreview', 'false');
        }
    });

    // Load sticky preference
    const stickyPreference = localStorage.getItem('stickyPreview');
    if (stickyPreference === 'true') {
        stickyPreviewToggle.checked = true;
        previewPanel.classList.add('sticky');
    }
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

            try {
                const transaction = this.db.transaction([this.storeName], 'readwrite');
                const objectStore = transaction.objectStore(this.storeName);

                // Create a clean copy of the data to avoid any serialization issues
                const cleanData = JSON.parse(JSON.stringify(deckData));
                const record = { id: 'mainDeck', data: cleanData, timestamp: Date.now() };

                const request = objectStore.put(record);

                request.onsuccess = () => {
                    console.log('IndexedDB put operation successful');
                    resolve();
                };

                request.onerror = () => {
                    console.error('IndexedDB put operation failed:', request.error);
                    reject(request.error);
                };

                transaction.onerror = () => {
                    console.error('IndexedDB transaction failed:', transaction.error);
                    reject(transaction.error);
                };
            } catch (e) {
                console.error('Error preparing IndexedDB save:', e);
                reject(e);
            }
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
        console.log('IndexedDB initialized successfully');

        // Check if we need to migrate from localStorage
        const hasLocalStorage = localStorage.getItem('cardDeck');
        if (hasLocalStorage) {
            console.log('Found localStorage data, migrating to IndexedDB');
            await DeckDB.migrateFromLocalStorage();
        }

        // Load from IndexedDB
        deck = await DeckDB.loadDeck();
        console.log('Loaded deck from IndexedDB with', deck.length, 'cards');
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

    // Normalize all cards to ensure they have required properties
    normalizeImportedCards();

    updateDeckCounter();
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

// Normalize imported cards to ensure they have all required properties
function normalizeImportedCards() {
    deck.forEach(card => {
        // Ensure theme exists with default values if missing
        if (!card.theme || typeof card.theme !== 'object') {
            card.theme = { ...defaultTheme };
            console.log('Added default theme to card:', card.name);
        } else {
            // Fill in any missing theme properties with defaults
            Object.keys(defaultTheme).forEach(key => {
                if (card.theme[key] === undefined) {
                    card.theme[key] = defaultTheme[key];
                }
            });
        }

        // Ensure frontCardImage exists (empty string if not present)
        if (card.frontCardImage === undefined) {
            card.frontCardImage = '';
        }

        // Ensure background image properties exist
        if (card.hasBackgroundImage === undefined) {
            card.hasBackgroundImage = false;
        }
        if (card.backgroundImage === undefined) {
            card.backgroundImage = null;
        }
        if (card.contentOpacity === undefined) {
            card.contentOpacity = null;
        }

        // Ensure horizontal stats layout property exists
        if (card.hasHorizontalStatsLayout === undefined) {
            card.hasHorizontalStatsLayout = false;
        }

        // Ensure front image fills background property exists
        if (card.hasFrontImageFillsBackground === undefined) {
            card.hasFrontImageFillsBackground = false;
        }

        // Ensure back card properties exist
        if (card.backCardImage === undefined) {
            card.backCardImage = '';
        }
        if (card.backCardBgColor === undefined) {
            card.backCardBgColor = '#2c3e50';
        }

        // Ensure additional stats properties exist
        if (card.additionalStats === undefined) {
            card.additionalStats = '';
        }
        if (card.description === undefined) {
            card.description = '';
        }

        // Ensure image background color exists
        if (card.imageBgColor === undefined) {
            card.imageBgColor = '#2c3e50';
        }

        // Ensure timestamp exists
        if (card.timestamp === undefined) {
            card.timestamp = Date.now();
        }

        // Ensure template and layout have defaults
        if (!card.template) {
            card.template = 'dnd';
        }
        if (!card.layout) {
            card.layout = 'standard';
        }
    });

    console.log('All cards normalized with required properties');
}

// Save deck to IndexedDB
async function saveDeck() {
    try {
        console.log('Saving deck with', deck.length, 'cards');

        // Validate deck data before saving
        deck.forEach((card, index) => {
            if (!card || typeof card !== 'object') {
                console.error(`Invalid card at index ${index}:`, card);
            }
        });

        // Save to IndexedDB (much larger capacity than localStorage)
        await DeckDB.saveDeck(deck);
        console.log('Deck saved successfully to IndexedDB');

        // Also try to save to localStorage as backup (if it fits)
        try {
            const deckJSON = JSON.stringify(deck);
            localStorage.setItem('cardDeck', deckJSON);
            console.log('Deck also saved to localStorage');
        } catch (localStorageError) {
            // Ignore localStorage quota errors - IndexedDB is our primary storage now
            console.log('localStorage quota exceeded, using IndexedDB only:', localStorageError.message);
        }

        // Show auto-save notification
        showAutoSaveNotification();
    } catch (e) {
        // IndexedDB errors are rare but handle them gracefully
        console.error('Failed to save deck:', e);
        console.error('Deck data:', deck);
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

    // Get current theme settings from UI controls (not CSS variables)
    const currentTheme = getCurrentTheme();

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
        hasHorizontalStatsLayout: cardPreview.classList.contains('horizontal-stats'),
        hasFrontImageFillsBackground: cardPreview.classList.contains('front-image-fills-background'),
        backgroundImage: window.cardBackgroundImageData
            ? `url('${window.cardBackgroundImageData}')`
            : null,
        contentOpacity: cardPreview.classList.contains('image-as-background')
            ? (root.style.getPropertyValue('--content-opacity') || '0.85')
            : null,
        backCardImage: window.backCardImageData || '',
        backCardBgColor: document.getElementById('backCardBgColor').value || '#2c3e50',
        // Save additional content for back card
        additionalStats: document.getElementById('additionalStats')?.value || '',
        description: document.getElementById('description')?.value || '',
        // Save front card image for back card mirroring
        frontCardImage: document.getElementById('previewImage')?.src || '',
        // Save image panel background color
        imageBgColor: document.getElementById('imageBgColor')?.value || '#2c3e50'
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
    cardLayoutSelect.value = cardData.layout || 'three-column';

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
        const currentPreviewImage = document.getElementById('previewImage');
        if (currentPreviewImage) {
            currentPreviewImage.src = cardData.frontCardImage;
            currentPreviewImage.style.display = 'block';
        }
        document.querySelector('input[name="imageSource"][value="url"]').checked = true;
    }

    // Restore back card image if present
    if (cardData.backCardImage) {
        window.backCardImageData = cardData.backCardImage;
    }

    // Restore image panel background color
    if (cardData.imageBgColor) {
        const imageBgColorInput = document.getElementById('imageBgColor');
        if (imageBgColorInput) {
            imageBgColorInput.value = cardData.imageBgColor;
            cardPreview.style.setProperty('--card-image-bg-color', cardData.imageBgColor);
        }
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

        // Handle content opacity setting
        const contentOpacityInput = document.getElementById('contentOpacity');
        if (contentOpacityInput) {
            contentOpacityInput.value = cardData.theme.contentOpacity || 0.85;
        }
    }

    // Update the preview
    updatePreview();

    // Restore background image styling if it was saved
    if (cardData.hasBackgroundImage && cardData.backgroundImage) {
        const card = document.getElementById('cardPreview');
        const root = document.documentElement;
        card.classList.add('image-as-background');
        root.style.setProperty('--card-background-image', cardData.backgroundImage);
        if (cardData.contentOpacity) {
            root.style.setProperty('--content-opacity', cardData.contentOpacity);
        }

        // Restore the background image data for future saves
        // Extract the data URL from the url() wrapper
        const match = cardData.backgroundImage.match(/url\(['"]?(.+?)['"]?\)/);
        if (match && match[1]) {
            window.cardBackgroundImageData = match[1];
        }
    } else {
        // Clear background image if not present
        window.cardBackgroundImageData = null;
        const card = document.getElementById('cardPreview');
        if (card) {
            card.classList.remove('image-as-background');
        }
    }

    // Restore horizontal stats layout if it was saved
    if (cardData.hasHorizontalStatsLayout) {
        const useHorizontalStatsLayoutCheckbox = document.getElementById('useHorizontalStatsLayout');
        if (useHorizontalStatsLayoutCheckbox) {
            useHorizontalStatsLayoutCheckbox.checked = true;
        }
        applyHorizontalStatsLayout(true);
    } else {
        const useHorizontalStatsLayoutCheckbox = document.getElementById('useHorizontalStatsLayout');
        if (useHorizontalStatsLayoutCheckbox) {
            useHorizontalStatsLayoutCheckbox.checked = false;
        }
        applyHorizontalStatsLayout(false);
    }

    // Restore front image fills background if it was saved
    if (cardData.hasFrontImageFillsBackground) {
        const imageFillsBackgroundCheckbox = document.getElementById('imageFillsBackground');
        if (imageFillsBackgroundCheckbox) {
            imageFillsBackgroundCheckbox.checked = true;
        }
        const card = document.getElementById('cardPreview');
        if (card) {
            card.classList.add('front-image-fills-background');
        }
    } else {
        const imageFillsBackgroundCheckbox = document.getElementById('imageFillsBackground');
        if (imageFillsBackgroundCheckbox) {
            imageFillsBackgroundCheckbox.checked = false;
        }
        const card = document.getElementById('cardPreview');
        if (card) {
            card.classList.remove('front-image-fills-background');
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

            // Apply theme if it was saved with the card
            if (cardData.theme) {
                applyThemeToElement(cardDiv, cardData.theme);
            }

            // Add click handler to load card into editor
            cardDiv.addEventListener('click', () => {
                loadCardIntoEditor(cardData);
            });

            // Apply background image styling if it was saved (for old "image-as-background" feature)
            if (cardData.hasBackgroundImage && cardData.backgroundImage) {
                cardDiv.classList.add('image-as-background');
                cardDiv.style.setProperty('--card-background-image', cardData.backgroundImage);
                cardDiv.style.setProperty('--content-opacity', cardData.contentOpacity || '0.85');
                cardDiv.style.background = 'none';
            }

            // Apply horizontal stats layout if it was saved
            if (cardData.hasHorizontalStatsLayout) {
                cardDiv.classList.add('horizontal-stats');
            }

            // Apply front image fills background if it was saved
            if (cardData.hasFrontImageFillsBackground) {
                cardDiv.classList.add('front-image-fills-background');
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

            // Normalize imported cards to ensure they have all required properties
            console.log('Normalizing imported cards...');
            normalizeImportedCards();

            // Save the imported deck to IndexedDB so it persists after refresh
            console.log('Saving imported deck to IndexedDB...');
            await saveDeck();

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

            // Apply theme if it was saved with the card
            if (cardData.theme) {
                applyThemeToElement(tempCard, cardData.theme);
            }

            // Apply background image styling if it was saved (for old "image-as-background" feature)
            if (cardData.hasBackgroundImage && cardData.backgroundImage) {
                tempCard.classList.add('image-as-background');
                tempCard.style.setProperty('--card-background-image', cardData.backgroundImage);
                tempCard.style.setProperty('--content-opacity', cardData.contentOpacity || '0.85');
            }

            // Apply horizontal stats layout if it was saved
            if (cardData.hasHorizontalStatsLayout) {
                tempCard.classList.add('horizontal-stats');
            }

            // Apply front image fills background if it was saved
            if (cardData.hasFrontImageFillsBackground) {
                tempCard.classList.add('front-image-fills-background');
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
    const templateId = cardData.template;

    if (templateId === 'creature') {
        // Get spell combat from form fields
        const spellCombat = cardData.formFields?.spellCombat || '';

        // Get spell slots from form fields
        const spellSlots = cardData.formFields?.spellSlots || '';

        // Get key cantrips from form fields
        const keyCantrips = cardData.formFields?.keyCantrips || '';

        // Get domain spells from form fields
        const domainSpells = cardData.formFields?.domainSpells || '';

        // Get prepared spells from form fields
        const preparedSpells = cardData.formFields?.preparedSpells || '';

        return `
            <div class="card-content trifold-content">
                <div class="trifold-header">
                    <h2>${name}</h2>
                </div>

                ${spellCombat ? `
                <div class="trifold-section">
                    <div class="trifold-section-title">SPELL COMBAT</div>
                    <div class="divider"></div>
                    <div class="trifold-text-tiny">${spellCombat}</div>
                </div>
                ` : ''}

                ${spellSlots ? `
                <div class="trifold-section">
                    <div class="trifold-section-title">SPELL SLOTS</div>
                    <div class="divider"></div>
                    <div class="trifold-text-tiny">${spellSlots}</div>
                </div>
                ` : ''}

                ${keyCantrips ? `
                <div class="trifold-section">
                    <div class="trifold-section-title">KEY CANTRIPS</div>
                    <div class="divider"></div>
                    <div class="trifold-text-tiny">${keyCantrips}</div>
                </div>
                ` : ''}

                ${domainSpells ? `
                <div class="trifold-section">
                    <div class="trifold-section-title">DOMAIN SPELLS (always prep)</div>
                    <div class="divider"></div>
                    <div class="trifold-text-tiny">${domainSpells}</div>
                </div>
                ` : ''}

                ${preparedSpells ? `
                <div class="trifold-section">
                    <div class="trifold-section-title">PREPARED SPELLS</div>
                    <div class="divider"></div>
                    <div class="trifold-text-tiny">${preparedSpells}</div>
                </div>
                ` : ''}
            </div>
        `;
    }

    // Fallback for other templates
    return `
        <div class="card-content trifold-content">
            <div class="trifold-header">
                <h2>Panel 2</h2>
            </div>
            <p>Additional information</p>
        </div>
    `;
}

// Generate three-column panel HTML for printing (back panel 2)
function generatePrintThreeColumnBack2(cardData) {
    const name = cardData.name || 'Card Name';
    const templateId = cardData.template;

    if (templateId === 'creature') {
        // Get data from form fields
        const classFeaturesText = cardData.formFields?.classFeatures || '';
        const equipmentText = cardData.formFields?.equipment || '';
        const passivePerception = cardData.formFields?.passivePerception || '';

        // Format class features
        const classFeatures = classFeaturesText;

        // Format equipment
        const equipment = equipmentText;

        return `
            <div class="card-content trifold-content">
                <div class="trifold-header">
                    <h2>${name}</h2>
                </div>

                ${classFeatures ? `
                <div class="trifold-section">
                    <div class="trifold-section-title">CLASS FEATURES</div>
                    <div class="divider"></div>
                    <div class="trifold-text-tiny">${classFeatures}</div>
                </div>
                ` : ''}

                ${equipment ? `
                <div class="trifold-section">
                    <div class="trifold-section-title">EQUIPMENT</div>
                    <div class="divider"></div>
                    <div class="trifold-text-tiny">${equipment}</div>
                </div>
                ` : ''}

            </div>
        `;
    }

    // Fallback for other templates
    return `
        <div class="card-content trifold-content">
            <div class="trifold-header">
                <h2>Panel 3</h2>
            </div>
            <p>Description</p>
        </div>
    `;
}

// Generate three-column panel HTML for printing (back panel 3)
function generatePrintThreeColumnBack3(cardData) {
    const name = cardData.name || 'Card Name';
    const templateId = cardData.template;
    const descriptionText = cardData.formFields?.description || '';

    if (templateId === 'creature') {
        // Get data from form fields
        const additionalStatsText = cardData.formFields?.additionalStats || '';

        // Format additional stats
        const additionalStats = additionalStatsText;

        // Format description
        const description = descriptionText;

        return `
            <div class="card-content trifold-content">
                <div class="trifold-header">
                    <h2>${name}</h2>
                </div>

                ${additionalStats ? `
                <div class="trifold-section">
                    <div class="trifold-section-title">ADDITIONAL STATS</div>
                    <div class="divider"></div>
                    <div class="trifold-text-tiny">${additionalStats}</div>
                </div>
                ` : ''}

                ${description ? `
                <div class="trifold-section">
                    <div class="trifold-section-title">DESCRIPTION</div>
                    <div class="divider"></div>
                    <div class="trifold-text-tiny">${description}</div>
                </div>
                ` : ''}

            </div>
        `;
    }

    // All other templates show description on Panel 4
    return `
        <div class="card-content trifold-content">
            <div class="trifold-header">
                <h2>${name}</h2>
            </div>

            ${descriptionText ? `
            <div class="trifold-section">
                <div class="trifold-section-title">DESCRIPTION</div>
                <div class="divider"></div>
                <div class="trifold-text-normal">${descriptionText}</div>
            </div>
            ` : ''}
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

    // Fixed layout: 2 cards per landscape sheet
    const cardsPerPage = 2;
    const gridLayout = 'layout-1x2'; // 1 row x 2 columns

    // Process 4-panel cards (front + 3 panels) using card preview layout - 2 cards per page
    const cardsPerFourPanelPage = 2;
    const totalFourPanelPages = Math.ceil(threeColumnCards.length / cardsPerFourPanelPage);

    for (let page = 0; page < totalFourPanelPages; page++) {
        const printPage = document.createElement('div');
        printPage.className = 'print-page print-page-card-preview';

        const startIdx = page * cardsPerFourPanelPage;
        const endIdx = Math.min(startIdx + cardsPerFourPanelPage, threeColumnCards.length);

        // Process up to 2 cards on this page
        for (let i = startIdx; i < endIdx; i++) {
            const card = threeColumnCards[i];

            // Create cards display container (like the main editor preview)
            const cardsDisplay = document.createElement('div');
            cardsDisplay.className = 'cards-display three-column';

            // Generate the 4 panels for this card: front panel + 3 back panels
            const panels = [
                { html: card.html, isFront: true }, // Panel 1 - Front (image + basic stats)
                { html: generatePrintThreeColumnBack1(card), isFront: false }, // Panel 2 - Spells
                { html: generatePrintThreeColumnBack2(card), isFront: false }, // Panel 3 - Features & Equipment
                { html: generatePrintThreeColumnBack3(card), isFront: false }  // Panel 4 - Stats & Description
            ];

            // Create all 4 panels for this card
            panels.forEach((panel, index) => {
                const cardDiv = document.createElement('div');
                if (index === 0) {
                    cardDiv.className = 'card card-front';
                } else {
                    cardDiv.className = 'card card-front trifold-panel';
                }
                cardDiv.innerHTML = panel.html;

                // Restore the front card image if it was saved (only for front panel)
                if (index === 0 && card.frontCardImage) {
                    const imgElement = cardDiv.querySelector('#previewImage');
                    if (imgElement) {
                        imgElement.src = card.frontCardImage;
                    }
                }

                // Apply theme if it was saved with the card
                if (card.theme) {
                    applyThemeToElement(cardDiv, card.theme);
                }

                // Apply background image styling if it was saved (only for front panel)
                if (index === 0 && card.hasBackgroundImage && card.backgroundImage) {
                    cardDiv.classList.add('image-as-background');
                    cardDiv.style.setProperty('--card-background-image', card.backgroundImage);
                    cardDiv.style.setProperty('--content-opacity', card.contentOpacity || '0.85');
                    cardDiv.style.background = 'none';
                }

                // Apply horizontal stats layout if it was saved
                if (card.hasHorizontalStatsLayout) {
                    cardDiv.classList.add('horizontal-stats');
                }

                // Apply front image fills background if it was saved (only for front panel)
                if (index === 0 && card.hasFrontImageFillsBackground) {
                    cardDiv.classList.add('front-image-fills-background');
                }

                cardsDisplay.appendChild(cardDiv);
            });

            printPage.appendChild(cardsDisplay);
        }

        printContent.appendChild(printPage);
    }

    // Process regular cards
    const totalPages = Math.ceil(regularCards.length / cardsPerPage);

    // Generate front pages for regular cards
    for (let page = 0; page < totalPages; page++) {
        const printPage = document.createElement('div');
        printPage.className = `print-page ${gridLayout}`;

        const startIdx = page * cardsPerPage;
        const endIdx = Math.min(startIdx + cardsPerPage, regularCards.length);

        for (let i = startIdx; i < endIdx; i++) {
            const printCard = document.createElement('div');
            printCard.className = 'print-card';

            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.innerHTML = regularCards[i].html;

            // Restore the front card image if it was saved
            if (regularCards[i].frontCardImage) {
                const imgElement = cardDiv.querySelector('#previewImage');
                if (imgElement) {
                    imgElement.src = regularCards[i].frontCardImage;
                }
            }

            // Apply theme if it was saved with the card
            if (regularCards[i].theme) {
                applyThemeToElement(cardDiv, regularCards[i].theme);
            }

            // Apply background image styling if it was saved
            if (regularCards[i].hasBackgroundImage && regularCards[i].backgroundImage) {
                cardDiv.classList.add('image-as-background');
                cardDiv.style.setProperty('--card-background-image', regularCards[i].backgroundImage);
                cardDiv.style.setProperty('--content-opacity', regularCards[i].contentOpacity || '0.85');
                cardDiv.style.background = 'none';
            }

            // Apply horizontal stats layout if it was saved
            if (regularCards[i].hasHorizontalStatsLayout) {
                cardDiv.classList.add('horizontal-stats');
            }

            // Apply front image fills background if it was saved
            if (regularCards[i].hasFrontImageFillsBackground) {
                cardDiv.classList.add('front-image-fills-background');
            }

            printCard.appendChild(cardDiv);
            printPage.appendChild(printCard);
        }

        printContent.appendChild(printPage);
    }

    // Generate back pages with matching placement (only for regular cards)
    for (let page = 0; page < totalPages; page++) {
        const printPage = document.createElement('div');
        printPage.className = `print-page ${gridLayout}`;

        const startIdx = page * cardsPerPage;
        const endIdx = Math.min(startIdx + cardsPerPage, regularCards.length);

        for (let i = startIdx; i < endIdx; i++) {
            const printCard = document.createElement('div');
            printCard.className = 'print-card';

            const backCardDiv = document.createElement('div');
            backCardDiv.className = 'card card-back';

            // Apply theme if it was saved with the card
            if (regularCards[i].theme) {
                applyThemeToElement(backCardDiv, regularCards[i].theme);
            }

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
            // Standard back card with just the image (matches updateBackCard function)
            const imgElement = document.createElement('img');
            imgElement.alt = 'Back Card Design';

            // First check if user uploaded a custom back card image
            if (backImage) {
                imgElement.src = backImage;
            }
            // Otherwise leave it empty (default back card)

            backCardContent.appendChild(imgElement);

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

// Predefined Theme Templates
const themePresets = {
    'classic-fantasy': {
        name: 'Classic Fantasy',
        description: 'Traditional parchment style with medieval aesthetics',
        fontFamily: "'Georgia', serif",
        cardNameSize: 2.4,
        cardHeaderSize: 1.2,
        cardDescriptionSize: 1.1,
        cardStatLabelSize: 1.2,
        cardAbilityNameSize: 1.1,
        cardAbilityValueSize: 1.0,
        cardImageHeight: 240,
        cardImageFit: 'cover',
        cardImagePosition: 'center',
        sectionSpacing: 12,
        cardBgColor: '#f9f6f0',
        cardBorderColor: '#8b4513',
        cardTextColor: '#333333',
        cardLabelColor: '#8b4513',
        cardNameColor: '#f4e4c1',
        useImageAsBackground: false,
        contentOpacity: 0.85,
        backCardImage: '',
        backCardBgColor: '#2c3e50'
    },
    'modern-clean': {
        name: 'Modern Clean',
        description: 'Minimalist design with clean lines and modern typography',
        fontFamily: "'Helvetica', 'Arial', sans-serif",
        cardNameSize: 2.6,
        cardHeaderSize: 1.3,
        cardDescriptionSize: 1.2,
        cardStatLabelSize: 1.2,
        cardAbilityNameSize: 1.15,
        cardAbilityValueSize: 1.05,
        cardImageHeight: 280,
        cardImageFit: 'cover',
        cardImagePosition: 'center',
        sectionSpacing: 16,
        cardBgColor: '#ffffff',
        cardBorderColor: '#e0e0e0',
        cardTextColor: '#2c3e50',
        cardLabelColor: '#5a6c7d',
        cardNameColor: '#2c3e50',
        useImageAsBackground: false,
        contentOpacity: 0.85,
        backCardImage: '',
        backCardBgColor: '#f8f9fa'
    },
    'dark-mode': {
        name: 'Dark Mode',
        description: 'High contrast dark theme for low-light environments',
        fontFamily: "'Georgia', serif",
        cardNameSize: 2.5,
        cardHeaderSize: 1.25,
        cardDescriptionSize: 1.15,
        cardStatLabelSize: 1.2,
        cardAbilityNameSize: 1.1,
        cardAbilityValueSize: 1.05,
        cardImageHeight: 250,
        cardImageFit: 'cover',
        cardImagePosition: 'center',
        sectionSpacing: 14,
        cardBgColor: '#1a1a1a',
        cardBorderColor: '#4a5568',
        cardTextColor: '#e2e8f0',
        cardLabelColor: '#a0aec0',
        cardNameColor: '#ffd700',
        useImageAsBackground: false,
        contentOpacity: 0.85,
        backCardImage: '',
        backCardBgColor: '#0f0f0f'
    },
    'minimalist': {
        name: 'Minimalist',
        description: 'Ultra-clean design with maximum readability',
        fontFamily: "'Palatino', 'Times New Roman', serif",
        cardNameSize: 2.2,
        cardHeaderSize: 1.15,
        cardDescriptionSize: 1.05,
        cardStatLabelSize: 1.1,
        cardAbilityNameSize: 1.0,
        cardAbilityValueSize: 0.95,
        cardImageHeight: 220,
        cardImageFit: 'cover',
        cardImagePosition: 'center',
        sectionSpacing: 18,
        cardBgColor: '#fafafa',
        cardBorderColor: '#d1d1d1',
        cardTextColor: '#1a1a1a',
        cardLabelColor: '#666666',
        cardNameColor: '#1a1a1a',
        useImageAsBackground: false,
        contentOpacity: 0.85,
        backCardImage: '',
        backCardBgColor: '#f0f0f0'
    },
    'vintage': {
        name: 'Vintage',
        description: 'Aged paper with sepia tones and antique aesthetic',
        fontFamily: "'Garamond', 'Times New Roman', serif",
        cardNameSize: 2.5,
        cardHeaderSize: 1.25,
        cardDescriptionSize: 1.15,
        cardStatLabelSize: 1.25,
        cardAbilityNameSize: 1.1,
        cardAbilityValueSize: 1.05,
        cardImageHeight: 240,
        cardImageFit: 'cover',
        cardImagePosition: 'center',
        sectionSpacing: 12,
        cardBgColor: '#f4e8d0',
        cardBorderColor: '#6b4423',
        cardTextColor: '#3d2817',
        cardLabelColor: '#8b6f47',
        cardNameColor: '#f4e8d0',
        useImageAsBackground: false,
        contentOpacity: 0.85,
        backCardImage: '',
        backCardBgColor: '#3d2817'
    },
    'steampunk': {
        name: 'Steampunk',
        description: 'Industrial Victorian aesthetic with bronze and copper tones',
        fontFamily: "'Courier New', 'Courier', monospace",
        cardNameSize: 2.3,
        cardHeaderSize: 1.2,
        cardDescriptionSize: 1.1,
        cardStatLabelSize: 1.15,
        cardAbilityNameSize: 1.05,
        cardAbilityValueSize: 1.0,
        cardImageHeight: 260,
        cardImageFit: 'cover',
        cardImagePosition: 'center',
        sectionSpacing: 14,
        cardBgColor: '#c9b99b',
        cardBorderColor: '#8b5a00',
        cardTextColor: '#2c1810',
        cardLabelColor: '#704214',
        cardNameColor: '#ffd700',
        useImageAsBackground: false,
        contentOpacity: 0.85,
        backCardImage: '',
        backCardBgColor: '#4a3728'
    },
    'custom': {
        name: 'Custom',
        description: 'Fully customizable theme - start from any template',
        fontFamily: "'Georgia', serif",
        cardNameSize: 2.4,
        cardHeaderSize: 1.2,
        cardDescriptionSize: 1.1,
        cardStatLabelSize: 1.2,
        cardAbilityNameSize: 1.1,
        cardAbilityValueSize: 1.0,
        cardImageHeight: 240,
        cardImageFit: 'cover',
        cardImagePosition: 'center',
        sectionSpacing: 12,
        cardBgColor: '#f9f6f0',
        cardBorderColor: '#8b4513',
        cardTextColor: '#333333',
        cardLabelColor: '#8b4513',
        cardNameColor: '#f4e4c1',
        useImageAsBackground: false,
        contentOpacity: 0.85,
        backCardImage: '',
        backCardBgColor: '#2c3e50'
    }
};

// Default theme settings (Classic Fantasy)
const defaultTheme = themePresets['classic-fantasy'];

// Apply theme to CSS variables
function applyTheme(theme) {
    const root = document.documentElement;

    // Font families
    root.style.setProperty('--card-font-family', theme.fontFamily);
    root.style.setProperty('--card-name-font-family', theme.fontFamily);
    root.style.setProperty('--card-header-font-family', theme.fontFamily);
    root.style.setProperty('--card-content-font-family', theme.fontFamily);

    // Font sizes
    root.style.setProperty('--card-name-size', theme.cardNameSize + 'em');
    root.style.setProperty('--card-header-size', theme.cardHeaderSize + 'em');
    root.style.setProperty('--card-description-size', theme.cardDescriptionSize + 'em');
    root.style.setProperty('--card-stat-label-size', theme.cardStatLabelSize + 'em');
    root.style.setProperty('--card-stat-value-size', (theme.cardStatValueSize || theme.cardStatLabelSize) + 'em');
    root.style.setProperty('--card-ability-name-size', (theme.cardAbilityNameSize || 1.1) + 'em');
    root.style.setProperty('--card-ability-value-size', (theme.cardAbilityValueSize || 1.0) + 'em');

    // Line heights
    root.style.setProperty('--card-name-line-height', theme.cardNameLineHeight || 1.2);
    root.style.setProperty('--card-header-line-height', theme.cardHeaderLineHeight || 1.2);
    root.style.setProperty('--card-stat-line-height', theme.cardStatLineHeight || 1.3);
    root.style.setProperty('--card-description-line-height', theme.cardDescriptionLineHeight || 1.5);

    // Section sizes and spacing
    root.style.setProperty('--card-image-height', theme.cardImageHeight + 'px');
    root.style.setProperty('--section-spacing', theme.sectionSpacing + 'px');
    root.style.setProperty('--stat-row-spacing', (theme.statRowSpacing !== undefined ? theme.statRowSpacing : 6) + 'px');
    root.style.setProperty('--ability-grid-gap', (theme.abilityGridGap !== undefined ? theme.abilityGridGap : 8) + 'px');

    // Image display
    root.style.setProperty('--card-image-fit', theme.cardImageFit || 'cover');
    root.style.setProperty('--card-image-position', theme.cardImagePosition || 'center');
    root.style.setProperty('--card-image-bg-color', theme.imageBgColor || '#2c3e50');

    // Padding and border
    const paddingV = theme.cardContentPaddingV !== undefined ? theme.cardContentPaddingV : 16;
    const paddingH = theme.cardContentPaddingH !== undefined ? theme.cardContentPaddingH : 20;
    root.style.setProperty('--card-content-padding', `${paddingV}px ${paddingH}px`);
    root.style.setProperty('--card-border-radius', (theme.cardBorderRadius !== undefined ? theme.cardBorderRadius : 8) + 'px');

    // Colors
    root.style.setProperty('--card-bg-color', theme.cardBgColor);
    root.style.setProperty('--card-border-color', theme.cardBorderColor);
    root.style.setProperty('--card-text-color', theme.cardTextColor);
    root.style.setProperty('--card-label-color', theme.cardLabelColor);
    root.style.setProperty('--card-header-color', theme.cardHeaderColor || theme.cardLabelColor);
    root.style.setProperty('--card-name-color', theme.cardNameColor);
    root.style.setProperty('--divider-color', theme.dividerColor || '#c0a080');
    root.style.setProperty('--content-opacity', theme.contentOpacity !== undefined ? theme.contentOpacity : 0.85);
    root.style.setProperty('--back-card-bg-color', theme.backCardBgColor || '#2c3e50');

    // Note: Background images are now handled separately via the dedicated background image upload
    // The image-as-background class and CSS variable are managed by the backgroundImageUpload handler
}

// Apply theme CSS variables to a specific card element
function applyThemeToElement(element, theme) {
    if (!element || !theme) return;

    // Font families
    element.style.setProperty('--card-font-family', theme.fontFamily);
    element.style.setProperty('--card-name-font-family', theme.fontFamily);
    element.style.setProperty('--card-header-font-family', theme.fontFamily);
    element.style.setProperty('--card-content-font-family', theme.fontFamily);

    // Font sizes
    element.style.setProperty('--card-name-size', theme.cardNameSize + 'em');
    element.style.setProperty('--card-header-size', theme.cardHeaderSize + 'em');
    element.style.setProperty('--card-description-size', theme.cardDescriptionSize + 'em');
    element.style.setProperty('--card-stat-label-size', theme.cardStatLabelSize + 'em');
    element.style.setProperty('--card-stat-value-size', (theme.cardStatValueSize || theme.cardStatLabelSize) + 'em');
    element.style.setProperty('--card-ability-name-size', (theme.cardAbilityNameSize || 1.1) + 'em');
    element.style.setProperty('--card-ability-value-size', (theme.cardAbilityValueSize || 1.0) + 'em');

    // Line heights
    element.style.setProperty('--card-name-line-height', theme.cardNameLineHeight || 1.2);
    element.style.setProperty('--card-header-line-height', theme.cardHeaderLineHeight || 1.2);
    element.style.setProperty('--card-stat-line-height', theme.cardStatLineHeight || 1.3);
    element.style.setProperty('--card-description-line-height', theme.cardDescriptionLineHeight || 1.5);

    // Section sizes and spacing
    element.style.setProperty('--card-image-height', theme.cardImageHeight + 'px');
    element.style.setProperty('--section-spacing', theme.sectionSpacing + 'px');
    element.style.setProperty('--stat-row-spacing', (theme.statRowSpacing !== undefined ? theme.statRowSpacing : 6) + 'px');
    element.style.setProperty('--ability-grid-gap', (theme.abilityGridGap !== undefined ? theme.abilityGridGap : 8) + 'px');

    // Image display
    element.style.setProperty('--card-image-fit', theme.cardImageFit || 'cover');
    element.style.setProperty('--card-image-position', theme.cardImagePosition || 'center');
    element.style.setProperty('--card-image-bg-color', theme.imageBgColor || '#2c3e50');

    // Padding and border
    const paddingV = theme.cardContentPaddingV !== undefined ? theme.cardContentPaddingV : 16;
    const paddingH = theme.cardContentPaddingH !== undefined ? theme.cardContentPaddingH : 20;
    element.style.setProperty('--card-content-padding', `${paddingV}px ${paddingH}px`);
    element.style.setProperty('--card-border-radius', (theme.cardBorderRadius !== undefined ? theme.cardBorderRadius : 8) + 'px');

    // Colors
    element.style.setProperty('--card-bg-color', theme.cardBgColor);
    element.style.setProperty('--card-border-color', theme.cardBorderColor);
    element.style.setProperty('--card-text-color', theme.cardTextColor);
    element.style.setProperty('--card-label-color', theme.cardLabelColor);
    element.style.setProperty('--card-header-color', theme.cardHeaderColor || theme.cardLabelColor);
    element.style.setProperty('--card-name-color', theme.cardNameColor);
    element.style.setProperty('--divider-color', theme.dividerColor || '#c0a080');
    element.style.setProperty('--content-opacity', theme.contentOpacity !== undefined ? theme.contentOpacity : 0.85);
    element.style.setProperty('--back-card-bg-color', theme.backCardBgColor || '#2c3e50');
}

// Apply horizontal stats layout
function applyHorizontalStatsLayout(enabled) {
    const cardPreview = document.getElementById('cardPreview');
    const trifoldPanels = document.querySelectorAll('.trifold-panel');

    if (enabled) {
        if (cardPreview) {
            cardPreview.classList.add('horizontal-stats');
        }
        trifoldPanels.forEach(panel => {
            panel.classList.add('horizontal-stats');
        });
    } else {
        if (cardPreview) {
            cardPreview.classList.remove('horizontal-stats');
        }
        trifoldPanels.forEach(panel => {
            panel.classList.remove('horizontal-stats');
        });
    }
}

// Update UI controls to reflect current theme
function updateCustomizationUI(theme) {
    // Font family
    document.getElementById('fontFamily').value = theme.fontFamily;

    // Font sizes
    document.getElementById('cardNameSize').value = theme.cardNameSize;
    document.getElementById('cardNameSizeValue').textContent = theme.cardNameSize;

    document.getElementById('cardHeaderSize').value = theme.cardHeaderSize;
    document.getElementById('cardHeaderSizeValue').textContent = theme.cardHeaderSize;

    document.getElementById('cardDescriptionSize').value = theme.cardDescriptionSize;
    document.getElementById('cardDescriptionSizeValue').textContent = theme.cardDescriptionSize;

    document.getElementById('cardStatLabelSize').value = theme.cardStatLabelSize;
    document.getElementById('cardStatLabelSizeValue').textContent = theme.cardStatLabelSize;

    const statValueSize = theme.cardStatValueSize || theme.cardStatLabelSize || 1.2;
    const statValueElement = document.getElementById('cardStatValueSize');
    const statValueValueElement = document.getElementById('cardStatValueSizeValue');
    if (statValueElement) {
        statValueElement.value = statValueSize;
        if (statValueValueElement) statValueValueElement.textContent = statValueSize;
    }

    document.getElementById('cardAbilityNameSize').value = theme.cardAbilityNameSize || 1.1;
    document.getElementById('cardAbilityNameSizeValue').textContent = theme.cardAbilityNameSize || 1.1;

    document.getElementById('cardAbilityValueSize').value = theme.cardAbilityValueSize || 1.0;
    document.getElementById('cardAbilityValueSizeValue').textContent = theme.cardAbilityValueSize || 1.0;

    // Line heights
    const nameLineHeight = theme.cardNameLineHeight || 1.2;
    const nameLineHeightElement = document.getElementById('cardNameLineHeight');
    const nameLineHeightValueElement = document.getElementById('cardNameLineHeightValue');
    if (nameLineHeightElement) {
        nameLineHeightElement.value = nameLineHeight;
        if (nameLineHeightValueElement) nameLineHeightValueElement.textContent = nameLineHeight;
    }

    const headerLineHeight = theme.cardHeaderLineHeight || 1.2;
    const headerLineHeightElement = document.getElementById('cardHeaderLineHeight');
    const headerLineHeightValueElement = document.getElementById('cardHeaderLineHeightValue');
    if (headerLineHeightElement) {
        headerLineHeightElement.value = headerLineHeight;
        if (headerLineHeightValueElement) headerLineHeightValueElement.textContent = headerLineHeight;
    }

    const statLineHeight = theme.cardStatLineHeight || 1.3;
    const statLineHeightElement = document.getElementById('cardStatLineHeight');
    const statLineHeightValueElement = document.getElementById('cardStatLineHeightValue');
    if (statLineHeightElement) {
        statLineHeightElement.value = statLineHeight;
        if (statLineHeightValueElement) statLineHeightValueElement.textContent = statLineHeight;
    }

    const descLineHeight = theme.cardDescriptionLineHeight || 1.5;
    const descLineHeightElement = document.getElementById('cardDescriptionLineHeight');
    const descLineHeightValueElement = document.getElementById('cardDescriptionLineHeightValue');
    if (descLineHeightElement) {
        descLineHeightElement.value = descLineHeight;
        if (descLineHeightValueElement) descLineHeightValueElement.textContent = descLineHeight;
    }

    // Section sizes
    document.getElementById('cardImageHeight').value = theme.cardImageHeight;
    document.getElementById('cardImageHeightValue').textContent = theme.cardImageHeight;

    // Image display
    const imageFitElement = document.getElementById('cardImageFit');
    if (imageFitElement) {
        imageFitElement.value = theme.cardImageFit || 'cover';
    }

    const imagePositionElement = document.getElementById('cardImagePosition');
    if (imagePositionElement) {
        imagePositionElement.value = theme.cardImagePosition || 'center';
    }

    const imageFillsBackgroundElement = document.getElementById('imageFillsBackground');
    if (imageFillsBackgroundElement) {
        imageFillsBackgroundElement.checked = theme.imageFillsBackground || false;
        // Apply or remove the class based on the theme
        const cardPreview = document.getElementById('cardPreview');
        if (cardPreview) {
            if (theme.imageFillsBackground) {
                cardPreview.classList.add('front-image-fills-background');
            } else {
                cardPreview.classList.remove('front-image-fills-background');
            }
        }
    }

    const imageBgColorElement = document.getElementById('imageBgColor');
    if (imageBgColorElement) {
        imageBgColorElement.value = theme.imageBgColor || '#2c3e50';
    }

    document.getElementById('sectionSpacing').value = theme.sectionSpacing;
    document.getElementById('sectionSpacingValue').textContent = theme.sectionSpacing;

    const statRowSpacing = theme.statRowSpacing !== undefined ? theme.statRowSpacing : 6;
    const statRowSpacingElement = document.getElementById('statRowSpacing');
    const statRowSpacingValueElement = document.getElementById('statRowSpacingValue');
    if (statRowSpacingElement) {
        statRowSpacingElement.value = statRowSpacing;
        if (statRowSpacingValueElement) statRowSpacingValueElement.textContent = statRowSpacing;
    }

    const abilityGridGap = theme.abilityGridGap !== undefined ? theme.abilityGridGap : 8;
    const abilityGridGapElement = document.getElementById('abilityGridGap');
    const abilityGridGapValueElement = document.getElementById('abilityGridGapValue');
    if (abilityGridGapElement) {
        abilityGridGapElement.value = abilityGridGap;
        if (abilityGridGapValueElement) abilityGridGapValueElement.textContent = abilityGridGap;
    }

    // Padding and border
    const paddingV = theme.cardContentPaddingV !== undefined ? theme.cardContentPaddingV : 16;
    const paddingVElement = document.getElementById('cardContentPaddingV');
    const paddingVValueElement = document.getElementById('cardContentPaddingVValue');
    if (paddingVElement) {
        paddingVElement.value = paddingV;
        if (paddingVValueElement) paddingVValueElement.textContent = paddingV;
    }

    const paddingH = theme.cardContentPaddingH !== undefined ? theme.cardContentPaddingH : 20;
    const paddingHElement = document.getElementById('cardContentPaddingH');
    const paddingHValueElement = document.getElementById('cardContentPaddingHValue');
    if (paddingHElement) {
        paddingHElement.value = paddingH;
        if (paddingHValueElement) paddingHValueElement.textContent = paddingH;
    }

    const borderRadius = theme.cardBorderRadius !== undefined ? theme.cardBorderRadius : 8;
    const borderRadiusElement = document.getElementById('cardBorderRadius');
    const borderRadiusValueElement = document.getElementById('cardBorderRadiusValue');
    if (borderRadiusElement) {
        borderRadiusElement.value = borderRadius;
        if (borderRadiusValueElement) borderRadiusValueElement.textContent = borderRadius;
    }

    // Colors
    document.getElementById('cardBgColor').value = theme.cardBgColor;
    document.getElementById('cardBorderColor').value = theme.cardBorderColor;
    document.getElementById('cardTextColor').value = theme.cardTextColor;
    document.getElementById('cardLabelColor').value = theme.cardLabelColor;

    const headerColorElement = document.getElementById('cardHeaderColor');
    if (headerColorElement) {
        headerColorElement.value = theme.cardHeaderColor || theme.cardLabelColor || '#8b4513';
    }

    document.getElementById('cardNameColor').value = theme.cardNameColor;

    const dividerColorElement = document.getElementById('dividerColor');
    if (dividerColorElement) {
        dividerColorElement.value = theme.dividerColor || '#c0a080';
    }

    // Background
    // Background image setting (removed - now handled by dedicated upload)
    const opacity = theme.contentOpacity !== undefined ? theme.contentOpacity : 0.85;
    document.getElementById('contentOpacity').value = opacity;
    document.getElementById('contentOpacityValue').textContent = opacity.toFixed(2);
    document.getElementById('backCardBgColor').value = theme.backCardBgColor || '#2c3e50';
}

// Get current theme from UI controls
function getCurrentTheme() {
    // Font settings
    const fontFamilyElement = document.getElementById('fontFamily');

    // Font sizes
    const cardNameSizeElement = document.getElementById('cardNameSize');
    const cardHeaderSizeElement = document.getElementById('cardHeaderSize');
    const cardDescriptionSizeElement = document.getElementById('cardDescriptionSize');
    const cardStatLabelSizeElement = document.getElementById('cardStatLabelSize');
    const cardStatValueSizeElement = document.getElementById('cardStatValueSize');
    const cardAbilityNameSizeElement = document.getElementById('cardAbilityNameSize');
    const cardAbilityValueSizeElement = document.getElementById('cardAbilityValueSize');

    // Line heights
    const cardNameLineHeightElement = document.getElementById('cardNameLineHeight');
    const cardHeaderLineHeightElement = document.getElementById('cardHeaderLineHeight');
    const cardStatLineHeightElement = document.getElementById('cardStatLineHeight');
    const cardDescriptionLineHeightElement = document.getElementById('cardDescriptionLineHeight');

    // Sizes and spacing
    const cardImageHeightElement = document.getElementById('cardImageHeight');
    const sectionSpacingElement = document.getElementById('sectionSpacing');
    const statRowSpacingElement = document.getElementById('statRowSpacing');
    const abilityGridGapElement = document.getElementById('abilityGridGap');

    // Image display
    const cardImageFitElement = document.getElementById('cardImageFit');
    const cardImagePositionElement = document.getElementById('cardImagePosition');
    const imageFillsBackgroundElement = document.getElementById('imageFillsBackground');

    // Padding and border
    const cardContentPaddingVElement = document.getElementById('cardContentPaddingV');
    const cardContentPaddingHElement = document.getElementById('cardContentPaddingH');
    const cardBorderRadiusElement = document.getElementById('cardBorderRadius');

    // Colors
    const cardBgColorElement = document.getElementById('cardBgColor');
    const cardBorderColorElement = document.getElementById('cardBorderColor');
    const cardTextColorElement = document.getElementById('cardTextColor');
    const cardLabelColorElement = document.getElementById('cardLabelColor');
    const cardHeaderColorElement = document.getElementById('cardHeaderColor');
    const cardNameColorElement = document.getElementById('cardNameColor');
    const dividerColorElement = document.getElementById('dividerColor');

    // Background (no longer using useImageAsBackground checkbox)
    const contentOpacityElement = document.getElementById('contentOpacity');
    const backCardBgColorElement = document.getElementById('backCardBgColor');

    return {
        // Font settings
        fontFamily: fontFamilyElement ? fontFamilyElement.value : 'Georgia, serif',

        // Font sizes
        cardNameSize: cardNameSizeElement ? parseFloat(cardNameSizeElement.value) : 2.4,
        cardHeaderSize: cardHeaderSizeElement ? parseFloat(cardHeaderSizeElement.value) : 1.2,
        cardDescriptionSize: cardDescriptionSizeElement ? parseFloat(cardDescriptionSizeElement.value) : 1.1,
        cardStatLabelSize: cardStatLabelSizeElement ? parseFloat(cardStatLabelSizeElement.value) : 1.2,
        cardStatValueSize: cardStatValueSizeElement ? parseFloat(cardStatValueSizeElement.value) : 1.2,
        cardAbilityNameSize: cardAbilityNameSizeElement ? parseFloat(cardAbilityNameSizeElement.value) : 1.1,
        cardAbilityValueSize: cardAbilityValueSizeElement ? parseFloat(cardAbilityValueSizeElement.value) : 1.0,

        // Line heights
        cardNameLineHeight: cardNameLineHeightElement ? parseFloat(cardNameLineHeightElement.value) : 1.2,
        cardHeaderLineHeight: cardHeaderLineHeightElement ? parseFloat(cardHeaderLineHeightElement.value) : 1.2,
        cardStatLineHeight: cardStatLineHeightElement ? parseFloat(cardStatLineHeightElement.value) : 1.3,
        cardDescriptionLineHeight: cardDescriptionLineHeightElement ? parseFloat(cardDescriptionLineHeightElement.value) : 1.5,

        // Sizes and spacing
        cardImageHeight: cardImageHeightElement ? parseInt(cardImageHeightElement.value) : 240,
        sectionSpacing: sectionSpacingElement ? parseInt(sectionSpacingElement.value) : 12,
        statRowSpacing: statRowSpacingElement ? parseInt(statRowSpacingElement.value) : 6,
        abilityGridGap: abilityGridGapElement ? parseInt(abilityGridGapElement.value) : 8,

        // Image display
        cardImageFit: cardImageFitElement ? cardImageFitElement.value : 'cover',
        cardImagePosition: cardImagePositionElement ? cardImagePositionElement.value : 'center',
        imageFillsBackground: imageFillsBackgroundElement ? imageFillsBackgroundElement.checked : false,
        imageBgColor: imageBgColorInput ? imageBgColorInput.value : '#2c3e50',

        // Padding and border
        cardContentPaddingV: cardContentPaddingVElement ? parseInt(cardContentPaddingVElement.value) : 16,
        cardContentPaddingH: cardContentPaddingHElement ? parseInt(cardContentPaddingHElement.value) : 20,
        cardBorderRadius: cardBorderRadiusElement ? parseInt(cardBorderRadiusElement.value) : 8,

        // Colors
        cardBgColor: cardBgColorElement ? cardBgColorElement.value : '#f9f6f0',
        cardBorderColor: cardBorderColorElement ? cardBorderColorElement.value : '#8b4513',
        cardTextColor: cardTextColorElement ? cardTextColorElement.value : '#333333',
        cardLabelColor: cardLabelColorElement ? cardLabelColorElement.value : '#8b4513',
        cardHeaderColor: cardHeaderColorElement ? cardHeaderColorElement.value : '#8b4513',
        cardNameColor: cardNameColorElement ? cardNameColorElement.value : '#f4e4c1',
        dividerColor: dividerColorElement ? dividerColorElement.value : '#c0a080',

        // Background (no longer using useImageAsBackground - handled separately)
        contentOpacity: contentOpacityElement ? parseFloat(contentOpacityElement.value) : 0.85,
        backCardImage: window.backCardImageData || '',
        backCardBgColor: backCardBgColorElement ? backCardBgColorElement.value : '#2c3e50'
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

    // Reset theme selector to classic-fantasy
    const themeSelect = document.getElementById('themePresetSelector');
    if (themeSelect) {
        themeSelect.value = 'classic-fantasy';
    }

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

// Load a preset theme
function loadPresetTheme(presetId) {
    const preset = themePresets[presetId];
    if (!preset) {
        console.error('Theme preset not found:', presetId);
        return;
    }

    // Create a copy of the preset to avoid modifying the original
    const theme = { ...preset };

    applyTheme(theme);
    updateCustomizationUI(theme);

    // Update theme description
    updateThemeDescription(presetId);
}

// Update theme description display
function updateThemeDescription(presetId) {
    const preset = themePresets[presetId];
    const descElement = document.getElementById('themeDescription');
    if (descElement && preset) {
        descElement.textContent = preset.description;
        descElement.style.display = 'block';
    }
}

// Save a custom theme with a name
function saveCustomTheme() {
    const themeName = prompt('Enter a name for your custom theme:');
    if (!themeName || themeName.trim() === '') {
        return;
    }

    const theme = getCurrentTheme();

    // Get existing custom themes
    let customThemes = JSON.parse(localStorage.getItem('customCardThemes') || '{}');

    // Save the custom theme
    customThemes[themeName] = {
        name: themeName,
        description: 'Custom theme',
        ...theme
    };

    localStorage.setItem('customCardThemes', JSON.stringify(customThemes));

    // Refresh the theme selector
    populateThemeSelector();

    // Show confirmation
    alert(`Custom theme "${themeName}" saved successfully!`);
}

// Delete a custom theme
function deleteCustomTheme(themeName) {
    if (!confirm(`Are you sure you want to delete the custom theme "${themeName}"?`)) {
        return;
    }

    let customThemes = JSON.parse(localStorage.getItem('customCardThemes') || '{}');
    delete customThemes[themeName];
    localStorage.setItem('customCardThemes', JSON.stringify(customThemes));

    // Refresh the theme selector
    populateThemeSelector();

    // Reset to default if the deleted theme was active
    const themeSelect = document.getElementById('themePresetSelector');
    if (themeSelect && themeSelect.value === 'custom-' + themeName) {
        themeSelect.value = 'classic-fantasy';
        loadPresetTheme('classic-fantasy');
    }
}

// Populate theme selector with presets and custom themes
function populateThemeSelector() {
    const selector = document.getElementById('themePresetSelector');
    if (!selector) return;

    // Clear existing options
    selector.innerHTML = '';

    // Add preset themes
    const presetGroup = document.createElement('optgroup');
    presetGroup.label = 'Preset Themes';

    for (const [id, preset] of Object.entries(themePresets)) {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = preset.name;
        presetGroup.appendChild(option);
    }

    selector.appendChild(presetGroup);

    // Add custom themes
    const customThemes = JSON.parse(localStorage.getItem('customCardThemes') || '{}');

    if (Object.keys(customThemes).length > 0) {
        const customGroup = document.createElement('optgroup');
        customGroup.label = 'Custom Themes';

        for (const [themeName, theme] of Object.entries(customThemes)) {
            const option = document.createElement('option');
            option.value = 'custom-' + themeName;
            option.textContent = themeName;
            customGroup.appendChild(option);
        }

        selector.appendChild(customGroup);
    }
}

// Load a custom theme by name
function loadCustomTheme(themeName) {
    const customThemes = JSON.parse(localStorage.getItem('customCardThemes') || '{}');
    const theme = customThemes[themeName];

    if (!theme) {
        console.error('Custom theme not found:', themeName);
        return;
    }

    applyTheme(theme);
    updateCustomizationUI(theme);

    const descElement = document.getElementById('themeDescription');
    if (descElement) {
        descElement.textContent = theme.description || 'Custom theme';
        descElement.style.display = 'block';
    }
}

// Manage custom themes (show list with delete options)
function manageCustomThemes() {
    const customThemes = JSON.parse(localStorage.getItem('customCardThemes') || '{}');

    if (Object.keys(customThemes).length === 0) {
        alert('No custom themes saved yet.');
        return;
    }

    const modal = document.getElementById('customThemeModal');
    const themeList = document.getElementById('customThemeList');

    if (!modal || !themeList) {
        console.error('Theme management UI not found');
        return;
    }

    // Clear existing list
    themeList.innerHTML = '';

    // Populate list
    for (const [themeName, theme] of Object.entries(customThemes)) {
        const item = document.createElement('div');
        item.className = 'custom-theme-item';
        item.innerHTML = `
            <span class="theme-name">${themeName}</span>
            <div class="theme-actions">
                <button onclick="loadCustomTheme('${themeName}'); document.getElementById('themePresetSelector').value = 'custom-${themeName}'; closeCustomThemeModal();" class="btn-small">Load</button>
                <button onclick="deleteCustomTheme('${themeName}');" class="btn-small btn-danger">Delete</button>
            </div>
        `;
        themeList.appendChild(item);
    }

    // Show modal
    modal.style.display = 'block';
}

// Close custom theme management modal
function closeCustomThemeModal() {
    const modal = document.getElementById('customThemeModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Initialize customization system
function initCustomization() {
    // Populate theme selector with presets and custom themes
    populateThemeSelector();

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

    // Theme preset selector
    const themeSelector = document.getElementById('themePresetSelector');
    if (themeSelector) {
        themeSelector.addEventListener('change', function() {
            const selectedValue = this.value;

            if (selectedValue.startsWith('custom-')) {
                // Load custom theme
                const themeName = selectedValue.substring(7); // Remove 'custom-' prefix
                loadCustomTheme(themeName);
            } else {
                // Load preset theme
                loadPresetTheme(selectedValue);
            }
        });
    }

    // Toggle customization panel
    const toggleCustomizationElement = document.getElementById('toggleCustomization');
    if (toggleCustomizationElement) {
        toggleCustomizationElement.addEventListener('click', function() {
            const panel = document.getElementById('customizationPanel');
            if (panel) {
                if (panel.style.display === 'none') {
                    panel.style.display = 'block';
                    this.textContent = 'Hide';
                } else {
                    panel.style.display = 'none';
                    this.textContent = 'Show';
                }
            }
        });
    }

    // Font family change
    const fontFamilyElement = document.getElementById('fontFamily');
    if (fontFamilyElement) {
        fontFamilyElement.addEventListener('change', function() {
            const theme = getCurrentTheme();
            applyTheme(theme);
            updatePreview(); // Force preview update to apply theme changes
        });
    }

    // Font size sliders
    const fontSizeInputs = [
        { id: 'cardNameSize', valueId: 'cardNameSizeValue' },
        { id: 'cardHeaderSize', valueId: 'cardHeaderSizeValue' },
        { id: 'cardDescriptionSize', valueId: 'cardDescriptionSizeValue' },
        { id: 'cardStatLabelSize', valueId: 'cardStatLabelSizeValue' },
        { id: 'cardStatValueSize', valueId: 'cardStatValueSizeValue' },
        { id: 'cardAbilityNameSize', valueId: 'cardAbilityNameSizeValue' },
        { id: 'cardAbilityValueSize', valueId: 'cardAbilityValueSizeValue' }
    ];

    fontSizeInputs.forEach(input => {
        const element = document.getElementById(input.id);
        if (element) {
            element.addEventListener('input', function() {
                const valueElement = document.getElementById(input.valueId);
                if (valueElement) {
                    valueElement.textContent = this.value;
                }
                const theme = getCurrentTheme();
                applyTheme(theme);
                updatePreview(); // Force preview update to apply theme changes
            });
        }
    });

    // Line height sliders
    const lineHeightInputs = [
        { id: 'cardNameLineHeight', valueId: 'cardNameLineHeightValue' },
        { id: 'cardHeaderLineHeight', valueId: 'cardHeaderLineHeightValue' },
        { id: 'cardStatLineHeight', valueId: 'cardStatLineHeightValue' },
        { id: 'cardDescriptionLineHeight', valueId: 'cardDescriptionLineHeightValue' }
    ];

    lineHeightInputs.forEach(input => {
        const element = document.getElementById(input.id);
        if (element) {
            element.addEventListener('input', function() {
                const valueElement = document.getElementById(input.valueId);
                if (valueElement) {
                    valueElement.textContent = this.value;
                }
                const theme = getCurrentTheme();
                applyTheme(theme);
                updatePreview(); // Force preview update to apply theme changes
            });
        }
    });

    // Section size sliders
    const sectionSizeInputs = [
        { id: 'cardImageHeight', valueId: 'cardImageHeightValue' },
        { id: 'sectionSpacing', valueId: 'sectionSpacingValue' },
        { id: 'statRowSpacing', valueId: 'statRowSpacingValue' },
        { id: 'abilityGridGap', valueId: 'abilityGridGapValue' }
    ];

    sectionSizeInputs.forEach(input => {
        const element = document.getElementById(input.id);
        if (element) {
            element.addEventListener('input', function() {
                const valueElement = document.getElementById(input.valueId);
                if (valueElement) {
                    valueElement.textContent = this.value;
                }
                const theme = getCurrentTheme();
                applyTheme(theme);
                updatePreview(); // Force preview update to apply theme changes
            });
        }
    });

    // Padding and border sliders
    const paddingBorderInputs = [
        { id: 'cardContentPaddingV', valueId: 'cardContentPaddingVValue' },
        { id: 'cardContentPaddingH', valueId: 'cardContentPaddingHValue' },
        { id: 'cardBorderRadius', valueId: 'cardBorderRadiusValue' }
    ];

    paddingBorderInputs.forEach(input => {
        const element = document.getElementById(input.id);
        if (element) {
            element.addEventListener('input', function() {
                const valueElement = document.getElementById(input.valueId);
                if (valueElement) {
                    valueElement.textContent = this.value;
                }
                const theme = getCurrentTheme();
                applyTheme(theme);
                updatePreview(); // Force preview update to apply theme changes
            });
        }
    });

    // Color pickers
    const colorInputs = ['cardBgColor', 'cardBorderColor', 'cardTextColor', 'cardLabelColor', 'cardHeaderColor', 'cardNameColor', 'dividerColor', 'backCardBgColor'];
    colorInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', function() {
                const theme = getCurrentTheme();
                applyTheme(theme);
                updatePreview(); // Force preview update to apply theme changes
            });
        }
    });

    // Background image upload
    const backgroundImageUploadElement = document.getElementById('backgroundImageUpload');
    if (backgroundImageUploadElement) {
        backgroundImageUploadElement.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const card = document.getElementById('cardPreview');
                    const root = document.documentElement;

                    if (card) {
                        // Set the background image
                        const imageUrl = `url('${event.target.result}')`;
                        root.style.setProperty('--card-background-image', imageUrl);
                        card.classList.add('image-as-background');

                        // Store the background image data
                        window.cardBackgroundImageData = event.target.result;

                        console.log('Background image applied successfully');
                        console.log('CSS Variable set to:', imageUrl.substring(0, 50) + '...');
                        console.log('Card has class:', card.classList.contains('image-as-background'));
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Clear background image button
    const clearBackgroundImageBtn = document.getElementById('clearBackgroundImageBtn');
    if (clearBackgroundImageBtn) {
        clearBackgroundImageBtn.addEventListener('click', function() {
            const card = document.getElementById('cardPreview');
            const root = document.documentElement;

            if (card) {
                card.classList.remove('image-as-background');
                root.style.setProperty('--card-background-image', 'none');
                window.cardBackgroundImageData = null;

                // Clear the file input
                const uploadInput = document.getElementById('backgroundImageUpload');
                if (uploadInput) {
                    uploadInput.value = '';
                }

                console.log('Background image cleared');
            }
        });
    }

    // Horizontal stats layout checkbox
    const useHorizontalStatsLayoutElement = document.getElementById('useHorizontalStatsLayout');
    if (useHorizontalStatsLayoutElement) {
        useHorizontalStatsLayoutElement.addEventListener('change', function() {
            applyHorizontalStatsLayout(this.checked);
            // Save preference to localStorage
            localStorage.setItem('useHorizontalStatsLayout', this.checked);
        });
    }

    // Load saved horizontal stats layout preference
    const savedHorizontalStatsLayout = localStorage.getItem('useHorizontalStatsLayout');
    if (savedHorizontalStatsLayout === 'true' && useHorizontalStatsLayoutElement) {
        useHorizontalStatsLayoutElement.checked = true;
        applyHorizontalStatsLayout(true);
    }

    // Content opacity slider
    const contentOpacityElement = document.getElementById('contentOpacity');
    if (contentOpacityElement) {
        contentOpacityElement.addEventListener('input', function() {
            const valueElement = document.getElementById('contentOpacityValue');
            if (valueElement) {
                valueElement.textContent = parseFloat(this.value).toFixed(2);
            }
            const theme = getCurrentTheme();
            applyTheme(theme);
            updatePreview(); // Force preview update to apply theme changes
        });
    }

    // Image fit control
    const cardImageFitElement = document.getElementById('cardImageFit');
    if (cardImageFitElement) {
        cardImageFitElement.addEventListener('change', function() {
            const theme = getCurrentTheme();
            applyTheme(theme);
            updatePreview(); // Force preview update to apply theme changes
        });
    }

    // Image position control
    const cardImagePositionElement = document.getElementById('cardImagePosition');
    if (cardImagePositionElement) {
        cardImagePositionElement.addEventListener('change', function() {
            const theme = getCurrentTheme();
            applyTheme(theme);
            updatePreview(); // Force preview update to apply theme changes
        });
    }

    // Auto-fit image button
    const autoFitImageBtn = document.getElementById('autoFitImageBtn');
    if (autoFitImageBtn) {
        autoFitImageBtn.addEventListener('click', function() {
            const img = document.getElementById('previewImage');
            if (img && img.src && img.naturalWidth && img.naturalHeight) {
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

                    // Set image fit to 'contain' for best results
                    const imageFit = document.getElementById('cardImageFit');
                    if (imageFit) {
                        imageFit.value = 'contain';
                    }

                    // Apply the theme with new height and fit
                    const theme = getCurrentTheme();
                    applyTheme(theme);
                    updatePreview();
                }
            } else {
                alert('Please upload an image first before using auto-fit.');
            }
        });
    }

    // Image fills background checkbox
    const imageFillsBackgroundElement = document.getElementById('imageFillsBackground');
    if (imageFillsBackgroundElement) {
        imageFillsBackgroundElement.addEventListener('change', function() {
            const cardPreview = document.getElementById('cardPreview');
            if (cardPreview) {
                if (this.checked) {
                    cardPreview.classList.add('front-image-fills-background');
                } else {
                    cardPreview.classList.remove('front-image-fills-background');
                }
                updatePreview();
            }
        });
    }

    // Back card image upload
    const backCardImageUploadElement = document.getElementById('backCardImageUpload');
    if (backCardImageUploadElement) {
        backCardImageUploadElement.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    window.backCardImageData = event.target.result;
                    const previewImage = document.getElementById('backCardPreviewImage');
                    if (previewImage) {
                        previewImage.src = event.target.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Theme management buttons
    const saveThemeBtn = document.getElementById('saveThemeBtn');
    if (saveThemeBtn) {
        saveThemeBtn.addEventListener('click', saveTheme);
    }

    const loadThemeBtn = document.getElementById('loadThemeBtn');
    if (loadThemeBtn) {
        loadThemeBtn.addEventListener('click', loadTheme);
    }

    const resetThemeBtn = document.getElementById('resetThemeBtn');
    if (resetThemeBtn) {
        resetThemeBtn.addEventListener('click', resetTheme);
    }
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

        // Build spell combat section if character has spell stats
        let spellCombatHTML = '';
        if (card.formFields.spellCombat) {
            spellCombatHTML = `
            <div class="party-spell-combat">
                <div class="party-stat">
                    <span class="stat-label">Spell Combat:</span>
                    <span class="stat-value">${card.formFields.spellCombat}</span>
                </div>
            </div>`;
        }

        // Build spell slots section if character has spell slots
        let spellSlotsHTML = '';
        if (card.formFields.spellSlots) {
            spellSlotsHTML = `
            <div class="party-spell-slots">
                <h4>Spell Slots</h4>
                <div class="spell-slots-content">${card.formFields.spellSlots}</div>
            </div>`;
        }

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

            <div class="party-combat-stats">
                <div class="party-stat">
                    <span class="stat-label">Initiative:</span>
                    <span class="stat-value">${card.formFields.initiative || '--'}</span>
                </div>
                <div class="party-stat">
                    <span class="stat-label">Proficiency:</span>
                    <span class="stat-value">${card.formFields.proficiency || '--'}</span>
                </div>
                <div class="party-stat">
                    <span class="stat-label">Passive Perception:</span>
                    <span class="stat-value">${card.formFields.passivePerception || '--'}</span>
                </div>
            </div>

            ${card.formFields.savingThrows ? `
            <div class="party-saving-throws">
                <h4>Saving Throws</h4>
                <div class="saving-throws-content">${card.formFields.savingThrows}</div>
            </div>` : ''}

            ${spellCombatHTML}

            ${spellSlotsHTML}

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

    // Extract additional stats from card data (will be empty for enemies without these fields)
    const speed = isEnemy ? (combatant.speed || '--') : (cardData.formFields.speed || '--');
    const str = isEnemy ? (combatant.str || '--') : (cardData.formFields.str || '--');
    const dex = isEnemy ? (combatant.dex || '--') : (cardData.formFields.dex || '--');
    const con = isEnemy ? (combatant.con || '--') : (cardData.formFields.con || '--');
    const int = isEnemy ? (combatant.int || '--') : (cardData.formFields.int || '--');
    const wis = isEnemy ? (combatant.wis || '--') : (cardData.formFields.wis || '--');
    const cha = isEnemy ? (combatant.cha || '--') : (cardData.formFields.cha || '--');
    const proficiency = isEnemy ? (combatant.proficiency || '--') : (cardData.formFields.proficiency || '--');
    const passivePerception = isEnemy ? (combatant.passivePerception || '--') : (cardData.formFields.passivePerception || '--');
    const savingThrows = isEnemy ? combatant.savingThrows : cardData.formFields.savingThrows;
    const spellCombat = isEnemy ? combatant.spellCombat : cardData.formFields.spellCombat;
    const spellSlots = isEnemy ? combatant.spellSlots : cardData.formFields.spellSlots;

    // Build spell combat section if character has spell stats
    let spellCombatHTML = '';
    if (spellCombat) {
        spellCombatHTML = `
        <div class="combatant-spell-combat">
            <div class="combatant-stat">
                <span class="stat-label">Spell Combat:</span>
                <span class="stat-value">${spellCombat}</span>
            </div>
        </div>`;
    }

    // Build spell slots section if character has spell slots
    let spellSlotsHTML = '';
    if (spellSlots) {
        spellSlotsHTML = `
        <div class="combatant-spell-slots">
            <h5>Spell Slots</h5>
            <div class="spell-slots-content">${spellSlots}</div>
        </div>`;
    }

    // Build saving throws section if character has saving throws
    let savingThrowsHTML = '';
    if (savingThrows) {
        savingThrowsHTML = `
        <div class="combatant-saving-throws">
            <h5>Saving Throws</h5>
            <div class="saving-throws-content">${savingThrows}</div>
        </div>`;
    }

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
            <span class="combatant-stat">Speed: ${speed}</span>
        </div>
        <div class="combatant-abilities">
            <div class="combatant-ability"><span>STR</span> ${str}</div>
            <div class="combatant-ability"><span>DEX</span> ${dex}</div>
            <div class="combatant-ability"><span>CON</span> ${con}</div>
            <div class="combatant-ability"><span>INT</span> ${int}</div>
            <div class="combatant-ability"><span>WIS</span> ${wis}</div>
            <div class="combatant-ability"><span>CHA</span> ${cha}</div>
        </div>
        <div class="combatant-combat-stats">
            <span class="combatant-stat">Initiative: <input type="number" class="initiative-input" value="${initiative}" data-id="${combatantId}" data-type="${type}"></span>
            <span class="combatant-stat">Proficiency: ${proficiency}</span>
            <span class="combatant-stat">Passive Perception: ${passivePerception}</span>
        </div>
        ${savingThrowsHTML}
        ${spellCombatHTML}
        ${spellSlotsHTML}
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
