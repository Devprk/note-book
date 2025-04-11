document.addEventListener('DOMContentLoaded', function() {
  const svg = document.getElementById('svg');
  const notepad = document.getElementById('notepad');
  const mirror = document.getElementById('mirror');
  const watermark = document.getElementById('watermark');

  const colors = ['#FBDB4A', '#F3934A', '#EB547D', '#9F6AA7', '#5476B3', '#2BB19B', '#70B984'];
  let prevLength = 0;
  let firstWordTriggered = false;
  let spacePressedAfterFirstWord = false;

const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+','-', '=', '{', '}', '[', ']', '|', ':', ';', '"', "'", '<', '>', '?', '/', '~', '`', '€', '£', '¥', '©', '®', '™', '•', '•', '✓', '✗', '✔', '✖', '♥', '♦', '♣', '♠', '♪', '♫', '☼', '☽', '★', '☆', '☁', '☂', '☃', '☄', '✈', '✉', '✏', '✒', '✔', '✖', '✗', '✘', '✙', '✚', '✛', '✜', '✝', '✞', '✟', '✠', '✡', '✢', '✣', '✤', '✥', '✦', '✧', '★', '☆', '✩', '✪', '✫', '✬', '✭', '✮', '✯', '✰', '✱', '✲', '✳', '✴', '✵', '✶', '✷', '✸', '✹', '✺', '✻', '✼', '✽', '✾', '✿', '❀', '❁', '❂', '❃', '❄', '❅', '❆', '❇', '❈', '❉', '❊', '❋', '●', '◉', '◌', '◍', '◎', '●', '◐', '◑', '◒', '◓', '◔', '◕', '◖', '◗', '◘', '◙', '◚', '◛', '◜', '◝', '◞', '◟', '◠', '◡', '◢', '◣', '◤', '◥', '◦', '◧', '◨', '◩', '◪', '◫', '◬', '◭', '◮', '◯', '◰', '◱', '◲', '◳', '◴', '◵', '◶', '◷', '◸', '◹', '◺', '◻', '◼', '◽', '◾', '◽', '◿', '◺', '◻', '◼', '◽', '◾', '◿', '◺', '◻', '◼', '◽', '◾', '◿','₹', '₩', '₦', '₱', '₲', '₳', '₴', '₵', '₶', '₷', '₸', '₹', '₺', '₻', '₼', '₽', '₾', '₿'];

  // Create effect of colorful circles
  const createEffect = (x, y) => {
    for (let i = 0; i < 8; i++) {
      const circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      const size = Math.random() * 6 + 2;
      circ.setAttribute("r", size);
      circ.setAttribute("cx", x);
      circ.setAttribute("cy", y);
      circ.setAttribute("fill", colors[Math.floor(Math.random() * colors.length)]);
      svg.appendChild(circ);

      const angle = Math.random() * 2 * Math.PI;
      const radius = 30 + Math.random() * 40;
      const dx = Math.cos(angle) * radius;
      const dy = Math.sin(angle) * radius;

      gsap.to(circ, {
        duration: 0.6,
        x: dx,
        y: dy,
        opacity: 0,
        scale: 0.5,
        ease: "power1.out",
        onComplete: () => svg.removeChild(circ)
      });
    }
  };

  // Create heart rain animation
  function createHeartRain() {
    const totalHearts = 10; // Reduced for mobile performance

    for (let i = 0; i < totalHearts; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.innerText = '❤️';
      heart.style.left = `${Math.random() * (window.innerWidth - 30)}px`;
      heart.style.fontSize = `${15 + Math.random() * 15}px`;
      heart.style.animationDelay = `${Math.random() * 0.5}s`;
      document.body.appendChild(heart);

      heart.addEventListener('animationend', () => {
        heart.remove();
      });
    }
  }

  // Function to move the watermark randomly
  function moveWatermarkRandomly() {
    const padding = 30;
    const maxX = window.innerWidth - watermark.offsetWidth - padding;
    const maxY = window.innerHeight - watermark.offsetHeight - padding;
    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);

    watermark.style.left = `${newX}px`;
    watermark.style.top = `${newY}px`;
  }

  // Initial watermark position
  moveWatermarkRandomly();
  setInterval(moveWatermarkRandomly, 3000);

  // Create falling special characters effect
  function createFallingSpecials(char) {
    const count = 5; // Reduced for mobile performance
    for (let i = 0; i < count; i++) {
      const element = document.createElement('div');
      element.className = 'special-fall';
      element.innerText = char;
      element.style.left = `${Math.random() * window.innerWidth}px`;
      element.style.top = `-30px`;
      element.style.fontSize = `${14 + Math.random() * 15}px`;
      element.style.color = getRandomColor();
      document.body.appendChild(element);

      element.addEventListener('animationend', () => {
        element.remove();
      });
    }
  }

  // Helper to get random color
  function getRandomColor() {
    const colors = ['#ff4081', '#00e5ff', '#ffc107', '#7c4dff', '#4caf50', '#ff5722'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Detect special characters in the input field
  notepad.addEventListener('input', () => {
    const value = notepad.value;
    const lastChar = value[value.length - 1];
    const caret = notepad.selectionStart;

    if (specialChars.includes(lastChar)) {
      createFallingSpecials(lastChar);
    }

    // Trigger hearts only after typing the first word and pressing space
    if (!firstWordTriggered && value.trim().length > 0) {
      firstWordTriggered = true;
    }

    if (firstWordTriggered && !spacePressedAfterFirstWord && value[value.length - 1] === ' ') {
      spacePressedAfterFirstWord = true;
      createHeartRain();
    }

    // Trigger circle effect when typing
    if (value.length > prevLength) {
      const coords = getCaretCoordinates(notepad, caret);
      createEffect(coords.left, coords.top);
    }

    prevLength = value.length;

    // Thumbs up for full stop
    if (lastChar === '.') {
      createThumbsUp();
    }
  });

  // Get caret position for SVG circle effect
  function getCaretCoordinates(textarea, position) {
    const style = getComputedStyle(textarea);
    mirror.style.width = textarea.clientWidth + 'px';
    mirror.style.height = textarea.clientHeight + 'px';
    mirror.style.fontSize = style.fontSize;
    mirror.style.lineHeight = style.lineHeight;
    mirror.style.fontFamily = style.fontFamily;
    mirror.style.padding = style.padding;

    const before = textarea.value.slice(0, position);
    const after = textarea.value.slice(position);

    mirror.innerHTML = '';
    mirror.textContent = before;
    const span = document.createElement('span');
    span.textContent = after[0] || '.';
    mirror.appendChild(span);

    const rect = span.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top
    };
  }

  // Bomb explosion animation after pressing Enter
  function createBombExplosion() {
    const bomb = document.createElement('div');
    bomb.className = 'bomb';
    bomb.innerText = '💥';
    bomb.style.left = `${Math.random() * window.innerWidth}px`;
    bomb.style.top = `50%`;
    bomb.style.fontSize = `${30 + Math.random() * 30}px`;
    document.body.appendChild(bomb);

    bomb.addEventListener('animationend', () => {
      bomb.remove();
    });
  }

  // Show thumbs up when full stop is typed
  function createThumbsUp() {
    const thumbsUp = document.createElement('div');
    thumbsUp.className = 'thumbs-up';
    thumbsUp.innerText = '👍';
    thumbsUp.style.left = `${Math.random() * window.innerWidth}px`;
    thumbsUp.style.top = `30%`;
    thumbsUp.style.fontSize = `${20 + Math.random() * 15}px`;
    document.body.appendChild(thumbsUp);

    thumbsUp.addEventListener('animationend', () => {
      thumbsUp.remove();
    });
  }

  // Create falling stick effect
  function createFallingStick(caretX, caretY) {
    const stick = document.createElement('div');
    stick.className = 'stick';
    stick.innerText = '|';
    stick.style.left = `${caretX}px`;
    stick.style.top = `${caretY}px`;
    stick.style.color = getRandomColor();
    document.body.appendChild(stick);

    stick.addEventListener('animationend', () => {
      stick.remove();
    });
  }

  // Event listeners
  notepad.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      createBombExplosion();
    }
    if (e.key === ' ') {
      const caret = notepad.selectionStart;
      const coords = getCaretCoordinates(notepad, caret);
      createFallingStick(coords.left, coords.top);
    }
  });

  // Handle mobile virtual keyboard
  window.addEventListener('resize', function() {
    if (window.innerHeight < window.outerHeight * 0.7) {
      // Keyboard is probably open
      document.body.style.height = window.innerHeight + 'px';
    } else {
      // Keyboard is probably closed
      document.body.style.height = '100%';
    }
  });
});
