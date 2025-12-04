import React, { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  fullWidth?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, id, className = '', fullWidth = false }) => {
  return (
    <section id={id} className={`relative py-20 md:py-32 ${className}`}>
      <div className={`mx-auto px-4 md:px-8 ${fullWidth ? 'w-full' : 'max-w-[1600px]'}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;