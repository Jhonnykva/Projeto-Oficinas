import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const DashboardMenuItem = ({ text, link, icon, ...props }) => {
  const history = useHistory();
  const onClick = () => {
    history.replace(link);
  };
  return (
    <ListItem button onClick={onClick} {...props}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text}></ListItemText>
    </ListItem>
  );
};

DashboardMenuItem.defaultProps = {
  text: '',
  link: '',
  icon: null,
};

export default DashboardMenuItem;
