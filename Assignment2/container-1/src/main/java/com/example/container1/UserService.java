package com.example.container1;

import com.example.container1.State;
import com.example.container1.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class UserService {

    private static final String COLLECTION_NAME = "Reg";
    private static final String STATE_COLLECTION_NAME = "state";

    public String saveUser(User user) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();


        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME)
                .document(user.getEmail())
                .set(user);

        State state = new State(user.getEmail(), "offline", System.currentTimeMillis());
        ApiFuture<WriteResult> stateApiFuture = dbFirestore.collection(STATE_COLLECTION_NAME)
                .document(user.getEmail())
                .set(state);

        collectionApiFuture.get();
        stateApiFuture.get();

        return collectionApiFuture.get().getUpdateTime().toString();
    }
}
