interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div className={`relative z-10 ${className}`}>
      <div 
        className="h-[5px] rounded-full w-full"
        style={{
          background: 'linear-gradient(90deg, #87CEEB 0%, #FFFFFF 50%, #87CEEB 100%)',
          boxShadow: '0 0 10px rgba(135, 206, 235, 0.6), 0 0 20px rgba(135, 206, 235, 0.4), 0 0 30px rgba(255, 255, 255, 0.3)',
        }}
      />
    </div>
  );
}

