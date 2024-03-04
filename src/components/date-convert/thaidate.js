import React from 'react';
import { format, addYears } from 'date-fns'; // Import format and addYears from date-fns
import { th } from 'date-fns/locale'; // Import Thai locale
import { parseISO } from 'date-fns';

function ThaiDate({ isoDate }) {
    // console.log('from function ' + typeof(isoDate) + ' ' + isoDate);
  // Parse ISO date to JavaScript Date object
  const date = parseISO(isoDate);
  // Add 543 years to the date to convert to Buddhist era
  const buddhistDate = addYears(date, 543);
  // Format the date using Thai locale
  const thaiDateString = format(buddhistDate, 'dd MMMM yyyy', { locale: th });

  return <span>{thaiDateString}</span>;
}

export default ThaiDate;