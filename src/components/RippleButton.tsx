import { useEffect, useRef } from 'react';

const RippleButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.addEventListener('click', rippleEffect);
  }, []);

  const rippleEffect = (event: MouseEvent) => {
    const btn = event.target as HTMLButtonElement;
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (btn.offsetLeft + radius)}px`;
    circle.style.top = `${event.clientY - (btn.offsetTop + radius)}px`;
    circle.classList.add('ripple');

    const ripple = btn.getElementsByClassName('ripple')[0];

    if (ripple) {
      ripple.remove();
    }

    btn.appendChild(circle);
  };
  return (
    <button
      ref={btnRef}
      type='button'
      className='relative min-w-max overflow-hidden rounded bg-green-700 px-5 py-3 text-white shadow hover:bg-opacity-90'
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default RippleButton;
