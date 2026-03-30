interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export default function StarRating({ rating, size = 'md', showNumber = false }: StarRatingProps) {
  const safeRating = Math.max(0, Math.min(5, rating || 0));

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }, (_, index) => (
          <svg
            key={index}
            className={`${sizeClasses[size]} ${
              index < safeRating ? 'text-amber-400' : 'text-gray-200'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
      {showNumber && (
        <span className={`${textSizeClasses[size]} text-navy-500 font-medium ml-1`}>
          {safeRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}