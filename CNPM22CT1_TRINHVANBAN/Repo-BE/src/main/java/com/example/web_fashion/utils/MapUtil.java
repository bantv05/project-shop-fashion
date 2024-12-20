package com.example.web_fashion.utils;

import java.util.Map;

public class MapUtil {
//    <T> :
//    T:
    public static  <T> T getObject(Map<String, Object> params,String key, Class<T> tClass) {
        Object obj = params.getOrDefault(key, null);
        if(obj != null) {
            if(tClass.getTypeName().equals("java.lang.Long")) {
                obj = obj != "" ? Long.valueOf(obj.toString()) : null;
            } else if (tClass.getTypeName().equals("java.lang.Integer")) {
//                obj = obj != "" ? Integer.parseInt(obj.toString()) : null; parseInt nó sẽ trả về kiểu dl nguyên thủy int
                obj = obj != "" ? Integer.valueOf(obj.toString()) : null; //valueOf  nó sẽ trả về đối tượng Integer
            } else if (tClass.getTypeName().equals("java.lang.Double")) {
                obj = obj != "" ? Double.valueOf(obj.toString()) : null;
            }else if (tClass.getTypeName().equals("java.lang.String")) {
                obj = obj != "" ? obj.toString() : null;
            }else if (tClass.getTypeName().equals("java.lang.Boolean")) {
                obj = obj != "" ? Boolean.valueOf(obj.toString()) : null;
            }
            return tClass.cast(obj);
//            trả ra đối tượng ép kiểu
        }
        return null;
    }
}
