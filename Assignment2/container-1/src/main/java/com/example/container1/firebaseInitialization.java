package com.example.container1;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

@Service
public class firebaseInitialization {


/* Reference :

M. Ligade, "Spring Boot Firebase CRUD," techwasti, Nov. 28, 2020 [Online].
Available: https://medium.com/techwasti/spring-boot-firebase-crud-b0afab27b26e
[Accessed 02 July 2023].

*/

    @PostConstruct
    public void initialisation() throws IOException {
        InputStream serviceAccount = null;

        try {
            serviceAccount = new ClassPathResource("serviceAccountKey.json").getInputStream();
        } catch (IOException e) {
            throw new RuntimeException("Failed to read service account key file.", e);
        }

     // Initialising Firebase with the provided service account credentials
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        FirebaseApp.initializeApp(options);

    }

}
