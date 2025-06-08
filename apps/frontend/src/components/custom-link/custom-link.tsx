import { CustomLinkModel } from './custom-link-model';
import classes from './custom-link.module.css';

export type CustomLinkType = 'button' | 'label' | 'divider';

export interface CustomLinkProps {
  type?: CustomLinkType;
  link: CustomLinkModel;
}

export function CustomLink({ type = 'button', link }: CustomLinkProps) {
  return (
    <a
      href="#"
      className={classes.link}
      data-type={type}
      style={{
        color: link.color,
      }}
      onClick={(e) => {
        e.preventDefault();
        link.onClick && link.onClick();
      }}
    >
      {link.icon && <link.icon className={classes.icon} size={16} stroke={1.5} />}
      {link.label}
    </a>
  );
}
