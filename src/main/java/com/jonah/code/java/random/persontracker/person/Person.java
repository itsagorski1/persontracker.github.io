package com.jonah.code.java.random.persontracker.person;

import java.util.HashMap;
import java.util.Scanner;
import java.lang.System;

public class Person {
    public static Scanner sc = new Scanner(System.in);
    public static String name() {
        System.out.print("Name, please.\n>> ");
        return sc.nextLine();
    }
    public static String address() {
        sc.nextLine();
        System.out.print("Address, please.\n>> ");
        return sc.nextLine();
    }
    public static String phone() {
        sc.nextLine();
        System.out.print("Phone, please.\n>> ");
        int number = 0;
        String string_number = "";
        try {
            if (sc.hasNextInt()) {
                number = sc.nextInt();
                string_number = Integer.toString(number);
            } else {
                throw new Exception();
            }
            if (number <= 2119999999L) {
                System.exit(-1);
            } else if (number >= 9999999999L) {
                System.exit(-1);
            } else {
                if (string_number.substring(2, 5).equals("555")) {
                    System.exit(-1);
                }
            }
        } catch (Exception ValueError) {System.out.println("Uh oh! ur phone # is invalid!");}
        return string_number;
    }
    public static void main(String[] args) {
        HashMap<String, String> person = new HashMap<String, String>();
        person.put("name", name());
        person.put("address", address());
        person.put("phone", phone());
        System.out.println(person);
    }
}
