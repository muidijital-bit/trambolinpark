interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
}

export default function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <section className="bg-[#1a1a1a] pt-24 md:pt-28 lg:pt-32 pb-10 md:pb-12">
      <div className="container mx-auto px-4 lg:px-8">
        {badge && (
          <span className="inline-flex items-center gap-2 text-[#9fc91a] font-extrabold text-[10px] tracking-widest uppercase mb-4 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
            {badge}
          </span>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mt-2 mb-3">
          {title}
        </h1>
        {description && (
          <p className="text-gray-400 text-sm md:text-base max-w-xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
