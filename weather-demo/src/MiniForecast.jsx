import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

{/*
  temperatures: 온도 정보를 숫자로 받음
  timeLabels: 시간 정보를 숫자로 받음
  weatherIcons: S:해, C:구름, R:비 만 지원
 */}
const MiniForecast = ({ temperatures = [], timeLabels = [], weatherIcons = [] }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      drawChart(0.2);
    };

    const drawChart = (_scaleRatio) => {
      const width = canvas.width;
      const height = canvas.height;
      const padding = 25;
      const yPadding = 60;

      ctx.clearRect(0, 0, width, height);

      console.log("temperatures", temperatures);

      const pointSpacing = (width - padding * 2) / (temperatures.length - 1);
      const maxValue = Math.max(...temperatures);
      const minValue = Math.min(...temperatures);

      const yScale = (height - padding * 2) / (maxValue - minValue);
      const yOffset = height - yPadding;

      ctx.strokeStyle = 'lightgray';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(padding, yOffset - (temperatures[0] - minValue) * yScale * _scaleRatio);
      temperatures.forEach((value, index) => {
        const x = padding + index * pointSpacing;
        const y = yOffset - (value - minValue) * yScale * _scaleRatio;

        if (index === 0) {
          ctx.lineTo(x - 15, y);
          ctx.moveTo(x, y);
        } else {
          const prevX = padding + (index - 1) * pointSpacing;
          const prevY = yOffset - (temperatures[index - 1] - minValue) * yScale * _scaleRatio;
          ctx.quadraticCurveTo(prevX, prevY, x, y);
        }

        ctx.lineTo(x, y);
        ctx.moveTo(x, y);

        if (index === temperatures.length - 1) {
          ctx.lineTo(x + 15, y);
          ctx.moveTo(x, y);
        }
      });
      ctx.stroke();

      drawXLabels(timeLabels, padding, pointSpacing, height);
      drawDataValues(temperatures, padding, pointSpacing, yOffset, yScale, minValue, _scaleRatio);
      drawIcons(weatherIcons, padding, pointSpacing, height);
    };

    const drawXLabels = (labels, padding, pointSpacing, height) => {
      ctx.font = '13px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'black';

      labels.forEach((label, index) => {
        const x = padding + index * pointSpacing;
        const y = height - padding / 2;
        if (index === 0) label += '시';
        ctx.fillText(label, x, y);
      });
    };

    const drawDataValues = (temperatures, padding, pointSpacing, yOffset, yScale, minValue, _scaleRatio) => {
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'black';

      temperatures.forEach((value, index) => {
        const x = padding + index * pointSpacing;
        const y = yOffset - (value - minValue) * yScale * _scaleRatio - 10;
        ctx.fillText(value + '°', x, y);
      });
    };

    const drawIcons = (icons, padding, pointSpacing, height) => {
      icons.forEach((icon, index) => {
        const img = new Image();
        img.src = './' + icon + '.svg';
        img.onload = () => {
          const x = padding + index * pointSpacing - img.width / 2;
          const y = height / 1.4;
          ctx.drawImage(img, x, y);
        };
      });
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [temperatures, timeLabels, weatherIcons]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
      <div className="container" ref={containerRef} style={{ width: '100%', maxWidth: '200px', height: '200px', border: '1px solid black', position: 'relative' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }}></canvas>
      </div>
    </div>
  );
};

MiniForecast.propTypes = {
  temperatures: PropTypes.arrayOf(PropTypes.number),
  timeLabels: PropTypes.arrayOf(PropTypes.string),
  weatherIcons: PropTypes.arrayOf(PropTypes.string),
};

export default MiniForecast;
