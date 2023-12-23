import { Link } from 'react-router-dom';

export const LinkButton = ({ path, children }) => {
  return <Link to={path}>{children}</Link>;
};
