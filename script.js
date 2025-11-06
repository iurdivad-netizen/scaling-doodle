// Template Definitions
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
const cardNameInput = document.getElementById('cardName');
const cardTypeInput = document.getElementById('cardType');
const imageUploadInput = document.getElementById('imageUpload');
const imageUrlInput = document.getElementById('imageUrl');
const loadImageBtn = document.getElementById('loadImageBtn');
const imageSourceRadios = document.getElementsByName('imageSource');
const resetBtn = document.getElementById('resetBtn');
const exportBtn = document.getElementById('exportBtn');
const previewImage = document.getElementById('previewImage');
const cardPreview = document.getElementById('cardPreview');

// Current template
let currentTemplate = 'creature';

// Initialize
function init() {
    loadTemplate(currentTemplate);
    updatePreview();
    attachEventListeners();
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
    let previewHTML = '';

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

    cardPreview.innerHTML = previewHTML;

    // Reattach image if present
    const newPreviewImage = document.getElementById('previewImage');
    if (newPreviewImage && previewImage.src) {
        newPreviewImage.src = previewImage.src;
        newPreviewImage.style.display = 'block';
    }
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
                <div class="stat-row"><strong>Armor Class:</strong> ${ac}</div>
                <div class="stat-row"><strong>Hit Points:</strong> ${hp}</div>
                <div class="stat-row"><strong>Speed:</strong> ${speed}</div>
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
                <div class="stat-row"><strong>Casting Time:</strong> ${castingTime}</div>
                <div class="stat-row"><strong>Range:</strong> ${range}</div>
                <div class="stat-row"><strong>Components:</strong> ${components}</div>
                <div class="stat-row"><strong>Duration:</strong> ${duration}</div>
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

// Attach event listeners
function attachEventListeners() {
    // Template change
    cardTemplateSelect.addEventListener('change', function() {
        loadTemplate(this.value);
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
            }
        } else {
            alert('Please enter an image URL');
        }
    });

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
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
