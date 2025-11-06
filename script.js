// DOM Elements
const cardNameInput = document.getElementById('cardName');
const cardTypeInput = document.getElementById('cardType');
const cardSubtypeInput = document.getElementById('cardSubtype');
const imageUploadInput = document.getElementById('imageUpload');
const imageUrlInput = document.getElementById('imageUrl');
const loadImageBtn = document.getElementById('loadImageBtn');
const imageSourceRadios = document.getElementsByName('imageSource');

const acInput = document.getElementById('ac');
const hpInput = document.getElementById('hp');
const speedInput = document.getElementById('speed');

const strInput = document.getElementById('str');
const dexInput = document.getElementById('dex');
const conInput = document.getElementById('con');
const intInput = document.getElementById('int');
const wisInput = document.getElementById('wis');
const chaInput = document.getElementById('cha');

const additionalStatsInput = document.getElementById('additionalStats');
const abilitiesInput = document.getElementById('abilities');

const resetBtn = document.getElementById('resetBtn');
const exportBtn = document.getElementById('exportBtn');

// Preview Elements
const previewImage = document.getElementById('previewImage');
const previewName = document.getElementById('previewName');
const previewType = document.getElementById('previewType');
const previewSubtype = document.getElementById('previewSubtype');
const previewAC = document.getElementById('previewAC');
const previewHP = document.getElementById('previewHP');
const previewSpeed = document.getElementById('previewSpeed');
const previewStr = document.getElementById('previewStr');
const previewDex = document.getElementById('previewDex');
const previewCon = document.getElementById('previewCon');
const previewInt = document.getElementById('previewInt');
const previewWis = document.getElementById('previewWis');
const previewCha = document.getElementById('previewCha');
const previewAdditionalStats = document.getElementById('previewAdditionalStats');
const previewAbilities = document.getElementById('previewAbilities');

// Store default values for reset
const defaultValues = {
    cardName: cardNameInput.value,
    cardType: cardTypeInput.value,
    cardSubtype: cardSubtypeInput.value,
    ac: acInput.value,
    hp: hpInput.value,
    speed: speedInput.value,
    str: strInput.value,
    dex: dexInput.value,
    con: conInput.value,
    int: intInput.value,
    wis: wisInput.value,
    cha: chaInput.value,
    additionalStats: additionalStatsInput.value,
    abilities: abilitiesInput.value
};

// Update preview function
function updatePreview() {
    previewName.textContent = cardNameInput.value || 'Card Name';
    previewType.textContent = cardTypeInput.value || 'Type';
    previewSubtype.textContent = cardSubtypeInput.value || 'Subtype';

    previewAC.textContent = acInput.value || '-';
    previewHP.textContent = hpInput.value || '-';
    previewSpeed.textContent = speedInput.value || '-';

    previewStr.textContent = strInput.value || '-';
    previewDex.textContent = dexInput.value || '-';
    previewCon.textContent = conInput.value || '-';
    previewInt.textContent = intInput.value || '-';
    previewWis.textContent = wisInput.value || '-';
    previewCha.textContent = chaInput.value || '-';

    previewAdditionalStats.textContent = additionalStatsInput.value || '';
    previewAbilities.textContent = abilitiesInput.value || '';
}

// Image upload handler
imageUploadInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            previewImage.src = event.target.result;
            previewImage.style.display = 'block';
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
        previewImage.src = url;
        previewImage.style.display = 'block';
        previewImage.onerror = function() {
            alert('Failed to load image from URL. Please check the URL and try again.');
        };
    } else {
        alert('Please enter an image URL');
    }
});

// Add event listeners for live preview
cardNameInput.addEventListener('input', updatePreview);
cardTypeInput.addEventListener('input', updatePreview);
cardSubtypeInput.addEventListener('input', updatePreview);
acInput.addEventListener('input', updatePreview);
hpInput.addEventListener('input', updatePreview);
speedInput.addEventListener('input', updatePreview);
strInput.addEventListener('input', updatePreview);
dexInput.addEventListener('input', updatePreview);
conInput.addEventListener('input', updatePreview);
intInput.addEventListener('input', updatePreview);
wisInput.addEventListener('input', updatePreview);
chaInput.addEventListener('input', updatePreview);
additionalStatsInput.addEventListener('input', updatePreview);
abilitiesInput.addEventListener('input', updatePreview);

// Reset button handler
resetBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to reset all fields to default values?')) {
        cardNameInput.value = defaultValues.cardName;
        cardTypeInput.value = defaultValues.cardType;
        cardSubtypeInput.value = defaultValues.cardSubtype;
        acInput.value = defaultValues.ac;
        hpInput.value = defaultValues.hp;
        speedInput.value = defaultValues.speed;
        strInput.value = defaultValues.str;
        dexInput.value = defaultValues.dex;
        conInput.value = defaultValues.con;
        intInput.value = defaultValues.int;
        wisInput.value = defaultValues.wis;
        chaInput.value = defaultValues.cha;
        additionalStatsInput.value = defaultValues.additionalStats;
        abilitiesInput.value = defaultValues.abilities;

        // Reset image
        previewImage.src = '';
        imageUploadInput.value = '';
        imageUrlInput.value = '';

        updatePreview();
    }
});

// Export button handler - converts card to image
exportBtn.addEventListener('click', async function() {
    const cardElement = document.getElementById('cardPreview');

    try {
        // Use html2canvas library (we'll need to add this)
        // For now, let's create a simple download as HTML

        // Alternative: Create a downloadable PNG using html2canvas
        // We'll implement a simpler JSON export for now

        const cardData = {
            name: cardNameInput.value,
            type: cardTypeInput.value,
            subtype: cardSubtypeInput.value,
            image: previewImage.src,
            stats: {
                ac: acInput.value,
                hp: hpInput.value,
                speed: speedInput.value
            },
            abilityScores: {
                str: strInput.value,
                dex: dexInput.value,
                con: conInput.value,
                int: intInput.value,
                wis: wisInput.value,
                cha: chaInput.value
            },
            additionalStats: additionalStatsInput.value,
            abilities: abilitiesInput.value
        };

        // Try to use html2canvas if available
        if (typeof html2canvas !== 'undefined') {
            const canvas = await html2canvas(cardElement, {
                scale: 2,
                backgroundColor: '#f9f6f0',
                logging: false
            });

            canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `${cardNameInput.value.replace(/\s+/g, '_') || 'dnd_card'}.png`;
                link.href = url;
                link.click();
                URL.revokeObjectURL(url);
            });
        } else {
            // Fallback: Download as JSON
            const dataStr = JSON.stringify(cardData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.download = `${cardNameInput.value.replace(/\s+/g, '_') || 'dnd_card'}.json`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);

            alert('Card data exported as JSON. For PNG export, the html2canvas library is required.');
        }
    } catch (error) {
        console.error('Export failed:', error);
        alert('Export failed. Please try again.');
    }
});

// Initialize preview on page load
updatePreview();

// Print to PNG function (alternative method)
function printCardToPNG() {
    window.print();
}

// Add print styles for better PNG output
const style = document.createElement('style');
style.textContent = `
    @media print {
        body * {
            visibility: hidden;
        }
        #cardPreview, #cardPreview * {
            visibility: visible;
        }
        #cardPreview {
            position: absolute;
            left: 0;
            top: 0;
        }
    }
`;
document.head.appendChild(style);
