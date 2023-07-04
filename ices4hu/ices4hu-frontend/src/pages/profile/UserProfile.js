import React, { useState } from 'react';
import './UserProfile.css';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Typography, TextField, Button, Paper, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Swal from 'sweetalert2';
import api from '../../api/axiosConfig';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '800px',
    margin: '0 auto',
    padding: theme.spacing(10, 0), // Add padding top and bottom
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  editing: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  enrolledLectures: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
  },
  listItem: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
}));

const UserProfile = () => {
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const classes = useStyles();
  const [editableUser, setEditableUser] = useState({ ...user });
  const [websiteTheme, setWebsiteTheme] = useState(localStorage.getItem('theme'));
  const handleThemeChange = (newTheme) => {
    localStorage.setItem('theme', newTheme);
    setWebsiteTheme(newTheme);
  }

  const handleSave = async () => {
    const firstName = editableUser.firstName;
    const lastName = editableUser.lastName;
    const email = editableUser.email;
    const phoneNumber = editableUser.phoneNumber;
  
    const myUserObject = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "phoneNumber": phoneNumber
    }
  
    const response = await api.put(`/api/auth/${myUserObject.email}/update`, myUserObject);
  
    if(response.status === 200){
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'You successfuly updated your profile.',
      });
  
      const updatedUser = { ...editableUser, ...myUserObject, editing: false };
      setEditableUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };
  

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditableUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div>
      <Header  onThemeChange={handleThemeChange}/>
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <Typography variant="h4" gutterBottom>
            {`${editableUser.firstName} ${editableUser.lastName}`}
          </Typography>
          {editableUser.editing && (
            <React.Fragment>
              <div className="user-info">
                <Typography variant="subtitle1">Name: </Typography>
                <TextField
                  name="firstName"
                  value={editableUser.firstName}
                  onChange={handleChange}
                  fullWidth
                />
              </div>
              <div className="user-info">
                <Typography variant="subtitle1">Surname: </Typography>
                <TextField
                  name="lastName"
                  value={editableUser.lastName}
                  onChange={handleChange}
                  fullWidth
                />
              </div>
            </React.Fragment>
          )}
          <div className="user-info">
            <Typography variant="subtitle1">Email: </Typography>
            {editableUser.editing ? (
              <TextField
                name="email"
                value={editableUser.email}
                onChange={handleChange}
                fullWidth
              />
            ) : (
              <Typography>{editableUser.email}</Typography>
            )}
          </div>
          <div className="user-info">
            <Typography variant="subtitle1">Phone Number: </Typography>
            {editableUser.editing ? (
              <TextField
                name="phoneNumber"
                value={editableUser.phoneNumber}
                onChange={handleChange}
                fullWidth
              />
            ) : (
              <Typography>{editableUser.phoneNumber}</Typography>
            )}
          </div>
          <div className="user-info">
            <Typography variant="subtitle1">{`User Type: `}</Typography>
            <Typography>{editableUser.userType}</Typography>
          </div>
          <div className="user-info">
            <Typography variant="subtitle1">Ban Status: </Typography>
            <Typography>{editableUser.isBanned ? 'Yes' : 'No'}</Typography>
          </div>
          <div className={`user-info ${classes.enrolledLectures}`}>
            <Typography variant="subtitle1">Enrolled Lectures: </Typography>
            <List dense={true}>
              {editableUser.enrolledLectures.map((lecture, index) => (
                <ListItem key={index} className={classes.listItem} id="enrolled_list">
                  <ListItemText primary={lecture} />
                </ListItem>
              ))}
            </List>
          </div>
            <Button
              variant="contained"
              style={{
                background: 'linear-gradient(58deg, rgba(85, 37, 134, 1) 20%, rgba(181, 137, 214, 1) 100%)',
                color: 'white',
              }}
              onClick={() =>
                editableUser.editing ? handleSave() :
                setEditableUser((prevUser) => ({
                  ...prevUser,
                  editing: !prevUser.editing,
                }))
              }
            >
              {editableUser.editing ? 'Save' : 'Edit'}
            </Button>
        </Paper>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;