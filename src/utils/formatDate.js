export const formattedDate = (date) => {
    const eventDate = new Date(date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
    });
    return formattedDate;
}