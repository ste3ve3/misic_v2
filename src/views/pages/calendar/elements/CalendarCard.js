import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Stack, IconButton, CardContent, MenuItem, Popover, Typography, Button, CardHeader } from '@mui/material';
import { IconEdit, IconTrash, IconDotsVertical, IconEye, IconEyeOff } from '@tabler/icons';

const CalendarCard = ({ weekDay, weekActivities, WeekDate, onClick, isActive, currentActivity, handleHighlightEvent, targettedEvent }) => {
  const [openMenu, setOpenMenu] = useState(null);

    const handleOpenMenu = (e) => {
        setOpenMenu(e.target);
    };
    const handleCloseMenu = () => {
        setOpenMenu(null);
    };

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
        {weekDay} - {WeekDate}
      </div>
      <CardContent>
        {weekActivities.map((activity, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '10px',
              '&:hover': {
                backgroundColor: '#E7FFFF',
              },
            }}
          >
            <Stack 
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack >
                <Typography
                  variant="body1"
                  style={{
                    whiteSpace: 'normal',
                    color: '#00b4d0',
                    wordBreak: 'break-word',
                    fontWeight: 'bold',
                    marginBottom: '1px'
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
              </Stack>
              <CardHeader
                    action={
                        <IconButton
                            aria-label="settings"
                            onClick={(e) => {
                                handleOpenMenu(e);
                                currentActivity(activity);
                            }}
                        >
                            <IconDotsVertical size={16} />
                        </IconButton>
                    }
              />
            </Stack>
            
          </div>
        ))}
      </CardContent>
      <Popover
          open={Boolean(openMenu)}
          anchorEl={openMenu}
          onClose={(e) => {
            handleCloseMenu(e)
            currentActivity(null);
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
              sx: {
                  p: 1,
                  width: targettedEvent?.isHighlighted ? 120: 110,
                  '& .MuiMenuItem-root': {
                      px: 1,
                      typography: 'body2',
                      borderRadius: 0.75
                  }
              }
          }}
      >
        <Stack 
          alignItems="flex-start"
              >
              <Button
                      size="small"
                      color="secondary"
                      disabled={isActive}
                      startIcon={<IconEdit size={16} />}
                      onClick={(event) => {
                        onClick('edit')
                        handleCloseMenu(event)
                      }}
                  >
                    Edit
              </Button>
              <Button
                  size="small"
                  color="primary"
                  disabled={isActive}
                  startIcon={<IconTrash size={16} />}
                  onClick={(event) => {
                    onClick('delete')
                    handleCloseMenu(event)
                }}
              >
                Delete
              </Button>
              <Button
                  size="small"
                  style={{ color: 'green' }}
                  disabled={isActive}
                  startIcon={targettedEvent?.isHighlighted ? <IconEyeOff size={16} /> : <IconEye size={16} /> }
                  onClick={(event) => {
                    handleHighlightEvent(event)
                    handleCloseMenu(event)
                }}
              >
                {
                  targettedEvent?.isHighlighted ? "Unhighlight" : "Highlight"
                }
              </Button>
              </Stack> 
      </Popover>
    </Card>
  );
};

export default CalendarCard;
