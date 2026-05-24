interface DuckPosition {
  x: number;
  y: number;
}

interface Duck extends DuckPosition {
  element: HTMLElement;
  direction: string;
}

const DUCK_HTML = `
  <div class="neck-base"><div class="neck"><div class="head"></div></div></div>
  <div class="tail"></div>
  <div class="body"></div>
  <div class="legs"><div class="leg"></div><div class="leg"></div></div>
`;

const createDuckElement = (className: string) => {
  const element = document.createElement("div");
  element.className = className;
  element.innerHTML = DUCK_HTML;
  return element;
};

const createEggElement = (position: DuckPosition) => {
  const element = document.createElement("div");
  element.className = "duck-egg";
  element.innerHTML = `<span class="egg-shell egg-shell-top"></span><span class="egg-shell egg-shell-bottom"></span><span class="egg-crack"></span><span class="egg-pop"></span>`;
  element.style.left = `${position.x - 9}px`;
  element.style.top = `${position.y - 12}px`;
  return element;
};

const getDirection = (from: DuckPosition, to: DuckPosition) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const horizontal = Math.abs(dx) > 6 ? (dx > 0 ? "right" : "left") : "";
  const vertical = Math.abs(dy) > 6 ? (dy > 0 ? "down" : "up") : "";
  return `${vertical} ${horizontal}`.trim() || "right";
};

const moveDuck = (duck: Duck, target: DuckPosition, speed: number) => {
  const next = {
    x: duck.x + (target.x - duck.x) * speed,
    y: duck.y + (target.y - duck.y) * speed,
  };
  duck.direction = getDirection(duck, next);
  duck.x = next.x;
  duck.y = next.y;
  duck.element.className = `${duck.element.classList.contains("duckling") ? "duckling" : "duck"} waddle ${duck.direction}`;
  duck.element.style.transform = `translate(${duck.x}px, ${duck.y}px)`;
  duck.element.style.zIndex = `${Math.round(duck.y)}`;
};

const getDucklingOrbitPosition = (mother: Duck, index: number, total: number): DuckPosition => {
  const ducksPerRing = 8;
  const ring = Math.floor(index / ducksPerRing);
  const ringStart = ring * ducksPerRing;
  const itemsInRing = Math.min(ducksPerRing, total - ringStart);
  const positionInRing = index - ringStart;
  const angle = (Math.PI * 2 * positionInRing) / itemsInRing - Math.PI / 2 + ring * 0.35;
  const radius = 58 + ring * 34;
  return {
    x: mother.x + Math.cos(angle) * radius,
    y: mother.y + Math.sin(angle) * radius,
  };
};

export function launchDucklings() {
  if (document.querySelector(".duck-wrapper-container")) return;

  const container = document.createElement("div");
  container.className = "duck-wrapper-container";
  container.innerHTML = `<div class="wrapper"></div><div class="duck-thanks">Merci Sylvain :)</div>`;
  document.body.appendChild(container);

  const wrapper = container.querySelector<HTMLElement>(".wrapper");
  if (!wrapper) return;

  const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const mother: Duck = { element: createDuckElement("duck waddle right"), x: cursor.x, y: cursor.y, direction: "right" };
  const ducklings: Duck[] = [];
  wrapper.appendChild(mother.element);

  const addDuckling = (position: DuckPosition = mother) => {
    const duckling: Duck = { element: createDuckElement("duckling waddle right"), x: position.x, y: position.y, direction: "right" };
    ducklings.push(duckling);
    wrapper.appendChild(duckling.element);
    moveDuck(duckling, position, 1);
  };

  const hatchDuckling = (position: DuckPosition) => {
    const egg = createEggElement(position);
    wrapper.appendChild(egg);
    window.setTimeout(() => {
      egg.classList.add("hatching");
    }, 80);
    window.setTimeout(() => {
      egg.remove();
      addDuckling(position);
    }, 920);
  };

  const updateCursor = (event: MouseEvent) => {
    cursor.x = event.clientX;
    cursor.y = event.clientY;
  };

  window.addEventListener("mousemove", updateCursor);
  window.addEventListener("click", (event) => {
    updateCursor(event);
    hatchDuckling({ x: event.clientX, y: event.clientY });
  });

  for (let index = 0; index < 5; index += 1) addDuckling();

  window.setInterval(() => {
    moveDuck(mother, { x: cursor.x - 20, y: cursor.y - 14 }, 0.15);
    ducklings.forEach((duckling, index) => {
      moveDuck(duckling, getDucklingOrbitPosition(mother, index, ducklings.length), 0.12);
    });
  }, 80);
}
