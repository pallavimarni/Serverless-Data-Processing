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

    public boolean validateLogin(LoginDTO loginDTO) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();

        Query query = dbFirestore.collection(COLLECTION_NAME)
                .whereEqualTo("email", loginDTO.getEmail())
                .whereEqualTo("password", loginDTO.getPassword());

        ApiFuture<QuerySnapshot> querySnapshotApiFuture = query.get();


        QuerySnapshot querySnapshot = querySnapshotApiFuture.get();
        List<QueryDocumentSnapshot> documents = querySnapshot.getDocuments();

        if (!documents.isEmpty()) {

            String userId = documents.get(0).getId();


            dbFirestore.collection(STATE_COLLECTION_NAME)
                    .document(userId)
                    .update("state", "online");

            return true;
        } else {
            return false;
        }
    }
}
