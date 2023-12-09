# Gateway
Session token processing and request user blocked status verification.

# Available Scripts

### `npm test`

Launches the test runner in the interactive watch mode.\

### `kubectl apply -f k8s`

Applies Kubernetes configurations defined in k8s/Deployment.yaml and k8s/service.yaml.\

### `kubectl get pods`

Verify Deployment.yaml configuration has been successfully read and that the container image has been correctly pulled (Status should be Running when done).

### `kubectl get service`

Verify service.yaml has been successfully read and that an external IP has been set. In case it has not, running the following command will fix the issue:

### `minikube tunnel`
