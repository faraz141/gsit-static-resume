const buttons = document.querySelectorAll('.menu-btn');
const menuTray = document.getElementById('menu-tray');
const menuInfo = document.getElementById('menu-info');

let closeTimeout: number | null = null;

const menuContent = {
  about: `<h2>About Me</h2><p>As a dedicated front-end developer,<br/> I excel in building responsive web applications<br/> with expertise in JavaScript, TypeScript, React,<br/> HTML, CSS, Git, and Bootstrap. I focus on<br/> creating user-friendly designs and optimizing<br/> performance while ensuring cross-browser compatibility.<br/> Enthusiastic about solving complex problems and<br/> learning new technologies, I am committed to<br/> delivering high-quality code and contributing<br/> effectively to collaborative projects.</p>
`,
  skills: `
    <h2>Skils</h2>
    <ul>
      <li>JavaScript</li>
      <li>TypeScript</li>
      <li>React</li>
      <li>HTML</li>
      <li>CSS</li>
      <li>Git</li>
      <li>Bootstrap</li>
    </ul>
  `,
  education: `<h2>Education</h2><p>Bachelor  in Computer Science(ongoing)</p>
  <p>Intermediate in Pre-Engineering</p>
  <p>Diploma of Asossiate Enginering(ongoing)</p>`,
  contact: `<h2>Contact</h2><p>call: +92 312 8738672</p>
  <p>E-mail: alamfaraz141@gmail.com</p>
  `,
};

// Show tray when hovering over the button
buttons.forEach((button) => {
  button.addEventListener('mouseenter', (event) => {
    const menuType = button.getAttribute('data-menu');

    if (menuType && menuTray && menuInfo) {
      // Set the content of the tray
      menuInfo.innerHTML = menuContent[menuType as keyof typeof menuContent];

      // Get button's position relative to the viewport
      const buttonRect = (event.target as HTMLElement).getBoundingClientRect();

      // Calculate the position of the tray considering the scroll offset
      const topPosition = buttonRect.top + window.scrollY; // Add scroll offset for Y position
      const leftPosition = buttonRect.right + 30 + window.scrollX; // Add scroll offset for X position

      // Set the tray position relative to the button
      menuTray.style.top = `${topPosition}px`;
      menuTray.style.left = `${leftPosition}px`;

      // Cancel any scheduled close operation
      if (closeTimeout !== null) {
        clearTimeout(closeTimeout);
      }

      // Smoothly open the tray by adding the 'active' class
      menuTray.classList.add('active');
    }
  });
});

// Keep tray open while hovering over the tray
menuTray?.addEventListener('mouseenter', () => {
  if (closeTimeout !== null) {
    clearTimeout(closeTimeout);
  }
});

// Hide tray when leaving the button or the tray after a delay
const hideTray = () => {
  closeTimeout = window.setTimeout(() => {
    menuTray?.classList.remove('active');
  }, 500); // 3-second delay before hiding the tray
};

// Start hiding tray when leaving button or tray
buttons.forEach((button) => {
  button.addEventListener('mouseleave', hideTray);
});

menuTray?.addEventListener('mouseleave', hideTray);
