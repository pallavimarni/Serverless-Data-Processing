package com.example.container1;

public class State {
    private String email;
    private String status;
    private long timestamp;

    public State() {
    }

    public State(String email, String status, long timestamp) {
        this.email = email;
        this.status = status;
        this.timestamp = timestamp;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}
