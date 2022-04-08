import { Grid, TextField, Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDateTimePicker from '@mui/lab/StaticDateTimePicker';

const useStyles = makeStyles(() => ({
  field: {
    margin: '5px 0 5px'
  },
  error: {
    fontSize: 14,
    color: '#FF0000',
    margin: '15px 0'
  },
  form: {
    width: '100%'
  }
}))

function CreateParty() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(new Date());
  const [address, setAddress] = useState('');

  let navigate = useNavigate();
  const CHARACTER_LIMIT = 100;

  const styles = useStyles()

  const handleSubmit = (e) => {
    e.preventDefault();

    const details = {
      'name': title,
      'description': description,
      'address': address,
      'date': value
    }

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(process.env.REACT_APP_URL + '/events', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      credentials: 'include',
      body: formBody
    })
      .then(response => {
        if (!response.ok) {
          throw Error('could not fetch the data for that resource')
        }
        return response.json();
      })
      .then(() => {
        navigate('/dashboard');
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  return (
    <div className={styles.paper}>
      <Typography variant='h3'>Create a New Event</Typography>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Grid container spacing={2} >
          <Grid item xs={6} >
            <Typography variant='h5' sx={{ fontWeight: 'bold', margin: '15px 0 5px' }}>Title</Typography>
            <TextField
              className={styles.field}
              type="text"
              required
              fullWidth
              label="Give your event a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Typography variant='h5' sx={{ fontWeight: 'bold', margin: '15px 0 5px' }}>Description</Typography>
            <TextField
              className={styles.field}
              type="text"
              fullWidth
              multiline
              rows={3}
              label="Give your event a description"
              value={description}
              helperText={`${description.length}/${CHARACTER_LIMIT}`}
              inputProps={{ maxLength: CHARACTER_LIMIT }}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Typography variant='h5' sx={{ fontWeight: 'bold', margin: '15px 0 5px' }}>Place</Typography>
            <TextField
              className={styles.field}
              type="text"
              fullWidth
              label="Enter your events location"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

          </Grid>
          <Grid item xs={6}>
            <Typography variant='h5' sx={{ fontWeight: 'bold', margin: '15px 0 5px' }}>Date and Time</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label=' '
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Button
            sx={{ boxShadow: 3 }}
            type='submit'
            size='large'
            variant='contained'
            fullWidth
          >
            Create Party
          </Button>

        </Grid>
      </form>
    </div>
  );
}

export default CreateParty