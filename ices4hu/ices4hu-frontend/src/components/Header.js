import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faEnvelope, faRightFromBracket, faChartSimple, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const drawerWidth = 245;

const useStyles = makeStyles((theme) => ({
  root: {
    top:0,
    left:0,
    width:'100%',
    height: '60px',
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    zIndex: 100,
    background: "linear-gradient(58deg, rgba(85, 37, 134, 1) 20%, rgba(181, 137, 214, 1) 100%)",
  },
  logo: {
    height: "40px",
    marginRight: "10px",
  },
  box: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    marginRight: "150px",
  },
  menuIcon: {
    marginRight: "10px",
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    background:"rgb(107, 41, 165)",
    paddingLeft:"20px",
    paddingRight: "20px",
    fontSize:"1.1rem",
    width: drawerWidth,
    height:450,
    display: "flex",
    flexDirection: "column",
  },
  themeToggle: {
    color: "#ffffff",
    marginTop: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: "10px",
  },
}));

export default function Header({ onThemeChange }) {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const location = useLocation();
  const [user, setUser] = useState({userType:"student"});
  const navigate = useNavigate();


  useEffect(() => {
    if(location.pathname !== "/"){
      const userString = localStorage.getItem('user');
      const user = JSON.parse(userString);
      setUser(user);
    }
    if(localStorage.getItem('theme') !== null){
      if (localStorage.getItem('theme') === 'light-theme') {
        setIsDarkTheme(false);
      }else{
        setIsDarkTheme(true);
      }
    }
  }, [location.pathname]);

  const goLoginPage = () => {
    localStorage.removeItem('user');
    navigate("/");
  };

  const goDashboardPage = () => {
    navigate("/dashboard");
  }

  const goSendFeedbackPage = () => {
    navigate("/send-feedback");
  }

  const goProfilePage = () => {
    navigate("/profile");
  }

  const goSurveyStatsPage = () => {
    navigate("/survey-stats");
  }

  const goGetFeedbacksPage = () => {
    navigate("/get-feedback");
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleTheme = () => {
    const newTheme = isDarkTheme ? 'light-theme':'dark-theme';
    localStorage.setItem('theme', newTheme);
    setIsDarkTheme(!isDarkTheme);
    onThemeChange(newTheme);
  };

  const displayDesktop = () => {
    return (
      <Toolbar className={classes.root}>
        {location.pathname !== "/" && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuIcon}

            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box className={classes.box}>
          <img src={logo} alt="logo" className={classes.logo} />
          <Typography variant="h6">ICES4HU</Typography>
        </Box>
        
      </Toolbar>
    );
  };



  const drawerContent = (
    <div className={classes.drawerContent}>
      {
        (user.userType === "student") ? (<List style={{color:"#ffffff", fontWeight:"bold"}}>
        <ListItem>
          <h3 style={{color:"#ffffff", fontSize:"1.5rem",display:"flex", justifyContent:"center", textAlign:"center"}}>{`${user.firstName} ${user.lastName}`}</h3>
        </ListItem>
        <ListItem style={{marginTop:"140px"}} onClick={goProfilePage} button>
          <ListItemIcon>
            <FontAwesomeIcon color="#ffffff" icon={faUser} />          
          </ListItemIcon>
          <ListItemText primary={"Profile"} />
        </ListItem>
        <ListItem button onClick={goDashboardPage}>
          <ListItemIcon>
            <FontAwesomeIcon color="#ffffff" icon={faHouse} />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>
        <ListItem button onClick={goSendFeedbackPage}>
          <ListItemIcon>
            <FontAwesomeIcon color="#ffffff" icon={faEnvelope} />
          </ListItemIcon>
          <ListItemText primary={"Send Feedback"} />
        </ListItem>
        <ListItem button onClick={goLoginPage}>
          <ListItemIcon>
            <FontAwesomeIcon color="#ffffff" icon={faRightFromBracket} />
          </ListItemIcon>
          <ListItemText primary={"Log Out"} />
        </ListItem>
      </List>) : ((user.userType === "instructor") ? (<List style={{color:"#ffffff", fontWeight:"bold"}}>
        <ListItem>
          <h3 style={{color:"#ffffff", fontSize:"1.5rem",display:"flex", justifyContent:"center", textAlign:"center"}}>{`${user.firstName} ${user.lastName}`}</h3>
        </ListItem>
        <ListItem style={{marginTop:"140px"}} onClick={goProfilePage} button>
          <ListItemIcon>
            <FontAwesomeIcon color="#ffffff" icon={faUser} />          
          </ListItemIcon>
          <ListItemText primary={"Profile"} />
        </ListItem>
        <ListItem button onClick={goDashboardPage}>
          <ListItemIcon>
            <FontAwesomeIcon color="#ffffff" icon={faHouse} />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>
        <ListItem button onClick={goSurveyStatsPage}>
          <ListItemIcon>
            <FontAwesomeIcon color="#ffffff" icon={faChartSimple} />
          </ListItemIcon>
          <ListItemText primary={"Survey Statistics"} />
        </ListItem>
        <ListItem button onClick={goLoginPage}>
          <ListItemIcon>
            <FontAwesomeIcon color="#ffffff" icon={faRightFromBracket} />
          </ListItemIcon>
          <ListItemText primary={"Log Out"} />
        </ListItem>
      </List>) : (<List style={{color:"#ffffff", fontWeight:"bold"}}>
        <ListItem>
          <h3 style={{color:"#ffffff", fontSize:"1.5rem",display:"flex", justifyContent:"center", textAlign:"center"}}>{`${user.firstName} ${user.lastName}`}</h3>
        </ListItem>
        <ListItem style={{marginTop:"140px"}} onClick={goProfilePage} button>
          <ListItemIcon>
            <FontAwesomeIcon color="#ffffff" icon={faUser} />          
          </ListItemIcon>
          <ListItemText primary={"Profile"} />
        </ListItem>
        <ListItem button onClick={goDashboardPage}>
          <ListItemIcon>
            <FontAwesomeIcon color="#ffffff" icon={faHouse} />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>
        <ListItem button onClick={goGetFeedbacksPage}>
          <ListItemIcon>
            <FontAwesomeIcon color="#ffffff" icon={faEnvelope} />
          </ListItemIcon>
          <ListItemText primary={"Display Feedbacks"} />
        </ListItem>
        <ListItem button onClick={goLoginPage}>
          <ListItemIcon>
            <FontAwesomeIcon color="#ffffff" icon={faRightFromBracket} />
          </ListItemIcon>
          <ListItemText primary={"Log Out"} />
        </ListItem>
      </List>))
      }
      
      <div className={classes.themeToggle}>
        <IconButton
          color="inherit"
          aria-label="toggle-theme"
          onClick={toggleTheme}
        >
          {isDarkTheme ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
        </IconButton>
      </div>
    </div>
  );

  

  return (

    <header>
      <AppBar>{displayDesktop()}</AppBar>
        <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawerContent}
        </Drawer>
    </header>
  );
}
