import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: '#000000',
        color: '#FFFFFF',
        padding: theme.spacing(2),
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '50px',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
}));

function Footer() {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <Typography variant="body2" align="center">
        ©2023, ICES4HU, developed by parlayan-yildizlar-takimi
      </Typography>
    </Box>
  );
}

export default Footer;
