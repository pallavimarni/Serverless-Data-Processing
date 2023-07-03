package com.example.container2;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class LoginService {

    private static final String COLLECTION_NAME = "Reg";
    private static final String STATE_COLLECTION_NAME = "state";

    // Method for validating user login
    public boolean validateLogin(LoginDTO loginDTO) {
        try {
            Firestore dbFirestore = FirestoreClient.getFirestore();

            // Build the query to check email and password
            Query query = dbFirestore.collection(COLLECTION_NAME)
                    .whereEqualTo("email", loginDTO.getEmail())
                    .whereEqualTo("password", loginDTO.getPassword());

            // Execute the query and retrieve the results
            ApiFuture<QuerySnapshot> querySnapshotApiFuture = query.get();
            QuerySnapshot querySnapshot = querySnapshotApiFuture.get();
            List<QueryDocumentSnapshot> documents = querySnapshot.getDocuments();

            if (!documents.isEmpty()) {
                // Login is successful
                String userId = documents.get(0).getId();

                // Update the user's state to "online" in the "state" collection
                dbFirestore.collection(STATE_COLLECTION_NAME)
                        .document(userId)
                        .update("state", "online");

                return true;
            } else {
                // Login failed
                return false;
            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
