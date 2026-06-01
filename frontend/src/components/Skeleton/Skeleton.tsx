import React from 'react';
import './Skeleton.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, borderRadius, className }) => {
  return (
    <div 
      className={`skeleton ${className || ''}`} 
      style={{ width, height, borderRadius }}
    ></div>
  );
};

export default Skeleton;
