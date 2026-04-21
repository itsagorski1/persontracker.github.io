package com.jonah.code.java.random.persontracker.person.relationship.marriage;

import com.jonah.code.java.random.persontracker.person.Person;

import java.util.HashMap;
import java.util.Scanner;

public class Marriage {
    public static Scanner sc = new Scanner(System.in);
    public static HashMap<String, Person> populate(Person person1, Person person2) {
        HashMap<String, Person> map = new HashMap<>();
        person1.populate();
        person2.populate();
        try {
            System.out.print("Is " + person1.person.get("name") + " male or female (M/F)?\n>> ");
            String next = sc.nextLine().trim();
            if (next.length() == 1 && (next.equals("M") || next.equals("F"))) {
                person1.person.put("gender", next);
                next = null;
            } else { throw new IllegalArgumentException("Gender for "+person1.person.get("name")+" is invalid."); }
            System.out.print("Is " + person2.person.get("name") + " male or female (M/F)?\n>> ");
            String next = sc.nextLine().trim();
            if (next.length() == 1 && (next.equals("M") || next.equals("F"))) {
                person2.person.put("gender", next);
                next = null;
            } else { throw new IllegalArgumentException("Gender for "+person2.person.get("name")+" is invalid."); }
            System.out.print("What is "+person1.person.get("name")+"'s age?\n>> ");
            if (!sc.hasNextInt()) { throw new IllegalArgumentException("Age for "+person1.person.get("name")+" is invalid."); }
            person1.person.put("age", Integer.toString(sc.nextInt()));
            System.out.print("What is "+person2.person.get("name")+"'s name?\n>> ");
            if (!sc.hasNextInt()) { throw new IllegalArgumentException("age for "+person2.person.get("name")+" is invalid."); }
        } catch (IllegalArgumentException e) {
            System.out.println("Uh-oh! you errored out :( (error: "+e.getMessage()+")");
        }
        person1.person.put("married","true");
        person2.person.put("married","true");
        person1.person.put("divorced","false");
        person2.person.put("divorced","false");
        person1.person.put("single","false");
        person2.person.put("single","false");
        map.put("person1", person1);
        map.put("person2", person2);
        return map;
    }
}
