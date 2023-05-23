import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px'
    },
    header: {
        backgroundColor: '#E7FFFF',
        color: 'blue',
        padding: '16px',
        fontWeight: 'bold',
        fontSize: '17px'
    },
    activityContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        '&:hover': {
            backgroundColor: '#E7FFFF'
        }
    },
    time: {
        whiteSpace: 'normal',
        color: 'blue',
        wordBreak: 'break-word',
        fontWeight: 'bold'
    },
    eventName: {
        whiteSpace: 'normal',
        color: 'darkBlue',
        wordBreak: 'break-word'
    },
    description: {
        whiteSpace: 'normal',
        color: 'blue',
        wordBreak: 'break-word',
        fontSize: '14px',
        fontWeight: 'bold',
        textDecoration: 'underline'
    }
}));
