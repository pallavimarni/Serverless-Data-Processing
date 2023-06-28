package com.example.container3;



import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class stateService {


        private static final String STATE_COLLECTION_NAME = "state";

        public List<String> getOnlineUsers() throws ExecutionException, InterruptedException {
            Firestore dbFirestore = FirestoreClient.getFirestore();


            Query query = dbFirestore.collection(STATE_COLLECTION_NAME)
                    .whereEqualTo("state", "online");

            ApiFuture<QuerySnapshot> querySnapshotApiFuture = query.get();


            QuerySnapshot querySnapshot = querySnapshotApiFuture.get();
            List<QueryDocumentSnapshot> documents = querySnapshot.getDocuments();

            List<String> onlineUsers = new ArrayList<>();
            for (QueryDocumentSnapshot document : documents) {
                String email = document.getId();
                onlineUsers.add(email);
            }

            return onlineUsers;
        }

        public void updateStateToOffline(String email) throws ExecutionException, InterruptedException {
            Firestore dbFirestore = FirestoreClient.getFirestore();


            dbFirestore.collection(STATE_COLLECTION_NAME)
                    .document(email)
                    .update("state", "offline");
        }
    }


