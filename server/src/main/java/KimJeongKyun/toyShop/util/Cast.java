package KimJeongKyun.toyShop.util;

public class Cast {

    public static int INT( Object obj ) {
        return Integer.valueOf( String.valueOf( obj ) );
    }

    public static String STR( Object obj ) {
        return String.valueOf( obj );
    }

    public static Boolean BOOL( Object obj ) {
        return Boolean.valueOf( String.valueOf( obj ) );
    }

}
