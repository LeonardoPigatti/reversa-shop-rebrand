import SOCIAL_ICONS from '../../data/socialIcons'
import './AnnouncementBar.css'

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <span className="announcement-bar__text">
        FRETE GRÁTIS A PARTIR DE R$ 350 PARA TODO BRASIL
      </span>

      <div className="announcement-bar__socials">
        {SOCIAL_ICONS.map((s) => (
          <a
            key={s.name}
            href={s.href}
            title={s.name}
            target="_blank"
            rel="noopener noreferrer"
            className="announcement-bar__social-link"
          >
            {s.showLabel && (
              <span className="announcement-bar__social-label">
                {s.label}
              </span>
            )}
            {s.svg}
          </a>
        ))}
      </div>
    </div>
  )
}