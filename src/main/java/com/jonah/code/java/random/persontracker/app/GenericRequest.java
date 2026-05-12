package com.jonah.code.java.random.persontracker.app;

public class GenericRequest<T> {
    private T payload;

    public GenericRequest() {
    }

    public GenericRequest(T payload) {
        this.payload = payload;
    }

    public T getPayload() {
        return payload;
    }

    public void setPayload(T payload) {
        this.payload = payload;
    }
}
