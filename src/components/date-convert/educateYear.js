import React from 'react';
import { format } from 'date-fns'; // Import format from date-fns
import { th } from 'date-fns/locale'; // Import Thai locale
import { parseISO } from 'date-fns';

function EducateYear({ isoDate }) {
    // Check if isoDate is defined and is a string
    if (typeof isoDate === 'string') {
        // Parse ISO date to JavaScript Date object
        const date = parseISO(isoDate);
        // Format the date using Thai locale
        const thaiDateString = format(date, 'yyyy', { locale: th });

        return <span>{thaiDateString}</span>;
    } else {
        // Return null or any default value if isoDate is not defined or not a string
        return null;
    }
}

export default EducateYear;
