import PropTypes from 'prop-types';
// icons
import { Icon } from '@iconify/react';
// @mui
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Iconify.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object
};

export default function Iconify({ icon, sx, ...other }) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}
