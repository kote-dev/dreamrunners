export const Picture = ({ sources, fallback, alt, className, style }) => (
  <picture>
    <source srcSet={sources.webp} type="image/webp" />
    <img
      src={sources.original || sources}
      alt={alt}
      className={className}
      style={style}
    />
  </picture>
);
