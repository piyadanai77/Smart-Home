// Function to handle Navigation
function navigateTo(pageId) {
    // 1. Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // 2. Show the selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // 3. Update Bottom Navigation Active State
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        // Simple check based on onclick attribute text
        if (item.getAttribute('onclick').includes(pageId)) {
            item.classList.add('active');
        }
    });
}

// Function to handle AC Temperature
let currentTemp = 20;

function adjustTemp(change) {
    currentTemp += change;
    
    // Bounds checking (Example: Min 15, Max 30)
    if (currentTemp < 15) currentTemp = 15;
    if (currentTemp > 30) currentTemp = 30;

    // Update Display
    const tempDisplay = document.getElementById('temp-display');
    if (tempDisplay) {
        tempDisplay.innerText = currentTemp + "°C";
    }
}

// Optional: Add simple console log to buttons for interactivity feedback
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
        console.log('Card clicked');
    });
});

// Toggle Change Background-Color in Room-Page
// document.querySelectorAll('.room-card input[type="checkbox"]').forEach(toggle => {
//     toggle.addEventListener('change', () => {
//         const card = toggle.closest('.room-card'); // หา parent card
//         card.style.backgroundColor = toggle.checked ? '#3A81F7' : '#e0dfdf';
//     });
// });

document.querySelectorAll('.room-card input[type="checkbox"]').forEach(toggle => {
    toggle.addEventListener('change', () => {
        const card = toggle.closest('.room-card'); // หา parent card

        card.style.backgroundColor = toggle.checked ? '#3A81F7' : '#e0dfdf';

        const icon = card.querySelector('i');
        if (icon) {
            icon.style.color = toggle.checked ? '#ffffff' : '#282773';
        }

        const title = card.querySelector('h4');
        if (title) {
            title.style.color = toggle.checked ? '#ffffff' : '#282773';
        }
    });
});

// Card7-Slider
function updateSlider(element) {
    // 1. รับค่าปัจจุบัน
    const val = element.value;
    
    // 2. อัปเดตตัวเลขในกล่อง
    const valueDisplay = document.getElementById('sliderValue');
    valueDisplay.innerText = val + "%";

    // 3. คำนวณตำแหน่งซ้าย-ขวา ของตัวเลขให้ตรงกับปุ่ม
    // สูตร: (value - min) * 100 / (max - min)
    // เนื่องจาก min=0 max=100 สูตรจึงเหลือแค่ val เฉยๆ แต่ต้องชดเชยขนาดปุ่มนิดหน่อย
    const percent = (val - element.min) / (element.max - element.min) * 100;
    
    // ขยับกล่องตัวเลข (ใช้ calc เพื่อชดเชยความกว้างของปุ่ม Thumb ประมาณ 10-15px)
    // การคำนวณนี้ช่วยให้ตัวเลขไม่ตกขอบตอนอยู่ที่ 0% หรือ 100%
    const thumbWidth = 18; 
    valueDisplay.style.left = `calc(${percent}% + (${8 - percent * 0.15}px))`;

    // 4. สร้างสีพื้นหลัง (Progress Bar)
    // สีทางซ้าย (#4B89FF) -> สีทางขวา (#E0E0E0)
    element.style.background = `linear-gradient(to right, #4B89FF ${percent}%, #ffffffff ${percent}%)`;
}

// เรียกใช้ครั้งแรกตอนโหลดหน้าเว็บ เพื่อให้สีขึ้นทันที
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('dimmerSlider');
    if(slider) updateSlider(slider);
});