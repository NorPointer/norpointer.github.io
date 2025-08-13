type Params = {
  color: string;
  onClick: () => void;
  size: string;
  ring?: boolean;
  cursor?: boolean;
  className: string;
};

function ColorPeg({
  color,
  onClick,
  size = 'h-8 w-8',
  ring = false,
  cursor = false,
  className = '',
}: Params) {
  return (
    <div
      className={`rounded-full ${size} ${color} ${ring ? 'ring-2 ring-offset-1 ring-gray-400' : ''} ${cursor ? "cursor-pointer" : ""} transition-colors duration-200 ${className}`}
      onClick={onClick}
    ></div>
  );
}

export default ColorPeg;
