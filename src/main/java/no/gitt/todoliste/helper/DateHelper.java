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
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/mm/yyyy");
        try {
            return simpleDateFormat.parse(date).getTime();
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }


    // For å gjøre innlegging av demodata enklere
    public static long getEpochForTomorrow() {
        return Instant.now().getEpochSecond() + 86400000;
    }
    public static long getEpochforYesterday() {
        return Instant.now().getEpochSecond() - 86400000;
    }


}
