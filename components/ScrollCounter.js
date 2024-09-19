import { useEffect, useRef, useState } from 'react';

const ScrollCounter = ({ start = 0, end, duration = 2000 }) => {
  const [count, setCount] = useState(start);
  const [isCounting, setIsCounting] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!counterRef.current) return;
      const offsetTop = window.pageYOffset + window.innerHeight;
      const elementPosition = counterRef.current.offsetTop;

      if (offsetTop > elementPosition && !isCounting) {
        setIsCounting(true);

        let startTimestamp = null;

        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          setCount(Math.floor(progress * (end - start) + start));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };

        window.requestAnimationFrame(step);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isCounting, start, end, duration]);

  return (
    <div ref={counterRef}>
      {count}
    </div>
  );
};

export default ScrollCounter;
