interface MemberPillProps {
  name: string;
  avatar?: string;
}

export function MemberPill({ name, avatar }: MemberPillProps) {
  // Gerar iniciais do nome
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Gerar cor baseada no nome
  const getColor = (name: string) => {
    const colors = [
      '#81a4cd',
      '#937666',
      '#320a28',
      '#07090f',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="inline-flex items-center gap-2 bg-white border-2 rounded-full px-3 py-2 hover:shadow-md transition-all" style={{ borderColor: '#81a4cd' }}>
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0" style={{ backgroundColor: getColor(name) }}>
        {avatar ? (
          <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>
      <span className="text-sm" style={{ color: '#07090f' }}>{name}</span>
    </div>
  );
}
