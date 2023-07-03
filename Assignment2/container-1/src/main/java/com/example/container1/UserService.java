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

    // Method for saving a user
    public Boolean saveUser(User user) throws ExecutionException, InterruptedException {
        // Check if any required fields are empty
        if (user.getName().isEmpty() || user.getEmail().isEmpty() || user.getLocation().isEmpty() || user.getPassword().isEmpty()) {
            return false;
        }

        try {
            Firestore dbFirestore = FirestoreClient.getFirestore();

            // Save the user document in the "Reg" collection
            ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME)
                    .document(user.getEmail())
                    .set(user);

            // Create a state document for the user in the "state" collection
            State state = new State(user.getEmail(), "offline", System.currentTimeMillis());
            ApiFuture<WriteResult> stateApiFuture = dbFirestore.collection(STATE_COLLECTION_NAME)
                    .document(user.getEmail())
                    .set(state);

            // Wait for the completion of both write operations
            collectionApiFuture.get();
            stateApiFuture.get();

            return true;
        } catch (InterruptedException | ExecutionException e) {
            throw e;
        } catch (Exception e) {
            throw e;
        }
    }
}
