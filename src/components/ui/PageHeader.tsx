import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  description?: string;
  bgImage?: string;
}

export default function PageHeader({ title, description, bgImage }: PageHeaderProps) {
  return (
    <div className="relative py-16 md:py-20 bg-[#1a1a1a] flex flex-col items-center justify-center mt-[114px] border-b-4 border-[#9fc91a]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#1a1a1a]/90 z-10"></div>
        {bgImage && (
          <img 
            src={bgImage} 
            alt={title} 
            className="w-full h-full object-cover object-center opacity-30 mix-blend-overlay"
          />
        )}
      </div>

      <div className="container mx-auto px-4 relative z-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold text-white mb-4"
        >
          {title}
        </motion.h1>
        
        {description && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base text-gray-300 max-w-2xl mx-auto font-medium"
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  );
}
