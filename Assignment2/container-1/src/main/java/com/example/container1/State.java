package com.example.container1;

public class State {
    private String email;
    private String state;
    private long timestamp;

    public State() {
    }

    public State(String email, String state, long timestamp) {
        this.email = email;
        this.state = state;
        this.timestamp = timestamp;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}
