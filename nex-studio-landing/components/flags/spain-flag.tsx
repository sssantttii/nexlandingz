export function SpainFlag({
  className = "",
  width = 24,
  height = 18,
}: { className?: string; width?: number; height?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512 512"
      className={className}
      aria-label="Spain flag"
    >
      <path fill="#FFF" d="M0 0h512v512H0z" />
      <path fill="#C60B1E" d="M0 0h512v128H0z" />
      <path fill="#C60B1E" d="M0 384h512v128H0z" />
      <path fill="#FFC400" d="M0 128h512v256H0z" />
      <path fill="#C60B1E" d="M216 186.7h16v32h-16z" />
      <path fill="#C60B1E" d="M264 186.7h16v32h-16z" />
      <path fill="#C60B1E" d="M216 293.3h16v32h-16z" />
      <path fill="#C60B1E" d="M264 293.3h16v32h-16z" />
      <path fill="#C60B1E" d="M216 240h80v32h-80z" />
      <path fill="#C60B1E" d="M148 218.7h32v74.7h-32z" />
    </svg>
  )
}
