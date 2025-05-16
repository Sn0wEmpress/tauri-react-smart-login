import { useEffect, useRef } from 'react';

type Position = 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface UseUltraInstinctProps {
    enabled?: boolean;
    onMove?: () => void;
    moveDistance?: { x?: string; y?: string };
    allowedPositions?: Position[];
    animationSpeed?: number;
    trailDuration?: number;
    returnDelay?: number;
    maxTrails?: number;
}

const DEFAULT_DISTANCE = '120%';
const DEFAULT_ANIMATION_SPEED = 100; // 100ms
const DEFAULT_TRAIL_DURATION = 500; // 500ms

export const useUltraInstinct = <T extends HTMLElement>({
    enabled = true,
    onMove,
    moveDistance = { x: DEFAULT_DISTANCE, y: DEFAULT_DISTANCE },
    allowedPositions,
    animationSpeed = DEFAULT_ANIMATION_SPEED,
    trailDuration = DEFAULT_TRAIL_DURATION,
    returnDelay = 1000,
    maxTrails,
}: UseUltraInstinctProps = {}) => {
    const elementRef = useRef<T | null>(null);
    const returnTimerRef = useRef<number | null>(null);
    const moveTimerRef = useRef<number | null>(null);
    const activeTrailsRef = useRef<Set<HTMLElement>>(new Set());
    const mousePositionRef = useRef<{ x: number; y: number } | null>(null);
    const isMovingRef = useRef(false);
    const uniqueIdRef = useRef<string>(`ultra-${Math.random().toString(36).substring(2)}`);

    const xDistance = moveDistance?.x || DEFAULT_DISTANCE;
    const yDistance = moveDistance?.y || DEFAULT_DISTANCE;

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        element.setAttribute('data-ultra-id', uniqueIdRef.current);

        // Track mouse position
        const handleMouseMove = (event: MouseEvent) => {
            mousePositionRef.current = { x: event.clientX, y: event.clientY };
        };
        document.addEventListener('mousemove', handleMouseMove);

        const handleMouseOver = () => {
            if (!enabled || isMovingRef.current) return;
            isMovingRef.current = true;

            if (returnTimerRef.current) {
                window.clearTimeout(returnTimerRef.current);
                returnTimerRef.current = null;
            }
            if (moveTimerRef.current) {
                window.clearTimeout(moveTimerRef.current);
                moveTimerRef.current = null;
            }

            const currentPosition = element.getAttribute('data-position') as Position || 'center';
            const positions: Position[] = allowedPositions || [
                'left', 'right', 'top', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'
            ];
            const availablePositions = positions.filter(pos => pos !== currentPosition);
            if (availablePositions.length === 0) return;

            const randomIndex = Math.floor(Math.random() * availablePositions.length);
            const nextPosition = availablePositions[randomIndex];

            createTrail(element, nextPosition);
            element.setAttribute('data-position', nextPosition);
            element.className = element.className.replace(
                /ultra-(left|right|top|bottom|center|top-left|top-right|bottom-left|bottom-right)/g,
                ''
            );
            element.classList.add(`ultra-${nextPosition}`);
            onMove?.();

            const handleTransitionEnd = () => {
                element.removeEventListener('transitionend', handleTransitionEnd);
                isMovingRef.current = false;

                if (!mousePositionRef.current) return;
                const rect = element.getBoundingClientRect();
                const { x, y } = mousePositionRef.current;
                if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                    handleMouseOver();
                }
            };
            element.addEventListener('transitionend', handleTransitionEnd);
        };

        const handleMouseLeave = () => {
            if (!enabled) return;

            if (moveTimerRef.current) {
                window.clearTimeout(moveTimerRef.current);
                moveTimerRef.current = null;
            }
            if (returnTimerRef.current) {
                window.clearTimeout(returnTimerRef.current);
                returnTimerRef.current = null;
            }

            returnTimerRef.current = window.setTimeout(() => {
                if (!element) return;
                element.setAttribute('data-position', 'center');
                element.className = element.className.replace(
                    /ultra-(left|right|top|bottom|center|top-left|top-right|bottom-left|bottom-right)/g,
                    ''
                );
                element.classList.add('ultra-center');

                const handleTransitionEnd = () => {
                    element.removeEventListener('transitionend', handleTransitionEnd);
                    if (!mousePositionRef.current) return;
                    const rect = element.getBoundingClientRect();
                    const { x, y } = mousePositionRef.current;
                    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                        handleMouseOver();
                    }
                };
                element.addEventListener('transitionend', handleTransitionEnd);
            }, returnDelay);
        };

        const styleId = `ultra-instinct-styles-${uniqueIdRef.current}`;
        let styleElement = document.getElementById(styleId) as HTMLStyleElement;
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }

        styleElement.textContent = `
            [data-ultra-id="${uniqueIdRef.current}"] {
                transition-property: transform !important;
                transition-timing-function: ease-out !important;
                transition-duration: ${animationSpeed}ms !important;
            }
            [data-ultra-id="${uniqueIdRef.current}"].ultra-left {
                transform: translateX(-${xDistance}) translateY(0) !important;
            }
            [data-ultra-id="${uniqueIdRef.current}"].ultra-right {
                transform: translateX(${xDistance}) translateY(0) !important;
            }
            [data-ultra-id="${uniqueIdRef.current}"].ultra-top {
                transform: translateX(0) translateY(-${yDistance}) !important;
            }
            [data-ultra-id="${uniqueIdRef.current}"].ultra-bottom {
                transform: translateX(0) translateY(${yDistance}) !important;
            }
            [data-ultra-id="${uniqueIdRef.current}"].ultra-center {
                transform: translateX(0) translateY(0) !important;
            }
            [data-ultra-id="${uniqueIdRef.current}"].ultra-top-left {
                transform: translateX(-${xDistance}) translateY(-${yDistance}) !important;
            }
            [data-ultra-id="${uniqueIdRef.current}"].ultra-top-right {
                transform: translateX(${xDistance}) translateY(-${yDistance}) !important;
            }
            [data-ultra-id="${uniqueIdRef.current}"].ultra-bottom-left {
                transform: translateX(-${xDistance}) translateY(${yDistance}) !important;
            }
            [data-ultra-id="${uniqueIdRef.current}"].ultra-bottom-right {
                transform: translateX(${xDistance}) translateY(${yDistance}) !important;
            }
            @keyframes ultraTrailFadeOut-${uniqueIdRef.current} {
                0% { opacity: 0.3 !important; }
                99% { opacity: 0.15 !important; transform: translateX(var(--start-x)) translateY(var(--start-y)) scale(var(--scale-x), var(--scale-y)) !important; }
                100% { opacity: 0 !important; transform: translateX(var(--start-x)) translateY(var(--start-y)) scale(var(--scale-x), var(--scale-y)) !important; }
            }
            .ultra-trail[data-ultra-id="${uniqueIdRef.current}"] {
                position: absolute !important;
                pointer-events: none !important;
                transform-origin: center !important;
                z-index: 1 !important;
                opacity: 0.3 !important;
                animation: ultraTrailFadeOut-${uniqueIdRef.current} ${trailDuration}ms ease-out forwards !important;
            }
        `;

        element.addEventListener('mouseover', handleMouseOver);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mouseover', handleMouseOver);
            element.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mousemove', handleMouseMove);
            if (returnTimerRef.current) window.clearTimeout(returnTimerRef.current);
            if (moveTimerRef.current) window.clearTimeout(moveTimerRef.current);
            if (styleElement && document.head.contains(styleElement)) {
                document.head.removeChild(styleElement);
            }
            activeTrailsRef.current.forEach(trail => {
                if (trail.parentElement) trail.parentElement.removeChild(trail);
            });
            activeTrailsRef.current.clear();
        };
    }, [enabled, onMove, returnDelay, xDistance, yDistance, animationSpeed, trailDuration, allowedPositions, maxTrails]);

    const createTrail = (element: T, nextPosition: Position) => {
        if (maxTrails && activeTrailsRef.current.size >= maxTrails) {
            const oldestTrail = Array.from(activeTrailsRef.current)[0];
            if (oldestTrail && oldestTrail.parentElement) {
                oldestTrail.parentElement.removeChild(oldestTrail);
                activeTrailsRef.current.delete(oldestTrail);
            }
        }

        const rect = element.getBoundingClientRect();
        const computedStyle = getComputedStyle(element);

        const trail = document.createElement('div');
        trail.className = 'ultra-trail';
        trail.setAttribute('data-ultra-id', uniqueIdRef.current);
        trail.style.width = `${rect.width}px`;
        trail.style.height = `${rect.height}px`;
        trail.style.position = 'absolute';

        const parent = element.parentElement;
        if (parent) {
            const parentStyle = getComputedStyle(parent);
            if (parentStyle.position === 'static') {
                parent.style.position = 'relative';
            }
            const parentRect = parent.getBoundingClientRect();
            const relativeLeft = rect.left - parentRect.left;
            const relativeTop = rect.top - parentRect.top;
            trail.style.left = `${relativeLeft}px`;
            trail.style.top = `${relativeTop}px`;

            parent.appendChild(trail);
            activeTrailsRef.current.add(trail);
            trail.addEventListener('animationend', () => {
                if (parent.contains(trail)) {
                    parent.removeChild(trail);
                }
                activeTrailsRef.current.delete(trail);
            });
        }

        const currentPosition = element.getAttribute('data-position') || 'center';
        let startX = '0';
        let startY = '0';

        switch (currentPosition) {
            case 'left': startX = `-${xDistance}`; break;
            case 'right': startX = xDistance; break;
            case 'top': startY = `-${yDistance}`; break;
            case 'bottom': startY = yDistance; break;
            case 'top-left': startX = `-${xDistance}`; startY = `-${yDistance}`; break;
            case 'top-right': startX = xDistance; startY = `-${yDistance}`; break;
            case 'bottom-left': startX = `-${xDistance}`; startY = yDistance; break;
            case 'bottom-right': startX = xDistance; startY = yDistance; break;
        }

        const backgroundColor =
            computedStyle.backgroundColor === 'rgba(0, 0, 0, 0)' || computedStyle.backgroundColor === 'transparent'
                ? 'rgba(255, 255, 255, 0.1)'
                : computedStyle.backgroundColor;
        trail.style.backgroundColor = backgroundColor;
        trail.style.borderRadius = computedStyle.borderRadius;
        trail.style.opacity = '0.3';

        if (element instanceof HTMLLabelElement && element.querySelector('input[type="checkbox"]')) {
            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.gap = '0.5rem';
            container.style.color = computedStyle.color;
            container.style.fontSize = computedStyle.fontSize;
            container.style.fontFamily = computedStyle.fontFamily;

            const originalCheckbox = element.querySelector('input[type="checkbox"]') as HTMLInputElement | null;
            const isChecked = originalCheckbox?.checked || false;

            const checkboxContainer = document.createElement('span');
            checkboxContainer.className = 'custom-checkbox';
            checkboxContainer.style.width = '1.25rem';
            checkboxContainer.style.height = '1.25rem';
            checkboxContainer.style.border = isChecked ? '2px solid #3b82f6' : '2px solid #9ca3af';
            checkboxContainer.style.borderRadius = '0.375rem';
            checkboxContainer.style.backgroundColor = isChecked ? '#3b82f6' : '#1f2937';
            checkboxContainer.style.display = 'inline-block';
            container.appendChild(checkboxContainer);

            const textSpan = document.createElement('span');
            const originalText = element.querySelector('span:not(.custom-checkbox)')?.textContent || '';
            textSpan.textContent = originalText;
            textSpan.style.marginLeft = '0.5rem';
            container.appendChild(textSpan);

            trail.appendChild(container);
            trail.style.backgroundColor = 'transparent';
            trail.style.display = 'flex';
            trail.style.alignItems = 'center';
            trail.style.justifyContent = 'flex-start';
            trail.style.width = 'auto';
            trail.style.whiteSpace = 'nowrap';
        } else if (element instanceof HTMLInputElement) {
            const trailInput = document.createElement('div');
            trailInput.textContent = element.value || element.placeholder || '';
            trailInput.style.color = computedStyle.color;
            trailInput.style.fontSize = computedStyle.fontSize;
            trailInput.style.fontFamily = computedStyle.fontFamily;
            trailInput.style.padding = computedStyle.padding;
            trailInput.style.width = '100%';
            trailInput.style.height = '100%';
            trailInput.style.display = 'flex';
            trailInput.style.alignItems = 'center';
            trail.appendChild(trailInput);
        } else if (element.querySelector('input')) {
            const input = element.querySelector('input');
            if (input) {
                const inputStyle = getComputedStyle(input);
                const trailInput = document.createElement('div');
                trailInput.textContent = input.value || input.placeholder || '';
                trailInput.style.color = inputStyle.color;
                trailInput.style.fontSize = inputStyle.fontSize;
                trailInput.style.fontFamily = inputStyle.fontFamily;
                trailInput.style.padding = inputStyle.padding;
                trailInput.style.width = '100%';
                trailInput.style.height = '100%';
                trailInput.style.display = 'flex';
                trailInput.style.alignItems = 'center';
                trail.appendChild(trailInput);

                const icon = element.querySelector('i');
                if (icon) {
                    const trailIcon = icon.cloneNode(true) as HTMLElement;
                    trail.appendChild(trailIcon);
                }
            }
        } else if (element instanceof HTMLAnchorElement || element instanceof HTMLButtonElement) {
            trail.textContent = element.textContent || '';
            trail.style.color = computedStyle.color;
            trail.style.fontSize = computedStyle.fontSize;
            trail.style.fontFamily = computedStyle.fontFamily;
            trail.style.textAlign = 'center';
            trail.style.display = 'flex';
            trail.style.alignItems = 'center';
            trail.style.justifyContent = 'center';
            trail.style.padding = computedStyle.padding;
            trail.style.whiteSpace = 'nowrap';
        } else {
            const clone = element.cloneNode(true) as HTMLElement;
            while (clone.firstChild) {
                trail.appendChild(clone.firstChild);
            }
            trail.style.color = computedStyle.color;
            trail.style.fontSize = computedStyle.fontSize;
            trail.style.fontFamily = computedStyle.fontFamily;
            trail.style.display = 'flex';
            trail.style.alignItems = 'center';
            trail.style.padding = computedStyle.padding;
        }

        let scaleX = 1;
        let scaleY = 1;
        let endX = '0';
        let endY = '0';

        switch (nextPosition) {
            case 'left': scaleX = 1.2; endX = `-${xDistance}`; break;
            case 'right': scaleX = 1.2; endX = xDistance; break;
            case 'top': scaleY = 1.2; endY = `-${yDistance}`; break;
            case 'bottom': scaleY = 1.2; endY = yDistance; break;
            case 'top-left': scaleX = 1.2; scaleY = 1.2; endX = `-${xDistance}`; endY = `-${yDistance}`; break;
            case 'top-right': scaleX = 1.2; scaleY = 1.2; endX = xDistance; endY = `-${yDistance}`; break;
            case 'bottom-left': scaleX = 1.2; scaleY = 1.2; endX = `-${xDistance}`; endY = yDistance; break;
            case 'bottom-right': scaleX = 1.2; scaleY = 1.2; endX = xDistance; endY = yDistance; break;
        }

        trail.style.transform = `translateX(${startX}) translateY(${startY})`;
        trail.style.setProperty('--start-x', endX);
        trail.style.setProperty('--start-y', endY);
        trail.style.setProperty('--scale-x', scaleX.toString());
        trail.style.setProperty('--scale-y', scaleY.toString());
    };

    return elementRef;
};