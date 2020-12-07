package KimJeongKyun.toyShop.util;

import org.apache.commons.collections.map.ListOrderedMap;

public class CamelListMap extends ListOrderedMap {

    // REG_DATE => regDate

    private String toProperCase(String s, boolean isCapital) {

        String rtnValue = "";


        if ( isCapital ) { //
            rtnValue = s.substring(0, 1).toUpperCase() +
                    s.substring(1).toLowerCase();
        } else {
            rtnValue = s.toLowerCase();
        }

        return rtnValue;
    }

    private String toCamelCase(String originText){

        // Snake 아닌 경우
        if ( originText.indexOf("_") == -1 ) {
            int lNum = 0;
            int uNum = 0;
            char[] c = originText.toCharArray();
            for (int i = 0; i < c.length; i++) {
                if (c[i] >= 65 && c[i] <= 90) {
                    lNum++;
                } else if (c[i] >= 97 && c[i] <= 122) {
                    uNum++;
                }
            }

            if ( lNum > 0 && uNum > 0 ) return originText; // 이미 카멜인 경우(대소문자 섞여 있고, 언더바 없음) : 그대로 return
            if ( lNum == 0 || uNum == 0 ) return originText.toLowerCase(); // 언더바 없이 모두 대문자 혹은 소문자 : 소문자 return
        }

        // Snake to Camel
        String[] parts = originText.split("_");
        StringBuilder camelCaseString = new StringBuilder();

        for (int i = 0; i < parts.length ; i++) {
            String part = parts[i];
            camelCaseString.append(toProperCase(part, (i != 0 ? true : false))) ;
        }

        return camelCaseString.toString();
    }

    @Override
    public Object put(Object key, Object value) {
        return super.put(toCamelCase((String)key), value);
    }

}
