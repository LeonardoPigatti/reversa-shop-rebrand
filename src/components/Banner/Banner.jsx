import './Banner.css'

export default function Banner({
  url,
  width = '100%',
  height = '400px',
  alt = '',
  text,
  textColor = '#ffffff',
  fontSize = '4rem',
  textShadow = true,
}) {
  return (
    <div className="banner" style={{ width, height }}>
      <img src={url} alt={alt} className="banner__img" />

      {text && (
        <div className="banner__overlay">
          <p
            className="banner__text"
            style={{
              color: textColor,
              fontSize,
              fontFamily: "'Sacramento', cursive",
              textShadow: textShadow
                ? '0 0 24px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5)'
                : 'none',
            }}
          >
            {text}
          </p>
        </div>
      )}
    </div>
  )
}