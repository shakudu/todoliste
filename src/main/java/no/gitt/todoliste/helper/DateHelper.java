package no.gitt.todoliste.helper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;

public class DateHelper {
    /**
     * Converts a date in dd/mm/yyyy format to epoch for database use.
     * @param date
     * @return
     */
    public static Long getEpochFromDatepicker(String date) {
        try {
            return new SimpleDateFormat("dd/mm/yyyy").parse(date).getTime();
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }
}
