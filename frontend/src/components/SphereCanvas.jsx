import { useEffect, useRef } from 'react';

const SphereCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);

    const GLOBE_RADIUS = Math.min(width, height) * 0.4;
    const DOT_RADIUS = 2;
    const GLOBE_CENTER_Z = -GLOBE_RADIUS;
    const FIELD_OF_VIEW = Math.min(width, height) * 0.8;

    let dots = [];

    const createDots = () => {
      dots = [];
      for (let i = 0; i < 1000; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos((Math.random() * 2) - 1);

        const x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
        const y = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
        const z = GLOBE_RADIUS * Math.cos(phi) + GLOBE_CENTER_Z;

        const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        // Tăng tốc độ xoay
        const speed = 0.06 + Math.random() * 0.06;
        const rotationAxis = Math.random() < 0.5 ? 'x' : 'y';

        dots.push({ x, y, z, color, speed, theta, phi, rotationAxis });
      }
    };

    const project = (x, y, z) => {
      const scale = FIELD_OF_VIEW / (FIELD_OF_VIEW - z);
      const projectedX = x * scale + width / 2;
      const projectedY = y * scale + height / 2;
      return { x: projectedX, y: projectedY, scale };
    };

    const rotateX = (x, y, z, angle) => {
      const cosRY = Math.cos(angle);
      const sinRY = Math.sin(angle);
      const tempY = y * cosRY - z * sinRY;
      const tempZ = y * sinRY + z * cosRY;
      return { x, y: tempY, z: tempZ };
    };

    const rotateY = (x, y, z, angle) => {
      const cosRY = Math.cos(angle);
      const sinRY = Math.sin(angle);
      const tempX = x * cosRY + z * sinRY;
      const tempZ = -x * sinRY + z * cosRY;
      return { x: tempX, y, z: tempZ };
    };

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);

      dots.forEach(dot => {
        let { x, y, z } = dot;
        const rotationAngle = time * dot.speed;

        if (dot.rotationAxis === 'x') {
          ({ x, y, z } = rotateX(x, y, z - GLOBE_CENTER_Z, rotationAngle));
        } else {
          ({ x, y, z } = rotateY(x, y, z - GLOBE_CENTER_Z, rotationAngle));
        }

        z += GLOBE_CENTER_Z;

        const { x: projectedX, y: projectedY, scale } = project(x, y, z);

        ctx.beginPath();
        ctx.arc(projectedX, projectedY, DOT_RADIUS * scale, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      });
    };

    const animate = (time) => {
      // Tăng hệ số thời gian để tạo chuyển động nhanh hơn
      render(time * 0.002);
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = canvas.clientWidth * 2;
      canvas.height = canvas.clientHeight * 2;
      ctx.scale(2, 2);
      createDots(); // Recreate dots to fit new size
    };

    createDots();
    requestAnimationFrame(animate);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  );
};

export default SphereCanvas;