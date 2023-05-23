import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

const CalendarCard = ({ weekDay, weekActivities }) => {
  return (
    <Card
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      }}
    >
      <div
        style={{
          backgroundColor: '#E7FFFF',
          color: '#00b4d0',
          padding: '16px',
          fontWeight: 'bold',
          fontSize: '17px',
        }}
      >
        {weekDay}
      </div>
      <CardContent>
        {weekActivities.map((activity, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '16px',
              '&:hover': {
                backgroundColor: '#E7FFFF',
              },
            }}
          >
            <Typography
              variant="body1"
              style={{
                whiteSpace: 'normal',
                color: '#00b4d0',
                wordBreak: 'break-word',
                fontWeight: 'bold',
              }}
            >
              {activity.startingTime} - {activity.endingTime}
            </Typography>
            <Typography
              variant="body1"
              style={{
                whiteSpace: 'normal',
                color: 'black',
                wordBreak: 'break-word',
              }}
            >
              {activity.eventName}
            </Typography>
            {activity.hasDescription && (
              <NavLink
                to={`/events/${activity._id}`}
                style={{
                  whiteSpace: 'normal',
                  color: '#00b4d0',
                  wordBreak: 'break-word',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                }}
              >
                More
              </NavLink>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CalendarCard;
