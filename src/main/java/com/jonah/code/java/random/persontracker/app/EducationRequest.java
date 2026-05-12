package com.jonah.code.java.random.persontracker.app;

public class EducationRequest {
    private String name;
    private String address;
    private String type;
    private String grades;
    private String yearStarted;
    private String yearCompleted;
    private String notes;

    public EducationRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getGrades() {
        return grades;
    }

    public void setGrades(String grades) {
        this.grades = grades;
    }

    public String getYearStarted() {
        return yearStarted;
    }

    public void setYearStarted(String yearStarted) {
        this.yearStarted = yearStarted;
    }

    public String getYearCompleted() {
        return yearCompleted;
    }

    public void setYearCompleted(String yearCompleted) {
        this.yearCompleted = yearCompleted;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
