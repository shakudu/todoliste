package no.gitt.todoliste.Helper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;

public class DateHelper {

    public static Long getEpochFromDate(int dd, int mm, int yyyy)  {
        String date = String.format("%s/%s/%s", dd, mm, yyyy);
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
