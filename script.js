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
    const val = element.value;
    
    const valueDisplay = document.getElementById('sliderValue');
    valueDisplay.innerText = val + "%";

    const percent = (val - element.min) / (element.max - element.min) * 100;
    
    const thumbWidth = 18; 
    valueDisplay.style.left = `calc(${percent}% + (${8 - percent * 0.15}px))`;


    element.style.background = `linear-gradient(to right, #4B89FF ${percent}%, #ffffffff ${percent}%)`;
}
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('dimmerSlider');
    if(slider) updateSlider(slider);
});

// Usage-Page
// Tab Function
//         function openTab(evt, tabNum) {
//             var i, tabcontent, control;

//             // Hide tabcontent
//             tabcontent = document.getElementsByClassName("tabcontent");
//             for (i = 0; i < tabcontent.length; i++) {
//                 tabcontent[i].style.display = "none";
//             }

//             // Remove class active
//             control = document.getElementsByClassName("control");
//             for (i = 0; i < control.length; i++) {
//                 control[i].classList.remove("active");
//             }

//             // Display: block tab Num
//             document.getElementById(tabNum).style.display = "block";

//             // Add class active
//             evt.currentTarget.classList.add("active");
// }

// Usage-Page 
// Button Active
function selectSpeed(btn) {

    const container = btn.parentElement;
    
    // Remove class 'active' 
    const buttons = container.getElementsByClassName("speed-btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }
    
    // Add class 'active' to click button
    btn.classList.add("active");
    
    // (Optional) display Console
    console.log("Selected:", btn.querySelector("p").innerText);
}

// Toogle clik on and off
function toggleSingle(btn) {
    // Swap class active
    btn.classList.toggle("active");
    
    if(btn.classList.contains("active")) {
        console.log("Status: ON");
    } else {
        console.log("Status: OFF");
    }
}

//Usage-Page
// Pop-Up when click
// ฟังก์ชันสำหรับเปิด/ปิด Pop-up (ใช้แทน openTab สำหรับปุ่ม Fan และ Swing)
function togglePopup(popupId, triggerBtn) {
    // 1. หา element ของ pop-up เป้าหมาย
    const targetPopup = document.getElementById(popupId);
    
    // 2. ตรวจสอบสถานะปัจจุบันว่าเปิดอยู่หรือไม่
    const isCurrentlyOpen = targetPopup.classList.contains('show');

    // 3. ปิด Pop-up ทั้งหมดก่อนเสมอ (เพื่อไม่ให้เปิดซ้อนกัน)
    const allPopups = document.querySelectorAll('.tabcontent.popup');
    allPopups.forEach(popup => {
        popup.classList.remove('show');
    });
    
    // 4. เอาสถานะ active ออกจากปุ่ม trigger ทั้งหมด
    const allTriggers = document.querySelectorAll('.popup-trigger');
    allTriggers.forEach(trigger => {
        trigger.classList.remove('active');
    });

    // 5. ถ้าเป้าหมายมันไม่ได้เปิดอยู่ ให้เปิดมัน และทำให้ปุ่มที่กดเป็น active
    if (!isCurrentlyOpen) {
        targetPopup.classList.add('show');
        triggerBtn.classList.add('active');
    } 
    // ถ้ามันเปิดอยู่แล้ว โค้ดในข้อ 3 ได้ทำการปิดมันไปแล้ว จึงไม่ต้องทำอะไรเพิ่ม (เป็นการ Toggle ปิด)
}

function selectSpeed(btn) {
    const container = btn.parentElement;
    const buttons = container.getElementsByClassName("speed-btn");
    // check active class"
    const isAlreadyActive = btn.classList.contains("active");

    // remove active and reset
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }
    if (!isAlreadyActive) {
        btn.classList.add("active");
    }
}
